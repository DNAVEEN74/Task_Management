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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = req.body;
        const todo = yield db_1.Todo.findOne(newTask);
        if (todo) {
            res.status(401).json({
                msg: 'task already present',
            });
        }
        ;
        const newTodo = new db_1.Todo(newTask);
        yield newTodo.save();
        res.status(201).json(newTodo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
}));
exports.default = router;
