let burgerMenu = document.querySelector('.burgerMenu');
let navegacion = document.querySelector('.navegacion');

function burgerDesplegar(){
    if(navegacion.style.display === "none"){
        navegacion.style.display = "block";
    }else{
        navegacion.style.display = "none";
    }

}

burgerMenu.addEventListener('click',burgerDesplegar);