const firebaseConfig = {
  apiKey: "AIzaSyAiRWsABbllrEHT40Kr89PMJbMMaVj1zlk",
  authDomain: "mediacionesgithub.firebaseapp.com",
  projectId: "mediacionesgithub",
  storageBucket: "mediacionesgithub.appspot.com",
  messagingSenderId: "942480853620",
  appId: "1:942480853620:web:024c4797e96f2f49079f21",
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

const db = firebase.firestore();

$(document).ready(function () {
  $("#agregar").on("shown.bs.modal", function () {
    $("#fechaAudiencia").trigger("focus");
  });
});

const borrarMediacion = (id) => db.collection("Mediaciones").doc(id).delete();

const obtenerMediacion = (id) => db.collection("Mediaciones").doc(id).get();

const editarMediacion = (id, mediacionEditada) =>
  db.collection("Mediaciones").doc(id).update(mediacionEditada);

const getMediaciones = () => db.collection("Mediaciones").get();

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetMediaciones((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const mediacion = doc.data();

      mediacion.id = doc.id;
    });
  });
});
