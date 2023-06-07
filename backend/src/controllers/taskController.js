"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// Get all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.getAllTasks = getAllTasks;
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const task = new Task_1.default({ title, description });
        const newTask = yield task.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.createTask = createTask;
// Update a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(" id", id);
        const { title, description } = req.body;
        const updatedTask = yield Task_1.default.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTask) {
            res.status(404).json({ error: "Task not found" });
        }
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.updateTask = updateTask;
// Delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield Task_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(404).json({ error: "Task not found" });
        }
        res.json(deletedTask);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.deleteTask = deleteTask;
