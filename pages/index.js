import React, { Component, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { motion, useMotionValue, useViewportScroll } from "framer-motion";
import { attributes } from "../content/home.md";
import Meta from "../components/meta";
import ProjectTeaser from "../components/project-teaser";
import {getAllPosts, getAllProjects, getProjectsByTag} from "../lib/api";
import PostTeaser from "../components/post-teaser";

const HomeHeader = ({ title, getImageFilter, handleMouseOver, handleMouseOut }) => {
  const { scrollY } = useViewportScroll();
  const [textPointerEvents, setTextPointerEvents] = useState("auto");
  const textOpacity = useMotionValue(1);
  const imageOpacity = useMotionValue(1);
  const imageScale = useMotionValue(1);

  useEffect(() => {
    const updateTextPointerEvents = () => {
      const threshold = 250;
      if (scrollY.current <= threshold) return setTextPointerEvents("auto");
      return setTextPointerEvents("none");
    };

    const updateTextOpacity = () => {
      const threshold = 250;
      if (scrollY.current === 0) return textOpacity.set(1);
      if (scrollY.current > threshold) return textOpacity.set(0);
      return textOpacity.set(1 - (scrollY.current / threshold));
    };

    const updateImageOpacity = () => {
      const threshold = 450;
      if (scrollY.current === 0) return imageOpacity.set(1);
      if (scrollY.current > threshold) return imageOpacity.set(0);
      return imageOpacity.set(1 - (scrollY.current / threshold));
    };

    const updateImageScale = () => {
      const threshold = 450;
      if (scrollY.current <= 0) return imageScale.set(1);
      if (scrollY.current > threshold) return imageScale.set(1.5);
      return imageScale.set(1 + (scrollY.current / threshold));
    };

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
    <header className="home-header sticky top-0 mb-6">
      <div className="h-full overflow-hidden">
        <figure className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.div
            className="h-full transition-all ease-out duration-fast"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <img
              src="/static/img/cj-home.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top transition-all ease-out duration-300"
              style={{ filter: getImageFilter() }}
              aria-hidden="true"
            />
          </motion.div>
          <div className="absolute top-0 z-10 w-full h-1/3 bg-gradient-to-b from-gray-900"/>
          <div className="absolute bottom-0 z-10 w-full h-1/2 bg-gradient-to-t from-gray-900"/>
        </figure>
      </div>
      <motion.div
        className="h-full transition-opacity ease-out duration-fast"
        style={{ opacity: textOpacity, pointerEvents: textPointerEvents }}
      >
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
                      className="primary-link relative pr-4 sm:pr-0 hover:text-magenta transform hover:scale-105 transition-transform ease-out duration-300 group"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <span className="absolute -top-3 -bottom-3 -left-4 -right-2 bg-white opacity-0 sm:group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                      <span className="relative z-10">Writer</span>
                      <span>.</span>
                    </a>
                  </Link>
                  <Link href="/category/director">
                    <a
                      id="director"
                      className="primary-link relative sm:pl-4 pr-4 sm:pr-0 hover:text-cyan transform hover:scale-105 transition-transform ease-out duration-300 group"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <span className="absolute -top-3 -bottom-3 -left-1 -right-2 bg-white opacity-0 sm:group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                      <span className="relative z-10">Director</span>
                      <span>.</span>
                    </a>
                  </Link>
                  <Link href="/category/editor">
                    <a
                      id="editor"
                      className="primary-link relative sm:pl-4 hover:text-yellow transform hover:scale-105 transition-transform ease-out duration-300 group"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <span className="absolute -top-3 -bottom-3 -left-1 -right-2 bg-white opacity-0 sm:group-hover:opacity-100 shadow-xl transition-opacity ease-out duration-300"/>
                      <span className="relative z-10">Editor</span>
                      <span>.</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeLink: null };
  }

  static async getInitialProps() {
    const [projects, posts] = await Promise.all([
      getProjectsByTag('home'),
      getAllPosts()
    ]);
    return { projects, posts };
  }

  render() {
    const { title } = attributes;
    const recentProjects = this.props.projects.slice(0, 6);
    const recentPosts = this.props.posts.slice(0, 3);

    const getImageFilter = () => {
      switch (this.state.activeLink) {
        case "writer":
          return "saturate(1) hue-rotate(-45deg)";

        case "director":
          return "saturate(1) hue-rotate(165deg)";

        case "editor":
          return "saturate(1) hue-rotate(45deg)";

        default:
          return "saturate(0.5)";
      }
    };

    const handleMouseOver = event => {
      this.setState({ activeLink: event.currentTarget.id });
    };

    const handleMouseOut = event => {
      if (!event.relatedTarget || !event.relatedTarget.closest(".primary-link")) {
        this.setState({ activeLink: null });
      }
    };

    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async/>
        </Head>
        <Meta url={this.props.router.asPath}/>
        <HomeHeader
          title={title}
          getImageFilter={getImageFilter}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
        />
        {(recentProjects && recentProjects.length > 0) && (
          <div className="relative z-10 -mt-12">
            <section aria-labelledby="recent-projects-label" className="mb-12 sm:mb-20">
              <div className="container">
                <div className="2xl:max-w-6xl mx-auto">
                  <header className="mb-8">
                    <h2 id="recent-projects-label" className="text-2xl font-semibold">
                      Recent projects
                    </h2>
                  </header>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {recentProjects.map(project => (
                      <ProjectTeaser key={project.slug} project={project} animate={false}/>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        {(recentPosts && recentPosts.length > 0) && (
          <div className="relative z-10">
            <section aria-labelledby="recent-posts-label" className="mb-12 sm:mb-20">
              <div className="container">
                <div className="2xl:max-w-6xl mx-auto">
                  <header className="mb-8">
                    <h2 id="recent-posts-label" className="text-2xl font-semibold">
                      Recent posts
                    </h2>
                  </header>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {recentPosts.map(post => (
                      <PostTeaser key={post.slug} post={post}/>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Home);
