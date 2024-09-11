import { getClient } from '../../../connection';

export async function POST(req: { json: any }) {
   try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { customer_id, PFIS_name, recipient_address, from_currency, to_currency, amount } = body;

    // Log the received body
    console.log('Received data:', body);

   const client = await getClient();

    // Check if customer_id exists in the transactions table
    const selectQuery = 'SELECT * FROM customers WHERE customer_id = $1';
    const selectResult = await client.query(selectQuery, [customer_id]);

    if (selectResult.rows.length > 0) {
      // Customer exists, proceed to insert transaction data
      const insertQuery = `
        INSERT INTO transactions (customer_id, PFIS_name, Recipient_address, From_currency, To_currency, Amount, Date)
        VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
        RETURNING *;
      `;
      const insertResult = await client.query(insertQuery, [
        customer_id,
        PFIS_name,
        recipient_address,
        from_currency,
        to_currency,
        amount,
      ]);

      // Return the inserted transaction details
      return new Response(
        JSON.stringify({ message: 'Transaction inserted successfully', transaction: insertResult.rows[0] }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // If the customer_id doesn't exist
      return new Response(
        JSON.stringify({ message: 'Customer not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);

    return new Response(
      JSON.stringify({ message: 'Error creating transaction', error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}