export const choicePproductPrivew = () =>{
  const mainImgPreviewProduct = document.querySelector('.product-preview__img');
  const previewControlBtns = document.querySelectorAll('.product-preview__btn');

  previewControlBtns.forEach(item => {
    item.addEventListener('click', () => {
      if(item.classList.contains('active')) return
      let srcPreviewBtn = item.querySelector('.product-preview__btn-img').getAttribute('src');
      for(let i = 0; i <previewControlBtns.length; i++){
        previewControlBtns[i].classList.remove('active')
      }
    
      mainImgPreviewProduct.src = srcPreviewBtn;
      item.classList.add('active');
    });
    
  })
}