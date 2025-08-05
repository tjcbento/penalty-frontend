export default function WorkingOnIt() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-300 to-pink-300 p-6">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <svg
          className="w-40 h-40 mb-6"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Cartoon-style smiley face */}
          <circle cx="32" cy="32" r="30" fill="#FFDA6B" stroke="#F4A261" strokeWidth="2" />
          <circle cx="22" cy="24" r="6" fill="#fff" />
          <circle cx="42" cy="24" r="6" fill="#fff" />
          <circle cx="22" cy="24" r="3" fill="#000" />
          <circle cx="42" cy="24" r="3" fill="#000" />
          <path
            d="M20 40 Q32 50 44 40"
            stroke="#000"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="text-3xl font-bold text-purple-700 text-center">Working on it</h1>
        <p className="mt-2 text-purple-600 text-center text-sm">Please check back soon!</p>
      </div>
    </div>
  );
}
