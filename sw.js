//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_pwa';

//Defino los ficheros a cachear en la aplicacion
var urlsToCache = [
  './',
  './css/estilos.css',
  './js/main.js',
  './images/logo.png',
  './images/logo.jpg',
  './images/costa-dorada.jpg',
  './images/logo-16.png',
  './images/logo-32.png',
  './images/logo-64.png',
  './images/logo-96.png',
  './images/logo-128.png',
  './images/logo-192.png',
  './images/logo-256.png',
  './images/logo-384.png',
  './images/logo-512.png',
  './images/logo-1024.png'
];

//Evento de instalacion del service weorker y guardar en cache los recursos estaticos
self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
          .then(cache => {
            return cache.addAll(urlsToCache)
                        .then(() => {
                          self.skipWaiting();
                        });
                      })
           .catch(err => {
              console.log('No se ha registrado el cache' , err);
            })

  );
});

//Evento de activacion, hace que la aplicacion funcione sin conexion
  self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
      caches.keys()
            .then(cacheNames => {
              return Promise.all(
                cacheNames.map(cacheName =>{
                  if (cacheWhitelist.indexOf(cacheName) === -1) {
                    //Borra los elementos que no se necesitan
                    return caches.delete(cacheName);
                  }
                }));
            })
            .then(() =>{
              //Activa la cache actual de nuestro dispositivo para que funcione sin conexion
              self.clients.claim();
            })
    );
  });

//Evento para actualizar la aplicacion o conseguir la informacion original desde el servidor
//comprueba que exista la informacion y en el caso de que no exista cachea esa informacion
self.addEventListener ('fetch', e => {
  e.respondWith(
    caches.match(e.request)
          .then(res => {
            if (res) {
              //si al matchearla da true significa que ya esta cacheada asi que devuelvo los datos de cachea
              return res;
            }
            //en el caso de que no este cacheada la devuelvo desde el servidor
            return fetch(e.request);
          })
  );
});

// para las notificaciones push

//Cuando lanzamos un mensaje push, el navegador recibe el mensaje push, descifra para qué service worker es el push antes de activar ese service worker
//y distribuir un evento push. Tenemos que escuchar este evento y mostrar una notificación como resultado.

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Push Codelab';
    const options = {
      body: 'Yay it works.',
      icon: 'images/icon.png',
      badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });


  //Podemos controlar los clics de notificación escuchando los eventos notificationclick de tu service worker.
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
      clients.openWindow('https://developers.google.com/web/')
    );
  });
