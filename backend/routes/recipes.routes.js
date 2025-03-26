const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipes.controllers');
const { upload, handleMulterErrors } = require('../config/multer.config');
const verifyToken = require('../middlewares/verify.token.middleware');
const permit = require('../middlewares/permits.middleware')

router.post(
  '/recipes',
  verifyToken,
  permit,
  upload.single('image'),
  handleMulterErrors,
  RecipeController.createRecipe
);

router.get('/recipes', RecipeController.getAllRecipes);

router.get('/recipes/:id', RecipeController.getRecipe);

router.patch(
  '/recipes/:id',
  verifyToken,
  permit,
  upload.single('image'),
  handleMulterErrors,
  RecipeController.updateRecipe
);

module.exports = router;