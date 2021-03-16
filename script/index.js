const itemsGaleria = document.querySelectorAll('.galeria__item');
const itemsMusic = document.querySelectorAll('.galeria__music');
const slider = document.querySelector('.carrousel__slider');
const itemsIcon  = document.querySelectorAll('.galeria__icon');
const galeria = document.querySelector('.galeria');





function showPlayer(){
    // console.log([p;0itemsIcon.values);

    for(let i = 0; i < itemsMusic.length; i++){
        console.log("hola");
        const music = itemsMusic[i];
        if(music.style.display === "none"){
            console.log("display");
            music.style.display == "block";
        }
    }
}

for (let index = 0; index < itemsIcon.length; index++) {
    itemsIcon[index].addEventListener('click',showPlayer);

}
    




// SLIDER

let currentSlide = 0;

function handleInterval(){
    currentSlide++;
  if(currentSlide >= slider.children.length-2){
      
    currentSlide = 0;
  }
    slider.style.transform = `translate(-${ (slider.clientWidth/2) * currentSlide }px, 0px)`;

    var width = window.innerWidth;
    if(width<=1000){
        if(currentSlide >= slider.children.length){
      
            currentSlide = 0;
          }
       
        slider.style.transform = `translate(-${ slider.clientWidth * currentSlide }px, 0px)`;

    }


}
console.log(slider.children.length);

let intervalId;

function handleMouseEnter () {
  intervalId = setInterval(handleInterval, 2000);
}

handleMouseEnter();






//Responsive js burgermenu
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