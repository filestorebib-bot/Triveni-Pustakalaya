import { Link } from "react-router-dom";

import {
  BookOpen,
  Heart
} from "lucide-react";

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <div className="footer-logo">
            <BookOpen size={24} />
          </div>

          <div>

            <h3>Triveni Pustakalaya</h3>

            <p>
              Knowledge for every learner.
            </p>

          </div>

        </div>

        <div className="footer-links">

          <Link to="/subjects">
            Subjects
          </Link>

          <Link to="/library">
            Library
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} Triveni Pustakalaya
        </span>

        <span className="made-with">
          Made with <Heart size={14} /> for learners
        </span>

      </div>

    </footer>
  );
}

export default Footer;
