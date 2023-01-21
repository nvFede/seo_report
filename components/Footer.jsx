import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 text-center mt-5">
      <p className="p-2">
        Made by
        <a
          target={"_blank"}
          rel="noreferrer"
          className="text-teal-600"
          href="https://github.com/nvFede"
        >
          {" "}
          Fede.rico
        </a>
      </p>
      <p className="p-2">
        Special thanks to
        <a
          target={"_blank"}
          rel="noreferrer"
          className="text-teal-600"
          href="https://twitter.com/matspeterforss"
        >
          {" "}
          Mats-Peter Forss
        </a>{" "}
        for the curated list
      </p>
    </footer>
  );
};

export default Footer;
