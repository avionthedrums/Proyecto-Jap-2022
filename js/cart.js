let carrito = []
let URL_CARRITO = CART_INFO_URL + "25801" + EXT_TYPE
function mostrarcarrito(array){
    let htmlContentToAppend = ""
    for (producto of array.articles){
    htmlContentToAppend +=`

    <div class="col"> <img src="${producto.image}" class="img-thumbnail"> </div>
    <div class="col">${producto.name}</div>
    <div class="col">${producto.unitCost} ${producto.currency}</div>
    <div class="col"> <input type="number" value="1" id="cantidad" min="1" onchange="calcularsub(${producto.unitCost})"> </div>
    <div class="col"> <span id="subtotal" class="fw-bold">${producto.unitCost}</span> ${producto.currency}</div>
    `
    document.getElementById("carrito").innerHTML = htmlContentToAppend
} 
}
function calcularsub(precio){
    let cantidad= parseInt(document.getElementById("cantidad").value)
   let resultado = precio * cantidad
   document.getElementById("subtotal").innerHTML = resultado
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_CARRITO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carrito = resultObj.data;
            mostrarcarrito(carrito)
        }
    })
})