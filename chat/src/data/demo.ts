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

export type Message = {
  id: string
  sender: 'owner' | 'agent' | 'system'
  agentId?: string
  kind?: 'text' | 'task' | 'summary' | 'file-event' | 'memory-event'
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
    sender: 'owner',
    text: 'Build a chat-native workflow demo for OpenCloud. The default room should support multiple agents, and file system plus memory should expand contextually beside the conversation.',
    meta: '07:05',
  },
  {
    id: '2',
    sender: 'agent',
    agentId: 'mona',
    text: 'Understood. I will reduce the product to a single project chat first, then turn Files and Memory into contextual states triggered by the conversation itself.',
    meta: '07:06',
    references: {
      agents: ['rune', 'iris'],
      memories: ['Project memory', 'Session context'],
    },
  },
  {
    id: '3',
    sender: 'agent',
    agentId: 'mona',
    kind: 'task',
    title: 'Delegated work',
    text: 'Rune will shape the UI shell and component hierarchy. Iris will define memory and file semantics. I will synthesize everything into a coherent demo narrative.',
    meta: '07:07',
    references: {
      agents: ['rune', 'iris'],
    },
  },
  {
    id: '4',
    sender: 'agent',
    agentId: 'rune',
    text: 'I recommend a Discord-like project rail on the left, while the center stays purely chat-native. Files and Memory should not live as permanent destinations, but as contextual rails that expand when needed.',
    meta: '07:08',
    references: {
      files: ['chat/src/App.tsx'],
      memories: ['UI shell principle'],
    },
  },
  {
    id: '5',
    sender: 'agent',
    agentId: 'iris',
    text: 'Project memory can begin with only two layers: short-term context and long-term agreements. Showing scope and changed-by metadata will make the system feel legible instead of mysterious.',
    meta: '07:09',
    references: {
      memories: ['Default room is multi-agent', 'Memory expands only when triggered'],
    },
  },
  {
    id: '6',
    sender: 'system',
    kind: 'file-event',
    title: 'Files panel activated',
    text: 'Mona referenced three working files while shaping the project chat shell and agent color system.',
    meta: '07:10',
  },
  {
    id: '7',
    sender: 'agent',
    agentId: 'mona',
    text: 'This demo now covers a believable workflow: the owner defines a new chat product, I orchestrate Rune and Iris, and the resulting rules are promoted into project memory instead of disappearing into the scroll.',
    meta: '07:11',
    references: {
      files: ['chat/PRODUCT.md'],
      memories: ['Agent identity uses OKLCH accent system'],
    },
  },
  {
    id: '8',
    sender: 'system',
    kind: 'memory-event',
    title: 'Project memory updated',
    text: 'Two agreements were promoted into project memory: default multi-agent rooms and contextual side panels.',
    meta: '07:12',
  },
  {
    id: '9',
    sender: 'agent',
    agentId: 'mona',
    kind: 'summary',
    title: 'Current synthesis',
    text: 'The current structure is a single-page workspace: project threads on the left, a multi-agent chat timeline in the center, and a right rail that expands into Files or Memory whenever the discussion makes that context relevant.',
    meta: '07:13',
    references: {
      files: ['chat/src/styles/app.css'],
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
      '+ Define chat-native workflow as the primary interaction model.\n+ Default rooms support multi-agent participation.',
  },
  {
    name: 'chat/src/mock/agents.ts',
    path: '/projects/chat/src/mock/agents.ts',
    status: 'modified',
    updatedBy: 'Rune',
    preview: '+ add OKLCH accent tokens for Mona / Rune / Iris\n+ expose memoryScope and runtime status per agent',
  },
  {
    name: 'chat/MEMORY_RULES.md',
    path: '/projects/chat/MEMORY_RULES.md',
    status: 'referenced',
    updatedBy: 'Iris',
    preview: 'Long-term memory should only capture agreed rules, not every conversational detail.',
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
