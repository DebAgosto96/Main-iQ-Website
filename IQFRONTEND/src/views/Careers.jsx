import React from "react";
import "./Careers.css";
import VideoBG from "../components/VideoBG";
import { Link } from "react-router-dom";

const openings = [
  {
    id: 1,
    title: "Player Coach",
    focus: "Gaming Coaching",
    type: "Contract",
    location: "Remote",
    blurb:
      "Work with players in one-on-one sessions, build training plans, and help clients reach their gameplay goals."
  },
  {
    id: 2,
    title: "Video Editor",
    focus: "Content Editing",
    type: "Contract",
    location: "Remote",
    blurb:
      "Edit gameplay videos, highlights, and short-form content for social media and promotional use."
  },
  {
    id: 3,
    title: "Creative & Community Support",
    focus: "Marketing / Community",
    type: "Part-Time",
    location: "Remote",
    blurb:
      "Assist with community engagement, manage small campaigns, and support daily content operations."
  }
];

const Careers = () => {
  return (
    <>
      <VideoBG src="/Careers.mp4" />

      <div className="careers-wrapper">
        <div className="careers-card">

          <div className="careers-outer-block">

            <h1 className="careers-title">Careers at IQ Entertainment</h1>
            <p className="careers-meta">Join our growing team</p>

            {openings.map((job) => (
              <section key={job.id} className="careers-block">
                <h2 className="careers-heading">{job.title}</h2>

                <p className="careers-text"><strong>Focus:</strong> {job.focus}</p>
                <p className="careers-text"><strong>Type:</strong> {job.type}</p>
                <p className="careers-text"><strong>Location:</strong> {job.location}</p>

                <p className="careers-text">{job.blurb}</p>

                <Link to="/contact-us" className="careers-apply-btn">
                  Apply Now
                </Link>
              </section>
            ))}

          </div>

        </div>
      </div>
    </>
  );
};

export default Careers;
