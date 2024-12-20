import express from 'express';
import { saveScore, getTopScores } from '../services/scoreService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userName, score } = req.body;
    if (!userName || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid score data' });
    }
    
    await saveScore({ userName, score });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

router.get('/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const scores = await getTopScores(limit);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top scores' });
  }
});

export default router;