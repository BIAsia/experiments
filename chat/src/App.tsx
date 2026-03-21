import { useMemo, useState } from 'react'
import { agents, files, memories, messages, threads } from './data/demo'
import './styles/app.css'

type PanelMode = 'files' | 'memory'

function App() {
  const [panelMode, setPanelMode] = useState<PanelMode>('files')
  const activeAgent = useMemo(() => agents[0], [])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="eyebrow">OpenCloud Demo</div>
          <h1>chat</h1>
          <p className="muted">
            A chat-native workspace for multi-agent execution, files, and memory.
          </p>
        </div>

        <section className="sidebar-section project-overview">
          <div className="section-label">Live room</div>
          <div className="overview-card">
            <div>
              <strong>opencloud talk UI A</strong>
              <p className="muted">Three agents are working in the same project chat.</p>
            </div>
            <div className="mini-stack">
              {agents.map((agent) => (
                <span className="mini-agent" key={agent.id} style={{ '--agent-accent': agent.accent } as React.CSSProperties} />
              ))}
            </div>
          </div>
        </section>

        <section className="sidebar-section">
          <div className="section-label">Project</div>
          <button className="thread active"># project chat</button>
          {threads.slice(1).map((thread) => (
            <button className="thread" key={thread}>
              # {thread}
            </button>
          ))}
        </section>

        <section className="sidebar-section">
          <div className="section-label">Agents</div>
          {agents.map((agent) => (
            <div className="agent-row" key={agent.id} style={{ '--agent-accent': agent.accent } as React.CSSProperties}>
              <span className="agent-dot" style={{ background: agent.accent }} />
              <div>
                <div className="agent-name">{agent.name}</div>
                <div className="agent-meta">
                  {agent.role} · {agent.status}
                </div>
              </div>
              <span className="memory-chip">{agent.memoryScope}</span>
            </div>
          ))}
        </section>
      </aside>

      <main className="chat-shell">
        <header className="chat-header" style={{ '--agent-accent': activeAgent.accent } as React.CSSProperties}>
          <div>
            <div className="eyebrow">Project Chat</div>
            <h2>opencloud talk UI A</h2>
            <p className="muted header-copy">
              A single room where Mona orchestrates, Rune shapes the UI shell, and Iris promotes stable agreements into memory.
            </p>
          </div>
          <div className="header-chips">
            <span className="chip strong">3 agents active</span>
            <span className="chip">default multi-agent room</span>
            <span className="chip">files + memory contextual</span>
          </div>
        </header>

        <section className="active-strip">
          <div className="strip-card">
            <div className="section-label">Current objective</div>
            <strong>Make the chat demo feel like a real agent workspace, not a Discord clone.</strong>
          </div>
          <div className="strip-card">
            <div className="section-label">State</div>
            <strong>{panelMode === 'files' ? 'Files rail is expanded' : 'Memory rail is expanded'}</strong>
          </div>
        </section>

        <div className="chat-stream">
          {messages.map((message) => {
            if (message.sender === 'owner') {
              return (
                <article className="message owner" key={message.id}>
                  <div className="message-meta">Owner · {message.meta}</div>
                  <p>{message.text}</p>
                </article>
              )
            }

            if (message.sender === 'system') {
              return (
                <article className={`system-block ${message.kind ?? ''}`} key={message.id}>
                  <div className="system-title">{message.title}</div>
                  <p>{message.text}</p>
                </article>
              )
            }

            const agent = agents.find((item) => item.id === message.agentId)!
            return (
              <article
                className="message agent"
                key={message.id}
                style={{
                  '--agent-accent': agent.accent,
                  '--agent-soft': agent.accentSoft,
                  '--agent-surface': agent.accentSurface,
                } as React.CSSProperties}
              >
                <div className="message-meta">
                  <span className="agent-inline">
                    <span className="agent-dot" style={{ background: agent.accent }} />
                    {agent.name}
                  </span>
                  <span>{agent.role}</span>
                  <span>{message.meta}</span>
                </div>

                {message.kind === 'task' || message.kind === 'summary' ? (
                  <div className="task-card">
                    <div className="task-title">{message.title}</div>
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}

                {message.references && (
                  <div className="reference-row">
                    {message.references.files?.map((file) => (
                      <span className="reference-chip file" key={file}>
                        file · {file}
                      </span>
                    ))}
                    {message.references.memories?.map((memory) => (
                      <span className="reference-chip memory" key={memory}>
                        memory · {memory}
                      </span>
                    ))}
                    {message.references.agents?.map((agentRef) => (
                      <span className="reference-chip agent" key={agentRef}>
                        agent · {agents.find((item) => item.id === agentRef)?.name ?? agentRef}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <footer className="composer">
          <div>
            <div className="section-label">Prompting this room</div>
            <div className="composer-text">
              Ask Mona to plan, delegate to Rune and Iris, or inspect files and project memory.
            </div>
          </div>
          <button className="compose-button">Invite another agent</button>
        </footer>
      </main>

      <aside className={`context-panel ${panelMode}`}>
        <div className="panel-toggle">
          <button className={panelMode === 'files' ? 'active' : ''} onClick={() => setPanelMode('files')}>
            Files
          </button>
          <button className={panelMode === 'memory' ? 'active' : ''} onClick={() => setPanelMode('memory')}>
            Memory
          </button>
        </div>

        {panelMode === 'files' ? (
          <>
            <div className="panel-header">
              <div className="eyebrow">Triggered by context</div>
              <h3>Files in play</h3>
              <p className="muted">Visible because Mona referenced working files during planning.</p>
              <div className="callout files">Triggered by Mona referencing 3 files</div>
            </div>
            <div className="panel-list">
              {files.map((file) => (
                <article className="panel-card file-card" key={file.path}>
                  <div className="file-head">
                    <strong>{file.name}</strong>
                    <span className={`status ${file.status}`}>{file.status}</span>
                  </div>
                  <div className="small-meta">{file.path} · updated by {file.updatedBy}</div>
                  <pre>{file.preview}</pre>
                </article>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="panel-header">
              <div className="eyebrow">Project memory</div>
              <h3>Remembered agreements</h3>
              <p className="muted">Long-term rules promoted from the active conversation.</p>
              <div className="callout memory">Project memory updated by Mona and Iris</div>
            </div>
            <div className="panel-list">
              {memories.map((memory) => (
                <article className="panel-card memory-card" key={memory.title}>
                  <div className="file-head">
                    <strong>{memory.title}</strong>
                    <span className={`scope ${memory.scope}`}>{memory.scope}</span>
                  </div>
                  <div className="small-meta">changed by {memory.updatedBy}</div>
                  <p>{memory.summary}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default App
