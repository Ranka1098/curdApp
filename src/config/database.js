import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ashokranka30:sbX3Ei9LhwPmW.p@cluster0.zv0qp.mongodb.net/curdAPP"
    );
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log("error in database connection : ", err);
  }
};

export default connectDB;
