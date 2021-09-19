var newcomment = document.getElementById('newComment');
var currentProduct = {};
var currentComments = [];

/* función que muestra datos de un producto en el html*/
function showProduct(productinfo) {
    currentProduct = productinfo
    let htmlContentToAppend = `
             <h3>`+ productinfo.name + `</h3>
             <h6 class='text-muted'>` + productinfo.category + `</h6>
             <div class="container col-15 d-flex w-100" id=imagesContainer>
             <div id="carouselIndicators" class="carousel slide" data-ride="carousel">
             <ol class="carousel-indicators">
               <li data-target="#carouselIndicators" data-slide-to="0" class="active"></li>
               <li data-target="#carouselIndicators" data-slide-to="1"></li>
               <li data-target="#carouselIndicators" data-slide-to="2"></li>
             </ol>
             <div class="carousel-inner" id=carouselstart>
             </div>
             <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
               <span class="sr-only">Previo</span>
             </a>
             <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
               <span class="carousel-control-next-icon" aria-hidden="true"></span>
               <span class="sr-only">Siguiente</span>
             </a>
           </div>
             </div>
             <div class="col">
                 <div class="d-flex w-100 justify-content-between">
                     <small class="text-muted">` + productinfo.soldCount + ` vendidos</small>
                 </div>
                  <p class="mb-1">` + productinfo.description + `</p>
                 <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1"> Precio: `+ productinfo.cost + ' ' + productinfo.currency + `</h5>
                 </div>
             </div>
            </div>`;
/* le pido que agregue todo esto al div productInfo */
    document.getElementById('productInfo').innerHTML = htmlContentToAppend;
}

/* función que muestra imágenes en el carousel dentro del div productInfo,
comienza por la primera imagen (0) como item activo y luego va agregando otras si hubiera más*/
function showImages(currentImages) {
    var currentImages = currentProduct.images
    let htmlContentToAppend = `
      <div class="carousel-item active">
        <img src="` + currentImages[0] + `" class="d-block w-100" alt="">
      </div>`
    for (let i = 1; i < currentImages.length; i++) {
        let image = currentImages[i];
        htmlContentToAppend += `
          <div class="carousel-item">
            <img src="` + image + `" class="d-block w-100" alt="">
          </div>`
    }
/* le pido que agregue todo esto al div carouselstart*/
    document.getElementById('carouselstart').innerHTML = htmlContentToAppend
}

/* función que muestra comentarios de producto en el html*/
function showComments(currentComments) {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentComments.length; i++) {
        let comments = currentComments[i];
        htmlContentToAppend +=
            comments.score + '/5 <p>' + comments.description + '</p><p>' + comments.user + `- <span class='text-muted'>` + comments.dateTime + '</span><p> <hr>'

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
};

/* una vez se le da enviar al comentario, crea uno nuevo al final de los comentarios ya existentes*/
newcomment.addEventListener("submit", function (e) {
    e.preventDefault();
    let newcomment = document.getElementById('writeComment').value
    let date = new Date();
    let comments = document.getElementById('comentarios');
    let score = document.querySelector('input[name="rating"]:checked').value
    comments.innerHTML += 
        score + `/5
        <p> ` + newcomment + `</p><a href=my-profile.html>` + localStorage.getItem('usuario') + `</a>` + `- <span class='text-muted'>`
        + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + '</span> <hr>'
/*luego borra los datos ingresados */
    document.querySelector('#writeComment').value = ''
    document.querySelector('input[name="rating"]:checked').checked = false
});

/* le pido que ejecute las funciones de mostrar producto e imágenes luego de obtener los datos del json*/
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showProduct(resultObj.data);
            showImages(resultObj.data);
        }
    })
});


/* le pido que ejecute la función de mostrar comentarios luego de obtener los datos del json*/
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showComments(resultObj.data);
        }
    })
});