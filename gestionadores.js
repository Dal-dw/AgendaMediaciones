function llenarSelectsGestionadores() {
  const gestionadores = ["-", "CECI", "DARDO", "VICTOR", "CARLA", "GABRIELA"];
  const selectorEstudios = $(".selectEstudios");
  gestionadores.forEach((gestionador) => {
    $(".selectGestionadores").append(`<option>${gestionador}</option>`);
  });
}
