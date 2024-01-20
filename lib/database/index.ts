import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) {
      return cached.conn;
    }
    
    if (!MONGO_URI) {
      throw new Error("Mongo URI is missing");
    }
    
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGO_URI, {
        dbName: "test",
        bufferCommands: false,
      });
    
    try {
      cached.conn = await cached.promise;
      console.log("MongoDB connected successfully");
      return cached.conn;
    } catch (error : any) {
      console.error("Error connecting to MongoDB:", error.message);
      throw error;
    }  
};
