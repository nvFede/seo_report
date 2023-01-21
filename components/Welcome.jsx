import React from "react";

const Welcome = () => {
  return (
    <>
      <h2 className="my-5 text-2xl">To start paste your OPEN AI API KEY</h2>

      <p className="my-5">
        you can get your own key from
        <a className="text-teal-600 font-bold" href="https://openai.com/">
          {" "}
          OPEN AI WEBSITE
        </a>
      </p>
    </>
  );
};

export default Welcome;
