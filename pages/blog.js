import React from "react";
import {withRouter} from "next/router";
import Link from "next/link";
import Meta from "../components/meta";
import PostTeaser from "../components/post-teaser";
import {getAllPosts, getAllPostTags} from "../lib/api";
import {attributes} from "../content/blog.md";
import Tag from "../components/tag";

class Blog extends React.Component {
  static async getInitialProps() {
    const posts = await getAllPosts();
    const tags = await getAllPostTags();
    return {posts, tags};
  }

  render() {
    const {title} = attributes;
    const {posts, tags, router} = this.props;
    const tag = router.query.tag;

    let filteredPosts = posts;
    if (tag) filteredPosts = posts.filter(post => post.tags?.includes(tag));

    return (
      <>
        <Meta
          title={title}
          url={router.asPath}
        />
        <div className="py-28 lg:py-32">
          <div className="container">
            <header className="mb-10 md:mb-12 lg:mb-14">
              <Link href="/blog">
                <a className="inline-block">
                  <h1 className="text-4xl md:text-5xl font-bold leading-none">
                    {title}
                  </h1>
                </a>
              </Link>
              <section className="mt-6">
                <h2 className="sr-only">Post tags</h2>
                {tags.length > 0 && (
                  <div className="flex flex-wrap">
                    {tags.map(t => (
                      <Tag key={t} tag={t} selected={t === tag}/>
                    ))}
                  </div>
                )}
              </section>
            </header>
            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map(post => (
                    <PostTeaser key={post.slug} post={post}/>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-2xl">No posts were found with this tag</p>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Blog);
