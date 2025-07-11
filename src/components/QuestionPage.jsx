import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import questions from "../data/questions.json";
import Abutton from "../UI/Abutton";

export default function QuestionPage() {
  // 걍 결과 페이지로 nickname 넘기기 위한 location 변수
  const location = useLocation();
  const nickname = location.state?.nickname;
  const navigate = useNavigate();

  // 현재 질문 페이지 index 상태 관리 변수
  const [currentIndex, setCurrentIndex] = useState(0);
  // 동물 점수 리스트 상태 관리 변수
  const [scores, setScores] = useState({
    lion: 0,
    rabbit: 0,
    dolphin: 0,
    owl: 0,
    fox: 0,
    cat: 0,
  });

  //question.json 내용 불러와 현재 index에 해당하는 질문 저장
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
      // console.log(scores, questions.length);
    } else {
      navigate("/result", { state: { scores, nickname } });
    }
  };

  return (
    // <div className="flex flex-col w-[50%] justify-center items-center">
    //   <h2 className="font-bold pb-2 text-xl">{currentIndex + 1} 번째 질문</h2>
    //   <h2 className="font-bold pb-10 text-2xl">{question.question}</h2>
    //   {question.choices.map((choice, i) => (
    //     <Abutton
    //       key={i}
    //       text={choice.text}
    //       onClick={() => handleAnswer(choice.scores)}
    //     />
    //   ))}
    // </div>

    <div className="flex flex-col w-[70%] justify-center items-center">
      <h2 className="font-bold pb-2 text-xl mb-2">
        <span className="text-orange-500">{currentIndex}</span> /{" "}
        {questions.length}
      </h2>
      <div className="w-[80%] bg-gray-200 rounded-full h-2 mb-10">
        <div
          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentIndex + 1 / questions.length) * 10}%` }}
        ></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col items-center text-center"
        >
          <h2 className="font-bold pb-10 text-2xl">{question.question}</h2>
          {question.choices.map((choice, i) => (
            <Abutton
              key={i}
              text={choice.text}
              onClick={() => handleAnswer(choice.scores)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
