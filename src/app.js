import express from "express";
import connectDB from "./config/database.js";

const app = express();

connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(3000, () => {
      console.log(`Server is listening on port: 8000`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
