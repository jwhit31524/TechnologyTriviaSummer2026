import Question from '../models/Question.js';
import db from '../models/database.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  family: 4,
  tls: { rejectUnauthorized: false },
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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

export const saveContact = async (req, res) => {
  try {
    const { firstName, lastName, email, question } = req.body;

    db.prepare(
      'INSERT INTO contact_submissions (first_name, last_name, email, question) VALUES (?, ?, ?, ?)'
    ).run(firstName, lastName, email, question);

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We received your message',
      text: `Hi ${firstName},\n\nThank you for reaching out! We received your message and will try to respond within 12 business hours.\n\nYour question:\n${question}\n\nBest regards,\nTechnology Trivia Team`,
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New contact submission from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nQuestion:\n${question}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save contact submission' });
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
