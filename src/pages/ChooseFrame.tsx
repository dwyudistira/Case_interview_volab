import React from "react";

const ChooseFrame: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-600">
          Choose your frame
        </h2>

        <div className="flex justify-center space-x-4">
          <a
            href="/camera-potrait"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transform transition-all duration-200"
          >
            📱 Portrait
          </a>
          <a
            href="/camera-landscape"
            className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transform transition-all duration-200"
          >
            🖥️ Landscape
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChooseFrame;
