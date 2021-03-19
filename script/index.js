const itemsGaleria = document.querySelectorAll('.galeria__item');
const itemsMusic = document.querySelectorAll('.galeria__music');
const itemsAudio = document.querySelectorAll('.galeria__audio');
const slider = document.querySelector('.carrousel__slider');
const itemsPlay = document.querySelectorAll('.galeria__playbtn');
const itemsPause = document.querySelectorAll('.galeria__pausebtn');
const galeria = document.querySelector('.galeria');
let musicOn = false;
var width = window.innerWidth;





    for (let index = 0; index < itemsPlay.length; index++) {
        const music = itemsMusic[index];
        const audio = itemsAudio[index];

        function showPlayer() {
            music.style.display = "block";
            audio.play();

            if (!audio.paused) {
                itemsPlay[index].style.display = "none";
            }

        }
        itemsPlay[index].addEventListener('click', showPlayer);

    }




    for (let index = 0; index < itemsPause.length; index++) {
        const music = itemsMusic[index];
        const audio = itemsAudio[index];

        function stopMusic() {
            music.style.display = "none";
            audio.pause();
            if (audio.paused) {
                itemsPlay[index].style.display = "block";

            }
        }


        itemsPause[index].addEventListener('click', stopMusic);

    }




    for (let index = 0; index < itemsGaleria.length; index++) {
        const music = itemsMusic[index];
        const audio = itemsAudio[index];

    if (width <= 1000) {
        function playMusic() {
            console.log("suena");
            if (audio.paused && !musicOn) {
                musicOn=true;
                console.log(musicOn+"musica");
                music.style.display = "block";
                audio.play();

            } if(!audio.paused && musicOn==true){
                music.style.display = "none";
                musicOn=false;
                audio.pause();

            }
           
        }

    }
       
            itemsGaleria[index].addEventListener('click', playMusic);
        
}



// SLIDER

let currentSlide = 0;

function handleInterval() {
    currentSlide++;
    if (currentSlide >= slider.children.length - 2) {

        currentSlide = 0;
    }
    slider.style.transform = `translate(-${(slider.clientWidth / 2) * currentSlide}px, 0px)`;


    if (width <= 1000) {
        if (currentSlide >= slider.children.length) {

            currentSlide = 0;
        }

        slider.style.transform = `translate(-${slider.clientWidth * currentSlide}px, 0px)`;

    }


}
console.log(slider.children.length);

let intervalId;

function handleMouseEnter() {
    intervalId = setInterval(handleInterval, 2000);
}

handleMouseEnter();






//Responsive js burgermenu
let burgerMenu = document.querySelector('.burgerMenu');
let navegacion = document.querySelector('.navegacion');


function burgerDesplegar() {
    if (navegacion.style.display === "none") {
        navegacion.style.display = "block";
    } else {
        navegacion.style.display = "none";
    }

}

burgerMenu.addEventListener('click', burgerDesplegar);