import { useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookMarked,
  ChevronRight,
  Download,
  FileText,
  GraduationCap,
  LibraryBig,
  Menu,
  Moon,
  Search,
  Sun,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { libraryData } from "../library";

/* =========================================================
   ICON
   ========================================================= */

function FacultyIcon({ type }) {
  if (type === "veterinary") {
    return <BookMarked size={25} strokeWidth={1.8} />;
  }

  if (type === "science") {
    return <GraduationCap size={25} strokeWidth={1.8} />;
  }

  return <LibraryBig size={25} strokeWidth={1.8} />;
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

function Library() {
  /*
    The library is automatically generated from:
    
    src/library/
    
    Faculty
      ↓
    Year
      ↓
    Semester
      ↓
    Subject
      ↓
    Unit
      ↓
    Article.jsx
  */

  const library = libraryData;

  const [search, setSearch] = useState("");

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [readingUnit, setReadingUnit] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =======================================================
     RESET NAVIGATION
     ======================================================= */

  const resetLibrary = () => {
    setSelectedFaculty(null);
    setSelectedYear(null);
    setSelectedSemester(null);
    setSelectedSubject(null);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  /* =======================================================
     FACULTY
     ======================================================= */

  const goFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedYear(null);
    setSelectedSemester(null);
    setSelectedSubject(null);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  /* =======================================================
     YEAR
     ======================================================= */

  const goYear = (year) => {
    setSelectedYear(year);
    setSelectedSemester(null);
    setSelectedSubject(null);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  /* =======================================================
     SEMESTER
     ======================================================= */

  const goSemester = (semester) => {
    setSelectedSemester(semester);
    setSelectedSubject(null);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  /* =======================================================
     SUBJECT
     ======================================================= */

  const goSubject = (subject) => {
    setSelectedSubject(subject);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  /* =======================================================
     OPEN ARTICLE
     ======================================================= */

  const openUnit = (unit) => {
    setReadingUnit(unit);
    setFontSize(18);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     SEARCH
     ======================================================= */

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    const results = [];

    library.forEach((faculty) => {
      faculty.years?.forEach((year) => {
        year.semesters?.forEach((semester) => {
          semester.subjects?.forEach((subject) => {
            subject.units?.forEach((unit) => {
              const searchable = [
                faculty.name,
                year.name,
                semester.name,
                subject.name,
                subject.code,
                unit.name,
                unit.title,
                unit.description,
                unit.type,
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

              if (searchable.includes(query)) {
                results.push({
                  faculty,
                  year,
                  semester,
                  subject,
                  unit,
                });
              }
            });
          });
        });
      });
    });

    return results;
  }, [library, search]);

  /* =======================================================
     CURRENT UNITS
     ======================================================= */

  const currentUnits = selectedSubject?.units || [];

  const currentUnitIndex = readingUnit
    ? currentUnits.findIndex(
        (unit) => unit.id === readingUnit.id
      )
    : -1;

  const previousUnit =
    currentUnitIndex > 0
      ? currentUnits[currentUnitIndex - 1]
      : null;

  const nextUnit =
    currentUnitIndex >= 0 &&
    currentUnitIndex < currentUnits.length - 1
      ? currentUnits[currentUnitIndex + 1]
      : null;

  /* =======================================================
     READING MODE
     ======================================================= */

  if (readingUnit) {
    const ArticleComponent = readingUnit.component;

    return (
      <section
        className={`library-reader ${
          darkMode ? "library-reader-dark" : ""
        }`}
      >
        {/* READER HEADER */}

        <div className="library-reader-header">
          <div className="library-reader-header-left">
            <button
              className="library-back-button"
              onClick={() => setReadingUnit(null)}
              aria-label="Back to units"
            >
              <ArrowLeft size={18} />

              <span>Back to units</span>
            </button>

            <div className="library-reader-title-area">
              <span>
                {selectedSubject?.name || "Library"}
              </span>

              <h1>{readingUnit.title}</h1>
            </div>
          </div>

          <div className="library-reader-controls">
            {/* DECREASE FONT */}

            <button
              className="reader-control-button"
              onClick={() =>
                setFontSize((size) =>
                  Math.max(14, size - 1)
                )
              }
              title="Decrease font size"
              aria-label="Decrease font size"
            >
              <ZoomOut size={17} />
            </button>

            <span className="reader-font-size">
              {fontSize}px
            </span>

            {/* INCREASE FONT */}

            <button
              className="reader-control-button"
              onClick={() =>
                setFontSize((size) =>
                  Math.min(25, size + 1)
                )
              }
              title="Increase font size"
              aria-label="Increase font size"
            >
              <ZoomIn size={17} />
            </button>

            {/* DARK MODE */}

            <button
              className="reader-control-button"
              onClick={() =>
                setDarkMode((value) => !value)
              }
              title="Toggle reading mode"
              aria-label="Toggle reading mode"
            >
              {darkMode ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}
            </button>

            {/* MOBILE SIDEBAR */}

            <button
              className="reader-control-button mobile-sidebar-button"
              onClick={() =>
                setSidebarOpen((value) => !value)
              }
              title="Units"
              aria-label="Open units"
            >
              {sidebarOpen ? (
                <X size={18} />
              ) : (
                <Menu size={18} />
              )}
            </button>
          </div>
        </div>

        {/* READER LAYOUT */}

        <div className="library-reader-layout">
          {/* SIDEBAR */}

          <aside
            className={`library-reader-sidebar ${
              sidebarOpen ? "open" : ""
            }`}
          >
            <div className="library-reader-sidebar-title">
              <span>COURSE CONTENT</span>

              <strong>
                {selectedSubject?.name || "Course"}
              </strong>
            </div>

            <div className="library-reader-unit-list">
              {currentUnits.map((unit, index) => (
                <button
                  key={unit.id}
                  className={`library-reader-unit-button ${
                    unit.id === readingUnit.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => openUnit(unit)}
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <strong>{unit.title}</strong>

                    <small>
                      {unit.type || "Reading"}
                    </small>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* ARTICLE */}

          <main className="library-reader-content">
            <article
              className="library-reader-paper"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              {/* BREADCRUMB */}

              <div className="library-reader-paper-meta">
                {selectedFaculty && (
                  <>
                    <span>
                      {selectedFaculty.name}
                    </span>

                    <ChevronRight size={13} />
                  </>
                )}

                {selectedYear && (
                  <>
                    <span>
                      {selectedYear.name}
                    </span>

                    <ChevronRight size={13} />
                  </>
                )}

                {selectedSemester && (
                  <>
                    <span>
                      {selectedSemester.name}
                    </span>

                    <ChevronRight size={13} />
                  </>
                )}

                {selectedSubject && (
                  <span>
                    {selectedSubject.name}
                  </span>
                )}
              </div>

              {/* ARTICLE HEADING */}

              <div className="library-reader-paper-heading">
                <span className="library-unit-type">
                  {readingUnit.type || "READING"}
                </span>

                <h2>{readingUnit.title}</h2>

                {readingUnit.description && (
                  <p>
                    {readingUnit.description}
                  </p>
                )}
              </div>

              {/* =================================================
                  JSX ARTICLE
                  ================================================= */}

              {ArticleComponent ? (
                <div className="library-article-content">
                  <ArticleComponent />
                </div>
              ) : readingUnit.pdf ? (
                <div className="library-pdf-reader">
                  <iframe
                    src={readingUnit.pdf}
                    title={readingUnit.title}
                  />

                  <a
                    href={readingUnit.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="library-pdf-download"
                  >
                    <Download size={17} />

                    Open / Download PDF
                  </a>
                </div>
              ) : readingUnit.content ? (
                <div
                  className="library-article-content"
                  dangerouslySetInnerHTML={{
                    __html: readingUnit.content,
                  }}
                />
              ) : (
                <div className="library-empty-state">
                  <FileText size={42} />

                  <h2>No content available</h2>

                  <p>
                    Reading material for this unit has
                    not been added yet.
                  </p>
                </div>
              )}

              {/* NAVIGATION */}

              <div className="library-reader-navigation">
                {/* PREVIOUS */}

                <button
                  className="library-reader-nav-button"
                  disabled={!previousUnit}
                  onClick={() =>
                    previousUnit &&
                    openUnit(previousUnit)
                  }
                >
                  <ArrowLeft size={17} />

                  <div>
                    <small>PREVIOUS</small>

                    <strong>
                      {previousUnit
                        ? previousUnit.title
                        : "First unit"}
                    </strong>
                  </div>
                </button>

                {/* PROGRESS */}

                <div className="library-reader-progress">
                  <span>
                    {currentUnitIndex >= 0
                      ? currentUnitIndex + 1
                      : 1}
                  </span>

                  <small>OF</small>

                  <span>
                    {currentUnits.length}
                  </span>
                </div>

                {/* NEXT */}

                <button
                  className="library-reader-nav-button next"
                  disabled={!nextUnit}
                  onClick={() =>
                    nextUnit &&
                    openUnit(nextUnit)
                  }
                >
                  <div>
                    <small>NEXT</small>

                    <strong>
                      {nextUnit
                        ? nextUnit.title
                        : "Last unit"}
                    </strong>
                  </div>

                  <ArrowRight size={17} />
                </button>
              </div>
            </article>
          </main>
        </div>
      </section>
    );
  }

  /* =========================================================
     SEARCH RESULTS
     ========================================================= */

  if (search.trim()) {
    return (
      <section className="page-section library-page">
        <div className="page-header">
          <span className="eyebrow">
            DIGITAL COLLECTION
          </span>

          <h1>Library</h1>

          <p>
            Search across faculties, years, semesters,
            subjects and reading units.
          </p>
        </div>

        {/* SEARCH */}

        <div className="library-search">
          <Search size={19} />

          <input
            type="search"
            placeholder="Search books, subjects, units..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            autoFocus
          />

          <button
            className="library-search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        </div>

        {/* SEARCH HEADER */}

        <div className="library-search-results">
          <div className="library-search-results-header">
            <div>
              <span className="eyebrow">
                SEARCH RESULTS
              </span>

              <h2>
                Resources matching your search
              </h2>
            </div>

            <span className="library-search-count">
              {searchResults.length} result
              {searchResults.length !== 1
                ? "s"
                : ""}
            </span>
          </div>

          {/* RESULTS */}

          {searchResults.length > 0 ? (
            <div className="library-result-list">
              {searchResults.map((result) => (
                <button
                  className="library-result-card"
                  key={`${result.faculty.id}-${result.unit.id}`}
                  onClick={() => {
                    setSelectedFaculty(
                      result.faculty
                    );

                    setSelectedYear(result.year);

                    setSelectedSemester(
                      result.semester
                    );

                    setSelectedSubject(
                      result.subject
                    );

                    openUnit(result.unit);
                  }}
                >
                  <div className="library-result-icon">
                    <FileText size={22} />
                  </div>

                  <div className="library-result-content">
                    <span>
                      {result.faculty.name} ·{" "}
                      {result.year.name}
                    </span>

                    <h3>
                      {result.unit.title}
                    </h3>

                    <p>
                      {result.subject.name} ·{" "}
                      {result.semester.name}
                    </p>
                  </div>

                  <ChevronRight
                    className="library-result-arrow"
                    size={20}
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="library-empty-state">
              <Search size={42} />

              <h2>No resources found</h2>

              <p>
                Try searching with another faculty,
                subject, unit or article name.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* =========================================================
     MAIN HIERARCHY VIEW
     ========================================================= */

  return (
    <section className="page-section library-page">
      {/* PAGE HEADER */}

      <div className="page-header library-page-header">
        <span className="eyebrow">
          DIGITAL COLLECTION
        </span>

        <h1>Library</h1>

        <p>
          Explore your study materials through a
          structured learning path — from faculty and
          year to semester, subject and individual units.
        </p>
      </div>

      {/* SEARCH */}

      <div className="library-search">
        <Search size={19} />

        <input
          type="search"
          placeholder="Search books, subjects, units..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {search && (
          <button
            className="library-search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {/* =====================================================
          BREADCRUMB
          ===================================================== */}

      {selectedFaculty && (
        <div className="library-breadcrumb">
          <button onClick={resetLibrary}>
            Library
          </button>

          <ChevronRight size={14} />

          <button
            onClick={() => {
              setSelectedYear(null);
              setSelectedSemester(null);
              setSelectedSubject(null);
              setReadingUnit(null);
            }}
          >
            {selectedFaculty.name}
          </button>

          {selectedYear && (
            <>
              <ChevronRight size={14} />

              <button
                onClick={() => {
                  setSelectedSemester(null);
                  setSelectedSubject(null);
                  setReadingUnit(null);
                }}
              >
                {selectedYear.name}
              </button>
            </>
          )}

          {selectedSemester && (
            <>
              <ChevronRight size={14} />

              <button
                onClick={() => {
                  setSelectedSubject(null);
                  setReadingUnit(null);
                }}
              >
                {selectedSemester.name}
              </button>
            </>
          )}

          {selectedSubject && (
            <>
              <ChevronRight size={14} />

              <span>
                {selectedSubject.name}
              </span>
            </>
          )}
        </div>
      )}

      {/* =====================================================
          FACULTY
          ===================================================== */}

      {!selectedFaculty && (
        <div className="library-level">
          <div className="library-level-header">
            <div className="library-level-header-content">
              <span className="eyebrow">
                01 · FACULTY
              </span>

              <h2>Choose your faculty</h2>

              <p>
                Start by selecting the academic faculty
                or learning collection you want to
                explore.
              </p>
            </div>

            <div className="library-level-number">
              01
            </div>
          </div>

          {library.length > 0 ? (
            <div className="library-selection-grid">
              {library.map((faculty) => (
                <button
                  key={faculty.id}
                  className="library-selection-card"
                  onClick={() =>
                    goFaculty(faculty)
                  }
                >
                  <div className="library-selection-top">
                    <div className="library-selection-icon">
                      <FacultyIcon
                        type={faculty.icon}
                      />
                    </div>

                    <span className="library-faculty-badge">
                      FACULTY
                    </span>
                  </div>

                  <div className="library-selection-content">
                    <h3>{faculty.name}</h3>

                    <p>
                      {faculty.description ||
                        "Explore academic learning resources."}
                    </p>
                  </div>

                  <div className="library-selection-footer">
                    <span>
                      {faculty.years?.length || 0}{" "}
                      {faculty.years?.length === 1
                        ? "year"
                        : "years"}
                    </span>

                    <span className="library-selection-arrow">
                      <ChevronRight size={18} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="library-empty-state">
              <LibraryBig size={42} />

              <h2>No library content</h2>

              <p>
                Add an article inside the src/library
                folder to begin.
              </p>
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          YEAR
          ===================================================== */}

      {selectedFaculty && !selectedYear && (
        <div className="library-level">
          <div className="library-level-header">
            <div className="library-level-header-content">
              <span className="eyebrow">
                02 · YEAR
              </span>

              <h2>{selectedFaculty.name}</h2>

              <p>
                Select the academic year to continue
                through the library.
              </p>
            </div>

            <div className="library-level-number">
              02
            </div>
          </div>

          {selectedFaculty.years?.length > 0 ? (
            <div className="library-level-grid">
              {selectedFaculty.years.map(
                (year, index) => (
                  <button
                    key={year.id}
                    className="library-level-card"
                    onClick={() =>
                      goYear(year)
                    }
                  >
                    <div className="library-level-card-top">
                      <span className="library-card-index">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <div className="library-level-card-icon">
                        <GraduationCap size={23} />
                      </div>
                    </div>

                    <h3>{year.name}</h3>

                    <p>
                      {year.description ||
                        `${
                          year.semesters?.length ||
                          0
                        } semesters available`}
                    </p>

                    <span className="library-card-arrow">
                      <ChevronRight size={18} />
                    </span>
                  </button>
                )
              )}
            </div>
          ) : (
            <div className="library-empty-state">
              <GraduationCap size={42} />

              <h2>No years available</h2>

              <p>
                Add articles inside the appropriate
                year folder.
              </p>
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          SEMESTER
          ===================================================== */}

      {selectedFaculty &&
        selectedYear &&
        !selectedSemester && (
          <div className="library-level">
            <div className="library-level-header">
              <div className="library-level-header-content">
                <span className="eyebrow">
                  03 · SEMESTER
                </span>

                <h2>{selectedYear.name}</h2>

                <p>
                  Choose a semester to see the subjects
                  available in this academic year.
                </p>
              </div>

              <div className="library-level-number">
                03
              </div>
            </div>

            {selectedYear.semesters?.length > 0 ? (
              <div className="library-level-grid">
                {selectedYear.semesters.map(
                  (semester, index) => (
                    <button
                      key={semester.id}
                      className="library-level-card"
                      onClick={() =>
                        goSemester(semester)
                      }
                    >
                      <div className="library-level-card-top">
                        <span className="library-card-index">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <div className="library-level-card-icon">
                          <BookOpen size={23} />
                        </div>
                      </div>

                      <h3>{semester.name}</h3>

                      <p>
                        {semester.description ||
                          `${
                            semester.subjects
                              ?.length || 0
                          } subjects available`}
                      </p>

                      <span className="library-card-arrow">
                        <ChevronRight size={18} />
                      </span>
                    </button>
                  )
                )}
              </div>
            ) : (
              <div className="library-empty-state">
                <BookOpen size={42} />

                <h2>No semesters available</h2>

                <p>
                  Add articles inside the semester
                  folders.
                </p>
              </div>
            )}
          </div>
        )}

      {/* =====================================================
          SUBJECT
          ===================================================== */}

      {selectedFaculty &&
        selectedYear &&
        selectedSemester &&
        !selectedSubject && (
          <div className="library-level">
            <div className="library-level-header">
              <div className="library-level-header-content">
                <span className="eyebrow">
                  04 · SUBJECTS
                </span>

                <h2>
                  {selectedSemester.name}
                </h2>

                <p>
                  Select a subject to browse its units,
                  articles and reading materials.
                </p>
              </div>

              <div className="library-level-number">
                04
              </div>
            </div>

            {selectedSemester.subjects?.length >
            0 ? (
              <div className="library-subject-list">
                {selectedSemester.subjects.map(
                  (subject, index) => (
                    <button
                      key={subject.id}
                      className="library-subject-card"
                      onClick={() =>
                        goSubject(subject)
                      }
                    >
                      <div className="library-subject-icon">
                        <BookMarked size={22} />
                      </div>

                      <div className="library-subject-card-content">
                        <div className="library-subject-card-top">
                          <span className="library-card-index">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          {subject.code && (
                            <span className="library-subject-code">
                              {subject.code}
                            </span>
                          )}
                        </div>

                        <h3>{subject.name}</h3>

                        <p>
                          {subject.description ||
                            "Explore subject reading materials."}
                        </p>

                        <span className="library-subject-units">
                          {subject.units?.length ||
                            0}{" "}
                          {subject.units?.length ===
                          1
                            ? "unit"
                            : "units"}
                        </span>
                      </div>

                      <span className="library-subject-arrow">
                        <ChevronRight size={20} />
                      </span>
                    </button>
                  )
                )}
              </div>
            ) : (
              <div className="library-empty-state">
                <BookMarked size={42} />

                <h2>No subjects available</h2>

                <p>
                  Add article files inside the subject
                  folders.
                </p>
              </div>
            )}
          </div>
        )}

      {/* =====================================================
          UNITS
          ===================================================== */}

      {selectedFaculty &&
        selectedYear &&
        selectedSemester &&
        selectedSubject && (
          <div className="library-level">
            <div className="library-level-header">
              <div className="library-level-header-content">
                <span className="eyebrow">
                  05 · READING UNITS
                </span>

                <h2>
                  {selectedSubject.name}
                </h2>

                <p>
                  Select a unit to enter the
                  distraction-free reading mode.
                </p>
              </div>

              <div className="library-level-number">
                05
              </div>
            </div>

            {selectedSubject.units?.length > 0 ? (
              <div className="library-unit-list">
                {selectedSubject.units.map(
                  (unit, index) => (
                    <button
                      key={unit.id}
                      className="library-unit-card"
                      onClick={() =>
                        openUnit(unit)
                      }
                    >
                      <div className="library-unit-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </div>

                      <div className="library-unit-content">
                        <span className="library-unit-type">
                          {unit.type || "READING"}
                        </span>

                        <h3>{unit.title}</h3>

                        {unit.description && (
                          <p>
                            {unit.description}
                          </p>
                        )}
                      </div>

                      <div className="library-unit-arrow">
                        <ChevronRight size={19} />
                      </div>
                    </button>
                  )
                )}
              </div>
            ) : (
              <div className="library-empty-state">
                <BookOpen size={42} />

                <h2>No units available</h2>

                <p>
                  Create a Unit folder and add a JSX
                  article inside it.
                </p>
              </div>
            )}
          </div>
        )}
    </section>
  );
}

export default Library;
