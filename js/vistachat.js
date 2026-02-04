document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PROTECCIÓN DE SESIÓN (OBLIGATORIO)
    // Si no hay usuario logueado, lo saca de aquí inmediatamente.
    const isLogged = localStorage.getItem('usuarioLogueado');
    if (isLogged !== 'true') {
        alert("Debes iniciar sesión para acceder al chat.");
        window.location.href = 'login.html';
        return; // Detiene el script
    }

    // 2. BOTÓN DE VOLVER
    // Debe llevar al index principal (saliendo de la carpeta html)
    const btnVolver = document.getElementById('btn-volver');
    if(btnVolver) {
        btnVolver.onclick = () => {
            window.location.href = '../index.html';
        };
    }

    // 3. LÓGICA DEL CHAT (Simulación)
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages-container');

    // Función para agregar mensaje al HTML
    function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`; // 'sent' o 'received'
        
        // Hora actual
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        msgDiv.innerHTML = `
            <div class="bubble">
                ${text}
                <span class="msg-time"><i class="far fa-clock"></i> ${timeString}</span>
            </div>
        `;
        
        messagesContainer.appendChild(msgDiv);
        // Scroll automático al final
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Evento Click Botón Enviar
    sendBtn.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (text !== "") {
            addMessage(text, 'sent'); // Agrega mensaje naranja
            messageInput.value = ""; // Limpia el input

            // Simular respuesta automática del refugio
            setTimeout(() => {
                addMessage("¡Gracias por escribirnos! En un momento te atendemos.", "received");
            }, 1500);
        }
    });

    // Permitir enviar con la tecla Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Scroll al fondo al cargar
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});