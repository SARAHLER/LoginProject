import { Request, Response } from "express";
import Task from "../models/Task";

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// Update a task

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(" id", id);
        const { title, description } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// Delete a task

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("id",id);
    
    const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log("deletedTask",deletedTask);

    return res.json(deletedTask);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

