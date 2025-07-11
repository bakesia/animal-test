import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import animalDescriptions from "../data/animalDescription.json";
import Abutton from "../UI/Abutton";

export default function ResultPage() {
  const navigate = useNavigate();

  // nickname과 넘어온 scores 변수
  const location = useLocation();
  const scores = location.state?.scores;
  // 테스트용 점수 변수
  // const [scores, setScores] = useState({
  //   lion: 0,
  //   rabbit: 0,
  //   dolphin: 0,
  //   owl: 0,
  //   fox: 0,
  //   cat: 10,
  // });

  const [loading, setLoading] = useState(true);
  const [looping, setLooping] = useState(false);

  const nickname = location.state?.nickname;

  useEffect(() => {
    // console.log(animal.color);
    // 등장 애니메이션 끝난 후 반복 애니메이션 시작
    const timer = setTimeout(() => {
      setLooping(true);
    }, 2900); // 등장 애니메이션 시간과 맞춤 (1초)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-center w-full h-full text-xl"
      >
        <p className="animate-pulse font-bold text-2xl text-orange-900">
          <Typewriter
            key="ending"
            words={["결과를 분석 중입니다..."]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            backspeed={60}
          />
        </p>
      </motion.div>
    );
  }

  // scores가 undefined면 대비하기
  if (!scores) {
    return <div className="text-3xl font-bold">점수 데이터가 없습니다.</div>;
  }

  // scores 변수에서 최고점 동물 선택
  const topAnimal = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const animal = animalDescriptions[topAnimal];

  const resultShare = (nickname, animalName) => {
    const startUrl = window.location.origin + "/"; // 도메인 + 포트만 가져옴 (ex: https://mydomain.com)

    if (navigator.share) {
      navigator
        .share({
          title: `${nickname}님의 테스트 결과는 ${animalName}입니다! 당신은 어떤 동물인지 궁금하지 않으신가요? 지금 확인해보세요!`,
          url: startUrl, // 시작 페이지 주소만 넣음
        })
        .catch(console.error);
    } else {
      alert(`테스트 시작하러 가기: ${startUrl}`);
    }
  };

  const handleReset = () => {
    navigate("/"); // start 페이지로 이동
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <div className="w-[300px] m-5 border border-gray-800 rounded-3xl">
        <img
          className="max-w-full h-auto"
          src={animal.imgUrl}
          alt={animal.name}
        />
      </div> */}
      <h1 className="font-bold text-2xl mt-5">당신은 바로...</h1>
      <motion.div
        className={`w-[300px] m-8 border border-gray-800 rounded-3xl shadow-2xl ${animal.color}`}
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={
          looping
            ? {
                // y좌표 기준 10 올라갔다 0 갔다 10 갔다 ...
                y: [0, -10, 0, -10, 0],
                // 좌로 5도 갔다 우로 5 갔다... 끝과 끝을 맞춰줘야 애니메이션이 부드러움
                rotate: [0, 5, 0, -5, 0],
                opacity: 1,
                scale: 1,
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: 0,
              }
        }
        transition={{
          duration: looping ? 3 : 0.8,
          ease: "easeInOut",
          repeat: looping ? Infinity : 0,
        }}
        // **포인트: exit props를 비워두거나 제거하여 사라짐 방지**
        exit={undefined}
      >
        <img
          className="max-w-full h-auto"
          src={animal.imgUrl}
          alt={animal.name}
        />
      </motion.div>
      <h1 className="text-2xl pt-5 pb-2">
        <span className="font-bold">{nickname}</span>님은{" "}
        <span className="font-bold text-orange-900">
          {animal.name}({animal.type})
        </span>
        이네요.
      </h1>
      <p className="md:w-[50vw] w-[80vw] text-center">
        <Typewriter
          key={animal.description}
          words={[animal.description]}
          cursor
          cursorStyle="|"
          typeSpeed={60}
        />
      </p>

      <div className="grid grid-cols-2 pt-5 mb-5 gap-3 text-center">
        <p className="text-lg font-bold">이런 동물과 잘 어울려요</p>
        <p className="text-lg font-bold">이런 동물과는 좀 안 어울려요</p>
        <p className="text-5xl">{animal.goodWith.join(" ")}</p>
        <p className="text-5xl">{animal.badWith.join(" ")}</p>
      </div>
      <div className="flex flex-col pt-5 mb-5 w-[80%] gap-2 place-items-center">
        <Abutton
          text="결과 공유"
          onClick={() => resultShare(nickname, animal.name)}
        />
        <Abutton text="테스트 다시하기" onClick={() => handleReset()} />
      </div>
    </div>
  );
}
