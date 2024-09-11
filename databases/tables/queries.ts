export async function deleteTable(client: any, tableName: string) {
    const deleteTableQuery = `DROP TABLE IF EXISTS ${tableName}`;
  
    try {
      await client.query(deleteTableQuery);
      console.log(`Table '${tableName}' deleted successfully`);
    } catch (error) {
      console.error(`Error deleting table '${tableName}':`, error);
    }
}
  
export async function createTransactionsTable(client: any) {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS transactions (
        transaction_id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(customer_id) ON DELETE CASCADE,
        PFIS_name VARCHAR(255) NOT NULL,
        recipient_address VARCHAR(255) NOT NULL,
        from_currency VARCHAR(10) NOT NULL,
        to_currency VARCHAR(10) NOT NULL,
        amount DECIMAL(18, 8) NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
  
    try {
      await client.query(createTableQuery);
      console.log('Transactions table created successfully');
    } catch (error) {
      console.error('Error creating transactions table:', error);
    }
  }
  