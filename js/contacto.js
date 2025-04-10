document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
    const respuesta = document.getElementById("respuesta");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const telefono = form.telefono.value.trim();
      const area = form.area.value;
      const mensaje = form.mensaje.value.trim();
  
      if (!nombre || !email || !telefono || !area || !mensaje) {
        respuesta.textContent = "Por favor, completa todos los campos.";
        respuesta.style.color = "#ff5e57";
        return;
      }
  
      // Validación de teléfono simple
      const telefonoValido = /^\d{10}$/.test(telefono);
      if (!telefonoValido) {
        respuesta.textContent = "El número de teléfono debe tener 10 dígitos.";
        respuesta.style.color = "#ff5e57";
        return;
      }
  
      // Simula envío correcto
      respuesta.textContent = "¡Gracias por contactarnos! Te responderemos pronto.";
      respuesta.style.color = "#4caf50";
      form.reset();
  
      // Opcional: Ocultar mensaje luego de unos segundos
      setTimeout(() => {
        respuesta.textContent = "";
      }, 5000);
    });
  });
  