import express from "express";
const router=express.Router();
import { getTodo, createTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";
router.get('/',getTodo);
router.post('/',createTodo);
router.put('/:id',updateTodo);
router.delete('/:id',deleteTodo);
export default router;
