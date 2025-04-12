// js/home.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica Modo Claro/Oscuro ---
    const modoBtn = document.getElementById('botonModo'); // Busca el botón por su ID
    const body = document.body;

    // Función para aplicar el tema y cambiar el emoji
    const aplicarTema = (esModoClaro) => {
        if (esModoClaro) {
            body.classList.add('modo-claro');
            if (modoBtn) {
                modoBtn.textContent = '☀️'; // Emoji sol
            }
        } else {
            body.classList.remove('modo-claro');
            if (modoBtn) {
                modoBtn.textContent = '🌙'; // Emoji luna
            }
        }
    };

    // Verificar preferencia guardada o del sistema
    const preferenciaGuardada = localStorage.getItem('theme');
    let esModoClaroActual = false;

    if (preferenciaGuardada === 'light') {
        esModoClaroActual = true;
    } else if (preferenciaGuardada === 'dark') {
        esModoClaroActual = false;
    } else {
        // Opcional: Usar preferencia del sistema si no hay nada guardado
        // esModoClaroActual = window.matchMedia('(prefers-color-scheme: light)').matches;
        // O empezar en oscuro por defecto
        esModoClaroActual = false;
    }

    // Aplicar tema inicial
    aplicarTema(esModoClaroActual);

    // Listener para el botón
    if (modoBtn) {
        modoBtn.addEventListener('click', () => {
            esModoClaroActual = !esModoClaroActual;
            aplicarTema(esModoClaroActual);
            localStorage.setItem('theme', esModoClaroActual ? 'light' : 'dark');
        });
    } else {
        console.warn("Botón 'botonModo' no encontrado.");
    }

    // --- Fin Lógica Modo Claro/Oscuro ---


    // --- Lógica del Contador Animado (si está en la página actual) ---
    const contadorElement = document.getElementById('contadorNumero');
    if (contadorElement) {
        const numeroFinal = 1500; // El número al que quieres llegar
        let contadorActual = 0;
        const duracion = 2000; // Duración en milisegundos
        const incremento = numeroFinal / (duracion / 16); // Calcula cuánto incrementar en cada frame (aprox 60fps)

        const animarContador = () => {
            contadorActual += incremento;
            if (contadorActual < numeroFinal) {
                contadorElement.textContent = Math.ceil(contadorActual).toLocaleString(); // Muestra número entero con formato
                requestAnimationFrame(animarContador); // Sigue animando
            } else {
                contadorElement.textContent = numeroFinal.toLocaleString(); // Asegura que termine en el número exacto
            }
        };

        // Iniciar animación cuando el elemento sea visible (usando Intersection Observer)
        const observerContador = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContador();
                    observerContador.unobserve(entry.target); // Deja de observar una vez animado
                }
            });
        }, { threshold: 0.5 }); // Inicia cuando el 50% es visible

        observerContador.observe(contadorElement);
    }
    // --- Fin Lógica Contador ---


    // --- Lógica Carrusel Testimonios (si está en la página actual) ---
    const carrusel = document.querySelector('.carrusel-testimonios');
    if (carrusel) {
        const track = carrusel.querySelector('.slide-track');
        const testimonios = Array.from(track.children);
        const flechaIzquierda = carrusel.querySelector('.flecha.izquierda');
        const flechaDerecha = carrusel.querySelector('.flecha.derecha');
        let slideWidth = testimonios[0].getBoundingClientRect().width;
        let currentIndex = 0;

        // Clonar testimonios para efecto infinito
        testimonios.forEach(testimonio => {
            const clone = testimonio.cloneNode(true);
            track.appendChild(clone);
        });

        // Función para mover el carrusel
        const moveToSlide = (index) => {
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${index * slideWidth}px)`;
            currentIndex = index;
        };

        // Listener para la flecha derecha
        flechaDerecha.addEventListener('click', () => {
            if (currentIndex >= testimonios.length) {
                // Si estamos en el último clon, saltar al principio sin transición
                track.style.transition = 'none';
                moveToSlide(0);
                // Forzar reflow para aplicar la transición en el siguiente movimiento
                track.offsetHeight;
            }
            // Mover al siguiente slide con transición
            moveToSlide(currentIndex + 1);
        });

        // Listener para la flecha izquierda
        flechaIzquierda.addEventListener('click', () => {
            if (currentIndex <= 0) {
                 // Si estamos en el primer slide, saltar al último clon sin transición
                track.style.transition = 'none';
                moveToSlide(testimonios.length);
                 // Forzar reflow
                track.offsetHeight;
            }
             // Mover al slide anterior con transición
            moveToSlide(currentIndex - 1);
        });

        // Recalcular ancho al redimensionar ventana
        window.addEventListener('resize', () => {
            slideWidth = testimonios[0].getBoundingClientRect().width;
            moveToSlide(currentIndex); // Reajustar posición
        });

        // Inicializar posición
        moveToSlide(currentIndex);
    }
    // --- Fin Lógica Carrusel ---

}); // Fin DOMContentLoaded
