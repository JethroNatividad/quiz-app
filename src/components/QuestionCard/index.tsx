import React from 'react';
import { Answer } from '../../App';
interface Props {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answer | undefined;
  questionNum: number;
  totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({
  answers,
  callback,
  question,
  questionNum,
  totalQuestions,
  userAnswer,
}) => {
  return (
    <div>
      <p>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <div>
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
