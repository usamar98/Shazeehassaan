import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────── DATA ─────────── */
const SERVICES = [
  { icon: '✍️', title: 'Handwriting Analysis', shortDesc: 'Discover your true personality with our expert handwriting analysis.', desc: ['Discover your true personality with our expert handwriting analysis.'] },
  { icon: '🌱', title: 'Self-improvement', shortDesc: "Everybody of us is a work in progress, growth and evolution require work and commitment it's a lifetime process.", desc: ["Everybody of us is a work in progress, growth and evolution require work and commitment it’s a lifetime process. Happily, it's always good to take a 1st step to start a habit that will enhance your wellbeing for the rest of your life, and there's every time a moment to set new objectives for yourself.", "And we will be your support to achieve your pathway of gaining insight and directions for:", "• Accountability", "• New habits formation", "• Personal growth", "• Personality development", "• Motivation", "• Social communication", "• Over thinking", "• Stress and anger management", "• Lack of confidence", "• Guilt", "• Inferior complex", "• Bad habits", "There are many of techniques that can assist you be the best version of yourself, whether you're attempting to improve your life in little ways, managing stress, or resolving issues in interpersonal relationships."] },
  { icon: '👨‍👩‍👧‍👦', title: 'Parenting', shortDesc: 'Guidance and support for navigating the journey of parenting.', desc: ['Guidance and support for navigating the journey of parenting.'] },
  { icon: '🛑', title: 'Addictions', shortDesc: 'Comprehensive support and strategies to overcome addictions.', desc: ['Comprehensive support and strategies to overcome addictions.'] },
  { icon: '🌧️', title: 'Depression', shortDesc: 'Depression belongs into the umbrella of mood disorders. It can be defined as feelings that interfere with a person\'s day-to-day activities.', desc: ["Depression belongs into the umbrella of mood disorders. It can be defined as feelings that interfere with a person's day-to-day activities, such as sadness, sorrow, or hostility.", "Depression can be feel in different ways it varies person to person It could get in the way of your normal responsibilities, costing you time and productivity. It may also have an impact on certain long-term health conditions and interactions.", "If you experience some of the following signs and symptoms of depression nearly every day for at least 2 weeks, you may be living with depression:", "• feeling sad, anxious, or “empty”", "• feeling hopeless, worthless, and pessimistic", "• crying a lot", "• feeling bothered, annoyed, or angry", "• loss of interest in hobbies and interests you once enjoyed", "• decreased energy or fatigue", "• difficulty concentrating, remembering, or making decisions", "• moving or talking more slowly", "• difficulty sleeping, early morning awakening, or oversleeping", "• appetite or weight changes", "• chronic physical pain with no clear cause that does not get better with treatment (headaches, aches or pains, digestive problems, cramps)", "• thoughts of death, suicide, self-harm, or suicide attempts", "The symptoms of depression can be experienced differently among males, females, teens, and children.", "Males may experience symptoms related to their:\n• mood, such as anger, aggressiveness, irritability, anxiousness, or restlessness\n• emotional well-being, such as feeling empty, sad, or hopeless\n• behavior, such as loss of interest, feeling tired easily, thoughts of suicide, drinking excessively\n• sexual interest, such as reduced sexual desire\n• cognitive abilities, such as inability to concentrate\n• sleep patterns, such as insomnia\n• physical well-being, such as fatigue", "Females may experience symptoms related to their:\n• mood, such as irritability\n• emotional well-being, such as feeling sad or empty\n• behavior, such as loss of interest in activities\n• cognitive abilities, such as thinking or talking more slowly\n• sleep patterns, such as difficulty sleeping\n• physical well-being, such as decreased energy", "Children may experience symptoms related to their:\n• mood, such as irritability\n• emotional well-being, such as feelings of incompetence\n• behavior, such as getting into trouble at school\n• cognitive abilities, such as difficulty concentrating\n• sleep patterns, such as difficulty sleeping\n• physical well-being, such as loss of energy", "It’s important to realize that feeling down at times is a normal part of life. Sad and upsetting events happen to everyone."] },
  { icon: '😰', title: 'Anxiety', shortDesc: 'Identify triggers and learn coping mechanisms to manage anxiety.', desc: ['Identify triggers and learn coping mechanisms to manage anxiety.'] },
  { icon: '🧩', title: 'Autism', shortDesc: 'Specialized support and understanding for individuals with Autism.', desc: ['Specialized support and understanding for individuals with Autism.'] },
  { icon: '🎯', title: 'ADHD', shortDesc: 'Strategies to improve focus, organization, and daily functioning.', desc: ['Strategies to improve focus, organization, and daily functioning.'] },
  { icon: '❤️', title: 'Emotions', shortDesc: 'Learn to understand, process, and regulate your emotions effectively.', desc: ['Learn to understand, process, and regulate your emotions effectively.'] },
  { icon: '👶', title: 'Postpartum depression', shortDesc: 'Postpartum depression refers to depression that happens after childbirth. It is a common disorder...', desc: ["Postpartum depression refers to depression that happens after childbirth. It is a common disorder after pregnancy.", "if you feel sad, hopeless, or empty for longer than 2 weeks post-childbirth, you may have postpartum depression.", "Symptoms of postpartum depression can range from mild to severe and can include:", "• feeling restless or moody\n• feeling sad, hopeless, or overwhelmed\n• having thoughts of hurting the baby or yourself\n• not having an interest in the baby\n• having no energy or motivation\n• eating too little or too much\n• sleeping too little or too much\n• having trouble focusing\n• having memory problems\n• feeling worthless, guilty\n• withdrawing from activities you once enjoyed\n• withdrawing from friends and family\n• having headaches, aches, or stomach issues\n• feeling empty, unconnected", "Postpartum depression is thought to be triggered by the dramatic hormonal changes that take place after pregnancy."] }
]

