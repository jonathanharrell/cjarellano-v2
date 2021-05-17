import Head from "next/head";
import { Component, useState } from "react";
import { attributes } from "../content/home.md";
import { getAllCategories, getAllProjects, getProjectsByCategory } from "../api";
import CategoryTeaser from "../components/category-teaser";
import ProjectTeaser from "../components/project-teaser";
import { motion } from "framer-motion";
import Video from "../components/video";
import { PlayIcon } from "@heroicons/react/solid";
import { getCategoryColor } from "../helpers";
import Link from "next/link";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeLink: null };
  }

  static async getInitialProps() {
    const projects = await getAllProjects();
    return { projects };
  }

  render() {
    const { title } = attributes;
    const recentProjects = this.props.projects.slice(0, 6);

    const getImageFilter = () => {
      switch (this.state.activeLink) {
        case "writer":
          return "hue-rotate(-45deg)";

        case "director":
          return "hue-rotate(165deg)";

        case "editor":
          return "hue-rotate(45deg)";

        default:
          return "";
      }
    };

    const handleMouseOver = event => {
      this.setState({ activeLink: event.currentTarget.id });
    };

    const handleMouseOut = event => {
      if (!event.relatedTarget.closest(".primary-link")) {
        this.setState({ activeLink: null });
      }
    };

    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <main className="pb-20">
          <header className="sticky top-0 mb-6" style={{ height: "550px" }}>
            <div className="h-full overflow-hidden">
              <figure className="absolute inset-0 w-full h-full">
                <img
                  src="/static/img/cj-home.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all ease-out duration-300"
                  style={{ filter: getImageFilter() }}
                  aria-hidden="true"
                />
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
                    <div className="flex flex-wrap text-4xl md:text-5xl lg:text-6xl font-bold">
                      <Link href="/category/writer">
                        <a
                          id="writer"
                          className="primary-link relative hover:text-magenta transform hover:scale-105 transition-transform ease-out duration-300 group"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          <span className="absolute -top-3 -bottom-3 -left-4 -right-2 bg-white opacity-0 group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                          <span className="relative z-10">Writer</span>
                          <span>.</span>
                        </a>
                      </Link>
                      <Link href="/category/director">
                        <a
                          id="director"
                          className="primary-link relative pl-4 hover:text-cyan transform hover:scale-105 transition-transform ease-out duration-300 group"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          <span className="absolute -top-3 -bottom-3 -left-1 -right-2 bg-white opacity-0 group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                          <span className="relative z-10">Director</span>
                          <span>.</span>
                        </a>
                      </Link>
                      <Link href="/category/editor">
                        <a
                          id="editor"
                          className="primary-link relative pl-4 hover:text-yellow transform hover:scale-105 transition-transform ease-out duration-300 group"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          <span className="absolute -top-3 -bottom-3 -left-1 -right-2 bg-white opacity-0 group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                          <span className="relative z-10">Editor</span>
                          <span>.</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {(recentProjects && recentProjects.length > 0) && (
            <div className="relative z-10 -mt-12">
              <section className="mb-20">
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
            </div>
          )}
        </main>
      </>
    );
  }
}
