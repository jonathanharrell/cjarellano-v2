import React, { useEffect } from "react";
import Head from "next/head";
import HomePreview from "../cms/previews/HomePreview";
import CategoryPreview from "../cms/previews/CategoryPreview";
import ProjectPreview from "../cms/previews/ProjectPreview";
import AboutPreview from "../cms/previews/AboutPreview";

const Admin = () => {
  useEffect(() => {
    (async() => {
      const CMS = (await import("netlify-cms-app")).default;
      CMS.init();

      CMS.registerPreviewStyle("/admin.css");
      CMS.registerPreviewTemplate("home", HomePreview);
      CMS.registerPreviewTemplate("categories", CategoryPreview);
      CMS.registerPreviewTemplate("projects", ProjectPreview);
      CMS.registerPreviewTemplate("about", AboutPreview);
    })();
  }, []);

  return (
    <div>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
    </div>
  );
};

export default Admin;