const TIMELINE = [
  { title: 'Initial Assessment', desc: 'A comprehensive 90-minute session where we explore your history, concerns, and aspirations to create a complete picture of your needs.' },
  { title: 'Personalized Plan', desc: 'Together, we craft a tailored treatment roadmap with clear goals, evidence-based strategies, and realistic milestones.' },
  { title: 'Active Therapy', desc: 'Regular sessions using proven therapeutic techniques, with continuous progress tracking and adaptive adjustments.' },
  { title: 'Growth & Maintenance', desc: 'Building long-term resilience through skill consolidation, relapse prevention, and ongoing self-development tools.' },
]

const TESTIMONIALS = [
  { text: '"She\'s really good at what she\'s doing. Very good at listening to people as well find the best way to cope with what the person is experiencing. She care about others wellbeing. She\'s absolutely amazing in her profession."', name: 'sephorajb', location: 'United States', initials: 'SE' },
  { text: '"Outstanding service, as usual! Our stakeholders are extremely happy with the services provided. As you may notice, we are a repeat customer. Thank you very much."', name: 'genidma', location: 'Canada', initials: 'GE' },
  { text: '"She taught me techniques to help me. Learn a lot this lesson. Really recommend this therapy session."', name: 'jeffho329', location: 'Taiwan', initials: 'JH' },
  { text: '"Very good session. Very recommend. Feel a lot better after talking to her. I was feeling very bad."', name: 'jeffho329', location: 'Taiwan', initials: 'JH' },
  { text: '"She is a very professional, and she is to the point, and recommend her. Excellent communication skill. Excellent work quality."', name: 'zaman9595', location: 'Saudi Arabia', initials: 'ZA' },
  { text: '"Shazeen was incredibly versatile and responsive. Definitely recommended."', name: 'guygsg', location: 'Singapore', initials: 'GU' },
  { text: '"It was great. She asked me my problems. I told her she gave me a solution for each problem. Now I feel better. 100% recommended."', name: 'gggemo', location: 'Bangladesh', initials: 'GG' },
  { text: '"Very Awesome. Professional and Very Knowledgeable."', name: 'shaunjordanhear', location: 'United States', initials: 'SJ' },
]

const REVIEW_IMAGES = [
  '/review/image copy.png',
  '/review/image copy 2.png',
  '/review/image copy 4.png',
  '/review/image copy 6.png',
]

