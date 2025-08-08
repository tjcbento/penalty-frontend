import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("pt-PT", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const formatTime = (iso) => {
  try {
    return new Date(iso).toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const groupByDate = (matches) => {
  return matches.reduce((acc, m) => {
    const d = formatDate(m.date);
    if (!acc[d]) acc[d] = [];
    acc[d].push(m);
    return acc;
  }, {});
};

function PredictionsTable({ league }) {
  const [matches, setMatches] = useState([]);
  const [matchdays, setMatchdays] = useState([]);
  const [selectedMatchday, setSelectedMatchday] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const userPoints = users.reduce((acc, user) => {
    acc[user] = Math.floor(Math.random() * 100);
    return acc;
  }, {});

  useEffect(() => {
    if (!league) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/summary?league=${league}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (!Array.isArray(data.matches)) throw new Error("Malformed data: matches is not an array");
        if (!Array.isArray(data.matchdays)) throw new Error("Malformed data: matchdays is not an array");
        if (!Array.isArray(data.users)) throw new Error("Malformed data: users is not an array");

        setMatches(data.matches);
        setMatchdays(data.matchdays);
        setUsers(data.users);

        setSelectedMatchday(data.currentMatchday || (data.matchdays.length > 0 ? data.matchdays[0] : null));
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, [league]);

  if (!league) return <p>Please select a league.</p>;
  if (error) return <p>Error loading matches: {error}</p>;
  if (!matches.length) return <p>Loading matches...</p>;

  const filteredMatches = selectedMatchday
    ? matches.filter((m) => String(m.matchday) === String(selectedMatchday))
    : matches;

  const grouped = groupByDate(filteredMatches);
  const isFutureMatch = (matchDate) => new Date(matchDate) > new Date();

  const handleMatchdaySelect = (mday) => {
    setSelectedMatchday(mday);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative pt-16">
      {/* Matchday selector */}
      <div className="absolute top-2 right-2 flex items-center space-x-2">
        <span className="font-semibold">Jornada:</span>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {selectedMatchday || "Select"}
        </button>
      </div>

      {/* Matchday menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Jornada</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            &times;
          </button>
        </div>
        <div className="p-4 grid grid-cols-4 gap-2">
          {matchdays.map((mday) => (
            <button
              key={mday}
              onClick={() => handleMatchdaySelect(mday)}
              className={`w-full text-center px-4 py-2 rounded-lg transition font-semibold text-lg ${mday === selectedMatchday
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
                }`}
            >
              {mday}
            </button>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar border border-gray-300 rounded">
        <table
          className="table-auto border-collapse min-w-max text-center"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr className="bg-gray-100">
              <th
                className="sticky left-0 border border-gray-300 px-4 py-2 bg-gray-100 z-20 text-left"
                style={{ minWidth: 250 }}
              />
              {users.map((user) => (
                <th
                  key={user}
                  className="border border-gray-300 px-4 py-2 whitespace-nowrap"
                  style={{ width: 80, minWidth: 80 }}
                >
                  {user}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).map(([date, matchesOnDate]) => (
              <React.Fragment key={date}>
                <tr className="bg-gray-50">
                  <td
                    className="sticky left-0 border border-gray-300 px-4 py-2 font-semibold bg-gray-50 z-10 text-left"
                    style={{ minWidth: 250, textAlign: "left" }}  // explicitly left align
                  >
                    {date}
                  </td>
                  {users.map((u) => (
                    <td
                      key={`date-${date}-${u}`}
                      className="border border-gray-300 px-4 py-2 bg-gray-50"
                      style={{ width: 80 }}
                    />
                  ))}
                </tr>

                {matchesOnDate.map(({ id, home, away, date: mDate, odds = {}, outcome = "" }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td
                      className="sticky left-0 border border-gray-300 px-4 py-2 bg-white z-10 text-left"
                      style={{ minWidth: 250 }}
                    >
                      <div>
                        <span className="text-gray-500 mr-2">{formatTime(mDate)}</span>
                        {home} - {away}
                      </div>
                      <div className="flex gap-2 mt-1 text-sm font-semibold text-gray-700">
                        {["1", "x", "2"].map((label) => (
                          <button
                            key={label}
                            className={`flex-1 py-1.5 rounded border text-xs ${label === outcome ? "bg-green-500 text-white font-bold" : ""
                              }`}
                          >
                            {label.toUpperCase()}: {isNaN(odds[label]) || odds[label] === undefined ? "???" : odds[label]}
                          </button>
                        ))}

                      </div>
                    </td>
                    {users.map((user) => {
                      const prediction = isFutureMatch(mDate) ? "" : "-";
                      const correct = prediction && prediction.toLowerCase() === outcome.toLowerCase();
                      return (
                        <td
                          key={`${id}-${user}`}
                          className="border border-gray-300 px-2 py-2"
                          style={{ width: 80 }}
                        >
                          <div className="flex justify-center">
                            <span
                              className={`w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-sm ${prediction
                                ? correct
                                  ? "bg-green-500 text-white font-bold"
                                  : "text-gray-700"
                                : "text-gray-300"
                                }`}
                            >
                              {prediction.toUpperCase()}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {/* Points row */}
            <tr className="bg-gray-200 font-semibold">
              <td
                className="sticky left-0 border border-gray-300 px-4 py-2 bg-gray-200 z-10 text-left"
                style={{ minWidth: 250 }}
              />
              {users.map((user) => (
                <td
                  key={`points-${user}`}
                  className="border border-gray-300 px-4 py-2 text-center bg-gray-200"
                  style={{ width: 80, minWidth: 80 }}
                >
                  {userPoints[user]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PredictionsTable;
