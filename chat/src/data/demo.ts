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

export type TimelineEvent = {
  title: string
  time: string
  description: string
  linkedObjective?: string
  sourceMessageId: string
}

export type FileArtifact = {
  name: string
  status: 'created' | 'updated' | 'referenced'
  time: string
  summary: string
  sourceMessageId: string
}

export type MemoryRecord = {
  title: string
  scope: 'Project' | 'Session'
  updatedBy: string
  time: string
  summary: string
  sourceMessageId: string
}

export const threadTitle = 'Build a chat-native workflow demo'

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
    label: 'Thread opened',
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
    afterMessageId: '8',
    description: 'Make the thread feel lived-in, with mode-specific side panels and visible time progression.',
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
      'I recommend a Discord-like project rail on the left, while the center stays purely chat-native. Timeline, File, and Memory should all reuse the same right-column shell so the UI feels consistent.',
    ],
    references: [
      { label: 'chat/src/App.tsx', icon: 'check' },
      { label: 'timeline', icon: 'check' },
    ],
  },
  {
    id: '4',
    sender: 'agent',
    agentId: 'iris',
    delay: 3000,
    texts: [
      'Project memory can begin with only two layers: short-term context and long-term agreements. The memory view should read like durable rules, not like a second chat log.',
    ],
    references: [{ label: 'memory', icon: 'check' }],
  },
  {
    id: '5',
    sender: 'owner',
    delay: 2200,
    texts: [
      'Expand the content so the thread feels more real. I want visible time progression, and I want the current objective to sit within a longer objective timeline.',
    ],
  },
  {
    id: '6',
    sender: 'agent',
    agentId: 'mona',
    delay: 3300,
    texts: [
      'Then the thread itself should expose milestones. Timeline mode can become the narrative index, while File and Memory show the artifacts and rules that survived each phase.',
    ],
    references: [
      { label: 'timeline', icon: 'check' },
      { label: 'files', icon: 'check' },
      { label: 'memory', icon: 'check' },
    ],
  },
  {
    id: '7',
    sender: 'agent',
    agentId: 'rune',
    delay: 2800,
    texts: [
      'I have aligned the right rail so switching modes changes the content model, not just the tab label. Timeline shows milestones, File shows artifacts, and Memory shows durable agreements.',
    ],
    references: [
      { label: 'chat/src/App.tsx', icon: 'check' },
      { label: 'chat/src/styles/app.css', icon: 'check' },
    ],
  },
  {
    id: '8',
    sender: 'agent',
    agentId: 'iris',
    delay: 2900,
    texts: [
      'I also tightened the memory copy so it matches the UI tone. It now reads like a workspace that has been evolving for several days, not a one-shot concept dump.',
    ],
    references: [
      { label: 'Project memory', icon: 'check' },
      { label: 'updated copy...', icon: 'loading' },
    ],
  },
]

export const timelineEvents: TimelineEvent[] = [
  {
    title: 'Thread opened',
    time: 'Mar 18 · 09:12',
    description: 'The initial request defined the room as a multi-agent chat-native workspace rather than a generic messenger.',
    linkedObjective: 'Product framing',
    sourceMessageId: '1',
  },
  {
    title: 'Layout direction locked',
    time: 'Mar 19 · 14:08',
    description: 'The team aligned on a Discord-like rail, a central conversation stream, and a reusable right-side context shell.',
    linkedObjective: 'Structure lock',
    sourceMessageId: '3',
  },
  {
    title: 'Context model clarified',
    time: 'Mar 19 · 14:16',
    description: 'Memory was reduced to durable agreements, while files were reframed as working artifacts tied to milestones.',
    linkedObjective: 'Structure lock',
    sourceMessageId: '4',
  },
  {
    title: 'Realism pass started',
    time: 'Mar 22 · 09:31',
    description: 'The thread began shifting from concept explanation to lived-in collaboration, with visible objectives, history, and evolving panel content.',
    linkedObjective: 'Realism pass',
    sourceMessageId: '6',
  },
]

export const fileArtifacts: FileArtifact[] = [
  {
    name: 'chat/src/App.tsx',
    status: 'updated',
    time: 'Mar 22 · 09:34',
    summary: 'Reworked the right rail so Timeline, File, and Memory produce distinct content states under the same visual shell.',
    sourceMessageId: '7',
  },
  {
    name: 'chat/src/data/demo.ts',
    status: 'updated',
    time: 'Mar 22 · 09:41',
    summary: 'Expanded the thread into a multi-day narrative with milestones, richer references, and panel-specific content.',
    sourceMessageId: '6',
  },
  {
    name: 'chat/PRODUCT.md',
    status: 'referenced',
    time: 'Mar 22 · 09:46',
    summary: 'Used as the stable source for the overall product goal and the definition of contextual side panels.',
    sourceMessageId: '2',
  },
]

export const memoryRecords: MemoryRecord[] = [
  {
    title: 'Default rooms support multiple agents',
    scope: 'Project',
    updatedBy: 'Mona',
    time: 'Mar 18 · 09:16',
    summary: 'The project assumes collaboration between several named agents inside one thread rather than separate chats.',
    sourceMessageId: '2',
  },
  {
    title: 'The right rail changes by mode',
    scope: 'Project',
    updatedBy: 'Rune',
    time: 'Mar 22 · 09:34',
    summary: 'Timeline, File, and Memory must each reveal a different model of the same thread, not just swap a heading.',
    sourceMessageId: '7',
  },
  {
    title: 'Memory should preserve rules, not chatter',
    scope: 'Session',
    updatedBy: 'Iris',
    time: 'Mar 22 · 09:39',
    summary: 'The memory view should surface agreements that survived discussion, rather than replaying conversational fragments.',
    sourceMessageId: '8',
  },
]

export const projectThreads = [
  { name: 'Init version', active: true, dots: ['#BEE900', '#A3E8B5', '#A7B5FF'] },
  { name: 'UI direction', active: false, dots: ['#FFB6E1'] },
]
