import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (nickname.trim() === "") {
      alert("닉네임을 입력해 주세요.");
      return;
    }
    navigate("/question", { state: { nickname } });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-[60%] m-5">
        <img src="./index.jpg" alt="index 동물" />
        <p className="text-center py-5 rounded-full font-bold">
          당신은 어떤 동물일까요. 테스트를 통해 확인해 보세요.
        </p>
      </div>
      <input
        type="text"
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-5 w-full max-w-xs text-center"
      />

      <button
        onClick={handleStart}
        className="w-full max-w-xs px-20 py-2 bg-orange-100 rounded-md hover:bg-orange-300 transition"
      >
        테스트 시작
      </button>
    </div>
  );
}
