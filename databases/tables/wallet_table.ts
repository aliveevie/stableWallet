export async function createCustomerTable(client:any) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      credential TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await client.query(createTableQuery);
    console.log('Customer table created successfully');
  } catch (error) {
    console.error('Error creating customer table:', error);
  }
}