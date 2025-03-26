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
        const captchaResponse = grecaptcha.getResponse();

        if (!captchaResponse) {
            alert('¡Completa el reCAPTCHA!');
            return;
        }
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
        console.log('nombre', nombre)
        console.log('usarname', username)
        console.log('email', email)
        console.log('password', password)
        try {
            // Enviar datos al servidor (incluyendo el nombre)
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nombre, // Nuevo campo
                    username, 
                    email, 
                    password,
                    captcha:  captchaResponse
                }),
            });

            const data = await response.json();

            if (!data.ok) {
                throw new Error(data.error || "Error en el registro");
            }

            alert("🎉 ¡Registro exitoso!");
            window.location.href =  "../login";

        } catch (error) {
            alert(`❌ Error: ${error.message}`);
            console.error(error)
            grecaptcha.reset();

        }
    });
});