import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="h-[60%] m-5">
        <img src="./animals.jpg" alt="index 동물" />
        <p className="text-center py-5 rounded-full">
          당신은 어떤 동물일까요. 테스트를 통해 확인해 보세요.
        </p>
      </div>
      <Link to="/question">
        <button className="w-full h-full px-20 py-2 bg-orange-100 rounded-md">
          테스트 시작
        </button>
      </Link>
    </div>
  );
}
