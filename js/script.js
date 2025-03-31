import { imagesArray, headImagesArray } from "./data/clothes.js";

const images = document.querySelectorAll('.clothes-image');
let skirt, head;
const keroppi_image = document.getElementById('keroppi-image'),
      resetButton = document.getElementById('reset-button'),
      elements = [
        skirt = document.getElementById('falda-image'),
        head = document.getElementById('head-image'),
      ],
      leftArrow = document.getElementById('left-arrow'),
      rightArrow = document.getElementById('right-arrow');


let counter = 0; // start index
const imagesPerView = 3;

/*Doing the tabs logic */
let selectedCategory = imagesArray; // Default category
let selectedOption = skirt; // Default option

const tabMap = {
  'clothes': [imagesArray, skirt],
  'head-accesories': [headImagesArray, head],
  'hand-accesories': 'hand',
  'keroppi-background': 'background',
};

function cleanKeroppi() {
    elements.forEach(el => {
        el.style.display = 'none';
      }); // Hide all elements initially
}

cleanKeroppi(); // Hide all elements initially

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

function updateImages() {
    for (let i = 0; i < imagesPerView; i++) {
      const imageData = selectedCategory[counter + i];
  
      if (imageData && images[i]) {
        images[i].src = imageData.src;
        images[i].style.display = 'block'; // mostrar la imagen si hay datos
      } else if (images[i]) {
        images[i].style.display = 'none'; // ocultar si no hay data
      }
    }
  }



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

