import db from './database.js';

export default class Question {
  static getAll() {
    const questions = db.prepare('SELECT * FROM questions').all();
    return questions.map(q => ({
      ...q,
      answers: db.prepare('SELECT * FROM answers WHERE question_id = ?').all(q.id),
    }));
  }

  static getShuffled() {
    const questions = Question.getAll();
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }
}
