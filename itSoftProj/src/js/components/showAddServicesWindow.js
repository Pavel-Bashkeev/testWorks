export const showAddServicesWindow = () => {
  const addServicesBtn = document.querySelector('.product-addservice__btn');
  const addServicesBox = document.querySelector('.product-addservice__box');
  const checkboxAddServices = document.querySelector('.product-addservice__label-input');

  addServicesBtn.addEventListener('click', () => addServicesBox.classList.toggle('open'));
  checkboxAddServices.addEventListener('change', () => {
    addServicesBox.classList.remove('open');
    checkboxAddServices.checked ? addServicesBtn.classList.add('added') : addServicesBtn.classList.remove('added');
  });
  checkboxAddServices.checked ? addServicesBtn.classList.add('added') : addServicesBtn.classList.remove('added');
}