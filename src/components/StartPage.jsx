import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { supabase } from "../lib/SupabaseClient";
import Abutton from "../UI/Abutton";

export default function StartPage() {
  /**유저 닉네임 상태 관리 변수*/
  const [nickname, setNickname] = useState("");
  /**DB에 존재하는 모든 유저 닉네임 리스트*/
  const [allNicks, setAllNicks] = useState([]);
  /**리다이렉트용 navigate 변수*/
  const navigate = useNavigate();

  useEffect(() => {
    /**DB에 존재하는 닉네임 불러와서 allNicks에 저장 */
    const readNicks = async () => {
      let { data: result, error } = await supabase
        .from("result")
        .select("nickname");

      if (error) {
        console.error(error);
        return;
      }

      const nicksList = [...new Set(result.map((item) => item.nickname))];
      setAllNicks(nicksList);
    };

    readNicks();
  }, []);

  /**테스트 시작 버튼 함수(닉네임이 null이 아니고, 중복되지 않으면 question 페이지로 넘어감, ninkname 변수도 같이)*/
  const handleStart = () => {
    if (nickname.trim() === "") {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    if (allNicks.includes(nickname.trim())) {
      alert("이미 등록되어 있는 닉네임입니다. 다른 닉네임을 입력해 주세요.");
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
