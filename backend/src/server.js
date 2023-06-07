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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const auth_1 = __importDefault(require("./routes/auth"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const express = require('express');
const app = express();
const User_1 = require("./models/User");
const cors = require('cors');
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            bufferCommands: false,
            sslValidate: false, // Disable SSL certificate verification
        };
        yield mongoose_1.default.connect(config_1.default.mongoURI);
        console.log('Connected to MongoDB');
        const connect = () => {
            return mongoose_1.default.connect(config_1.default.mongoURI, mongooseOptions);
        };
        // Listen for the 'open' event to make sure the initial connection is complete
        mongoose_1.default.connection.once('open', () => {
            console.log('MongoDB connection is ready');
            // Create indexes
            User_1.User.createIndexes();
        });
    }
    catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
});
connect();
app.use(cors());
app.use(express.json());
app.use('/api/auth', auth_1.default);
app.use('/api/task', tasks_1.default);
app.listen(config_1.default.port, () => {
    console.log(`Server started on port ${config_1.default.port}`);
});
