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

const CheckIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const XIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
);

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
            return "bg-gradient-to-br from-[#4f4c8a] to-[#3a3768] hover:from-[#5f5c9a] hover:to-[#4a4778] text-white border-white/10";
        }

        const isCorrect = option === question.correctAnswer;
        const isSelected = option === selectedAnswer;

        if (isCorrect) {
            return "bg-gradient-to-br from-green-500 to-green-700 text-white border-green-400 animate-pulse";
        }
        if (isSelected && !isCorrect) {
            return "bg-gradient-to-br from-red-500 to-red-700 text-white border-red-400";
        }
        return "bg-white/10 text-white/50 border-transparent";
    };

    return (
        <div className="w-full flex flex-col h-full animate-fade-in-up">
            <div className="flex justify-between items-center text-yellow-100/90 font-bold text-xl p-2">
                <div className="flex items-center gap-2">
                    <HashtagIcon className="w-6 h-6" />
                    <span>{questionNumber} / {totalQuestions}</span>
                </div>
                <div className="flex items-center gap-2">
                    <StarIcon className="w-6 h-6" />
                    <span>{score}</span>
                </div>
            </div>

            <div className="w-full bg-black/20 rounded-full h-3 border border-white/20 p-0.5 my-4">
                <div className="bg-gradient-to-r from-teal-400 to-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
            </div>
            
            <div className="flex-grow flex items-center justify-center py-4">
                 <h2 className="text-3xl md:text-4xl font-black text-white text-center" style={{ textShadow: '0 0 10px rgba(254, 253, 224, 0.5), 0 0 20px rgba(238, 148, 131, 0.5)' }}>
                    {question.questionText}
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                {question.options.map((option) => {
                     const isCorrect = option === question.correctAnswer;
                     const isSelected = option === selectedAnswer;

                    return (
                        <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            disabled={!!selectedAnswer}
                            className={`flex items-center justify-between w-full text-lg font-bold p-4 rounded-full border transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 disabled:cursor-not-allowed disabled:transform-none ${getButtonClass(option)}`}
                        >
                            <span>{option}</span>
                             <div className="w-8 h-8">
                                {selectedAnswer && isCorrect && isSelected && <CheckIcon className="w-8 h-8 text-white"/>}
                                {selectedAnswer && isCorrect && !isSelected && <CheckIcon className="w-8 h-8 text-white"/>}
                                {selectedAnswer && isSelected && !isCorrect && <XIcon className="w-8 h-8 text-white"/>}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionCard;
