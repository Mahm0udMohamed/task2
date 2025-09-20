import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  onAnswer: (answer: string) => void;
  userAnswer: string | undefined;
}

const StarIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

const HashtagIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
        <path d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h4.5c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125Z" />
        <path d="M10.125 12.75h-4.5c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h4.5c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125Z" />
        <path d="M19.875 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h4.5c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125Z" />
        <path d="M19.875 12.75h-4.5c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h4.5c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125Z" />
    </svg>
);


const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, totalQuestions, score, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    useEffect(() => {
        setSelectedAnswer(null);
    }, [question]);
    
    const handleOptionClick = (option: string) => {
        if (selectedAnswer) return;
        setSelectedAnswer(option);
        onAnswer(option);
    };

    const getButtonClass = (option: string) => {
        if (!selectedAnswer) {
            return "bg-white/70 text-sky-900 hover:bg-white border-transparent";
        }

        const isCorrect = option === question.correctAnswer;
        const isSelected = option === selectedAnswer;

        if (isCorrect) {
            return "bg-green-500 text-white border-green-700";
        }
        if (isSelected && !isCorrect) {
            return "bg-red-500 text-white border-red-700";
        }
        return "bg-white/40 text-sky-900/50 border-transparent";
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl flex flex-col h-full animate-fade-in-up">
            <div className="flex justify-between items-center text-sky-800 font-bold text-lg">
                <div className="flex items-center gap-2 bg-white/50 py-1 px-3 rounded-full">
                    <HashtagIcon className="w-5 h-5" />
                    <span>{questionNumber} / {totalQuestions}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 py-1 px-3 rounded-full">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span>{score}</span>
                </div>
            </div>

            <div className="w-full bg-sky-200/70 rounded-full h-3 my-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
            </div>
            
            <div className="flex-grow flex items-center justify-center py-4">
                 <h2 className="text-3xl md:text-4xl font-black text-sky-900 text-center">
                    {question.questionText}
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
                {question.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        disabled={!!selectedAnswer}
                        className={`w-full text-lg font-bold p-4 md:p-5 rounded-2xl border-b-4 transition-all duration-300 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-sky-300/50 ${getButtonClass(option)}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;