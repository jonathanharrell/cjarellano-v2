import React, { Component } from "react";
import { withRouter } from "next/router";
import Meta from "../../components/meta";
import { html } from "../../content/about.md";

class Project extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const post = await import(`../../content/posts/${slug}.md`).catch(error => null)

    return { slug, post };
  }

  render() {
    if (!this.props.post) return <div>not found</div>;

    const {
      attributes: { title, description, date },
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
          title={`${title} - C.J. Arellano`}
          description={description}
          type="article"
          url={this.props.router.asPath}
        />
        <div className="py-28 lg:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <article>
                <header className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold leading-none">{title}</h1>
                  <p className="text-md mt-4 text-gray-400">
                    Published {formattedDate}
                  </p>
                </header>
                <section dangerouslySetInnerHTML={{ __html: html }} className="max-w-none prose lg:prose-xl text-gray-400"/>
              </article>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Project);
