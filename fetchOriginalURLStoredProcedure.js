const sql = require('mssql/msnodesqlv8');

const config = {
  connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-5CQBVRM;Database=URL;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
  options: {
    trustServerCertificate: true
  },
  requestTimeout: 0 // No timeout for the stored procedure execution
};

async function runStoredProcedure() {
  try {
    await sql.connect(config);
    console.time('StoredProcTime');

    const result = await sql.query`EXEC dbo.simulate_fetches`;

    console.timeEnd('StoredProcTime');

    console.log('Stored procedure executed successfully.');
    console.log('Result metadata:', result); // Likely empty or only contains the last SELECT result
    console.log('Rows found:', result.recordset[0].TotalFound);
  } catch (err) {
    console.error('Error executing stored procedure:', err);
  } finally {
    await sql.close();
  }
}

runStoredProcedure();