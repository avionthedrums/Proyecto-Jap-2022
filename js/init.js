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
function logueado(){
  let usuario1 = localStorage.getItem("user")
  if (usuario1 === null){
      alert("Debe iniciar sesion")
      location.href = "login.html"
  }
}
function cerrarsesion(){
  localStorage.removeItem("user")
  location.href = "login.html"
}
function mostrarusuario(){
  let usuario3 = localStorage.getItem("user")
  document.getElementById("nombredeusuario").innerHTML= `Usuario: ` + usuario3
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