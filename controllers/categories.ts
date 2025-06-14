const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const validateCategory = (category: any) => {
  const errors = [];
  if (
    category.name &&
    (typeof category.name !== "string" ||
      category.name.length < 3 ||
      category.name.length > 30)
  ) {
    errors.push("Name is required and must be between 3 and 30 characters.");
  }
  return errors;
};

const getAllCategories = async (req: any, res: any) => {
  const result = await mongodb
    .getDb()
    .db("expenses")
    .collection("categories")
    .find();
  result.toArray().then((categories: any) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(categories);
  });
};

const getSingleCategory = async (req: any, res: any) => {
  const categoryId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("expenses")
    .collection("categories")
    .find({ _id: categoryId });
  result.toArray().then((categories: any) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(categories[0]);
  });
};

const createCategory = async (req: any, res: any) => {
  try {
    const category = {
      name: req.body.name,
    };

    const validateErrors = validateCategory(category);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }
    const result = await mongodb
      .getDb()
      .db("expenses")
      .collection("categories")
      .insertOne(category);
    if (result.acknowledged) {
      res.status(201).json({ message: "Category created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create category." });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to create category.", error: error.message });
  }
};

const updateCategory = async (req: any, res: any) => {
  try {
    const categoryId = new ObjectId(req.params.id);
    const category = {
      name: req.body.name,
    };
    const validateErrors = validateCategory(category);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }

    const result = await mongodb
      .getDb()
      .db("expenses")
      .collection("categories")
      .replaceOne({ _id: categoryId }, category);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Category updated successfully" });
    } else {
      res.status(500).json({ message: "Failed to update category." });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to update category.", error: error.message });
  }
};

const deleteCategory = async (req: any, res: any) => {
  try {
    const categoryId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("expenses")
      .collection("categories")
      .deleteOne({ _id: categoryId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete category." });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to delete category.", error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export {};
