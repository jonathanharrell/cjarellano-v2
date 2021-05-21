const fs = require("fs");
const projectsFolder = "./content/projects";
const categoriesFolder = "./content/categories";

const getPathsForProjects = () => {
  return fs
    .readdirSync(projectsFolder)
    .map(projectName => {
      const trimmedName = projectName.substring(0, projectName.length - 3);
      return {
        [`/project/${trimmedName}`]: {
          page: "/project/[slug]",
          query: {
            slug: trimmedName
          }
        }
      };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
};

const getPathsForCategores = () => {
  return fs
    .readdirSync(categoriesFolder)
    .map(categoryName => {
      const trimmedName = categoryName.substring(0, categoryName.length - 3);
      return {
        [`/category/${trimmedName}`]: {
          page: "/category/[slug]",
          query: {
            slug: trimmedName
          }
        }
      };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
};

module.exports = {
  target: "serverless",
  webpack: configuration => {
    configuration.module.rules.push({
      test: /\.md$/,
      use: "frontmatter-markdown-loader"
    });
    return configuration;
  },
  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
      ...getPathsForProjects(),
      ...getPathsForCategores()
    };
  }
};
