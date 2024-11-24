const express = require("express");
require("dotenv").config();
const appController = require("./appController");
// const path = require("path");

// Load environment variables from .env file
// Ensure your .env file has the required database credentials.
const loadEnvFile = require("./utils/envUtil");
const envVariables = loadEnvFile("./.env");

const app = express();
const PORT = process.env.PORT || 65534; // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
//p0
//app.use(express.static("../frontend/public/index.html"));
//app.use(express.static("../frontend/src/index.js")); // Serve static files from the 'public' directory
app.use(express.json()); // Parse incoming JSON payloads

// If you prefer some other file as default page other than 'index.html',
//      you can adjust and use the bellow line of code to
//      route to send 'DEFAULT_FILE_NAME.html' as default for root URL
// app.get("/", (req, res) => {
//   res.sendFile("../frontend/public/index.html");
// });

// p1
app.get("/", (req, res) => {
  res.send("hello from backend!");
});

// mount the router
app.use("/", appController);

// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
