import matter from "gray-matter";

export async function getAllProjects() {
  const context = require.context("../content/projects", false, /\.md$/);
  const projects = [];

  for (const key of context.keys()) {
    const project = key.slice(2);
    const { default: { attributes } } = await import(`../content/projects/${project}`);

    projects.push({
      slug: project.replace(".md", ""),
      title: attributes.title,
      date: attributes.date,
      description: attributes.description,
      type: attributes.type,
      image: attributes.image,
      categories: attributes.categories
    });
  }
  return projects;
}

export async function getProjectsByCategory(category) {
  const context = require.context("../content/projects", false, /\.md$/);
  const projects = [];

  for (const key of context.keys()) {
    const project = key.slice(2);
    const { default: { attributes } } = await import(`../content/projects/${project}`);

    if (attributes.categories.includes(category)) {
      projects.push({
        slug: project.replace(".md", ""),
        title: attributes.title,
        date: attributes.date,
        description: attributes.description,
        type: attributes.type,
        image: attributes.image,
        categories: attributes.categories
      });
    }
  }
  return projects;
}
