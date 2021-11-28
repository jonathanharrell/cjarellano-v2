import React, { useEffect } from "react";
import Head from "next/head";
import HomePreview from "../cms/previews/HomePreview";
import CategoryPreview from "../cms/previews/CategoryPreview";
import ProjectPreview from "../cms/previews/ProjectPreview";
import PostPreview from "../cms/previews/PostPreview";
import AboutPreview from "../cms/previews/AboutPreview";

const Admin = () => {
  useEffect(() => {
    (async() => {
      const CMS = (await import("netlify-cms-app")).default;
      CMS.init();

      CMS.registerEditorComponent({
        id: "video",
        label: "Video",
        fields: [
          {
            name: 'url',
            label: 'URL',
            widget: 'string'
          }
        ],
        fromBlock: function(match) {
          return {
            url: match[1]
          };
        },
        toBlock: function(data) {
          return `
            <div class="aspect-w-16 aspect-h-9">
              <iframe src="${data.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          `;
        },
      });

      CMS.registerPreviewStyle("/admin.css");
      CMS.registerPreviewTemplate("home", HomePreview);
      CMS.registerPreviewTemplate("categories", CategoryPreview);
      CMS.registerPreviewTemplate("projects", ProjectPreview);
      CMS.registerPreviewTemplate("posts", PostPreview);
      CMS.registerPreviewTemplate("about", AboutPreview);
    })();
  }, []);

  return (
    <div/>
  );
};

export default Admin;
