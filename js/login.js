/* Se utiliza un array como si fuera una base de datos */

var Usuarios = [
    {
        user: ' '
        password: ' '
    }
    {
        user: ''
        password: ''
    }

    {
        user: 'x'
        password: 'x'
    }
]

function IngresoUsuarios(){
    var user = document.getElementById('user').value
    var password = document.getElementById('password').value
    for (i=0; i< Usuarios.length; i++) {
        if(user == Usuarios[i].user && password == Usuarios[i].password){
            window.location.href = 'main.html';
        }
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
