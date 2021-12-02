import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import Meta from "../components/meta";
import { attributes } from "../content/blog.md";
import { getAllPosts } from "../lib/api";

class Blog extends React.Component {
  static async getInitialProps() {
    const posts = await getAllPosts();
    return { posts };
  }

  render() {
    const { title } = attributes;
    const { posts } = this.props;

    return (
      <>
        <Meta
          title={title}
          url={this.props.router.asPath}
        />
        <div className="py-28 lg:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <header className="mb-8 md:mb-10">
                <h1 className="text-4xl md:text-5xl font-bold leading-none">{title}</h1>
              </header>
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <Link href={`/post/${post.slug}`} key={index}>
                    <a className="block">
                      <h2 className="mb-2 text-lg md:text-xl font-semibold hover:underline">
                        {post.title}
                      </h2>
                      <p className="text-md text-gray-400">
                        {post.description} <strong className="hover:underline">Read more...</strong>
                      </p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Blog);
