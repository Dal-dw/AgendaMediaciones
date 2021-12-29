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

const inputChat = document.querySelector("#inputChat");
var mensajesChat = document.querySelector("#mensajesChat");

function inicio() {
  const usuario = prompt("Ingresá tu nombre");
  //const usuario = "DARDO";
  if (usuario) {
    Command: toastr["success"](
      `Hola ${usuario}, ya podés chatear`,
      "Ingresaste al Chat"
    );

    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-bottom-left",
      preventDuplicates: true,
      onclick: null,
      showDuration: "3000",
      hideDuration: "1000",
      timeOut: "7000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    $("#encabezado").append(
      `Conectado como: <span class="badge bg-success" id="usuarioLogueado">${usuario}</span>`
    );
  } else {
    alert("Error, debe ingresar un nombre");
    window.location.href = "./chat.html";
    return;
  }
}

inicio();

function contenidoChat() {
  var usuarioLogueado = $("#usuarioLogueado").html();
  formularioChat.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!inputChat.value.trim()) {
      console.log("vacio");
      return;
    }

    firebase
      .firestore()
      .collection("Chat")
      .add({
        texto: inputChat.value,
        Usuario: usuarioLogueado,
        Fecha: Date.now(),
        tiempo: new Date(Date.now()).toLocaleTimeString().split(",")[0],
      });

    /* $("#mensajesChat").html(`
        <!-- MESAJE DEL RESTO -->
        <div class="d-flex justify-content-start m-4 mensajes">
            <div class="text-primary align-self-center bg-info text-light mensajeOtros  p-2 "><div class="mb-2 badge bg-dark">Mensaje de ${Usuario}:</div> <br> ${texto}</div>
        </div>
            
        <!-- MESAJE DEL USUARIO -->
        <div class="d-flex justify-content-end m-4 mensajes">
            <div class="text-primary  bg-success text-light mensajeUsuario p-2"><div class="mb-2 badge bg-primary"> Mensaje de ${Usuario}:  </div><br> ${texto}</div>
        </div>
    `); */
    inputChat.value = "";
  });
  firebase
    .firestore()
    .collection("Chat")
    .orderBy("Fecha")
    .limitToLast(20)

    .onSnapshot((query) => {
      $("#mensajesChat").html("");
      query.forEach((doc) => {
        if (doc.data().Usuario !== usuarioLogueado) {
          $("#mensajesChat").append(`
            <div class="d-flex justify-content-start m-4 mensajes">
                <div class="text-primary align-self-center bg-info text-light mensajeOtros  p-2 "><div class="mb-2 badge bg-dark">Mensaje de ${
                  doc.data().Usuario
                }:</div> <br> ${doc.data().texto}</div>
            </div>
            `);
        } else {
          $("#mensajesChat")
            .append(
              `
            <div class="d-flex justify-content-end m-4 mensajes">
                <div class="text-primary  bg-success text-light mensajeUsuario p-2"><div class="mb-2 badge bg-primary"> Mensaje de ${
                  doc.data().Usuario
                }:  </div><br> ${doc.data().texto}<div class="text-dark">
    ${doc.data().tiempo}
  </div></div>
            </div>
            
        `
            )
            .fadeIn("slow");
        }
        mensajesChat.scrollTop = mensajesChat.scrollHeight;
      });
    });
}
contenidoChat();
