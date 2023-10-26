 // Función para mostrar la ventana modal al cargar la página
 function mostrarModalUnaVez() {
     if (getCookie("modalShown") !== "true") {
         Swal.fire({
             title: "¡Bienvenido!",
             html: document.getElementById("myModal").innerHTML,
             icon: "success",
             showCancelButton: true,
             confirmButtonText: "Ir a Ia",
             cancelButtonText: "Cerrar",
             allowOutsideClick: false
         }).then((result) => {
             if (result.isConfirmed) {
                 window.location.href = 'Principal.html';
             }
             // Establecer una cookie para evitar que se muestre nuevamente
             setCookie("modalShown", "true", 1); // La cookie expira en 1 día
         });
     }
 }

 // Verificar si la cookie existe
 function getCookie(name) {
     const value = `; ${document.cookie}`;
     const parts = value.split(`; ${name}=`);
     if (parts.length === 2) return parts.pop().split(';').shift();
 }

 // Establecer la cookie
 function setCookie(name, value, days) {
     const date = new Date();
     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
     const expires = "expires=" + date.toUTCString();
     document.cookie = name + "=" + value + ";" + expires + ";path=/";
 }

 // Llama a la función para mostrar la ventana modal al cargar la página
 document.addEventListener("DOMContentLoaded", mostrarModalUnaVez);




//funcion del menu de cambio de estilso 

 document.getElementById("menuButton").addEventListener("click", function () {
     const sidebar = document.getElementById("sidebar");
     const content = document.querySelector(".content");

     if (sidebar.style.right === "0px") {
         sidebar.style.right = "-250px";
         content.style.marginRight = "0";
     } else {
         sidebar.style.right = "0";
         content.style.marginRight = "250px";
     }
 });

 document.getElementById("increaseFontSize").addEventListener("click", function () {
     document.body.style.fontSize = "25px";
 });

 document.getElementById("decreaseFontSize").addEventListener("click", function () {
     document.body.style.fontSize = "15px";
 });

 document.getElementById("toggleMonochrome").addEventListener("click", function () {
     document.body.style.filter = "grayscale(90%)";
 });

 document.getElementById("resetStyles").addEventListener("click", function () {
     document.body.style.fontSize = "16px";
     document.body.style.filter = "none";
 });

 document.getElementById("closeMenu").addEventListener("click", function () {
     document.getElementById("sidebar").style.right = "-250px";
     document.querySelector(".content").style.marginRight = "0";
 });