const CategoryService = require('../services/category.services');

const CategoryController = {

  getAllCategories: async (req, res) => {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },
};

module.exports = CategoryController;