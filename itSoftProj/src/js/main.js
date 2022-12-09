import '../index.html';
import '../scss/main.scss';


import documentReady from './modules/documentReady.js';
import { showMenu } from './components/menu.js';
import { showSearch } from './components/showSearch.js';
import lazyImages from './modules/lazyImages.js';
import { choiceViewCatalog } from './components/choiceViewCatalog.js';
import { showMenuCharacter } from './components/showMenuCharacter.js';
import { choicePproductPrivew } from './components/choiceProductPreview.js';
// import { headerShowScrolling } from './components/headerShowScroll.js';
// import * as webpSupportFunctions from './modules/webpSupport.js';
// import linkSmooth from './helpers/linkSmooth.js';
import {Modal} from './plugins/plugModal.js';
import { showAddServicesWindow } from "./components/showAddServicesWindow.js";
import { sliderProdAnother } from "./components/sliderProductAnother.js";
import { responsiveMenuCharacter } from "./components/responsiveMenuCharacter.js";
import { responsiveMenuCategory } from "./components/responsiveMenuCategory.js";
import { titleUpdateLength } from "./components/titleUpdateLength.js";
import { showSubmenuCategory } from "./components/showSubmenuCategory.js";

documentReady(() => {
  /* Main */
  showMenu();
  showSearch();
  lazyImages();
  showMenuCharacter();
  // showSubmenuCategory();
  responsiveMenuCharacter();
  responsiveMenuCategory();
  showAddServicesWindow();
 /* Main */

  /* Card */
  document.querySelector('.card-product') ? titleUpdateLength(): '';
  /* Card */
  /* sliderProdAnother */
  sliderProdAnother();
  /* sliderProdAnother */
  /* Catalog */
  document.querySelector(".subcategory-content") ? choiceViewCatalog() : '';
  document.querySelector('.product-preview__img') ? choicePproductPrivew() : '';
  /* Catalog */



	const modal = new Modal({
		isOpen: ()=>{}
	});
});
// linkSmooth();


// webpSupportFunctions.isWebp();
// headerShowScrolling(); нужно доделать