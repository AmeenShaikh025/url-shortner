const sql = require('mssql/msnodesqlv8');

const config = {
  connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-5CQBVRM;Database=URL;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
  options: {
    trustServerCertificate: true
  },
  requestTimeout: 10000000 // 10,000 seconds = 166 minutes
};

/*
    This function takes 19mins to loop through 1000 fetches.
    If it were to run 1 million fetches, it would take approximately 19,000 minutes or about 13 days.
    This is bad solution.

    Solution:
        1: Batch Query Many short_codes at Once. [IN operator SQL]
        2: Use a stored procedure to simulate 1M reads server-side
        3: Add or Increase Global Timeout [Not feasible for 1M reads]

    Real time use case:
        For more information checK: "fetchOriginalURLOneMillion.md"

*/

async function run1MillionFetches() {
  try {
    await sql.connect(config);
    console.time('TotalFetchTime');

    for (let i = 1; i <= 1000; i++) {
      const shortCode = `code${i}`;

      const result = await sql.query`
        SELECT original_url FROM url_shortener
        WHERE short_code = ${shortCode};
      `;

    //   Insert the result into a new table or process it as needed (Data Migration or Backfilling)

      if (i % 500 === 0) {
        console.log(`${i} queries completed`);
      }
    }

    console.timeEnd('TotalFetchTime');
  } catch (err) {
    console.error('Error during fetch loop:', err);
  } finally {
    await sql.close();
  }
}

run1MillionFetches();