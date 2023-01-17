import React from "react";

const Report = ({ content }) => {
  return (
    <section className="w-full max-w-5xl">
      {Object.keys(content).map((key) => (
        <div key={key} className="p-2 flex flex-col items-center w-full ">
          <p className="my-5 p-2 text-white border border-black bg-gray-800 w-full">
            <strong>{key}:</strong>
          </p>
          <div
            className="mx-5"
            dangerouslySetInnerHTML={{ __html: content[key] }}
          />
        </div>
      ))}
    </section>
  );
};

export default Report;
