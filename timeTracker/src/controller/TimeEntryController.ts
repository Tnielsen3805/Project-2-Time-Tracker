import { Request, Response } from "express";
import TimeEntry from "../models/TimeEntry.js";

export const createTimeEntry = async (req: Request, res: Response):Promise<void> => {
  try {
    const { user_id, start_time, end_time, task_description } = req.body;

    const newEntry = await TimeEntry.create({
      user_id,
      start_time,
      end_time,
      task_description,
    });

   res.status(201).json(newEntry);
   return
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating time entry" });
    return
  }
};



export const getAllTimeEntries = async (req: any, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const userId = req.user.id; 
    const timeEntries = await TimeEntry.findAll({
      where: { user_id: userId },
    });

    res.status(200).json(timeEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching time entries" });
  }
};



export const updateTimeEntry = async (req: Request, res: Response):Promise<void> => {
  try {
    const { id } = req.params;
    const { start_time, end_time, task_description } = req.body;

    const timeEntry = await TimeEntry.findByPk(id);
    if (!timeEntry) {
       res.status(404).json({ message: "Time entry not found" });
    }

    await TimeEntry.update({ start_time, end_time, task_description });
     res.status(200).json(timeEntry);
     return
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: "Error updating time entry" });
     return
  }
};

export const deleteTimeEntry = async (req: Request, res: Response):Promise<void> => {
  try {
    const { id } = req.params;

    const timeEntry = await TimeEntry.findByPk(id);
    if (!timeEntry) {
       res.status(404).json({ message: "Time entry not found" });
       return
    }

    await timeEntry.destroy();
    res.status(200).json({ message: "Time entry deleted successfully" });
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting time entry" });
    return
  }
};
