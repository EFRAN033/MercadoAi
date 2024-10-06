document.addEventListener("DOMContentLoaded", function() {
    const text = document.getElementById("animated-text");
    const subtext = document.getElementById("animated-subtext");
    const analisisMercadoText = document.getElementById('analisis-mercado-text');

    function typeWriter(element, text, speed, isLast = false) {
        let i = 0;
        const cursor = document.createElement('span');
        cursor.textContent = '|';  // El cursor intermitente
        cursor.classList.add('blinking-cursor');  // Clase para el cursor parpadeante
        element.appendChild(cursor);

        function typing() {
            if (i < text.length) {
                element.innerHTML = text.slice(0, i + 1);  // Escribimos el texto gradualmente
                element.appendChild(cursor);  // Mantenemos el cursor visible mientras se escribe
                i++;
                setTimeout(typing, speed);  // Ajustamos la velocidad de escritura
            } else {
                // Al finalizar la escritura, dejamos el cursor parpadeando varias veces más
                if (isLast) {
                    setTimeout(() => cursor.style.display = 'none', 3000);  // Cursor desaparece después de 3 segundos
                }
            }
        }
        typing();
    }

    // Aplicamos el efecto de escritura con cursor intermitente
    typeWriter(text, "LA PLATAFORMA MÁS PODEROSA PARA IDENTIFICAR OPORTUNIDADES DE NEGOCIO CON INTELIGENCIA ARTIFICIAL", 35); 
    setTimeout(() => {
        typeWriter(subtext, "Descubre y aprovecha las tendencias del mercado con inteligencia artificial", 35, true);  // Indicamos que es el último texto
    }, 1000);  // Retraso entre la animación de los dos textos

    // Redirige a la página analisis-mercado.html cuando se hace clic en "Análisis de mercado"
    document.getElementById('analisis-mercado-link').addEventListener('click', function() {
        window.location.href = 'analisis-mercado.html';  // Redirección
    });
});
