let productosinfoArray = []
let comentarios = []
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
                        <div class="row">`
                + misfotos(productosinfoArray.images) + `
                <hr>
                <br>
                <br>
                <p class= "text-center fs-5" > `+ productosinfoArray.description +`</p> 
                        </div>
                        <small class="text-muted text-end">` + productosinfoArray.soldCount + ` disponibles</small> 
                    </div>
            </div>
        `
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
        function puntuacion(array){
            let estrellas ="";
            
            for (let i = 1; i <= 5; i++){
                if(i <= array){
                    estrellas += `<i class="fa fa-star checked"></i>`;
                    
                }else {
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

//productsurl.relatedProducts
document.addEventListener("DOMContentLoaded", function(e){
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
        }
    });
  
    mostrarusuario4();
})
