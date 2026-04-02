import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const registrationUrl =
  "https://unstop.com/competitions/onepiece-treasure-hunt-for-unicorns-ieee-computer-society-srmist-1669384";

const heroFacts = ["Turing Hall", "One-day summit", "UG + PG founders", "1-5 founders"];

const pricingBands = [
  {
    label: "SRMIST KTR Students",
    price: "₹249 per team",
    offer: "Coupon Code",
    code: "TOP30",
    detail: "First 30 teams get tickets at ₹199",
  },
  {
    label: "External Students",
    price: "₹299 per team",
    offer: "Coupon Code",
    code: "EARLYBIRD50",
    detail: "Get tickets at ₹249",
  },
];

const signalCards = [
  {
    title: "Single Allocation",
    text: "Every startup gets one decisive funding outcome after its first pitch. No second chances, no renegotiation.",
  },
  {
    title: "Alliances & Mutinies",
    text: "Teams can merge, poach talent, or abandon failing ships during a timed 30-minute restructuring window.",
  },
  {
    title: "Boardroom Finale",
    text: "Finalists must defend a rebuilt company, not just an idea, in front of a high-pressure jury panel.",
  },
];

const overviewPoints = [
  "Real VC-style funding simulation instead of a standard ideathon.",
  "Negotiation-first gameplay where mergers and acqui-hires materially change outcomes.",
  "A final evaluation based on scale, synergy, execution, and market readiness.",
];

const summitSignals = [
  {
    label: "Audience",
    value: "UG + PG founders",
  },
  {
    label: "Format",
    value: "One-day summit",
  },
  {
    label: "Round 1",
    value: "5 min pitch + 3-4 min Q&A",
  },
  {
    label: "Final Round",
    value: "7 min pitch + 5 min unrestricted Q&A",
  },
];

const mechanics = [
  {
    index: "01",
    title: "Open Sea Investment",
    text: "Teams present once, judges run due diligence, and funding is locked immediately after the first pitch cycle.",
  },
  {
    index: "02",
    title: "Alliances & Mutinies",
    text: "A 30-minute strategy phase lets founders merge companies, poach specialists, or walk away from weak ships.",
  },
  {
    index: "03",
    title: "VC Boardroom",
    text: "Shortlisted ventures return with their rebuilt company story and face unrestricted investor-style questioning.",
  },
];

const schedule = [
  {
    time: "09:00 AM - 10:00 AM",
    phase: "Inauguration",
    text: "Welcome address, jury introduction, and briefing on the funding simulation and corporate strategy rules.",
  },
  {
    time: "10:00 AM - 12:30 PM",
    phase: "Round 1: Open Sea Investment",
    text: "Each crew delivers a 5-minute pitch followed by a 3-4 minute judges-only Q&A. Funding is then locked.",
  },
  {
    time: "12:30 PM - 01:15 PM",
    phase: "Lunch and Networking",
    text: "Founders review the board, study competitors, and quietly shape merger or talent-poaching plans.",
  },
  {
    time: "01:15 PM - 01:45 PM",
    phase: "Round 2: Alliances & Mutinies",
    text: "Thirty minutes of controlled chaos where mergers, mutinies, and restructuring forms decide the new power map.",
  },
  {
    time: "01:45 PM - 02:15 PM",
    phase: "Jury Deliberation",
    text: "The panel reviews combined funding pools, revised rosters, and the strategic strength of each restructured venture.",
  },
  {
    time: "02:15 PM - 04:00 PM",
    phase: "Final Round: VC Boardroom",
    text: "Finalists deliver a 7-minute boardroom pitch and face 5 minutes of unrestricted Q&A on scale and viability.",
  },
  {
    time: "04:00 PM - 04:30 PM",
    phase: "Closing Ceremony",
    text: "Winners are announced and the summit ends with awards, recognition, and final remarks.",
  },
];

const awards = [
  {
    title: "Unicorn of the Summit",
    text: "For the team that secures the strongest post-negotiation position and dominates the final boardroom pitch.",
  },
  {
    title: "Best Innovation Impact",
    text: "For the venture presenting the sharpest technical or conceptual leap during the summit.",
  },
  {
    title: "Best Social Impact",
    text: "For the startup with the clearest measurable value for society or the environment.",
  },
];

