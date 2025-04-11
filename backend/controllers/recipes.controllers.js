const RecipeService = require('../services/recipe.services');
const uploadImage = require('../utils/uploadImage');
const removeImage = require('../utils/removeImage');

const RecipeController = {
  createRecipe: async (req, res) => {
    let imagePath; // Declarar fuera del try para acceso en catch
    
    try {
      console.log('Archivos recibidos:', req.files)
      // Verificar si se subió una imagen
      if (!req.files?.image) {
        throw new Error('Debes subir una imagen para la receta');
      }

      console.log('Archivo recibido')
      // Subir la imagen
      imagePath = await uploadImage(req.files.image);

      // Crear la receta con la ruta de la imagen
      console.log(imagePath)
      const recipeData = {
        ...req.body,
        image: imagePath,
        author: req.user.id
      };

      console.log(recipeData)
      const recipe = await RecipeService.createRecipe(recipeData);

      // Respuesta exitosa
      res.status(201).json({
        success: true,
        data: recipe
      });

    } catch (error) {
      // Manejo de errores
      console.error('Error en createRecipe:', error);

      // Limpiar imagen subida en caso de error
      if (imagePath) {
        removeImage(imagePath);
      }



      res.status(200).json({
        ok: true,
        message: 'Receta creada correctamente'
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
  },

  getOneRecipe : async (req, res) => {
    try {
      const recipe = await RecipeService.getOneRecipe(req.params.id)
        res.json({
        success: true,
        data: recipe
        });
    } catch (error) {
      res.status(500).json({
      success: false,
      message: error.message
      });
    }
  },

  getRecipesByCategory : async (req, res) => {
    try {
        const recipes = await RecipeService.getRecipesByCategory(req.params.id)
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
}
};

const getUserRecipes = async (req, res) => {
  try {
    const recipes = await RecipeService.getUserRecipes(req.user.id);
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
}

module.exports = RecipeController;