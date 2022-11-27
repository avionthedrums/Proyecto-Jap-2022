let carrito = []

let URL_CARRITO = CART_INFO_URL + "25801" + EXT_TYPE
function mostrarcarrito(array){
    let htmlContentToAppend = ""
    for (producto of array){
    htmlContentToAppend +=`

    <div class="col"> <img src="${producto.image}" class="img-thumbnail"> </div>
    <div class="col">${producto.name}</div>
    <div class="col">${producto.unitCost} ${producto.currency}</div>
    <div class="col"> <input type="number" value="1" id="cantidad" min="1" onchange="calcularsub(${producto.unitCost})"> </div>
    <div class="col"> <span id="subtotal" class="fw-bold">${producto.unitCost}</span> ${producto.currency}<span><button class="btn btn-danger d-flex justify-content-end" name="delete">Borrar</button></span></div>
    <hr>
    `
    document.getElementById("carrito").innerHTML = htmlContentToAppend
    document.getElementById("subtotalabajo").innerHTML = producto.unitCost + ` `+producto.currency
} 
}
function calcularsub(precio){
    let cantidad= parseInt(document.getElementById("cantidad").value)
   let resultado = precio * cantidad
   document.getElementById("subtotal").innerHTML = resultado
   document.getElementById("subtotalabajo").innerHTML= resultado +` ` + producto.currency
   calcularenvio();
   calculartotal();
}

function calcularenvio(){
if (document.getElementById("premium").checked){
    let resultado = parseInt(document.getElementById("subtotalabajo").textContent)* 0.15
    document.getElementById("costodeenvio").innerHTML= resultado + ` ` + producto.currency
} 
if (document.getElementById("express").checked){
    let resultado = parseInt(document.getElementById("subtotalabajo").textContent) *  0.08
    document.getElementById("costodeenvio").innerHTML= resultado + ` ` + producto.currency
}
if(document.getElementById("standard").checked){
    let resultado = parseInt(document.getElementById("subtotalabajo").textContent)* 0.05
    document.getElementById("costodeenvio").innerHTML= resultado + ` ` + producto.currency
}
calculartotal();
}

function calculartotal(){
    let total = ""
    let subtotal = parseInt(document.getElementById("subtotalabajo").textContent)
    let envio = parseInt(document.getElementById("costodeenvio").textContent)
    total = subtotal+envio
    document.getElementById("total").innerHTML=total + ` ` + producto.currency
}

function disable(){
    let num = document.getElementById("ndetarjeta")
    let codigo = document.getElementById("codigodeseg")
    let venci= document.getElementById("venc") 
    let trans= document.getElementById("cuenta")
    if(document.getElementById("credito").checked){
        trans.disabled = true
    
    }
    else{
        trans.disabled = false
    }
    if (document.getElementById("transfe").checked){
        num.disabled = true
        codigo.disabled = true
        venci.disabled = true
    }
    else{
        num.disabled = false
        codigo.disabled = false
        venci.disabled = false
    }
}

function validacion(){
    let res = true
    let numtarjeta = document.getElementById("ndetarjeta").value
    let numcvv = document.getElementById("codigodeseg").value
    let vencimiento = document.getElementById("venc").value
    let tarjeta= document.getElementById("credito")
    let transferencia= document.getElementById("transfe")
    let cuentatrans= document.getElementById("cuenta")
    if (tarjeta.checked && numtarjeta!="" && numcvv!="" && vencimiento){
        document.getElementById("spanprueba").innerHTML= "Tarjeta"
        res
    }
    else if (transferencia.checked && cuentatrans!="") {
        document.getElementById("spanprueba").innerHTML= "Transferencia"
        res
    }
    else{
        document.getElementById("spanprueba").innerHTML= "Debe seleccionar metodo de pago"
        res=false
    }
    
    return res
}
function newitem(array){
    let anadido= "";
    anadido= JSON.parse(localStorage.getItem("newaddedproduct"))
    if (anadido !=null ){
        for (let productos of anadido){
            array.push(productos)
        }
    }
}
function borrar(array){
    array.splice
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_CARRITO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carrito = resultObj.data.articles;
            newitem(carrito);
            mostrarcarrito(carrito);
            calcularenvio();
            calculartotal();
            mostrarusuario();
        }
    })
    document.getElementById("credito").addEventListener("click",function(){
        disable();
        document.getElementById("cuenta").value=""
    })
    document.getElementById("transfe").addEventListener("click",function(){
        disable();
         document.getElementById("ndetarjeta").value=""
         document.getElementById("codigodeseg").value=""
         document.getElementById("venc").value=""
    })
    document.getElementById('form').addEventListener('submit', function(event) {
   
        if(!validacion() || !form.checkValidity() ){
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            alert("Compra exitosa")
        }
        
       form.classList.add('was-validated');
     
    })
    document.getElementById("close").addEventListener("click", ()=>{
        validacion();
    })
})