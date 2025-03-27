const Recipe = require('../models/recipes.models')

const getAllRecipes = async () => {
    try {
        const recipes = await recipe.find()
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

module.exports = { getAllRecipes, createRecipe, updateRecipe, deleteRecipe};