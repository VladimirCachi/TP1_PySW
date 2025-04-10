// clases.js

document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".filtro");
    const clases = document.querySelectorAll(".clase-item");
  
    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        document.querySelector(".filtro.activo")?.classList.remove("activo");
        boton.classList.add("activo");
        const categoria = boton.dataset.clase;
  
        clases.forEach(clase => {
          clase.classList.remove("oculto");
          if (categoria !== "todos" && !clase.classList.contains(categoria)) {
            clase.classList.add("oculto");
          }
        });
      });
    });
  });