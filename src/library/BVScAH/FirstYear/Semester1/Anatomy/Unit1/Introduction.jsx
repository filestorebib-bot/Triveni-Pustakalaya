export const articleMeta = {
  title: "Introduction to Veterinary Anatomy",
  description:
    "Basic introduction, scope and importance of veterinary anatomy.",
  type: "Article",
};

const Introduction = () => {
  return (
    <article className="library-article">
      <h2>Introduction</h2>

      <p>
        Veterinary anatomy is the study of the structure of the
        animal body and the relationships between its different
        parts.
      </p>

      <h2>Importance of Veterinary Anatomy</h2>

      <p>
        Anatomy provides the foundation for understanding clinical
        examination, diagnosis, surgery and other areas of
        veterinary medicine.
      </p>

      <h2>Major Areas of Anatomy</h2>

      <ul>
        <li>Gross anatomy</li>
        <li>Microscopic anatomy</li>
        <li>Developmental anatomy</li>
        <li>Comparative anatomy</li>
        <li>Clinical anatomy</li>
      </ul>
    </article>
  );
};

export default Introduction;
