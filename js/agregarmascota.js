document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRegistroMascota');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Capturar DATOS
            const nombre = document.getElementById('nombreMascota').value;
            const raza = document.getElementById('razaMascota').value;
            const edad = document.getElementById('edadMascota').value;
            const refugio = document.getElementById('refugioMascota').value;
            const detalles = document.getElementById('detallesMascota').value;
            
            // 2. VALIDACIONES LÓGICAS
            
            // A) Validar edad negativa
            // Intentamos convertir el inicio del texto a número (ej: "-2 años" -> -2)
            const edadNumero = parseInt(edad);
            
            // Si es un número y es menor que 0, o si el texto incluye un signo menos "-"
            if ((!isNaN(edadNumero) && edadNumero < 0) || edad.includes('-')) {
                alert("Error: La edad no puede ser negativa. Por favor ingresa un valor real (ej: '2 años').");
                // Ponemos el foco en el campo edad para que el usuario lo corrija
                document.getElementById('edadMascota').focus(); 
                return; // Detenemos el guardado aquí
            }

            // B) Validar Tamaño (Obligatorio)
            const tamanoInput = document.querySelector('input[name="tamano"]:checked');
            if (!tamanoInput) {
                alert("Por favor selecciona un tamaño para la mascota.");
                return;
            }
            const tamano = tamanoInput.value;

            // Capturar Multiples Checkboxes (Salud y Condición)
            const saludInputs = document.querySelectorAll('input[name="salud"]:checked');
            const saludValues = Array.from(saludInputs).map(cb => cb.value); 

            const condicionInputs = document.querySelectorAll('input[name="condicion"]:checked');
            const condicionValues = Array.from(condicionInputs).map(cb => cb.value); 

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
                imagen: "https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?auto=format&fit=crop&w=600&q=80", // Imagen por defecto
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