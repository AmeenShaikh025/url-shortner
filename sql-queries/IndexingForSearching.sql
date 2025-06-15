USE URL;

CREATE NONCLUSTERED INDEX idx_short_code ON url_shortener(short_code);

-- CREATE UNIQUE INDEX idx_short_code ON url_shortener(short_code);
