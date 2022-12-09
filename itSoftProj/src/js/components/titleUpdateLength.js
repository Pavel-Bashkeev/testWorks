export const titleUpdateLength =() => {
  const titleCard = document.querySelectorAll('.card-product__title')

  titleCard.forEach(item => {
    item.innerHTML = item.textContent.truncString(40);
  })
}
String.prototype.truncString = function(max, add){
  add = add || '...';
  return (this.length > max ? this.substring(0,max)+add : this);
};