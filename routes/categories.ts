const express = require("express");
const categoryRoutes = express.Router();

const {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categories");

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getSingleCategory);
categoryRoutes.post("/", createCategory);
categoryRoutes.put("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);

module.exports = categoryRoutes;
export {};