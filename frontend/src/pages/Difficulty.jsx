import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Smile, Flame, Trophy } from "lucide-react";

import UserBadge from "../components/UserBadge";
import QuizStepper from "../components/QuizStepper";

function Difficulty() {
  const navigate = useNavigate();

  const name = localStorage.getItem("quiz_name");
  const category = localStorage.getItem("quiz_category");

  useEffect(() => {
    if (!name) {
      navigate("/username");
      return;
    }

    if (!category) {
      navigate("/category");
    }
  }, [name, category, navigate]);

  const difficulties = [
    {
      name: "Easy",
      value: "easy",
      icon: Smile,
      border: "border-green-500/60",
      iconColor: "text-green-400",
      bg: "from-green-500/20 to-emerald-500/10",
      desc: "Beginner friendly questions",
      level: "Basic Concepts",
    },
    {
      name: "Medium",
      value: "medium",
      icon: Flame,
      border: "border-yellow-500/60",
      iconColor: "text-yellow-400",
      bg: "from-yellow-500/20 to-orange-500/10",
      desc: "Moderate difficulty questions",
      level: "Logic + Practice",
    },
    {
      name: "Hard",
      value: "hard",
      icon: Trophy,
      border: "border-red-500/60",
      iconColor: "text-red-400",
      bg: "from-red-500/20 to-pink-500/10",
      desc: "Advanced level questions",
      level: "Interview Level",
    },
  ];

  const handleSelect = (level) => {
    localStorage.setItem("quiz_difficulty", level);
    navigate("/quiz");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white px-4 py-10">
      <div className="absolute top-16 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

      <UserBadge />

      <div className="relative z-10 max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/category")}
          className="mb-8 inline-flex items-center gap-2 text-slate-400 border border-slate-700 hover:border-indigo-500 px-5 py-2 rounded-lg font-semibold hover:text-white transition cursor-pointer"
        >
          ← Back
        </button>

        <QuizStepper currentStep="difficulty" />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center my-12"
        >
          <p className="text-indigo-400 font-semibold">Quiz Difficulty</p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Choose Difficulty Level
          </h1>

          <p className="text-slate-400 mt-4">
            Select your challenge level and start the quiz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {difficulties.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(item.value)}
                className={`cursor-pointer rounded-3xl p-8 text-center
                bg-white/5 backdrop-blur-lg border ${item.border}
                shadow-xl bg-linear-to-br ${item.bg}
                hover:border-indigo-500/70 transition`}
              >
                <div className="mx-auto mb-5 w-20 h-20 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center">
                  <Icon size={42} className={item.iconColor} />
                </div>

                <h2 className="text-3xl font-bold">{item.name}</h2>

                <p className="text-slate-400 mt-4">{item.desc}</p>

                <p className="text-sm text-slate-500 mt-3">
                  {item.level} • 10 Questions
                </p>

                <button
                  type="button"
                  className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold w-full transition cursor-pointer"
                >
                  Select {item.name} →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Difficulty;
