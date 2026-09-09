// VARNOTO info-pages override — renders dashboard-edited content over static fallback
(function(){
 const SLUG=window.PAGE_SLUG; if(!SLUG) return;
 const KEY='varnoto_store_v1';
 const SUPA_URL='https://xgokhpdhzafuluiqdtah.supabase.co', SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnb2tocGRoemFmdWx1aXFkdGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjU0NDMsImV4cCI6MjEwNDU0MTQ0M30.2B-0GPvxh5KoXVM4jhN06hCt75LakazSC36bh637zQA';
 let last=null;
 function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
 function render(L){
  if(!last) return;
  const t=last['title_'+L]||last.title_ar||last.title_en;
  const b=last['body_'+L]||last.body_ar||last.body_en;
  const main=document.querySelector('main.page'); if(!main) return;
  const back=L==='ar'?'→ العودة للرئيسية':'← Back to home';
  let html='';
  if(t){html+='<h1>'+esc(t)+'</h1>';document.title=t+' | VARNOTO';}
  if(b){html+=b.split(/\n\s*\n/).map(p=>'<p>'+esc(p).replace(/\n/g,'<br>')+'</p>').join('');}
  html+='<a class="back link" href="index.html">'+back+'</a>';
  main.innerHTML=html;
 }
 async function boot(){
  let s={}; try{s=JSON.parse(localStorage.getItem(KEY))||{};}catch(e){}
  try{
   const r=await fetch(SUPA_URL+'/rest/v1/store_config?id=eq.1&select=data',{headers:{apikey:SUPA_KEY,Authorization:'Bearer '+SUPA_KEY}});
   const j=await r.json(); const d=j&&j[0]&&j[0].data;
   if(d){s=Object.assign({},s,d);try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
  }catch(e){}
  if(s.pages&&s.pages[SLUG]&&(s.pages[SLUG].body_ar||s.pages[SLUG].body_en||s.pages[SLUG].title_ar||s.pages[SLUG].title_en)){
   last=s.pages[SLUG];
   render(document.documentElement.lang||'ar');
  }
 }
 document.addEventListener('click',e=>{
  if(e.target&&e.target.id==='langBtn') setTimeout(()=>render(document.documentElement.lang||'ar'),0);
 });
 boot();
})();
