let itemsGaleria = document.querySelector('.galeria__item');
const playIcon = document.querySelector('.galeria__icon');
const slider = document.querySelector('.carrousel__slider');

for(let i = 0; i < itemsGaleria.length; i++){
    const item = itemsGaleria[i];
    console.log(item);


function playMusic(){
    

}

function showPlayer(){
    if(playIcon.style.display === "none"){
        playIcon.style.display === "block";
    }

}

item.addEventListener('click',showPlayer);

}

let currentSlide = 0;

function handleInterval(){
    currentSlide++;
  if(currentSlide >= slider.children.length-2){
      
    currentSlide = 0;
  }
    slider.style.transform = `translate(-${ (slider.clientWidth/3) * currentSlide }px, 0px)`;

    var width = window.innerWidth;
    if(width<=1000){
        slider.style.transform = `translate(-${ slider.clientWidth * currentSlide }px, 0px)`;

    }


}
console.log(slider.children.length);

let intervalId;

function handleMouseEnter () {
  intervalId = setInterval(handleInterval, 2000);
}

handleMouseEnter();






//Responsive js
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