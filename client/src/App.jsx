import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import ContactScreen from './components/ContactScreen';

function App() {
  const [screen, setScreen] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [dataInfo, setDataInfo] = useState({ dataStructure: 'Array', database: 'SQLite' });

  useEffect(() => {
    fetch('/api/info')
      .then(r => r.json())
      .then(data => setDataInfo(data))
      .catch(() => {});
  }, []);

  const startGame = () => {
    fetch('/api/questions')
      .then(r => r.json())
      .then(data => {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setScore(0);
        setScreen('game');
      })
      .catch(() => alert('Could not connect to server. Make sure the server is running.'));
  };

  const handleAnswer = (isCorrect) => {
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    if (currentIndex >= questions.length - 1) {
      fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: newScore, totalQuestions: questions.length }),
      }).catch(() => {});
      setScreen('results');
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  return (
    <div className="app">
      {screen === 'home' && (
        <HomeScreen onBegin={startGame} dataInfo={dataInfo} onTryToContact={() => setScreen('contact')} />
      )}
      {screen === 'contact' && (
        <ContactScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'game' && questions.length > 0 && (
        <QuestionScreen
          key={currentIndex}
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {screen === 'results' && (
        <ResultScreen
          score={score}
          total={questions.length}
          onPlayAgain={startGame}
          onEndGame={() => setScreen('home')}
        />
      )}
    </div>
  );
}

export default App;
