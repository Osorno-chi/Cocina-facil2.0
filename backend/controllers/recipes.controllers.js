const RecipeService = require('../services/recipe.services');

const RecipeController = {
  createRecipe: async (req, res) => {
    try {
      const recipe = await RecipeService.createRecipe(req.body, req.user.id);
      res.status(201).json({
        success: true,
        data: recipe
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  getAllRecipes: async (req, res) => {
    try {
      const recipes = await RecipeService.getAllRecipes();
      res.json({
        success: true,
        data: recipes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getRecipe: async (req, res) => {
    try {
      const recipe = await RecipeService.getRecipeById(req.params.id);
      res.json({
        success: true,
        data: recipe
      });
    } catch (error) {
      res.status(error.message.includes('not found') ? 404 : 500).json({
        success: false,
        message: error.message
      });
    }
  },

  updateRecipe: async (req, res) => {
    try {
      const updatedRecipe = await RecipeService.updateRecipe(
        req.params.id,
        req.body,
        req.user.id
      );
      res.json({
        success: true,
        data: updatedRecipe
      });
    } catch (error) {
      const statusCode = error.message.includes('unauthorized') ? 403 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = RecipeController;