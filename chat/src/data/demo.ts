export type Agent = {
  id: string
  name: string
  role: string
  accent: string
  accentSoft: string
  accentSurface: string
  memoryScope: string
  status: 'idle' | 'thinking' | 'running' | 'blocked' | 'done'
}

export type Phase = {
  id: string
  label: string
  range: string
  objective: string
  status: 'done' | 'active' | 'up-next'
}

export type Message = {
  id: string
  sender: 'owner' | 'agent' | 'system'
  agentId?: string
  kind?: 'text' | 'task' | 'summary' | 'file-event' | 'memory-event' | 'phase'
  title?: string
  text: string
  meta?: string
  references?: {
    files?: string[]
    memories?: string[]
    agents?: string[]
  }
}

export type FileItem = {
  name: string
  path: string
  status: 'referenced' | 'created' | 'modified'
  updatedBy: string
  preview: string
}

export type MemoryItem = {
  title: string
  scope: 'session' | 'project' | 'agent'
  updatedBy: string
  summary: string
}

export const threadObjective =
  'Turn this thread into a believable product-design workspace for a chat-native, multi-agent OpenCloud experience, with enough timeline depth to show how decisions accumulate over time.'

export const phases: Phase[] = [
  {
    id: 'phase-1',
    label: 'Phase 1',
    range: 'Mar 18 · framing',
    objective: 'Define what this chat product is really for and reduce the demo to one credible page.',
    status: 'done',
  },
  {
    id: 'phase-2',
    label: 'Phase 2',
    range: 'Mar 19 · structure',
    objective: 'Lock the project-chat layout, agent roles, and the rule that files and memory expand contextually.',
    status: 'done',
  },
  {
    id: 'phase-3',
    label: 'Phase 3',
    range: 'Mar 22 · realism',
    objective: 'Make the thread feel lived-in with real progress, time gaps, and a visible chain of objectives.',
    status: 'active',
  },
  {
    id: 'phase-4',
    label: 'Up next',
    range: 'Next pass',
    objective: 'Add single-agent DM mode and stronger transitions between message references and contextual rails.',
    status: 'up-next',
  },
]

export const agents: Agent[] = [
  {
    id: 'mona',
    name: 'Mona',
    role: 'orchestrator',
    accent: 'oklch(0.72 0.15 155)',
    accentSoft: 'oklch(0.93 0.04 155)',
    accentSurface: 'oklch(0.97 0.02 155)',
    memoryScope: 'project + session',
    status: 'running',
  },
  {
    id: 'rune',
    name: 'Rune',
    role: 'builder',
    accent: 'oklch(0.68 0.14 245)',
    accentSoft: 'oklch(0.93 0.03 245)',
    accentSurface: 'oklch(0.97 0.015 245)',
    memoryScope: 'implementation',
    status: 'thinking',
  },
  {
    id: 'iris',
    name: 'Iris',
    role: 'research',
    accent: 'oklch(0.73 0.17 325)',
    accentSoft: 'oklch(0.94 0.035 325)',
    accentSurface: 'oklch(0.975 0.015 325)',
    memoryScope: 'references + rules',
    status: 'done',
  },
]

export const threads = [
  'project chat',
  'task thread · ui direction',
  'task thread · file workflow',
  'task thread · memory model',
]

