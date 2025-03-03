import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB,sequelize  } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import timeEntryRoutes from "./routes/timeEntryRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use("/users", authRoutes);
app.use("/api/time-entries", timeEntryRoutes);
connectDB().then(() => {
  sequelize.sync({ alter: true }); 
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});