const CACHE_ =  "version_1";
const urlsToCache = ['index.html','offline.html'];

this.addEventListener('install',(event)=>{
event.waitUntil(
    caches.open(CACHE_)
    .then((cache)=>{
        return cache.addAll(urlsToCache);
    })
)
});

this.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(()=> caches.match('offline.html'))
        })
    )
});

this.addEventListener('activate',(event)=>{
    const cachewhitelist =[];
    cachewhitelist.push(CACHE_);
    event.waitUntil(
        caches.keys().then((cacheNames)=> Promise.all(
            cacheNames.map((cacheName)=>{
                if(!cachewhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        )
        )
    )
 });