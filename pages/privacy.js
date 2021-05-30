import React from "react";
import { useRouter } from "next/router";
import Meta from "../components/meta";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <>
      <Meta
        title="Privacy Policy - C.J. Arellano"
        url={router.asPath}
      />
      <div className="flex items-center flex-1 pt-20 lg:pt-32 pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-5xl font-bold leading-none text-center">
                Privacy Policy
              </h1>
            </header>
          </div>
        </div>
      </div>
    </>
  );
}
