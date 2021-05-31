import React, { Component, useEffect, useState } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { useViewportScroll, motion, useMotionValue } from "framer-motion";
import { PlayIcon } from "@heroicons/react/solid";
import Meta from "../../components/meta";
import ProjectTeaser from "../../components/project-teaser";
import CategoryTeaser from "../../components/category-teaser";
import Video from "../../components/video";
import { getAllCategories, getProjectsByCategory } from "../../lib/api";
import { getCategoryColor } from "../../helpers";

function CategoryHeader({ category }) {
  const { attributes: { title, action, headline, image, reels } } = category;
  const { scrollY } = useViewportScroll();
  const [textPointerEvents, setTextPointerEvents] = useState("auto");
  const textOpacity = useMotionValue(1);
  const imageOpacity = useMotionValue(1);
  const imageScale = useMotionValue(1);

  useEffect(() => {
    function updateTextPointerEvents() {
      const threshold = 250;
      if (scrollY.current <= threshold) return setTextPointerEvents("auto");
      return setTextPointerEvents("none");
    }

    function updateTextOpacity() {
      const threshold = 250;
      if (scrollY.current === 0) return textOpacity.set(1);
      if (scrollY.current > threshold) return textOpacity.set(0);
      return textOpacity.set(1 - (scrollY.current / threshold));
    }

    function updateImageOpacity() {
      const threshold = 450;
      if (scrollY.current === 0) return imageOpacity.set(1);
      if (scrollY.current > threshold) return imageOpacity.set(0);
      return imageOpacity.set(1 - (scrollY.current / threshold));
    }

    function updateImageScale() {
      const threshold = 450;
      if (scrollY.current === 0) return imageScale.set(1);
      if (scrollY.current > threshold) return imageScale.set(1.5);
      return imageScale.set(1 + (scrollY.current / threshold));
    }

    updateTextPointerEvents();
    updateTextOpacity();
    updateImageOpacity();
    updateImageScale();

    const unsubscribeTextPointerEvents = scrollY.onChange(updateTextPointerEvents);
    const unsubscribeTextOpacity = scrollY.onChange(updateTextOpacity);
    const unsubscribeImageOpacity = scrollY.onChange(updateImageOpacity);
    const unsubscribeImageScale = scrollY.onChange(updateImageScale);

    return () => {
      unsubscribeTextPointerEvents();
      unsubscribeTextOpacity();
      unsubscribeImageOpacity();
      unsubscribeImageScale();
    };
  }, []);

  return (
    <header className="sticky top-0 mb-6 md:mb-12" style={{ height: "450px" }}>
      <figure className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          className="h-full transition-all ease-out duration-fast"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        </motion.div>
        <div className="absolute top-0 z-10 w-full h-1/2 bg-gradient-to-b from-gray-900"/>
        <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900"/>
      </figure>
      <motion.div
        className="h-full transition-opacity ease-out duration-fast"
        style={{ opacity: textOpacity, pointerEvents: textPointerEvents }}
      >
        <div className="absolute inset-0 z-10 w-full h-full">
          <div className="container h-full">
            <div className="flex flex-col items-start justify-center 2xl:max-w-6xl h-full mx-auto">
              <div className="max-w-sm sm:max-w-lg lg:max-w-lg pt-20">
                <h1 className="mb-4 text-shadow text-xl md:text-2xl font-semibold">
                  {title}
                </h1>
                <p className="text-shadow text-4xl md:text-5xl lg:text-6xl font-bold">
                  {headline}
                </p>
                {(reels && reels.length) && (
                  <div className="mt-8">
                    {reels.map(reel => (
                      <Video
                        key={reel.title}
                        url={reel.video}
                        PlayButton={({ isOpen, setIsOpen }) => (
                          <a
                            href={reel.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mr-4 mb-3 py-3 pl-4 pr-6 rounded-full border-2 border-white hover:bg-white font-semibold tracking-wide text-white hover:text-gray-900 transform hover:scale-105 transition-all ease-out duration-fast"
                            title="Play reel"
                            onClick={(event) => {
                              event.preventDefault();
                              setIsOpen(!isOpen);
                            }}
                          >
                            <PlayIcon className={`w-5 h-5 mr-1 text-${getCategoryColor(action)}`}/>
                            {reel.title}
                          </a>
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

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

    const categories = this.props.categories
      .filter(category => category.title !== this.props.category.attributes.title);

    return (
      <>
        <Meta
          title={`C.J. Arellano - ${this.props.category.attributes.title}`}
          description={this.props.category.attributes.headline}
          image={this.props.category.attributes.image}
          url={this.props.router.asPath}
        />
        <CategoryHeader category={this.props.category.default}/>
        <div className="relative">
          <section>
            <div className="container">
              <div className="2xl:max-w-6xl mx-auto">
                <h2 className="sr-only">Projects</h2>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {this.props.projects.map(project => (
                    <ProjectTeaser key={project.slug} project={project} animate={true}/>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {(categories && categories.length > 0) && (
            <section className="mt-16 mb-8 xs:mt-16 xl:my-20">
              <div className="container">
                <div className="2xl:max-w-6xl mx-auto">
                  <header className="mb-8">
                    <h2 className="text-2xl font-semibold">More from C.J.</h2>
                  </header>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map(category => (
                      <div key={category.slug}>
                        <CategoryTeaser category={category}/>
                      </div>
                    ))}
                    <div>
                      <Link href="/about">
                        <a className="block relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transform lg:hover:scale-110 transition-all ease-out duration-300 group" style={{ padding: "35% 0" }}>
                          <motion.figure layoutId="aboutImage" className="absolute inset-0 w-full h-full">
                            <img src="/static/img/cjarellano.jpg" alt="" className="absolute inset-0 w-full h-full object-cover"/>
                            <div className="absolute bottom-0 z-10 w-full h-3/4 bg-gradient-to-t from-gray-900"/>
                          </motion.figure>
                          <div className="flex items-center justify-center absolute inset-0 z-10 w-full h-full p-6 pb-8">
                            <h3 className="text-xl leading-tight font-semibold tracking-wide capitalize">
                              About
                            </h3>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Category);
