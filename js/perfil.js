document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar nombre del usuario desde localStorage (si existe)
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    const userTitle = document.querySelector('.user-details h2');
    
    if (nombreGuardado && userTitle) {
        // Actualizamos el nombre en la tarjeta
        userTitle.textContent = nombreGuardado; // Ej: "Juanita Perez"
    }

    // Nota: Los datos como "Adopciones: 0" son estáticos por ahora,
    // pero aquí es donde los conectaríamos con una base de datos real en el futuro.
});

function cerrarSesionCompleta() {
    if(confirm("¿Estás seguro que deseas cerrar sesión?")) {
        // Borramos todo rastro de la sesión
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('nombreUsuario');
        
        // Redirigimos al inicio
        window.location.href = '../index.html';
    }
}