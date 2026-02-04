document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRegistroMascota');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Validar que se haya seleccionado un TAMAÑO (Obligatorio)
            const tamanoInput = document.querySelector('input[name="tamano"]:checked');
            if (!tamanoInput) {
                alert("Por favor selecciona un tamaño para la mascota.");
                return;
            }

            // 2. Capturar DATOS
            const nombre = document.getElementById('nombreMascota').value;
            const raza = document.getElementById('razaMascota').value;
            const edad = document.getElementById('edadMascota').value;
            const refugio = document.getElementById('refugioMascota').value;
            const detalles = document.getElementById('detallesMascota').value;
            const tamano = tamanoInput.value;

            // Capturar Multiples Checkboxes (Salud y Condición)
            const saludInputs = document.querySelectorAll('input[name="salud"]:checked');
            const saludValues = Array.from(saludInputs).map(cb => cb.value); // Crea lista ej: ["Vacunado"]

            const condicionInputs = document.querySelectorAll('input[name="condicion"]:checked');
            const condicionValues = Array.from(condicionInputs).map(cb => cb.value); // Ej: ["Ceguera"]

            // 3. Crear Objeto Mascota
            const nuevaMascota = {
                nombre: nombre,
                raza: raza,
                edad: edad,
                refugio: refugio,
                tamano: tamano,
                salud: saludValues.join(", ") || "No especificado",
                condicion: condicionValues.join(", ") || "Ninguna",
                detalles: detalles,
                imagen: "https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?auto=format&fit=crop&w=600&q=80", // Imagen genérica por ahora
                estado: "Disponible"
            };

            // 4. Guardar en LocalStorage
            let listaMascotas = JSON.parse(localStorage.getItem('mascotasRegistradas') || "[]");
            listaMascotas.push(nuevaMascota);
            localStorage.setItem('mascotasRegistradas', JSON.stringify(listaMascotas));

            // 5. Feedback visual y redirección
            const btnGuardar = document.querySelector('.btn-guardar');
            btnGuardar.textContent = "Guardando...";
            btnGuardar.style.backgroundColor = "#ccc";
            btnGuardar.disabled = true;

            setTimeout(() => {
                alert("¡Mascota registrada exitosamente!");
                window.location.href = 'index-admin.html';
            }, 1000);
        });
    }
});