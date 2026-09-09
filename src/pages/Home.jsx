import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  WifiOff,
  Search
} from "lucide-react";

import { Link } from "react-router-dom";

function Home() {

  return (
    <>

      <section className="hero">

        <div className="hero-container">

          <div className="hero-content">

            <span className="eyebrow">
              DIGITAL EDUCATIONAL LIBRARY
            </span>

            <h1>
              Learn.
              <br />
              Explore.
              <br />
              Grow.
            </h1>

            <p>
              Welcome to Triveni Pustakalaya —
              a simple digital space for students,
              teachers and lifelong learners.
            </p>

            <div className="hero-actions">

              <Link
                to="/library"
                className="primary-button"
              >
                Explore Library
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/subjects"
                className="secondary-button"
              >
                Browse Subjects
              </Link>

            </div>

          </div>

          <div className="hero-card">

            <div className="hero-book-icon">
              <BookOpen size={52} />
            </div>

            <h2>
              Knowledge is
              <br />
              always within reach.
            </h2>

            <p>
              Access your educational resources
              wherever you are.
            </p>

          </div>

        </div>

      </section>

      <section className="features-section">

        <div className="section-heading">

          <span className="eyebrow">
            WHY TRIVENI
          </span>

          <h2>
            Education made accessible
          </h2>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              <BookOpen />
            </div>

            <h3>
              Digital Library
            </h3>

            <p>
              Organize and explore educational
              materials in one place.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <GraduationCap />
            </div>

            <h3>
              Student Friendly
            </h3>

            <p>
              A clean and simple experience
              designed for learners.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <WifiOff />
            </div>

            <h3>
              Works Offline
            </h3>

            <p>
              Continue using previously loaded
              resources without internet.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <Search />
            </div>

            <h3>
              Easy to Find
            </h3>

            <p>
              Quickly search and discover
              educational resources.
            </p>

          </div>

        </div>

      </section>

      <section className="cta-section">

        <div>

          <span className="eyebrow">
            START LEARNING
          </span>

          <h2>
            Your digital library is ready.
          </h2>

          <p>
            Explore books, subjects and educational
            resources from Triveni Pustakalaya.
          </p>

        </div>

        <Link
          to="/library"
          className="primary-button"
        >
          Open Library
          <ArrowRight size={18} />
        </Link>

      </section>

    </>
  );
}

export default Home;
