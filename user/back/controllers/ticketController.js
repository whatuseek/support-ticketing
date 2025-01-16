// /backend/controllers/ticketController.js
// Import required modules
import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';
import Counter from '../models/counterModel.js';

// Utility function to format timestamps in AM/PM format
const formatTimestamp = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // AM/PM format
  }).format(new Date(timestamp));
};

// Function to fetch all tickets (latest-to-oldest order)
export const getAllTickets = asyncHandler(async (req, res) => {
  // Fetch tickets from the database and sort by createdAt in descending order
  const tickets = await Ticket.find({}).sort({ createdAt: -1 });

  // Format timestamps in the response
  const formattedTickets = tickets.map((ticket) => ({
    ...ticket.toJSON(),
    createdAt: formatTimestamp(ticket.createdAt),
    updatedAt: formatTimestamp(ticket.updatedAt),
  }));

  // Send the formatted tickets as a JSON response
  res.status(200).json(formattedTickets);
});

// Function to get incrementing ticket ID
async function getIncrementingId() {
  // Find the counter document in the database
  const counter = await Counter.findOne({}, 'ticketId');

  // If the counter document doesn't exist, create a new one with ticketId set to 1
  if (!counter) {
    await Counter.create({ ticketId: 1 });
    return 1;
  }

  // Increment the ticketId by 1
  const newTicketId = counter.ticketId + 1;

  // Update the counter document in the database with the new ticketId
  await Counter.updateOne({}, { ticketId: newTicketId });

  // Return the new ticketId
  return newTicketId;
}

// Function to create a new ticket
export const createTicket = asyncHandler(async (req, res) => {
  // Extract the ticket data from the request body
  const { user_id, mobile_number, location, issue_type, comments } = req.body;

  // Validate the required fields
  if (!user_id || !mobile_number || !location || !issue_type || !comments) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Generate a new ticket ID
  const ticketId = await getIncrementingId();

  // Create a new ticket in the database
  const ticket = await Ticket.create({
    user_id,
    mobile_number,
    location,
    issue_type,
    comments,
    ticket_id: `TKT-${ticketId}`,
  });

  // Format timestamps in the response
  const formattedResponse = {
    ...ticket.toJSON(),
    createdAt: formatTimestamp(ticket.createdAt),
    updatedAt: formatTimestamp(ticket.updatedAt),
  };

  // Send the created ticket as a JSON response
  res.status(201).json({
    success: true,
    message: "Ticket created successfully.",
    ticket,
  });
});

// Function to update existing tickets with formatted timestamps
async function updateExistingTimestamps() {
  // Fetch all tickets from the database
  const tickets = await Ticket.find({});

  // Iterate over each ticket and update the createdAt and updatedAt timestamps
  for (const ticket of tickets) {
    await Ticket.findByIdAndUpdate(
      ticket._id,
      {
        createdAt: formatTimestamp(ticket.createdAt),
        updatedAt: formatTimestamp(ticket.updatedAt),
      },
      { new: true }
    );
  }
}

// Export the updateExistingTimestamps function
export { updateExistingTimestamps };



// // smn/user-ticket/backend/controllers/ticketController.js

// import asyncHandler from 'express-async-handler';
// import Ticket from '../models/ticketModel.js';
// import Counter from '../models/counterModel.js';

// // Utility function to format timestamps
// const formatTimestamp = (timestamp) => {
//   return new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true, // AM/PM format
//   }).format(new Date(timestamp));
// };

// // Function to get incrementing ID
// async function getIncrementingId() {
//   const counter = await Counter.findOne({}, 'ticketId');
//   if (!counter) {
//     await Counter.create({ ticketId: 1 });
//     return 1;
//   }
//   const newTicketId = counter.ticketId + 1;
//   await Counter.updateOne({}, { ticketId: newTicketId });
//   return newTicketId;
// }

// // @desc Create new ticket with formatted timestamp
// // @route POST /api/tickets
// export const createTicket = asyncHandler(async (req, res) => {
//   const { user_id, mobile_number, location, issue_type, comments } = req.body;

//   if (!user_id || !mobile_number || !location || !issue_type || !comments) {
//     res.status(400);
//     throw new Error('Please provide all required fields');
//   }

//   const ticketId = await getIncrementingId();
//   const formattedTimestamp = formatTimestamp(new Date()); // Format timestamp

//   const ticket = await Ticket.create({
//     user_id,
//     mobile_number,
//     location,
//     issue_type,
//     comments,
//     ticket_id: `TKT-${ticketId}`,
//     createdAt: formattedTimestamp, // Store formatted timestamp
//   });

//   res.status(201).json(ticket);
// });
