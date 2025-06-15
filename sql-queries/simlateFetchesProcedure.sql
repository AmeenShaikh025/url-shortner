-- Create a dummy procedure to loop internally
CREATE OR ALTER PROCEDURE simulate_fetches
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @i INT = 1;
    WHILE @i <= 1000000
    BEGIN
        DECLARE @short_code NVARCHAR(50) = 'code' + CAST(@i AS NVARCHAR);
        SELECT original_url FROM url_shortener WHERE short_code = @short_code;
        SET @i += 1;
    END
END
