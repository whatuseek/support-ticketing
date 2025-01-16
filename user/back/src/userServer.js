// smn/user-ticket/backend/src/userServer.js
import express from "express";
import connectDB from "../config/db.js";
import setupMiddleware from "../middleware/setupMiddleware.js";
import ticketRoutes from "../routes/ticketRoutes.js";
import { notFound, errorHandler } from '../middleware/errorMiddleware.js';

const app = express();

// Get the port from .env file
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Setup middleware
setupMiddleware(app);

// Define routes
app.use("/api/tickets", ticketRoutes);

// Error handling middleware
app.use(notFound); // Place 'notFound' middleware before 'errorHandler'
app.use(errorHandler); // Handles errors thrown in controllers

app.listen(port, () => {
  console.log(`==>=>=>=>=> userServer running on http://localhost:${port}`);
});