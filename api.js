const express = require("express");
const userRoutes = require("./Routes/user");
const productRoutes = require("./Routes/product");
const cartRoutes = require("./Routes/cart");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://maaz:m00z@cluster0.hwod5.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Connection error", error));

// CORS options
const corsOptions = {
  exposedHeaders: ["auth_token"], // Allow the client to access the auth_token
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000", // React app for local development
      "https://my-football-app-4edb1671b434.herokuapp.com", // Deployed front-end
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the request
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization", "auth_token"], // Allow custom headers like auth_token
};

app.use(cors(exposedHeaders));

// Middleware for JSON parsing
app.use(express.json());

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

// Start the server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
