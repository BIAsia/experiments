import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
  allAgents,
  fileArtifacts,
  memoryRecords,
  messages as allMessages,
  objectives,
  projectThreads,
  threadTitle,
  timelineEvents,
} from './data/demo'
import type { Agent, AgentIcon, FileArtifact, MemoryRecord, Message, TimelineEvent } from './data/demo'
import { usePhysicsIcons } from './usePhysicsIcons'
import './styles/app.css'

type PanelMode = 'timeline' | 'file' | 'memory'

const AgentIcon = ({ icon, size = 16 }: { icon: string; size?: number }) => {
  switch (icon) {
    case 'mona':
      return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M8.031 7.348C7.699 3.235 4.256 0 0.057 0C0.057 4.179 3.262 7.61 7.348 7.969C3.235 8.301 1.835e-07 11.744 0 15.943C4.179 15.943 7.61 12.738 7.969 8.652C8.301 12.765 11.744 16 15.943 16C15.943 11.821 12.738 8.39 8.652 8.031C12.765 7.699 16 4.256 16 0.057C11.821 0.057 8.39 3.262 8.031 7.348ZM8 8L8 8L8 8C8 8 8 8 8 8V8Z" fill="#BEE900" /></svg>
    case 'rune':
      return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M16 8.054L8 0L0 8.054H7.893L0 16H16L8.107 8.054H16Z" fill="#A3E8B5" /></svg>
    case 'iris':
      return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M9.387 8L16 14.64H2.535e-06L6.613 8L0 1.36H16L9.387 8Z" fill="#A7B5FF" /></svg>
    case 'goody':
      return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10.471 3.765C10.612 3.437 10.69 3.074 10.69 2.693C10.69 1.206 9.502 0 8.036 0C6.571 0 5.383 1.206 5.383 2.693C5.383 3.074 5.461 3.437 5.601 3.765C5.119 3.091 4.337 2.653 3.453 2.653C1.988 2.653 0.8 3.859 0.8 5.347C0.8 6.675 1.748 7.779 2.994 8C1.748 8.221 0.8 9.325 0.8 10.653C0.8 12.141 1.988 13.347 3.453 13.347C4.337 13.347 5.119 12.909 5.601 12.235C5.461 12.563 5.383 12.926 5.383 13.307C5.383 14.794 6.571 16 8.036 16C9.502 16 10.69 14.794 10.69 13.307C10.69 12.926 10.612 12.563 10.471 12.235C10.953 12.909 11.736 13.347 12.619 13.347C14.085 13.347 15.272 12.141 15.272 10.653C15.272 9.325 14.325 8.221 13.078 8C14.325 7.779 15.272 6.675 15.272 5.347C15.272 3.859 14.085 2.653 12.619 2.653C11.736 2.653 10.953 3.091 10.471 3.765ZM10.184 11.725C10.044 11.397 9.966 11.034 9.966 10.653C9.966 9.325 10.913 8.221 12.16 8C10.913 7.779 9.966 6.675 9.966 5.347C9.966 4.966 10.044 4.603 10.184 4.275C9.702 4.949 8.92 5.387 8.036 5.387C7.153 5.387 6.37 4.949 5.888 4.275C6.029 4.603 6.107 4.966 6.107 5.347C6.107 6.675 5.159 7.779 3.913 8C5.159 8.221 6.107 9.325 6.107 10.653C6.107 11.034 6.029 11.397 5.888 11.725C6.37 11.051 7.153 10.613 8.036 10.613C8.92 10.613 9.702 11.051 10.184 11.725Z" fill="#FFB6E1" /></svg>
    case 'nancy':
      return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M3.497e-07 2.212e-07L6.032e-07 4L8 8L1.748e-07 12L0 16L8 12V16L16 12V8V4L8 0V4L3.497e-07 2.212e-07ZM8 4V8V12L16 8L8 4Z" fill="#E1E1E1" /></svg>
    default:
      return null
  }
}

