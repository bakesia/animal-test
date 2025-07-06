import questions from "../data/questions.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function QuestionPage() {
  const location = useLocation();
  const nickname = location.state?.nickname;

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({
    lion: 0,
    rabbit: 0,
    dolphin: 0,
    owl: 0,
    fox: 0,
    cat: 0,
  });

  const question = questions[currentIndex];
  const handleAnswer = (selectedScores) => {
    // 점수 누적
    setScores((prev) => {
      const newScores = { ...prev };
      // ex : {lion:2} 형태로 넘어감
      for (let animal in selectedScores) {
        newScores[animal] += selectedScores[animal];
      }
      return newScores;
    });

    // 다음 질문 or 결과 페이지 이동
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      console.log(scores);
    } else {
      navigate("/result", { state: { scores, nickname } });
    }
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <h2 className="font-bold pb-2 text-xl">{currentIndex + 1} 번째 질문</h2>
      <h2 className="font-bold pb-10 text-2xl">{question.question}</h2>
      {question.choices.map((choice, i) => (
        <button
          className="p-2 m-2 bg-orange-200 w-full rounded-md text-orange-900"
          onClick={() => handleAnswer(choice.scores)}
          key={i}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
