# Scrapping task

This project is developed using TypeScript, Express, React, PostgreSQL, and Docker.

## Instructions to Run the Project

### Without Docker
1. Rename the .example.env file to .env and fill in the required environment variables.
2. Run the following commands in the project root directory:
```
npm install (or npm install --legacy-peer-deps)
npm run build
npm run start
```

### With Docker
1. Rename the .example.env file to .env and fill in the required environment variables (consider that the script creates a database called 'sreality').
2. Run the following command in the project root directory:
```
docker-compose up
```

These instructions will start the necessary services and build the project. After the build process is complete, you can access the application in your browser.

Note: Make sure you have Docker installed and running on your system before executing the above commands.

Feel free to explore the code and customize the application as needed. Enjoy!
<div style="display: flex;">
  <img src="https://github.com/vendee29/sreality-task/blob/main/public/Screenshot%202023-06-12%20134142.png?raw=true" height="300" alt="screenshot">
  <img src="https://github.com/vendee29/sreality-task/blob/main/public/Screenshot%202023-06-12%20134226.png?raw=true" height="300" alt="screenshot">
</div>
