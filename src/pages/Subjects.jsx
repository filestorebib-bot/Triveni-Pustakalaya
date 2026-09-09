import {
  Calculator,
  FlaskConical,
  Languages,
  Globe,
  Monitor,
  BookOpen
} from "lucide-react";

const subjects = [
  {
    name: "Science",
    description: "Physics, chemistry, biology and scientific learning.",
    icon: FlaskConical
  },
  {
    name: "Mathematics",
    description: "Numbers, algebra, geometry and problem solving.",
    icon: Calculator
  },
  {
    name: "English",
    description: "Language, grammar, writing and literature.",
    icon: Languages
  },
  {
    name: "Social Studies",
    description: "History, geography, society and culture.",
    icon: Globe
  },
  {
    name: "Computer Science",
    description: "Computers, programming and digital technology.",
    icon: Monitor
  },
  {
    name: "General Knowledge",
    description: "Useful knowledge and information from different fields.",
    icon: BookOpen
  }
];

function Subjects() {

  return (
    <section className="page-section">

      <div className="page-header">

        <span className="eyebrow">
          LEARNING AREAS
        </span>

        <h1>
          Subjects
        </h1>

        <p>
          Explore educational subjects and
          discover resources for your learning journey.
        </p>

      </div>

      <div className="subject-grid">

        {subjects.map((subject) => {

          const Icon = subject.icon;

          return (
            <article
              className="subject-card"
              key={subject.name}
            >

              <div className="subject-icon">
                <Icon />
              </div>

              <h2>
                {subject.name}
              </h2>

              <p>
                {subject.description}
              </p>

              <button>
                Explore →
              </button>

            </article>
          );

        })}

      </div>

    </section>
  );
}

export default Subjects;
