import { useState } from "react";

import {
  BookOpen,
  Search,
  FileText
} from "lucide-react";

const resources = [
  {
    title: "Science Fundamentals",
    category: "Science",
    type: "Study Material"
  },
  {
    title: "Mathematics Practice",
    category: "Mathematics",
    type: "Practice"
  },
  {
    title: "English Grammar",
    category: "English",
    type: "Study Material"
  },
  {
    title: "Social Studies Notes",
    category: "Social Studies",
    type: "Notes"
  },
  {
    title: "Computer Basics",
    category: "Computer Science",
    type: "Study Material"
  },
  {
    title: "General Knowledge",
    category: "General Knowledge",
    type: "Reference"
  }
];

function Library() {

  const [search, setSearch] = useState("");

  const filteredResources =
    resources.filter((resource) =>
      `${resource.title} ${resource.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <section className="page-section">

      <div className="page-header">

        <span className="eyebrow">
          DIGITAL COLLECTION
        </span>

        <h1>
          Library
        </h1>

        <p>
          Browse educational books,
          notes and study resources.
        </p>

      </div>

      <div className="library-search">

        <Search size={20} />

        <input
          type="search"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="resource-grid">

        {filteredResources.map((resource) => (

          <article
            className="resource-card"
            key={resource.title}
          >

            <div className="resource-icon">
              <FileText />
            </div>

            <div>

              <span className="resource-category">
                {resource.category}
              </span>

              <h2>
                {resource.title}
              </h2>

              <p>
                {resource.type}
              </p>

            </div>

            <button className="resource-button">
              Open
            </button>

          </article>

        ))}

      </div>

      {filteredResources.length === 0 && (

        <div className="empty-state">

          <BookOpen size={40} />

          <h2>
            No resources found
          </h2>

          <p>
            Try another search term.
          </p>

        </div>

      )}

    </section>
  );
}

export default Library;
