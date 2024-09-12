import bcrypt from 'bcrypt';
import { getClient } from '../../../connection';

export async function POST(req: any ) {
  try {
    const body = await req.json();
    const client = await getClient();

    const { name, countryCode, credential } = body;

    // Check if the customer already exists
    const checkResult = await client.query('SELECT * FROM customers WHERE country_code = $1', [countryCode]);

    if (checkResult.rows.length > 0) {
      // Compare the provided credential with the stored hashed credential
      const match = await bcrypt.compare(credential, checkResult.rows[0].credential);

      if (match) {
        // Credential matches, customer is already registered
        return new Response(
          JSON.stringify({ message: 'Customer already registered' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Hash the credential before saving it
    const hashedCredential = await bcrypt.hash(credential, 10);

    // Insert new customer
    const insertResult = await client.query(
      'INSERT INTO customers (name, country_code, credential) VALUES ($1, $2, $3) RETURNING *',
      [name, countryCode, hashedCredential]
    );

    if (insertResult.rows.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Customer saved successfully', customer: insertResult.rows[0] }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error('Failed to insert customer');
    }

  } catch (error) {
    console.error('Error processing request:', error);

    return new Response(
      JSON.stringify({ message: 'Error creating customer', error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
