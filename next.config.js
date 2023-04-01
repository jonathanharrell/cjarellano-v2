module.exports = {
  target: "serverless",
  webpack: configuration => {
    configuration.module.rules.push({
      test: /\.md$/,
      use: "frontmatter-markdown-loader"
    });
    return configuration;
  },
};
