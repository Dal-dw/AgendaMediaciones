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
