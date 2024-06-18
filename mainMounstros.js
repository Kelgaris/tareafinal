$(function () {
  function cargarMonstruos() {
    $.getJSON("https://www.dnd5eapi.co/api/monsters", { limit: 20 }, function (data) {
      const monstruos = data.results;

      monstruos.forEach((monstruo) => {
        const nombreMonstruo = monstruo.name;
        const urlMonstruo = monstruo.url;

        $.getJSON("https://www.dnd5eapi.co" + urlMonstruo, function (detallesMonstruo) {
          const descripcion = `${detallesMonstruo.size} ${detallesMonstruo.type}`;
          const alineamiento = detallesMonstruo.alignment;
          const puntosVida = detallesMonstruo.hit_points;

          // Generar la tarjeta HTML para cada monstruo
          const tarjetaHTML = `
            <main class="tarjeta-monstruo">
              <div class="detalles">
                <h1 class="nombre">${nombreMonstruo}</h1>
                <p class="descripcion">${descripcion}</p>
                <p class="alineamiento">Alineamiento: ${alineamiento}</p>
                <p class="puntos-vida">Puntos de Vida: ${puntosVida}</p>
              </div>
            </main>
          `;

          $(".grid-monstruos").append(tarjetaHTML);
        });
      });
    });
  }

  cargarMonstruos();

  // Función para filtrar los monstruos según el texto de búsqueda
  $("#buscarMonstruo").on("input", function () {
    const textoBusqueda = $(this).val().toLowerCase();

    $(".tarjeta-monstruo").each(function () {
      const nombreMonstruo = $(this).find(".nombre").text().toLowerCase();

      if (nombreMonstruo.includes(textoBusqueda)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});