document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar Sesión
    const isLogged = localStorage.getItem('usuarioLogueado');
    const rol = localStorage.getItem('rolUsuario'); 
    
    // Elementos
    const botonesInvitado = document.getElementById('botones-invitado');
    const panelUsuario = document.getElementById('panel-usuario');
    const nombreDisplay = document.getElementById('nombre-display');
    const linkPerfil = document.querySelector('.profile-link-wrapper'); 
    const logoContainer = document.querySelector('.logo-container'); 
    
    // Botón Estadísticas
    const btnEstadisticas = document.getElementById('btn-estadisticas');

    if (isLogged === 'true') {
        // --- LOGUEADO ---
        if(botonesInvitado) botonesInvitado.style.display = 'none';
        if(panelUsuario) panelUsuario.style.display = 'flex';
        
        // Recuperar nombre
        const nombreUser = localStorage.getItem('nombreUsuario') || 'Usuario';
        if(nombreDisplay) nombreDisplay.textContent = nombreUser;
        
        // --- LÓGICA ADMIN ---
        if (rol === 'admin') {
            // Redirecciones
            if(logoContainer) logoContainer.href = 'index-admin.html';
            if(linkPerfil) linkPerfil.href = 'index-admin.html';

            // Menu
            const linkMensajes = document.querySelector('a[href="vistachat.html"]');
            if (linkMensajes) linkMensajes.href = 'chat-admin.html';

            const linkVisitas = document.querySelector('a[href="mis-visitas.html"]');
            if (linkVisitas) {
                linkVisitas.href = 'gestion-visitas.html';
                linkVisitas.innerHTML = '<i class="far fa-calendar-check"></i> Visitas';
            }

            // MOSTRAR BOTÓN ESTADÍSTICAS
            if (btnEstadisticas) {
                btnEstadisticas.style.display = 'flex';
            }

        } else {
            // Usuario Normal
            if(linkPerfil) linkPerfil.href = 'perfil.html';
        }

    } else {
        // --- INVITADO ---
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