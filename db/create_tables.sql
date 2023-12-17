-- create_tables.sql

CREATE TABLE IF NOT EXISTS paintings (
    id SERIAL PRIMARY KEY,
    title TEXT,
    colors JSONB,
    color_hex JSONB,
    subjects JSONB,
    painting_url TEXT
);
