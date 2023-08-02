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

dotenv.config();

import './DataBase/index.js';


// CONFIGURATIONS
const PORT = process.env.PORT || 9000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));



// FILE STORAGE FOR MULTER 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename:  (req, file, cb) => {
        cb(null, Date.now() + '_' +file.originalname)
    }
})

const upload = multer({storage});

// FilesRoutes

app.post("/auth/register", upload.single("picture"), register);

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
    
