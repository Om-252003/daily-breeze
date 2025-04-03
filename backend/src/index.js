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

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: ["https://daily-breeze.vercel.app", "https://daily-breeze-1ooo.vercel.app"], // Allowed frontends
  credentials: true, // Allow cookies to be sent with requests
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Auth-Token"],
};

app.use(cors(corsOptions));

// Handle Preflight Requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://daily-breeze-1ooo.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);

// Connect to Database and Start Server
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully!");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log("❌ Database not connected! " + error);
  });
