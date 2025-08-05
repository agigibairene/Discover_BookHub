// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5176", 
    "https://discovery-app-alpha.vercel.app",
    "https://discovery-app-five.vercel.app"
  ],  
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://discovery-app-five.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live https://vercel.live/_next-live/;"
  );
  next();
});



app.use(session({
  secret: process.env.secretKey || "default_secret",
  resave: false,
  saveUninitialized: true,
}));

const booksRoute = require("./src/books/books.route");
const authorsRoute = require("./src/authors/authors.route");

app.use("/api/books", booksRoute);
app.use("/api/authors", authorsRoute);

// MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.MongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

main();

app.get('/', (req, res) => {
  res.send('Discovery app is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
