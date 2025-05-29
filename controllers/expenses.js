const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;


const validateExpense = (expense) => {
    const errors = [];
    if (expense.name && (typeof expense.name !== 'string' || expense.name.length < 3 || expense.name.length > 30)) {
        errors.push('Name must be between 3 and 30 characters');
    }

    if (expense.categoryId && (typeof parseInt(expense.categoryId) !== 'number')) {
        errors.push('category Id is required');

    }

    if (expense.price && (typeof parseInt(expense.price) !== 'number')) {
        errors.push('Price must be formatted correctly');
    }

    if (expense.date && (typeof new Date(expense.date) !== 'object')) {
        errors.push('Date must be formatted correctly (YYYY-MM-DD)');
    }

    if (expense.description && (typeof expense.description !== 'string' || expense.description.length < 5 || expense.description.length > 250)) {
        errors.push('Description must be between 5 and 250 characters');
    }

    if (expense.transactionType && (typeof expense.transactionType !== 'string' || expense.transactionType.length < 0 )) {
        errors.push('Transaction can\'t be empty');
    }

    return errors;
};


const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("expenses")
    .collection("mainExpenses")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const expenseId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("expenses")
    .collection("mainExpenses")
    .find({ _id: expenseId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createExpense = async (req, res, next) => {
  //   //we are creating a contact here
  try {
    const expense = {
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      date: req.body.date,
      description: req.body.description,
      transactionType: req.body.transactionType,
    };

    const validateErrors = validateExpense(expense);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Erros",
        errors: validateErrors,
      });
    }

    const result = await mongodb
      .getDb()
      .db("expenses")
      .collection("mainExpenses")
      .insertOne(expense);
    if (result.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to create expense." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create expense.", error:error.message });
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const expenseId = new ObjectId(req.params.id);
    const expense = {
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      date: req.body.date,
      description: req.body.description,
      transactionType: req.body.transactionType,
    };

    const validateErrors = validateExpense(expense);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Erros",
        errors: validateErrors,
      });
    }

    const result = await mongodb
      .getDb()
      .db("expenses")
      .collection("mainExpenses")
      .replaceOne({ _id: expenseId }, expense);
    if (result.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json({ message: "Failed to update expense." });
    }
  } catch {
    res.status(500).json({ message: "Failed to update expense." });
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const expenseId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("expenses")
      .collection("mainExpenses")
      .deleteOne({ _id: expenseId });

    if (result.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Failed to delete expense." });
    }
  } catch {
    res.status(500).json({ message: "Failed to delete expense." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createExpense,
  updateExpense,
  deleteExpense,
};
