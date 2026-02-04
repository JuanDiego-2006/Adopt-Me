document.addEventListener('DOMContentLoaded', () => {
    console.log("Solicitud enviada correctamente.");

    // Opcional: Redirección automática después de 10 segundos
    /*
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 10000);
    */
   
    // Manejo del botón de perfil (igual que en nosotros)
    const profileIcon = document.querySelector('.user-profile-icon');
    if(profileIcon) {
        profileIcon.onclick = () => {
            if(confirm("¿Ir al inicio?")) {
                window.location.href = '../index.html';
            }
        };
    }
});