export const choiceViewCatalog = () => {
  const btnsView = document.querySelectorAll(".content-preview__btn");
  const catalogInner = document.querySelector(".subcategory-content");

  btnsView.forEach((item) => {
    item.addEventListener('click', () => {
      if(item.classList.contains("content-preview__btn--active")) return;

    for(let i = 0; i < btnsView.length; i++){
      btnsView[i].classList.remove('content-preview__btn--active');
    };
    item.classList.add("content-preview__btn--active");

    if (item.classList.contains("content-preview__grid")) {
      catalogInner.classList.add("view-grid");
      catalogInner.classList.remove("view-list");
    } else if (item.classList.contains("content-preview__list")){
      catalogInner.classList.remove("view-grid");
      catalogInner.classList.add("view-list");
    }
    })
    
  });
};
