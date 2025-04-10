// entrenadores.js

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".card-entrenador button");
  
    // Crear modal dinámico
    const modal = document.createElement("div");
    modal.className = "modal-info";
    modal.innerHTML = `
      <div class="modal-contenido">
        <span class="cerrar">&times;</span>
        <h3 class="modal-nombre"></h3>
        <p class="modal-especialidad"></p>
      </div>
    `;
    document.body.appendChild(modal);
  
    const modalNombre = modal.querySelector(".modal-nombre");
    const modalEspecialidad = modal.querySelector(".modal-especialidad");
    const cerrarBtn = modal.querySelector(".cerrar");
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const entrenador = button.parentElement;
        const nombre = entrenador.querySelector("h3").textContent;
        const especialidad = entrenador.querySelector("p").textContent;
  
        modalNombre.textContent = nombre;
        modalEspecialidad.textContent = especialidad;
        modal.style.display = "flex";
      });
    });
  
    cerrarBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });