import { useRef, useEffect, useCallback, useState } from 'react'
import type { AgentIcon } from './data/demo'

export type PhysicsBody = {
  id: string
  icon: AgentIcon
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  rotation: number
  angularVel: number
  baseSize: number
}

type PhysicsState = {
  bodies: PhysicsBody[]
  mouseX: number
  mouseY: number
  mouseInside: boolean
  containerW: number
  containerH: number
}

const DAMPING = 0.985
const ANGULAR_DAMPING = 0.99
const MOUSE_FORCE = 0.15
const MOUSE_RADIUS = 200
const COLLISION_RESPONSE = 0.6
const BOUNDARY_BOUNCE = 0.5
const DRIFT_FORCE = 0.02

// Predefined spawn configs for each icon
const SPAWN_CONFIGS: Record<AgentIcon, { baseSize: number; rotation: number }> = {
  mona: { baseSize: 98, rotation: 28.63 },
  rune: { baseSize: 117, rotation: -17.55 },
  iris: { baseSize: 122, rotation: 8.78 },
  goody: { baseSize: 90, rotation: 15 },
  nancy: { baseSize: 85, rotation: -12 },
}

function createBody(icon: AgentIcon, containerW: number, containerH: number, existingBodies: PhysicsBody[]): PhysicsBody {
  const config = SPAWN_CONFIGS[icon]
  const radius = (config.baseSize + 16) / 2

  // Try to find a non-overlapping position, fall back to center area
  let x = containerW * 0.3 + Math.random() * containerW * 0.4
  let y = containerH * 0.2 + Math.random() * containerH * 0.4

  for (let attempt = 0; attempt < 20; attempt++) {
    const overlaps = existingBodies.some((b) => {
      const dx = b.x - x
      const dy = b.y - y
      return Math.sqrt(dx * dx + dy * dy) < b.radius + radius + 10
    })
    if (!overlaps) break
    x = containerW * 0.2 + Math.random() * containerW * 0.6
    y = containerH * 0.1 + Math.random() * containerH * 0.6
  }

  return {
    id: icon,
    icon,
    x,
    y,
    // Initial velocity: drop in from above with some horizontal drift
    vx: (Math.random() - 0.5) * 3,
    vy: -2 + Math.random() * 2,
    radius,
    rotation: config.rotation,
    angularVel: (Math.random() - 0.5) * 2,
    baseSize: config.baseSize,
  }
}

export function usePhysicsIcons(activeIcons: AgentIcon[]) {
  const stateRef = useRef<PhysicsState>({
    bodies: [],
    mouseX: 0,
    mouseY: 0,
    mouseInside: false,
    containerW: 408,
    containerH: 179,
  })
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [bodies, setBodies] = useState<PhysicsBody[]>([])

  // Add new bodies when activeIcons changes
  useEffect(() => {
    const state = stateRef.current
    const existingIds = new Set(state.bodies.map((b) => b.id))
    const newIcons = activeIcons.filter((icon) => !existingIds.has(icon))

    if (newIcons.length > 0) {
      const newBodies = newIcons.map((icon) =>
        createBody(icon, state.containerW, state.containerH, state.bodies)
      )
      state.bodies = [...state.bodies, ...newBodies]
    }

    // Remove bodies no longer in activeIcons
    state.bodies = state.bodies.filter((b) => activeIcons.includes(b.icon))
  }, [activeIcons])

  // Physics loop
  const tick = useCallback(() => {
    const state = stateRef.current
    const { bodies: bs, mouseX, mouseY, mouseInside, containerW, containerH } = state

    for (const body of bs) {
      // Gentle random drift
      body.vx += (Math.random() - 0.5) * DRIFT_FORCE
      body.vy += (Math.random() - 0.5) * DRIFT_FORCE

      // Mouse interaction: soft repulsion within radius
      if (mouseInside) {
        const dx = body.x - mouseX
        const dy = body.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = MOUSE_FORCE * (1 - dist / MOUSE_RADIUS)
          body.vx += (dx / dist) * force
          body.vy += (dy / dist) * force
          body.angularVel += force * 0.5 * (dx > 0 ? 1 : -1)
        }
      }

      // Apply velocity
      body.vx *= DAMPING
      body.vy *= DAMPING
      body.angularVel *= ANGULAR_DAMPING
      body.x += body.vx
      body.y += body.vy
      body.rotation += body.angularVel

      // Boundary collisions
      if (body.x - body.radius < 0) {
        body.x = body.radius
        body.vx = Math.abs(body.vx) * BOUNDARY_BOUNCE
      }
      if (body.x + body.radius > containerW) {
        body.x = containerW - body.radius
        body.vx = -Math.abs(body.vx) * BOUNDARY_BOUNCE
      }
      if (body.y - body.radius < 0) {
        body.y = body.radius
        body.vy = Math.abs(body.vy) * BOUNDARY_BOUNCE
      }
      if (body.y + body.radius > containerH) {
        body.y = containerH - body.radius
        body.vy = -Math.abs(body.vy) * BOUNDARY_BOUNCE
      }
    }

    // Body-body collisions
    for (let i = 0; i < bs.length; i++) {
      for (let j = i + 1; j < bs.length; j++) {
        const a = bs[i]
        const b = bs[j]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const minDist = a.radius + b.radius

        if (dist < minDist && dist > 0.01) {
          // Separate
          const overlap = (minDist - dist) / 2
          const nx = dx / dist
          const ny = dy / dist
          a.x -= nx * overlap
          a.y -= ny * overlap
          b.x += nx * overlap
          b.y += ny * overlap

          // Exchange velocity along collision normal
          const relVx = a.vx - b.vx
          const relVy = a.vy - b.vy
          const relDot = relVx * nx + relVy * ny
          if (relDot > 0) {
            a.vx -= relDot * nx * COLLISION_RESPONSE
            a.vy -= relDot * ny * COLLISION_RESPONSE
            b.vx += relDot * nx * COLLISION_RESPONSE
            b.vy += relDot * ny * COLLISION_RESPONSE

            // Spin from collision
            a.angularVel += relDot * 0.3
            b.angularVel -= relDot * 0.3
          }
        }
      }
    }

    setBodies([...bs])
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  // Start loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  // Container resize observer
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver(([entry]) => {
      stateRef.current.containerW = entry.contentRect.width
      stateRef.current.containerH = entry.contentRect.height
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    stateRef.current.mouseX = e.clientX - rect.left
    stateRef.current.mouseY = e.clientY - rect.top
    stateRef.current.mouseInside = true
  }, [])

  const onMouseLeave = useCallback(() => {
    stateRef.current.mouseInside = false
  }, [])

  return { containerRef, bodies, onMouseMove, onMouseLeave }
}
