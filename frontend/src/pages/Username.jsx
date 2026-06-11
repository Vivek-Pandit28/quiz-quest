import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import QuizStepper from "../components/QuizStepper";
import AI_Quiz from "../assets/AI_Quiz_Generator.png";

function Username() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    localStorage.setItem("quiz_name", name.trim());
    navigate("/category");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 pt-10">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
        <QuizStepper currentStep="username" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate("/")}
              className="mb-5 inline-flex items-center gap-2 text-slate-400 border border-slate-700 hover:border-indigo-500 px-5 py-2 rounded-lg font-semibold hover:text-white transition cursor-pointer"
            >
              ← Back to Home
            </button>

            <p className="text-indigo-400 font-semibold mb-2">
              Welcome to Quiz Quest
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Test your skills with smart quizzes
            </h1>

            <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-md">
              Practice HTML, CSS, JavaScript and React with easy, medium and
              hard difficulty levels.
            </p>

            <motion.img
              src={AI_Quiz}
              alt="Quiz Illustration"
              className="w-full max-w-md lg:max-w-md mx-auto"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600 flex items-center justify-center text-3xl">
                🧠
              </div>

              <h2 className="text-3xl font-bold mt-5">Enter Your Name</h2>

              <p className="text-slate-400 mt-2">
                Your name will be used for quiz results.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                placeholder="Enter your name"
                className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 outline-none transition ${
                  error
                    ? "border-red-500"
                    : "border-slate-700 focus:border-indigo-500"
                }`}
              />

              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded-xl font-semibold transition cursor-pointer"
              >
                Continue →
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Username;
