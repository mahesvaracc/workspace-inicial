const profile = {
name: document.getElementById('user-name').placeholder,
age: document.getElementById('user-age').placeholder,
email: document.getElementById('user-email').placeholder,
tel: document.getElementById('user-tel').placeholder,
img: 'img/avatar.png'
}

function showProfileInfo() {
    let preview = document.getElementById('user-img').src = 'img/avatar.png';
    let profile = JSON.parse(localStorage.getItem('user'));
    if (profile != null) {
        document.getElementById('user-name').value = profile.name;
        document.getElementById('user-age').value = profile.age;
        document.getElementById('user-email').value = profile.email;
        document.getElementById('user-tel').value = profile.tel;
        document.getElementById('user-img').src = profile.img;
    } else {
        preview = 'img/avatar.png';
    }

    document.getElementById('contenido-perfil').innerHTML = `
      <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">  Nombre:` + profile.name + `</h4>
      <p class='mb-2'> Edad:` + profile.age + ` años</p>
      <p class='mb-2'> Email: `+ profile.email + `</p>
      <p class='mb-2'> Teléfono:` + profile.tel + `</p>
      </div>
    </div>
    `;

}

function previewFile() {
    let preview = document.getElementById('user-img')
    let file = document.getElementById('input-img').files[0];
    let reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
    };
    reader.onloadend = function () {
        preview.src = reader.result
    };
}

function saveProfile() {
    let preview = document.getElementById('user-img')
    profile.name = document.getElementById('user-name').value;
    profile.age = document.getElementById('user-age').value;
    profile.email = document.getElementById('user-email').value;
    profile.tel = document.getElementById('user-tel').value;
    profile.img = preview.src;

    localStorage.setItem('user', JSON.stringify(profile));
    alert('Cambios guardados.');
    showProfileInfo();
};

document.addEventListener('DOMContentLoaded', function (e) {
    localStorage.setItem('user', JSON.stringify(profile))
    showProfileInfo();
})


