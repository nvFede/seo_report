import React from "react";

const ProgressBar = ({progress}) => {
  return (
    <div className="w-96">
      <p className="mb-2">Generating Report...</p>
      <div className="h-4 w-full bg-gray-300 rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className={`h-full transition-all duration-300 ease-in-out rounded-full ${
            progress < 90 ? "bg-pink-700" : "bg-teal-500"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
