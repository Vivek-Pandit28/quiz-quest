import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Trophy, Calendar, Medal } from "lucide-react";
import { motion } from "framer-motion";

import api from "../services/api";

function RecentResults() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get("/recent-results/");
        setResults(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white px-4 py-10">
      {/* Background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8 border border-slate-700 hover:border-indigo-500 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-xl font-semibold text-slate-300 hover:text-white cursor-pointer"
        >
          <Home size={18} />
          Back To Home
        </motion.button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
            <Trophy size={40} className="text-indigo-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">Recent Results</h1>

          <p className="text-slate-400 mt-3">
            Your latest quiz attempts and performance history.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 flex justify-center items-center text-center">
          <div className=" bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <p className="text-slate-400 text-sm">Total Attempts</p>
            <p className="text-3xl font-bold text-indigo-400">
              {results.length}
            </p>
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <p className="text-slate-400">No recent results found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-5 hover:border-indigo-500/50 transition"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      {index === 0 ? (
                        <Medal className="text-yellow-400" size={24} />
                      ) : (
                        <Trophy className="text-indigo-400" size={22} />
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        {item.name || "Player"}
                      </h2>

                      <p className="text-slate-400 text-sm capitalize">
                        {item.category} • {item.difficulty}
                      </p>

                      {item.created_at && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <Calendar size={12} />
                          {new Date(item.created_at).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-indigo-400">
                      {item.score}/{item.total_questions}
                    </p>

                    <p className="text-green-400 font-semibold">
                      {item.percentage}%
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentResults;
