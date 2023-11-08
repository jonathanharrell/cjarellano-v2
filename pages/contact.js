import React from "react";
import { useRouter } from "next/router";
import Meta from "../components/meta";
import { attributes, html } from "../content/contact.md";
import {motion} from "framer-motion";

const Contact = () => {
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
      <div className="pt-24 lg:pt-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.figure layoutId="aboutImage" className="lg:max-w-lg lg:float-right lg:-mr-24 mb-12 lg:p-12 transform lg:rotate-6">
              <img src={image} alt="Photo of C.J." width="600" height="600" className="w-full rounded-2xl shadow-xl"/>
            </motion.figure>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-none">
                Contact C.J.
              </h1>
            </header>
            <section dangerouslySetInnerHTML={{ __html: html }} className="max-w-none prose lg:prose-xl text-gray-300"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
