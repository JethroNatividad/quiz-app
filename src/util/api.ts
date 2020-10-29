import { shuffleArray } from '.';

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
export interface ApiQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
export type Question = ApiQuestion & { answers: string[] };
export const fetchQuestions = async (
  amount: Number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  const results: ApiQuestion[] = data.results;
  const questions: Question[] = results.map((question) => {
    return {
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    };
  });
  return questions;
};
