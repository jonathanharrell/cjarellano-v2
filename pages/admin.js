import React, { useEffect } from "react";
import Head from "next/head";
import CategoryPreview from "../cms/previews/CategoryPreview";
import ProjectPreview from "../cms/previews/ProjectPreview";

function Admin() {
  useEffect(() => {
    (async() => {
      const CMS = (await import("netlify-cms-app")).default;
      CMS.init();

      CMS.registerPreviewStyle("/admin.css");
      CMS.registerPreviewTemplate("categories", CategoryPreview);
      CMS.registerPreviewTemplate("projects", ProjectPreview);
    })();
  }, []);

  return (
    <div>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
    </div>
  );
}

export default Admin;
