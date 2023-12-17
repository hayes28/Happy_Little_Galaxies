# Happy Little Galaxies project

## Description

# Installation and Setup
## Install Node.js
- Download the installer from the official website: https://nodejs.org/en/download/

## Install NVM (Node Version Manager)
- Download the installer from GitHub: https://github.com/nvm-sh/nvm
- Follow the installation instructions on the GitHub page.

# Setup database
## Install PostgreSQL:
*** Note: The installation process varies depending on the operating system.
#### For Windows:
Download the installer from the official website: https://www.postgresql.org/download/windows/

#### For macOS:
Download the installer from the official website: https://www.postgresql.org/download/macosx/
- You can also install it using Homebrew:
```
brew install postgresql
```

#### For Linux:
Run the following commands:
```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```
After installation, start the PostgreSQL service:
```
sudo systemctl start postgresql
```
Enable it to start automatically at boot (optional):
```
sudo systemctl enable postgresql
```
Check the status of the service:
```
sudo systemctl status postgresql
```

# Clone the Repository
```
git clone https://github.com/hayes28/Happy_Little_Galaxies.git
```
- Use nvm to switch to the project's Node.js version:
```
nvm use
```
- Install project dependencies:
```
npm install
```
# Set Up the Database:
## Step 1: Navigate to the Database Script Directory
- Change to the directory containing your database scripts:
```
cd db
```
## Step 2: Run the User and Database Creation Script
- Run the following command to create the database and user:
```
psql -U postgres -f create_user_and_db.sql
```
*** Note: If you are using a different user than the default, replace postgres with your username.
You will be prompted to enter your password. Enter the password you created during the installation process. Sudo might be required to run this command.

## Step 3: Run the Table Creation Script
- Run the second script to create the necessary tables in the new database:
```
psql -U test_user -d test_db -f create_tables.sql
```
## Step 4: Verify the Setup
- Log in to the database to verify the tables:
```
psql -U test_user -d test_db
```
- List the tables:
```
\dt
```
- You should see the following tables:
```
              List of relations
 Schema |       Name        | Type  |  Owner
--------+-------------------+-------+----------
    public | paintings | table | test_user
    (1 rows)
```
- Exit the database:
```
\q
```
## Step 5: Convert CSV Data to JSON
- In the db folder run the following command to convert the CSV data to JSON:
```
node convert-csv-to-json.js
```
- You should see the following output:
```
JSON file created
```
You can view the JSON file in the data directory. File name: data.json.

## Step 6: Make your own .env file
- Create a .env file in the root directory of the project.
- Add the following environment variables to the .env file:
```
DB_HOST=localhost
DB_DATABASE=test_db
DB_USER=test_user
DB_PASS=test1234
DB_PORT=5432
DB_URL="postgresql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_DATABASE"
```
- Replace localhost with the hostname of your database server.
- PORT 5432 is the default port for PostgreSQL. If you are using a different port, replace 5432 with your port number.
- Save the file.

## Step 7: Load the JSON Data into the Database
- Run the following command to load the JSON data into the database:
```
node load-data.js
```
- You should see the following output:
```
All paintings have been inserted
```
- You can also view the data in the database using the psql command:
```
psql -U test_user -d test_db
```
- Verify that the data has been loaded into the database:
```
SELECT * FROM paintings;
```
- To exit the database, run the following command:
```
\q
```
### Troubleshooting
- If you encounter issues during installation or setup, consult the PostgreSQL documentation or relevant community forums for assistance.
# Run the Application
- Open a terminal and navigate to the project directory.
- Change to the React app directory:
```
cd hlg-site
```
- Run the following command to start the application:
```
npm start
```
- Open your browser and navigate to http://localhost:3000.
# Run Express Server
- Open a second terminal and navigate to the project directory.
- Change to the api directory:
```
cd api
```
- Run the following command to start the server:
```
nodemon server.js
```
# Contributors
[![My Skills](https://skillicons.dev/icons?i=js,nodejs,css,express,postgres,react,firebase,vscode,figma,github)](https://skillicons.dev)
- [Heather Hayes](https://github.com/hayes28) (Project Manager, back-end, front-end)
- [Foster Clark](https://github.com/FosterClark48) (Project Manager, back-end, front-end)
- [Taylor Woodson](https://github.com/WoodsonTD) (back-end, front-end)
