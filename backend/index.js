import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONOG_URI;

// ✅ CORS Middleware (Allow Frontend Access)
app.use(
  cors({
    origin: ["https://blog-app-bo95.vercel.app"], // deploy frontend URL
    credentials: true, // ✅ important for cookies
    methods: ["GET","POST","PUT","DELETE"],
  })
);



// ✅ Other Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Database Connection
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// ✅ Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