const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.41 2.734C12.557 2.5 12.866 2.43 13.099 2.577C13.333 2.724 13.403 3.032 13.257 3.266L7.626 12.225C7.487 12.446 7.365 12.642 7.252 12.789C7.139 12.937 6.994 13.095 6.786 13.187C6.5 13.313 6.176 13.319 5.886 13.205C5.674 13.121 5.522 12.969 5.404 12.826C5.285 12.684 5.155 12.494 5.008 12.278L2.588 8.754C2.432 8.526 2.49 8.215 2.717 8.058C2.945 7.902 3.256 7.96 3.412 8.188L5.832 11.712C5.991 11.944 6.091 12.089 6.173 12.188C6.222 12.247 6.249 12.269 6.258 12.276C6.296 12.29 6.338 12.289 6.375 12.274C6.384 12.267 6.41 12.244 6.457 12.182C6.536 12.079 6.63 11.931 6.779 11.693L12.41 2.734Z" fill="#BBBBBB" /></svg>
const LoadingIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="spin"><path d="M8 11.1C8.276 11.1 8.5 11.324 8.5 11.6V14C8.5 14.276 8.276 14.5 8 14.5C7.724 14.5 7.5 14.276 7.5 14V11.6C7.5 11.324 7.724 11.1 8 11.1ZM5.126 10.166C5.321 9.971 5.639 9.971 5.834 10.166C6.029 10.361 6.029 10.679 5.834 10.874L4.094 12.613C3.898 12.809 3.582 12.809 3.387 12.613C3.191 12.418 3.191 12.101 3.387 11.906L5.126 10.166ZM10.166 10.166C10.361 9.971 10.679 9.971 10.874 10.166L12.613 11.906C12.809 12.101 12.809 12.418 12.613 12.613C12.418 12.809 12.101 12.809 11.906 12.613L10.166 10.874C9.971 10.679 9.971 10.361 10.166 10.166ZM4.4 7.5C4.676 7.5 4.9 7.724 4.9 8C4.9 8.276 4.676 8.5 4.4 8.5H2C1.724 8.5 1.5 8.276 1.5 8C1.5 7.724 1.724 7.5 2 7.5H4.4ZM14 7.5C14.276 7.5 14.5 7.724 14.5 8C14.5 8.276 14.276 8.5 14 8.5H11.6C11.324 8.5 11.1 8.276 11.1 8C11.1 7.724 11.324 7.5 11.6 7.5H14ZM3.387 3.387C3.582 3.191 3.898 3.191 4.094 3.387L5.834 5.126C6.029 5.321 6.029 5.639 5.834 5.834C5.639 6.029 5.321 6.029 5.126 5.834L3.387 4.094C3.191 3.898 3.191 3.582 3.387 3.387ZM11.906 3.387C12.101 3.191 12.418 3.191 12.613 3.387C12.809 3.582 12.809 3.898 12.613 4.094L10.874 5.834C10.679 6.029 10.361 6.029 10.166 5.834C9.971 5.639 9.971 5.321 10.166 5.126L11.906 3.387ZM8 1.5C8.276 1.5 8.5 1.724 8.5 2V4.4C8.5 4.676 8.276 4.9 8 4.9C7.724 4.9 7.5 4.676 7.5 4.4V2C7.5 1.724 7.724 1.5 8 1.5Z" fill="#D9D9D9" /></svg>
const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2.5C10.345 2.5 10.625 2.78 10.625 3.125V9.373H16.877C17.222 9.373 17.502 9.653 17.502 9.998C17.502 10.343 17.222 10.623 16.877 10.623H10.625V16.875C10.625 17.22 10.345 17.5 10 17.5C9.655 17.5 9.375 17.22 9.375 16.875V10.623H3.127C2.782 10.623 2.502 10.343 2.502 9.998C2.502 9.653 2.782 9.373 3.127 9.373H9.375V3.125C9.375 2.78 9.655 2.5 10 2.5Z" fill="#000000" /></svg>
const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M8.958 2.292C12.64 2.292 15.625 5.276 15.625 8.958C15.625 10.574 15.05 12.056 14.093 13.21L17.525 16.641C17.769 16.886 17.769 17.281 17.525 17.525C17.281 17.769 16.886 17.769 16.641 17.525L13.21 14.093C12.056 15.05 10.574 15.625 8.958 15.625C5.276 15.625 2.292 12.64 2.292 8.958C2.292 5.276 5.276 2.292 8.958 2.292ZM8.958 3.542C5.967 3.542 3.542 5.967 3.542 8.958C3.542 11.95 5.967 14.375 8.958 14.375C11.95 14.375 14.375 11.95 14.375 8.958C14.375 5.967 11.95 3.542 8.958 3.542Z" fill="#000000" /></svg>
const HashIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.333 2L4.333 14M11.666 2L9.666 14M13.666 5.333H2.333M13 10.667H1.667" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>

