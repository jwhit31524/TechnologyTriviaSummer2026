import { useState } from 'react';
import './QuestionScreen.css';

function QuestionScreen({ question, questionNumber, total, onAnswer }) {
  const [selectedId, setSelectedId] = useState(null);
  const [locked, setLocked] = useState(false);

  const handleSelect = (answer) => {
    if (locked) return;
    setSelectedId(answer.id);
    setLocked(true);
    setTimeout(() => {
      onAnswer(answer.is_correct === 1);
    }, 1600);
  };

  const getAnswerClass = (answer) => {
    if (!selectedId) return '';
    if (answer.id === selectedId) {
      return answer.is_correct === 1 ? 'correct' : 'wrong';
    }
    if (answer.is_correct === 1) return 'reveal';
    return 'faded';
  };

  return (
    <div className="question-screen">
      <div className="q-header">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(questionNumber / total) * 100}%` }}
          />
        </div>
        <span className="q-counter">Question {questionNumber} of {total}</span>
      </div>

      <div className="q-card">
        <div className="q-badge">Q{questionNumber}</div>
        <h2 className="q-text">{question.question_text}</h2>

        <div className="answers-list">
          {question.answers.map(answer => (
            <button
              key={answer.id}
              className={`answer-btn ${getAnswerClass(answer)}`}
              onClick={() => handleSelect(answer)}
              disabled={locked}
            >
              <span className="answer-letter">{answer.answer_letter}</span>
              <span className="answer-body">{answer.answer_text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;
