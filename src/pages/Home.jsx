import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Summary from "../components/Summary";
import ProximosJogos from "../components/ProximosJogos";
import ScoresTable from "../components/ScoresTable";

export default function Home() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token || !storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  if (!username) return null;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl space-y-10">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-1">
            📅 Próximos jogos
          </h2>
          <ProximosJogos />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-1">
            📊 Classificação
          </h2>
          <ScoresTable league="global" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-1">
            📈 Jogos
          </h2>
          <Summary />
        </div>
      </div>
    </div>
  );
}
