const express = require("express");
const expenses = require("./expenses");
const auth = require("./auth");
const apiDocs = require("./apiDocs");
const categories = require("./categories");
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});
 
router.get('/homePage', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.render('home', { user: req.user });
});
 
router.get('/expenses-page', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('expenses', { user: req.user });
});
 
router.get('/add-expense', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('add-expense', { user: req.user });
});
 
router.get('/edit-expense/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('edit-expense', { user: req.user, expenseId: req.params.id });
});
 
router.get('/categories-page', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('categories', { user: req.user });
});
 
router.get('/add-category', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('add-category', { user: req.user });
});
 
router.get('/edit-category/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('edit-category', { user: req.user, categoryId: req.params.id });
});

router.use("/expenses", expenses);
router.use("/auth", auth);
router.use("/api-docs", apiDocs);
router.use("/categories", categories);

module.exports = router;
