document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CARGAR DATOS (Igual que en admin)
    // Lista estática base
    const mascotasEstaticas = [
        { estado: "Disponible" }, { estado: "Pendiente" }, 
        { estado: "Adoptado" }, { estado: "Disponible" }, 
        { estado: "Disponible" }, { estado: "Pendiente" }
    ];
    // Lista del LocalStorage (las nuevas)
    const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotasRegistradas') || "[]");
    
    // Unimos todo en una sola lista para contar
    const todasLasMascotas = [...mascotasEstaticas, ...mascotasGuardadas];

    // 2. CALCULAR CONTEOS
    const total = todasLasMascotas.length;
    let adoptados = 0;
    let pendientes = 0;
    let disponibles = 0;

    todasLasMascotas.forEach(m => {
        // Normalizamos el texto (mayúsculas/minúsculas)
        const estado = m.estado.toLowerCase();
        
        if(estado === 'adoptado') adoptados++;
        else if(estado === 'pendiente') pendientes++;
        else disponibles++; // Asumimos que el resto son disponibles
    });

    // 3. CALCULAR PORCENTAJES
    // Evitamos división por cero con (total || 1)
    const pctAdoptados = Math.round((adoptados / total) * 100);
    const pctPendientes = Math.round((pendientes / total) * 100);
    // El resto para que sume 100% exacto (a veces el redondeo falla por 1%)
    const pctDisponibles = 100 - pctAdoptados - pctPendientes; 

    // 4. ACTUALIZAR DOM (TEXTOS Y NÚMEROS)
    
    // Tarjetas Superiores
    document.getElementById('total-count').innerText = total;
    
    document.getElementById('adopted-count').innerText = adoptados;
    document.getElementById('adopted-pct').innerText = `${pctAdoptados}% del total`;

    document.getElementById('pending-count').innerText = pendientes;
    document.getElementById('pending-pct').innerText = `${pctPendientes}% del total`;

    document.getElementById('available-count').innerText = disponibles;
    document.getElementById('available-pct').innerText = `${pctDisponibles}% del total`;

    // Cajas de Detalle (Derecha)
    document.getElementById('det-adopt-num').innerText = adoptados;
    document.getElementById('det-adopt-pct').innerText = `${pctAdoptados}%`;

    document.getElementById('det-pend-num').innerText = pendientes;
    document.getElementById('det-pend-pct').innerText = `${pctPendientes}%`;

    document.getElementById('det-avail-num').innerText = disponibles;
    document.getElementById('det-avail-pct').innerText = `${pctDisponibles}%`;

    // Etiquetas bajo el gráfico
    document.getElementById('lbl-blue').innerText = `${pctAdoptados}%`;
    document.getElementById('lbl-yellow').innerText = `${pctPendientes}%`;
    document.getElementById('lbl-green').innerText = `${pctDisponibles}%`;

    // 5. ACTUALIZAR EL GRÁFICO (CSS CONIC GRADIENT)
    // Calculamos los grados para el CSS
    // Ejemplo: Blue termina en X%, Yellow empieza en X% y termina en Y%...
    
    const chart = document.getElementById('adoptionPieChart');
    
    // Colores: Azul (#2F80ED), Amarillo (#F2C94C), Verde (#27AE60)
    // El orden del gradiente será: Azul -> Amarillo -> Verde
    
    const stop1 = pctAdoptados; // Donde termina el azul
    const stop2 = pctAdoptados + pctPendientes; // Donde termina el amarillo
    
    // Aplicamos el estilo dinámico
    chart.style.background = `conic-gradient(
        #2F80ED 0% ${stop1}%, 
        #F2C94C ${stop1}% ${stop2}%, 
        #27AE60 ${stop2}% 100%
    )`;

});