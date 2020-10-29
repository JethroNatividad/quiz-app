import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, Question } from './util/api';
export interface Answer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
interface GameData {
  loading: boolean;
  number: number;
  score: number;
  gameOver: boolean;
  userAnswers: Answer[];
  questions: Question[];
}
const totalQuestions = 10;
const App = () => {
  const [gameData, setGameData] = useState<GameData>({
    loading: false,
    number: 0,
    score: 0,
    gameOver: true,
    userAnswers: [],
    questions: [],
  });
  const startTrivia = async () => {
    setGameData({
      loading: true,
      number: 0,
      score: 0,
      gameOver: false,
      userAnswers: [],
      questions: [],
    });
    const newQuestions = await fetchQuestions(totalQuestions, Difficulty.EASY);
    setGameData((st) => ({
      ...st,
      questions: newQuestions,
      loading: false,
    }));
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const isCorrect =
      gameData.questions[gameData.number].correct_answer === answer;
    if (isCorrect) setGameData((st) => ({ ...st, score: st.score + 1 }));
    const userAnswer: Answer = {
      question: gameData.questions[gameData.number].question,
      answer: answer,
      correct: isCorrect,
      correctAnswer: gameData.questions[gameData.number].correct_answer,
    };
    setGameData((st) => ({
      ...st,
      userAnswers: [...st.userAnswers, userAnswer],
    }));
    if (gameData.number === totalQuestions - 1) {
      setGameData((st) => ({ ...st, gameOver: true }));
    }
  };
  const nextQuestion = () => {
    setGameData((st) => ({ ...st, number: st.number + 1 }));
  };
  console.log(gameData.questions);
  return (
    <div className='App'>
      <h1>React Quiz</h1>
      {gameData.gameOver && <button onClick={startTrivia}>Start</button>}
      {!gameData.gameOver && <p>Score: {gameData.score}</p>}
      {gameData.loading && <p>Loading . . .</p>}
      {!gameData.loading && !gameData.gameOver && (
        <QuestionCard
          answers={gameData.questions[gameData.number].answers}
          callback={checkAnswer}
          question={gameData.questions[gameData.number].question}
          questionNum={gameData.number + 1}
          totalQuestions={totalQuestions}
          userAnswer={
            gameData.userAnswers && gameData.userAnswers[gameData.number]
          }
        />
      )}
      {!gameData.loading &&
        !gameData.gameOver &&
        gameData.userAnswers.length === gameData.number + 1 &&
        gameData.number !== totalQuestions - 1 && (
          <button onClick={nextQuestion}>Next Question</button>
        )}
    </div>
  );
};

export default App;
