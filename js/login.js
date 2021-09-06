function GuardarDatos() {
    localStorage.setItem('usuario', document.getElementById("user").value);
    // guarda el nombre del usuario en local storage
}

function ValidarUsuario() {
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    if ((user !== "") && (password !== "")) {
        GuardarDatos()
        // Le pedimos a la función que tome los datos si los campos no están vacíos.
        window.location.href = "main.html";
    } else {
        alert("Por favor complete los campos.");
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
