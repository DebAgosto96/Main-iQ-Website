import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutPage-container">
      <section className="aboutPage-section aboutPage-gradientCard">
        <h2 className="aboutPage-heading">Our Vision</h2>
        <p className="aboutPage-paragraph">
          At <strong>iQ Entertainment</strong>, we believe that gaming is more
          than just a hobby. It's a way of life. Our vision is to create a world
          where gaming is recognized as a legitimate sport and where gamers are
          celebrated for their skills and passion.
        </p>
        <img src="buvl1.png" alt="BUVL" className="aboutPage-image" />
      </section>

      <section className="aboutPage-section">
        <h2 className="aboutPage-heading">Our Story</h2>
        <p className="aboutPage-paragraph">
          <strong>iQ Entertainment</strong> was founded in 2017 by a group of
          passionate gamers who wanted to create a community where they could
          thrive. Since then, we’ve grown to become a leading eSports team, with
          a focus on excellence and inclusivity.
        </p>
      </section>

      <section className="aboutPage-section">
        <h2 className="aboutPage-heading">Our Players</h2>
        <p className="aboutPage-paragraph">
          Our players are the backbone of <strong>iQ Entertainment</strong>.
          They come from all over the world and bring unique talents and
          perspectives to the team. We’re proud to have them represent us on the
          global stage.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
