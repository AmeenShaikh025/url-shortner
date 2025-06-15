use URL;

SELECT @@SERVERNAME;

select db_name();

select * from url_shortener;

-- size of the table
EXEC sp_spaceused 'url_shortener';