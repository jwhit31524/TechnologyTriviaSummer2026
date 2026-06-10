import { Router } from 'express';
import { getInfo, getQuestions, saveSession } from '../controllers/gameController.js';

const router = Router();

router.get('/info', getInfo);
router.get('/questions', getQuestions);
router.post('/session', saveSession);

export default router;
