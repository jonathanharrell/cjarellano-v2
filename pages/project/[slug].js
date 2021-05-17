import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import Video from "../../components/video";
import Award from "../../components/award";
import ProjectTeaser from "../../components/project-teaser";
import { getRelatedProjects } from "../../api";

class Project extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const project = await import(`../../content/projects/${slug}.md`).catch(error => null);

    let relatedProjects = [];

    if (project) {
      relatedProjects = await getRelatedProjects(project);
    }

    return { project, relatedProjects };
  }

  render() {
    if (!this.props.project) return <div>not found</div>;

    const {
      attributes: { title, description, categories, type, image, video, quotes, awards, excerpt },
      html
    } = this.props.project.default;

    return (
      <main className="mt-20 lg:mt-32 mb-20">
        <div className="container">
          <div className="2xl:max-w-6xl mx-auto">
            <article>
              <div className="grid gap-y-8 lg:gap-16 grid-cols-1 lg:grid-cols-12 pb-6">
                <div className="lg:order-1 lg:col-span-6 xl:col-span-5 relative">
                  <figure className="relative lg:h-full overflow-hidden rounded-2xl shadow-xl" style={{ padding: "35% 0" }}>
                    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
                  </figure>
                  {video && (
                    <div className="absolute top-1/2 left-1/2 z-20 transform -translate-y-1/2 -translate-x-1/2">
                      <Video url={video}/>
                    </div>
                  )}
                </div>
                <div className="lg:col-span-6 xl:col-span-7 relative z-10">
                  <header className="mb-8">
                    {categories.length && (
                      <ul className="flex mb-4">
                        {categories.map(category => (
                          <li key={category} className="mr-2 py-0.5 px-3 rounded-full bg-gray-700 text-sm font-medium capitalize text-gray-300">{category}</li>
                        ))}
                      </ul>
                    )}
                    <h1 className="text-5xl font-bold leading-none">{title}</h1>
                    <p className="mt-3 font-semibold text-gray-400">{type}</p>
                  </header>
                  <div dangerouslySetInnerHTML={{ __html: html }} className="project-content text-lg leading-relaxed text-gray-400"/>
                </div>
              </div>
              {awards && (
                <section className="mt-8 mb-24 lg:mb-28">
                  <h2 className="sr-only">Awards</h2>
                  <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{ scrollSnapType: "x mandatory" }}>
                    {awards.map((award, index) => (
                      <li key={index} style={{ scrollSnapAlign: "start" }}>
                        <Award award={award}/>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {quotes && (
                <section className="my-20">
                  <h2 className="sr-only">Quotes</h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {quotes.map((quote, index) => (
                      <blockquote key={index} className="p-8 xl:p-10 border-4 border-gray-800 rounded-xl">
                        <p className="mb-2 text-xl leading-relaxed">{quote.text}</p>
                        <cite className="font-medium text-gray-500">
                          {quote.source}
                        </cite>
                      </blockquote>
                    ))}
                  </div>
                </section>
              )}
              {excerpt && (
                <section className="my-20">
                  <div className="p-8 sm:p-12 xl:py-24 bg-gray-800 rounded-xl shadow-xl">
                    <div className="max-w-4xl mx-auto prose lg:prose-xl text-gray-400">
                      <ReactMarkdown>{excerpt}</ReactMarkdown>
                    </div>
                  </div>
                </section>
              )}
            </article>
            {(this.props.relatedProjects.length > 0) && (
              <section className="my-24 lg:my-32">
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
          </div>
        </div>
      </main>
    );
  }
}

export default Project;
