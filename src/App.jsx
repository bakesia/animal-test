import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaDog, FaHome } from "react-icons/fa";
import StartPage from "./components/StartPage";
import QuestionPage from "./components/QuestionPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full min-h-screen mx-auto">
        <header className="flex justify-between items-center px-10 py-5 bg-orange-100 text-orange-900 text-xl font-bold">
          <div className="flex items-center gap-2 mx-auto">
            나는 무슨 동물일까 <FaDog />
          </div>
          <Link to="/">
            <FaHome className="text-2xl" />
          </Link>
        </header>

        <main className="grow w-full flex justify-center items-center overflow-y-auto">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/question" element={<QuestionPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </main>
        <footer className="flex justify-center items-center h-20 bg-orange-100 text-orange-900">
          copyright : ybh
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
