// Función para cargar los datos de la receta
const loadRecipeDetails = async () => {
    try {
        const recipeId = window.location.pathname.split('/').pop();
        const response = await fetch(`/api/recipes/${recipeId}`);
        
        if (!response.ok) throw new Error('Receta no encontrada');
        
        const recipe = await response.json();
        renderRecipeDetails(recipe.data);
        updateFavoriteButton(recipe.data._id);
    } catch (error) {
        showError(error.message);
    }
};

const renderRecipeDetails = (recipe) => {
    const container = document.getElementById('recipeContainer');
    
    const html = `
        <h1 id="recipeTitle">${recipe.title}</h1>
        <div class="description" id="recipeDescription">${recipe.description}</div>
        
        <div class="ingredients">
            <h2>Ingredientes</h2>
            <ul id="ingredientsList">
                ${recipe.ingredients.map(ing => `
                    <li>${ing.quantity ? ing.quantity + ' ' : ''}${ing.name}</li>
                `).join('')}
            </ul>
        </div>
        
        <div class="instructions">
            <h2>Preparación</h2>
            <ol id="instructionsList">
                ${recipe.instructions.map((step, index) => `
                    <li>${step}</li>
                `).join('')}
            </ol>
        </div>
    `;

    container.innerHTML = html;
};

// Manejar errores
const showError = (message) => {
    const container = document.getElementById('recipeContainer');
    container.innerHTML = `
        <div class="error-message">
            <h2>¡Ups! Algo salió mal</h2>
            <p>${message}</p>
            <a href="/">Volver al inicio</a>
        </div>
    `;
};

document.addEventListener('DOMContentLoaded', loadRecipeDetails);