import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController";

const router = express.Router();

router.get('/getAllTasks', getAllTasks);
router.post('/createTask', createTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

export default router;
