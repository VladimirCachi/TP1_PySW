document.addEventListener("DOMContentLoaded", () => {
    const filtros = document.querySelectorAll(".filtros-blog input[type='radio']");
    const articulos = document.querySelectorAll(".tarjeta-blog");
  
    filtros.forEach((filtro) => {
      filtro.addEventListener("change", () => {
        const categoria = filtro.id.replace("cat-", "");
        articulos.forEach((articulo) => {
          const articuloCategoria = articulo.dataset.category;
          if (categoria === "todos" || articuloCategoria === categoria) {
            articulo.classList.remove("hidden");
          } else {
            articulo.classList.add("hidden");
          }
        });
      });
    });
  
    // Activar "Todos" por defecto
    document.getElementById("cat-todos").checked = true;
  });
