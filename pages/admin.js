import React, { useEffect } from "react";
import Head from "next/head";
import ProjectPreview from "../cms/previews/ProjectPreview";

function Admin() {
  useEffect(() => {
    (async() => {
      const CMS = (await import("netlify-cms-app")).default;
      CMS.init();

      CMS.registerPreviewStyle(
        "https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css"
      );
      CMS.registerPreviewStyle(
        "https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
      );
      CMS.registerPreviewStyle("/admin.css");
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
