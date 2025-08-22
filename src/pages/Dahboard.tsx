import React from "react";

const Dashboard: React.FC = () => {
  return (
<div className="flex justify-center items-center h-screen">
  <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
    <h2 className="text-3xl font-bold mb-4 text-blue-600">
      Welcome Back to Volab🎉
    </h2>
    <p className="text-gray-700">
      Abadikan momen indah bersama pasangan, keluarga, dan teman-teman! Kini hadir aplikasi berbasis web 
      dengan fitur foto untuk menyimpan setiap kenangan spesial Anda.
    </p>
    <a
      href="/choose-frame"
      className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition mt-5"
    >
      Try it 🚀
    </a>
  </div>
</div>

  );
};

export default Dashboard;
