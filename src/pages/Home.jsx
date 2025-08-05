import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import ProximosJogos from "../components/ProximosJogos";
import Scores from "../components/ScoresTable";
import Summary from "../components/Summary";

export default function Home() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token || !storedUsername) {
      navigate("/login");
      return;
    }

    fetch(`${BACKEND_URL}/validate-token`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to validate token");
        setUsername(storedUsername);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${BACKEND_URL}/leagues`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch leagues");
        const data = await res.json();
        setLeagues(data);
        if (data.length > 0) setSelectedLeague(data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeagues();
  }, []);

  const handleSelectLeague = (league) => {
    setSelectedLeague(league);
    setIsMenuOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!username) return null;

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl space-y-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-1">
          📅 Próximos jogos
        </h2>
        <ProximosJogos />
        <div className="flex items-center space-x-2 justify-end">
          <span className="font-semibold">Liga:</span>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            {selectedLeague || "Select League"}
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-1">
          📊 Pontuação
        </h2>
        <Scores league={selectedLeague} />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-1">
          📈 Jogos
        </h2>
        <Summary league={selectedLeague} />
      </div>

      {/* Sliding Side Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Liga:</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            &times;
          </button>
        </div>
        <div className="p-4 space-y-2">
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => handleSelectLeague(league)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                selectedLeague === league
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              {league}
            </button>
          ))}
        </div>
      </div>

      {/* Background overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
