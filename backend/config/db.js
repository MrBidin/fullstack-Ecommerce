import mongoose from "mongoose";

mongoose.set('strictQuery', false)

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('mongodb is connected');
  }catch(error){
    console.error(`message: ${error.message}`);
    process.exit(1)
  }
};


export default connectDB;

