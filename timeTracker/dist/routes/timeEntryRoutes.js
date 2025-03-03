import { Router } from "express";
import { createTimeEntry, deleteTimeEntry, getAllTimeEntries } from "../controller/TimeEntryController.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
const router = Router();
router.post("/add", authMiddleware, createTimeEntry);
router.get("/", authMiddleware, getAllTimeEntries);

router.delete("/:id", deleteTimeEntry);
export default router;
