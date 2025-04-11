const Recipe = require('../models/recipes.models')

const getOneRecipe = async (id) =>{
    try {
        const recipe = await Recipe.findById(id)
        return recipe
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllRecipes = async () => {
    try {
        const recipes = await Recipe.find()
        return recipes
    } catch (error){
        throw new Error(error.message);
    }
}

const createRecipe = async (recipeData) => {
    try {
        // Convertir JSON strings a objetos
        const parsedData = {
            ...recipeData,
            ingredients: JSON.parse(recipeData.ingredients),
            instructions: JSON.parse(recipeData.instructions),
            preparationTime: parseInt(recipeData.preparationTime)
        };

        const newRecipe = new Recipe(parsedData);
        await newRecipe.save();
        return newRecipe;
    } catch (error) {
        throw new Error(error.message); // Corregir typo "massage"
    }
};

const updateRecipe = async (id, data) => {
    try {
        const updatedRecipe = await recipe.findByIdAndUpdate(id, data,{
            new: true, runValidators: true
        })
        return updatedRecipe
    } catch (error) {
        throw new Error(error.massage)
        
    }
}

const deleteRecipe = async (id) => {
    try {
        const deletedRecipe = await recipe.findByIdAndDelete(id)
        return deletedRecipe
    } catch (error) {
        throw new Error(error.massage)
        
    }
}

const getUserRecipes = async (userId) => {
    return Recipe.find({ author: userId }).populate('category');
  }

const getRecipesByCategory = async (id) => {
    try {
        const recipes = await recipe.find({category:id})
        return recipes
    } catch (error){
        throw new Error(error.message);
    }
}

module.exports = { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, getUserRecipes, getRecipesByCategory, getOneRecipe};