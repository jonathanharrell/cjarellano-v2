import React, { Component } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { ArrowLeft, ArrowRight } from "react-feather";
import { getPreviousAndNextPosts } from "../../lib/api";
import Meta from "../../components/meta";
import Tag from "../../components/tag";

class Project extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const post = await import(`../../content/posts/${slug}.md`).catch(error => null);
    const { previous, next } = await getPreviousAndNextPosts(slug).catch(error => null);

    return { slug, post, previous, next };
  }

  render() {
    if (!this.props.post) return <div>not found</div>;

    const { previous, next } = this.props;

    const {
      attributes: { title, description, date, image, tags },
      html
    } = this.props.post.default;

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
                  <section className="mt-4">
                    <p className="sr-only">Post tags</p>
                    {tags && (
                      <span className="flex flex-wrap md:inline mb-2 md:mb-0 md:mr-4">
                        {tags?.map(tag => (
                            <Tag key={tag} tag={tag} />
                        ))}
                      </span>
                    )}
                    <span className="text-md text-gray-400">Published {formattedDate}</span>
                  </section>
                </header>
                <section dangerouslySetInnerHTML={{ __html: html }} className="max-w-none prose lg:prose-xl prose-p:leading-snug text-gray-400"/>
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

export default withRouter(Project);
