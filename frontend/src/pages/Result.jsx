import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home } from "lucide-react";

import UserBadge from "../components/UserBadge";
import QuizStepper from "../components/QuizStepper";

function Result() {
  const navigate = useNavigate();

  const result = JSON.parse(localStorage.getItem("quiz_result"));

  const history = JSON.parse(localStorage.getItem("quiz_history")) || [];

  if (!result) return null;

  const percentage =
    result.percentage ||
    Math.round((result.score / result.total_questions) * 100);

  const correctAnswers = result.correct_answers || result.score;
  const wrongAnswers =
    result.wrong_answers || result.total_questions - result.score;

  const handleRestart = () => {
    localStorage.removeItem("quiz_category");
    localStorage.removeItem("quiz_difficulty");
    localStorage.removeItem("quiz_result");
    navigate("/category");
  };

  const handleHome = () => {
    localStorage.removeItem("quiz_name");
    localStorage.removeItem("quiz_category");
    localStorage.removeItem("quiz_difficulty");
    localStorage.removeItem("quiz_result");

    navigate("/");
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white px-4 py-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>

        <UserBadge />

        <div className="relative z-10 max-w-4xl mx-auto">
          <QuizStepper currentStep="result" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mt-8 overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl text-center"
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-yellow-400">
                <Trophy size={18} />
                <span className="text-sm font-semibold">
                  {percentage >= 80
                    ? "Gold Rank"
                    : percentage >= 50
                      ? "Silver Rank"
                      : "Bronze Rank"}
                </span>
              </div>

              <h1 className="text-3xl font-bold">
                Congratulations, {result.name}! 🎉
              </h1>

              <p className="mt-3 text-lg">
                <span className="text-indigo-400 font-bold">{result.name}</span>

                <span className="text-slate-300">
                  {" "}
                  {percentage >= 90
                    ? ", Outstanding Performance 🚀"
                    : percentage >= 70
                      ? ", Great Job 🎉"
                      : percentage >= 50
                        ? ", Good Effort 👍"
                        : ", Keep Practicing 💪"}
                </span>
              </p>

              <div className="relative mx-auto mt-8 h-40 w-40">
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl" />

                <svg
                  className="relative h-full w-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#1e293b"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={251}
                    strokeDashoffset={251 - (251 * percentage) / 100}
                  />
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="text-4xl font-bold">{percentage}%</h2>
                  <p className="text-sm text-slate-400">Accuracy</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
                  <p className="text-xs text-slate-400">Score</p>
                  <p className="mt-1 text-2xl font-bold text-indigo-400">
                    {result.score}/{result.total_questions}
                  </p>
                </div>

                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
                  <p className="text-xs text-slate-400">Correct</p>
                  <p className="mt-1 text-2xl font-bold text-green-400">
                    {correctAnswers}
                  </p>
                </div>

                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                  <p className="text-xs text-slate-400">Wrong</p>
                  <p className="mt-1 text-2xl font-bold text-red-400">
                    {wrongAnswers}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-left">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-400">Performance</span>
                  <span className="font-semibold text-indigo-400">
                    {percentage}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold transition hover:bg-indigo-700 cursor-pointer"
                >
                  <RotateCcw size={18} />
                  Play Again
                </button>

                <button
                  onClick={handleHome}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-2.5 font-semibold transition hover:border-indigo-500 cursor-pointer"
                >
                  <Home size={18} />
                  Back To Home
                </button>
              </div>
            </div>
          </motion.div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recent Results</h2>

            {history.length === 0 ? (
              <p className="text-slate-400">No recent results found.</p>
            ) : (
              <div className="space-y-4">
                {history.slice(0, 5).map((item, index) => {
                  const itemPercentage =
                    item.percentage ||
                    Math.round((item.score / item.total_questions) * 100);

                  return (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.name || item.username || "Player"}
                        </p>

                        <p className="text-sm text-slate-400 capitalize">
                          {item.category?.name || item.category} •{" "}
                          {item.difficulty}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-indigo-400 font-bold">
                          {item.score}/{item.total_questions}
                        </p>

                        <p className="text-sm text-slate-400">
                          {itemPercentage}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
