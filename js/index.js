document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SESIÓN
    const isLogged = localStorage.getItem('usuarioLogueado');
    const rol = localStorage.getItem('rolUsuario');

    if (isLogged === 'true' && rol === 'admin') {
        window.location.href = 'html/index-admin.html';
        return; 
    }

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

    // ============================================
    // 2. LÓGICA DE FILTROS (NUEVO CÓDIGO)
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const petCards = document.querySelectorAll('.pet-card');

    if (filterBtns.length > 0 && petCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // a) Quitar clase 'active' de todos y ponerla al clickeado
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // b) Obtener el filtro (en minúsculas)
                const filtro = btn.getAttribute('data-filter') || btn.textContent.toLowerCase();

                // c) Mostrar u ocultar tarjetas
                petCards.forEach(card => {
                    const tags = card.getAttribute('data-tags');
                    
                    if (filtro === 'todos') {
                        card.style.display = 'block'; // Mostrar todo
                    } else {
                        // Si las etiquetas de la tarjeta incluyen el filtro, mostrar
                        if (tags && tags.includes(filtro)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // 3. MODAL DETALLE MASCOTA
    const modalMascota = document.getElementById('modal-mascota');
    const closeMascotaBtn = document.querySelector('.btn-close-vert'); 
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

    window.addEventListener('click', (e) => {
        if (modalMascota && e.target === modalMascota) modalMascota.style.display = 'none';
    });
});

// FUNCIONES GLOBALES
function cerrarModal() {
    const modal = document.getElementById('modal-mascota');
    if(modal) modal.style.display = 'none';
}

function irASolicitud() {
    window.location.href = 'html/solicitud.html';
}

function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('rolUsuario'); 
    window.location.reload();
}