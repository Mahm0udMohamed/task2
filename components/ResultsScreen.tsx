import React from 'react';
import CamelCharacter from './CamelCharacter';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRestart }) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = "";
    let messageColor = "";
    let isHappy = true;

    if (percentage >= 80) {
        message = "ممتاز! أنت بطل المعرفة!";
        messageColor = "text-green-600";
        isHappy = true;
    } else if (percentage >= 50) {
        message = "رائع! معلوماتك قوية!";
        messageColor = "text-sky-700";
        isHappy = true;
    } else {
        message = "محاولة جيدة! استمر في التعلم.";
        messageColor = "text-orange-600";
        isHappy = false;
    }

    return (
        <div className="relative text-center text-slate-800 flex flex-col items-center z-20">
            <CamelCharacter className="w-48 h-48 mb-[-20px] drop-shadow-lg" isHappy={isHappy} />
            <h2 className={`text-4xl md:text-5xl font-black ${messageColor} drop-shadow-lg mb-4`} style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.5)' }}>
                {message}
            </h2>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl w-full max-w-sm mb-8 border-4 border-white/50">
                <p className="text-2xl font-bold mb-2 text-sky-900">نتيجتك النهائية هي</p>
                <p className="text-7xl font-black text-sky-900" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
                    {score} <span className="text-4xl">/ {totalQuestions}</span>
                </p>
            </div>
            <button
                onClick={onRestart}
                 className="w-full max-w-xs text-3xl font-bold bg-green-500 text-white py-4 px-8 rounded-full border-b-8 border-green-700 hover:bg-green-600 transition-all duration-200 ease-in-out active:border-b-4 focus:outline-none focus:ring-4 focus:ring-green-300/50"
            >
                العب مرة أخرى
            </button>
        </div>
    );
};

export default ResultsScreen;