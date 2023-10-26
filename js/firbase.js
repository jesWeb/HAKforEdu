// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCiR-9U41EWKHAAHZk6_h3_RwhdOKrr5Pk",
    authDomain: "hakaton-tesci.firebaseapp.com",
    projectId: "hakaton-tesci",
    storageBucket: "hakaton-tesci.appspot.com",
    messagingSenderId: "743103427554",
    appId: "1:743103427554:web:6248146d1af901daadffbb",
    measurementId: "G-RRBYRSTJJC"
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Función para crear usuario con Email
function createUserWithEmail() {

    var email = prompt("Introduce tu email para registro:");
    var password = prompt("Introduce una contraseña:");
    //ccreacion de usuarios 
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("Usuario creado:", user);
            // Redirige a la nueva página luego del registro.
            window.location.href = "principal.html";
        })
        .catch((error) => {
            console.error("Error creando usuario:", error);
        });
}


// Función para iniciar sesión con Email
function emailLogin() {
    var email = prompt("Introduce tu email:");
    var password = prompt("Introduce tu contraseña:");
    //crea el registro a fire base 
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (userCredential) {
        var user = userCredential.user;
        console.log("Usuario autenticado:", user);
        // Redirige a la nueva página.
        window.location.href = "principal.html";
    }).catch(function (error) {
        console.error("Error en autenticación:", error);
    });
}