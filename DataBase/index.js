import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let config;

if (process.env.NODE_ENV === "production") {
  
  config = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
  }

} else {

  mongoose.connect('mongodb://localhost/webCon',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // config = mongoose.connect(process.env.DATABASE_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  
}

export default config;
