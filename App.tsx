import React, { useState, useCallback, useEffect } from "react";
import { Question, GameStatus, QuestionCategory } from "./types";
import { generateQuizQuestions } from "./services/geminiService";
import StartScreen from "./components/StartScreen";
import QuestionCard from "./components/QuestionCard";
import ResultsScreen from "./components/ResultsScreen";
import Loader from "./components/Loader";

const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    className="absolute bg-[#FEFDE0] rounded-full animate-twinkle"
    style={style}
  ></div>
);

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Idle);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const startGame = useCallback(
    async (numberOfQuestions: number, category: QuestionCategory) => {
      setGameStatus(GameStatus.Fetching);
      setUserAnswers([]);
      setScore(0);
      setCurrentQuestionIndex(0);
      const fetchedQuestions = await generateQuizQuestions(
        numberOfQuestions,
        category
      );
      if (fetchedQuestions && fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setGameStatus(GameStatus.Active);
      } else {
        console.error("Failed to load questions.");
        setGameStatus(GameStatus.Idle);
      }
    },
    []
  );

  const handleAnswer = useCallback(
    (answer: string) => {
      const isCorrect =
        questions[currentQuestionIndex].correctAnswer === answer;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setUserAnswers((prev) => [...prev, answer]);

      setTimeout(() => {
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestionIndex(nextQuestion);
        } else {
          setGameStatus(GameStatus.Finished);
        }
      }, 1500);
    },
    [currentQuestionIndex, questions]
  );

  const restartGame = useCallback(() => {
    setGameStatus(GameStatus.Idle);
  }, []);

  const renderGameScreen = () => {
    switch (gameStatus) {
      case GameStatus.Idle:
        return <StartScreen onStart={startGame} />;
      case GameStatus.Fetching:
        return <Loader />;
      case GameStatus.Active:
        return (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            score={score}
            onAnswer={handleAnswer}
            userAnswer={userAnswers[currentQuestionIndex]}
          />
        );
      case GameStatus.Finished:
        return (
          <ResultsScreen
            score={score}
            totalQuestions={questions.length}
            onRestart={restartGame}
          />
        );
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    style: {
      top: `${Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 4}s`,
    },
  }));

  return (
    <div className="relative h-screen bg-gradient-to-b from-[#232946] to-[#43417A] text-white flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-[#EE9483] selection:text-white">
      {stars.map((star) => (
        <Star key={star.id} style={star.style} />
      ))}
      <div className="relative z-10 w-full max-w-md mx-auto flex-grow flex flex-col justify-center">
        {renderGameScreen()}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#D4A373] z-0"
        style={{ clipPath: "ellipse(100% 60% at 50% 100%)" }}
      ></div>
    </div>
  );
};

export default App;
