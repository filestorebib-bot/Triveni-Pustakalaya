import { useEffect, useState } from "react";
import {
  BookOpen,
  Search,
  FileText,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  X,
  ZoomIn,
  ZoomOut,
  Download,
  Moon,
  Sun,
  Menu,
  BookMarked,
} from "lucide-react";

import { getData } from "../services/db";
import { syncLibraryData } from "../services/sync";

/*
====================================================
DEFAULT LIBRARY DATA
====================================================

This is fallback data.

You can later replace this with your actual
library.json data.

The app will first try to use the latest
downloaded library data from IndexedDB.
*/

const defaultLibrary = {
  version: 1,
  updatedAt: "2026-09-09",

  faculties: [
    {
      id: "bvsc-ah",
      name: "BVSc & AH",
      description: "Bachelor of Veterinary Science and Animal Husbandry",

      years: [
        {
          id: "year-1",
          name: "1st Year",

          semesters: [
            {
              id: "semester-1",
              name: "1st Semester",

              subjects: [
                {
                  id: "anatomy",
                  name: "Veterinary Anatomy",

                  units: [
                    {
                      id: "anatomy-unit-1",
                      unit: "Unit 1",
                      title: "Introduction to Veterinary Anatomy",
                      type: "article",

                      content: `
# Introduction to Veterinary Anatomy

Veterinary anatomy is the study of the structure of animals and the relationship between different organs and body systems.

Understanding anatomy is essential for veterinary students because it provides the foundation for clinical examination, surgery, diagnosis and treatment.

## Basic Anatomical Terminology

Veterinary anatomical terminology is used to describe the position and direction of structures within the animal body.

### Anatomical Position

The anatomical position provides a standard reference for describing body structures.

Important directional terms include:

- Cranial — toward the head.
- Caudal — toward the tail.
- Dorsal — toward the back.
- Ventral — toward the belly.
- Medial — toward the median plane.
- Lateral — away from the median plane.
- Proximal — nearer to the body or point of origin.
- Distal — farther from the body or point of origin.

## Importance of Anatomy

A strong knowledge of anatomy helps veterinary students understand normal body structure and recognize abnormalities during clinical practice.

Anatomy also forms the basis for subjects such as physiology, pathology, surgery and diagnostic imaging.

## Summary

Veterinary anatomy provides a fundamental understanding of animal body structure. Learning anatomical terminology and relationships between organs is essential for successful veterinary practice.
`,
                    },

                    {
                      id: "anatomy-unit-2",
                      unit: "Unit 2",
                      title: "Basic Anatomical Planes",
                      type: "article",

                      content: `
# Basic Anatomical Planes

Anatomical planes are imaginary flat surfaces used to describe sections and positions of structures in the body.

## Median Plane

The median plane divides the body into equal right and left portions.

## Sagittal Plane

A sagittal plane divides the body into right and left portions, but the portions do not necessarily have to be equal.

## Dorsal Plane

The dorsal plane divides the body into dorsal and ventral portions.

## Transverse Plane

The transverse plane divides the body into cranial and caudal portions.

## Clinical Importance

Knowledge of anatomical planes is particularly important in diagnostic imaging such as radiography, CT and MRI.

Veterinary professionals use these planes to accurately describe the location of organs and lesions.
`,
                    },

                    {
                      id: "anatomy-unit-3",
                      unit: "Unit 3",
                      title: "Body Regions",
                      type: "article",

                      content: `
# Body Regions

The animal body can be divided into several major anatomical regions.

## Head

The head contains the brain, eyes, ears, nasal cavity, oral cavity and other important structures.

## Neck

The neck connects the head with the trunk and contains important structures including the trachea, esophagus, blood vessels and nerves.

## Thorax

The thorax contains the heart and lungs and is protected by the thoracic cage.

## Abdomen

The abdomen contains major organs of digestion and other important structures.

## Pelvis

The pelvic region contains reproductive, urinary and digestive structures and provides attachment for the hind limbs.
`,
                    },
                  ],
                },

                {
                  id: "physiology",
                  name: "Veterinary Physiology",

                  units: [
                    {
                      id: "physiology-unit-1",
                      unit: "Unit 1",
                      title: "Introduction to Physiology",
                      type: "article",

                      content: `
# Introduction to Veterinary Physiology

Physiology is the study of the normal functions of living organisms.

Veterinary physiology focuses on the normal functioning of organs and body systems in animals.

## Major Body Systems

Important physiological systems include:

- Nervous system
- Cardiovascular system
- Respiratory system
- Digestive system
- Endocrine system
- Urinary system
- Reproductive system

Understanding normal physiological functions helps veterinary students recognize disease processes and physiological abnormalities.

## Homeostasis

Homeostasis refers to the maintenance of a relatively stable internal environment despite changes in the external environment.

Examples include regulation of:

- Body temperature
- Blood glucose
- Blood pressure
- Fluid balance
- Acid-base balance

## Conclusion

Physiology provides the foundation for understanding how animal bodies function normally and how disease can alter these functions.
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
      description: "Science study materials",

      years: [
        {
          id: "science-year-1",
          name: "1st Year",

          semesters: [
            {
              id: "science-semester-1",
              name: "1st Semester",

              subjects: [
                {
                  id: "biology",
                  name: "Biology",

                  units: [
                    {
                      id: "biology-unit-1",
                      unit: "Unit 1",
                      title: "Introduction to Biology",
                      type: "article",

                      content: `
# Introduction to Biology

Biology is the scientific study of life and living organisms.

Living organisms show characteristics such as growth, reproduction, metabolism and response to stimuli.

## Branches of Biology

Major branches include:

- Botany
- Zoology
- Microbiology
- Genetics
- Ecology
- Physiology

## Importance

Biology helps us understand the structure, function and relationships of living organisms.
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
  ],
};

/*
====================================================
HELPER: FIND ALL FACULTIES
====================================================
*/

function normalizeLibrary(data) {
  if (!data) {
    return defaultLibrary;
  }

  if (Array.isArray(data.faculties)) {
    return data;
  }

  return defaultLibrary;
}

/*
====================================================
READING CONTENT FORMATTER
====================================================
*/

function formatArticle(text) {
  if (!text) return [];

  return text
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/*
====================================================
LIBRARY COMPONENT
====================================================
*/

function Library() {
  /*
  ================================================
  LIBRARY DATA
  ================================================
  */

  const [library, setLibrary] = useState(defaultLibrary);

  /*
  ================================================
  NAVIGATION
  ================================================
  */

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  /*
  ================================================
  SEARCH
  ================================================
  */

  const [search, setSearch] = useState("");

  /*
  ================================================
  READING MODE
  ================================================
  */

  const [readingMode, setReadingMode] = useState(false);
  const [darkReading, setDarkReading] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  /*
  ================================================
  MOBILE UNIT MENU
  ================================================
  */

  const [showUnitMenu, setShowUnitMenu] = useState(false);

  /*
  ================================================
  LOAD OFFLINE DATA
  ================================================
  */

  useEffect(() => {
    let mounted = true;

    async function loadLibrary() {
      try {
        /*
        First try locally saved data.
        */

        const savedLibrary = await getData("library");

        if (mounted && savedLibrary) {
          setLibrary(normalizeLibrary(savedLibrary));
        }

        /*
        Then try downloading latest data
        when internet is available.
        */

        if (navigator.onLine) {
          const latestLibrary = await syncLibraryData();

          if (mounted && latestLibrary) {
            setLibrary(normalizeLibrary(latestLibrary));
          }
        }
      } catch (error) {
        console.log("Using offline library data:", error);

        if (mounted) {
          setLibrary(defaultLibrary);
        }
      }
    }

    loadLibrary();

    /*
    ================================================
    INTERNET RESTORED
    ================================================
    */

    const handleOnline = async () => {
      try {
        const latestLibrary = await syncLibraryData();

        if (mounted && latestLibrary) {
          setLibrary(normalizeLibrary(latestLibrary));
        }
      } catch (error) {
        console.log("Library sync failed:", error);
      }
    };

    window.addEventListener("online", handleOnline);

    return () => {
      mounted = false;
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  /*
  ================================================
  SEARCH RESULTS
  ================================================
  */

  const searchResults = [];

  library.faculties?.forEach((faculty) => {
    faculty.years?.forEach((year) => {
      year.semesters?.forEach((semester) => {
        semester.subjects?.forEach((subject) => {
          subject.units?.forEach((unit) => {
            const searchableText = `
              ${faculty.name}
              ${year.name}
              ${semester.name}
              ${subject.name}
              ${unit.unit}
              ${unit.title}
            `.toLowerCase();

            if (
              search.trim() &&
              searchableText.includes(search.toLowerCase())
            ) {
              searchResults.push({
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

  /*
  ================================================
  RESET NAVIGATION
  ================================================
  */

  const resetLibrary = () => {
    setSelectedFaculty(null);
    setSelectedYear(null);
    setSelectedSemester(null);
    setSelectedSubject(null);
    setSelectedUnit(null);
    setReadingMode(false);
    setSearch("");
  };

  /*
  ================================================
  OPEN UNIT
  ================================================
  */

  const openUnit = (unit, subject = selectedSubject) => {
    setSelectedUnit(unit);

    if (subject) {
      setSelectedSubject(subject);
    }

    setReadingMode(true);
    setShowUnitMenu(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  ================================================
  CLOSE READING
  ================================================
  */

  const closeReading = () => {
    setReadingMode(false);
    setSelectedUnit(null);
    setDarkReading(false);
  };

  /*
  ================================================
  GET NEXT/PREVIOUS UNIT
  ================================================
  */

  const units = selectedSubject?.units || [];

  const currentIndex = selectedUnit
    ? units.findIndex((unit) => unit.id === selectedUnit.id)
    : -1;

  const previousUnit =
    currentIndex > 0 ? units[currentIndex - 1] : null;

  const nextUnit =
    currentIndex >= 0 && currentIndex < units.length - 1
      ? units[currentIndex + 1]
      : null;

  /*
  ================================================
  READING MODE
  ================================================
  */

  if (readingMode && selectedUnit) {
    const lines = formatArticle(selectedUnit.content);

    return (
      <section
        className={`library-reading-page ${
          darkReading ? "reading-dark" : ""
        }`}
      >
        {/* READING HEADER */}

        <header className="reading-header">

          <button
            className="reading-back-button"
            onClick={closeReading}
          >
            <ArrowLeft size={20} />
            <span>Back to Library</span>
          </button>

          <div className="reading-header-actions">

            <button
              className="reading-control"
              onClick={() =>
                setFontSize((size) => Math.max(14, size - 1))
              }
              title="Decrease text size"
            >
              <ZoomOut size={18} />
            </button>

            <span className="font-size-label">
              {fontSize}px
            </span>

            <button
              className="reading-control"
              onClick={() =>
                setFontSize((size) => Math.min(28, size + 1))
              }
              title="Increase text size"
            >
              <ZoomIn size={18} />
            </button>

            <button
              className="reading-control"
              onClick={() => setDarkReading(!darkReading)}
              title="Toggle reading theme"
            >
              {darkReading ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

          </div>
        </header>

        {/* READING LAYOUT */}

        <div className="reading-layout">

          {/* UNIT SIDEBAR */}

          <aside className="reading-sidebar">

            <div className="reading-sidebar-title">
              <BookMarked size={18} />
              <span>Units</span>
            </div>

            {units.map((unit) => (
              <button
                key={unit.id}
                className={`reading-unit-link ${
                  selectedUnit.id === unit.id
                    ? "active"
                    : ""
                }`}
                onClick={() => openUnit(unit)}
              >
                <span>{unit.unit}</span>
                <small>{unit.title}</small>
              </button>
            ))}

          </aside>

          {/* ARTICLE */}

          <article
            className="reading-content"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >

            <div className="reading-breadcrumb">
              {selectedFaculty?.name} /{" "}
              {selectedYear?.name} /{" "}
              {selectedSemester?.name} /{" "}
              {selectedSubject?.name}
            </div>

            <span className="reading-unit-label">
              {selectedUnit.unit}
            </span>

            <h1>{selectedUnit.title}</h1>

            <div className="reading-divider" />

            {selectedUnit.type === "pdf" && selectedUnit.pdf ? (
              <div className="pdf-reader">

                <div className="pdf-reader-header">

                  <FileText size={24} />

                  <div>
                    <strong>
                      PDF Reading Mode
                    </strong>

                    <span>
                      This document can be read directly
                      inside Triveni Pustakalaya.
                    </span>
                  </div>

                  <a
                    href={selectedUnit.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-download"
                    download
                  >
                    <Download size={18} />
                    Download
                  </a>

                </div>

                <iframe
                  src={selectedUnit.pdf}
                  title={selectedUnit.title}
                  className="pdf-frame"
                />

              </div>
            ) : (
              <div className="article-body">

                {lines.map((line, index) => {

                  if (line.startsWith("# ")) {
                    return (
                      <h1 key={index}>
                        {line.replace("# ", "")}
                      </h1>
                    );
                  }

                  if (line.startsWith("## ")) {
                    return (
                      <h2 key={index}>
                        {line.replace("## ", "")}
                      </h2>
                    );
                  }

                  if (line.startsWith("### ")) {
                    return (
                      <h3 key={index}>
                        {line.replace("### ", "")}
                      </h3>
                    );
                  }

                  if (line.startsWith("- ")) {
                    return (
                      <li key={index}>
                        {line.replace("- ", "")}
                      </li>
                    );
                  }

                  return (
                    <p key={index}>
                      {line}
                    </p>
                  );
                })}

              </div>
            )}

            {/* PREVIOUS / NEXT */}

            <div className="reading-navigation">

              {previousUnit ? (
                <button
                  onClick={() => openUnit(previousUnit)}
                  className="reading-nav-button"
                >
                  <ChevronLeft size={20} />

                  <span>
                    <small>Previous</small>
                    {previousUnit.title}
                  </span>
                </button>
              ) : (
                <div />
              )}

              {nextUnit ? (
                <button
                  onClick={() => openUnit(nextUnit)}
                  className="reading-nav-button next"
                >
                  <span>
                    <small>Next</small>
                    {nextUnit.title}
                  </span>

                  <ChevronRight size={20} />
                </button>
              ) : (
                <div />
              )}

            </div>

          </article>
        </div>
      </section>
    );
  }

  /*
  ================================================
  MAIN LIBRARY
  ================================================
  */

  return (
    <section className="page-section library-page">

      {/* HEADER */}

      <div className="page-header">

        <span className="eyebrow">
          DIGITAL COLLECTION
        </span>

        <h1>
          Library
        </h1>

        <p>
          Browse educational resources by faculty,
          year, semester and subject.
        </p>

      </div>

      {/* SEARCH */}

      <div className="library-search">

        <Search size={20} />

        <input
          type="search"
          placeholder="Search faculty, subject, unit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="search-clear"
            onClick={() => setSearch("")}
          >
            <X size={18} />
          </button>
        )}

      </div>

      {/* SEARCH RESULTS */}

      {search.trim() ? (

        <div className="library-search-results">

          <div className="library-section-heading">
            <span>
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""}
            </span>
          </div>

          {searchResults.length > 0 ? (

            <div className="resource-grid">

              {searchResults.map((result) => (

                <article
                  className="resource-card"
                  key={result.unit.id}
                >

                  <div className="resource-icon">
                    {result.unit.type === "pdf" ? (
                      <FileText />
                    ) : (
                      <BookOpen />
                    )}
                  </div>

                  <div className="resource-card-content">

                    <span className="resource-category">
                      {result.subject.name}
                    </span>

                    <h2>
                      {result.unit.title}
                    </h2>

                    <p>
                      {result.faculty.name} •{" "}
                      {result.year.name} •{" "}
                      {result.semester.name}
                    </p>

                  </div>

                  <button
                    className="resource-button"
                    onClick={() => {
                      setSelectedFaculty(result.faculty);
                      setSelectedYear(result.year);
                      setSelectedSemester(result.semester);
                      setSelectedSubject(result.subject);

                      openUnit(
                        result.unit,
                        result.subject
                      );
                    }}
                  >
                    Open
                  </button>

                </article>

              ))}

            </div>

          ) : (

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

        </div>

      ) : (

        <>
          {/* FACULTIES */}

          {!selectedFaculty && (

            <div className="library-browser">

              <div className="library-section-heading">

                <div>
                  <span className="eyebrow">
                    STEP 01
                  </span>

                  <h2>
                    Choose Faculty
                  </h2>
                </div>

              </div>

              <div className="library-card-grid">

                {library.faculties?.map((faculty) => (

                  <button
                    className="library-category-card"
                    key={faculty.id}
                    onClick={() => {
                      setSelectedFaculty(faculty);
                    }}
                  >

                    <div className="category-card-icon">
                      <BookOpen size={28} />
                    </div>

                    <div className="category-card-content">

                      <h3>
                        {faculty.name}
                      </h3>

                      <p>
                        {faculty.description}
                      </p>

                    </div>

                    <ChevronRight size={22} />

                  </button>

                ))}

              </div>

            </div>
          )}

          {/* YEARS */}

          {selectedFaculty && !selectedYear && (

            <div className="library-browser">

              <button
                className="library-back"
                onClick={() => setSelectedFaculty(null)}
              >
                <ArrowLeft size={18} />
                Back to Faculties
              </button>

              <div className="library-section-heading">

                <div>
                  <span className="eyebrow">
                    {selectedFaculty.name}
                  </span>

                  <h2>
                    Choose Year
                  </h2>
                </div>

              </div>

              <div className="library-card-grid">

                {selectedFaculty.years?.map((year) => (

                  <button
                    className="library-category-card"
                    key={year.id}
                    onClick={() => setSelectedYear(year)}
                  >

                    <div className="category-card-icon">
                      <BookOpen size={28} />
                    </div>

                    <div className="category-card-content">

                      <h3>
                        {year.name}
                      </h3>

                      <p>
                        Browse available semesters
                      </p>

                    </div>

                    <ChevronRight size={22} />

                  </button>

                ))}

              </div>

            </div>
          )}

          {/* SEMESTERS */}

          {selectedYear && !selectedSemester && (

            <div className="library-browser">

              <button
                className="library-back"
                onClick={() => setSelectedYear(null)}
              >
                <ArrowLeft size={18} />
                Back to Years
              </button>

              <div className="library-section-heading">

                <div>
                  <span className="eyebrow">
                    {selectedYear.name}
                  </span>

                  <h2>
                    Choose Semester
                  </h2>
                </div>

              </div>

              <div className="library-card-grid">

                {selectedYear.semesters?.map(
                  (semester) => (

                    <button
                      className="library-category-card"
                      key={semester.id}
                      onClick={() =>
                        setSelectedSemester(semester)
                      }
                    >

                      <div className="category-card-icon">
                        <BookOpen size={28} />
                      </div>

                      <div className="category-card-content">

                        <h3>
                          {semester.name}
                        </h3>

                        <p>
                          Browse available subjects
                        </p>

                      </div>

                      <ChevronRight size={22} />

                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* SUBJECTS */}

          {selectedSemester && !selectedSubject && (

            <div className="library-browser">

              <button
                className="library-back"
                onClick={() => setSelectedSemester(null)}
              >
                <ArrowLeft size={18} />
                Back to Semesters
              </button>

              <div className="library-section-heading">

                <div>
                  <span className="eyebrow">
                    {selectedSemester.name}
                  </span>

                  <h2>
                    Choose Subject
                  </h2>
                </div>

              </div>

              <div className="library-card-grid">

                {selectedSemester.subjects?.map(
                  (subject) => (

                    <button
                      className="library-category-card"
                      key={subject.id}
                      onClick={() =>
                        setSelectedSubject(subject)
                      }
                    >

                      <div className="category-card-icon">
                        <BookOpen size={28} />
                      </div>

                      <div className="category-card-content">

                        <h3>
                          {subject.name}
                        </h3>

                        <p>
                          {subject.units?.length || 0}{" "}
                          units available
                        </p>

                      </div>

                      <ChevronRight size={22} />

                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* UNITS */}

          {selectedSubject && !selectedUnit && (

            <div className="library-browser">

              <button
                className="library-back"
                onClick={() => setSelectedSubject(null)}
              >
                <ArrowLeft size={18} />
                Back to Subjects
              </button>

              <div className="library-section-heading">

                <div>
                  <span className="eyebrow">
                    {selectedSubject.name}
                  </span>

                  <h2>
                    Units
                  </h2>
                </div>

              </div>

              <div className="unit-list">

                {selectedSubject.units?.map(
                  (unit, index) => (

                    <article
                      className="unit-card"
                      key={unit.id}
                    >

                      <div className="unit-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="unit-icon">
                        {unit.type === "pdf" ? (
                          <FileText size={24} />
                        ) : (
                          <BookOpen size={24} />
                        )}
                      </div>

                      <div className="unit-content">

                        <span>
                          {unit.unit}
                        </span>

                        <h3>
                          {unit.title}
                        </h3>

                        <p>
                          {unit.type === "pdf"
                            ? "PDF Reading"
                            : "Reading Article"}
                        </p>

                      </div>

                      <button
                        className="unit-open"
                        onClick={() => openUnit(unit)}
                      >
                        Read
                        <ChevronRight size={18} />
                      </button>

                    </article>
                  )
                )}

              </div>

            </div>
          )}

        </>
      )}

    </section>
  );
}

export default Library;
