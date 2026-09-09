// VARNOTO service worker — cache-first for static assets, network-first for pages/API
const CACHE='varnoto-v1';
const CORE=['./','./index.html','./style.css','./app.js','./manifest.json'];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()).catch(()=>{}));
});
self.addEventListener('activate',e=>{
 e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET') return;
 if(u.hostname.includes('supabase.co')||u.hostname.includes('supabase.com')) return; // always live API
 if(u.pathname.match(/\.(jpg|jpeg|png|svg|css|js|woff2?)$/)){
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cc=>cc.put(e.request,c)).catch(()=>{});return r;}).catch(()=>caches.match('./index.html'))));
  return;
 }
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cc=>cc.put(e.request,c)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(x=>x||caches.match('./index.html'))));
});
