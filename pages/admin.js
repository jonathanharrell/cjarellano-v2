import React, { useEffect } from "react";
import HomePreview from "../cms/previews/HomePreview";
import CategoryPreview from "../cms/previews/CategoryPreview";
import ProjectPreview from "../cms/previews/ProjectPreview";
import BlogPreview from "../cms/previews/BlogPreview";
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
            widget: 'string',
            hint: 'The src of the iframe embed provided by YouTube or Vimeo'
          }
        ],
        pattern: /^<div class="relative mb-12" style="padding: 56\.25% 0 0 0;">$\s*?<iframe\s*?src="(.*?)".*?><\/iframe>\n^<\/div>$/ms,
        fromBlock: function(match) {
          return {
            url: match[1]
          };
        },
        toBlock: function(data) {
          if (!data.url) return null;
          return `<div class="relative mb-12" style="padding: 56.25% 0 0 0;">
  <iframe 
    src="${data.url}" 
    title="Video player" 
    class="absolute top-0 left-0 w-full h-full"
    frameborder="0" 
    allowfullscreen
  ></iframe>
</div>`;
        },
        toPreview: function(data) {
          if (!data.url) return null;
          return `<div class="relative mb-12" style="padding: 56.25% 0 0 0;">
  <iframe 
    src="${data.url}" 
    title="Video player" 
    class="absolute top-0 left-0 w-full h-full"
    frameborder="0" 
    allowfullscreen
  ></iframe>
</div>`;
        }
      });

      CMS.registerPreviewStyle("/admin.css");
      CMS.registerPreviewTemplate("home", HomePreview);
      CMS.registerPreviewTemplate("categories", CategoryPreview);
      CMS.registerPreviewTemplate("projects", ProjectPreview);
      CMS.registerPreviewTemplate("blog", BlogPreview);
      CMS.registerPreviewTemplate("posts", PostPreview);
      CMS.registerPreviewTemplate("about", AboutPreview);
    })();
  }, []);

  return (
    <div/>
  );
};

export default Admin;
