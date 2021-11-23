const firebaseConfig = {
  apiKey: "AIzaSyBP_RMHpkE44H3DQ-ElgrDptTCnQwG_fNo",
  authDomain: "mediaciones-7e072.firebaseapp.com",
  projectId: "mediaciones-7e072",
  storageBucket: "mediaciones-7e072.appspot.com",
  messagingSenderId: "37148697267",
  appId: "1:37148697267:web:056e842f9c2e1438f1c6c6",
};

/* var firebaseConfig = {
  apiKey: "AIzaSyBbu3DrwWmDW1tK-1X4H_EdO7N36IcFbow",
  authDomain: "planilla-mediaciones.firebaseapp.com",
  projectId: "planilla-mediaciones",
  storageBucket: "planilla-mediaciones.appspot.com",
  messagingSenderId: "387261629023",
  appId: "1:387261629023:web:a933457bd565b4104e11ea",
}; */

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

const agregarMediacion = document.getElementById("agregarMediacion");

llenarSelectsEstudios();
llenarSelectsGestionadores();

const db = firebase.firestore();

const tablaAudiencias = document.getElementById("tablaAudiencias");
const botonPrincipal = document.getElementById("botonPrincipal");

//------firebase---/

let storageRef = firebase.storage().ref("Notificaciones");

function subirArchivo() {
  $("#botonCargarAdmin").attr("disabled", "disabled");
  const ref = firebase.storage().ref();
  const file = document.getElementById("fileSelect").files[0];
  const name = new Date() + "-" + file.name;
  const task = ref.child(name).put(file);

  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      $("#botonCargarAdmin").removeAttr("disabled");
      $("#link").fadeIn("slow");
      alertaSubido();
      $("#link").text("ARCHIVO CARGADO");
      $("#link").attr("href", url);
      $("#link").attr("src", "./imagenes/documento.svg");
    });
}

//-----------------------------------------
$(".gest").hide();

$("#audStro").change(function () {
  if ($("#audStro").val() == "2da") {
    $(".gest").fadeIn();
  }
  if ($("#audStro").val() == "") {
    $(".gest").hide();
  }
});

$(document).ready(function () {
  $("#agregar").on("shown.bs.modal", function () {
    $("#fechaAudiencia").trigger("focus");
  });
});

const borrarMediacion = (id) => db.collection("Mediaciones").doc(id).delete();

const obtenerMediacion = (id) => db.collection("Mediaciones").doc(id).get();

const registrarMediacion = (
  fecha,
  nroSiniestro,
  tipo,
  tema,
  jurisd,
  aud,
  caratula,
  gestionador,
  estudio,
  nota,
  file,
  img
) =>
  db.collection("Mediaciones").doc().set({
    fecha,
    nroSiniestro,
    tipo,
    tema,
    jurisd,
    aud,
    caratula,
    gestionador,
    estudio,
    nota,
    file,
    img,
  });

//-----Modal para Agregar Audiencias----

agregarMediacion.addEventListener("submit", async (e) => {
  e.preventDefault();

  $("#botonCargarAdmin").attr("disabled", "disabled");
  const fecha = agregarMediacion["fecha"].value;
  const nroSiniestro = agregarMediacion["nroSiniestro"].value;
  const tipo = agregarMediacion["tipoStro"].value;
  const tema = agregarMediacion["temaStro"].value;
  const jurisd = agregarMediacion["jurisdStro"].value;
  const aud = agregarMediacion["audStro"].value;
  const caratula = agregarMediacion["caratula"].value;
  const gestionador = agregarMediacion["gestionador"].value;
  const estudio = agregarMediacion["estudio"].value;
  const nota = agregarMediacion["obs"].value;
  const file = $("#link").attr("href");
  const img = $("#link").attr("src");
  await registrarMediacion(
    fecha,
    nroSiniestro,
    tipo,
    tema,
    jurisd,
    aud,
    caratula,
    gestionador,
    estudio,
    nota,
    file,
    img
  );
  alertaAgregado(4000);
  document.getElementById("agregarMediacion").reset();
  $("#link").hide();
  $("#botonCargarAdmin").removeAttr("disabled");
  document.getElementById("fechaAudiencia").focus();
});
