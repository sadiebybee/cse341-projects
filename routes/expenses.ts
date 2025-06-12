const express = require("express");
const expenseRoutes = express.Router();

const {
    getAll,
    getSingle,
    createExpense,
    updateExpense,
    deleteExpense,
} = require("../controllers/expenses");

expenseRoutes.get("/", getAll);
expenseRoutes.get("/:id", getSingle);
expenseRoutes.post("/", createExpense);
expenseRoutes.put("/:id", updateExpense);
expenseRoutes.delete("/:id", deleteExpense);

module.exports = expenseRoutes;
export {};


