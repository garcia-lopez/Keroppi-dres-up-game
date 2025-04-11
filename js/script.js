import { imagesArray, headImagesArray, faceImagesArray } from "./data/clothes.js";
import { backgroundImagesArray } from "./data/wallpaper.js";

const images = document.querySelectorAll('.clothes-image');
let skirt, head, face, container; // Declare variables for the images
const keroppi_image = document.getElementById('keroppi-image'),
      resetButton = document.getElementById('reset-button'),
      elements = [
        skirt = document.getElementById('falda-image'),
        head = document.getElementById('head-image'),
        face = document.getElementById('face-accessory-image'),
        container = document.getElementById('keroppi-container')
      ],
      musicButton = document.getElementById('music-button'),
      leftArrow = document.getElementById('left-arrow'),
      rightArrow = document.getElementById('right-arrow');


let counter = 0; // start index
const imagesPerView = 3;
let isPlaying = true; // Variable to track the music state

const song = new Audio();
song.src = '../assets/music/music.mp3'; // Path to your music file
song.loop = true; // Loop the music

/*Doing the tabs logic */
let selectedCategory = imagesArray; // Default category
let selectedOption = skirt; // Default option

const tabMap = {
  'clothes': [imagesArray, skirt],
  'head-accesories': [headImagesArray, head],
  'face-accesories': [faceImagesArray, face],
  'keroppi-background': [backgroundImagesArray, container],
};

function cleanKeroppi() {
  elements.forEach(el => {
      if (el === container) {
          // Specific logic for the element with id 'falda-image'
          el.style.display = 'flex'; // Keep this element visible
          el.style.backgroundImage = `url(${backgroundImagesArray[0].wallpaper})`; // Set the default background image
          el.style.backgroundSize = 'cover'; // Optional: Adjust the background size
          document.body.style.backgroundImage = `url(${backgroundImagesArray[0].wallpaper})`; // Set the default body background image
          document.body.style.backgroundSize = 'cover'; // Optional: Adjust the background size
      } else {
          // Default logic for other elements
          el.style.display = 'none';
      }
  });
}

function playMusic() {
  const icon = document.getElementById('music-icon');
  if (isPlaying) {
       icon.src = '../assets/images/img-elements/no-music-icon.svg';	
       song.pause(); // Pause the music
       isPlaying = false;
  } else { 
       isPlaying = true;
       song.play(); // Play the music
       icon.src = '../assets/images/img-elements/music-icon.svg';	
  }
}

function updateBackground(source) {
  container.style.backgroundImage = `url(${source})`; // Update the background image of the container
  container.style.backgroundSize = 'cover'; // Optional: Adjust the background size
  document.body.style.backgroundImage = `url(${source})`; // Update the body background image
  document.body.style.backgroundSize = 'cover'; // Optional: Adjust the background size
}

function updateImages() {
  for (let i = 0; i < imagesPerView; i++) {
    const imageData = selectedCategory[counter + i];
    if (imageData && images[i]) {
      images[i].id = imageData.id;
      images[i].src = imageData.src;
      images[i].style.display = 'block';
    } else if (images[i]) 
      {
      images[i].style.display = 'none';
    }
  }
}

Object.keys(tabMap).forEach((tab) => {
  const tabElement = document.getElementById(tab);
  tabElement.addEventListener('click', () => {
    selectedCategory = tabMap[tab][0];
    counter = 0; // Reset counter when changing tabs
    updateImages(); // Update images when a new tab is clicked
    selectedOption = tabMap[tab][1]; // Update the selected option 
  });
});

resetButton.addEventListener('click', function() {
    keroppi_image.style.animation = 'none';
    cleanKeroppi(); // Hide all elements initially
    setTimeout(() => { keroppi_image.style.animation = 'jump-shaking 0.5s'; }, 10); /*To ensure that an animation re-asigns properly, I need to set a small timeout -.-*/
});

images.forEach((image) => {
    image.addEventListener('click', function() {
        if (selectedOption === container) {
            updateBackground(backgroundImagesArray.find(bg => bg.id === this.id).wallpaper); // Update the background image of the container
            return;
        }
        selectedOption.style.display = 'block';
        selectedOption.src = this.src;
      });
})

rightArrow.addEventListener('click', function () {
    counter += imagesPerView;
    // Si se pasa del final, reinicia al principio
    if (counter >= selectedCategory.length) {
        counter = 0;
    }

    updateImages();
});

leftArrow.addEventListener('click', function () {
    counter -= imagesPerView;

    // Si baja de 0, salta al último grupo completo (ajustado para múltiplos de 3)
    if (counter < 0) {
        const remainder = selectedCategory.length % imagesPerView;
        counter = remainder === 0
            ? selectedCategory.length - imagesPerView
            : selectedCategory.length - remainder;
    }
    updateImages();
});


musicButton.addEventListener('click', function() {
   playMusic();
});

cleanKeroppi(); // Hide all elements initially
playMusic(); // Call the function to set the initial state of the icon



/*
I can use this function with id in case that I want to add unique css style to an image 
function updateImages() {
    for (let i = 0; i < imagesPerView; i++) {
        const imageData = selectedCategory[counter + i];

        // Asegurarse que no haya overflow
        if (imageData && images[i]) {
            images[i].id = imageData.id;
            images[i].src = imageData.src;
        } else {
            // Oculta imagen si no hay suficiente data
            images[i].style.display = 'none';
        }
    }

    // En caso de que hayan estado ocultas antes
    for (let i = 0; i < imagesPerView; i++) {
        if (images[i]) {
            images[i].style.display = 'block';
        }
    }
}*/

