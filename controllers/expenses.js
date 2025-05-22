const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

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
  const expense = {
    name: req.body.name,
    categoryId: req.body.categoryId,
    price: req.body.price,
    date: req.body.date,
    description: req.body.description,
    transactionType: req.body.transactionType,
  };
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
};

const updateExpense = async (req, res, next) => {
  const expenseId = new ObjectId(req.params.id);
  const expense = {
    name: req.body.name,
    categoryId: req.body.categoryId,
    price: req.body.price,
    date: req.body.date,
    description: req.body.description,
    transactionType: req.body.transactionType,
  };
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
};

const deleteExpense = async (req, res, next) => {
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
};

module.exports = {
  getAll,
  getSingle,
  createExpense,
  updateExpense,
  deleteExpense,
};

