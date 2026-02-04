document.addEventListener('DOMContentLoaded', () => {

    // DATOS DE EJEMPLO (Basados en tu imagen)
    const chats = [
        {
            id: 1,
            user: "María González",
            email: "maria@email.com",
            userImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
            pet: "Max",
            petImg: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80",
            status: "Pendiente",
            lastMsg: "Hola, estoy interesado en adoptar a...",
            time: "Hace 2 min",
            unread: 1,
            history: [
                { type: "received", text: "Hola, estoy interesado en adoptar a Max. ¿Cuándo puedo visitarlo?", time: "10:30 AM" }
            ]
        },
        {
            id: 2,
            user: "Carlos Ruiz",
            email: "carlos@email.com",
            userImg: "https://ui-avatars.com/api/?name=Carlos+Ruiz&background=random",
            pet: "Bella",
            petImg: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=100&q=80",
            status: "Respondido",
            lastMsg: "Gracias por la información!",
            time: "Hace 30 min",
            unread: 0,
            history: [
                { type: "received", text: "¿Bella convive con gatos?", time: "09:00 AM" },
                { type: "sent", text: "Sí, es muy amigable.", time: "09:15 AM" },
                { type: "received", text: "Gracias por la información!", time: "09:30 AM" }
            ]
        },
        {
            id: 3,
            user: "Ana Martínez",
            email: "ana@email.com",
            userImg: "https://ui-avatars.com/api/?name=Ana+M&background=random",
            pet: "Charlie",
            petImg: "https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?auto=format&fit=crop&w=100&q=80",
            status: "Cerrado",
            lastMsg: "Conversación cerrada - Adopción completada",
            time: "Ayer",
            unread: 0,
            history: []
        },
        {
            id: 4,
            user: "Pedro Sánchez",
            email: "pedro@email.com",
            userImg: "https://ui-avatars.com/api/?name=Pedro+S&background=random",
            pet: "Luna",
            petImg: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=100&q=80",
            status: "Pendiente",
            lastMsg: "¿Luna necesita cuidados especiales?",
            time: "Hace 1 hora",
            unread: 2,
            history: [
                { type: "received", text: "¿Luna necesita cuidados especiales?", time: "11:00 AM" }
            ]
        }
    ];

    let activeChatId = null;

    // Elementos DOM
    const listContainer = document.getElementById('listaConversaciones');
    const chatHeader = document.getElementById('chatHeaderContainer');
    const msgArea = document.getElementById('messagesArea');
    const inputArea = document.getElementById('inputAreaContainer');

    // RENDERIZAR LISTA
    function renderList() {
        listContainer.innerHTML = "";
        chats.forEach(chat => {
            const isActive = chat.id === activeChatId ? 'selected' : '';
            
            // Clase para el badge de estado
            let statusClass = 'badge-gray';
            if(chat.status === 'Pendiente') statusClass = 'badge-yellow';
            if(chat.status === 'Respondido') statusClass = 'badge-green';

            // Badge de no leídos
            const unreadHtml = chat.unread > 0 ? `<div class="unread-count">${chat.unread}</div>` : '';

            const item = document.createElement('div');
            item.className = `list-item ${isActive}`;
            item.onclick = () => loadChat(chat.id);
            item.innerHTML = `
                <div class="avatar-wrapper">
                    <img src="${chat.userImg}" class="main-avatar">
                    <img src="${chat.petImg}" class="pet-mini-avatar">
                </div>
                <div class="item-content">
                    <div class="item-top">
                        <span class="item-name">${chat.user}</span>
                        <span class="item-time">${chat.time}</span>
                    </div>
                    <div class="item-badges">
                        <span class="mini-badge ${statusClass}">${chat.status}</span>
                        <span class="pet-label">Sobre: ${chat.pet}</span>
                    </div>
                    <p class="item-msg">${chat.lastMsg}</p>
                </div>
                ${unreadHtml}
            `;
            listContainer.appendChild(item);
        });
    }

    // CARGAR CHAT DERECHA
    window.loadChat = (id) => {
        activeChatId = id;
        renderList(); // Refrescar visualmente la selección

        const chat = chats.find(c => c.id === id);
        
        // Mostrar áreas ocultas
        chatHeader.style.display = 'flex';
        inputArea.style.display = 'block';
        
        // Llenar Header
        document.getElementById('header-avatar').src = chat.userImg;
        document.getElementById('header-name').textContent = chat.user;
        document.getElementById('header-email').textContent = chat.email;
        document.getElementById('header-pet').textContent = chat.pet;
        document.getElementById('header-badge').textContent = chat.status;
        document.getElementById('header-pet-img').src = chat.petImg;

        // Renderizar Mensajes
        msgArea.innerHTML = "";
        if(chat.history.length === 0) {
             msgArea.innerHTML = `<div class="empty-state" style="margin-top:50px"><p>No hay mensajes previos.</p></div>`;
        } else {
            chat.history.forEach(msg => {
                const bubble = document.createElement('div');
                bubble.className = `msg-bubble ${msg.type === 'sent' ? 'msg-sent' : 'msg-received'}`;
                bubble.innerHTML = `
                    ${msg.text}
                    <span class="time-stamp">${msg.time}</span>
                `;
                msgArea.appendChild(bubble);
            });
        }
        msgArea.scrollTop = msgArea.scrollHeight;
    };

    // BOTÓN CERRAR
    window.cerrarChatActual = () => {
        activeChatId = null;
        renderList();
        chatHeader.style.display = 'none';
        inputArea.style.display = 'none';
        msgArea.innerHTML = `
            <div class="empty-state">
                <i class="far fa-paper-plane"></i>
                <h3>Selecciona una conversación</h3>
                <p>Elige un usuario de la lista izquierda.</p>
            </div>
        `;
    };

    // ENVIAR MENSAJE
    const btnSend = document.getElementById('btnEnviar');
    const input = document.getElementById('adminInput');

    btnSend.onclick = () => {
        const text = input.value.trim();
        if(text && activeChatId) {
            const chat = chats.find(c => c.id === activeChatId);
            const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            // Agregar al historial
            chat.history.push({ type: 'sent', text: text, time: time });
            chat.status = 'Respondido';
            chat.unread = 0;
            
            input.value = "";
            loadChat(activeChatId); // Recargar chat para ver mensaje nuevo
        }
    };

    // Enter para enviar
    input.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') btnSend.click();
    });

    // Inicializar
    renderList();
});