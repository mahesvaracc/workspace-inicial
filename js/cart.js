var currentCarrito = [];
var total = 0;
var subtotalCarrito = 0;
var camposTransferencia = document.getElementsByClassName('camposTransferencia');
var camposTarjeta = document.getElementsByClassName('camposTarjeta');
var metodoTarjeta = document.getElementById('metododepago1');
var metodoTransferencia = document.getElementById('metododepago2');

function validatePago(){
    if (metodoTarjeta.checked){
        for (let i = 0; i < camposTarjeta.length; i++) {
            camposTarjeta[i].setAttribute('required', true);
            camposTarjeta[i].removeAttribute('disabled');
            } 
        for (let e = 0; e < camposTransferencia.length; e++){
            camposTransferencia[e].setAttribute('disabled', true);
            }
    } else {
        for (let i = 0; i < camposTransferencia.length; i++) {
            camposTransferencia[i].setAttribute('required', true);
            camposTransferencia[i].removeAttribute('disabled');
            for (let e = 0; e < camposTarjeta.length; e++){
                camposTarjeta[e].setAttribute('disabled', true);
            } 
    }
}
}


/* función que muestra los artículos en la cart y muestra el subtotal y total inicial  */
function showCart(currentCarrito) {
    let htmlContentToAppend = ` `;
    articlesCarrito = currentCarrito
    for (let i = 0; i < articlesCarrito.length; i++) {
          let article = articlesCarrito[i];
         htmlContentToAppend += `
        <tr>
        <td> <img src='` + article.src + `' class =''img-fluid'' style='max-width:40px> </td>
        <td class='align-middle text-center'>` + article.name + `</td>

        <td class='align-middle text-center'>` + article.currency + '  ' + article.unitCost + `</td>
        <td  class='align-middle text-center'> <input style="width:70%" type='number' min=1 value=` + article.count + ` id='` + i + 
            `' onchange="updateSubtotalArticle(this.value,`+ article.unitCost + `,` + i + `,'` + article.currency + `');"></td>
        <td  class='align-middle text-center' id= 'subtotal`+ i + `' >` + article.currency + `  ` + 
        `<span class='subtotal' > ` + article.count * article.unitCost + `</span></td>
        </tr>` 
        i++;
                    

    } 
    document.getElementById("carrito").innerHTML = htmlContentToAppend;

    updateSubtotalCarrito()

}

/* función que se llama con el onchange del input number, actualiza subtotal del articulo, subtotal del carrito y el costo total. */
function updateSubtotalArticle(cantidad, unitcost, i, currency){
    let subtotalArticle = cantidad*unitcost;
    document.getElementById('subtotal'+i).innerHTML = currency + ' ' +  `<span class='subtotal' > ` + subtotalArticle + `</span>`;
    updateSubtotalCarrito();

}; 



/* función que actualiza el subtotal del carrito y el costo total. */

function updateSubtotalCarrito(){
    subtotalCarrito=0
    var subtotales = document.getElementsByClassName('subtotal');
    for (let i = 0; i < subtotales.length; i++) {
        let subtotal = subtotales[i];
        subtotalCarrito += parseFloat(subtotal.innerText);
  }

   console.log(subtotalCarrito)
    document.getElementById('subtotalCarrito').innerHTML = 'UYU ' + (subtotalCarrito).toFixed(2);
    updateTotal()

};
/* función que actualiza el costo total. */
function updateTotal(){
    let envioseleccionado = document.querySelector('input[name=metodoenvio]:checked')
    let costoenvio = envioseleccionado.value;
    total = subtotalCarrito + subtotalCarrito*costoenvio;  

    document.getElementById('costoenvio').innerHTML = 'UYU ' + (subtotalCarrito*costoenvio).toFixed(2);
    document.getElementById('total').innerHTML = '<b>UYU' + (total).toFixed(2); + '</b>'

};

/* función que llama al showcart para mostrar todos los datos al cargar la página */
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCart(resultObj.data.articles);

        }
    })
});