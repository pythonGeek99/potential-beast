const CACHE_NAME = 'v1-static-assets';
const OFFLINE_URL = '/offline.html';

const ASSETS = [
  '/www.jysvertising.com/index.html',
  '/www.jysvertising.com/offline.html',
  '/www.jysvertising.com/Content/css/main.css',
  '/www.jysvertising.com/Content/js/main.min.js',
  '/www.jysvertising.com/Content/images/logo.png',
  '/www.jysvertising.com/Content/images/promo/hero1.jpg',
 '/www.jysvertising.com/Content/images/promo/hero2.png',
 '/www.jysvertising.com/Content/images/promo/hero3.jpg',
 '/www.jysvertising.com/Content/images/promo/hero4.jpg',
 '/www.jysvertising.com/Content/images/promo/hero1text.png',
 '/www.jysvertising.com/Content/images/promo/hero2text.png',
 '/www.jysvertising.com/Content/images/promo/hero3text.png',
 '/www.jysvertising.com/Content/images/promo/hero4text.png',
 '/www.jysvertising.com/Content/Js/jquery.bxslider.min.js',
'/www.jysvertising.com/Content/Js/layerslider.transitions.js',
'/www.jysvertising.com/Content/Js/layerslider.kreaturamedia.jquery.js',
'/www.jysvertising.com/Content/Js/jquery.min.js',
'/www.jysvertising.com/Content/Js/greensock.js',
'/www.jysvertising.com/Content/C_ss/skins/v5/skin.png',
'/www.jysvertising.com/Content/C_ss/layerslider.css',
'/www.jysvertising.com/Content/css/jquery.bxslider.min.css',
'/www.jysvertising.com/Content/Images/mobileslider/mhero1.png',
'/www.jysvertising.com/Content/Images/mobileslider/mhero2.png',
'/www.jysvertising.com/Content/Images/mobileslider/mhero3.png',
'/www.jysvertising.com/Content/Images/mobileslider/mhero4.png'

  
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching files...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(response => {
          return response || caches.match(OFFLINE_URL);
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});
