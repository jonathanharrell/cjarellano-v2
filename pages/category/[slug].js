import React, { Component } from "react";
import ProjectTeaser from "../../components/project-teaser";
import { getAllCategories, getProjectsByCategory } from "../../api/index";
import CategoryTeaser from "../../components/category-teaser";

class Category extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const [category, categories] = await Promise.all([
      import(`../../content/categories/${slug}.md`).catch(error => null),
      getAllCategories()
    ]);

    let projects = [];

    if (category) {
      projects = await getProjectsByCategory(category.default.attributes.action);
    }

    return { category, projects, categories };
  }

  render() {
    if (!this.props.category) return <div>not found</div>;
    const { attributes: { title, action, image } } = this.props.category.default;

    const categories = this.props.categories
      .filter(category => category.title !== this.props.category.attributes.title);

    return (
      <main className="mb-20">
        <header className="relative mb-6 md:mb-12" style={{ height: "450px" }}>
          <figure className="absolute inset-0 w-full h-full">
            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
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
        <section>
          <div className="container">
            <div className="2xl:max-w-6xl mx-auto">
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {this.props.projects.map(project => (
                  <ProjectTeaser key={project.slug} project={project}/>
                ))}
              </div>
            </div>
          </div>
        </section>
        {(categories && categories.length > 0) && (
          <section className="my-24 lg:my-32">
            <div className="container">
              <div className="2xl:max-w-6xl mx-auto">
                <header className="mb-8">
                  <h2 className="text-2xl font-semibold">More from CJ</h2>
                </header>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map(category => (
                    <div key={category.slug}>
                      <CategoryTeaser category={category}/>
                    </div>
                  ))}
                  <div>
                    <a href="/about" className="block relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transform lg:hover:scale-110 transition-all ease-out duration-300 group" style={{ padding: "35% 0" }}>
                      <figure className="absolute inset-0 w-full h-full">
                        <img src="/static/img/cjarellano.png" alt="" className="absolute inset-0 w-full h-full object-cover"/>
                        <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900"/>
                      </figure>
                      <div className="flex items-center justify-center absolute inset-0 z-10 w-full h-full p-6 pb-8">
                        <h2 className="text-xl leading-tight font-semibold tracking-wide capitalize">
                          About
                        </h2>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    );
  }
}

export default Category;
