function singin (){ //Chequea que haya usuario y contraseña y que cumplan las condiciones
    let usuario = document.getElementById("username").value
    let contrasena = document.getElementById("password").value
    let exp= /\S+@\S+\.\S+/
 if (usuario == "" || contrasena == ""){
    Swal.fire('Debe introducir usuario y contraseña')
 }

 else if(contrasena.length<6){
    Swal.fire("La contraseña debe tener mas de 6 caracteres")
 }

 else if (!(exp.test(usuario))){
    Swal.fire("El email no es valido")
 }

else{
    location.href= "index.html"
    localStorage.setItem("useremail",usuario);
}

}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('form').addEventListener('submit', function(event) {
   
        if(!singin() || !form.checkValidity() ){
            event.preventDefault();
            event.stopPropagation();
        }
        
       form.classList.add('was-validated');
     
    })
})