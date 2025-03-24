const API_URL = '/api';

// ====================== FUNCIÓN DE LOGIN ======================
const loginUser = async (email, password, captchaResponse) => {
    console.log(email, password, captchaResponse)
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, 
                password,
                captcha: captchaResponse
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error en el inicio de sesión');
        }

        localStorage.setItem('token', data.token);
        window.location.href = '../'; // Redirección relativa

    } catch (error) {
        alert(error.message);
        grecaptcha.reset();
    }
};

// ====================== EVENTOS ======================
// Login
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        alert('¡Completa el reCAPTCHA!');
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    loginUser(email, password, captchaResponse);
});