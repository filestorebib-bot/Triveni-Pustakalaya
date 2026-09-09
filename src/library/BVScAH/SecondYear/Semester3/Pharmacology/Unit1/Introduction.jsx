export const articleMeta = {
  title: "Introduction to Pharmacology",
  description: "Basic concepts and principles of veterinary pharmacology.",
  type: "Article",
};

const Introduction = () => {
  return (
    <article className="library-article">
      <h2>Introduction to Pharmacology</h2>

      <p>
        Pharmacology is the science concerned with the study of
        drugs, their actions, uses, mechanisms and effects on
        living organisms.
      </p>

      <h2>Major Areas</h2>

      <ul>
        <li>Pharmacokinetics</li>
        <li>Pharmacodynamics</li>
        <li>Pharmacotherapeutics</li>
        <li>Toxicology</li>
      </ul>
    </article>
  );
};

export default Introduction;
