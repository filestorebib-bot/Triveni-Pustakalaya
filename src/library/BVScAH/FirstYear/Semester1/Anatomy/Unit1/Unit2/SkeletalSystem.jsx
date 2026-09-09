export const articleMeta = {
  title: "Bibash Lamichhane",
  description: "Structure and basic organization of the skeletal system.",
  type: "Article",
};

const SkeletalSystem = () => {
  return (
    <article className="library-article">
      <h2>Skeletal System</h2>

      <p>
        The skeletal system provides support, protection and
        structural framework for the animal body.
      </p>

      <h2>Functions</h2>

      <ul>
        <li>Support</li>
        <li>Protection of internal organs</li>
        <li>Movement</li>
        <li>Mineral storage</li>
        <li>Blood cell formation</li>
      </ul>
    </article>
  );
};

export default SkeletalSystem;
