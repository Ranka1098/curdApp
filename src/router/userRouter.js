import express from "express";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.post("/createUser", async (req, res) => {
  try {
    // 1.extract user form req body
    const { fname, lname, email, password } = req.body;

    // 2.validate all fields
    if (!fname || !lname || !email || !password) {
      return res.status(404).json({ message: "all field are required" });
    }

    // 3.check email already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "email is all ready exit" });
    }

    // 4.hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 5. user info stored into database
    const newUser = new User({ fname, lname, email, password: hashPassword });

    // 6.save user into database
    await newUser.save();

    res.send("user added into databse sucessfully ");
  } catch (error) {
    res.status(400).send("user not d into database");
  }
});

export default userRouter;
