export const getAllCategories = async() => {
  const context = require.context("../content/categories", false, /\.md$/);
  const categories = [];

  for (const key of context.keys()) {
    const category = key.slice(2);
    const { default: { attributes } } = await import(`../content/categories/${category}`);

    if (attributes.public) {
      categories.push({
        slug: category.replace(".md", ""),
        title: attributes.title,
        action: attributes.action,
        image: attributes.image
      });
    }
  }

  return categories;
};

export const getAllProjects = async() => {
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

  return projects.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
};

export const getProjectsByCategory = async category => {
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

  return projects.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
};

export const getRelatedProjects = async project => {
  const context = require.context("../content/projects", false, /\.md$/);
  const relatedProjects = [];
  const categories = project.default.attributes.categories;
  const projectTitle = project.default.attributes.title;

  for (const key of context.keys()) {
    const project = key.slice(2);
    const { default: { attributes } } = await import(`../content/projects/${project}`);

    let hasCategory = false;
    for (const category of attributes.categories) {
      if (categories.includes(category)) hasCategory = true;
    }

    if (hasCategory && attributes.title !== projectTitle) {
      relatedProjects.push({
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

  return relatedProjects.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
};
