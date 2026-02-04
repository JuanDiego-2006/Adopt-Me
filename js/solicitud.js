document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Verificar si hay sesión (Opcional: Si no está logueado, no debería poder adoptar)
    const isLogged = localStorage.getItem('usuarioLogueado');
    if (isLogged !== 'true') {
        alert("Para adoptar necesitas iniciar sesión primero.");
        window.location.href = 'login.html';
        return; // Detenemos la ejecución
    }

    // 2. Manejo del Formulario
    const form = document.getElementById('adoptionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que se recargue la página

            // Aquí podrías validar campos específicos si quisieras
            // const nombre = document.querySelector('input[type="text"]').value;
            
            // Simulación de envío
            const boton = document.querySelector('.btn-submit');
            boton.textContent = "Enviando...";
            boton.disabled = true;

            setTimeout(() => {
                // Redirigir a la confirmación
                // Asegúrate que tu archivo HTML se llame igual (confirmacion.html o solicitudenviada.html)
                window.location.href = 'solicitudenviada.html'; 
            }, 1500); // Esperamos 1.5 segundos para que se vea real
        });
    }
});