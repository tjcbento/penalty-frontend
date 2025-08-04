import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

function ScoresTable({ league }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!league) return; // Don't fetch without a league

    setLoading(true);

    fetch(`${BACKEND_URL}/scores?league=${encodeURIComponent(league)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch scores");
        return res.json();
      })
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching scores:", err);
        setScores([]);
        setLoading(false);
      });
  }, [league]);

  if (loading)
    return <div className="text-center text-gray-600">Loading scores...</div>;

  if (!scores.length)
    return <div className="text-center text-gray-600">No scores found.</div>;

  return (
    <div className="overflow-x-auto max-w-4xl mx-auto p-4">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <thead>
          <tr>
            {/* Position column header intentionally left blank */}
            <th className="w-12 p-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400"></th>
            <th className="p-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
              Nome
            </th>
            <th className="p-3 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
              Pontos
            </th>
            <th className="p-3 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
              Apostas Certas
            </th>
            <th className="p-3 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
              Saldo Final
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr
              key={score.username || index}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                {index + 1}
              </td>
              <td className="p-3 text-left text-gray-600 dark:text-gray-300">
                {score.name || score.username || "—"}
              </td>
              <td className="p-3 text-center text-gray-600 dark:text-gray-300">
                {score.score ?? 0}
              </td>
              <td className="p-3 text-center text-gray-600 dark:text-gray-300">
                {score.correct_bets ?? 0}
              </td>
              <td className="p-3 text-center text-gray-600 dark:text-gray-300">
                {score.final_balance ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoresTable;
