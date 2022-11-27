const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const URL_GENIAL = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE
const URL_INFO = PRODUCT_INFO_URL + localStorage.getItem("idproducto") + EXT_TYPE
const URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("idproducto") + EXT_TYPE
let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}
let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

function cerrarsesion(){
  localStorage.removeItem("useremail")
  localStorage.removeItem("usuarioactivo")
  location.href = "login.html"
}

function mostrarusuario(){
  let nombre = localStorage.getItem("useremail")
  if (nombre === null){
    alert("Debe iniciar sesion")
    location.href = "login.html"
}
else{
  document.getElementById("nombredeusuario").innerHTML= `¡Hola!, ` + nombre
}
}

function userobject(){
  let usuario = {}
      usuario.nombre= document.getElementById("firstname").value,// lo toma de my_profile
      usuario.apellido= document.getElementById("surname").value, // lo toma de my_profile
      usuario.telefono= document.getElementById("phone").value,// lo toma de my_profile
      usuario.email= document.getElementById("username").value // lo toma del login y lo imprime en my profile
      usuario.segundoapellido = document.getElementById("email").value// lo toma de my_profile
      usuario.segundonombre = document.getElementById("secondname").value// lo toma de my_profile
      usuario.direccion = document.getElementById("address").value// lo toma de my_profile
      localStorage.setItem("usuarioactivo", JSON.stringify(usuario))
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}