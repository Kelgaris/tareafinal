$(function () {
    function cargarHechizos() {
      $.getJSON("https://www.dnd5eapi.co/api/spells", { limit: 20 }, function (data) {
        const hechizos = data.results;
  
        hechizos.forEach((hechizo) => {
          const nombreHechizo = hechizo.name;
          const urlHechizo = hechizo.url;
  
          $.getJSON("https://www.dnd5eapi.co" + urlHechizo, function (detallesHechizo) {
            const nivelHechizo = detallesHechizo.level;
            const escuelaHechizo = detallesHechizo.school.name;
            const descripcionHechizo = detallesHechizo.desc.join("<br>");
  
            // Generar la tarjeta HTML para cada hechizo
            const tarjetaHTML = `
              <main class="tarjeta-hechizo">
                <div class="detalles">
                  <h1 class="nombre">${nombreHechizo}</h1>
                  <p class="nivel">Nivel ${nivelHechizo} - ${escuelaHechizo}</p>
                  <p class="descripcion">${descripcionHechizo}</p>
                </div>
              </main>
            `;
  
            $(".grid-hechizos").append(tarjetaHTML);
          });
        });
      });
    }
  
    cargarHechizos();
  
    $("#buscarHechizo").on("input", function () {
      const textoBusqueda = $(this).val().toLowerCase();
  
      $(".tarjeta-hechizo").each(function () {
        const nombreHechizo = $(this).find(".nombre").text().toLowerCase();
  
        if (nombreHechizo.includes(textoBusqueda)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
});