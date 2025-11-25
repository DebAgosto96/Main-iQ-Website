import React from "react";
import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";
import VideoBG from "../components/VideoBG";

const PrivacyPolicy = () => {
  return (
    <>
      <VideoBG src="/Privacycoding.mp4" />

      <div className="policy-wrapper">
        <div className="policy-card">
          <div className="policy-outer-block">

            <h1 className="policy-title">IQ Entertainment Privacy Policy</h1>
            <p className="policy-meta">
              <strong>Effective Date:</strong> 01/01/2026
            </p>

            {/* ---- FULL ORIGINAL CONTENT BELOW ---- */}

            <section className="policy-block">
              <h2 className="policy-heading">Personal data and how we use it</h2>
              <p className="policy-text">
                Personal data means any information about a living individual that
                can be used to identify that person either directly or indirectly.
                Processing covers collecting, storing, using, sharing or deleting
                that data.
              </p>
              <p className="policy-text">
                IQ Entertainment processes personal data to operate the platform,
                connect players and clients, support bookings and keep the site
                secure.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Legal bases for processing</h2>
              <p className="policy-text">
                We process your personal data only when we have a valid legal basis.
                This includes:
              </p>
              <ul className="policy-list">
                <li>Your consent, for example for optional marketing</li>
                <li>To perform a contract with you, such as providing your account and booked services</li>
                <li>Our legitimate interests, such as improving the platform and preventing fraud or abuse</li>
                <li>Compliance with legal obligations</li>
              </ul>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Data we collect</h2>

              <h3 className="policy-subheading">Account creation and profiles</h3>
              <p className="policy-text">
                When you create an account or player profile on IQ Entertainment we
                may collect:
              </p>
              <ul className="policy-list">
                <li>Full name</li>
                <li>Username</li>
                <li>Email address</li>
                <li>Password stored in encrypted form</li>
                <li>Profile picture</li>
                <li>Services you offer on the platform</li>
                <li>Optional details such as time zone, language or short bio</li>
              </ul>

              <h3 className="policy-subheading">Usage and analytics data</h3>
              <p className="policy-text">When you use the site or booking system we may collect:</p>
              <ul className="policy-list">
                <li>IP address and general location</li>
                <li>Device type and browser information</li>
                <li>Pages viewed and actions taken on the site</li>
                <li>Date and time of visits and referral sources</li>
              </ul>
              <p className="policy-text">
                We use cookies and similar technologies to keep you signed in,
                remember preferences, measure traffic and improve performance.
              </p>

              <h3 className="policy-subheading">Payment and transactions</h3>
              <p className="policy-text">
                If you book services or receive payments through IQ Entertainment we
                process certain payment related information. Payments are handled by
                third party processors. We do not store full card numbers on our
                servers. We may store:
              </p>
              <ul className="policy-list">
                <li>Billing details</li>
                <li>Transaction dates and amounts</li>
                <li>Payment method type and last digits of the card when needed</li>
              </ul>

              <h3 className="policy-subheading">Communication and support</h3>
              <p className="policy-text">
                When you contact us, for example through email, the site or Discord,
                we may keep records of those communications to respond to you,
                resolve issues and improve the service.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">How we use your data</h2>
              <ul className="policy-list">
                <li>Creating and managing user accounts and profiles</li>
                <li>Showing player profiles and services to potential clients</li>
                <li>Handling bookings and coordinating sessions</li>
                <li>Processing and recording payments and payouts</li>
                <li>Operating, maintaining and improving the website and booking experience</li>
                <li>Personalizing parts of the platform such as recommended services</li>
                <li>Protecting the platform and users from fraud, abuse and security risks</li>
                <li>Providing customer support and responding to questions</li>
                <li>Sending service related communications and optional marketing (when allowed)</li>
                <li>Meeting legal, tax, accounting and compliance requirements</li>
              </ul>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">How we share your data</h2>

              <h3 className="policy-subheading">Service providers</h3>
              <p className="policy-text">
                We work with hosting, analytics, payment, communication and security
                providers. These partners may process your data on our behalf and
                must protect it.
              </p>

              <h3 className="policy-subheading">Other users</h3>
              <p className="policy-text">
                Public profile fields such as username, picture, bio and services are
                visible to others.
              </p>

              <h3 className="policy-subheading">Legal requirements and safety</h3>
              <p className="policy-text">
                We may disclose information if legally required or necessary to prevent harm, fraud or abuse.
              </p>

              <h3 className="policy-subheading">Business changes</h3>
              <p className="policy-text">
                If IQ Entertainment is acquired or merged, your data may transfer as part
                of the business.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Data retention</h2>
              <p className="policy-text">
                We keep your personal data for as long as it is needed to operate the
                platform, comply with law or resolve disputes. When no longer required,
                data is deleted or anonymized.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Your rights and choices</h2>
              <ul className="policy-list">
                <li>Request access to your data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion (with applicable limits)</li>
                <li>Request a portable copy of your data</li>
                <li>Withdraw consent for certain types of processing</li>
              </ul>
              <p className="policy-text">
                To exercise your rights, contact us through the link below.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Cookies and similar technologies</h2>
              <p className="policy-text">
                Cookies help keep you signed in, remember preferences and improve
                performance. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Third party services</h2>
              <p className="policy-text">
                Our platform may integrate with services like Discord, Stripe and PayPal.
                These third parties have their own privacy policies.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">International transfers</h2>
              <p className="policy-text">
                Your data may be processed in the United States or other countries. We
                use reasonable safeguards to protect these transfers.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Security</h2>
              <p className="policy-text">
                We use encryption, secure connections, access controls and regular
                updates to protect your data. No online service can guarantee complete
                security.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Changes to this policy</h2>
              <p className="policy-text">
                Updates will appear here with a revised effective date. Continued use of
                the site means you accept the updated policy.
              </p>
            </section>

            <section className="policy-block">
              <h2 className="policy-heading">Contact</h2>
              <p className="policy-text">
                If you have questions, feedback or concerns, reach us through our
                <Link to="/contact-us" className="policy-contact-button">
                  Contact Us
                </Link>
                page.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
