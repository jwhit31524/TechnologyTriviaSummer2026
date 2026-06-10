import Question from '../models/Question.js';
import db from '../models/database.js';

export const getInfo = (_req, res) => {
  res.json({ dataStructure: 'Array', database: 'SQLite' });
};

export const getQuestions = (_req, res) => {
  try {
    const questions = Question.getShuffled();
    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

export const saveSession = (req, res) => {
  try {
    const { score, totalQuestions } = req.body;
    const { lastInsertRowid } = db
      .prepare('INSERT INTO game_sessions (score, total_questions) VALUES (?, ?)')
      .run(score, totalQuestions);
    res.json({ id: lastInsertRowid, score, totalQuestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save session' });
  }
};
