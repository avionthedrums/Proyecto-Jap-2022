//esta funcion evita que se pueda acceder si no hay usuario registrado// ya no la necesito, lo hace la de mostrar usuario
/*function profileaccess(){
    let usuario = localStorage.getItem(JSON.parse("usuarioactivo.email"))
    if(usuario==""){
        alert("Debe iniciar sesion para acceder al perfil")
        location.href = "login.html"
    }
}*/
//Esta funcion toma los valores del input, crea y modifica el usuarioactivo
let userName= document.getElementById("firstname")
let userSurname= document.getElementById("surname")
let userPhone= document.getElementById("phone")
let userMail= document.getElementById("email")
let userSec_Name= document.getElementById("secondname")
let userSec_Surname= document.getElementById("secondsurname")
let usuario = {}
let srcData=""

function userobject(){
        usuario.nombre= userName.value,
        usuario.apellido= userSurname.value, 
        usuario.telefono= userPhone.value,
        usuario.email= userMail.value
        usuario.segundoapellido = userSec_Surname.value
        usuario.segundonombre = userSec_Name.value
        localStorage.setItem("usuarioactivo", JSON.stringify(usuario))
}

function showemail(){
    let mail= localStorage.getItem("useremail")
    document.getElementById("email").value= mail
}
// esta funcion es la que obtiene la informacion del local y la muestra 

function showperson(){
    person = JSON.parse(localStorage.getItem("usuarioactivo"))
       userName.value = person.nombre
       userSurname.value = person.apellido 
       userMail.value = person.email 
       userPhone.value = person.telefono 
       userSec_Surname.value = person.segundoapellido
       userSec_Name.value = person.segundonombre 
       document.getElementById("nombretarjetadeusuario").innerHTML= person.nombre
 }
//esta funcion valida el formulario que no este vacio nombre telefono(min 8 numeros) ni apellido
function formvalidation(){
    let nombre = document.getElementById('firstname')
    let apellido = document.getElementById('surname')
    let telefono = document.getElementById('phone')
    let res = true
    
    
    if (nombre.value==""){
        nombre.setCustomValidity(false);
        res=false;
    }
    else{
        nombre.setCustomValidity("");
    }

    if (apellido.value==""){
        apellido.setCustomValidity(false);
        res=false;
    }
    else{
        apellido.setCustomValidity("");
    }

    if (telefono.value==""){
        telefono.setCustomValidity(false);
        res=false;
    }
    else{
        telefono.setCustomValidity("");
    }
    userobject()
    return res;
}

document.addEventListener("DOMContentLoaded", function(e){ 
    mostrarusuario();
    showemail();
    if(usuario != null){
        showperson()
    }
    
})
document.getElementById('formperfil').addEventListener('submit', evento=>{
   
    if( !formvalidation() || !this.checkValidity() ){
        evento.preventDefault();
        evento.stopPropagation();
    }
    document.body.classList.add('was-validated');

})

document.getElementById('file').addEventListener('change', ()=>{ //DESAFIATE BASE 64
    let filesSelected = document.getElementById("file").files;
    if (filesSelected.length > 0) {

        let fileToLoad = filesSelected[0];
        let fileReader = new FileReader();
    
        fileReader.onload = function(fileLoadedEvent) {
        srcData = fileLoadedEvent.target.result; // <--- data: base64

        document.getElementById('image').src = srcData;
    }
    evaluate = true;
    fileReader.readAsDataURL(fileToLoad);
    }
       
})
