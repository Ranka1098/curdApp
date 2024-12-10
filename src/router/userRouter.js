import express from "express";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

// ------------------user created-----------------------
userRouter.post("/createUser", async (req, res) => {
  try {
    // 1.extract user form req body
    const { fname, lname, email, password } = req.body;

    // 2.validate all fields
    if (!fname || !lname || !email || !password) {
      return res.status(404).json({ message: "all field are required" });
    }

    // 3.check email already exist or not
    const existingUser = await User.findOne(email);
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
// ------------------user created-----------------------

// ------------------get all user-----------------------
userRouter.get("/getAllUser", async (req, res) => {
  try {
    // 1.find method return all user from DB
    const userData = await User.find();
    // 2.check user exits or not
    if (!userData) {
      return res.status(404).send({ message: "Users not found" });
    }
    return res.status(200).send({ message: "all user", data: userData });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});
// ------------------get all user-----------------------

// ------------------get single user by id-----------------------
userRouter.get("/singleUser/:id", async (req, res) => {
  try {
    // 1.get user id by param
    const id = req.params.id;
    // 2.find user by id
    const singleUser = await User.findById(id);
    if (!singleUser) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).json({ msg: "user by id : ", data: singleUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// ------------------get single user by id-----------------------
// ------------------update user by id-----------------------
userRouter.patch("/updateUser/:id", async (req, res) => {
  try {
    // 1.get user id from URL
    const id = req.params.id;
    // 2.get user data from body
    const updateData = req.body;
    // 3.check user exist or not
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("user not found");
    }
    //4.update user in MongoDB
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    // 5.send back response
    res
      .status(200)
      .json({ msg: "updated  user successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// ------------------update user by id-----------------------

export default userRouter;
