let tarjetaEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SEGURIDAD
    const isLogged = localStorage.getItem('usuarioLogueado');
    const rol = localStorage.getItem('rolUsuario');

    if (isLogged !== 'true' || rol !== 'admin') {
        alert("Acceso denegado. Esta área es solo para administradores.");
        window.location.href = '../index.html'; 
        return;
    }

    // 2. BOTÓN AGREGAR
    const btnAgregar = document.querySelector('.btn-add');
    if(btnAgregar) {
        btnAgregar.addEventListener('click', () => {
            window.location.href = 'agregarmascota.html';
        });
    }

    // 3. CARGAR MASCOTAS
    cargarMascotas();

    // 4. ABRIR EL MODAL (DETECTAR CLICK EN EDITAR)
    const grid = document.querySelector('.pets-grid');
    if(grid) {
        grid.addEventListener('click', (e) => {
            const btnEditar = e.target.closest('.btn-editar');
            
            if (btnEditar) {
                // GUARDAMOS LA TARJETA QUE ESTAMOS EDITANDO EN LA VARIABLE GLOBAL
                tarjetaEditando = btnEditar.closest('.pet-card');
                
                const nombreCompleto = tarjetaEditando.querySelector('h3').innerText; 
                const nombre = nombreCompleto.split(',')[0].trim();
                const edad = nombreCompleto.split(',')[1] ? nombreCompleto.split(',')[1].trim() : "";
                const raza = tarjetaEditando.querySelector('.breed').innerText;
                const img = tarjetaEditando.querySelector('img').src;
                const estado = tarjetaEditando.querySelector('.badge').innerText;

                abrirModalEditar(nombre, edad, raza, img, estado);
            }
        });
    }

    // 5. GUARDAR CAMBIOS (CON VALIDACIÓN DE EDAD)
    const formEditar = document.getElementById('formEditarCompleto');
    if(formEditar) {
        formEditar.addEventListener('submit', (e) => {
            e.preventDefault(); 

            if (tarjetaEditando) {
                const nuevaEdad = document.getElementById('inputEdad').value;
                const nuevoEstado = document.getElementById('inputEstado').value;
                const nombreOriginal = document.getElementById('tituloEdit').innerText.split(',')[0];

                // --- VALIDACIÓN DE EDAD NEGATIVA ---
                const edadNumero = parseInt(nuevaEdad);
                // Si es un número negativo o el texto tiene un guion "-"
                if ((!isNaN(edadNumero) && edadNumero < 0) || nuevaEdad.includes('-')) {
                    alert("Error: La edad no puede ser negativa.");
                    document.getElementById('inputEdad').focus();
                    return; // Detiene el guardado
                }

                // ACTUALIZAR TÍTULO
                tarjetaEditando.querySelector('h3').innerHTML = `${nombreOriginal}, <span>${nuevaEdad}</span>`;
                
                // ACTUALIZAR BADGE
                const badge = tarjetaEditando.querySelector('.badge');
                badge.innerText = nuevoEstado;
                
                badge.className = 'badge'; 
                if(nuevoEstado === 'Disponible') badge.classList.add('disponible');
                else if(nuevoEstado === 'Pendiente') badge.classList.add('pendiente');
                else if(nuevoEstado === 'Adoptado') badge.classList.add('adoptado');
                else badge.classList.add('disponible');

                alert("¡Cambios aplicados correctamente!");
                cerrarModalEditar();
            }
        });
    }
});

// --- FUNCIONES DEL MODAL ---
function abrirModalEditar(nombre, edad, raza, imagen, estado) {
    const modal = document.getElementById('modalEditar');
    document.getElementById('imgEditPreview').src = imagen;
    document.getElementById('tituloEdit').innerHTML = `${nombre}, ${edad} <i class="fas fa-pen icon-header"></i>`;
    document.getElementById('razaEdit').innerHTML = `${raza} <i class="fas fa-pen icon-header"></i>`;
    document.getElementById('inputEdad').value = edad;
    document.getElementById('inputEstado').value = estado; 
    modal.classList.remove('hidden');
}

function cerrarModalEditar() {
    document.getElementById('modalEditar').classList.add('hidden');
    tarjetaEditando = null;
}

function cerrarSesionAdmin() {
    if(confirm("¿Deseas salir del panel de administración?")) {
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('rolUsuario');
        localStorage.removeItem('nombreUsuario');
        window.location.href = '../index.html';
    }
}

function cargarMascotas() {
    const grid = document.querySelector('.pets-grid');
    const mascotasEstaticas = [
        { nombre: "Max", edad: "1 año", raza: "Golden Retriever", estado: "Disponible", img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80" },
        { nombre: "Bella", edad: "6 meses", raza: "Beagle Mix", estado: "Pendiente", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80" },
        { nombre: "Charlie", edad: "3 años", raza: "Labrador", estado: "Adoptado", img: "https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?auto=format&fit=crop&w=600&q=80" },
        { nombre: "Luna", edad: "4 meses", raza: "Bulldog", estado: "Disponible", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80" },
        { nombre: "Rocky", edad: "2 años", raza: "Husky", estado: "Disponible", img: "https://images.unsplash.com/photo-1563889958749-6bb6c1284eb3?auto=format&fit=crop&w=600&q=80" },
        { nombre: "Coco", edad: "8 meses", raza: "Corgi", estado: "Pendiente", img: "https://images.unsplash.com/photo-1612536050381-7110fd254803?auto=format&fit=crop&w=600&q=80" }
    ];
    const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotasRegistradas') || "[]");
    const todasLasMascotas = [...mascotasEstaticas, ...mascotasGuardadas];
    grid.innerHTML = "";

    todasLasMascotas.forEach(mascota => {
        const imagenFinal = mascota.imagen || mascota.img; 
        let claseBadge = "disponible"; 
        if(mascota.estado === "Pendiente") claseBadge = "pendiente";
        if(mascota.estado === "Adoptado") claseBadge = "adoptado";

        const tarjetaHTML = `
            <div class="pet-card">
                <div class="card-image">
                    <span class="badge ${claseBadge}">${mascota.estado}</span>
                    <img src="${imagenFinal}" alt="${mascota.nombre}">
                </div>
                <div class="card-info">
                    <div class="pet-header">
                        <h3>${mascota.nombre}, <span>${mascota.edad}</span></h3>
                    </div>
                    <p class="breed">${mascota.raza}</p>
                    <div class="card-footer-admin">
                        <button class="btn-editar">
                            Editar <i class="fas fa-pen"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += tarjetaHTML;
    });
}