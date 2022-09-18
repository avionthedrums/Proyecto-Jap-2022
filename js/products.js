let productosArray = [];
let minCount = null
let maxCount = null
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
        htmlContentToAppend += `
        <div onclick="setProductId(${category.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name +` -  `+ ` `+ category.currency + ` `+ category.cost+`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` unidades</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}
function filtro(){
    let maxCount = document.getElementById("maximo").value
    let minCount = document.getElementById ("minimo").value
    let productosfiltrados = productosArray.filter(products => products.cost>= parseInt(minCount) && products.cost <= parseInt(maxCount)) //|| products.cost>=parseInt(minCount) || products.cost<= parseInt(maxCount))
    //si el numero que me da en minimo es mayor o igual que el precio del producto y  el numero que me da en maximo es menor o igual al precio, debo mostrar ese producto, ya que su precio esta entre mi minimo y mi maximo.
    showCategoriesList(productosfiltrados);
} 
function limpiarfiltro(){
    showCategoriesList(productosArray);
    document.getElementById("maximo").value = ""
    document.getElementById("minimo").value = ""
}
function mostrarusuario2(){
    let usuario = localStorage.getItem("user")
    document.getElementById("user1").innerHTML = 'Usuario: ' + usuario
}
//funcion que setea el id de producto, hay que utilizarla en html content to append
function setProductId(product_id){
    localStorage.setItem("idproducto", product_id)
    window.location = "product-info.html"
}
function ordenaralfa(){
   productosArray.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      showCategoriesList(productosArray);

}

function ordenarbeta(){
    productosArray.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      showCategoriesList(productosArray);

}
document.getElementById("limpiarfiltro").addEventListener("click", function (){
    limpiarfiltro();
})
document.getElementById("filtrar").addEventListener("click", function() {
    filtro();
}) 
document.getElementById("sortAsc").addEventListener("click", function(){
    ordenaralfa();
})
document.getElementById("sortDesc").addEventListener("click", function(){
    ordenarbeta();
})
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_GENIAL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productosArray = resultObj.data.products;
            showCategoriesList(productosArray);
            hideSpinner()
        }
    });
    mostrarusuario2();
    //setProductId();
});