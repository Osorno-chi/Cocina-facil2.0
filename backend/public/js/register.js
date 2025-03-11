document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM (IDs actualizados)
    const registerForm = document.getElementById('registerForm');
    const nombreInput = document.getElementById('nombre'); // Nuevo campo
    const usernameInput = document.getElementById('usuario'); // ID corregido
    const emailInput = document.getElementById('correo'); // ID corregido
    const passwordInput = document.getElementById('password');

    // Validar elementos
    if (!registerForm || !nombreInput || !usernameInput || !emailInput || !passwordInput) {
        alert("Error crítico: El formulario no está configurado correctamente");
        return;
    }

    // Evento de registro
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Obtener valores (incluyendo el nombre)
        const nombre = nombreInput.value;
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validar campos vacíos
        if (!nombre || !username || !email || !password) {
            alert("⚠️ Todos los campos son obligatorios");
            return;
        }

        try {
            // Enviar datos al servidor (incluyendo el nombre)
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nombre, // Nuevo campo
                    username, 
                    email, 
                    password 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error en el registro");
            }

            alert("🎉 ¡Registro exitoso!");
            window.location.href =  "backend/pages/register.js";

        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        }
    });
});