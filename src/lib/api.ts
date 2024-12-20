const API_URL = 'http://localhost:3000/api';

interface Score {
  userName: string;
  score: number;
  timestamp?: string;
}

export async function saveScore(userName: string, score: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, score }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save score');
    }
  } catch (error) {
    console.error('Failed to save score:', error);
    throw error;
  }
}

export async function getTopScores(limit: number = 5): Promise<Score[]> {
  try {
    const response = await fetch(`${API_URL}/scores/top?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch top scores');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get top scores:', error);
    throw error;
  }
}