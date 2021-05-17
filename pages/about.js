import { Component } from "react";
import { attributes, html } from "../content/about.md";

export default class About extends Component {
  render() {
    const { title } = attributes;

    return (
      <main className="pt-20 lg:pt-32 pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <article>
              <figure className="lg:max-w-lg lg:float-right lg:-mr-24 mb-12 lg:p-12 transform lg:rotate-6">
                <img src="/static/img/cjarellano.png" alt="" className="w-full rounded-2xl shadow-xl"/>
              </figure>
              <header className="mb-8">
                <h1 className="text-5xl font-bold leading-none">{title}</h1>
              </header>
              <div dangerouslySetInnerHTML={{ __html: html }} className="max-w-none prose lg:prose-xl text-gray-400"/>
            </article>
          </div>
        </div>
      </main>
    );
  }
}
