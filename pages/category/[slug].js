import React, { Component } from "react";
import ProjectTeaser from "../../components/project-teaser";
import { getProjectsByCategory } from "../../api/index";

class Category extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const category = await import(`../../content/categories/${slug}.md`).catch(error => null);
    let projects = [];

    if (category) {
      projects = await getProjectsByCategory(category.default.attributes.action);
    }

    return { category, projects };
  }

  render() {
    if (!this.props.category) return <div>not found</div>;
    const { attributes: { title, action, featured_image } } = this.props.category.default;

    return (
      <main className="mb-20">
        <header className="relative mb-6 md:mb-12" style={{ height: "450px" }}>
          <figure className="absolute inset-0 w-full h-full">
            <img src={featured_image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute top-0 z-10 w-full h-1/2 bg-gradient-to-b from-gray-900"/>
            <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900"/>
          </figure>
          <div className="absolute inset-0 z-10 w-full h-full">
            <div className="container h-full">
              <div className="flex flex-col items-start justify-center 2xl:max-w-6xl h-full mx-auto">
                <div className="max-w-sm sm:max-w-lg lg:max-w-xl pt-12">
                <h1 className="mb-4 text-shadow text-xl md:text-2xl font-semibold">{title}</h1>
                <p className="text-shadow text-4xl md:text-5xl lg:text-6xl font-semibold">A clever headline can go here</p>
                <button className="mt-6 py-3 px-6 rounded-full bg-white font-bold text-gray-900">
                  Watch reel
                </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="2xl:max-w-6xl mx-auto">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {this.props.projects.map(project => (
                <ProjectTeaser key={project.slug} project={project}/>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Category;
