import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { HomeOnboarding } from "@/app/components/HomeOnboarding";

export const metadata: Metadata = {
  title: "NANYA CNC — Quotation Studio",
  description:
    "Configure your NANYA CNC machining center. Explore seven machines, tailor your accessories, and download your personalized quotation.",
};

export default function Home() {
  return (
    <HomeOnboarding>
      <link rel="icon" type="image/png" href="/studio/assets/logo.png" />
      <link rel="preload" as="image" href="/studio/assets/nv-1270.png" />
      <link rel="stylesheet" href="/studio/fonts.css" />
      <link rel="stylesheet" href="/studio/styles.css" />
      <link rel="stylesheet" href="/studio/experience.css" />
      <Script src="/studio/assets/pdf-lib.min.js" strategy="afterInteractive" />
      <Script
        src="/studio/app.js"
        type="module"
        strategy="afterInteractive"
      />

      <a className="skip-link" href="#workspace">
        Skip to quotation
      </a>
      <header className="header header--minimal">
        <nav className="topnav" aria-label="Main navigation">
          <a className="active" href="#" id="studio-link">
            Quotation Studio<span className="studio-edition">02</span>
            <span className="nav-dot"></span>
          </a>
          <Link href="/machines">Machine lineup</Link>
          <Link href="/how-it-works">How it works</Link>
        </nav>
      </header>
      <main id="workspace" className="workspace">
        <section className="page-heading">
          <div>
            <div className="eyebrow">
              <span></span> YOUR PRODUCTION. YOUR CONFIGURATION.
            </div>
            <h1>
              Precision starts <span>with your choice.</span>
            </h1>
            <p>Select a machine. Make it yours. Get your quotation.</p>
          </div>
          <div className="studio-mark">
            <span className="mark-lines">///</span>
            <span>
              ENGINEERED FOR
              <br />
              <b>WHAT&rsquo;S NEXT.</b>
            </span>
          </div>
        </section>
        <nav className="stepper" aria-label="Quotation steps" id="stepper"></nav>
        <div className="workspace-grid">
          <div className="main-column" id="main-column"></div>
          <aside className="summary" id="summary" aria-label="Your quotation summary"></aside>
        </div>
        <footer className="page-footer">
          <span>
            © <span id="year"></span> NANYA CNC{" "}
            <span className="footer-sep">/</span> Precision in every detail.
          </span>
          <button data-action="terms">
            Quotation terms <span>↗</span>
          </button>
          <span className="footer-status">
            <i></i> YOUR NEXT CHAPTER IN MANUFACTURING
          </span>
        </footer>
      </main>
      <div className="mobile-bar" id="mobile-bar"></div>
      <div className="toast" id="toast" role="status" aria-live="polite"></div>
      <dialog className="dialog" id="dialog" aria-labelledby="dialog-title">
        <div id="dialog-content"></div>
      </dialog>
      <noscript>
        <p className="noscript">
          Please enable JavaScript to configure your NANYA CNC quotation.
        </p>
      </noscript>
    </HomeOnboarding>
  );
}
