import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../lib/SupabaseClient";
import Abutton from "../UI/Abutton";

export default function StatsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const readStats = async () => {
      let { data: result, error } = await supabase
        .from("result")
        .select("animal");

      if (error) {
        console.error(error);
        return;
      }

      const animalStats = {};
      result.forEach(({ animal }) => {
        animalStats[animal] = (animalStats[animal] || 0) + 1;
      });

      //   console.log(animalStats);
    };

    readStats();
  }, []);

  const handleReset = () => {
    navigate("/"); // start 페이지로 이동
  };

  return (
    <div>
      <Abutton text="테스트 다시하기" onClick={() => handleReset()} />
    </div>
  );
}
