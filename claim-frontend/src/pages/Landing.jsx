import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import heroBg from "../assets/hero-bg.jpg";

function Landing() {
  const navigate = useNavigate();
  const [liveClaims, setLiveClaims] = useState(2547);
  const [scrollY, setScrollY] = useState(0);

  // Animated counter for live claims
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveClaims(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const newsItems = [
    "🚀 ClaimPilot v2.1 launched with enhanced OCR accuracy",
    "📊 2,547 claims processed this month with 98% accuracy",
    "🤖 New GenAI model improves rejection reasoning by 40%",
    "🏆 Featured in InsurTech Weekly's Top 10 AI Innovations",
    "⚡ Average claim processing time now under 12 seconds",
    "🔐 SOC 2 Type II compliance certification achieved",
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Claims Manager, SecureLife Insurance",
      text: "ClaimPilot reduced our claims processing time by 90%. Our team now focuses on complex cases only.",
      avatar: "PS",
    },
    {
      name: "Rajesh Kumar",
      role: "CTO, Bharat InsureTech",
      text: "The explainable AI feature is a game-changer. Every decision comes with clear reasoning.",
      avatar: "RK",
    },
    {
      name: "Anjali Mehta",
      role: "Head of Operations, GlobalAssure",
      text: "Best investment we made this year. ROI was visible within the first month itself.",
      avatar: "AM",
    },
  ];

  const partners = ["SecureLife", "BharatInsure", "GlobalAssure", "TrustCover", "PrimeShield"];

  return (
    <div className="cp-landing">

      {/* NAVBAR */}
      <nav className="cp-nav">
        <div className="cp-nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span>✈️</span>
          <span>ClaimPilot</span>
        </div>
        <div className="cp-nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#testimonials">Reviews</a>
        </div>
        <button className="cp-nav-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </nav>

      {/* HERO */}
      <section
        className="cp-hero"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundPosition: `center ${scrollY * 0.3}px`,
        }}
      >
        <div className="cp-hero-overlay"></div>
        <div className="cp-hero-inner">
          <div className="cp-badge">
            <span className="cp-dot"></span>
            LIVE • {liveClaims.toLocaleString()} claims processed
          </div>

          <h1 className="cp-title">ClaimPilot</h1>
          <p className="cp-tagline">Your AI co-pilot for insurance claims</p>
          <p className="cp-subtitle">
            Upload a document. Get instant AI-powered decisions.
            Powered by OCR, GenAI & smart policy validation.
          </p>

          <div className="cp-cta-row">
            <button className="cp-btn cp-btn-primary" onClick={() => navigate("/login")}>
              🚀 Sign In
            </button>
            <button className="cp-btn cp-btn-secondary" onClick={() => navigate("/register")}>
              ✨ Sign Up
            </button>
            <button className="cp-btn cp-btn-admin" onClick={() => navigate("/admin-login")}>
              🛡️ Admin Portal
            </button>
          </div>

          <div className="cp-hero-mini-stats">
            <div>
              <strong>98%</strong>
              <span>Accuracy</span>
            </div>
            <div className="cp-divider"></div>
            <div>
              <strong>12s</strong>
              <span>Avg Time</span>
            </div>
            <div className="cp-divider"></div>
            <div>
              <strong>24/7</strong>
              <span>Availability</span>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS TICKER */}
      <div className="cp-news-ticker">
        <div className="cp-news-label">
          <span className="cp-live-dot"></span>
          LIVE UPDATES
        </div>
        <div className="cp-news-track">
          <div className="cp-news-scroll">
            {newsItems.map((item, i) => (
              <span key={i} className="cp-news-item">{item}</span>
            ))}
            {newsItems.map((item, i) => (
              <span key={`dup-${i}`} className="cp-news-item">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="cp-section" id="features">
        <div className="cp-section-header">
          <span className="cp-section-tag">FEATURES</span>
          <h2 className="cp-section-title">Why ClaimPilot?</h2>
          <p className="cp-section-subtitle">
            Everything you need to automate insurance claims — from document intake to final decision.
          </p>
        </div>

        <div className="cp-features-grid">
          <div className="cp-feature-card">
            <div className="cp-feature-icon">🤖</div>
            <h3>AI Document Extraction</h3>
            <p>Upload PDFs or images. Our OCR + AI extracts policy details automatically in seconds.</p>
            <span className="cp-feature-tag">Powered by Tesseract + PyMuPDF</span>
          </div>
          <div className="cp-feature-card">
            <div className="cp-feature-icon">⚡</div>
            <h3>Instant Decision</h3>
            <p>Get APPROVE, REJECT, or FLAG decisions immediately with detailed explanations.</p>
            <span className="cp-feature-tag">Avg 12 seconds</span>
          </div>
          <div className="cp-feature-card">
            <div className="cp-feature-icon">🔐</div>
            <h3>Smart Policy Validation</h3>
            <p>Cross-checks every claim against policy holder records, dates, and coverage limits.</p>
            <span className="cp-feature-tag">Database-backed rules</span>
          </div>
          <div className="cp-feature-card">
            <div className="cp-feature-icon">🎯</div>
            <h3>Transparent Reasoning</h3>
            <p>Every decision comes with clear reasoning — no black box. Full audit trail.</p>
            <span className="cp-feature-tag">100% explainable</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cp-section cp-section-alt" id="how">
        <div className="cp-section-header">
          <span className="cp-section-tag">PROCESS</span>
          <h2 className="cp-section-title">How It Works</h2>
          <p className="cp-section-subtitle">
            Three simple steps from document upload to final decision.
          </p>
        </div>

        <div className="cp-steps">
          <div className="cp-step">
            <div className="cp-step-num">1</div>
            <h3>Upload Document</h3>
            <p>Drop your claim PDF or image into the Smart Upload zone.</p>
          </div>
          <div className="cp-step-line"></div>
          <div className="cp-step">
            <div className="cp-step-num">2</div>
            <h3>AI Analyzes</h3>
            <p>OCR extracts text, AI parses fields, and validates against policy database.</p>
          </div>
          <div className="cp-step-line"></div>
          <div className="cp-step">
            <div className="cp-step-num">3</div>
            <h3>Get Decision</h3>
            <p>Receive instant APPROVE / REJECT / FLAG with full explanation.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="cp-section" id="testimonials">
        <div className="cp-section-header">
          <span className="cp-section-tag">REVIEWS</span>
          <h2 className="cp-section-title">What Our Users Say</h2>
          <p className="cp-section-subtitle">
            Trusted by claims managers and CTOs across India.
          </p>
        </div>

        <div className="cp-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="cp-testimonial">
              <div className="cp-quote">"</div>
              <p className="cp-testimonial-text">{t.text}</p>
              <div className="cp-testimonial-author">
                <div className="cp-avatar">{t.avatar}</div>
                <div>
                  <div className="cp-author-name">{t.name}</div>
                  <div className="cp-author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="cp-partners">
        <p className="cp-partners-label">TRUSTED BY INDUSTRY LEADERS</p>
        <div className="cp-partners-row">
          {partners.map((p, i) => (
            <div key={i} className="cp-partner">{p}</div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cp-final-cta">
        <h2>Ready to automate your claims?</h2>
        <p>Join ClaimPilot and experience the future of insurance claims processing.</p>
        <div className="cp-cta-row">
          <button className="cp-btn cp-btn-primary" onClick={() => navigate("/register")}>
            Get Started Free
          </button>
          <button className="cp-btn cp-btn-secondary" onClick={() => navigate("/admin-login")}>
            Admin Login
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cp-footer">
        <div className="cp-footer-brand">
          <span>✈️</span>
          <span>ClaimPilot</span>
        </div>
        <p>© 2026 ClaimPilot. AI-powered insurance claims automation.</p>
        <div className="cp-footer-links">
          <a href="#features">Features</a>
          <a href="#how">Process</a>
          <a href="#testimonials">Reviews</a>
        </div>
      </footer>

    </div>
  );
}

export default Landing;