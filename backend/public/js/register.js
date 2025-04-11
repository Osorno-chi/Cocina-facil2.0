document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const nombreInput = document.getElementById('nombre'); 
    const usernameInput = document.getElementById('usuario'); 
    const emailInput = document.getElementById('correo'); 
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
                    nombre, 
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

            alert("¡Registro exitoso!");
            window.location.href =  "../login";

        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error(error)
            grecaptcha.reset();

        }
    });
});