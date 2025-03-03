import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB is connect succeessfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to mongoDb: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
