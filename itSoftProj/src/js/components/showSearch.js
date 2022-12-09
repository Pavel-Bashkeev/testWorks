export const showSearch = () => {
  const showBtnSearch = document.querySelector('.header-search__btn--mob');
  const formSearch = document.querySelector('.header-search');
  if(showBtnSearch) {
    showBtnSearch.addEventListener('click', () => {
      formSearch.classList.toggle('open');
    })
  }
}