const sql = require('mssql/msnodesqlv8');

// Database configuration object for connecting to SQL Server
const config = {
    // Connection string specifying driver, server, database, and authentication details
    connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-5CQBVRM;Database=URL;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
    options: {
        // Option to trust the server certificate (useful for development or self-signed certs)
        trustServerCertificate: true,
        requestTimeout: 300000 // 300,000 ms = 5 minutes
    }
};

/**
 * Asynchronously connects to the database using the provided configuration.
 * Logs a success message upon successful connection, or logs an error if the connection fails.
 * Intended as an entry point for performing database queries after establishing a connection.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the connection attempt is complete.
 */
/*
  async function connectToDatabase() {
      try {
          await sql.connect(config);
          console.log('Connected to database');
          // Perform queries here
      } catch (err) {
          console.error('Error connecting to database:', err);
      }
  }

  connectToDatabase();
*/

/**
 * Inserts 1000 rows into the 'url_shortener' table with generated original URLs and short codes.
 * 
 * For each row, the function generates a unique original URL and short code,
 * then inserts them into the database. Progress is logged every 100 rows.
 * Handles database connection, error logging, and ensures the connection is closed.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Resolves when all rows have been inserted and the connection is closed.
 */
async function insertRows() {
  try {
    // Connect to DB
    await sql.connect(config);
    console.time('InsertTime');
    
    for (let i = 1; i <= 1000000; i++) {
      const originalUrl = `https://example.com/page${i}`;
      const shortCode = `code${i}`;
      
      await sql.query`
        INSERT INTO url_shortener (original_url, short_code)
        VALUES (${originalUrl}, ${shortCode})
      `;
      
      if (i % 100 === 0) {
        console.log(`${i} rows inserted...`);
      }
    }

    console.timeEnd('InsertTime');
    console.log('Finished inserting 1000 rows.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sql.close();
  }
}

insertRows();
