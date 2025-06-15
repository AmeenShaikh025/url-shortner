use URL;

CREATE TABLE url_shortener (
    id INT IDENTITY(1,1) PRIMARY KEY,
    original_url VARCHAR(MAX) NOT NULL,
    short_code VARCHAR(30) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE()
);