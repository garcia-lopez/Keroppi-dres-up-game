const keroppi_image = document.getElementById('keroppi-image'),
      resetButton = document.getElementById('reset-button'),
      skirt = document.getElementById('falda-image');

resetButton.addEventListener('click', function() {

    keroppi_image.style.animation = 'none';
    skirt.style.display = 'none';
    setTimeout(() => { keroppi_image.style.animation = 'jump-shaking 0.5s'; }, 10); /*To ensure that an animation re-asigns properly, I need to set a small timeout -.-*/

    
});