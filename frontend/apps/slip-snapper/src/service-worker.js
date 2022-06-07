const CACHE_ =  "version_1";
const urlsToCache = ['index.html','offline.html'];
const self = this;

self.addEventListener('install',(event)=>{
event.waitUntil(
    caches.open(CACHE_)
    .then((cache)=>{
        return cache.addAll(urlsToCache);
    })
)
});

