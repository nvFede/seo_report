import Head from "next/head";
import React from "react";

const Header = () => {
  return (
    <>
     <Head>
        <title>SEO Report</title>
        <meta
          name="description"
          content="Generated SEO reports in one click with chatGPT"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-teal-500 h-20 w-full py-5 text-white text-center text-4xl">
      Get SEO reports from chatGPT in ONE click!
      </header>
       
    </>
  );
};

export default Header;
