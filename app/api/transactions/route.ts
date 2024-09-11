import bcrypt from 'bcrypt';
import { getClient } from '../../../connection';

export async function POST(req: { json: any }) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();

    // Log the received body
    console.log('Received data:', body);

    // You can proceed to perform actions with the received data, like saving it to a database
  } catch (error) {
    console.error('Error parsing request body:', error);
  }
}
