-- Script to set up PostgreSQL database, user, and tables
-- File: setup_database.sql
-- Create a test user
CREATE USER test_user WITH LOGIN PASSWORD 'test1234';
-- Grant necessary privileges to the test user
ALTER ROLE test_user CREATEDB;
-- Create a new database with the test user as the owner
CREATE DATABASE test_db OWNER test_user;
-- Connect to the newly created database (this line is for use in psql, not in the SQL script file)
\c test_db -- Create a table within the 'test_db' database
CREATE TABLE IF NOT EXISTS paintings (
    id SERIAL PRIMARY KEY,
    title TEXT,
    colors JSONB,
    color_hex JSONB,
    subjects JSONB,
    painting_url TEXT
);
-- You may add additional table creation statements or initial data insert statements here
-- End of script
