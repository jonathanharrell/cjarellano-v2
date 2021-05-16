import React, { Component } from "react";
import { getAllProjects } from "../../api/index";

class Category extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;

    const [category, projects] = await Promise.all([
      import(`../../content/categories/${slug}.md`).catch(error => null),
      getAllProjects()
    ]);

    return { category, projects };
  }

  render() {
    return (
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div>{JSON.stringify(this.props.category)}</div>
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
