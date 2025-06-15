USE URL;

SET STATISTICS TIME ON;

SELECT original_url FROM url_shortener
WHERE short_code = 'code621121';

SET STATISTICS TIME OFF;