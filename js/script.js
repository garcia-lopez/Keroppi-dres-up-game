import { clothes } from "./data/clothes.js";

const keroppi_image = document.getElementById('keroppi-image'),
      resetButton = document.getElementById('reset-button'),
      skirt = document.getElementById('falda-image'),
      option1 = document.getElementById('first-option'),
      option2 = document.getElementById('second-option'),
      option3 = document.getElementById('third-option');

skirt.style.display = 'none';      

resetButton.addEventListener('click', function() {
    keroppi_image.style.animation = 'none';
    skirt.style.display = 'none';
    setTimeout(() => { keroppi_image.style.animation = 'jump-shaking 0.5s'; }, 10); /*To ensure that an animation re-asigns properly, I need to set a small timeout -.-*/

    
});


option1.addEventListener('click', function() {
    for (let cloth in clothes){
        if(clothes[cloth].id == 'option1'){
            skirt.style.display = 'block';
            skirt.src = clothes[cloth].path;
        }
    }

});


