export const responsiveMenuCharacter = () => {
  let visibleMenu = document.querySelector('.menu-character__list'),
    navCharacter = document.querySelector('.menu-character'),
    hideMenu = document.querySelector('.menu-character__list-hidden'),
    burgerMenuBtn = document.querySelector('[data-menu-character-btn]'),
    burgerMenuCount = burgerMenuBtn.querySelector('.main-menu__burger-count'),
    breaks = [];
  function updateMenu  () {
    if(navCharacter.offsetWidth === 0) return;
    let navCharacterWidth = burgerMenuBtn.classList.contains('hide') ? navCharacter.offsetWidth : navCharacter.offsetWidth - burgerMenuBtn.offsetWidth - 13 ;

    let visibleMenuWidth = visibleMenu.offsetWidth;
    if(navCharacterWidth < visibleMenuWidth){
      breaks.push(visibleMenuWidth);
      hideMenu.prepend(visibleMenu.lastChild);
      burgerMenuBtn.classList.remove('hide');
      burgerMenuCount.innerHTML = breaks.length;
      updateMenu()
    } else{
      if(navCharacterWidth > breaks[breaks.length -1]) {
        breaks.pop();
        visibleMenu.append(hideMenu.firstChild);
        burgerMenuCount.innerHTML = breaks.length;
      }
    }
  }
  burgerMenuBtn.addEventListener('click', () => {
    burgerMenuBtn.classList.toggle('active');
    hideMenu.classList.toggle('hide');
    setTimeout(()=>{
      hideMenu.classList.toggle('active');
    },300)
  });
  window.addEventListener('resize', updateMenu);
  document.body.clientWidth  < 1600 ? document.addEventListener('DOMContentLoaded', updateMenu) : '';
}