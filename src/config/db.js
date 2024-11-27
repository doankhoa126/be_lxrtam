// db.js
import pkg from 'pg';  // Import the whole 'pg' package as a default export
const { Pool } = pkg;  // Extract the Pool class from the package

// Create a pool of PostgreSQL connections
const pool = new Pool({
  host: '113.161.87.24',
  user: 'dev',
  password: 'bug99999',
  database: 'db_lxrtam',
  port: 5433,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout after 2 seconds if no connection is available
});

// Function to connect and handle queries
const connectToDb = async () => {
  try {
    // Test the connection
    await pool.connect();
    console.log('Connected to the PostgreSQL database.');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

// Call the connection function
connectToDb();

export default pool;
