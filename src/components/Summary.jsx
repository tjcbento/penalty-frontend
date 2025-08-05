import React, { useState } from "react";

// Sample users and jornadas
const mockUsers = ["Bento", "Mangueira", "Mikail"];
const jornadas = Array.from({ length: 34 }, (_, i) => `${i + 1}`);

// Matches (can later be filtered by jornada)
const mockMatches = [
  {
    id: 1,
    home: "Benfica",
    away: "Rio Ave",
    odds: { 1: 2.5, x: 3.1, 2: 2.8 },
    outcome: "1",
  },
  {
    id: 2,
    home: "Vitoria FC",
    away: "Boavista",
    odds: { 1: 1.9, x: 3.4, 2: 3.7 },
    outcome: "2",
  },
  {
    id: 3,
    home: "Porto",
    away: "Sporting",
    odds: { 1: 2.2, x: 3.2, 2: 3.1 },
    outcome: "x",
  },
];

// Predictions
const mockPredictions = {
  1: { Bento: "1", Mangueira: "x", Mikail: "2" },
  2: { Bento: "", Mangueira: "2", Mikail: "1" },
  3: { Bento: "x", Mangueira: "", Mikail: "" },
};

// Helper: Calculate points
const calculatePoints = () => {
  const points = {};
  mockUsers.forEach((user) => (points[user] = 0));

  mockMatches.forEach(({ id, odds, outcome }) => {
    const predictions = mockPredictions[id];
    mockUsers.forEach((user) => {
      const prediction = predictions?.[user]?.toLowerCase();
      if (prediction === outcome.toLowerCase()) {
        points[user] += odds[prediction];
      }
    });
  });

  return points;
};

// Helper: Format odds
const formatOdds = (odd) => Number(odd).toFixed(2);

// Component
function PredictionsTable() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedJornada, setSelectedJornada] = useState(jornadas[0]);

  const userPoints = calculatePoints();
  const maxScore = Math.max(...Object.values(userPoints));
  const minScore = Math.min(...Object.values(userPoints));

  const userColumnWidth = "w-[100px]";
  const matchColumnWidth = "w-[180px] min-w-[180px] max-w-[180px]";

  const handleSelectJornada = (jornada) => {
    setSelectedJornada(jornada);
    setIsMenuOpen(false);
    // Optionally: update match list here
  };

  return (
    <>
      <div className="relative">
        {/* Jornada button - absolutely positioned top-right */}
        <div className="absolute top-2 right-2">
          <span className="font-semibold mr-2">Jornada:</span>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {selectedJornada}
          </button>
        </div>

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Jornada:</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-light"
            >
              &times;
            </button>
          </div>
          <div className="p-4 space-y-2">
            {jornadas.map((jornada) => (
              <button
                key={jornada}
                onClick={() => handleSelectJornada(jornada)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  selectedJornada === jornada
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {jornada}
              </button>
            ))}
          </div>
        </div>

        {/* Blurry background overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Table wrapper with padding-top to create space below the button */}
        <div className="pt-16 overflow-auto max-w-full">
          <table className="table-auto border-collapse border border-gray-300 w-full text-center">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className={`border border-gray-300 px-4 py-2 sticky left-0 bg-gray-100 z-10 ${matchColumnWidth}`}
                />
                {mockUsers.map((user) => (
                  <th
                    key={user}
                    className={`border border-gray-300 px-2 py-2 ${userColumnWidth}`}
                  >
                    {user}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockMatches.map(({ id, home, away, odds, outcome }) => (
                <React.Fragment key={id}>
                  <tr className="hover:bg-gray-50">
                    <td
                      className={`border border-gray-300 px-4 py-2 font-semibold sticky left-0 bg-white z-10 text-left ${matchColumnWidth}`}
                    >
                      <div>
                        {home} vs {away}
                      </div>
                      <div className="flex gap-2 mt-1 text-sm font-semibold text-gray-700">
                        {["1", "x", "2"].map((label) => (
                          <button
                            key={label}
                            className={`flex-1 py-1.5 rounded border text-xs ${
                              label === outcome
                                ? "bg-green-500 text-white font-bold"
                                : ""
                            }`}
                          >
                            {label.toUpperCase()}: {formatOdds(odds[label])}
                          </button>
                        ))}
                      </div>
                    </td>
                    {mockUsers.map((user) => {
                      const prediction = mockPredictions[id]?.[user] || "";
                      const correct =
                        prediction.toLowerCase() === outcome.toLowerCase();
                      return (
                        <td
                          key={user}
                          className={`border border-gray-300 px-2 py-2 ${userColumnWidth}`}
                        >
                          <div className="flex justify-center">
                            <span
                              className={`w-8 h-8 flex items-center justify-center rounded border text-sm ${
                                prediction
                                  ? correct
                                    ? "bg-green-500 text-white font-bold"
                                    : "text-gray-700 border-gray-300"
                                  : "text-gray-300 border-gray-200"
                              }`}
                            >
                              {prediction.toUpperCase()}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}

              {/* Points row */}
              <tr className="bg-gray-200">
                <td
                  className={`border border-gray-300 px-4 py-2 sticky left-0 bg-gray-200 z-10 text-left ${matchColumnWidth}`}
                />
                {mockUsers.map((user) => {
                  const score = userPoints[user];
                  const isMax = score === maxScore;
                  const isMin = score === minScore;
                  return (
                    <td
                      key={user}
                      className={`border border-gray-300 px-2 py-2 select-none ${userColumnWidth} ${
                        isMax
                          ? "text-green-600 font-bold"
                          : isMin
                          ? "text-orange-500"
                          : ""
                      }`}
                    >
                      {score.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PredictionsTable;
