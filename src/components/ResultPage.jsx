import { useLocation } from "react-router-dom";
import animalDescriptions from "../data/animalDescription.json";

export default function ResultPage() {
  const location = useLocation();
  const scores = location.state?.scores;
  const nickname = location.state?.nickname;

  // scores가 undefined면 대비하기
  if (!scores) {
    return <div>점수 데이터가 없습니다.</div>;
  }

  const topAnimal = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const animal = animalDescriptions[topAnimal];

  return (
    <div className="flex flex-col justify-start items-center">
      <h1 className="text-2xl pb-2">
        <span className="font-bold">{nickname}</span>님은 바로 {animal.name}(
        {animal.type})이네요.
      </h1>
      <p>{animal.description}</p>

      <div className="grid grid-cols-2 pt-5 gap-3">
        <p className="text-lg">이런 동물과 잘 어울려요</p>
        <p className="text-lg">이런 동물과는 좀 안 어울려요</p>
        <p>{animal.goodWith.join(", ")}</p>
        <p>{animal.badWith.join(", ")}</p>
      </div>
    </div>
  );
}
