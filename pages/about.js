import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { attributes, html } from "../content/about.md";
import Meta from "../components/meta";
import Quote from "../components/quote";
import SocialMediaPost from "../components/social-media-post";

export default function About() {
  const { title, image, quotes, posts } = attributes;
  const router = useRouter();

  return (
    <>
      <Meta
        title={title}
        image={image}
        type="article"
        url={router.asPath}
      />
      <div className="pt-20 lg:pt-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.figure layoutId="aboutImage" className="lg:max-w-lg lg:float-right lg:-mr-24 mb-12 lg:p-12 transform lg:rotate-6">
              <img src={image} alt="Photo of C.J." className="w-full rounded-2xl shadow-xl"/>
              <figcaption className="mt-4 text-sm text-gray-400">
                Photo by <a href="http://www.bravelux.com" target="_blank" rel="noopener noreferrer">Joe Mazza</a>
              </figcaption>
            </motion.figure>
            <header className="mb-8">
              <h1 className="text-5xl font-bold leading-none">{title}</h1>
            </header>
            <section dangerouslySetInnerHTML={{ __html: html }} className="max-w-none prose lg:prose-xl text-gray-400"/>
            {quotes && (
              <section className="my-16 xl:my-20">
                <h2 className="sr-only">Quotes</h2>
                <div className="grid gap-8">
                  {quotes.map((quote, index) => (
                    <Quote key={index} quote={quote} larger={true}/>
                  ))}
                </div>
              </section>
            )}
            {posts && (
              <section className="my-16 xl:my-20">
                <h2 className="sr-only">Social Media Posts</h2>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                  {posts.map((post, index) => (
                    <SocialMediaPost key={index} post={post}/>
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
