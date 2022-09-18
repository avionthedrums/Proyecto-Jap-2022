let productosinfoArray = []
let comentarios = []
function mostrarusuario4(){
    let usuario = localStorage.getItem("user")
    document.getElementById("user3").innerHTML = 'Usuario: ' + usuario
}
function showProductInfo(array){
    let htmlContentToAppend = "";

        htmlContentToAppend += `
                <div class="col">
                        <div class="mb-1">
            
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
<img src="` + foto +  `" alt="product image" class="img-thumbnail">
</div>`
}
return fotografias
}

function mostrarcomentarios(array){
    let htmlContentToAppend =""
    for (comments of array){
        htmlContentToAppend += `<li>
        <h5>`+ comments.user+ `</h5>`+
        `<p>`+comments.description+` </p> Puntuacion: `+ comments.score+` Fecha de publicacion: `+comments.dateTime + `</li> `+`<hr>`
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }

        }

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productosinfoArray = resultObj.data;
            showProductInfo(productosinfoArray);
            hideSpinner();
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