const partners = [
  {
    label: "Media & Energy Partner",
    name: "Sucksi",
    logo: "/logos/sucksi-linkedin.png",
    logoAlt: "Sucksi logo",
    logoTheme: "dark",
    text: "Amplifying the summit story, founder energy, and the live event atmosphere around the voyage.",
  },
  {
    label: "Internship Partner",
    name: "SpazorLabs",
    logo: "/logos/spazorlabs-logo.png",
    logoAlt: "SpazorLabs logo",
    logoTheme: "light",
    text: "Backing the event with opportunity pathways for standout builders, operators, and startup-ready talent.",
  },
  {
    label: "Platform Partner",
    name: "GradeX",
    logo: "/logos/gradex-logo.png",
    logoAlt: "GradeX logo",
    logoTheme: "transparent",
    text: "The SRMIST student platform behind attendance, timetable, marks, exam support, and campus utility workflows.",
  },
];

const ruleHighlights = [
  "Funding belongs to the startup idea, not the member.",
  "All mergers and mutinies must be submitted in writing.",
  "Unregistered verbal deals die when the buzzer ends the round.",
];

const ruleGroups = [
  {
    label: "Registration & Conduct",
    items: [
      "SRMIST KTR teams register at ₹249 per team, with TOP30 unlocking ₹199 for the first 30 teams.",
      "External teams register at ₹299 per team, with EARLYBIRD50 unlocking ₹249 tickets.",
      "Every startup may compete with 1 to 5 registered members.",
      "Harassment, intimidation, or disruptive conduct during negotiations can lead to immediate disqualification.",
    ],
  },
  {
    label: "Pitch Discipline",
    items: [
      "Round 1 pitch time is exactly 5 minutes and judges do not interrupt during the pitch.",
      "The 3-4 minute Q&A belongs only to the jury panel.",
      "Once funding is announced after Q&A, that allocation is permanently locked.",
    ],
  },
  {
    label: "Alliance Rules",
    items: [
      "Merged startups combine their Round 1 funding into one shared pool.",
      "Merged teams must select one unified product or one hybrid concept for the final boardroom.",
      "A maximum of 6 members may present on stage during the final pitch.",
    ],
  },
  {
    label: "Mutiny Rules",
    items: [
      "Any member may leave their original team if the receiving team accepts them.",
      "Poached members do not carry their old funding into the new company.",
      "If all members leave a startup, the original company is bankrupt and its funding is erased.",
    ],
  },
  {
    label: "Registry Lock-In",
    items: [
      "Every alliance or mutiny becomes valid only after submission of a signed Corporate Restructuring Form.",
      "The team leaders of all parties involved must sign the form.",
      "When the 30-minute buzzer ends the round, every unregistered verbal agreement is void.",
    ],
  },
  {
    label: "Final Authority",
    items: [
      "Finalists are chosen using post-negotiation funding positions together with jury judgment.",
      "Boardroom finalists must explain how their alliance or mutiny improved the company’s unicorn potential.",
      "The organizing committee and jury hold final authority over tallies, conduct, and disputes.",
    ],
  },
];

