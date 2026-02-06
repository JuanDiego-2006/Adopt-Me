document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar Sesión
    const isLogged = localStorage.getItem('usuarioLogueado');
    const rol = localStorage.getItem('rolUsuario'); 
    
    // Elementos del DOM
    const botonesInvitado = document.getElementById('botones-invitado');
    const panelUsuario = document.getElementById('panel-usuario');
    const nombreDisplay = document.getElementById('nombre-display');
    const linkPerfil = document.querySelector('.profile-link-wrapper'); 
    const logoContainer = document.querySelector('.logo-container'); 
    
    // El botón oculto de estadísticas
    const btnEstadisticas = document.getElementById('btn-estadisticas');

    if (isLogged === 'true') {
        // --- ESTÁ LOGUEADO ---
        if(botonesInvitado) botonesInvitado.style.display = 'none';
        if(panelUsuario) panelUsuario.style.display = 'flex';
        
        // Recuperar nombre
        const nombreUser = localStorage.getItem('nombreUsuario') || 'Usuario';
        if(nombreDisplay) nombreDisplay.textContent = nombreUser;

        // --- LÓGICA DE ADMIN ---
        if (rol === 'admin') {
            // 1. Redirecciones Admin
            if(logoContainer) logoContainer.href = 'index-admin.html';
            if(linkPerfil) linkPerfil.href = 'index-admin.html';

            // 2. Cambiar enlaces del menú
            const linkMensajes = document.querySelector('a[href="vistachat.html"]');
            if (linkMensajes) linkMensajes.href = 'chat-admin.html';

            // 3. MOSTRAR BOTÓN DE ESTADÍSTICAS (Solo Admin)
            if (btnEstadisticas) {
                btnEstadisticas.style.display = 'flex';
            }

        } else {
            // Usuario Normal
            if(linkPerfil) linkPerfil.href = 'perfil.html';
        }

    } else {
        // --- NO ESTÁ LOGUEADO ---
        if(botonesInvitado) botonesInvitado.style.display = 'flex';
        if(panelUsuario) panelUsuario.style.display = 'none';
    }
});

function cerrarSesion() {
    if(confirm("¿Cerrar sesión?")) {
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('rolUsuario');
        window.location.href = '../index.html';
    }
}