var currentProductsArray = [];
const ORDER_ASC_BY_PRICE = "LowHigh";
const ORDER_DESC_BY_PRICE = "HighLow";
const ORDER_BY_PROD_SOLD = "Relevance";

var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(sortCriteria, array) {
    let result = [];

    if (sortCriteria === ORDER_BY_PROD_SOLD) {
        /* Comparo los elementos del array de a dos y los reordena, sobreescribe el array original: */
        result = array.sort(function (a, b) {
            /* Parseo la cadena y obtengo un valor numérico*/
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            /* si el primer valor es superior al segundo, lo posiciona primero:  */
            if (aCount > bCount) { return -1; }
            /* si el primer valor es inferior al segundo, lo posiciona después:  */
            if (aCount < bCount) { return 1; }
        /* si el primer valor es igual al segundo no los mueve de lugar:  */
            return 0;
        });

    } else if (sortCriteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost < bCost) { return -1; }
            if (aCost > bCost) { return 1; }
            return 0;
        });

    } else if (sortCriteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        
        });
    }

    return result;
}

function showProductsList() {
    let htmlContentToAppend = "";
    
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

/* Para que filtre uno a uno una vez se aplique la función anónima con los botones 
pero igual me muestre los productos aunque no se haya filtrado:*/
        if ( ((minCost == undefined) ||(minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ( (maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost)))
            { 
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1"> Precio: `+ product.cost + ' ' + product.currency + `</h5>
                    </div>
                    </div>
                </div>
            </a>
            `
        }
    }

    document.getElementById("Products").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList(currentProductsArray);
}

/* Funciones que se ejecutan una vez que se haya lanzado el evento de
que el documento se encuentra cargado, es decir, se encuentran todos los
elementos HTML presentes.
Primero que nada, se muestran los productos ordenados por relevancia */

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_BY_PROD_SOLD, resultObj.data);
        }
    });
/* Si se da click en los botones ordena de a cuerdo a distintos criterios: */
    document.getElementById("Relevancia").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
/* Si se le asigna un rango de precio, filtra de acuerdo a eso, incluso cuando no se ingrese uno de los valores: */ 
    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo los valores para filtrar por costo:
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }
        showProductsList();
    });

 /* Para que me muestre la lista de productos sin filtrar una vez se limpie el filtro*/
     document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";
    
        minCost = undefined;
        maxCost = undefined;
    
        showProductsList();
    });
/* busqueda, pasa todo a minusculas para comparar */
     document.getElementById('searchBar').addEventListener('keyup', function(e){
        const search = e.target.value.toLowerCase();
        const filteredProducts = currentProductsArray.filter(function(product){
            return product.name.toLowerCase().includes(search)
        })
        console.log(filteredProducts)

    sortAndShowProducts(currentSortCriteria, filteredProducts)
    });
}); 
