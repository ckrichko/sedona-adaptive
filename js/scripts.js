var mainNav = document.querySelector('.main-nav');
var mainNav__opened = document.querySelector('.main-nav--opened');
var mainNav__toggle = document.querySelector('.main-nav__toggle');

mainNav.classList.remove('main-nav__nojs');
mainNav__opened.classList.remove('main-nav--opened');
mainNav.classList.add('main-nav--closed');

mainNav__toggle.addEventListener('click', function () {
  if (mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--opened');
  } else {
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');
  }

});
