import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Abutton from "../UI/Abutton";

export default function StartPage() {
  // 유저 닉네임 상태 관리 변수
  const [nickname, setNickname] = useState("");
  // 리다이렉트용 navigate 변수
  const navigate = useNavigate();

  // 테스트 시작 버튼 함수(닉네임이 null이 아니면 question 페이지로 넘어감, ninkname도 같이)
  const handleStart = () => {
    if (nickname.trim() === "") {
      alert("닉네임을 입력해 주세요.");
      return;
    }
    navigate("/question", { state: { nickname } });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-[60%] w-[60%] m-5">
        <img className="rounded-3xl" src="./index.jpg" alt="index 동물" />
        <p className="text-center py-5 rounded-full font-bold">
          <Typewriter
            key="start"
            words={[
              "당신은 어떤 동물일까요. 사자일까요? 여우일까요? 지금 테스트를 통해 확인해 보세요.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            backspeed={60}
          />
        </p>
      </div>
      <input
        type="text"
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-5 w-full max-w-xs text-center"
      />
      <Abutton text="테스트 시작" onClick={handleStart} />
    </div>
  );
}
