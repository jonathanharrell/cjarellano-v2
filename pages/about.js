import React, { Component } from "react";
import { motion } from "framer-motion";
import { attributes, html } from "../content/about.md";
import Header from "../components/header";
import Footer from "../components/footer";

export default class About extends Component {
  render() {
    const { title, image } = attributes;

    return (
      <>
        <Header/>
        <main className="pt-20 lg:pt-32 pb-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.figure layoutId="aboutImage" className="lg:max-w-lg lg:float-right lg:-mr-24 mb-12 lg:p-12 transform lg:rotate-6">
                <img src={image} alt="" className="w-full rounded-2xl shadow-xl"/>
                <figcaption className="mt-4 text-sm text-gray-500">
                  Photo by <a href="http://www.bravelux.com" target="_blank" rel="noopener noreferrer">Joe Mazza</a>
                </figcaption>
              </motion.figure>
              <header className="mb-8">
                <h1 className="text-5xl font-bold leading-none">{title}</h1>
              </header>
              <section dangerouslySetInnerHTML={{ __html: html }} className="max-w-none prose lg:prose-xl text-gray-400"/>
            </div>
          </div>
        </main>
        <Footer/>
      </>
    );
  }
}