function App() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [backgroundVideo, setBackgroundVideo] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 820px)").matches) {
      return "/media/one-piece-phone-bg.mp4";
    }

    return "/media/startup-pitch-event-bg.mp4";
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 820px)");
    const syncBackgroundVideo = () => {
      setBackgroundVideo(
        mediaQuery.matches ? "/media/one-piece-phone-bg.mp4" : "/media/startup-pitch-event-bg.mp4",
      );
    };

    syncBackgroundVideo();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncBackgroundVideo);
    } else {
      mediaQuery.addListener(syncBackgroundVideo);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", syncBackgroundVideo);
      } else {
        mediaQuery.removeListener(syncBackgroundVideo);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          duration: 0.9,
          ease: "power3.out",
        },
      });

      intro
        .from(".hero-copy > *", {
          opacity: 0,
          y: 38,
          stagger: 0.1,
        })
        .from(
          ".hero-stage > *",
          {
            opacity: 0,
            y: 42,
            stagger: 0.12,
          },
          "-=0.55",
        )
        .from(
          ".stat-chip",
          {
            opacity: 0,
            scale: 0.92,
            stagger: 0.06,
            duration: 0.45,
          },
          "-=0.65",
        );

      gsap.utils.toArray(".reveal").forEach((section, index) => {
        gsap.from(section, {
          opacity: 0,
          y: index % 2 === 0 ? 50 : 70,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
          },
        });
      });

      media.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(".floating-badge", {
          y: -10,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero-panel", {
          rotation: 0.85,
          transformOrigin: "50% 0%",
          duration: 4.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero-orbit", {
          rotation: 1.6,
          transformOrigin: "50% -10%",
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, rootRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div className="site-shell" ref={rootRef}>
      <div className="site-video-shell" aria-hidden="true">
        <video autoPlay className="site-video" loop muted playsInline preload="metadata">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="site-video-overlay" />
      </div>

      <header className="page-chrome">
        <a className="brand" href="#hero">
          <span className="brand-copy">
            <span>ONE PIECE</span>
            <strong>IEEE CS SRM</strong>
          </span>
          <img alt="IEEE logo" className="brand-logo" src="/logos/ieee-computer.png" />
        </a>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`nav-toggle${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav${menuOpen ? " nav-open" : ""}`}>
          <a href="#overview" onClick={() => setMenuOpen(false)}>
            Overview
          </a>
          <a href="#mechanics" onClick={() => setMenuOpen(false)}>
            Mechanics
          </a>
          <a href="#schedule" onClick={() => setMenuOpen(false)}>
            Schedule
          </a>
          <a href="#rules" onClick={() => setMenuOpen(false)}>
            Rules
          </a>
          <a href="#partners" onClick={() => setMenuOpen(false)}>
            Partners
          </a>
          <a href={registrationUrl} onClick={() => setMenuOpen(false)} rel="noreferrer" target="_blank">
            Register
          </a>
        </nav>
      </header>

      <main className="content">
        <section className="hero section" id="hero">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-signal">Flagship Startup Pitch Event 2026</p>
            <h1>
              <span className="hero-title-top">ONE PIECE:</span>
              <span className="hero-title-mark">Treasure Hunt</span>
              <span className="hero-title-bottom">for Unicorns</span>
            </h1>
            <p className="hero-text">
              A pirate-themed startup summit where crews pitch once, negotiate through alliances or
              mutiny, and return as rebuilt ventures for the final boardroom.
            </p>

            <div className="pricing-signal">
              {pricingBands.map((band) => (
                <article className="pricing-card" key={band.label}>
                  <p className="pricing-card-label">{band.label}</p>
                  <strong>{band.price}</strong>
                  <p className="pricing-card-offer">{band.offer}</p>
                  <p className="pricing-card-code">{band.code}</p>
                  <p className="pricing-card-detail">{band.detail}</p>
                </article>
              ))}
            </div>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href={registrationUrl}
                rel="noreferrer"
                target="_blank"
              >
                Set Sail & Register
              </a>
              <a className="button button-secondary" href="#rules">
                View Logbook
              </a>
            </div>

            <div className="stats-row">
              {heroFacts.map((item) => (
                <span className="stat-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-stage">
            <aside className="hero-panel">
              <p className="panel-kicker">Event Premise</p>
              <h2>Pitch. Merge. Mutiny. Rebuild.</h2>
              <p>
                Judges act as venture capitalists, the treasury is fixed, and the negotiation round
                decides who reaches the final boardroom.
              </p>

              <div className="panel-facts">
                {signalCards.map((item) => (
                  <article className="signal-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </aside>

            <div className="floating-badge">
              <span>Live format</span>
              <strong>Three-round startup war room</strong>
            </div>

            <article className="hero-orbit">
              <p className="panel-kicker">Command Deck</p>
              <div className="hero-orbit-grid">
                {summitSignals.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section reveal" id="overview">
          <div className="section-heading">
            <p className="eyebrow">The Manifesto</p>
            <h2>A student startup summit run like a high-stakes sea negotiation</h2>
          </div>

          <div className="overview-grid">
            <article className="manifest-card manifest-card-copy">
              <p className="card-tag">Why this format</p>
              <p className="manifest-body">
                Traditional demo days test presentation. ONE PIECE tests judgment under pressure.
                Teams are forced to think like founders, investors, and negotiators in the same day.
              </p>
              <ul className="manifest-list">
                {overviewPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="manifest-card manifest-card-quote">
              <p className="card-tag">Event Lens</p>
              <blockquote>
                Your startup is the ship. Funding is the wind. Strategy decides whether you cross the
                grand line or sink before sunset.
              </blockquote>
            </article>

            <article className="manifest-card manifest-card-signal">
              <p className="card-tag">Crew Briefing</p>
              <h3>What teams should bring</h3>
              <p>
                A sharp deck, a credible product path, a defensible business model, and a crew that
                can survive mergers, poaching, and boardroom scrutiny.
              </p>
            </article>
          </div>
        </section>

        <section className="section reveal" id="mechanics">
          <div className="section-heading section-heading-split">
            <div>
              <p className="eyebrow">Mechanics</p>
              <h2>The three-part event arc</h2>
            </div>
            <p className="section-copy">
              Funding decisions happen early. Strategy determines survival. Only the strongest rebuilt
              company gets to finish the voyage at full scale.
            </p>
          </div>

          <div className="mechanics-grid">
            {mechanics.map((item) => (
              <article className="mechanic-card" key={item.title}>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="schedule">
          <div className="section-heading section-heading-split">
            <div>
              <p className="eyebrow">Voyage Timeline</p>
              <h2>Summit schedule</h2>
            </div>
            <p className="section-copy">
              A one-day format built to escalate from structured pitches into controlled corporate
              chaos before the boardroom finale.
            </p>
          </div>

          <div className="timeline">
            {schedule.map((item) => (
              <article className="timeline-card" key={`${item.time}-${item.phase}`}>
                <p className="timeline-time">{item.time}</p>
                <h3>{item.phase}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="awards">
          <div className="section-heading">
            <p className="eyebrow">The Spoils</p>
            <h2>Awards crews are chasing</h2>
          </div>

          <div className="awards-grid">
            {awards.map((award) => (
              <article className="award-card" key={award.title}>
                <p className="card-tag">Recognition</p>
                <h3>{award.title}</h3>
                <p>{award.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="rules">
          <div className="section-heading section-heading-split">
            <div>
              <p className="eyebrow">Rulebook</p>
              <h2>Rules of engagement</h2>
            </div>
            <p className="section-copy">
              Every funding move, roster shift, and merger must be logged. Nothing counts until it is
              officially recorded.
            </p>
          </div>

          <div className="rules-command">
            <aside className="rules-aside">
              <p className="card-tag">Critical directives</p>
              <h3>The negotiation round only matters if it is documented.</h3>
              <p>
                Funding, roster movement, and final advancement depend only on what is formally
                submitted to the organizers.
              </p>
            </aside>

            <div className="rules-directives">
              {ruleHighlights.map((item, index) => (
                <article className="directive-card" key={item}>
                  <span>{`0${index + 1}`}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rules-grid">
            {ruleGroups.map((group, index) => (
              <article className="rule-card" key={group.label}>
                <div className="rule-card-header">
                  <span>{`0${index + 1}`}</span>
                  <h3>{group.label}</h3>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="partners">
          <div className="partners-panel">
            <div className="section-heading section-heading-split">
              <div>
                <p className="eyebrow">Signal Fleet</p>
              <h2>Partners on this voyage</h2>
            </div>
            <p className="section-copy">
              External support across media, energy, and internships powers the summit beyond the
              stage.
            </p>
          </div>

            <div className="partners-grid">
              {partners.map((partner) => (
                <article className="partner-card" key={partner.name}>
                  <p className="card-tag">{partner.label}</p>
                  <div className={`partner-logo-box partner-logo-box-${partner.logoTheme}`}>
                    <img alt={partner.logoAlt} className="partner-logo" src={partner.logo} />
                  </div>
                  <h3>{partner.name}</h3>
                  <p>{partner.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reveal" id="register">
          <div className="cta-panel">
            <div>
              <p className="eyebrow">Registration Call</p>
              <h2>Build your crew and claim a place on the board</h2>
              <p className="cta-text">
                Open to UG and PG student founders with prototype or MVP-stage startups. Separate
                pricing applies for SRMIST KTR and external teams.
              </p>
              <div className="cta-actions">
                <a
                  className="button button-primary"
                  href={registrationUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Register on Unstop
                </a>
              </div>
            </div>

            <div className="cta-meta">
              <div>
                <span>Eligible Teams</span>
                <strong>1-5 founders</strong>
              </div>
              <div>
                <span>Venture Stage</span>
                <strong>Prototype to MVP</strong>
              </div>
              <div>
                <span>Venue</span>
                <strong>Turing Hall</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" />
    </div>
  );
}

export default App;
