// VARNOTO GTM loader — container ID comes from dashboard (SEO → integrations)
(function(){
 var KEY='varnoto_store_v1';
 var SUPA_URL='https://xgokhpdhzafuluiqdtah.supabase.co', SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnb2tocGRoemFmdWx1aXFkdGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjU0NDMsImV4cCI6MjEwNDU0MTQ0M30.2B-0GPvxh5KoXVM4jhN06hCt75LakazSC36bh637zQA';
 function cidFrom(s){ try{return (((s||{}).integrations||{}).gtm)||'';}catch(e){return '';} }
 function load(cid){
  if(!cid||window.gtmLoaded) return; window.gtmLoaded=cid;
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var s=document.createElement('script');s.async=true;
  s.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(cid);
  document.head.appendChild(s);
  var ns=document.createElement('noscript'),f=document.createElement('iframe');
  f.src='https://www.googletagmanager.com/ns.html?id='+encodeURIComponent(cid);
  f.height='0';f.width='0';f.style.display='none';f.style.visibility='hidden';
  ns.appendChild(f);document.body.insertBefore(ns,document.body.firstChild);
 }
 var cid='';
 try{cid=cidFrom(JSON.parse(localStorage.getItem(KEY))||{});}catch(e){}
 if(cid){load(cid);return;}
 fetch(SUPA_URL+'/rest/v1/store_config?id=eq.1&select=data',{headers:{apikey:SUPA_KEY,Authorization:'Bearer '+SUPA_KEY}})
  .then(function(r){return r.json();}).then(function(j){
   var d=j&&j[0]&&j[0].data; if(!d)return;
   try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}
   load(cidFrom(d));
  }).catch(function(){});
})();
