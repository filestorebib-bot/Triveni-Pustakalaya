import { useEffect, useMemo, useState } from "react";

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

import { getData } from "../services/db";
import { syncLibraryData } from "../services/sync";

/* =========================================================
   DEFAULT LIBRARY DATA
   ========================================================= */

const defaultLibrary = [
  {
    id: "bvsc-ah",
    name: "BVSc & AH",
    description: "Bachelor of Veterinary Science & Animal Husbandry",
    icon: "veterinary",
    years: [
      {
        id: "bvsc-year-1",
        name: "First Year",
        description: "Foundation veterinary sciences",
        semesters: [
          {
            id: "bvsc-y1-sem1",
            name: "Semester I",
            description: "First semester subjects",
            subjects: [
              {
                id: "bvsc-y1-s1-anatomy",
                name: "Veterinary Anatomy",
                code: "VAN-101",
                description:
                  "Study of the structure and organization of the animal body.",
                units: [
                  {
                    id: "anatomy-unit-1",
                    title: "Introduction to Veterinary Anatomy",
                    type: "Article",
                    content: `
                      <p>
                        Veterinary anatomy is the study of the structure of the
                        animal body and the relationships between its different
                        organs, tissues and systems.
                      </p>

                      <h2>Importance of Veterinary Anatomy</h2>

                      <p>
                        A strong understanding of anatomy is essential for
                        veterinary students because clinical examination,
                        diagnosis, surgery, imaging and many other procedures
                        depend on accurate knowledge of normal body structure.
                      </p>

                      <h3>Major Areas of Anatomy</h3>

                      <ul>
                        <li>Gross anatomy</li>
                        <li>Microscopic anatomy</li>
                        <li>Developmental anatomy</li>
                        <li>Comparative anatomy</li>
                        <li>Applied or clinical anatomy</li>
                      </ul>

                      <blockquote>
                        Anatomy provides the structural foundation for
                        understanding veterinary physiology and pathology.
                      </blockquote>
                    `,
                  },
                  {
                    id: "anatomy-unit-2",
                    title: "Skeletal System",
                    type: "Article",
                    content: `
                      <p>
                        The skeletal system provides support, protection and
                        attachment for muscles. It also contributes to movement
                        and mineral storage.
                      </p>

                      <h2>Functions</h2>

                      <ul>
                        <li>Provides structural support</li>
                        <li>Protects internal organs</li>
                        <li>Provides attachment for muscles</li>
                        <li>Participates in movement</li>
                        <li>Stores minerals</li>
                      </ul>

                      <h3>Veterinary Importance</h3>

                      <p>
                        Knowledge of the skeletal system is important for
                        diagnosis of fractures, joint disorders, deformities
                        and musculoskeletal diseases.
                      </p>
                    `,
                  },
                ],
              },

              {
                id: "bvsc-y1-s1-physiology",
                name: "Veterinary Physiology",
                code: "VPH-101",
                description:
                  "Study of normal physiological functions in animals.",
                units: [
                  {
                    id: "physiology-unit-1",
                    title: "Homeostasis",
                    type: "Article",
                    content: `
                      <p>
                        Homeostasis refers to the maintenance of a relatively
                        stable internal environment despite changes in the
                        external environment.
                      </p>

                      <h2>Components of Homeostasis</h2>

                      <ul>
                        <li>Receptor or sensor</li>
                        <li>Control center</li>
                        <li>Effector</li>
                      </ul>

                      <p>
                        Most homeostatic mechanisms operate through negative
                        feedback. This allows the body to correct deviations
                        from normal physiological conditions.
                      </p>
                    `,
                  },
                ],
              },
            ],
          },

          {
            id: "bvsc-y1-sem2",
            name: "Semester II",
            description: "Second semester subjects",
            subjects: [
              {
                id: "bvsc-y1-s2-biochemistry",
                name: "Veterinary Biochemistry",
                code: "VBC-102",
                description:
                  "Biochemical principles and metabolic processes.",
                units: [
                  {
                    id: "biochem-unit-1",
                    title: "Carbohydrate Metabolism",
                    type: "Article",
                    content: `
                      <p>
                        Carbohydrates are important biological molecules that
                        provide energy and serve as structural and metabolic
                        components.
                      </p>

                      <h2>Glycolysis</h2>

                      <p>
                        Glycolysis is a metabolic pathway through which glucose
                        is converted into pyruvate. It occurs in the cytoplasm
                        of cells.
                      </p>

                      <h3>Major Outcomes</h3>

                      <ul>
                        <li>Production of ATP</li>
                        <li>Production of NADH</li>
                        <li>Formation of pyruvate</li>
                      </ul>
                    `,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "science",
    name: "Science",
    description: "General science learning resources",
    icon: "science",
    years: [
      {
        id: "science-year-1",
        name: "Grade 11",
        description: "Higher secondary science",
        semesters: [
          {
            id: "science-g11-sem1",
            name: "Semester I",
            description: "First semester",
            subjects: [
              {
                id: "science-physics",
                name: "Physics",
                code: "PHY-101",
                description: "Fundamental principles of physics.",
                units: [
                  {
                    id: "physics-unit-1",
                    title: "Units and Measurements",
                    type: "Article",
                    content: `
                      <p>
                        Measurement is an essential part of scientific study.
                        Physical quantities are expressed using numerical
                        values and appropriate units.
                      </p>

                      <h2>SI Units</h2>

                      <p>
                        The International System of Units provides standardized
                        units for fundamental physical quantities.
                      </p>

                      <ul>
                        <li>Length — metre</li>
                        <li>Mass — kilogram</li>
                        <li>Time — second</li>
                        <li>Electric current — ampere</li>
                        <li>Temperature — kelvin</li>
                      </ul>
                    `,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

function getLibraryArray(data) {
  if (!data) return defaultLibrary;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.library)) {
    return data.library;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return defaultLibrary;
}

function normalizeLibrary(data) {
  const library = getLibraryArray(data);

  return library.map((faculty, facultyIndex) => ({
    ...faculty,
    id: faculty.id || `faculty-${facultyIndex}`,
    years: (faculty.years || []).map((year, yearIndex) => ({
      ...year,
      id: year.id || `year-${facultyIndex}-${yearIndex}`,
      semesters: (year.semesters || []).map((semester, semesterIndex) => ({
        ...semester,
        id:
          semester.id ||
          `semester-${facultyIndex}-${yearIndex}-${semesterIndex}`,
        subjects: (semester.subjects || []).map((subject, subjectIndex) => ({
          ...subject,
          id:
            subject.id ||
            `subject-${facultyIndex}-${yearIndex}-${semesterIndex}-${subjectIndex}`,
          units: (subject.units || []).map((unit, unitIndex) => ({
            ...unit,
            id:
              unit.id ||
              `unit-${facultyIndex}-${yearIndex}-${semesterIndex}-${subjectIndex}-${unitIndex}`,
          })),
        })),
      })),
    })),
  }));
}

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
  const [library, setLibrary] = useState(defaultLibrary);

  const [search, setSearch] = useState("");

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [readingUnit, setReadingUnit] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ---------------------------------------------------------
     LOAD LOCAL DATA + SYNC ONLINE
     --------------------------------------------------------- */

  useEffect(() => {
    let mounted = true;

    async function loadLibrary() {
      try {
        const localData = await getData("library");

        if (mounted && localData) {
          setLibrary(normalizeLibrary(localData));
        }
      } catch (error) {
        console.log("Local library data unavailable:", error);
      }

      try {
        if (navigator.onLine) {
          const syncedData = await syncLibraryData();

          if (mounted && syncedData) {
            setLibrary(normalizeLibrary(syncedData));
          }
        }
      } catch (error) {
        console.log("Library sync unavailable:", error);
      }
    }

    loadLibrary();

    const handleOnline = async () => {
      try {
        const syncedData = await syncLibraryData();

        if (mounted && syncedData) {
          setLibrary(normalizeLibrary(syncedData));
        }
      } catch (error) {
        console.log("Online library sync failed:", error);
      }
    };

    window.addEventListener("online", handleOnline);

    return () => {
      mounted = false;
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  /* ---------------------------------------------------------
     RESET NAVIGATION
     --------------------------------------------------------- */

  const resetLibrary = () => {
    setSelectedFaculty(null);
    setSelectedYear(null);
    setSelectedSemester(null);
    setSelectedSubject(null);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  const goFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedYear(null);
    setSelectedSemester(null);
    setSelectedSubject(null);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  const goYear = (year) => {
    setSelectedYear(year);
    setSelectedSemester(null);
    setSelectedSubject(null);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  const goSemester = (semester) => {
    setSelectedSemester(semester);
    setSelectedSubject(null);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  const goSubject = (subject) => {
    setSelectedSubject(subject);
    setReadingUnit(null);
    setSidebarOpen(false);
  };

  const openUnit = (unit) => {
    setReadingUnit(unit);
    setFontSize(18);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------------------------------------------------
     SEARCH
     --------------------------------------------------------- */

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

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
                unit.title,
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

  /* ---------------------------------------------------------
     CURRENT UNITS
     --------------------------------------------------------- */

  const currentUnits = selectedSubject?.units || [];

  const currentUnitIndex = readingUnit
    ? currentUnits.findIndex((unit) => unit.id === readingUnit.id)
    : -1;

  const previousUnit =
    currentUnitIndex > 0 ? currentUnits[currentUnitIndex - 1] : null;

  const nextUnit =
    currentUnitIndex >= 0 && currentUnitIndex < currentUnits.length - 1
      ? currentUnits[currentUnitIndex + 1]
      : null;

  /* ---------------------------------------------------------
     READING MODE
     --------------------------------------------------------- */

  if (readingUnit) {
    return (
      <section
        className={`library-reader ${
          darkMode ? "library-reader-dark" : ""
        }`}
      >
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
              <span>{selectedSubject?.name}</span>
              <h1>{readingUnit.title}</h1>
            </div>
          </div>

          <div className="library-reader-controls">
            <button
              className="reader-control-button"
              onClick={() =>
                setFontSize((size) => Math.max(14, size - 1))
              }
              title="Decrease font size"
            >
              <ZoomOut size={17} />
            </button>

            <span className="reader-font-size">{fontSize}px</span>

            <button
              className="reader-control-button"
              onClick={() =>
                setFontSize((size) => Math.min(25, size + 1))
              }
              title="Increase font size"
            >
              <ZoomIn size={17} />
            </button>

            <button
              className="reader-control-button"
              onClick={() => setDarkMode((value) => !value)}
              title="Toggle reading mode"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              className="reader-control-button mobile-sidebar-button"
              onClick={() => setSidebarOpen((value) => !value)}
              title="Units"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div className="library-reader-layout">
          <aside
            className={`library-reader-sidebar ${
              sidebarOpen ? "open" : ""
            }`}
          >
            <div className="library-reader-sidebar-title">
              <span>COURSE CONTENT</span>
              <strong>{selectedSubject?.name}</strong>
            </div>

            <div className="library-reader-unit-list">
              {currentUnits.map((unit, index) => (
                <button
                  key={unit.id}
                  className={`library-reader-unit-button ${
                    unit.id === readingUnit.id ? "active" : ""
                  }`}
                  onClick={() => openUnit(unit)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{unit.title}</strong>
                    <small>{unit.type || "Reading"}</small>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <main className="library-reader-content">
            <article
              className="library-reader-paper"
              style={{ fontSize: `${fontSize}px` }}
            >
              <div className="library-reader-paper-meta">
                <span>{selectedFaculty?.name}</span>
                <ChevronRight size={13} />
                <span>{selectedYear?.name}</span>
                <ChevronRight size={13} />
                <span>{selectedSemester?.name}</span>
                <ChevronRight size={13} />
                <span>{selectedSubject?.name}</span>
              </div>

              <div className="library-reader-paper-heading">
                <span className="library-unit-type">
                  {readingUnit.type || "READING"}
                </span>

                <h2>{readingUnit.title}</h2>
              </div>

              {readingUnit.pdf ? (
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
              ) : (
                <div
                  className="library-article-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      readingUnit.content ||
                      "<p>No reading content has been added yet.</p>",
                  }}
                />
              )}

              <div className="library-reader-navigation">
                <button
                  className="library-reader-nav-button"
                  disabled={!previousUnit}
                  onClick={() =>
                    previousUnit && openUnit(previousUnit)
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

                <div className="library-reader-progress">
                  <span>
                    {currentUnitIndex >= 0
                      ? currentUnitIndex + 1
                      : 1}
                  </span>
                  <small>OF</small>
                  <span>{currentUnits.length}</span>
                </div>

                <button
                  className="library-reader-nav-button next"
                  disabled={!nextUnit}
                  onClick={() => nextUnit && openUnit(nextUnit)}
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

  /* ---------------------------------------------------------
     SEARCH RESULT VIEW
     --------------------------------------------------------- */

  if (search.trim()) {
    return (
      <section className="page-section library-page">
        <div className="page-header">
          <span className="eyebrow">DIGITAL COLLECTION</span>

          <h1>Library</h1>

          <p>
            Search across faculties, years, semesters, subjects
            and reading units.
          </p>
        </div>

        <div className="library-search">
          <Search size={19} />
          <input
            type="search"
            placeholder="Search books, subjects, units..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
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

        <div className="library-search-results">
          <div className="library-search-results-header">
            <div>
              <span className="eyebrow">SEARCH RESULTS</span>
              <h2>Resources matching your search</h2>
            </div>

            <span className="library-search-count">
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""}
            </span>
          </div>

          {searchResults.length > 0 ? (
            <div className="library-result-list">
              {searchResults.map((result) => (
                <button
                  className="library-result-card"
                  key={`${result.faculty.id}-${result.unit.id}`}
                  onClick={() => {
                    setSelectedFaculty(result.faculty);
                    setSelectedYear(result.year);
                    setSelectedSemester(result.semester);
                    setSelectedSubject(result.subject);
                    openUnit(result.unit);
                  }}
                >
                  <div className="library-result-icon">
                    <FileText size={22} />
                  </div>

                  <div className="library-result-content">
                    <span>
                      {result.faculty.name} · {result.year.name}
                    </span>

                    <h3>{result.unit.title}</h3>

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
                Try searching with another faculty, subject,
                book or unit name.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------
     HIERARCHY VIEW
     --------------------------------------------------------- */

  return (
    <section className="page-section library-page">
      <div className="page-header library-page-header">
        <span className="eyebrow">DIGITAL COLLECTION</span>

        <h1>Library</h1>

        <p>
          Explore your study materials through a structured
          learning path — from faculty and year to semester,
          subject and individual units.
        </p>
      </div>

      {/* SEARCH */}

      <div className="library-search">
        <Search size={19} />

        <input
          type="search"
          placeholder="Search books, subjects, units..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BREADCRUMB */}

      {selectedFaculty && (
        <div className="library-breadcrumb">
          <button onClick={resetLibrary}>Library</button>

          <ChevronRight size={14} />

          <button
            onClick={() => {
              setSelectedYear(null);
              setSelectedSemester(null);
              setSelectedSubject(null);
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
                }}
              >
                {selectedSemester.name}
              </button>
            </>
          )}

          {selectedSubject && (
            <>
              <ChevronRight size={14} />

              <span>{selectedSubject.name}</span>
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
              <span className="eyebrow">01 · FACULTY</span>

              <h2>Choose your faculty</h2>

              <p>
                Start by selecting the academic faculty or
                learning collection you want to explore.
              </p>
            </div>

            <div className="library-level-number">01</div>
          </div>

          <div className="library-selection-grid">
            {library.map((faculty) => (
              <button
                key={faculty.id}
                className="library-selection-card"
                onClick={() => goFaculty(faculty)}
              >
                <div className="library-selection-top">
                  <div className="library-selection-icon">
                    <FacultyIcon type={faculty.icon} />
                  </div>

                  <span className="library-faculty-badge">
                    FACULTY
                  </span>
                </div>

                <div className="library-selection-content">
                  <h3>{faculty.name}</h3>

                  <p>{faculty.description}</p>
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
        </div>
      )}

      {/* =====================================================
          YEAR
          ===================================================== */}

      {selectedFaculty && !selectedYear && (
        <div className="library-level">
          <div className="library-level-header">
            <div className="library-level-header-content">
              <span className="eyebrow">02 · YEAR</span>

              <h2>{selectedFaculty.name}</h2>

              <p>
                Select the academic year to continue through
                the library.
              </p>
            </div>

            <div className="library-level-number">02</div>
          </div>

          <div className="library-level-grid">
            {selectedFaculty.years?.map((year, index) => (
              <button
                key={year.id}
                className="library-level-card"
                onClick={() => goYear(year)}
              >
                <div className="library-level-card-top">
                  <span className="library-card-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="library-level-card-icon">
                    <GraduationCap size={23} />
                  </div>
                </div>

                <h3>{year.name}</h3>

                <p>
                  {year.description ||
                    `${year.semesters?.length || 0} semesters available`}
                </p>

                <span className="library-card-arrow">
                  <ChevronRight size={18} />
                </span>
              </button>
            ))}
          </div>
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

              <div className="library-level-number">03</div>
            </div>

            <div className="library-level-grid">
              {selectedYear.semesters?.map(
                (semester, index) => (
                  <button
                    key={semester.id}
                    className="library-level-card"
                    onClick={() => goSemester(semester)}
                  >
                    <div className="library-level-card-top">
                      <span className="library-card-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="library-level-card-icon">
                        <BookOpen size={23} />
                      </div>
                    </div>

                    <h3>{semester.name}</h3>

                    <p>
                      {semester.description ||
                        `${
                          semester.subjects?.length || 0
                        } subjects available`}
                    </p>

                    <span className="library-card-arrow">
                      <ChevronRight size={18} />
                    </span>
                  </button>
                )
              )}
            </div>
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

                <h2>{selectedSemester.name}</h2>

                <p>
                  Select a subject to browse its units,
                  articles and PDF reading materials.
                </p>
              </div>

              <div className="library-level-number">04</div>
            </div>

            <div className="library-subject-list">
              {selectedSemester.subjects?.map(
                (subject, index) => (
                  <button
                    key={subject.id}
                    className="library-subject-card"
                    onClick={() => goSubject(subject)}
                  >
                    <div className="library-subject-icon">
                      <BookMarked size={22} />
                    </div>

                    <div className="library-subject-card-content">
                      <div className="library-subject-card-top">
                        <span className="library-card-index">
                          {String(index + 1).padStart(2, "0")}
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
                        {subject.units?.length || 0}{" "}
                        {subject.units?.length === 1
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

                <h2>{selectedSubject.name}</h2>

                <p>
                  Select a unit to enter the distraction-free
                  reading mode.
                </p>
              </div>

              <div className="library-level-number">05</div>
            </div>

            <div className="library-unit-list">
              {selectedSubject.units?.map((unit, index) => (
                <button
                  key={unit.id}
                  className="library-unit-card"
                  onClick={() => openUnit(unit)}
                >
                  <div className="library-unit-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="library-unit-content">
                    <span className="library-unit-type">
                      {unit.type || "READING"}
                    </span>

                    <h3>{unit.title}</h3>

                    {unit.description && (
                      <p>{unit.description}</p>
                    )}
                  </div>

                  <div className="library-unit-arrow">
                    <ChevronRight size={19} />
                  </div>
                </button>
              ))}

              {(!selectedSubject.units ||
                selectedSubject.units.length === 0) && (
                <div className="library-empty-state">
                  <BookOpen size={42} />

                  <h2>No units available</h2>

                  <p>
                    Reading material for this subject has not
                    been added yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
    </section>
  );
}

export default Library;
