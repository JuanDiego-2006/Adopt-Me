document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SESIÓN Y VISUALIZACIÓN
    const isLogged = localStorage.getItem('usuarioLogueado');
    const rol = localStorage.getItem('rolUsuario');

    // --- CORRECCIÓN CLAVE: SI ES ADMIN, REDIRIGIR AL PANEL ADMIN ---
    if (isLogged === 'true' && rol === 'admin') {
        window.location.href = 'html/index-admin.html';
        return; // Detenemos la carga del index de usuario
    }
    // -------------------------------------------------------------

    const botonesInvitado = document.getElementById('botones-invitado');
    const panelUsuario = document.getElementById('panel-usuario');
    const nombreDisplay = document.getElementById('nombre-display');

    if (isLogged === 'true') {
        if(botonesInvitado) botonesInvitado.style.display = 'none';
        if(panelUsuario) panelUsuario.style.display = 'flex';
        if(nombreDisplay) nombreDisplay.textContent = localStorage.getItem('nombreUsuario') || 'Amigo';
    } else {
        if(botonesInvitado) botonesInvitado.style.display = 'flex';
        if(panelUsuario) panelUsuario.style.display = 'none';
    }

    // 2. MODAL DETALLE MASCOTA
    const modalMascota = document.getElementById('modal-mascota');
    const closeMascotaBtn = document.querySelector('.close-modal');
    const botonesConocer = document.querySelectorAll('.btn-conocer');

    if (botonesConocer.length > 0) {
        botonesConocer.forEach(btn => {
            btn.addEventListener('click', () => {
                const sesionActiva = localStorage.getItem('usuarioLogueado');
                if (sesionActiva === 'true') {
                    if(modalMascota) modalMascota.style.display = 'flex';
                } else {
                    alert("¡Hola! Para ver los detalles de la mascota necesitas iniciar sesión.");
                    window.location.href = 'html/login.html';
                }
            });
        });
    }

    if(closeMascotaBtn && modalMascota) {
        closeMascotaBtn.addEventListener('click', () => {
            modalMascota.style.display = 'none';
        });
    }

    // Cerrar al dar click fuera
    window.addEventListener('click', (e) => {
        if (modalMascota && e.target === modalMascota) modalMascota.style.display = 'none';
    });
});

function irASolicitud() {
    window.location.href = 'html/solicitud.html';
}

function irAAgendar() {
    window.location.href = 'html/agendar.html';
}

function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('rolUsuario'); // Importante borrar el rol
    window.location.reload();
}