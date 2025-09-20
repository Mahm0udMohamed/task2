import React, { useState } from "react";
import CamelCharacter from "./CamelCharacter";
import { QuestionCategories, QuestionCategory } from "../types";

interface StartScreenProps {
  onStart: (numberOfQuestions: number, category: QuestionCategory) => void;
}

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z"
      clipRule="evenodd"
    />
  </svg>
);

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [category, setCategory] = useState<QuestionCategory>(
    QuestionCategories.GENERAL
  );

  const questionOptions = [5, 10, 15];
  const categoryOptions = Object.values(QuestionCategories);

  return (
    <div className="relative text-center text-slate-800 flex flex-col items-center animate-fade-in z-20">
      <CamelCharacter className="w-48 h-48 mb-[-20px] drop-shadow-lg" />
      <h1
        className="text-5xl md:text-6xl font-black text-white drop-shadow-lg mb-2"
        style={{ textShadow: "4px 4px 0px #EE9483" }}
      >
        مغامرات المعرفة
      </h1>
      <p className="text-lg md:text-xl font-bold text-yellow-100/90 mb-6 max-w-md">
        هل أنت مستعد لاختبار معلوماتك عن مملكتنا الحبيبة في ليلة صحراوية ساحرة؟
      </p>

      <div className="mb-6 w-full max-w-sm">
        <p className="font-bold text-yellow-100/90 mb-3 text-xl">
          اختر نوع الأسئلة:
        </p>
        <div className="grid grid-cols-3 gap-2">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-md font-bold py-2 px-2 rounded-full border-b-4 transition-all duration-200 ease-in-out transform active:scale-100 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                category === cat
                  ? "bg-yellow-100 text-[#43417A] border-yellow-300 ring-yellow-200"
                  : "bg-[#43417A]/50 text-white border-[#232946]/50 hover:bg-[#43417A]/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 w-full max-w-sm">
        <p className="font-bold text-yellow-100/90 mb-3 text-xl">
          اختر عدد الأسئلة:
        </p>
        <div className="flex justify-center gap-3">
          {questionOptions.map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={`w-24 text-2xl font-bold py-2 px-4 rounded-full border-b-4 transition-all duration-200 ease-in-out transform active:scale-100 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                questionCount === count
                  ? "bg-yellow-100 text-[#43417A] border-yellow-300 ring-yellow-200"
                  : "bg-[#43417A]/50 text-white border-[#232946]/50 hover:bg-[#43417A]/80"
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(questionCount, category)}
        className="w-full max-w-xs text-3xl font-bold bg-[#EE9483] text-white py-4 px-8 rounded-full border-b-8 border-[#D67C6B] hover:bg-[#F2A496] transition-all duration-200 ease-in-out transform active:scale-100 active:border-b-4 focus:outline-none focus:ring-4 focus:ring-[#F0A07B]/50 flex items-center justify-center gap-3"
      >
        <PlayIcon className="w-8 h-8" />
        <span>ابدأ اللعبة!</span>
      </button>
    </div>
  );
};

export default StartScreen;