const FAQS = [
  { q: 'What should I expect during my first session?', a: 'Your initial session is a relaxed, 90-minute conversation where we explore your background, current concerns, and what you hope to achieve. There\'s no pressure — it\'s about building a foundation of understanding and trust.' },
  { q: 'How long does therapy typically last?', a: 'Treatment length varies based on individual needs. Some clients see significant improvement in 8–12 sessions, while deeper work may span 6–12 months. We\'ll discuss realistic timelines during your assessment.' },
  { q: 'Do you accept insurance?', a: 'Yes, we accept most major insurance plans including Blue Cross, Aetna, Cigna, and UnitedHealthcare. We also offer sliding-scale fees for those without insurance coverage.' },
  { q: 'Is everything I share confidential?', a: 'Absolutely. All sessions are strictly confidential under HIPAA regulations. Information is only shared with your explicit written consent, or in rare cases required by law involving imminent safety concerns.' },
  { q: 'Can I do sessions online?', a: 'Yes! We offer secure telehealth sessions via a HIPAA-compliant video platform. Many clients find virtual therapy just as effective and more convenient than in-person visits.' },
  { q: 'How do I know if therapy is right for me?', a: 'If you\'re dealing with persistent stress, relationship difficulties, anxiety, depression, or simply feel stuck — therapy can help. We offer a free 15-minute consultation to help you decide.' },
]

const CHAT_RESPONSES = {
  'What services do you offer?': 'We offer Cognitive Behavioral Therapy, Anxiety & Depression treatment, EMDR Trauma Recovery, Couples & Family Therapy, Stress Management, and Mindfulness & Wellness programs. Each is tailored to your unique needs. Would you like to book a consultation?',
  'How do I book an appointment?': 'You can book directly through our calendar above, or call us at (555) 234-5678. We also offer a free 15-minute phone consultation for new clients!',
  'What are your rates?': 'Our standard session rate is $180 for individual therapy (50 min) and $220 for couples sessions (75 min). We accept most major insurance plans and offer sliding-scale options.',
  'Tell me about Dr. Qamar': 'Dr. Shazeen Qamar is a licensed clinical psychologist with 7+ years of experience. She holds a Master\'s in Clinical Psychology, is board-certified in CBT and EMDR, and has helped over 1,200 clients on their healing journeys.',
}
const QUICK_REPLIES = ['What services do you offer?', 'How do I book an appointment?', 'What are your rates?', 'Tell me about Dr. Qamar']

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const TIME_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM']
const NAV_LINKS = ['About', 'Services', 'Approach', 'Testimonials', 'Booking', 'FAQ']

/* ─────────── SCROLL REVEAL HOOK ─────────── */
function useReveal() {
  // Animations disabled per user request for instant loading
  useEffect(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
  }, [])
}

/* ─────────── NAVBAR ─────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = NAV_LINKS.map(s => document.getElementById(s.toLowerCase()))
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].getBoundingClientRect().top < 200) {
          setActive(NAV_LINKS[i]); return
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="nav-logo">
          <span className="nav-logo-icon">✦</span>
          Solace Pathway
        </a>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className={active === l ? 'active' : ''} onClick={() => setMenuOpen(false)}>{l}</a></li>
          ))}
          <li><a href="#booking" className="nav-cta" onClick={() => setMenuOpen(false)}>Book Session</a></li>
        </ul>
        <button className={`nav-toggle${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

/* ─────────── HERO ─────────── */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-gradient hero-gradient-1" />
      <div className="hero-gradient hero-gradient-2" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge"><span className="hero-badge-dot" /> Now Accepting New Patients</div>
          <h1 className="hero-title">Your Journey to <span>Inner Peace</span> Starts Here</h1>
          <p className="hero-desc">Expert clinical psychology services rooted in compassion, evidence-based practices, and a genuine commitment to your mental wellbeing.</p>
          <div className="hero-buttons">
            <a href="#booking" className="btn-primary">Book a Consultation →</a>
            <a href="#about" className="btn-outline">Learn More</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><h3>7+</h3><p>Years Experience</p></div>
            <div className="hero-stat"><h3>1,200+</h3><p>Clients Helped</p></div>
            <div className="hero-stat"><h3>98%</h3><p>Satisfaction Rate</p></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit hero-orbit-1">
            <span className="orbit-dot orbit-dot-1" />
            <span className="orbit-dot orbit-dot-2" />
          </div>
          <div className="hero-orbit hero-orbit-2">
            <span className="orbit-dot orbit-dot-3" />
            <span className="orbit-dot orbit-dot-4" />
          </div>
          <div className="hero-arch">
            <img src="/Shazeen.jpeg" alt="Dr. Shazeen Qamar — Clinical Psychologist" />
          </div>
          <div className="hero-float-card card-1">
            <span className="float-icon">🎓</span>
            <div><strong style={{ color: 'var(--white)' }}>Master's Degree</strong><br /><span style={{ color: 'var(--gray)', fontSize: '0.78rem' }}>Clinical Psychology</span></div>
          </div>
          <div className="hero-float-card card-2">
            <span className="float-icon">⭐</span>
            <div><strong style={{ color: 'var(--white)' }}>4.9 / 5.0 Rating</strong><br /><span style={{ color: 'var(--gray)', fontSize: '0.78rem' }}>380+ Client Reviews</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── ABOUT ─────────── */
