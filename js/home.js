const botonModo = document.getElementById('botonModo');
    if (botonModo) {
      const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const currentMode = localStorage.getItem('theme');

      // Establecer modo inicial basado en preferencia o guardado
      if (currentMode === "dark" || (!currentMode && preferDark)) {
        document.body.classList.remove('modo-claro');
        botonModo.textContent = '🌙';
        botonModo.setAttribute('aria-label', 'Cambiar a modo claro');
      } else {
        document.body.classList.add('modo-claro');
        botonModo.textContent = '🌞';
        botonModo.setAttribute('aria-label', 'Cambiar a modo oscuro');
      }

      botonModo.addEventListener('click', () => {
        document.body.classList.toggle('modo-claro');
        let theme = 'dark'; // Modo oscuro por defecto
        if (document.body.classList.contains('modo-claro')) {
          botonModo.textContent = '🌞';
          botonModo.setAttribute('aria-label', 'Cambiar a modo oscuro');
          theme = 'light';
        } else {
          botonModo.textContent = '🌙';
          botonModo.setAttribute('aria-label', 'Cambiar a modo claro');
        }
        localStorage.setItem('theme', theme); // Guardar preferencia
      });
    }

    // --- Script Carrusel Testimonios ---
    const track = document.querySelector('.slide-track');
    if (track && track.children.length > 1) { // Solo inicializar si hay track y más de 1 slide
      const slides = Array.from(track.children);
      const nextButton = document.querySelector('.flecha.derecha');
      const prevButton = document.querySelector('.flecha.izquierda');
      let slideWidth = slides[0].getBoundingClientRect().width;
      const numOriginalSlides = slides.length;
      const numClones = 1; // Clonar 1 al inicio y 1 al final

      // --- Clonación ---
      // Clonar últimos al inicio
      for (let i = 0; i < numClones; i++) {
        const clone = slides[numOriginalSlides - 1 - i].cloneNode(true);
        clone.classList.add('clon');
        track.insertBefore(clone, slides[0]);
      }
      // Clonar primeros al final
      for (let i = 0; i < numClones; i++) {
        const clone = slides[i].cloneNode(true);
        clone.classList.add('clon');
        track.appendChild(clone);
      }

      const allSlides = Array.from(track.children); // Actualizar lista con clones
      let currentIndex = numClones; // Empezar en el primer slide original

      // --- Posicionamiento Inicial ---
      const setPosition = (index, animate = false) => {
        // Asegurarse que slideWidth sea válido
        if (slideWidth <= 0) {
            const firstOriginalSlide = track.children[numClones];
            if (firstOriginalSlide) {
                slideWidth = firstOriginalSlide.getBoundingClientRect().width;
            }
            // Si sigue siendo 0, no hacer nada
            if (slideWidth <= 0) return;
        }
        track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
        track.style.transform = `translateX(-${slideWidth * index}px)`;
      };

      setPosition(currentIndex); // Posición inicial sin animación

      // Reactivar transición después de un instante
      setTimeout(() => {
        if (track) track.style.transition = 'transform 0.5s ease-in-out';
      }, 50);

      // --- Movimiento ---
      const moveToSlide = (newIndex) => {
        currentIndex = newIndex;
        setPosition(currentIndex, true); // Mover con animación
      };

      const moveToNext = () => moveToSlide(currentIndex + 1);
      const moveToPrev = () => moveToSlide(currentIndex - 1);

      // --- Event Listeners Botones ---
      if (nextButton && prevButton) {
        nextButton.addEventListener('click', moveToNext);
        prevButton.addEventListener('click', moveToPrev);
      } else {
        console.warn("Botones de flecha no encontrados.");
      }


      // --- Bucle Infinito (Transition End) ---
      track.addEventListener('transitionend', () => {
        // Si llegamos al clon del final (después del último original)
        if (currentIndex >= numOriginalSlides + numClones) {
          currentIndex = numClones; // Saltar al primer original
          setPosition(currentIndex); // Saltar sin animación
        }
        // Si llegamos al clon del inicio (antes del primer original)
        if (currentIndex < numClones) {
          currentIndex = numOriginalSlides + numClones - 1; // Saltar al último original
          setPosition(currentIndex); // Saltar sin animación
        }
      });

      // --- Ajuste en Resize ---
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // Recalcular ancho y reposicionar SIN animación
          const firstOriginalSlide = track.children[numClones]; // Asegurarse de medir un slide original
          if(firstOriginalSlide) {
             slideWidth = firstOriginalSlide.getBoundingClientRect().width;
             // Solo reposicionar si el ancho es válido
             if (slideWidth > 0) {
                 setPosition(currentIndex);
             }
          }
        }, 250); // Esperar un poco antes de recalcular
      });

    } else if (track && track.children.length <= 1) {
        console.warn("Carrusel no inicializado: Se necesita más de un testimonio.");
        // Opcional: Ocultar flechas si solo hay un testimonio
        const flechasContainer = document.querySelector('.flechas');
        if(flechasContainer) flechasContainer.style.display = 'none';
    } else {
        console.warn("Elemento '.slide-track' no encontrado. El carrusel no funcionará.");
    }

    const contadorElemento = document.getElementById('contadorNumero');

// Función para animar el contador
const animarContador = (elemento, final, duracion) => {
  let inicio = 0;
  const rango = final - inicio;
  let tiempoInicio = null;

  const paso = (timestamp) => {
    if (!tiempoInicio) tiempoInicio = timestamp;
    const progreso = Math.min((timestamp - tiempoInicio) / duracion, 1);
    const valorActual = Math.floor(progreso * rango + inicio);
    elemento.textContent = valorActual; // Actualiza el texto del elemento

    if (progreso < 1) {
      requestAnimationFrame(paso); // Continúa la animación
    } else {
      elemento.textContent = final; // Asegura que termine exactamente en el valor final
    }
  };

  requestAnimationFrame(paso); // Inicia la animación
};

// Opcional: Iniciar la animación solo cuando el contador sea visible
const observerOptions = {
  root: null, // viewport
  threshold: 0.1 // Ejecutar cuando al menos el 10% sea visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Si el elemento es visible y aún no ha sido animado
    if (entry.isIntersecting && !contadorElemento.dataset.animado) {
      animarContador(contadorElemento, 500, 2000); // Anima hasta 500 en 2000ms (2 segundos)
      contadorElemento.dataset.animado = 'true'; // Marcar como animado
      // observer.unobserve(entry.target); // Opcional: Dejar de observar una vez animado
    }
  });
}, observerOptions);

// Empezar a observar el elemento contador si existe
if (contadorElemento) {
  observer.observe(contadorElemento);
} else {
  console.warn("Elemento '#contadorNumero' no encontrado para la animación.");
}