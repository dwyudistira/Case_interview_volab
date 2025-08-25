import React from "react";
import { Link } from "react-router-dom";

const ChooseFrame: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <h2 className="text-3xl font-extrabold mb-10 text-blue-600">
          Choose your frame
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Portrait Frame */}
          <Link to="/photo-session?mode=portrait">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer">
              <img
                src="img/Frame-Portrait.png"
                alt="Portrait Frame"
                className="w-full h-56 object-contain p-4 bg-gray-50"
              />
              <div className="p-2 bg-blue-50">
                <p className="text-sm font-semibold text-blue-600">Portrait</p>
              </div>
            </div>
          </Link>

          {/* Landscape Frame */}
          <Link to="/photo-session?mode=landscape">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer">
              <img
                src="img/Frame-Landscape.png"
                alt="Landscape Frame"
                className="w-full h-56 object-contain p-4 bg-gray-50"
              />
              <div className="p-2 bg-green-50">
                <p className="text-sm font-semibold text-green-600">Landscape</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseFrame;
