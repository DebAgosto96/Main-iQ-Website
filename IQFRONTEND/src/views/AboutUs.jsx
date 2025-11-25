import React from "react";
import "./AboutUs.css";
import VideoBG from "../components/VideoBG";

const AboutUs = () => {
  return (
    <>
      <VideoBG src="/About.mp4" />

      <div className="aboutPage-wrapper">

        <section className="aboutPage-card aboutPage-topCard">
          <h1 className="aboutPage-title">Who We Are</h1>

          <p className="aboutPage-description">
            At <strong>iQ Entertainment</strong>, we live and breathe gaming culture.
            We are a collective of players, creators, and innovators who are
            building a home for competitive and community driven gaming.
          </p>

          <img src="buvl1.png" alt="BUVL" className="aboutPage-image" />
        </section>

        <div className="aboutPage-cards">

          <section className="aboutPage-card">
            <h2 className="aboutPage-cardTitle">Our Vision</h2>
            <p className="aboutPage-cardText">
              At <strong>iQ Entertainment</strong>, we believe that gaming is more
              than just a hobby. It&apos;s a way of life. Our vision is to create a world
              where gaming is recognized as a legitimate sport and where gamers are
              celebrated for their skills and passion.
            </p>
          </section>

          <section className="aboutPage-card">
            <h2 className="aboutPage-cardTitle">Our Story</h2>
            <p className="aboutPage-cardText">
              <strong>iQ Entertainment</strong> was founded in 2017 by a group of
              passionate gamers who wanted to create a community where they could
              thrive. Since then, we’ve grown to become a leading eSports team,
              with a focus on excellence and inclusivity.
            </p>
          </section>

          <section className="aboutPage-card">
            <h2 className="aboutPage-cardTitle">Our Players</h2>
            <p className="aboutPage-cardText">
              Our players are the backbone of <strong>iQ Entertainment</strong>.
              They come from all over the world and bring unique talents and
              perspectives to the team. We’re proud to have them represent us on
              the global stage.
            </p>
          </section>

        </div>
      </div>
    </>
  );
};

export default AboutUs;
