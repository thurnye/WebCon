import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import multer from 'multer';
import { fileURLToPath } from "url";
import route from './Routes/routes.js';
import {register} from './Controllers/auth.js'
import Image from './Models/image.js'

dotenv.config();

import './DataBase/index.js';


// CONFIGURATIONS
const PORT = process.env.PORT || 9000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


// const allowedOrigins = ['http://localhost:3000']; // Add your trusted origins here

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

app.use(cors());


app.use(express.json({ limit: '50mb', extended: true }));

app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));

app.use(express.json());

app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

app.use(morgan("common"));

// //SETTING HEADER FOR ACCESS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, CREATE, DELETE, DESTROY');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

app.post("/auth/register", register);

// Multer setup to handle image uploads
const upload = multer();

// // POST /api/uploadImage
// app.post('/uploadImage', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'Image file not provided' });
//     }

//     const imageData = req.file.buffer; // Get image binary data from multer

//     // Create a new Image instance and save it to the database
//     const image = new Image({ imageData });
//     await image.save();

//     return res.status(201).json({ message: 'Image uploaded successfully', image });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     return res.status(500).json({ error: 'Failed to upload image' });
//   }
// });

app.use(route);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// DB CONNECTION
app.listen(PORT, () => {
    try {
        console.log(`Server started on port ${PORT}`);
    } catch (error) {
        console.log('something went wrong', error);
    }
});
    
