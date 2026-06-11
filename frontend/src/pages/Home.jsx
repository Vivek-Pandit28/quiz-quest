import BgImage from "../assets/Student_Taking_Quiz.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, History, Sparkles, Trophy} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white px-4 md:px-8 lg:px-16">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-5xl pt-5 font-bold text-indigo-400"
      >
        Quiz Quest
      </motion.h1>

      <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-300">
            <Sparkles size={18} />
            <span className="text-sm font-semibold">Smart Quiz Platform</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Test Your Knowledge With{" "}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quiz Quest
            </span>
          </h2>

          <p className="mt-6 text-slate-400 text-lg max-w-xl">
            Practice HTML, CSS, JavaScript and React with easy, medium and hard
            levels. Track your performance and improve step by step.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/username")}
              className="group relative overflow-hidden flex items-center justify-center gap-2 bg-indigo-600 px-8 py-3 rounded-xl font-semibold cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition group-hover:translate-x-full duration-700" />
              <Play size={18} />
              <span>Play Now</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/leaderboard")}
              className="group relative overflow-hidden flex items-center justify-center gap-2 border border-yellow-500/50 bg-yellow-500/10 px-8 py-3 rounded-xl font-semibold text-yellow-400 cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent transition group-hover:translate-x-full duration-700" />
              <Trophy size={18} />
              <span>Leaderboard</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/recent-results")}
              className="group relative overflow-hidden flex items-center justify-center gap-2 border border-slate-700 bg-white/5 backdrop-blur-lg px-8 py-3 rounded-xl font-semibold text-slate-300 hover:border-indigo-500 hover:text-white cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent transition group-hover:translate-x-full duration-700" />
              <History size={18} />
              <span>Recent Results</span>
            </motion.button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              ["4+", "Categories"],
              ["3", "Levels"],
              ["10", "Questions"],
            ].map(([num, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-lg"
              >
                <p className="text-2xl font-bold text-indigo-400">{num}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <motion.img
            src={BgImage}
            alt="Quiz Illustration"
            className="relative z-10 w-full max-w-xl mx-auto drop-shadow-2xl"
            animate={{ y: [0, -18, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            animate={{ rotate: [0, 8, 0], y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-8 right-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-lg px-4 py-3 shadow-xl"
          >
            <p className="text-sm text-slate-300">Accuracy</p>
            <p className="text-2xl font-bold text-green-400">92%</p>
          </motion.div>

          <motion.div
            animate={{ rotate: [0, -8, 0], y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-8 left-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-lg px-4 py-3 shadow-xl"
          >
            <p className="text-sm text-slate-300">Score</p>
            <p className="text-2xl font-bold text-indigo-400">8/10</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
