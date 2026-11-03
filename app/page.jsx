import ThemeSwitcher from '../components/ThemeSwitcher'

const EMAIL = 'hello@friendlytechnologies.net'
const LINKEDIN = 'https://www.linkedin.com/in/marc-loeffke-04326447/'
const GITHUB = 'https://github.com/landmarco'

const CAPABILITIES = [
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
    title: 'Modernize your architecture',
    body: 'Help your databases scale before they become painful. We modernize legacy data stacks into architecture your team can easily maintain.',
  },
  {
    n: '02',
    title: 'End-to-end data products',
    body: 'Ingestion, processing, modeling, evaluation, production deployment. We make your dreams for data analysis a reality.',
  },
  {
    n: '03',
    title: 'Practical machine learning',
    body: 'Apply ML tools efficiently - and know when classical analytics is the smarter call. Build only what you need and cut out the bloat.',
  },
  {
    n: '04',
    title: 'Governance & ELT advisory',
    body: 'Honest guidance for startups and small teams on data governance, ELT pipelines, and the tradeoffs that matter at your scale.',
  },
]

const VALUES = [
  {
    n: '01',
    title: 'Trust',
    body: 'Your data stays your data. We never collect it, and you keep full control of everything we touch.',
  },
  {
    n: '02',
    title: 'Libre and open source',
    body: 'We default to free and open-source software in what we create and what we use - no black boxes, nothing that locks you in.',
  },
  {
    n: '03',
    title: 'Built to be yours',
    body: 'Everything we build is yours to use, remix, and build on. We ship the keys along with the solution.',
  },
]

const TOOLS = [
  {
    name: 'Friendly Evals',
    glyph: '✓',
    body: 'Score RFP and NOFO proposals to align with evaluation criteria. Shorten proposal review process from months to minutes.',
  },
  {
    name: 'Friendly Minutes',
    glyph: '✎',
    body: 'Meeting minutes generated from transcripts and agendas, styled to match your organization\u2019s voice.',
  },
  {
    name: 'Friendly Harness',
    glyph: '▣',
    body: 'AI harness that guides subagents to the efficient level of compute and helps the user understand their environmental impact.',
  },
  {
    name: 'Friendly Invisible Ink',
    glyph: '◈',
    body: 'Imperceptibly mark an image, video, or audio clip to determine provenance.',
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
          <a className="ft-wordmark" href="#top" aria-label="Friendly Technologies, LLC — home">
            Friendly <b>Technologies</b>, LLC
          </a>
          <nav className="ft-nav" aria-label="Primary">
            <div className="ft-nav-links">
              <a href="#services">Services</a>
              <a href="#tools">Tools</a>
              <a href="#contact">Contact</a>
            </div>
            {/* Theme switcher hidden from visitors. Re-enable by uncommenting.
                Dev-only: localStorage.setItem('ft-theme','violet') then reload. */}
            {/* <ThemeSwitcher /> */}
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
          {/* "See what we build" button commented out until it has a landing spot.
          <div className="ft-cta-row">
            <a className="ft-btn ghost" href="#tools">
              See what we build
            </a>
          </div> */}
        </section>

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
          <p className="ft-cap-label">What we work with</p>
          <div className="ft-tags">
            {CAPABILITIES.map((item) => (
              <span className="ft-tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- values ---------- */}
        <section className="ft-wrap ft-section" id="values">
          <p className="ft-section-label">02 — Why friendly</p>
          <h2>What makes our tech friendly</h2>
          <div className="ft-steps">
            {VALUES.map((v) => (
              <div className="ft-step" key={v.n}>
                <span className="big">{v.n}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
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
