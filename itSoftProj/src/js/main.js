import documentReady from './modules/documentReady.js';
import lazyImages from './modules/lazyImages.js';
import * as webpSupportFunctions from './modules/webpSupport.js';
documentReady(()=>{
  console.log('ready');
  lazyImages();
  webpSupportFunctions.isWebp();
})

