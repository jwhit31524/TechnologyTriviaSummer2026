import { useMemo } from 'react';
import './HomeScreen.css';

const ICONS = ['💻', '⚡', '🚀', '🔧', '📡', '🖥️'];

function HomeScreen({ onBegin, dataInfo, onTryToContact }) {
  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      left: `${(i * 17 + 3) % 100}%`,
      duration: `${3 + (i * 0.7) % 5}s`,
      delay: `${(i * 0.4) % 3}s`,
      size: `${2 + (i % 4)}px`,
      isAlt: i % 2 === 0,
    })), []
  );

  return (
    <div className="home-screen">
      <div className="particles" aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`particle${p.isAlt ? ' alt' : ''}`}
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="circuit-left" aria-hidden="true" />
      <div className="circuit-right" aria-hidden="true" />

      <div className="home-content">
        <div className="title-wrapper">
          <p className="welcome-label">Welcome to the</p>
          <h1 className="game-title">Technology Trivia Game!</h1>
          <div className="title-underline" aria-hidden="true" />
        </div>

        <div className="info-card">
          <span className="info-icon" aria-hidden="true">🗄️</span>
          <p className="info-text">
            Questions &amp; answers are stored in an{' '}
            <span className="badge badge-blue">{dataInfo.dataStructure}</span>
            {' '}data structure and saved in a{' '}
            <span className="badge badge-purple">{dataInfo.database}</span>
            {' '}database.
          </p>
        </div>

        <button className="begin-btn" onClick={onBegin}>
          <span className="btn-label">Begin Game</span>
          <span className="btn-arrow" aria-hidden="true">→</span>
        </button>

          <button className="contactus-btn" onClick={onTryToContact}>
          <span className="btn-label">Contact Us</span>
          <span className="btn-arrow" aria-hidden="true">→</span>
        </button>

        <div className="icon-row" aria-hidden="true">
          {ICONS.map((icon, i) => (
            <span
              key={i}
              className="float-icon"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
