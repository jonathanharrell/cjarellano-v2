import Head from "next/head";
import { Component } from "react";
import { attributes } from "../content/home.md";
import { getAllCategories, getAllProjects, getProjectsByCategory } from "../api";
import CategoryTeaser from "../components/category-teaser";
import ProjectTeaser from "../components/project-teaser";
import { motion } from "framer-motion";
import Video from "../components/video";
import { PlayIcon } from "@heroicons/react/solid";
import { getCategoryColor } from "../helpers";

export default class Home extends Component {
  static async getInitialProps() {
    const [categories, projects] = await Promise.all([
      getAllCategories(),
      getAllProjects()
    ]);
    return { categories, projects };
  }

  render() {
    const { title } = attributes;
    const { categories, projects } = this.props;

    const recentProjects = projects.slice(0, 6);

    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <main className="pb-20">
          <header className="sticky top-0 mb-6" style={{ height: "550px" }}>
            <div className="h-full overflow-hidden">
              <figure className="absolute inset-0 w-full h-full">
                <img src="/static/img/cj-home.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top"/>
                <div className="absolute top-0 z-10 w-full h-1/3 bg-gradient-to-b from-gray-900"/>
                <div className="absolute bottom-0 z-10 w-full h-1/2 bg-gradient-to-t from-gray-900"/>
              </figure>
            </div>
            <div className="absolute inset-0 z-10 w-full h-full">
              <div className="container h-full">
                <div className="flex flex-col items-start justify-center 2xl:max-w-6xl h-full mx-auto">
                  <div className="pt-12">
                    <h1 className="mb-4 text-shadow text-2xl md:text-3xl font-semibold">
                      {title}
                    </h1>
                    <p className="text-shadow text-4xl md:text-5xl lg:text-6xl font-bold">
                      Writer. Director. Editor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/*{(categories && categories.length > 0) && (*/}
          {/*  <section className="my-20">*/}
          {/*    <div className="container">*/}
          {/*      <div className="2xl:max-w-6xl mx-auto">*/}
          {/*        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">*/}
          {/*          {categories.map(category => (*/}
          {/*            <div key={category.slug}>*/}
          {/*              <CategoryTeaser category={category}/>*/}
          {/*            </div>*/}
          {/*          ))}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </section>*/}
          {/*)}*/}
          {(recentProjects && recentProjects.length > 0) && (
            <section className="relative mb-20">
              <div className="container">
                <div className="2xl:max-w-6xl mx-auto">
                  <header className="mb-8">
                    <h2 className="text-2xl font-semibold">Recent projects</h2>
                  </header>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {recentProjects.map(project => (
                      <ProjectTeaser key={project.slug} project={project}/>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </>
    );
  }
}
