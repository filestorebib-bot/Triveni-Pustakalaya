import {
  BookOpen,
  Target,
  Users
} from "lucide-react";

function About() {

  return (
    <section className="page-section">

      <div className="page-header">

        <span className="eyebrow">
          ABOUT US
        </span>

        <h1>
          Triveni Pustakalaya
        </h1>

        <p>
          A digital educational library created
          to make learning resources easier to access.
        </p>

      </div>

      <div className="about-content">

        <div className="about-main">

          <h2>
            A place for knowledge
          </h2>

          <p>
            Triveni Pustakalaya is designed as a
            modern educational platform where students,
            teachers and learners can discover useful
            academic resources.
          </p>

          <p>
            The platform focuses on simplicity,
            accessibility and an enjoyable learning
            experience across mobile and desktop devices.
          </p>

        </div>

        <div className="about-cards">

          <div className="about-card">

            <BookOpen />

            <h3>
              Knowledge
            </h3>

            <p>
              Make educational information easier
              to discover.
            </p>

          </div>

          <div className="about-card">

            <Target />

            <h3>
              Purpose
            </h3>

            <p>
              Support students and learners with
              accessible resources.
            </p>

          </div>

          <div className="about-card">

            <Users />

            <h3>
              Community
            </h3>

            <p>
              Build a shared space for learning
              and educational growth.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;
