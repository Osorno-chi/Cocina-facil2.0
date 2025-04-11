// Función para añadir campos de ingredientes
function addIngredientField() {
    const newField = document.createElement('div');
    newField.className = 'ingredient-input-group';
    newField.innerHTML = `
        <input type="text" placeholder="Nombre del ingrediente" class="ingredient-name">
        <input type="text" placeholder="Cantidad (opcional)" class="ingredient-quantity">
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
    `;
    document.getElementById('ingredientsList').appendChild(newField);
}

// Función para añadir campos de instrucciones
function addInstructionField() {
    const newField = document.createElement('div');
    newField.className = 'instruction-input-group';
    newField.innerHTML = `
        <textarea placeholder="Paso de preparación"></textarea>
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
    `;
    document.getElementById('instructionsList').appendChild(newField);
}

// Manejo del formulario
document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Recopilar datos
    const ingredients = Array.from(document.getElementsByClassName('ingredient-input-group')).map(group => {
        return {
            name: group.querySelector('.ingredient-name').value,
            quantity: group.querySelector('.ingredient-quantity').value
        };
    });

    const instructions = Array.from(document.getElementsByClassName('instruction-input-group')).map(
        group => group.querySelector('textarea').value
    );

    const category = document.getElementById('category').value

    const categoryList = JSON.parse(localStorage.getItem('categories'))
    const selectedCategory=categoryList.find((obj)=>obj.name===category)
    
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('instructions', JSON.stringify(instructions));
    formData.append('preparationTime', document.getElementById('preparationTime').value);
    formData.append('category', selectedCategory._id);
    formData.append('image', document.getElementById('recipeImage').files[0]);
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }           
    try {
        console.log('try')
        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear la receta');
        }

        alert('¡Receta creada exitosamente! 🎉');
        window.location.href = '/index';
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Error:', error);
    }
});

document.addEventListener('DOMContentLoaded',async()=>{
    try {
        console.log('hola')
        if(localStorage.getItem('categories')){
            return
        }
        const categories = await fetch('/api/categories')
        const result = await categories.json()
        console.log(result)
        localStorage.setItem('categories', JSON.stringify(result.data))
    } catch (error) {
        console.error(error)
    }

})