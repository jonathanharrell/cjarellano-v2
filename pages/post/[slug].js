import fs from "fs";
import { join } from "path";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import matter from "gray-matter";
import Link from "next/link";
import { withRouter } from "next/router";
import { ArrowLeft, ArrowRight } from "react-feather";
import {getAllPosts, getPreviousAndNextPosts} from "../../lib/api";
import Meta from "../../components/meta";
import Tag from "../../components/tag";

// TODO: fix figure inside p nesting

const components = {
  p: ({ children }) => {
    const hasSingleChild = children.length === 1;

    if (hasSingleChild) {
      if (children[0].props?.node?.tagName === 'img') {
        return children;
      }
    }

    return <p>{children}</p>;
  },
  img: ({ node }) => {
    const { properties } = node;

    if (properties.title) {
      return (
        <figure>
          <img src={properties.src} alt={properties.alt} />
          <figcaption>
            <ReactMarkdown
              components={components}
              children={properties.title}
            />
          </figcaption>
        </figure>
      )
    }

    return <img src={properties.src} alt={properties.alt} />
  },
  a: ({ node, children }) => {
    const { properties } = node;
    const isExternal = !properties.href.includes('cjarellano.com');

    return (
      <a href={properties.href} target={isExternal ? '_blank' : '_self'}>
        {children}
      </a>
    )
  }
}

class Post extends Component {
  render() {
    if (!this.props.post) return <div>not found</div>;

    const { previous, next } = this.props;

    const {
      data: { title, description, date, image, tags },
      content
    } = this.props.post;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    });

    return (
      <>
        <Meta
          title={title}
          description={description}
          image={image}
          type="article"
          url={this.props.router.asPath}
        />
        <div className="py-28 lg:py-32">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <article>
                <header className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold leading-none">{title}</h1>
                  <section className="flex flex-wrap items-center mt-4">
                    <p className="sr-only">Post tags</p>
                    {tags && (
                      <span className="flex flex-wrap mb-2 md:mr-4">
                        {tags?.map(tag => (
                            <Tag key={tag} tag={tag} />
                        ))}
                      </span>
                    )}
                    <span className="text-md mb-3 text-gray-400">Published {formattedDate}</span>
                  </section>
                </header>
                <section className="max-w-none prose lg:prose-xl prose-headings:text-gray-200 lg:prose-h2:text-xxl text-gray-400">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={components}
                    children={content}
                  />
                </section>
              </article>
              <nav
                aria-label="More Articles"
                className="flex flex-col sm:flex-row items-center sm:justify-between mt-12 md:mt-24 text-gray-400"
              >
                {previous && (
                  <Link href={`/post/${previous.slug}`}>
                    <a rel="prev" className="py-2 hover:underline">
                      <ArrowLeft size={20} className="inline mr-1"/>
                      <span className="sr-only">Previous article: </span>
                      {previous.title}
                    </a>
                  </Link>
                )}
                {next && (
                  <Link href={`/post/${next.slug}`}>
                    <a rel="next" className="sm:ml-auto py-2 hover:underline">
                      <span className="sr-only">Next article: </span>
                      {next.title}
                      <ArrowRight size={20} className="inline ml-1"/>
                    </a>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export async function getStaticProps({ params }) {
  const postsDirectory = join(process.cwd(), 'content/posts');
  const fullPath = join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const { previous = null, next = null } = await getPreviousAndNextPosts(params.slug).catch(error => null);

  return {
    props: {
      post: {
        data: JSON.parse(JSON.stringify(data)),
        content
      },
      previous: JSON.parse(JSON.stringify(previous)),
      next: JSON.parse(JSON.stringify(next))
    }
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default withRouter(Post);
