// /backend/routes/ticketRoutes.js
import express from "express";
import {
    createTicket,
    getAllTickets,
    updateExistingTimestamps, // Temporary function
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", createTicket);
router.get("/", getAllTickets);

// Temporary route to update existing timestamps
router.patch("/update-timestamps", updateExistingTimestamps);

export default router;


// import { Router } from "express";
// const router = Router();
// import { createTicket } from "../controllers/ticketController.js";

// // Route for creating a new ticket (POST)
// router.post("/", createTicket);

// // You can add other routes here for fetching or updating tickets

// export default router;
