import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Username from "./pages/Username";
import Category from "./pages/Category";
import Difficulty from "./pages/Difficulty";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import RecentResults from "./pages/RecentResults";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/username" element={<Username />} />
        <Route path="/category" element={<Category />} />
        <Route path="/difficulty" element={<Difficulty />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/recent-results" element={<RecentResults />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;