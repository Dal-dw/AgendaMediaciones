function llenarSelectsEstudios() {
  const estudios = [
    "-",
    "AVM",
    "BARDELLI",
    "CAIA",
    "CANGUEIRO",
    "CORRRADINI",
    "GESTIDO",
    "LAYUN",
    "LLERENA",
    "MARCENAC",
    "PEREZ BERTANA",
    "PIANTANIDA",
    "PRO",
    "SCHWARZBERG",
    "SOLLITTO",
    "VITOLO",
  ];
  const estudiosp = [
    "-",
    "AGUIRRE",
    "ALVARELLOS",
    "BO",
    "CAMMISI",
    "DE LASA",
    "FITTIPALDI",
    "FREJMAN",
    "GESTIDO",
    "MARIAS",
    "MEILAN",
    "MOREIRA",
    "OZINO",
    "PONZ",
    "SAULINO",
    "SULIMA",
    "VITALE",
  ];
  const selectorEstudios = $(".selectEstudios");

  estudios.forEach((estudio) => {
    $(".selectEstudios")
      .append(`<option class="estudiosSelect">${estudio}</option>
                  `);
  });
  estudiosp.forEach((estudio) => {
    $(".selectEstudios")
      .append(`<option class="estudiospSelect">${estudio}</option>
                  `);
  });
}
function switchEstudios() {
  if (document.getElementById("jurisdStro").value == "PCIA") {
    $(".estudiospSelect").fadeIn();
    $(".estudiosSelect").hide();
  }
  if (document.getElementById("jurisdStro").value == "CABA") {
    $(".estudiospSelect").hide();
    $(".estudiosSelect").fadeIn();
  }
}
function switchEstudiosEdit() {
  if (document.getElementById("jurisdStro2").value == "PCIA") {
    $(".estudiospSelect").fadeIn();
    $(".estudiosSelect").hide();
  }
  if (document.getElementById("jurisdStro2").value == "CABA") {
    $(".estudiospSelect").hide();
    $(".estudiosSelect").fadeIn();
  }
}
