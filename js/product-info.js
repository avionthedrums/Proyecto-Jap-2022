let productosinfoArray = []
let comentarios = []
let username= JSON.parse(localStorage.getItem("usuarioactivo"))
let producto_nuevo = []

function mostrarusuario4(){
    let usuario = localStorage.getItem("user")
    document.getElementById("user3").innerHTML = 'Usuario: ' + usuario
}

function showProductInfo(array){
    let htmlContentToAppend = "";
    
    htmlContentToAppend += `
    <div class=" col-mb-6">
    <br><br>
    <h2 class= "text-center">`+ productosinfoArray.name+ `</h2> 
    <h4 class= "text-center"> `+ productosinfoArray.cost+` `+productosinfoArray.currency+ `</h4>
    <br><hr>
    <div class="row">`+ misfotos(productosinfoArray.images) + `
    <hr>
    <br>
    <br>
    <p class= "text-center fs-5" > `+ productosinfoArray.description +`</p> 
    </div>
    <small class="text-muted text-end">` + productosinfoArray.soldCount + ` disponibles</small> 
    </div>
    </div>`
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
}

function misfotos(galeria){
let fotografias = ""
for (let foto of galeria){
fotografias+= `
<div class="col-3">
<img src="${foto}" alt="product image" class="img-thumbnail">
</div>`
}
return fotografias
}

function mostrarcomentarios(array){
    let htmlContentToAppend =""
    for (comments of array){
        htmlContentToAppend += `<li class="list-group-item ">
        <b>`+ comments.user+ `</b>`+
        `<p>`+comments.description+` </p> Puntuacion: `+ puntuacion(comments.score)+` Fecha de publicacion: `+comments.dateTime + `</li> `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}

function fecha(){
    let fecha = new Date();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    let dia = fecha.getDate();

    if(hora < 10) { hora = '0' + hora; }
    if(minutos < 10) { minutos = '0' + minutos; }
    if(segundos< 10){segundos= '0' + segundos}

    if(dia < 10) { dia = '0' + dia; }
    if(mes < 10) { mes = '0' + mes; }

    let horario = `${dia}-${mes}-${año} ${hora}:${minutos}:${segundos}`
    return horario;
}

function nuevocomentario(array){
    let user = ""

        if (username != null && username.nombre != "" && username.apellido != ""){
            let name = username.nombre+"_"+username.apellido;
            user = name.toLowerCase();
        }else {
            user = "Anonimo";
        }
    
        let description = document.getElementById("description").value;
        let score =  document.getElementById("punt_acion").value
        let dateTime = fecha();
    
        array.push({user, score, description, dateTime});
        mostrarcomentarios(array);   
}

function puntuacion(array){
    let estrellas ="";
            
    for (let i = 1; i <= 5; i++){
        if(i <= array){
            estrellas += `<i class="fa fa-star checked"></i>`;
        }
        else {
            estrellas += `<i class="fa fa-star"></i>`;
        } 
    }
    return estrellas;
}

function idrelacionado(id) {
        localStorage.setItem("idproducto", id);
        window.location.replace("product-info.html")
}

function prodrelacionados(array){
    let htmlContentToAppend = ""
    for(producto of array.relatedProducts){
        htmlContentToAppend += `
        <div class= "col p-2">
        <div class=" card ">
        <img src= ${producto.image} class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${producto.name}</h5>
          <div onclick="idrelacionado(${producto.id})" class="btn btn-primary">Ver producto</div>
        </div>
        </div>
        </div>`
    }
    document.getElementById('productosrelacionados').innerHTML = htmlContentToAppend
}

function setnewItem(array){
    let peugeot = {name: "Peugeot 208", image: "img/prod50924_1.jpg", unitCost: 15200, count: 1, currency: "USD",id: 50924}
    let productObject= {};
    productObject.name = array.name;
    productObject.image = array.images[0];
    productObject.unitCost = array.cost;
    productObject.count = 1;
    productObject.currency = array.currency;
    productObject.id = array.id

    let arrayproduct = JSON.stringify(producto_nuevo);
    let newObject_Id = JSON.stringify(productObject.id);
    

    if (!(arrayproduct.includes(productObject) || newObject_Id == peugeot.id)){

        producto_nuevo.push(productObject);
        localStorage.setItem("newaddedproduct", JSON.stringify(producto_nuevo));
    }
    Swal.fire("¡Producto agregado!")
}
//productsurl.relatedProducts
document.addEventListener("DOMContentLoaded", function(e){
    producto_nuevo=JSON.parse(localStorage.getItem("newaddedproduct"));

    if(producto_nuevo == null){
        producto_nuevo = []
    }
    getJSONData(URL_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productosinfoArray = resultObj.data;
            showProductInfo(productosinfoArray);
            hideSpinner();
            prodrelacionados(productosinfoArray);
        }
    });
    getJSONData(URL_COMMENTS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           comentarios = resultObj.data;
           mostrarcomentarios(comentarios);
           mostrarusuario();
        }
    });
  
    mostrarusuario();
})
document.getElementById("newcomment").addEventListener("click", ()=>{
    nuevocomentario(comentarios);
    document.getElementById("description").value= ""
    document.getElementById("punt_acion").value = "1"
})
document.getElementById("buy").addEventListener("click",()=>{
    setnewItem(productosinfoArray);
})