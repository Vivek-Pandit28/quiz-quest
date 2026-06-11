import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Trophy,
  Medal,
  Search,
  Filter,
  Crown,
  Sparkles,
  Users,
} from "lucide-react";

import api from "../services/api";

function Leaderboard() {
  const navigate = useNavigate();

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/leaderboard/");
        setLeaderboard(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const filteredLeaderboard = leaderboard.filter((item) => {
    const playerName = item.name || item.username || "";

    const matchName = playerName.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "" || item.category === categoryFilter;

    const matchDifficulty =
      difficultyFilter === "" || item.difficulty === difficultyFilter;

    return matchName && matchCategory && matchDifficulty;
  });

  const getRankStyle = (index) => {
    if (index === 0)
      return "text-yellow-400 border-yellow-500/40 bg-yellow-500/10";
    if (index === 1)
      return "text-slate-300 border-slate-400/40 bg-slate-400/10";
    if (index === 2)
      return "text-orange-400 border-orange-500/40 bg-orange-500/10";
    return "text-indigo-400 border-indigo-500/30 bg-indigo-500/10";
  };

  const getRankLabel = (index) => {
    if (index === 0) return "Champion";
    if (index === 1) return "Runner Up";
    if (index === 2) return "Top 3";
    return `Rank #${index + 1}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white px-4 py-10">
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-pink-600/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.04, x: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 border border-slate-700 px-5 py-2 rounded-xl text-slate-300 hover:border-indigo-500 cursor-pointer"
        >
          <Home size={18} />
          Back Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 mx-auto rounded-3xl bg-yellow-500/20 flex items-center justify-center mb-5 border border-yellow-500/30"
          >
            <Trophy size={42} className="text-yellow-400" />
          </motion.div>

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-300 mb-5">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">Top Quiz Performers</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">Leaderboard</h1>

          <p className="text-slate-400 mt-3">
            Top performers based on highest quiz scores.
          </p>
        </motion.div>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl backdrop-blur-lg"
          >
            <div className="flex items-center gap-3">
              <Users className="text-indigo-400" size={22} />
              <div>
                <p className="text-sm text-slate-400">Total Players</p>
                <p className="text-2xl font-bold text-indigo-400">
                  {filteredLeaderboard.length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl backdrop-blur-lg"
          >
            <div className="flex items-center gap-3">
              <Crown className="text-yellow-400" size={22} />
              <div>
                <p className="text-sm text-slate-400">Top Score</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {filteredLeaderboard[0]
                    ? `${filteredLeaderboard[0].score}/${filteredLeaderboard[0].total_questions}`
                    : "0"}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl backdrop-blur-lg"
          >
            <div className="flex items-center gap-3">
              <Trophy className="text-green-400" size={22} />
              <div>
                <p className="text-sm text-slate-400">Best Accuracy</p>
                <p className="text-2xl font-bold text-green-400">
                  {filteredLeaderboard[0]
                    ? `${filteredLeaderboard[0].percentage}%`
                    : "0%"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search Player..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="relative">
              <Filter
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-indigo-500 transition"
              >
                <option value="">All Categories</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
              </select>
            </div>

            <div className="relative">
              <Filter
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-indigo-500 transition"
              >
                <option value="">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </motion.div>

        {filteredLeaderboard.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center"
          >
            <p className="text-slate-400">No leaderboard data found.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredLeaderboard.map((item, index) => {
              const progress =
                item.total_questions > 0
                  ? (item.score / item.total_questions) * 100
                  : 0;

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition
                    ${
                      index === 0
                        ? "border-yellow-500/40 bg-yellow-500/10"
                        : "border-white/10 bg-white/5 hover:border-indigo-500/60"
                    }`}
                >
                  {index === 0 && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-bold ${getRankStyle(
                          index,
                        )}`}
                      >
                        {index < 3 ? <Medal size={26} /> : `#${index + 1}`}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold">
                            {item.name || item.username || "Player"}
                          </h2>

                          {index === 0 && (
                            <Crown size={18} className="text-yellow-400" />
                          )}
                        </div>

                        <p className="text-sm text-slate-400 capitalize">
                          {item.category} • {item.difficulty}
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                          {getRankLabel(index)}
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-2xl font-bold text-indigo-400">
                        {item.score}/{item.total_questions}
                      </p>

                      <p className="text-sm text-slate-400">
                        {item.percentage}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                      className="h-full rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
