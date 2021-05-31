import Head from "next/head";
import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const Meta = ({
  title = "C.J. Arellano - Writer. Director. Editor.",
  description = "C.J. is a media creator specializing in genre-driven, comedic, and human interest content.",
  type = "website",
  image = "/static/img/cj-home.jpg",
  url
}) => {
  const canonical = `${baseUrl}${url}`;

  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta property="og:type" content={type}/>
        <meta name="og:title" property="og:title" content={title}/>
        <meta name="og:description" property="og:description" content={description}/>
        <meta property="og:site_name" content="C.J. Arellano"/>
        <meta property="og:url" content={canonical}/>
        <meta property="og:image" content={`${baseUrl}${image}`}/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:site" content="@cjarellano"/>
        <meta name="twitter:creator" content="@cjarellano"/>
        <meta name="twitter:image" content={`${baseUrl}${image}`}/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff00fe"/>
        <meta name="msapplication-TileColor" content="#ff00fe"/>
        <meta name="theme-color" content="#ffffff"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="canonical" href={canonical}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: `{"@context":"http:\\/\\/schema.org","@type":"WebSite","@id":"#website","url":"https:\\/\\/cjarellano.com\\/","name":"C.J. Arellano"}`}}></script>
    </Head>
  );
}

export default Meta;
