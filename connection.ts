import { Pool } from 'pg';
import fs from 'fs';
import { deleteTable } from './databases/tables/queries';
import { createCustomerTable } from './databases/tables/wallet_table';

const config = {
  user: "avnadmin",
  password: "AVNS_WE-5aEvUajoCWynTMiW",
  host: "ssg-galaxy.a.aivencloud.com",
  port: 14636,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./ca.pem').toString(),
  },
};

let client: Pool | null = null;

export async function getClient() {
  if (client) return client;

  client = new Pool(config);
  await client.connect();

 // deleteTable(client, 'customers');
  createCustomerTable(client);
  
  const result = await client.query("SELECT VERSION()");
  console.log(result.rows[0].version);
  console.log("Connection Successful!");

  return client;
}