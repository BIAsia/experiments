export type AgentIcon = 'mona' | 'rune' | 'iris' | 'goody' | 'nancy'

export type Agent = {
  id: string
  name: string
  /** Base role label, e.g. "Orchestrate" */
  role: string
  /** Active progressive form, e.g. "Orchestrating..." */
  roleActive: string
  color: string
  bubbleColor: string
  icon: AgentIcon
}

export type Message = {
  id: string
  sender: 'owner' | 'agent'
  agentId?: string
  texts: string[]
  /** Delay in ms before this message appears (relative to previous) */
  delay: number
  references?: {
    label: string
    icon?: AgentIcon | 'check' | 'loading'
  }[]
}

export type Objective = {
  label: string
  /** This objective becomes done after this message id appears */
  afterMessageId: string
  /** Description shown as "Current" while this objective is active */
  description: string
}

export const allAgents: Agent[] = [
  {
    id: 'mona',
    name: 'Mona',
    role: 'Orchestrate',
    roleActive: 'Orchestrating...',
    color: '#BEE900',
    bubbleColor: '#FFFFC8',
    icon: 'mona',
  },
  {
    id: 'rune',
    name: 'Rune',
    role: 'Build',
    roleActive: 'Building...',
    color: '#A3E8B5',
    bubbleColor: '#E6FFE6',
    icon: 'rune',
  },
  {
    id: 'iris',
    name: 'Iris',
    role: 'Research',
    roleActive: 'Researching...',
    color: '#A7B5FF',
    bubbleColor: '#F1EDFE',
    icon: 'iris',
  },
  {
    id: 'goody',
    name: 'Goody',
    role: 'Explore',
    roleActive: 'Exploring...',
    color: '#FFB6E1',
    bubbleColor: '#FFF0F8',
    icon: 'goody',
  },
  {
    id: 'nancy',
    name: 'Nancy',
    role: 'Optimize',
    roleActive: 'Optimizing...',
    color: '#E1E1E1',
    bubbleColor: '#F5F5F5',
    icon: 'nancy',
  },
]

export const objectives: Objective[] = [
  {
    label: 'Product framing',
    afterMessageId: '2',
    description: 'Define what this chat product is really for and reduce the demo to one credible page.',
  },
  {
    label: 'Structure lock',
    afterMessageId: '4',
    description: 'Lock the project-chat layout, agent roles, and the rule that files and memory expand contextually.',
  },
  {
    label: 'Realism pass',
    afterMessageId: '6',
    description: 'Make the chat demo feel like a real agent workspace, not a Discord clone.',
  },
]

export const messages: Message[] = [
  {
    id: '1',
    sender: 'owner',
    delay: 1200,
    texts: [
      'Build a chat-native workflow demo for OpenCloud. The default room should support multiple agents, and file system plus memory should expand contextually beside the conversation.',
    ],
  },
  {
    id: '2',
    sender: 'agent',
    agentId: 'mona',
    delay: 2800,
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
    delay: 3200,
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
    delay: 3000,
    texts: [
      'Project memory can begin with only two layers: short-term context and long-term agreements. Showing scope and changed-by metadata will make the system feel legible instead of mysterious.',
    ],
    references: [{ label: 'memory', icon: 'check' }],
  },
  {
    id: '5',
    sender: 'owner',
    delay: 2200,
    texts: [
      'Expand the content so the thread feels more real. I want visible time progression, and I want the current objective to sit within a longer objective timeline',
    ],
  },
  {
    id: '6',
    sender: 'agent',
    agentId: 'mona',
    delay: 3500,
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
