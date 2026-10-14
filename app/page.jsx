import ThemeSwitcher from '../components/ThemeSwitcher'

const EMAIL = 'hello@friendlytechnologies.net'
const LINKEDIN = 'https://www.linkedin.com/in/marc-loeffke-04326447/'
const GITHUB = 'https://github.com/landmarco'

const TICKER = [
  'Data Ingestion',
  'ELT Pipelines',
  'Data Modeling',
  'ML Evaluation',
  'Production Deployment',
  'Data Governance',
  'Practical Machine Learning',
  'Classical Analytics',
  'Data Visualization',
  'Modern Data Architecture',
]

const SERVICES = [
  {
    n: '01',
    title: 'Modernize the architecture',
    body: 'Assess what you have, then move it somewhere maintainable. We modernize legacy data stacks into architecture your team can actually run and own.',
  },
  {
    n: '02',
    title: 'End-to-end data products',
    body: 'Ingestion, processing, modeling, evaluation, production deployment. We take a product from raw data to shipped and working.',
  },
  {
    n: '03',
    title: 'Practical machine learning',
    body: 'Apply ML tools efficiently - and know when classical analytics is the smarter call. We build the least machinery that solves the problem.',
  },
  {
    n: '04',
    title: 'Governance & ELT advisory',
    body: 'Honest guidance for startups and small teams on data governance, ELT pipelines, and the tradeoffs that matter at your scale.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Listen',
    body: 'Understand the problem and the data before touching a pipeline.',
  },
  {
    n: '02',
    title: 'Build',
    body: 'Small, clean, working pieces. No speculation, no over-engineering.',
  },
  {
    n: '03',
    title: 'Evaluate',
    body: 'Measure output against the real task - not a benchmark that flatters us.',
  },
  {
    n: '04',
    title: 'Deploy',
    body: 'Ship to production, document it, and hand it off so your team owns it.',
  },
]

const TOOLS = [
  {
    name: 'Friendly Invisible Ink',
    glyph: '◈',
    body: 'Imperceptibly mark an image, video, or audio clip to determine provenance.',
  },
  {
    name: 'Friendly Minutes',
    glyph: '✎',
    body: 'Meeting minutes generated from transcripts and agendas, styled to match your organization\u2019s voice.',
  },
  {
    name: 'Friendly Evals',
    glyph: '✓',
    body: 'Score RFP and NOFO proposals to align with required evaluation criteria.',
  },
  {
    name: 'Friendly Photos',
    glyph: '▣',
    body: 'Manage and share photos privately.',
  },
  {
    name: 'Friendly Radio',
    glyph: '♪',
    body: 'Listen to non-commercial radio anywhere.',
  },
]

export default function Page() {
  return (
    <>
      <header className="ft-header">
        <div className="ft-wrap ft-header-inner">
          <a className="ft-wordmark" href="#top" aria-label="Friendly Technologies — home">
            Friendly <b>Technologies</b>
          </a>
          <nav className="ft-nav" aria-label="Primary">
            <div className="ft-nav-links">
              <a href="#services">Services</a>
              <a href="#approach">Approach</a>
              <a href="#tools">Tools</a>
              <a href="#contact">Contact</a>
            </div>
            <ThemeSwitcher />
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="ft-wrap ft-hero">
          <p className="ft-eyebrow">Consulting &amp; software studio — Durham, NC</p>
          <h1>
            Data, made <span className="accent">friendly.</span>
          </h1>
          <p className="lede">
            Friendly Technologies helps organizations modernize their data architecture and apply AI
            tools efficiently.
          </p>
          <div className="ft-cta-row">
            <a className="ft-btn" href={`mailto:${EMAIL}`}>
              hello@friendlytechnologies.net →
            </a>
            <a className="ft-btn ghost" href="#tools">
              See what we build
            </a>
          </div>
        </section>

        {/* ---------- ticker ---------- */}
        <div className="ft-ticker" aria-hidden="true">
          <div className="ft-ticker-track">
            {TICKER.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        {/* ---------- services ---------- */}
        <section className="ft-wrap ft-section" id="services">
          <p className="ft-section-label">01 — What we do</p>
          <h2>Services</h2>
          <div className="ft-grid">
            {SERVICES.map((s) => (
              <article className="ft-card" key={s.n}>
                <span className="num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- approach ---------- */}
        <section className="ft-wrap ft-section" id="approach">
          <p className="ft-section-label">02 — How we work</p>
          <h2>Approach</h2>
          <div className="ft-steps">
            {STEPS.map((step) => (
              <div className="ft-step" key={step.n}>
                <span className="big">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- tools ---------- */}
        <section className="ft-wrap ft-section" id="tools">
          <p className="ft-section-label">03 — Things we've built</p>
          <h2>Friendly tools</h2>
          <div className="ft-grid ft-tools">
            {TOOLS.map((t) => (
              <article className="ft-card ft-tool" key={t.name}>
                <span className="glyph" aria-hidden="true">
                  {t.glyph}
                </span>
                <h3>{t.name}</h3>
                <p>{t.body}</p>
              </article>
            ))}
          </div>
          <p className="ft-note">
            A few of the smaller tools we've made along the way, under our own Friendly banner.
            We build focused utilities like these for clients too — small, sharp, and easy to own.
          </p>
        </section>

        {/* ---------- contact ---------- */}
        <section className="ft-wrap ft-section ft-contact" id="contact">
          <p className="ft-section-label">04 — Say hello</p>
          <h2>Let's make your data friendly.</h2>
          <p>
            <a className="email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
          <div className="ft-contact-links">
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn <span className="arrow">↗</span>
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub <span className="arrow">↗</span>
            </a>
            <span>Durham, NC</span>
          </div>
        </section>
      </main>

      <footer className="ft-footer">
        <div className="ft-wrap ft-footer-inner">
          <span className="legal">Friendly Technologies, LLC</span>
          <span>© {new Date().getFullYear()} · Durham, NC · hello@friendlytechnologies.net</span>
        </div>
      </footer>
    </>
  )
}