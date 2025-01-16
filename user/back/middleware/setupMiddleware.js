// /backend/middleware/setupMiddleware.js


import express from 'express';
import cors from 'cors';

const setupMiddleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
};
const app = express();
app.get( "/", (req, res) => {
    res.send("API is running...");
  })
export default setupMiddleware;