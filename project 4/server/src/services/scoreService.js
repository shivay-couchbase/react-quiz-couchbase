import { getCluster } from '../config/database.js';

const BUCKET_NAME = process.env.BUCKET_NAME || 'quiz';

export async function saveScore(score) {
  try {
    const cluster = getCluster();
    const bucket = cluster.bucket(BUCKET_NAME);
    const collection = bucket.defaultCollection();
    
    const id = `score::${Date.now()}`;
    await collection.insert(id, {
      type: 'score',
      ...score,
      timestamp: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
}

export async function getTopScores(limit = 5) {
  try {
    const cluster = getCluster();
    const query = `
      SELECT userName, score 
      FROM ${BUCKET_NAME} 
      WHERE type = 'score' 
      ORDER BY score DESC 
      LIMIT $1
    `;
    
    const result = await cluster.query(query, { parameters: [limit] });
    return result.rows;
  } catch (error) {
    console.error('Error getting top scores:', error);
    throw error;
  }
}