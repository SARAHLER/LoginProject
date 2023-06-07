"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const authController_1 = require("../controllers/authController");
const router = express.Router();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
exports.default = router;
