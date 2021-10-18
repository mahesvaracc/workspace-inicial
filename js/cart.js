let currentCarrito = [];
let total=0
var subtotal = document.getElementsByClassName('subtotal')

/* función que muestra los artículos en la cart  */
function showCart(currentCarrito) {
    let htmlContentToAppend = ` `;
    articlesCarrito = currentCarrito
    for (let i = 0; i < articlesCarrito.length; i++) {
          let article = articlesCarrito[i];
         htmlContentToAppend += `
        <tr>
        <td><img src='` + article.src + `' class =''img-fluid'' style='max-width:50px></td>
        <td class='align-middle'>` + article.name + `</td>
        <td class='align-middle'>` + article.currency + article.unitCost + `</td>
        <td class='align-middle'> <input type='number' min=1 value=` + article.count + ` id='` + i + 
            `' onchange="updateSubtotal(this.value,`+ article.unitCost + `,` + i + `,'` + article.currency + `')"></td>
        <td class='align-middle subtotal' id='subtotal` + i + `'>` + article.currency + ` ` + article.count * article.unitCost + ` </td>
        </tr>` 
        i++;
    } 
    document.getElementById("carrito").innerHTML = htmlContentToAppend;

    
}
/* función que llama al showcart  */
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCart(resultObj.data.articles);
            updateTotal()
        }
    })
});


function updateTotal(){
    for (let number of subtotal){
        total = number.innerHTML;
    }
    document.getElementById('total').innerHTML = total

};

function updateSubtotal(cantidad, unitcost, id, currency){
    let subtotalArticle = cantidad*unitcost
    document.getElementById('subtotal'+id).innerHTML = currency + ' ' + subtotalArticle;
    updateTotal();
}; 