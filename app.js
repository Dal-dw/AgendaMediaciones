const firebaseConfig = {
  apiKey: "AIzaSyAiRWsABbllrEHT40Kr89PMJbMMaVj1zlk",
  authDomain: "mediacionesgithub.firebaseapp.com",
  projectId: "mediacionesgithub",
  storageBucket: "mediacionesgithub.appspot.com",
  messagingSenderId: "942480853620",
  appId: "1:942480853620:web:024c4797e96f2f49079f21",
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

const agregarMediacion = document.getElementById("agregarMediacion");
const agregarMediacion2 = document.getElementById("agregarMediacion2");

const db = firebase.firestore();

const tablaAudiencias = document.getElementById("tablaAudiencias");
const botonPrincipal = document.getElementById("botonPrincipal");

llenarSelectsEstudios();

llenarSelectsGestionadores();

$("#botonActualizar").click(function () {
  $("#botonActualizar").text("Edición Correcta");
  setTimeout(function () {
    $("#botonActualizar").text("EDITAR");
  }, 1000);
});

//------firebase---/

$(document).ready(function () {
  $("#agregar").on("shown.bs.modal", function () {
    $("#fechaAudiencia").trigger("focus");
  });
});

console.log($("#fechaFiltro").val());

const borrarMediacion = (id) => db.collection("Mediaciones").doc(id).delete();

const obtenerMediacion = (id) => db.collection("Mediaciones").doc(id).get();

const editarMediacion = (id, mediacionEditada) =>
  db.collection("Mediaciones").doc(id).update(mediacionEditada);

const getMediaciones = () => db.collection("Mediaciones").get();

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetMediaciones((querySnapshot) => {
    tablaAudiencias.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const mediacion = doc.data();

      mediacion.id = doc.id;

      tablaAudiencias.innerHTML += `
      <tr class="table-light" id="fila">
              <th  class="text-center" scope="row"><h5 class="h5">${
                doc.data().fecha[8]
              }${doc.data().fecha[9]}${doc.data().fecha[7]}${
        doc.data().fecha[5]
      }${doc.data().fecha[6]}${doc.data().fecha[4]}${doc.data().fecha[0]}${
        doc.data().fecha[1]
      }${doc.data().fecha[2]}${doc.data().fecha[3]}</h5></th>
              <td class="text-center"><h6>${doc.data().nroSiniestro}</h6></td>
              <td class="text-center"><span class="badge bg-success">${
                doc.data().tipo
              }</span></td>
              <td class="text-center"><span class="badge bg-danger">${
                doc.data().tema
              }</span></td>
              <td class="text-center"><span class="badge bg-info">${
                doc.data().jurisd
              }</span></td>
              <td class="text-center"><span class="badge bg-light text-primary">${
                doc.data().aud
              }</span></td>
              <td class="text-center"><h5><strong>${
                doc.data().caratula
              }</strong></h5></td>
              <td class="text-center"><h6>${doc.data().gestionador}</h6></td>
              <td class="text-center text-info"><h6><strong>${
                doc.data().estudio
              }</strong></td></h6>
              <td style="max-width: 8em" class="scroll2"><div class="scroll2Msg" style="max-height: 1em">${
                doc.data().nota
              }</div></td>
              <td>
                
                <button type="button"
                data-bs-toggle="modal"
                onclick="switchEstudiosEdit()"
                data-bs-target="#actualizar" class="btn btn-outline-warning btn-sm editar"
                data-id="${mediacion.id}">
                  
                </button>
                <button class="btn btn-outline-danger btn-sm borrar"
                data-id="${mediacion.id}">
                  
                </button>
              </td>
              
              <td class=" text-center"><a class="linkArchivo" href=${
                doc.data().file
              } target="_blank" download>  <img class="imgArchivo" src=${
        doc.data().img
      } alt="doc" style="width: 20%;"download></a></td>
            </tr>
      `;

      const botonBorrar = document.querySelectorAll(".borrar");
      botonBorrar.forEach((button) => {
        button.addEventListener("click", async (e) => {
          var confirmaBorrar = confirm("Confirma borrar?");
          if (confirmaBorrar == true) {
            await borrarMediacion(e.target.dataset.id);
            alertaBorrada();
          } else {
            return;
          }
        });
      });

      //------------------BOTONES EDITAR-----------------------------------------------------------------------------------//
      const botonEditar = document.querySelectorAll(".editar");

      botonEditar.forEach((button) => {
        button.addEventListener("click", async (e) => {
          const mediacion = await obtenerMediacion(e.target.dataset.id);
          const derivacion = mediacion.data();
          id = mediacion.id;

          agregarMediacion2["fecha2"].value = derivacion.fecha;
          agregarMediacion2["nroSiniestro2"].value = derivacion.nroSiniestro;
          agregarMediacion2["tipoStro2"].value = derivacion.tipo;
          agregarMediacion2["temaStro2"].value = derivacion.tema;
          agregarMediacion2["jurisdStro2"].value = derivacion.jurisd;
          agregarMediacion2["audStro2"].value = derivacion.aud;
          agregarMediacion2["caratula2"].value = derivacion.caratula;
          agregarMediacion2["gestionador2"].value = derivacion.gestionador;
          agregarMediacion2["estudio2"].value = derivacion.estudio;
          agregarMediacion2["obs2"].value = derivacion.nota;
          $("#jurisdStro2").trigger("change"); // ejecuta el cambio en jurisd para que sepa de que jurisdiccion es.

          //------------ Modal EDITAR----------------------------------------------------------------------------------------//
          agregarMediacion2.addEventListener("submit", async (e) => {
            e.preventDefault();

            const fecha = agregarMediacion2["fecha2"];
            const nroSiniestro = agregarMediacion2["nroSiniestro2"];
            const tipo = agregarMediacion2["tipoStro2"];
            const tema = agregarMediacion2["temaStro2"];
            const jurisd = agregarMediacion2["jurisdStro2"];
            const aud = agregarMediacion2["audStro2"];
            const caratula = agregarMediacion2["caratula2"];
            const gestionador = agregarMediacion2["gestionador2"];
            const estudio = agregarMediacion2["estudio2"];
            const nota = agregarMediacion2["obs2"];

            await editarMediacion(id, {
              fecha: fecha.value,
              nroSiniestro: nroSiniestro.value,
              tipo: tipo.value,
              tema: tema.value,
              jurisd: jurisd.value,
              aud: aud.value,
              caratula: caratula.value,
              gestionador: gestionador.value,
              estudio: estudio.value,
              nota: nota.value,
            });
            alertaEdit();
            $("#actualizar").modal("hide");
          });
        });
      });
    });
  });
});

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
  const file = "./imagenes/cruz.png";
  const img = "./imagenes/cruz.png";

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
  alertaAgregado(2000);
  document.getElementById("agregarMediacion").reset();
  document.getElementById("fechaAudiencia").focus();
});
