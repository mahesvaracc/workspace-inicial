const profileInfo = {  
}

function profileImage(){
    var file = document.getElementById("new-img").files[0]
    var reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
    }
    reader.addEventListener('load', function(e){
    localStorage.setItem("profileInfo.imageSrc", JSON.stringify(reader.result))
    document.getElementById("user-img").src = reader.result;
    ;
    })};

  

    function newUserInfo() {
        profileInfo = {
            name: document.getElementById("new-name").value, 
            mail: document.getElementById("new-mail").value, 
            phone: document.getElementById("new-phone").value, 
            age: document.getElementById("new-age").value,
            imageSrc: document.getElementById("user-img").src,
        }
        localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
        getProfileInfo();
    }
    

    function getProfileInfo() {
        let profileInfoSaved = profileInfo;
 {
            document.getElementById("user-name").innerHTML = profileInfoSaved.name ;
            document.getElementById("user-mail").innerHTML = profileInfoSaved.mail;
            document.getElementById("user-phone").innerHTML = profileInfoSaved.phone;
            document.getElementById("user-age").innerHTML= profileInfoSaved.age;
            document.getElementById("user-img").src = profileInfoSaved.imageSrc;
        }
    }
    

    document.addEventListener("DOMContentLoaded", function (e) {
        getProfileInfo();
    });

    
    document.getElementById("save-but").addEventListener("submit", function (e) {
        newUserInfo();
             
        
    });