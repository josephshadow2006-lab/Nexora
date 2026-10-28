
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));

app.use(express.json({ limit: "20kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NEXORA backend is running",
    timestamp: new Date().toISOString(),
  });
});

// API root
app.get("/api", (req, res) => {
  res.json({
    name: "NEXORA API",
    version: "1.0.0",
    endpoints: [
      "GET /api/health",
      "GET /api/products",
      "POST /api/orders",
      "POST /api/mpesa/stkpush",
    ],
  });
});

// Temporary sample products.
// Later, connect this endpoint to the database.
app.get("/api/products", (req, res) => {
  res.json({
    success: true,
    products: [],
    message: "Connect your product catalogue to the database.",
  });
});

// Order endpoint placeholder.
// Do not accept payments or trust client-supplied prices yet.
app.post("/api/orders", (req, res) => {
  res.status(501).json({
    success: false,
    message: "Order creation is not configured yet.",
  });
});

// M-Pesa placeholder: deliberately does not initiate a payment.
app.post("/api/mpesa/stkpush", (req, res) => {
  res.status(501).json({
    success: false,
    message: "M-Pesa Daraja integration has not been configured yet.",
  });
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log(`NEXORA backend running at http://localhost:${PORT}`);
});
