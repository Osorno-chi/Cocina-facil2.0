document.getElementById('avatar').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarPreview').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('profileForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('avatar', document.getElementById('avatar').files[0]);

    try {
        const response = await fetch('/api/perfil/actualizar', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';

        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Perfil actualizado exitosamente';
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = data.message || 'Error al actualizar el perfil';
        }
    } catch (error) {
        console.error('Error:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Error de conexión';
    }
});