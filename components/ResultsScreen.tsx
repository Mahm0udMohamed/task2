import React from "react";
import CamelCharacter from "./CamelCharacter";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  let message = "";
  let messageColor = "";
  let isHappy = true;

  if (percentage >= 80) {
    message = "ممتاز! أنت بطل المعرفة!";
    messageColor = "text-[#58B09C]";
    isHappy = true;
  } else if (percentage >= 50) {
    message = "رائع! معلوماتك قوية!";
    messageColor = "text-blue-300";
    isHappy = true;
  } else {
    message = "محاولة جيدة! استمر في التعلم.";
    messageColor = "text-yellow-300";
    isHappy = false;
  }

  return (
    <div className="relative text-center text-slate-800 flex flex-col items-center animate-fade-in z-20">
      <CamelCharacter
        className="w-48 h-48 mb-[-20px] drop-shadow-lg"
        isHappy={isHappy}
      />
      <h2
        className={`text-4xl md:text-5xl font-black ${messageColor} drop-shadow-lg mb-4`}
        style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
      >
        {message}
      </h2>
      <div className="bg-[#FEFBF6] p-6 rounded-3xl shadow-xl w-full max-w-sm mb-8 border-8 border-[#AD8154]/50">
        <p className="text-2xl font-bold mb-2 text-[#232946]">
          نتيجتك النهائية هي
        </p>
        <p
          className="text-7xl font-black text-[#232946]"
          style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
        >
          {score} <span className="text-4xl">/ {totalQuestions}</span>
        </p>
      </div>
      <button
        onClick={onRestart}
        className="w-full max-w-xs text-3xl font-bold bg-[#EE9483] text-white py-4 px-8 rounded-full border-b-8 border-[#D67C6B] hover:bg-[#F2A496] transition-all duration-200 ease-in-out transform active:scale-100 active:border-b-4 focus:outline-none focus:ring-4 focus:ring-[#F0A07B]/50"
      >
        العب مرة أخرى
      </button>
    </div>
  );
};

export default ResultsScreen;
