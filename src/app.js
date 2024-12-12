import express from "express";
import connectDB from "./config/database.js";
import userRouter from "./router/userRouter.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// ---------------------------routers-------------------------------
app.use("/", userRouter);
// ---------------------------datbase connection-------------------------------
connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(8000, () => {
      console.log(`Server is listening on port: 8000`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
