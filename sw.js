// VARNOTO service worker v2 — safe caching: never store failures, easy purge
const CACHE='varnoto-v2';
const CORE=['./','./index.html','./style.css','./app.js','./manifest.json'];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()).catch(()=>{}));
});
self.addEventListener('activate',e=>{
 e.waitUntil(
  caches.keys()
   .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
   .then(()=>self.clients.claim())
 );
});
self.addEventListener('message',e=>{
 if(e.data==='PURGE'){caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k))));}
});
function putOk(cacheName,req,res){
 if(!res||!res.ok) return;
 try{const c=res.clone();caches.open(cacheName).then(cc=>cc.put(req,c)).catch(()=>{});}catch(e){}
}
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET') return;
 if(u.hostname.includes('supabase.co')||u.hostname.includes('supabase.com')) return; // always live API
 if(e.request.mode==='navigate'){
  e.respondWith(
   fetch(e.request)
    .then(r=>{putOk(CACHE,e.request,r);return r;})
    .catch(()=>caches.match(e.request).then(x=>x||caches.match('./index.html')))
  );
  return;
 }
 if(u.pathname.match(/\.(jpg|jpeg|png|svg|css|js|woff2?|json|xml|txt)$/)){
  e.respondWith(
   caches.match(e.request).then(hit=>{
    if(hit) return hit;
    return fetch(e.request).then(r=>{putOk(CACHE,e.request,r);return r;});
   })
  );
 }
});
