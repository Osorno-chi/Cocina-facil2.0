const mongoose = requiere('mongoose')

const recipeModel = new mongoose.Schema({
    name: {type: String, required: true},
    description: { type: String, required: true},
    ingredients: [{type: String, required: true}],
    steps: [{type: String, required: true}],
    category: {type: mongoose.Schema.ObjectId, ref:"Category"},
    author: {type: mongoose.Schema.Types.ObjectId, ref:"User"}
})

module.exports = mongoose.model('Recipe', recipeModel)