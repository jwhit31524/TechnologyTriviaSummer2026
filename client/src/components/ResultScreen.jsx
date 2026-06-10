import { useMemo } from 'react';
import './ResultScreen.css';

const CONFETTI_COLORS = ['#00d4ff', '#c026d3', '#ffd700', '#22c55e', '#ff6b35', '#f472b6'];

function ResultScreen({ score, total, onPlayAgain, onEndGame }) {
  const pct = Math.round((score / total) * 100);

  const message =
    pct === 100 ? "Perfect score! You're a tech genius! 🧠" :
    pct >= 75   ? 'Great work! Almost a perfect score! 🌟' :
    pct >= 50   ? 'Not bad! Keep studying and try again! 📚' :
                  "Keep at it — you'll get there! 💪";

  const confetti = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => ({
      left: `${(i * 13 + 5) % 100}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      duration: `${2.2 + (i * 0.19) % 2.8}s`,
      delay: `${(i * 0.12) % 2}s`,
      width: `${6 + (i % 5)}px`,
      height: `${6 + (i % 4)}px`,
      borderRadius: i % 3 === 0 ? '50%' : '2px',
    })), []
  );

  return (
    <div className="result-screen">
      <div className="confetti-layer" aria-hidden="true">
        {confetti.map((c, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: c.left,
              background: c.color,
              animationDuration: c.duration,
              animationDelay: c.delay,
              width: c.width,
              height: c.height,
              borderRadius: c.borderRadius,
            }}
          />
        ))}
      </div>

      <div className="result-card">
        <div className="trophy" aria-label="Trophy">🏆</div>
        <h1 className="good-job-text">Good Job!</h1>

        <div className="score-block">
          <span className="score-fraction">{score}/{total}</span>
          <span className="score-pct">{pct}%</span>
        </div>

        <p className="result-message">{message}</p>

        <div className="result-btns">
          <button className="btn-play-again" onClick={onPlayAgain}>
            ↺ Play Again
          </button>
          <button className="btn-end-game" onClick={onEndGame}>
            ✕ End Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
