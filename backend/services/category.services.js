const Category = require('../models/category.models');

const CategoryService = {

  // Obtener todas las categorías
  getAllCategories: async () => {
    try {
      return await Category.find().sort({ name: 1 });
    } catch (error) {
      throw new Error(`Error al obtener categorías: ${error.message}`);
    }
  },

};

module.exports = CategoryService;