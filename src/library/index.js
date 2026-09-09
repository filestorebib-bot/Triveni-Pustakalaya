const articleModules = import.meta.glob("./**/*.jsx", {
  eager: true,
});

const prettyName = (value) => {
  const specialNames = {
    BVScAH: "BVSc & AH",
  };

  if (specialNames[value]) {
    return specialNames[value];
  }

  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/(\D)(\d+)/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .trim();
};

const getNumber = (value) => {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 999;
};

const createItem = (array, id, name) => {
  let item = array.find((x) => x.id === id);

  if (!item) {
    item = {
      id,
      name,
      years: [],
      semesters: [],
      subjects: [],
      units: [],
    };

    array.push(item);
  }

  return item;
};

const faculties = [];

Object.entries(articleModules).forEach(([path, module]) => {
  const parts = path.split("/");

  /*
    Example:
    ./BVScAH/FirstYear/Semester1/Anatomy/Unit1/Introduction.jsx

    parts:
    0 = .
    1 = BVScAH
    2 = FirstYear
    3 = Semester1
    4 = Anatomy
    5 = Unit1
    6 = Introduction.jsx
  */

  if (parts.length < 7) return;

  const facultyId = parts[1];
  const yearId = parts[2];
  const semesterId = parts[3];
  const subjectId = parts[4];
  const unitId = parts[5];
  const fileName = parts[6];

  if (!module.default) return;

  let faculty = faculties.find((x) => x.id === facultyId);

  if (!faculty) {
    faculty = {
      id: facultyId,
      name: prettyName(facultyId),
      years: [],
    };

    faculties.push(faculty);
  }

  let year = faculty.years.find((x) => x.id === yearId);

  if (!year) {
    year = {
      id: yearId,
      name: prettyName(yearId),
      semesters: [],
    };

    faculty.years.push(year);
  }

  let semester = year.semesters.find((x) => x.id === semesterId);

  if (!semester) {
    semester = {
      id: semesterId,
      name: prettyName(semesterId),
      subjects: [],
    };

    year.semesters.push(semester);
  }

  let subject = semester.subjects.find((x) => x.id === subjectId);

  if (!subject) {
    subject = {
      id: subjectId,
      name: prettyName(subjectId),
      units: [],
    };

    semester.subjects.push(subject);
  }

  const fileWithoutExtension = fileName.replace(/\.[^/.]+$/, "");

  const metadata = module.articleMeta || {};

  subject.units.push({
    id: `${unitId}-${fileWithoutExtension}`,
    unitId,
    name: prettyName(unitId),
    title: metadata.title || prettyName(fileWithoutExtension),
    description: metadata.description || "",
    type: metadata.type || "Article",
    component: module.default,
    path,
  });
});

// Sort everything properly
faculties.forEach((faculty) => {
  faculty.years.sort((a, b) => getNumber(a.id) - getNumber(b.id));

  faculty.years.forEach((year) => {
    year.semesters.sort(
      (a, b) => getNumber(a.id) - getNumber(b.id)
    );

    year.semesters.forEach((semester) => {
      semester.subjects.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      semester.subjects.forEach((subject) => {
        subject.units.sort(
          (a, b) => getNumber(a.unitId) - getNumber(b.unitId)
        );
      });
    });
  });
});

export const libraryData = faculties;
