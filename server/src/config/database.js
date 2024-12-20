import { connect } from 'couchbase';

const COUCHBASE_URL = process.env.COUCHBASE_URL || 'couchbases://cb.6gj2r4ygxyjrfcgf.cloud.couchbase.com';
const BUCKET_NAME = process.env.BUCKET_NAME || 'quiz';
const USERNAME = process.env.COUCHBASE_USER || 'shivay4';
const PASSWORD = process.env.COUCHBASE_PASSWORD || 'Shivay1234!';

let cluster = null;

export async function initDatabase() {
  try {
    cluster = await connect(COUCHBASE_URL, {
      username: USERNAME,
      password: PASSWORD,
    });
    
    console.log('Connected to Couchbase');
    return cluster;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export function getCluster() {
  if (!cluster) {
    throw new Error('Database not initialized');
  }
  return cluster;
}