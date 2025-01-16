//  /backend/models/counterModel.js

import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  ticketId: Number
});

const Counter = mongoose.model('Counter', counterSchema);

export default Counter;




// import { Schema, model } from 'mongoose';

// const counterSchema = new Schema({
//     ticketId: Number
// });

// const Counter = model('Counter', counterSchema);
// Counter.findOne({}, 'ticketId')
//     .then((counter) => {
//         if (!counter) {
//             const newCounter = new Counter({ ticketId: 1 });
//             newCounter.save();
//         }
//     });
// export default Counter;