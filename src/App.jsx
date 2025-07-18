import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { FaDog, FaHome } from "react-icons/fa";
import StartPage from "./components/StartPage";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultPage";
import StatsPage from "./components/StatsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full">
        <header className="flex justify-between items-center px-10 py-5 bg-orange-100 text-orange-900 text-xl font-bold">
          <div className="flex items-center gap-2 mx-auto">
            나는 무슨 동물일까요 <FaDog />
          </div>
        </header>

        <main className="flex-1 w-full flex flex-col justify-center items-center bg-slate-50">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/question" element={<QuestionPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </main>
        <footer className="flex justify-center items-center h-20 mt-5 bg-black text-white">
          copyright : ...
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
