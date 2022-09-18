function singin (){
    let usuario = document.getElementById("username").value
let contrasena = document.getElementById("password").value
 if (usuario == "" || contrasena == ""){
    alert('Debe introducir usuario y contraseña')
 }
else{
    location.href= "index.html"
    localStorage.setItem("user",usuario)
}
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("entrar").addEventListener("click", ()=>
{
        singin();
        
    })
})