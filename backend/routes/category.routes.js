const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controllers');

// Obtener todas las categorías
router.get('/', CategoryController.getAllCategories);

module.exports = router;