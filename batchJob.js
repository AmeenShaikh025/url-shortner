const sql = require('mssql/msnodesqlv8');

const config = {
    connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-5CQBVRM;Database=URL;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
    options: {
        trustServerCertificate: true,
        requestTimeout: 10000000 // 10,000 seconds = 166 minutes
    }
};

async function insertRows() {
  try {
    await sql.connect(config);
    console.time('InsertTime');

    const batchSize = 1000; // Number of rows per batch
    for (let batch = 0; batch < 10000; batch++) {
      let values = [];
      for (let i = 1; i <= batchSize; i++) {
        const index = batch * batchSize + i;
        const originalUrl = `'https://example.com/page${index}'`;
        const shortCode = `'code${index}'`;
        values.push(`(${originalUrl}, ${shortCode})`);
      }

      const insertQuery = `
        INSERT INTO url_shortener (original_url, short_code)
        VALUES ${values.join(',')}
      `;
      await sql.query(insertQuery);
      console.log(`${(batch + 1) * batchSize} rows inserted...`);
    }

    console.timeEnd('InsertTime');
    console.log('Finished inserting 1,000,0000 rows.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sql.close();
  }
}

insertRows();
