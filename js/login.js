document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // trim() elimina los espacios vacíos al inicio y final
            const email = document.getElementById('email').value.trim(); 
            const password = document.getElementById('password').value;

            if (email && password) {
                
                // --- LÓGICA DE ADMINISTRADOR ---
                // Si el correo termina en @adopt-me.com (ej: director@adopt-me.com)
                if (email.endsWith('@adopt-me.com')) {
                    
                    // 1. Guardamos los datos de sesión de ADMIN
                    localStorage.setItem('usuarioLogueado', 'true');
                    localStorage.setItem('rolUsuario', 'admin'); 
                    localStorage.setItem('nombreUsuario', 'Admin');
                    
                    alert("¡Bienvenido Administrador! Entrando al panel de gestión...");
                    
                    // --- CORRECCIÓN AQUÍ ---
                    // Antes decía 'admin_inicio.html', ahora dice el nombre correcto:
                    window.location.href = 'index-admin.html'; 

                } else {
                    // --- LÓGICA DE USUARIO NORMAL ---
                    localStorage.setItem('usuarioLogueado', 'true');
                    localStorage.setItem('rolUsuario', 'usuario');
                    
                    // Tomamos el nombre antes del @ para saludar
                    const nombreUser = email.split('@')[0]; 
                    localStorage.setItem('nombreUsuario', nombreUser);

                    alert("¡Bienvenido! Busquemos a tu amigo ideal...");
                    
                    // Redirige al inicio normal (que está una carpeta atrás)
                    window.location.href = '../index.html'; 
                }

            } else {
                alert("Por favor completa todos los campos");
            }
        });
    }
});