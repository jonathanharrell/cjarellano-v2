import React, { Component } from "react";
import { withRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { PlayIcon } from "@heroicons/react/solid";
import Meta from "../../components/meta";
import Video from "../../components/video";
import Award from "../../components/award";
import Quote from "../../components/quote";
import ProjectTeaser from "../../components/project-teaser";
import CategoryTeaser from "../../components/category-teaser";
import {getAllCategories, getCategory, getProject, getProjectsByCategory, getRelatedProjects} from "../../lib/api";
import fs from "fs";

class Project extends Component {
  render() {
    if (!this.props.project) return <div>not found</div>;

    const {
      attributes: { title, description, type, image, video, categories: projectCategories, quotes, awards, excerpt },
      html
    } = this.props.project;

    const { categories } = this.props;

    return (
      <>
        <Meta
          title={`${title} - C.J. Arellano`}
          description={description}
          image={image}
          type="article"
          url={this.props.router.asPath}
        />
        <div className="pt-24 lg:pt-28">
          <div className="container">
            <div className="2xl:max-w-6xl mx-auto">
              <article>
                <div className="grid gap-y-8 lg:gap-16 grid-cols-1 lg:grid-cols-12 pb-6">
                  <div className="lg:order-1 lg:col-span-6 xl:col-span-5 relative">
                    <motion.div layoutId={`project-image-${this.props.slug}`} className="h-full">
                      <figure className="relative lg:h-full overflow-hidden rounded-2xl shadow-xl" style={{ padding: "35% 0" }}>
                        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
                      </figure>
                      {video && (
                        <div className="absolute top-1/2 left-1/2 z-20 transform -translate-y-1/2 -translate-x-1/2">
                          <Video url={video} PlayButton={({ isOpen, setIsOpen }) => (
                            <a
                              href={video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-full group"
                              title="Play video"
                              onClick={(event) => {
                                event.preventDefault();
                                setIsOpen(!isOpen);
                              }}
                            >
                              <span className="sr-only">Play video</span>
                              <PlayIcon className="w-16 h-16 filter drop-shadow-lg text-white transform hover:scale-105 transition-transform ease-in-out duration-fast"/>
                            </a>
                          )}/>
                        </div>
                      )}
                    </motion.div>
                  </div>
                  <div className="lg:col-span-6 xl:col-span-7 relative z-10">
                    <header className="mb-6">
                      <p className="mb-2 tracking-wide text-gray-400 capitalize">
                        <span className="font-semibold">{type}</span>&nbsp;
                        ({projectCategories.join(", ")})
                      </p>
                      <h1 className="text-4xl md:text-5xl font-bold leading-none">{title}</h1>
                    </header>
                    <div dangerouslySetInnerHTML={{ __html: html }} className="project-content text-lg leading-relaxed text-gray-300"/>
                  </div>
                </div>
                {awards && (
                  <section className="mt-8 mb-24 lg:mb-28">
                    <h2 className="sr-only">Awards</h2>
                    <ul className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                      {awards.map((award, index) => (
                        <li key={index}>
                          <Award award={award}/>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {quotes && (
                  <section className="my-16 xl:my-20">
                    <h2 className="sr-only">Quotes</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                      {quotes.map((quote, index) => (
                        <Quote key={index} quote={quote}/>
                      ))}
                    </div>
                  </section>
                )}
                {excerpt && (
                  <section className="my-16 xl:my-20">
                    <div className="p-8 sm:p-12 xl:py-24 bg-gray-800 rounded-xl shadow-xl">
                      <div className="max-w-4xl mx-auto prose lg:prose-xl text-gray-300">
                        <ReactMarkdown>{excerpt}</ReactMarkdown>
                      </div>
                    </div>
                  </section>
                )}
              </article>
              {(this.props.relatedProjects.length > 0) && (
                <section className="mt-8 mb-16 sm:mt-16 xl:my-20">
                  <header className="mb-8">
                    <h2 className="text-2xl font-semibold">Related projects</h2>
                  </header>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {this.props.relatedProjects.slice(0, 3).map(project => (
                      <ProjectTeaser key={project.slug} project={project}/>
                    ))}
                  </div>
                </section>
              )}
              {(categories && categories.length > 0) && (
                <section className="mt-16 mb-8 xs:mt-16 xl:my-20">
                  <header className="mb-8">
                    <h2 className="text-2xl font-semibold">More from C.J.</h2>
                  </header>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map(category => (
                      <div key={category.slug}>
                        <CategoryTeaser category={category}/>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Project);

export async function getStaticProps(context) {
  const { slug } = context.params;
  const [project, categories] = await Promise.all([
    getProject(slug),
    getAllCategories()
  ]);

  let relatedProjects = [];

  if (project) {
    relatedProjects = await getRelatedProjects(project);
  }

  return { props: { slug, project, categories, relatedProjects } };
}

export async function getStaticPaths() {
  const paths = fs
    .readdirSync('./content/projects')
    .map(projectName => {
      const trimmedName = projectName.substring(0, projectName.length - 3);
      return { params: { slug: trimmedName } };
    });

  return {
    paths,
    fallback: false
  }
}