const TypingIndicator = ({ agent }: { agent: Agent }) => (
  <div className="msg-row agent">
    <div className="msg-avatar"><AgentIcon icon={agent.icon} size={20} /></div>
    <div className="msg-content"><div className="typing-indicator"><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></div></div>
  </div>
)

function useMessageSimulation() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [typingAgent, setTypingAgent] = useState<Agent | null>(null)
  const [activeAgentIds, setActiveAgentIds] = useState<Set<string>>(new Set())
  const [workingAgentId, setWorkingAgentId] = useState<string | null>(null)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const scheduleNext = useCallback(() => {
    if (indexRef.current >= allMessages.length) {
      setTypingAgent(null)
      setTimeout(() => setWorkingAgentId(null), 1200)
      return
    }
    const nextMsg = allMessages[indexRef.current]
    if (nextMsg.sender === 'agent') {
      const agent = allAgents.find((a) => a.id === nextMsg.agentId)
      if (agent) {
        setTypingAgent(agent)
        setWorkingAgentId(agent.id)
        setActiveAgentIds((prev) => {
          const next = new Set(prev)
          next.add(agent.id)
          return next
        })
      }
    } else setWorkingAgentId(null)

    timerRef.current = setTimeout(() => {
      setTypingAgent(null)
      setVisibleMessages((prev) => [...prev, nextMsg])
      if (nextMsg.sender === 'agent' && nextMsg.agentId) {
        setActiveAgentIds((prev) => new Set(prev).add(nextMsg.agentId!))
        setWorkingAgentId(nextMsg.agentId)
      } else setWorkingAgentId(null)
      indexRef.current++
      timerRef.current = setTimeout(scheduleNext, 600 + Math.random() * 400)
    }, nextMsg.delay)
  }, [])

  useEffect(() => {
    timerRef.current = setTimeout(scheduleNext, 800)
    return () => clearTimeout(timerRef.current)
  }, [scheduleNext])

  return { visibleMessages, typingAgent, activeAgentIds, workingAgentId }
}

