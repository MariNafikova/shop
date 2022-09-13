'use strict';

let brandDark = document.querySelector('.brandDark');
let headerBars = document.querySelector('.iconMenu');
let menuClose = document.querySelector('.brandMenuClose');

function toggleMenu() {
    brandDark.classList.toggle('brandHidden');
}

headerBars.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);