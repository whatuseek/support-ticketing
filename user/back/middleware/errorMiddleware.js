// /backend/middleware/errorMiddleware.js

// Import the Error class
import { Error } from 'mongoose';

// Middleware to handle 404 Not Found errors
const notFound = (req, res, next) => {
    // Create a new error with a message indicating the requested URL was not found
    const error = new Error(`Not Found - ${req.originalUrl}`);
    // Set the response status to 404 (Not Found)
    res.status(404);
    // Pass the error to the next middleware
    next(error);
};

// Middleware to handle general errors
const errorHandler = (err, req, res, next) => {
    // Determine the status code; if it's 200 (OK), set it to 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // Log the error message to the console
    let msg=err.message
    console.log('Error message:',msg)
    // Set the response status to the determined status code
    res.status(statusCode);
    // Send a JSON response with the error message and stack trace (if not in production)
    res.json({
        message: err.message || "An error occurred.",
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export { notFound, errorHandler };