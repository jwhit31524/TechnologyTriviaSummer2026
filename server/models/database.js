import { DatabaseSync } from 'node:sqlite';
import { join } from 'path';

const db = new DatabaseSync(join(import.meta.dirname, '../trivia.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_text TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct INTEGER NOT NULL DEFAULT 0,
    answer_letter TEXT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id)
  );

  CREATE TABLE IF NOT EXISTS game_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    played_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const questionCount = db.prepare('SELECT COUNT(*) as n FROM questions').get().n;

if (questionCount === 0) {
  const insertQ = db.prepare('INSERT INTO questions (question_text) VALUES (?)');
  const insertA = db.prepare(
    'INSERT INTO answers (question_id, answer_text, is_correct, answer_letter) VALUES (?, ?, ?, ?)'
  );

  const seedData = [
    {
      text: 'What is the difference between DDR4 and DDR5 RAM?',
      answers: [
        {
          letter: 'A',
          text: 'DDR4 typically runs at 2133–3200 MHz (with overclocked kits going higher), while DDR5 starts at 4800 MHz and commonly reaches 6400 MHz or beyond',
          correct: 1,
        },
        { letter: 'B', text: 'There is no difference', correct: 0 },
        { letter: 'C', text: 'DDR4 is newer', correct: 0 },
      ],
    },
    {
      text: 'What is Microsoft Azure?',
      answers: [
        { letter: 'A', text: 'It is like Active Directory', correct: 0 },
        {
          letter: 'B',
          text: "Microsoft Azure is Microsoft's cloud computing platform — essentially a massive network of data centers around the world that you can rent computing resources from over the internet, instead of buying and maintaining your own hardware.",
          correct: 1,
        },
        { letter: 'C', text: 'It is like Microsoft Office 365', correct: 0 },
      ],
    },
    {
      text: 'What is Microsoft Intune?',
      answers: [
        { letter: 'A', text: 'It is like Microsoft Excel', correct: 0 },
        { letter: 'B', text: 'It is like iTunes', correct: 0 },
        {
          letter: 'C',
          text: 'Microsoft Intune is a cloud-based device and application management platform — it lets IT administrators manage and secure devices, apps, and data across an organization from a single central console. Intune gives IT teams control over the devices employees use for work — whether company-owned or personal — ensuring they meet security policies before accessing company resources.',
          correct: 1,
        },
      ],
    },
    {
      text: 'What is firmware?',
      answers: [
        {
          letter: 'A',
          text: 'Firmware is low-level software that is permanently embedded into a hardware device to control how that device operates. It sits between raw hardware and higher-level software, acting as the built-in "brain" of a device.',
          correct: 1,
        },
        { letter: 'B', text: 'Firmware is like software', correct: 0 },
        { letter: 'C', text: 'Firmware is similar to hardware', correct: 0 },
      ],
    },
  ];

  db.exec('BEGIN');
  try {
    for (const q of seedData) {
      const { lastInsertRowid } = insertQ.run(q.text);
      for (const a of q.answers) {
        insertA.run(lastInsertRowid, a.text, a.correct, a.letter);
      }
    }
    db.exec('COMMIT');
    console.log('Database seeded with trivia questions.');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

export default db;
