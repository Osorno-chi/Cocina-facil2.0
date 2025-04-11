const Recipe = require('../models/recipes.models')

const authorPermission = () => {
    return async (req, res, next) => {
      try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
        
        if (recipe.author.toString() !== req.user.id) {
          return res.status(403).json({ message: 'No tienes permisos' });
        }
        next();
      } catch (error) {
        res.status(500).json({ message: 'Error de servidor' });
      }
    }
}

module.exports= authorPermission;