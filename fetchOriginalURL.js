const sql = require('mssql/msnodesqlv8');

const config = {
  connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-5CQBVRM;Database=URL;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
  options: {
    trustServerCertificate: true,
    requestTimeout: 120000 // 120 seconds = 2 minutes
  }
};

/* INDEXING EXPLANATION: 

    An index in SQL Server is a data structure that makes data retrieval faster, just like an index in a book helps you quickly find the page for a topic.

    -**- 
        CREATE NONCLUSTERED INDEX idx_short_code ON url_shortener(short_code);
    -**-

    This creates a non-clustered index on the short_code column, which makes lookups like yours extremely fast, even with tens of millions of rows.

    -**-
        SET STATISTICS TIME ON;

        SELECT original_url FROM url_shortener
        WHERE short_code = 'code621121';

        SET STATISTICS TIME OFF;
    -**-
*/

async function fetchData(short_code) {
  try {
    await sql.connect(config);
    console.time('FetchTime');

    const result = await sql.query`
      SELECT original_url FROM url_shortener
      WHERE short_code = ${short_code};
    `;

    console.timeEnd('FetchTime');

    if (result.recordset.length > 0) {
      console.log('Fetched original URL:', result.recordset[0].original_url);
    } else {
      console.log('No matching short_code found.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sql.close();
  }
}

fetchData('code621121');
fetchData('code5217388');
fetchData('code9999998');