function HeaderIllustration({ activeIcons }: { activeIcons: AgentIcon[] }) {
  const { containerRef, bodies, onMouseMove, onMouseLeave } = usePhysicsIcons(activeIcons)
  return <div className="header-illustration" ref={containerRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>{bodies.map((body) => <div key={body.id} className="illust-icon physics-body" style={{ width: body.baseSize + 16, height: body.baseSize + 16, transform: `translate(${body.x - (body.baseSize + 16) / 2}px, ${body.y - (body.baseSize + 16) / 2}px) rotate(${body.rotation}deg)` }}><AgentIcon icon={body.icon} size={body.baseSize} /></div>)}</div>
}

function TimelinePanel({ visibleMessageIds, completedObjectives, selectedKey, onJump, activeAgents, getAgentDisplayRole, workingAgentId }: { visibleMessageIds: Set<string>; completedObjectives: Array<(typeof objectives)[number] & { done: boolean }>; selectedKey: string | null; onJump: (messageId: string) => void; activeAgents: Agent[]; getAgentDisplayRole: (agent: Agent) => string; workingAgentId: string | null }) {
  const visibleEvents = timelineEvents.filter((_, index) => index === 0 || visibleMessageIds.size > index + 1)
  const currentObjective = completedObjectives.find((obj) => !obj.done)?.label
  return <><h2 className="panel-title">{threadTitle}</h2><div className="panel-agents panel-block">{activeAgents.length === 0 && <div className="panel-agents-empty">Waiting for agents to join...</div>}{activeAgents.map((agent) => { const isWorking = workingAgentId === agent.id; return <div className="panel-agent-pill pill-enter" key={agent.id}><div className="pill-icon"><AgentIcon icon={agent.icon} size={16} /></div><span className="pill-name">{agent.name}</span><span className={`pill-role ${isWorking ? 'working' : ''}`}>{getAgentDisplayRole(agent)}</span></div> })}</div><div className="panel-timeline-list panel-block">{visibleEvents.map((event) => { const isHighlighted = !!selectedKey && `${event.title} ${event.description} ${event.linkedObjective ?? ''}`.toLowerCase().includes(selectedKey.toLowerCase()); const isCurrent = !!event.linkedObjective && event.linkedObjective === currentObjective; if (!isCurrent) return <button type="button" className={`timeline-card compact ${isHighlighted ? 'highlighted' : ''}`} key={event.title} onClick={() => onJump(event.sourceMessageId)}><div className="timeline-compact-row"><CheckIcon /><span className="timeline-title compact-title">{event.title}</span></div></button>; return <button type="button" className={`timeline-card ${isHighlighted ? 'highlighted' : ''}`} key={event.title} onClick={() => onJump(event.sourceMessageId)}><div className="timeline-meta"><span>{event.time}</span><span className="timeline-link">{event.linkedObjective}</span></div><div className="timeline-title">{event.title}</div><p className="timeline-description">{event.description}</p></button> })}</div></>
}

function FilePanel({ items, selectedKey, onJump }: { items: FileArtifact[]; selectedKey: string | null; onJump: (messageId: string) => void }) {
  return <><h2 className="panel-title">Working files</h2><div className="panel-subtitle">File mode shows the artifacts the thread keeps touching while decisions evolve.</div><div className="panel-stack panel-block">{items.map((item) => { const isHighlighted = !!selectedKey && `${item.name} ${item.summary} ${item.status}`.toLowerCase().includes(selectedKey.toLowerCase()); return <button type="button" className={`context-card ${isHighlighted ? 'highlighted' : ''}`} key={item.name} onClick={() => onJump(item.sourceMessageId)}><div className="context-head"><span className={`context-badge ${item.status}`}>{item.status}</span><span className="context-time">{item.time}</span></div><div className="context-title">{item.name}</div><p className="context-copy">{item.summary}</p></button> })}</div></>
}

function MemoryPanel({ items, selectedKey, onJump }: { items: MemoryRecord[]; selectedKey: string | null; onJump: (messageId: string) => void }) {
  return <><h2 className="panel-title">Durable memory</h2><div className="panel-subtitle">Memory mode preserves the rules and agreements that survived the conversation.</div><div className="panel-stack panel-block">{items.map((item) => { const isHighlighted = !!selectedKey && `${item.title} ${item.summary} ${item.scope} ${item.updatedBy}`.toLowerCase().includes(selectedKey.toLowerCase()); return <button type="button" className={`context-card ${isHighlighted ? 'highlighted' : ''}`} key={item.title} onClick={() => onJump(item.sourceMessageId)}><div className="context-head"><span className="context-badge memory-scope">{item.scope}</span><span className="context-time">{item.time}</span></div><div className="context-title">{item.title}</div><p className="context-copy">{item.summary}</p><div className="context-foot">Updated by {item.updatedBy}</div></button> })}</div></>
}

function App() {
  const [panelMode, setPanelMode] = useState<PanelMode>('timeline')
  const [selectedReference, setSelectedReference] = useState<string | null>(null)
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null)
  const [headerCollapsed, setHeaderCollapsed] = useState(false)
  const { visibleMessages, typingAgent, activeAgentIds, workingAgentId } = useMessageSimulation()
  const streamEndRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const chatStreamRef = useRef<HTMLDivElement>(null)

  const activeAgents = useMemo(() => Array.from(activeAgentIds).map((id) => allAgents.find((a) => a.id === id)).filter(Boolean) as Agent[], [activeAgentIds])
  const activeIcons = useMemo<AgentIcon[]>(() => activeAgents.map((a) => a.icon), [activeAgents])
  const threadDots = useMemo(() => activeAgents.map((a) => a.color), [activeAgents])
  const visibleMessageIds = useMemo(() => new Set(visibleMessages.map((m) => m.id)), [visibleMessages])
  const completedObjectives = useMemo(() => objectives.map((obj) => ({ ...obj, done: visibleMessageIds.has(obj.afterMessageId) })), [visibleMessageIds])
  const currentPhase = useMemo(() => completedObjectives.find((o) => !o.done) ?? completedObjectives[completedObjectives.length - 1], [completedObjectives])
  const allObjectivesDone = useMemo(() => completedObjectives.every((o) => o.done), [completedObjectives])
  const getAgentDisplayRole = useCallback((agent: Agent) => {
    if (workingAgentId === agent.id) return agent.roleActive
    return agent.role
  }, [workingAgentId])

  useEffect(() => { streamEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [visibleMessages, typingAgent])
  useEffect(() => { if (!highlightedMessageId) return; const t = setTimeout(() => setHighlightedMessageId(null), 1800); return () => clearTimeout(t) }, [highlightedMessageId])
  useEffect(() => {
    const node = chatStreamRef.current
    if (!node) return
    const onScroll = () => setHeaderCollapsed(node.scrollTop > 48)
    node.addEventListener('scroll', onScroll)
    onScroll()
    return () => node.removeEventListener('scroll', onScroll)
  }, [])

  const visibleFiles = useMemo(() => fileArtifacts.slice(0, Math.min(fileArtifacts.length, Math.max(1, completedObjectives.filter((o) => o.done).length))), [completedObjectives])
  const visibleMemories = useMemo(() => memoryRecords.slice(0, Math.min(memoryRecords.length, Math.max(1, completedObjectives.filter((o) => o.done).length))), [completedObjectives])

  const handleReferenceClick = useCallback((label: string) => {
    const normalized = label.toLowerCase()
    setSelectedReference(label)
    if (normalized.includes('memory') || normalized.includes('project memory')) return setPanelMode('memory')
    if (normalized.includes('file') || normalized.includes('files') || normalized.includes('src/') || normalized.includes('.ts') || normalized.includes('.md')) return setPanelMode('file')
    setPanelMode('timeline')
  }, [])

  const jumpToMessage = useCallback((messageId: string) => {
    const el = messageRefs.current[messageId]
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setHighlightedMessageId(messageId)
  }, [])

  return <div className="app-shell"><aside className="sidebar"><div className="sidebar-top"><div className="sidebar-action"><PlusIcon /><span>New chat</span></div><div className="sidebar-action"><SearchIcon /><span>Search</span></div></div><div className="sidebar-section"><div className="section-label">Projects</div><div className="project-row"><div className="project-icon"><HashIcon /></div><span className="project-name">OpenClaw Chat UI</span></div><div className="thread-list"><div className="thread-item active"><div className="thread-dots">{threadDots.length > 0 ? threadDots.map((color, i) => <span key={i} className="thread-dot" style={{ backgroundColor: color, marginLeft: i > 0 ? -5 : 0 }} />) : <span className="thread-dot-empty" />}</div><span>Init version</span></div>{projectThreads.filter((t) => !t.active).map((thread) => <div className="thread-item" key={thread.name}><div className="thread-dots">{thread.dots.map((color, i) => <span key={i} className="thread-dot" style={{ backgroundColor: color, marginLeft: i > 0 ? -5 : 0 }} />)}</div><span className="thread-muted">{thread.name}</span></div>)}</div></div><div className="sidebar-section"><div className="section-label">Agents</div><div className="agent-list">{allAgents.map((agent) => { const isActive = activeAgentIds.has(agent.id); const isWorking = workingAgentId === agent.id; return <div className={`agent-row ${isActive ? 'agent-active' : ''}`} key={agent.id}><div className="agent-icon-wrap"><AgentIcon icon={agent.icon} size={16} /></div><span className="agent-name">{agent.name}</span><span className={`agent-role ${isWorking ? 'working' : isActive ? 'active' : ''}`}>{getAgentDisplayRole(agent)}</span></div> })}</div></div></aside><div className="main-area"><header className="top-bar"><div className="breadcrumb"><span className="breadcrumb-parent">OpenClaw Chat UI</span><span className="breadcrumb-sep">&gt;</span><span className="breadcrumb-current">Init version</span></div><div className="tab-switcher">{(['timeline', 'file', 'memory'] as PanelMode[]).map((mode) => <button key={mode} className={`tab-btn ${panelMode === mode ? 'active' : ''}`} onClick={() => { setPanelMode(mode); setSelectedReference(null) }}>{mode === 'timeline' ? 'Timeline' : mode === 'file' ? 'File' : 'Memory'}</button>)}</div></header><div className={`content-columns mode-${panelMode}`}><div className={`chat-area mode-${panelMode}`}><div className={`chat-header ${headerCollapsed ? 'collapsed' : ''}`}><div className="chat-header-text"><h1>Init version</h1><div className="chat-date">Started at Mar 18, 2026 · Active today</div></div><HeaderIllustration activeIcons={activeIcons} /></div><div className="chat-stream" ref={chatStreamRef}><div className="timestamp">Today at 09:31</div>{visibleMessages.map((message) => { if (message.sender === 'owner') return <div className={`msg-row owner msg-enter ${highlightedMessageId === message.id ? 'msg-focus' : ''}`} key={message.id} ref={(el) => { messageRefs.current[message.id] = el }}><div className="msg-bubble owner-bubble">{message.texts.map((text, i) => <p key={i}>{text}</p>)}</div></div>; const agent = allAgents.find((a) => a.id === message.agentId)!; return <div className={`msg-row agent msg-enter ${highlightedMessageId === message.id ? 'msg-focus' : ''}`} key={message.id} ref={(el) => { messageRefs.current[message.id] = el }}><div className="msg-avatar"><AgentIcon icon={agent.icon} size={20} /></div><div className="msg-content"><div className="msg-bubbles">{message.texts.map((text, i) => <div className="msg-bubble agent-bubble" key={i} style={{ backgroundColor: agent.bubbleColor }}><p>{text}</p></div>)}</div>{message.references && <div className="ref-row">{message.references.map((ref, i) => <button type="button" className={`ref-chip ${selectedReference === ref.label ? 'selected' : ''}`} key={i} onClick={() => handleReferenceClick(ref.label)}>{(ref.icon === 'rune' || ref.icon === 'iris' || ref.icon === 'mona' || ref.icon === 'goody' || ref.icon === 'nancy') && <span className="ref-chip-icon"><AgentIcon icon={ref.icon} size={12} /></span>}{ref.icon === 'check' && <CheckIcon />}{ref.icon === 'loading' && <LoadingIcon />}<span className={ref.icon === 'rune' || ref.icon === 'iris' || ref.icon === 'mona' || ref.icon === 'goody' || ref.icon === 'nancy' ? 'ref-label-bold' : 'ref-label'}>{ref.label}</span></button>)}</div>}</div></div> })}{typingAgent && <TypingIndicator agent={typingAgent} />}<div ref={streamEndRef} /></div></div><aside className="right-panel">{panelMode === 'timeline' && <TimelinePanel visibleMessageIds={visibleMessageIds} completedObjectives={completedObjectives} selectedKey={selectedReference} onJump={jumpToMessage} activeAgents={activeAgents} getAgentDisplayRole={getAgentDisplayRole} workingAgentId={workingAgentId} />}{panelMode === 'file' && <FilePanel items={visibleFiles} selectedKey={selectedReference} onJump={jumpToMessage} />}{panelMode === 'memory' && <MemoryPanel items={visibleMemories} selectedKey={selectedReference} onJump={jumpToMessage} />}{selectedReference && <div className="panel-selection panel-block"><div className="current-label">Focused reference</div><p className="current-text">{selectedReference}</p></div>}<div className="panel-current panel-block"><div className="current-label">Current</div><p className="current-text" key={`${panelMode}-${currentPhase?.label}`}>{allObjectivesDone ? 'All objectives completed. The workspace is ready.' : currentPhase?.description}</p></div></aside></div></div></div>
}

export default App
