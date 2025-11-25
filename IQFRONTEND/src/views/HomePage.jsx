import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [active, setActive] = useState(false);
  const overlayRef = useRef(null);

  // const logos = [
  //   { href: "https://www.nasa.gov", img: "/femalehoodie.png", alt: "NASA" },
  //   { href: "https://www.spacex.com", img: "/sorry.png", alt: "SpaceX" },
  //   { href: "https://www.astronomy.com", img: "femalehoodie.png", alt: "Astronomy" },
  //   { href: "https://astroscale.com", img: "/sorry.png", alt: "Astroscale" },
  //   { href: "https://www.astrobotic.com", img: "femalehoodie.png", alt: "Astrobotic" },
  //   { href: "https://aas.org/news/astronomy-in-the-news", img: "/sorry.png", alt: "AAS" },
  //   { href: "https://www.space.com", img: "femalehoodie.png", alt: "Space News" },
  //   { href: "https://phys.org/space-news/astronomy/", img: "/sorry.png", alt: "Phys Org" },
  // ];

  const reviewsData = [
    { name: "Rachel Green", service: "Gaming Coaching", comment: "I never thought I would improve this fast. The one on one coaching sessions are worth every penny." },
    { name: "Jim Halpert", service: "Video Editing", comment: "I needed clips for my stream highlights and what I got looked like something from a studio." },
    { name: "Seong Gi hun", service: "Coaching for Video Editing", comment: "I used to struggle editing footage. Now I feel confident creating content." },
    { name: "Monica Geller", service: "Gaming Coaching", comment: "Everything was smooth and structured. I appreciated the personalized tips." },
    { name: "Dwight Schrute", service: "Marketing Consulting", comment: "Our brand reach increased two times after following the growth plan." },
    { name: "Kang Sae byeok", service: "Video Editing", comment: "Quick turnaround and great quality. I will be back." },
    { name: "Sheldon Cooper", service: "Marketing Consulting", comment: "The strategy gave us a ninety three percent increase in conversion rate." },
    { name: "Penny", service: "Coaching for Video Editing", comment: "Even without experience I could follow along and learn." },
    { name: "Harvey Specter", service: "Marketing Consulting", comment: "They delivered results. My brand presence feels strong now." },
  ];

  // activate overlay animation
  useEffect(() => {
    const onScroll = () => {
      const el = overlayRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setActive(rect.top < window.innerHeight && rect.bottom > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // counter animation
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    const duration = 1500;

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-target"));
      let start = 0;
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + (target - start) * progress);

        counter.textContent = String(value);
        if (progress < 1) requestAnimationFrame(update);
        else counter.textContent = String(target);
      };

      requestAnimationFrame(update);
    });
  }, []);

  return (
    <>
      <section className="split-container">
        <div className="split-left">
          <div className="how-it-works">
            <h2>Elevate Your Creativity with Interactive Entertainment and Digital Innovation</h2>
            <h3>
              We bring ideas to life through gaming experiences, professional content creation,
              and creator focused services. Whether you need coaching, editing, branding, or
              strategic guidance, we deliver high quality solutions that help you grow and stand out.
            </h3>

            <div className="stats">
              <div className="stat">
                <span className="counter" data-target="200">0</span>
                <div>Tournaments</div>
              </div>

              <div className="stat">
                <span className="counter" data-target="98">0</span><span>%</span>
                <div>Client Satisfaction</div>
              </div>

              <div className="stat">
                <span className="counter" data-target="30">0</span>
                <div>Team Members</div>
              </div>
            </div>
          </div>

          <div className="steps">
            <div className="step">
              <h3>Train with Top Tier Talent</h3>
              <p>Learn from elite players who know how to perform under pressure.</p>
            </div>
            <div className="step">
              <h3>Level Up with the Best in the Game</h3>
              <p>Guidance shaped by real competitive experience.</p>
            </div>
            <div className="step">
              <h3>Master Your Skills</h3>
              <p>Grow your abilities with structured and proven methods.</p>
            </div>
          </div>
        </div>

        <div className="split-right">
          <div ref={overlayRef} className={`right-overlay ${active ? "active" : ""}`} />
        </div>
      </section>

      <section className="why-choose-us glass-blur">
        <h2 className="why-title">Why Choose Us</h2>

        <div className="why-grid">
          <div className="why-item">
            <div className="why-icon">🔥</div>
            <h3>Top Tier Esports Talent</h3>
            <p>We compete at a high level and bring that elite understanding into our services.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">🎮</div>
            <h3>Elite Gaming Knowledge</h3>
            <p>Learn from players who understand strategy and performance at the highest level.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">🏆</div>
            <h3>Professional Quality</h3>
            <p>We follow standards used by top esports organizations and creators.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">🚀</div>
            <h3>Growth Centered Approach</h3>
            <p>We help players and creators develop long term and stay ahead.</p>
          </div>
        </div>

        <Link to="/about-us" className="why-button">Learn More About Us</Link>
      </section>

      <h2 className="reviews-marquee-title">User Reviews</h2>
      <section className="logo-strip" aria-label="User testimonials">
        <div className="scrolling-container">
          <div className="scrolling-track">
            {[...reviewsData, ...reviewsData].map(({ name, service, comment }, index) => (
              <div className="scrolling-item" key={`${name}-${index}`}>
                <div
                  className={`review-card ${hoveredIndex === index ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="review-header">
                    <strong>{name}</strong> <em>({service})</em>
                  </div>
                  <div className="stars">★★★★★</div>
                  <p className="review-comment">"{comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
 