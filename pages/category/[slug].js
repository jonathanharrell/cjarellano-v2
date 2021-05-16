import React, { Component } from "react";
import { getProjectsByCategory } from "../../api/index";

class Category extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const category = await import(`../../content/categories/${slug}.md`).catch(error => null);
    let projects = [];

    if (category) {
      projects = await getProjectsByCategory(category.default.attributes.action)
    }

    return { category, projects };
  }

  render() {
    if (!this.props.category) return <div>not found</div>;
    const { attributes: { title } } = this.props.category.default;

    return (
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl text-center">{title}</h1>
          <div className="grid gap-12 grid-cols-3">
            {this.props.projects.map(project => (
              <a key={project.slug} href={`/project/${project.slug}`} className="block">
                <img src={project.image} alt="" className="w-full"/>
                {project.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