function About() {
  const credentials = [
    { icon: '🎓', text: 'MS, Clinical Psychology' },
    { icon: '📋', text: 'Licensed Clinical Psychologist' },
    { icon: '🏅', text: 'Board Certified — CBT' },
    { icon: '🔬', text: 'EMDR Certified Therapist' },
    { icon: '📚', text: '40+ Published Research Papers' },
    { icon: '🏛️', text: 'APA Fellow Member' },
  ]
  return (
    <section className="about" id="about">
      <div className="morph-blob morph-blob-orange" style={{ width: 400, height: 400, top: -100, right: -100 }} />
      <div className="container">
        <div className="about-image reveal">
          <div className="about-image-main">
            <img src="/Shazeen.jpeg" alt="Dr. Shazeen Qamar" />
          </div>
          <div className="about-experience-badge">
            <h3>7+</h3>
            <p>Years of Practice</p>
          </div>
        </div>
        <div className="about-content">
          <div className="reveal">
            <p className="section-label">About Dr. Qamar</p>
            <h2 className="section-title">Dedicated to Your <span className="gradient-text">Mental Wellness</span></h2>
          </div>
          <p className="about-text reveal reveal-delay-1">I believe that every person has the innate capacity for growth and healing. With over 7 years of clinical experience, I provide a warm, non-judgmental space where you can explore your thoughts, process difficult emotions, and develop the tools you need to thrive.</p>
          <p className="about-text reveal reveal-delay-2">My integrative approach combines evidence-based therapies — including CBT, EMDR, and mindfulness — tailored uniquely to you. Whether you're navigating anxiety, healing from trauma, or seeking deeper self-understanding, I'm here to walk alongside you.</p>
          <div className="credentials-grid reveal reveal-delay-3">
            {credentials.map((c, i) => (
              <div className="credential-item" key={i}><span className="credential-icon">{c.icon}</span>{c.text}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── SERVICES ─────────── */
function Services() {
  const [expanded, setExpanded] = useState(null)
  return (
    <section className="services" id="services">
      <div className="morph-blob morph-blob-blue" style={{ width: 500, height: 500, bottom: -150, left: -200 }} />
      <div className="container">
        <div className="services-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>What I Offer</p>
          <h2 className="section-title">Specialized <span className="gradient-text">Therapeutic Services</span></h2>
          <p className="section-subtitle">Comprehensive mental health care designed to address your unique challenges with proven, evidence-based approaches.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className={`service-card reveal reveal-delay-${i % 3 + 1} ${expanded === i ? 'expanded' : ''}`} key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              {expanded === i ? (
                <div className="service-details">
                  {s.desc.map((p, idx) => (
                    <p key={idx} style={{whiteSpace: 'pre-wrap', marginBottom: '10px'}}>{p}</p>
                  ))}
                </div>
              ) : (
                <p>{s.shortDesc}</p>
              )}
              <span className="learn-more" onClick={() => setExpanded(expanded === i ? null : i)} style={{cursor: 'pointer', display: 'inline-block', marginTop: '10px'}}>
                {expanded === i ? 'Show Less ↑' : 'Learn More →'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── APPROACH TIMELINE ─────────── */
function Approach() {
  return (
    <section className="approach" id="approach">
      <div className="container">
        <div className="approach-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>The Process</p>
          <h2 className="section-title">My <span className="gradient-text">Therapeutic Approach</span></h2>
          <p className="section-subtitle">A structured yet flexible framework designed to guide you from your first call to lasting transformation.</p>
        </div>
        <div className="timeline">
          {TIMELINE.map((step, i) => (
            <div className={`timeline-step reveal reveal-delay-${i + 1}`} key={i}>
              <div className="timeline-number">{i + 1}</div>
              <div className="timeline-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── TESTIMONIALS ─────────── */
function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [exit, setExit] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setExit(true)
      setTimeout(() => { setCurrent(p => (p + 1) % TESTIMONIALS.length); setExit(false) }, 500)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="testimonials" id="testimonials">
      <div className="morph-blob morph-blob-orange" style={{ width: 350, height: 350, top: '10%', left: '-5%' }} />
      <div className="container">
        <div className="testimonials-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>Client Stories</p>
          <h2 className="section-title">Words That <span className="gradient-text">Inspire Us</span></h2>
          <p className="section-subtitle">Real experiences from clients who found their path to healing — all verified 5-star reviews.</p>
        </div>
        <div className="testimonial-carousel reveal reveal-delay-2">
          {TESTIMONIALS.map((t, i) => (
            <div className={`testimonial-card${i === current ? (exit ? ' exit' : ' active') : ''}`} key={i}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <h4>{t.name}</h4>
                  <p>📍 {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-dots reveal reveal-delay-3">
          {TESTIMONIALS.map((_, i) => (
            <button className={`testimonial-dot${i === current ? ' active' : ''}`} key={i} onClick={() => { setExit(false); setCurrent(i) }} aria-label={`Testimonial ${i + 1}`} />
          ))}
        </div>
        {/* Real review screenshots */}
        <div className="review-screenshots reveal reveal-delay-3">
          <p className="review-screenshots-label">Verified Client Reviews</p>
          <div className="review-screenshots-grid">
            {REVIEW_IMAGES.map((img, i) => (
              <div className="review-screenshot-card" key={i}>
                <img src={img} alt={`Client review screenshot ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── BOOKING CALENDAR ─────────── */
function Booking() {
  const [step, setStep] = useState(0)
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const isDisabled = (d) => {
    const date = new Date(year, month, d)
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || date.getDay() === 0 || date.getDay() === 6
  }
  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const handleSubmit = () => { setSubmitted(true); setStep(3) }

  const stepLabels = ['Select Date', 'Choose Time', 'Your Details', 'Confirmed']

  return (
    <section className="booking" id="booking">
      <div className="container">
        <div className="booking-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>Schedule</p>
          <h2 className="section-title">Book Your <span className="gradient-text">Session</span></h2>
          <p className="section-subtitle">Select a convenient date and time for your appointment.</p>
        </div>
        <div className="booking-container reveal reveal-delay-2">
          <div className="booking-steps">
            {stepLabels.map((l, i) => (
              <div className={`booking-step${step === i ? ' active' : ''}${step > i ? ' completed' : ''}`} key={i}>
                <span className="step-num">{step > i ? '✓' : i + 1}</span>{l}
              </div>
            ))}
          </div>
          <div className="booking-body">
            {step === 0 && (
              <div className="calendar">
                <div className="calendar-header">
                  <button className="cal-nav" onClick={prevMonth}>‹</button>
                  <h3>{MONTHS[month]} {year}</h3>
                  <button className="cal-nav" onClick={nextMonth}>›</button>
                </div>
                <div className="calendar-weekdays">{WEEKDAYS.map(d => <span key={d}>{d}</span>)}</div>
                <div className="calendar-days">
                  {Array(firstDay).fill(null).map((_, i) => <div className="cal-day empty" key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
                    <button
                      key={d}
                      className={`cal-day${selectedDate?.d === d && selectedDate?.m === month && selectedDate?.y === year ? ' selected' : ''}${isDisabled(d) ? ' disabled' : ''}${isToday(d) ? ' today' : ''}`}
                      disabled={isDisabled(d)}
                      onClick={() => setSelectedDate({ d, m: month, y: year })}
                    >{d}</button>
                  ))}
                </div>
                <div className="booking-nav">
                  <div />
                  <button className="btn-next" disabled={!selectedDate} onClick={() => setStep(1)}>Continue →</button>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="time-slots">
                <h3>Available Time Slots</h3>
                <p>{MONTHS[selectedDate.m]} {selectedDate.d}, {selectedDate.y}</p>
                <div className="time-grid">
                  {TIME_SLOTS.map(t => (
                    <button key={t} className={`time-slot${selectedTime === t ? ' selected' : ''}`} onClick={() => setSelectedTime(t)}>{t}</button>
                  ))}
                </div>
                <div className="booking-nav">
                  <button className="btn-back" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn-next" disabled={!selectedTime} onClick={() => setStep(2)}>Continue →</button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="booking-form">
                <h3>Your Information</h3>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(555) 000-0000" />
                </div>
                <div className="form-group">
                  <label>Service Type</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Anything you'd like us to know..." />
                </div>
                <div className="booking-nav">
                  <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-next" disabled={!form.name || !form.email} onClick={handleSubmit}>Confirm Booking →</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="booking-confirmation">
                <div className="confirm-icon">✓</div>
                <h3>Appointment Confirmed!</h3>
                <p>A confirmation email has been sent to {form.email}</p>
                <div className="confirm-details">
                  <div className="detail-row"><span>Date:</span><span>{MONTHS[selectedDate.m]} {selectedDate.d}, {selectedDate.y}</span></div>
                  <div className="detail-row"><span>Time:</span><span>{selectedTime}</span></div>
                  <div className="detail-row"><span>Service:</span><span>{form.service || 'General Consultation'}</span></div>
                  <div className="detail-row"><span>Client:</span><span>{form.name}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── FAQ ─────────── */
function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>Common Questions</p>
          <h2 className="section-title">Frequently <span className="gradient-text">Asked Questions</span></h2>
          <p className="section-subtitle">Everything you need to know before starting your therapeutic journey.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={`faq-item reveal reveal-delay-${(i % 3) + 1}${open === i ? ' open' : ''}`} key={i}>
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span className="faq-chevron">▼</span>
              </button>
              <div className="faq-answer"><div className="faq-answer-inner">{f.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── CHATBOT ─────────── */
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 I\'m the Solace Pathway assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages, typing])

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { type: 'user', text }])
    setInput('')
    setShowQuickReplies(false)
    setTyping(true)

    const response = CHAT_RESPONSES[text] ||
      "Thank you for your question! For personalized assistance, please call us at (555) 234-5678 or book a consultation through our calendar. Dr. Ashworth and the team are here to help you on your path to wellness."

    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { type: 'bot', text: response }])
      setTimeout(() => setShowQuickReplies(true), 400)
    }, 1200 + Math.random() * 800)
  }, [])

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(input) }

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Chat" style={isOpen ? { animation: 'none' } : {}}>
        {isOpen ? '✕' : '💬'}
      </button>
      <div className={`chatbot-panel${isOpen ? ' open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">✦</div>
            <div>
              <h4>Solace Assistant</h4>
              <p><span className="online-dot" /> Online Now</p>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="chatbot-messages" ref={messagesRef}>
          {messages.map((m, i) => (
            <div className={`chat-message ${m.type}`} key={i}>{m.text}</div>
          ))}
          {typing && (
            <div className="typing-indicator"><span /><span /><span /></div>
          )}
          {showQuickReplies && !typing && (
            <div className="quick-replies">
              {QUICK_REPLIES.map(q => (
                <button className="quick-reply" key={q} onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>
          )}
        </div>
        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." />
          <button type="submit" aria-label="Send">→</button>
        </form>
      </div>
    </>
  )
}

/* ─────────── FOOTER ─────────── */
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="nav-logo">
              <span className="nav-logo-icon">✦</span>
              Solace Pathway
            </a>
            <p>Expert clinical psychology services dedicated to helping you find clarity, resilience, and lasting well-being.</p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="LinkedIn">in</a>
              <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
              <a href="#" className="social-link" aria-label="Instagram">◻</a>
              <a href="#" className="social-link" aria-label="Facebook">f</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Individual Therapy</a></li>
              <li><a href="#services">Couples Counseling</a></li>
              <li><a href="#services">Trauma Recovery</a></li>
              <li><a href="#services">Stress Management</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#approach">Our Approach</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:5552345678">📞 (555) 234-5678</a></li>
              <li><a href="mailto:hello@solacepathway.com">✉ hello@solacepathway.com</a></li>
              <li><a href="#">📍 142 Serenity Lane, Suite 400</a></li>
              <li><a href="#">     Portland, OR 97205</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Solace Pathway. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service · HIPAA Compliance</span>
        </div>
      </div>
    </footer>
  )
}

/* ─────────── APP ─────────── */
export default function App() {
  useReveal()

  return (
    <>


      <div className="grain-overlay" />
      <div className="grid-bg" />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Approach />
      <Testimonials />
      <Booking />
      <FAQ />
      <Chatbot />
      <Footer />
    </>
  )
}
