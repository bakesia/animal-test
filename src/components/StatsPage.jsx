import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/SupabaseClient";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Abutton from "../UI/Abutton";

export default function StatsPage() {
  const navigate = useNavigate();
  const [animalStats, setAnimalStats] = useState({});

  const COLORS = {
    사자: "#f97316", // bg-orange-500
    돌고래: "#3b82f6", // bg-blue-500
    부엉이: "#8b5cf6", // bg-purple-500
    고양이: "#eab308", // bg-yellow-500
    여우: "#ef4444", // bg-red-500
    토끼: "#9ca3af", // bg-gray-500
  };

  useEffect(() => {
    const readStats = async () => {
      let { data: result, error } = await supabase
        .from("result")
        .select("animal");

      if (error) {
        console.error(error);
        return;
      }

      const stats = {};
      result.forEach(({ animal }) => {
        stats[animal] = (stats[animal] || 0) + 1;
      });
      setAnimalStats(stats);

      //   console.log(animalStats);
    };

    readStats();
  }, []);

  const handleReset = () => {
    navigate("/"); // start 페이지로 이동
  };

  // 객체 animalStats를 recharts용 배열로 변환
  const chartData = Object.entries(animalStats).map(([name, value]) => ({
    name,
    value,
  }));

  const topAnimal = chartData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    { name: "", value: 0 }
  );

  return (
    <div className="flex flex-col w-[90%] md:w-[70%] justify-center items-center">
      <span className="font-bold pb-2 text-2xl text-orange-900 mt-5">
        결과 통계
      </span>
      <span className="text-lg font-bold mb-2">
        어떤 동물이 가장 많이 나왔을까요?
      </span>
      <div className="w-full md:w-[60%] h-[60vh] min-h-[300px] mx-auto bg-white shadow-lg rounded-lg py-5 ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              className="font-bold"
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={40}
              paddingAngle={2}
              label={({ name }) => `${name}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <span className="font-bold mt-5 mb-10">
        가장 많이 나온 동물은 바로{" "}
        <span className="text-orange-500">{`${topAnimal.name}(${topAnimal.value})`}</span>{" "}
        입니다!
      </span>
      <Abutton text="테스트 다시하기" onClick={() => handleReset()} />
    </div>
  );
}
