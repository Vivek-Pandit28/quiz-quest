import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileCode, Palette, Zap, Atom } from "lucide-react";

import QuizStepper from "../components/QuizStepper";

function Category() {
  const navigate = useNavigate();
  const name = localStorage.getItem("quiz_name");

  useEffect(() => {
    if (!name) {
      navigate("/username");
    }
  }, [name, navigate]);

  const categories = [
    {
      id: 1,
      name: "HTML",
      icon: FileCode,
      desc: "Structure of web pages",
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400",
    },
    {
      id: 2,
      name: "CSS",
      icon: Palette,
      desc: "Styling and layouts",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
    },
    {
      id: 3,
      name: "JavaScript",
      icon: Zap,
      desc: "Logic and interactivity",
      color: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
    },
    {
      id: 4,
      name: "React",
      icon: Atom,
      desc: "Components and hooks",
      color: "from-cyan-500/20 to-indigo-500/20",
      iconColor: "text-cyan-400",
    },
  ];

  const handleSelect = (category) => {
    localStorage.setItem("quiz_category", JSON.stringify(category));
    navigate("/difficulty");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white px-4 py-10">
      <div className="absolute top-16 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

      {name && (
        <div className="fixed top-5 right-5 z-50 bg-white/10 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-xl shadow-lg">
          <span className="text-slate-400 text-sm">Player: </span>
          <span className="font-semibold text-indigo-400">{name}</span>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/username")}
          className="mb-8 inline-flex items-center gap-2 text-slate-400 border border-slate-700 hover:border-indigo-500 px-5 py-2 rounded-lg font-semibold hover:text-white transition cursor-pointer"
        >
          ← Back
        </button>

        <QuizStepper currentStep="category" />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-slate-400 mb-3">
            Welcome back,
            <span className="text-indigo-400 font-semibold"> {name}</span>
          </p>

          <p className="text-indigo-400 font-semibold">Quiz Category</p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Choose Your Category
          </h1>

          <p className="text-slate-400 mt-4">
            Select a technology and start learning with smart quizzes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(category)}
                className={`relative group cursor-pointer rounded-3xl p-8 text-center
                  bg-white/5 backdrop-blur-lg border border-white/10
                  shadow-xl hover:border-indigo-500/60 transition
                  bg-linear-to-br ${category.color}`}
              >
                <div className="absolute top-4 right-4 bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1 rounded-full">
                  30 Qs
                </div>

                <div className="mx-auto mb-5 w-20 h-20 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center group-hover:scale-110 transition">
                  <Icon size={42} className={category.iconColor} />
                </div>

                <h2 className="text-2xl font-bold">{category.name}</h2>

                <p className="text-slate-400 mt-3">{category.desc}</p>

                <p className="text-sm text-slate-500 mt-3">
                  Easy • Medium • Hard
                </p>

                <button
                  type="button"
                  className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold w-full transition cursor-pointer"
                >
                  Start {category.name} →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Category;
