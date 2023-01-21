import React from "react";

const Report = ({ content }) => {
  console.log(content);

  return (
    <section className="w-full max-w-5xl">
      {/* {content.map((obj, index) => (
        <div key={index} className="p-2 flex flex-col items-center w-full ">
          <h2 className="my-5 p-2 text-white border border-black bg-gray-800 w-full">
            {obj.render}
          </h2>
          <div
            className="mx-5"
            dangerouslySetInnerHTML={{ __html: obj.text }}
          />
        </div>
      ))} */}

      {/* {content
        ? content.map((obj, index) => (
            <div key={index} className="report-card">
              <h2 className="text-xl mb-2">{obj.render}</h2>
              <p className="text-sm text-gray-700">{obj.text}</p>
            </div>
          ))
        : na} */}
    </section>
  );
};

export default Report;
