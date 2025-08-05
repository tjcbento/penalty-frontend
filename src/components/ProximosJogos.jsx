import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { toast, Toaster } from "react-hot-toast";

function ProximosJogos() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BACKEND_URL}/nextmatches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!games.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [games]);

  const nextGame = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  const prevGame = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const formatOdds = (odd) => {
    const num = Number(odd);
    if (odd == null || odd === "???" || isNaN(num)) {
      return "???";
    }
    return num.toFixed(2);
  };

  const submitBet = async (id_fixture, bet, teamName) => {
    if (!token) {
      alert("You must be logged in to submit a bet.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/submitbet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_fixture, bet }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          `Error submitting bet: ${errorData.error || response.statusText}`
        );
        return;
      }

      toast.success(`Aposta em ${teamName} submetida com sucesso`);

      setGames((prevGames) => {
        const newGames = [...prevGames];
        newGames[currentIndex] = { ...newGames[currentIndex], bet };
        return newGames;
      });
    } catch (error) {
      console.error("Submit bet failed:", error);
      alert("Failed to submit bet. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (!games.length)
    return (
      <div className="text-center text-gray-600">No upcoming games found.</div>
    );

  const game = games[currentIndex];
  const predictionColor = "bg-green-600 text-white font-bold";

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-xl shadow p-6 w-80 mb-4 transition-all duration-500">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{new Date(game.date).toLocaleDateString()}</span>
            <span>
              {new Date(game.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          
          <div className="text-center mb-4 flex justify-center items-center space-x-2 font-medium text-gray-800">
            <div>{game.home_team}</div>
            <div>-</div>
            <div>{game.away_team}</div>
          </div>

          <div className="flex gap-2 text-sm font-semibold text-gray-700">
            <button
              onClick={() => submitBet(game.id_fixture, "1", game.home_team)}
              className={`flex-1 py-2 rounded border cursor-pointer ${
                game.bet?.toLowerCase() === "1"
                  ? `${predictionColor} hover:bg-green-700`
                  : "hover:bg-gray-100"
              }`}
              title={`Apostar ${game.home_team}`}
            >
              1: {formatOdds(game.odds_1)}
            </button>
            <button
              onClick={() => submitBet(game.id_fixture, "X", "Empate")}
              className={`flex-1 py-2 rounded border cursor-pointer ${
                game.bet?.toLowerCase() === "x"
                  ? `${predictionColor} hover:bg-green-700`
                  : "hover:bg-gray-100"
              }`}
              title="Apostar Empate"
            >
              X: {formatOdds(game.odds_x)}
            </button>
            <button
              onClick={() => submitBet(game.id_fixture, "2", game.away_team)}
              className={`flex-1 py-2 rounded border cursor-pointer ${
                game.bet?.toLowerCase() === "2"
                  ? `${predictionColor} hover:bg-green-700`
                  : "hover:bg-gray-100"
              }`}
              title={`Apostar ${game.away_team}`}
            >
              2: {formatOdds(game.odds_2)}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={prevGame}
            className="text-xl px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            ←
          </button>
          <button
            onClick={nextGame}
            className="text-xl px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            →
          </button>
          <button
            onClick={() => navigate("/bets")}
            className="px-4 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Mais Apostas
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          {currentIndex + 1} / {games.length}
        </div>
      </div>
    </>
  );
}

export default ProximosJogos;
