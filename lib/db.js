import { sql } from '@vercel/postgres';

export async function query(text, params) {
  try {
    const result = await sql.query(text, params);
    return result;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}