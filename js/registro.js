document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');

    if(registroForm) {
        registroForm.addEventListener('submit', (e) => {
            // 1. Evitamos que la página se recargue sola
            e.preventDefault();

            // 2. Capturamos los datos
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;

            // 3. Validación: Que las contraseñas sean iguales
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
                return; // Detiene el código aquí si hay error
            }

            // 4. Si todo está bien:
            alert("¡Registro exitoso! Ahora inicia sesión.");
            
            // --- ESTA ES LA LÍNEA MÁGICA QUE REDIRECCIONA ---
            window.location.href = 'login.html'; 
        });
    }
});