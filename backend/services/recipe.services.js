const recipe = require('../models/recipes.models')

const getAllRecipes = async () => {
    try {
        const recipes = await recipe.find()
        return recipes
    }catch (error){
        throw new Error(error.message);
    }
}

const createRecipe = async (name, description, ingredients, steps, category, author) => {
    try {
        const newRecipe = new recipe({ name, description, ingredients, steps, category, author});
        await newRecipe.save();
        return {message: 'Receta creada exitosamente'};
    } catch (error) {
        throw new Error(error.massage)
    }
}

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