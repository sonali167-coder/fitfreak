import { useEffect, useState } from "react";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("fitfreakUser"));

  const feedbacks = [
    {
      name: "Meera K.",
      feedback: "Loved the personalized plans! Highly recommended for all fitness levels.",
    },
    {
      name: "Ravi D.",
      feedback: "Dark aesthetic and smooth interface — makes me want to come back every day.",
    },
    {
      name: "Aarav S.",
      feedback: "The dashboard and streak tracking really motivate me to stay consistent!",
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white px-6 py-10 space-y-16"
      style={{ backgroundImage: "url('/fitfreak-bg.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-md">
          Welcome to <span className="text-orange-500">FitFreak</span>
          {user?.name && `, ${user.name}`}!
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Your journey to fitness starts here.
        </p>
      </div>

      {/* Feedback Section */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
          What Our Users Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {feedbacks.map((f, idx) => (
            <div
              key={idx}
              className="bg-black bg-opacity-70 p-6 rounded-lg shadow-md border border-orange-500 hover:shadow-orange-400 transition-all duration-300"
            >
              <p className="text-gray-200 italic">"{f.feedback}"</p>
              <p className="text-orange-400 font-semibold mt-2 text-right">- {f.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