export const messages: Message[] = [
  {
    id: '1',
    sender: 'system',
    kind: 'phase',
    title: 'Phase 1 · Product framing',
    text: 'Initial scope definition. The room is still trying to decide whether this should behave like a messenger, a terminal, or a workspace.',
    meta: 'Mar 18 · 09:10',
  },
  {
    id: '2',
    sender: 'owner',
    text: 'Build a chat-native workflow demo for OpenCloud. The default room should support multiple agents, and file system plus memory should expand contextually beside the conversation.',
    meta: 'Mar 18 · 09:12',
  },
  {
    id: '3',
    sender: 'agent',
    agentId: 'mona',
    text: 'Understood. I want to reduce the whole concept to one believable project chat first, then let Files and Memory appear as contextual states instead of separate destinations.',
    meta: 'Mar 18 · 09:15',
    references: {
      agents: ['rune', 'iris'],
      memories: ['Project memory', 'Session context'],
    },
  },
  {
    id: '4',
    sender: 'agent',
    agentId: 'mona',
    kind: 'task',
    title: 'Delegated work',
    text: 'Rune will shape the UI shell and component hierarchy. Iris will define memory and file semantics. I will synthesize everything into a coherent demo narrative.',
    meta: 'Mar 18 · 09:18',
    references: {
      agents: ['rune', 'iris'],
    },
  },
  {
    id: '5',
    sender: 'system',
    kind: 'phase',
    title: 'Phase 2 · Structure lock',
    text: 'The thread moves from abstract product talk into concrete decisions: layout, rails, mock agents, and what counts as durable memory.',
    meta: 'Mar 19 · 14:00',
  },
  {
    id: '6',
    sender: 'agent',
    agentId: 'rune',
    text: 'I recommend a Discord-like project rail on the left, while the center stays purely chat-native. Files and Memory should not live as permanent destinations, but as contextual rails that expand when needed.',
    meta: 'Mar 19 · 14:08',
    references: {
      files: ['chat/src/App.tsx'],
      memories: ['UI shell principle'],
    },
  },
  {
    id: '7',
    sender: 'agent',
    agentId: 'iris',
    text: 'Project memory can begin with only two layers: short-term context and long-term agreements. Showing scope and changed-by metadata will make the system feel legible instead of mysterious.',
    meta: 'Mar 19 · 14:16',
    references: {
      memories: ['Default room is multi-agent', 'Memory expands only when triggered'],
    },
  },
  {
    id: '8',
    sender: 'system',
    kind: 'file-event',
    title: 'Files panel activated',
    text: 'Mona referenced three working files while shaping the project chat shell and agent color system.',
    meta: 'Mar 19 · 14:24',
  },
  {
    id: '9',
    sender: 'system',
    kind: 'memory-event',
    title: 'Project memory updated',
    text: 'Two agreements were promoted into project memory: default multi-agent rooms and contextual side panels.',
    meta: 'Mar 19 · 14:32',
  },
  {
    id: '10',
    sender: 'system',
    kind: 'phase',
    title: 'Phase 3 · Realism pass',
    text: 'The objective shifts from “can the layout work?” to “does this thread feel like a real collaboration with time, iteration, and evolving goals?”',
    meta: 'Mar 22 · 07:05',
  },
  {
    id: '11',
    sender: 'agent',
    agentId: 'mona',
    text: 'This demo now covers a believable workflow: the owner defines a new chat product, I orchestrate Rune and Iris, and the resulting rules are promoted into project memory instead of disappearing into the scroll.',
    meta: 'Mar 22 · 07:11',
    references: {
      files: ['chat/PRODUCT.md'],
      memories: ['Agent identity uses OKLCH accent system'],
    },
  },
  {
    id: '12',
    sender: 'owner',
    text: 'Expand the content so the thread feels more real. I want visible time progression, and I want the current objective to sit within a longer objective timeline.',
    meta: 'Mar 22 · 08:38',
  },
  {
    id: '13',
    sender: 'agent',
    agentId: 'mona',
    kind: 'summary',
    title: 'Current synthesis',
    text: 'The thread objective is now explicit: build a convincing multi-agent chat workspace with enough history to show how decisions accumulate. Earlier objectives remain visible as milestones, and the current pass focuses on realism rather than only layout.',
    meta: 'Mar 22 · 08:42',
    references: {
      files: ['chat/src/styles/app.css', 'chat/src/data/demo.ts'],
      memories: ['Default room is multi-agent', 'Memory expands only when triggered'],
      agents: ['rune', 'iris'],
    },
  },
]

export const files: FileItem[] = [
  {
    name: 'chat/PRODUCT.md',
    path: '/projects/chat/PRODUCT.md',
    status: 'created',
    updatedBy: 'Mona',
    preview:
      '+ Define chat-native workflow as the primary interaction model.\n+ Default rooms support multi-agent participation.\n+ Use the thread timeline itself as proof of product realism.',
  },
  {
    name: 'chat/src/mock/agents.ts',
    path: '/projects/chat/src/mock/agents.ts',
    status: 'modified',
    updatedBy: 'Rune',
    preview: '+ add OKLCH accent tokens for Mona / Rune / Iris\n+ expose memoryScope and runtime status per agent\n+ use thread milestones to explain who did what, and when',
  },
  {
    name: 'chat/MEMORY_RULES.md',
    path: '/projects/chat/MEMORY_RULES.md',
    status: 'referenced',
    updatedBy: 'Iris',
    preview: 'Long-term memory should only capture agreed rules, not every conversational detail. Timeline milestones can index major decisions without bloating memory.',
  },
]

export const memories: MemoryItem[] = [
  {
    title: 'Default room is multi-agent',
    scope: 'project',
    updatedBy: 'Mona',
    summary:
      'Every project chat starts as a multi-agent room. New agents can be invited into the same thread instead of spawning isolated chats.',
  },
  {
    title: 'Agent identity uses OKLCH accent system',
    scope: 'project',
    updatedBy: 'Rune',
    summary:
      'Accent color drives avatar ring, message rail, ownership chip, and single-agent conversation tint.',
  },
  {
    title: 'Memory expands only when triggered',
    scope: 'session',
    updatedBy: 'Iris',
    summary:
      'The memory panel stays collapsed until a message references, promotes, or edits memory.',
  },
]
