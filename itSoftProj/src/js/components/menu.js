const menuWrap = document.querySelector("[data-main-nav]");
const burgerBtn = document.querySelector(".hamburger");
export const showMenu = () => {
  
  menuWrap.addEventListener("click", (event) => {
    if (event.target.nodeName !== "BUTTON") return;
    closeAllsubMenu(event.target.nextElementSibling);
    event.target.nextElementSibling
      ? event.target.nextElementSibling.classList.toggle("open-submenu")
      : "";
    event.target.classList.contains("active")
      ? event.target.classList.remove("active")
      : event.target.classList.add("active");
  });

  document.addEventListener("click", (event) => {
    let isOpenMenu = menuWrap.classList.contains('open-menu');
    let isMenuElem = event.target === menuWrap || menuWrap.contains(event.target);
    let isBtnBurger = event.target === burgerBtn || burgerBtn.contains(event.target);
    if(isBtnBurger) {
      menuWrap.classList.toggle('open-menu');
      burgerBtn.classList.toggle('active-btn');
      closeAllsubMenu();
      if(document.body.clientWidth < 950){
        burgerBtn.classList.toggle('fixed-mob');
      }
    }
    if(!isMenuElem && !isBtnBurger && isOpenMenu) {
      menuWrap.classList.toggle('open-menu');
      burgerBtn.classList.toggle('active-btn');
      closeAllsubMenu()
    }
  });
};

function closeAllsubMenu(current = null) {
  let parrentsNode = [];
  if (current) {
    let currentParent = current.parentNode;
    while (currentParent) {
      if (currentParent.classList.contains("navigation__list")) break;
      if (currentParent.nodeName === "UL") parrentsNode.push(currentParent);
      currentParent = currentParent.parentNode;
    }
  }
  const subMenuAll = document.querySelectorAll(".menu .menu");
  Array.from(subMenuAll).forEach((item) => {
    if (item != current && !parrentsNode.includes(item)) {
      item.classList.remove("open-submenu");
      item.previousElementSibling.classList.remove("active");
    }
  });
}