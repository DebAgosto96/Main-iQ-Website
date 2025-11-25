import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/about-us" className="footer-link">About Us</Link>
          <Link to="/Careers" className="footer-link">Careers</Link>
          <Link to="/Leaderboard" className="footer-link">Leaderboard</Link>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <Link to="/faq" className="footer-link">FAQ</Link>
          <Link to="/contact-us" className="footer-link">Contact Us</Link>
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Social</h4>

          <a 
            href="https://www.tiktok.com/@iq_entertainment"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>

          <a 
            href="https://www.instagram.com/iqentertainmentofficial/"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <a
            href="https://www.youtube.com/@iqentertainment921"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>

        {/* Share */}
        <div className="footer-section">
          <h4>Share</h4>
          <Link to="#" className="footer-link">Invite Friends</Link>
          <Link to="#" className="footer-link">Share on Twitter</Link>
          <Link to="#" className="footer-link">Share on TikTok</Link>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; 2017 IQ Entertainment. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
