import { Router } from 'express';
import { getInfo, getQuestions, saveSession, saveContact } from '../controllers/gameController.js';

const router = Router();

router.get('/info', getInfo);
router.get('/questions', getQuestions);
router.post('/session', saveSession);
router.post('/contact', saveContact);

export default router;
