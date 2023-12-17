-- create_user_and_db.sql

-- Create a test user
CREATE USER test_user WITH LOGIN PASSWORD 'test1234';

-- Grant necessary privileges to the test user
ALTER ROLE test_user CREATEDB;

-- Create a new database with the test user as the owner
CREATE DATABASE test_db OWNER test_user;
