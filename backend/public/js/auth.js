// Login
document.addEventListener('DOMContentLoaded', ()=>{


    document.getElementById('loginForm').addEventListener('submit', async(event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse) {
            alert('¡Completa el reCAPTCHA!');
            return;
        }
        
        // ====================== FUNCIÓN DE LOGIN ======================
    console.log(email, password, captchaResponse)
    
    try {
        const response = await fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, 
                password,
                captcha: captchaResponse
            })
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
        
        if (!data.ok) {
            throw new Error(data.error || 'Error en el inicio de sesión');
        }

        localStorage.setItem('token', data.response.token);
        window.location.href = '../'; 

        } catch (error) {
            alert(error.message);
            grecaptcha.reset();
        }
    })
})