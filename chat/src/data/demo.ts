export type Agent = {
  id: string
  name: string
  role: string
  color: string
  bubbleColor: string
  icon: 'mona' | 'rune' | 'iris' | 'goody' | 'nancy'
  status: string
}

export type Message = {
  id: string
  sender: 'owner' | 'agent'
  agentId?: string
  texts: string[]
  references?: {
    label: string
    icon?: 'rune' | 'iris' | 'check' | 'loading'
  }[]
}

export type Objective = {
  label: string
  done: boolean
}

export const agents: Agent[] = [
  {
    id: 'mona',
    name: 'Mona',
    role: 'Orchestrating...',
    color: '#BEE900',
    bubbleColor: '#FFFFC8',
    icon: 'mona',
    status: 'active',
  },
  {
    id: 'rune',
    name: 'Rune',
    role: 'Build',
    color: '#A3E8B5',
    bubbleColor: '#E6FFE6',
    icon: 'rune',
    status: 'idle',
  },
  {
    id: 'iris',
    name: 'Iris',
    role: 'Research',
    color: '#A7B5FF',
    bubbleColor: '#F1EDFE',
    icon: 'iris',
    status: 'idle',
  },
  {
    id: 'goody',
    name: 'Goody',
    role: 'Explore',
    color: '#FFB6E1',
    bubbleColor: '#FFF0F8',
    icon: 'goody',
    status: 'idle',
  },
  {
    id: 'nancy',
    name: 'Nancy',
    role: 'Optimize',
    color: '#E1E1E1',
    bubbleColor: '#F5F5F5',
    icon: 'nancy',
    status: 'idle',
  },
]

export const objectives: Objective[] = [
  { label: 'Product framing', done: true },
  { label: 'Structure lock', done: true },
  { label: 'Realism pass', done: true },
]

export const currentObjective =
  'Make the chat demo feel like a real agent workspace, not a Discord clone.'

export const messages: Message[] = [
  {
    id: '1',
    sender: 'owner',
    texts: [
      'Build a chat-native workflow demo for OpenCloud. The default room should support multiple agents, and file system plus memory should expand contextually beside the conversation.',
    ],
  },
  {
    id: '2',
    sender: 'agent',
    agentId: 'mona',
    texts: [
      'Understood. I want to reduce the whole concept to one believable project chat first, then let Files and Memory appear as contextual states instead of separate destinations.',
      'Rune will shape the UI shell and component hierarchy. Iris will define memory and file semantics. I will synthesize everything into a coherent demo narrative.',
    ],
    references: [
      { label: 'Build', icon: 'rune' },
      { label: 'Research', icon: 'iris' },
      { label: 'memory', icon: 'check' },
    ],
  },
  {
    id: '3',
    sender: 'agent',
    agentId: 'rune',
    texts: [
      'I recommend a Discord-like project rail on the left, while the center stays purely chat-native. Files and Memory should not live as permanent destinations, but as contextual rails that expand when needed.',
    ],
    references: [
      { label: 'chat/src/App.tsx', icon: 'check' },
      { label: 'memory', icon: 'check' },
    ],
  },
  {
    id: '4',
    sender: 'agent',
    agentId: 'iris',
    texts: [
      'Project memory can begin with only two layers: short-term context and long-term agreements. Showing scope and changed-by metadata will make the system feel legible instead of mysterious.',
    ],
    references: [{ label: 'memory', icon: 'check' }],
  },
  {
    id: '5',
    sender: 'owner',
    texts: [
      'Expand the content so the thread feels more real. I want visible time progression, and I want the current objective to sit within a longer objective timeline',
    ],
  },
  {
    id: '6',
    sender: 'agent',
    agentId: 'mona',
    texts: [
      'The thread objective is now explicit: build a convincing multi-agent chat workspace with enough history to show how decisions accumulate. Earlier objectives remain visible as milestones, and the current pass focuses on realism rather than only layout.',
    ],
    references: [
      { label: 'Build', icon: 'rune' },
      { label: 'Research', icon: 'iris' },
      { label: 'updating memory...', icon: 'loading' },
    ],
  },
]

export const projectThreads = [
  { name: 'Init version', active: true, dots: ['#BEE900', '#A3E8B5', '#A7B5FF'] },
  { name: 'UI direction', active: false, dots: ['#FFB6E1'] },
]
