import React from "react";
import "./FAQ.css";
import VideoBG from "../components/VideoBG";

const FAQ = () => {
  return (
    <>
      <VideoBG src="/FAQ.mp4" />

      <div className="faq-wrapper">
        <div className="faq-card">
          <div className="faq-outer-block">

            <h1 className="faq-title">IQ Entertainment FAQ</h1>
            <p className="faq-meta">Last updated: 01/01/2026</p>

            <section className="faq-block">
              <h2 className="faq-heading">What is IQ Entertainment</h2>
              <p className="faq-text">
                IQ Entertainment is a gaming and creative services platform where
                players offer one to one sessions such as coaching, editing, or
                consulting. Clients can browse profiles, book sessions, and pay
                through our site.
              </p>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">What services are offered</h2>
              <p className="faq-text">
                Services depend on each player profile. Current offerings can
                include:
              </p>
              <ul className="faq-list">
                <li>Gaming coaching for skill improvement and strategy</li>
                <li>Video editing for game clips and content</li>
                <li>Coaching for video editing and creative workflows</li>
                <li>Marketing consulting for personal or brand growth</li>
              </ul>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">How do bookings work</h2>
              <p className="faq-text">
                You choose a service, select the player you want to work with,
                and request a time that fits both schedules. You’ll confirm the
                session through our booking flow and receive a confirmation.
              </p>
              <p className="faq-text">
                If you're not signed in, you'll be asked to log in or create
                an account before finishing the booking.
              </p>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">Do I need an account to book</h2>
              <p className="faq-text">
                Yes. An account is required to manage your bookings, view
                history, and receive updates from the player.
              </p>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">How do sessions take place</h2>
              <p className="faq-text">
                Most sessions are remote. Communication can happen by voice chat,
                video call, or messaging on platforms such as Discord.
              </p>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">How are payments handled</h2>
              <p className="faq-text">
                Payments are handled through third-party processors such as
                Stripe. IQ Entertainment does not store full card numbers.
              </p>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">Can I cancel or reschedule</h2>
              <p className="faq-text">
                Terms vary by player. Contact the player as early as possible if
                you need to make changes. Some sessions may be non-refundable
                near the appointment time.
              </p>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">How do I become a player</h2>
              <p className="faq-text">
                You can apply through the Contact Us page. Include your skills,
                experience, and what services you want to offer.
              </p>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">Which regions are supported</h2>
              <p className="faq-text">
                IQ Entertainment supports international users. Sessions display
                in your local time zone automatically.
              </p>
            </section>

            <section className="faq-block">
              <h2 className="faq-heading">Is my data safe</h2>
              <p className="faq-text">
                Passwords are encrypted and connections are secured. View the
                Privacy Policy page for full details.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
