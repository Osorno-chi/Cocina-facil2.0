const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipes.controllers');
const verifyToken = require('../middlewares/verify.token.middleware');
const permit = require('../middlewares/permits.middleware')


router.post(
  '/recipes',
  verifyToken,
  RecipeController.createRecipe
);

router.get('/recipes', RecipeController.getAllRecipes);

router.get('/recipes/:id', RecipeController.getOneRecipe);

router.get('/recipes/category/:id', RecipeController.getRecipesByCategory);

router.patch(
  '/recipes/:id',
  verifyToken,
  permit,
  RecipeController.updateRecipe
);

module.exports = router;