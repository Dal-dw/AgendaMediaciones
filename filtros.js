//Aca se puede agregar, sacar o cambiar gestionadores

const g1 = "Ceci";
const g2 = "Dardo";
const g3 = "Victor";
const g4 = "Carla";
const g5 = "Sole";

var gestionadores = [g1, g2, g3, g4, g5];

$("#tablaAudiencias").hide();
$(".fechaFiltro2").hide();

var onGetMediaciones = (callback) => {
  db.collection("Mediaciones")
    .limit(1)
    .orderBy("fecha", "desc")
    .onSnapshot(callback);

  //----------Filtro por Fecha (General)-------//
  $("#botonFechaFiltro").click(function () {
    $("#tablaAudiencias").fadeIn(500);
    var fechaFiltro = $("#fechaFiltro").val();
    db.collection("Mediaciones")
      .where("fecha", "==", fechaFiltro)
      .onSnapshot(callback);
    console.log($("#fechaFiltro").val());
    $("#fechaFiltro").val("");
  });

  //--------BOTON TODOS
  $("#botonTodos").click(function () {
    $("#tablaAudiencias").hide();
    $("#tablaAudiencias").fadeIn(500);
    $(".fechaFiltro2").hide();
    $(".fechaFiltro").show();
    db.collection("Mediaciones").orderBy("fecha", "desc").onSnapshot(callback);
    $("#botonFechaFiltro").click(function () {
      var fechaFiltro = $("#fechaFiltro").val();
      db.collection("Mediaciones")
        .where("fecha", "==", fechaFiltro)
        .onSnapshot(callback);
    });
  });
  //-------------BOTON ASIGNAR
  $("#sinDerivarNulo").click(function () {
    $("#tablaAudiencias").hide();
    $("#tablaAudiencias").fadeIn(500);
    db.collection("Mediaciones")
      .orderBy("fecha", "desc")
      .where("gestionador", "==", "-")
      .onSnapshot(callback);
  });

  //--------------------------------------------FILTROS------------------------------------//
  gestionadores.forEach((gestionador) => {
    $(`#boton${gestionador}`).click(function () {
      $("#tablaAudiencias").hide();
      $("#tablaAudiencias").fadeIn(500);
      db.collection("Mediaciones")
        .orderBy("fecha", "desc")
        .limit(10)
        .where("gestionador", "==", `${gestionador}`.toUpperCase())
        .onSnapshot(callback);
      $(".fechaFiltro").hide();
      $(".fechaFiltro2").hide();
      $(`#fechaFiltro${gestionador}`).show();
      $(`#botonFecha${gestionador}`).show();
    });

    $(`#botonFecha${gestionador}`).click(function () {
      var fechaFiltro = $(`#fechaFiltro${gestionador}`).val();

      db.collection("Mediaciones")
        .where("gestionador", "==", `${gestionador}`.toUpperCase())
        .where("fecha", "==", fechaFiltro)
        .onSnapshot(callback);
      $("#fechaFiltroGestionadores").val("");
    });

    $(`#mostrarTodo${gestionador}`).click(function () {
      $("#tablaAudiencias").hide();
      $("#tablaAudiencias").fadeIn(500);
      db.collection("Mediaciones")
        .orderBy("fecha", "desc")
        .where("gestionador", "==", `${gestionador}`.toUpperCase())
        .onSnapshot(callback);
    });

    $(`#sinDerivar${gestionador}`).click(function () {
      $("#tablaAudiencias").hide();
      $("#tablaAudiencias").fadeIn(500);
      db.collection("Mediaciones")
        .orderBy("fecha", "desc")
        .where("gestionador", "==", `${gestionador}`.toUpperCase())
        .where("estudio", "==", "-")
        .onSnapshot(callback);
    });
  });

  //----------------------------------------------CONTADORES----------------------------------//

  //-------(cuenta cantidad de MEdiaciones por Gestionador)
  gestionadores.forEach((gestionador) => {
    db.collection("Mediaciones")
      .where("gestionador", "==", `${gestionador}`.toUpperCase())
      .where("aud", "!=", "2da")
      .get()
      .then((snap) => {
        size = snap.size; // will return the collection size
        $(`.${gestionador}Total`).html(size);
      });
  });

  //-------(cuenta cantidad de Mediaciones S/D por Gestionador)
  gestionadores.forEach((gestionador) => {
    db.collection("Mediaciones")
      .where("gestionador", "==", `${gestionador}`.toUpperCase())
      .where("tipo", "==", "S/D")
      .get()
      .then((snap) => {
        size = snap.size; // will return the collection size
        $(`.${gestionador}Sd`).html(size);
      });
  });

  //-------(cuenta cantidad de Mediaciones F/D por Gestionador)
  gestionadores.forEach((gestionador) => {
    db.collection("Mediaciones")
      .where("gestionador", "==", `${gestionador}`.toUpperCase())
      .where("tipo", "==", "F/D")
      .get()
      .then((snap) => {
        size = snap.size; // will return the collection size
        $(`.${gestionador}Fd`).html(size);
      });
  });
  //-------(cuenta cantidad de Mediaciones PCIA por Gestionador)
  gestionadores.forEach((gestionador) => {
    db.collection("Mediaciones")
      .where("gestionador", "==", `${gestionador}`.toUpperCase())
      .where("jurisd", "==", "PCIA")
      .get()
      .then((snap) => {
        size = snap.size; // will return the collection size
        $(`.${gestionador}Prov`).html(size);
      });
  });
  //-------(cuenta cantidad de Mediaciones RV por Gestionador)
  gestionadores.forEach((gestionador) => {
    db.collection("Mediaciones")
      .where("gestionador", "==", `${gestionador}`.toUpperCase())
      .where("tema", "==", "RV")
      .get()
      .then((snap) => {
        size = snap.size; // will return the collection size
        $(`.${gestionador}Rv`).html(size);
      });
  });
  //-------(cuenta cantidad de Mediaciones CONT por Gestionador)
  gestionadores.forEach((gestionador) => {
    db.collection("Mediaciones")
      .where("gestionador", "==", `${gestionador}`.toUpperCase())
      .where("tema", "==", "CONT")
      .get()
      .then((snap) => {
        size = snap.size; // will return the collection size
        $(`.${gestionador}Cont`).html(size);
      });
  });
};
