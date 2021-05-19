import React, { Component } from "react";
import { motion } from "framer-motion";
import { attributes, html } from "../content/about.md";
import Header from "../components/header";

export default class About extends Component {
  render() {
    const { title, image } = attributes;

    return (
      <>
        <Header/>
        <main className="pt-20 lg:pt-32 pb-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <article>
                <motion.figure layoutId="aboutImage" className="lg:max-w-lg lg:float-right lg:-mr-24 mb-12 lg:p-12 transform lg:rotate-6">
                  <img src={image} alt="" className="w-full rounded-2xl shadow-xl"/>
                </motion.figure>
                <header className="mb-8">
                  <h1 className="text-5xl font-bold leading-none">{title}</h1>
                </header>
                <div dangerouslySetInnerHTML={{ __html: html }} className="max-w-none prose lg:prose-xl text-gray-400"/>
              </article>
            </div>
          </div>
        </main>
      </>
    );
  }
}
