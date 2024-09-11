export async function deleteTable(client: any, tableName: string) {
    const deleteTableQuery = `DROP TABLE IF EXISTS ${tableName}`;
  
    try {
      await client.query(deleteTableQuery);
      console.log(`Table '${tableName}' deleted successfully`);
    } catch (error) {
      console.error(`Error deleting table '${tableName}':`, error);
    }
}
  