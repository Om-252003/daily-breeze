// const express = require("express");
// const app = express();
// require("dotenv").config();
// const connectDB = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// // to remove cors error
// // app.use(cors());
// header ('Access-Control-Allow-Origin: *');	
// header ('Access-Control-ALlow-Methods: POST, GET, OPTIONS, PUT, DELETE');	
// header ('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');	


// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const entryRoutes = require("./routes/entryRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/entries", entryRoutes);

// connectDB()
//   .then(() => {
//     console.log("Database connected successfully!");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}!`);
//     });
//   })
//   .catch((error) => {
//     console.log("Database not connected! " + error);
//   });


const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

// ✅ Correct CORS configuration for Vercel
const corsOptions = {
  origin: ["https://daily-breeze.vercel.app", "https://daily-breeze-1ooo.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Auth-Token"],
};
app.use(cors(corsOptions));

// ✅ Handle Preflight Requests (OPTIONS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://daily-breeze-1ooo.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);

// ✅ Connect Database
connectDB()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => console.error("❌ Database connection failed!", error));

// ✅ Export app for Vercel (DO NOT use app.listen())
module.exports = app;
