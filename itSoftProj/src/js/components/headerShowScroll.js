export const headerShowScrolling = () => {
  let lastScroll = 0;
  const defaultOffset = 200;
  const header = document.querySelector('.header');

  const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
  const headerHide = () => header.classList.contains('hide');
  const headerShow = () => header.classList.contains('show');

  document.addEventListener('scroll', () => {

    if(scrollPosition() > defaultOffset && !headerShow()){
      header.classList.add('show');
      document.body.style.paddingTop = `${header.clientHeight}px`;
      console.log("show");
    } else if(scrollPosition() < defaultOffset && headerShow()){
      header.classList.remove('show');
      document.body.style.paddingTop = null;
    }


    if(scrollPosition() > lastScroll && scrollPosition() > defaultOffset && !headerHide()) {
      // down
      // header.classList.add('show');
      header.classList.add('hide');
    } else if(scrollPosition() < lastScroll){
      // up
      header.classList.remove('hide');
    }
lastScroll = scrollPosition();
  })
}