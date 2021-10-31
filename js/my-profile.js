/* función que muestra los datos del perfil, si es que los hay guardados
y si no, muestra la imagen por defecto*/

function showProfileInfo(){
    let preview = document.getElementById('user-img');
    let profile = JSON.parse(localStorage.getItem('user'));

    if (profile != null) {
        document.getElementById('user-name').value = profile.name;
        document.getElementById('user-age').value = profile.age;
        document.getElementById('user-email').value = profile.email;
        document.getElementById('user-tel').value = profile.tel;
        document.getElementById('user-img').src = profile.img;
    } else {
        preview.src = 'img/avatar.png';
    }

}
/* función para cargar una imagen,recibe la img en file imput y cuando cambia/carga actualiza el id user-img*/
function previewFile(){
let preview=document.getElementById('user-img')
let file = document.getElementById('input-img').files[0];
let reader = new FileReader();

if (file){
    reader.readAsDataURL(file);
    } else {
        preview.src = '';
    }
    reader.onloadend = function(){
        preview.src = reader.result
    }  
}

/* función para cargar o cambiar los datos del perfil*/
function saveProfile(){
    let preview = document.getElementById('user-img')
    let profile = {}
    profile.name = document.getElementById('user-name').value;
    profile.age = document.getElementById('user-age').value;
    profile.email = document.getElementById('user-email').value;
    profile.tel = document.getElementById('user-tel').value;
    profile.img = preview.src;

    localStorage.setItem('user', JSON.stringify(profile))
    alert ('Cambios guardados.')
}
/* le pido que ejecute la función al cargar el documento, asi se puede tener los datos cargados si ya los hay,
o la imagen por defecto si no*/
document.addEventListener('DOMContentLoaded', function(e){
    showProfileInfo();
})