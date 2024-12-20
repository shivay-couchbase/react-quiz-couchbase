# Vite React TypeScript Starter

This project is a starter template for building a React application with TypeScript, Vite, and Tailwind CSS. It also includes a Node.js server with Express and Couchbase for handling quiz scores.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/vite-react-typescript-starter.git
   cd vite-react-typescript-starter


Install dependencies for the client:

```
npm install
```

Install dependencies for the server:

```
cd server
npm install
cd ..
```

Create a .env file in the server directory based on the .env.example file:

```
cp server/.env.example server/.env
```

Update the .env file with your Couchbase credentials.

## Running the Application
Client
To start the client development server, run: npm run dev

This will start the Vite development server and open the application in your default web browser.

Server
To start the server, run:

```
cd server
npm run dev
```
This will start the Express server with Nodemon for automatic restarts on file changes.


## Project Structure

```
.bolt/
  config.json
  prompt
.env.example
.gitignore
eslint.config.js
index.html
package.json
postcss.config.js
server/
  .env
  package.json
  src/
    config/
      database.js
    index.js
    routes/
      scores.js
    services/
      scoreService.js
src/
  App.tsx
  components/
    Quiz.tsx
  index.css
  lib/
    api.ts
    questions.ts
  main.tsx
  vite-env.d.ts
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

License
This project is licensed under the MIT License.