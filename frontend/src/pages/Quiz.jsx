import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

import api from "../services/api";
import UserBadge from "../components/UserBadge";
import QuizStepper from "../components/QuizStepper";

function Quiz() {
  const navigate = useNavigate();

  const name = localStorage.getItem("quiz_name");
  const difficulty = localStorage.getItem("quiz_difficulty");

  const category = useMemo(() => {
    const savedCategory = localStorage.getItem("quiz_category");
    return savedCategory ? JSON.parse(savedCategory) : null;
  }, []);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!name) {
      navigate("/username");
      return;
    }

    if (!category) {
      navigate("/category");
      return;
    }

    if (!difficulty) {
      navigate("/difficulty");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const res = await api.get(
          `/questions/?category=${category.id}&difficulty=${difficulty}`,
        );

        setQuestions(res.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [name, category?.id, difficulty, navigate]);

  const submitQuiz = async (finalAnswers) => {
    const payload = {
      name,
      category_id: category.id,
      difficulty,
      answers: finalAnswers,
    };

    try {
      const res = await api.post("/attempts/submit/", payload);

      const resultData = {
        ...res.data,
        name,
        category: category.name,
        difficulty,
        created_at: new Date().toLocaleString(),
      };

      localStorage.setItem("quiz_result", JSON.stringify(resultData));

      const oldHistory = JSON.parse(localStorage.getItem("quiz_history")) || [];
      const newHistory = [resultData, ...oldHistory];

      localStorage.setItem("quiz_history", JSON.stringify(newHistory));

      navigate("/result");
    } catch (error) {
      console.log("ERROR DATA:", error.response?.data);
      console.log("PAYLOAD:", payload);
      setError("Failed to submit quiz");
    }
  };

  const handleOptionClick = (optionKey) => {
    if (locked || !currentQuestion) return;

    setSelectedOption(optionKey);
    setLocked(true);

    const newAnswer = {
      question_id: currentQuestion.id,
      selected_option: optionKey,
    };

    const finalAnswers = [...answers, newAnswer];
    setAnswers(finalAnswers);

    setTimeout(() => {
      setSelectedOption(null);
      setLocked(false);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        submitQuiz(finalAnswers);
      }
    }, 1000);
  };

  const getOptionClass = (optionKey) => {
    if (!locked) {
      return "bg-slate-900/80 border-white/10 hover:border-indigo-500/70 hover:bg-indigo-500/10";
    }

    if (optionKey === currentQuestion.correct_option) {
      return "bg-green-500/15 border-green-500 text-green-400";
    }

    if (
      optionKey === selectedOption &&
      optionKey !== currentQuestion.correct_option
    ) {
      return "bg-red-500/15 border-red-500 text-red-400";
    }

    return "bg-slate-900/70 border-white/10 opacity-50";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Questions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        No questions found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white px-4 py-10">
      <div className="absolute top-16 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

      <UserBadge />

      <div className="relative z-10 max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/difficulty")}
          className="mb-8 inline-flex items-center gap-2 text-slate-400 border border-slate-700 hover:border-indigo-500 px-5 py-2 rounded-lg font-semibold hover:text-white transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <QuizStepper currentStep="quiz" />

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-slate-400 mb-3">
            <span>
              Question {currentIndex + 1} / {questions.length}
            </span>

            <span className="capitalize">
              {category.name} • {difficulty}
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          <div className="h-2 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 p-5 sm:p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-400">
                  Question {currentIndex + 1}
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {category.name} • {difficulty}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-300">
                {currentIndex + 1}/{questions.length}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
              <h2 className="text-xl md:text-2xl font-bold leading-snug">
                {currentQuestion.question_text}
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4">
              {Object.entries(currentQuestion.options).map(([key, value]) => {
                const isCorrect =
                  locked && key === currentQuestion.correct_option;

                const isWrong =
                  locked &&
                  key === selectedOption &&
                  key !== currentQuestion.correct_option;

                return (
                  <button
                    key={key}
                    onClick={() => handleOptionClick(key)}
                    disabled={locked}
                    className={`group relative overflow-hidden flex items-center justify-between text-left px-5 py-3.5 rounded-2xl border font-medium transition cursor-pointer ${getOptionClass(
                      key,
                    )}`}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-950/70 border border-white/10 text-indigo-400 font-bold">
                        {key}
                      </span>

                      <span>{value}</span>
                    </span>

                    <span className="relative z-10">
                      {isCorrect && <CheckCircle size={20} />}
                      {isWrong && <XCircle size={20} />}
                    </span>

                    {!locked && (
                      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition group-hover:translate-x-full duration-700" />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-slate-500 text-sm mt-6">
              Select an option to continue automatically.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Quiz;
