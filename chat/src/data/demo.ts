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
  kind?: 'text' | 'task' | 'summary'
  title?: string
  text: string
  meta?: string
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
    text: '做一个基于 OpenCloud 的 chat-native workflow demo。默认是 multi-agent room，文件系统和记忆系统按上下文展开。',
    meta: '07:05',
  },
  {
    id: '2',
    sender: 'agent',
    agentId: 'mona',
    text: '收到。我先把产品骨架收敛成一个主 chat 页面，然后把 Files / Memory 做成由消息触发的扩展状态。',
    meta: '07:06',
  },
  {
    id: '3',
    sender: 'agent',
    agentId: 'mona',
    kind: 'task',
    title: 'Delegated work',
    text: 'Rune 负责 UI shell 与 component hierarchy；Iris 负责 memory / file semantics；我来汇总成 demo narrative。',
    meta: '07:07',
  },
  {
    id: '4',
    sender: 'agent',
    agentId: 'rune',
    text: '建议用 Discord-like 左侧组织，但中间 timeline 保持 chat-native。Files 和 Memory 不常驻，以 contextual rail 的方式展开。',
    meta: '07:08',
  },
  {
    id: '5',
    sender: 'agent',
    agentId: 'iris',
    text: 'Project memory 可以先只分两层：short-term context 与 long-term agreements。更新时展示 changed by 与 scope，会很清楚。',
    meta: '07:09',
  },
  {
    id: '6',
    sender: 'system',
    kind: 'summary',
    title: 'Context expansion triggered',
    text: 'Mona referenced 3 files and promoted 2 agreements into project memory.',
    meta: '07:10',
  },
  {
    id: '7',
    sender: 'agent',
    agentId: 'mona',
    text: '当前 demo 会覆盖一个真实工作流：老大提出 chat 产品方向，我调度 Rune 和 Iris，共同产出结构方案，并把规则沉淀进项目记忆。',
    meta: '07:11',
  },
]

export const files: FileItem[] = [
  {
    name: 'chat/PRODUCT.md',
    path: '/projects/chat/PRODUCT.md',
    status: 'created',
    updatedBy: 'Mona',
    preview: '+ Define chat-native workflow as the primary interaction model.\n+ Default rooms support multi-agent participation.',
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
    summary: 'Every project chat starts as a multi-agent room. New agents can be invited into the same thread instead of spawning isolated chats.',
  },
  {
    title: 'Agent identity uses OKLCH accent system',
    scope: 'project',
    updatedBy: 'Rune',
    summary: 'Accent color drives avatar ring, message rail, ownership chip, and single-agent conversation tint.',
  },
  {
    title: 'Memory expands only when triggered',
    scope: 'session',
    updatedBy: 'Iris',
    summary: 'The memory panel stays collapsed until a message references, promotes, or edits memory.',
  },
]
