// VARNOTO — original demo store inspired by galvanoegy.com (no copied assets/text)
let LANG = 'ar';
const $ = (s) => document.querySelector(s);

const COLLECTIONS = [
  { id:'tshirt', en:'T-shirts', ar:'تيشيرتات', img:'assets/p-tee-white.jpg', en_sub:'heavyweight', ar_sub:'قطن تقيل' },
  { id:'linen', en:'Linen Shirts', ar:'قمصان لينن', img:'assets/p-shirt-summer.jpg', en_sub:'breathable', ar_sub:'خامة تتنفس' },
  { id:'jeans', en:'Wide-Leg Jeans', ar:'جينز وايد ليج', img:'assets/p-jeans-ice.jpg', en_sub:'denim', ar_sub:'دنيم' },
  { id:'sweat', en:'Sweat & Lounge', ar:'سويت ولاونج', img:'assets/p-lounge-cream.jpg', en_sub:'fleece', ar_sub:'ميلتون' },
  { id:'tailored', en:'Tailored Pants', ar:'بناطيل كلاسيك', img:'assets/p-pants-beige.jpg', en_sub:'smart', ar_sub:'شيك' },
  { id:'knit', en:'Knitted Polos', ar:'بولو نيت', img:'assets/p-polo-duo.jpg', en_sub:'knit', ar_sub:'تريكو' },
  { id:'tank', en:'Tank Tops', ar:'تانك توب', img:'assets/p-tank-white.jpg', en_sub:'gym', ar_sub:'جيم' },
  { id:'regular', en:'Essential Tees', ar:'أساسيات', img:'assets/p-tee-black.jpg', en_sub:'daily', ar_sub:'يومي' },
];

const PRODUCTS = [
  { id:1, cat:'tshirt', en:'Essential White Tee', ar:'تيشيرت أبيض أساسي', price:350, old:null, stock:true, img:'assets/p-tee-white.jpg' },
  { id:2, cat:'tshirt', en:'Essential Black Tee', ar:'تيشيرت أسود أساسي', price:350, old:450, stock:true, img:'assets/p-tee-black.jpg' },
  { id:3, cat:'sweat', en:'Oversized Grey Sweatshirt', ar:'سويت شيرت رمادي أوفرسايز', price:600, old:null, stock:true, img:'assets/p-sweatshirt-grey.jpg' },
  { id:4, cat:'sweat', en:'Lounge Set — Cream', ar:'طقم لاونج — كريمي', price:700, old:null, stock:true, img:'assets/p-lounge-cream.jpg' },
  { id:5, cat:'linen', en:'Summer Striped Shirt', ar:'قميص صيفي مخطط', price:750, old:null, stock:true, img:'assets/p-shirt-summer.jpg' },
  { id:6, cat:'linen', en:'Black Evening Shirt', ar:'قميص أسود أنيق', price:750, old:850, stock:true, img:'assets/p-shirt-black.jpg' },
  { id:7, cat:'jeans', en:'Wide-Leg Jeans — Ice Blue', ar:'جينز وايد ليج — أزرق ثلجي', price:900, old:null, stock:true, img:'assets/p-jeans-ice.jpg' },
  { id:8, cat:'jeans', en:'Wide-Leg Jeans — Raw', ar:'جينز وايد ليج — خام', price:900, old:null, stock:true, img:'assets/p-jeans-raw.jpg' },
  { id:9, cat:'tank', en:'Heavyweight Tank — White', ar:'تانك توب تقيل — أبيض', price:400, old:null, stock:true, img:'assets/p-tank-white.jpg' },
  { id:10, cat:'tank', en:'Heavyweight Tank — Black', ar:'تانك توب تقيل — أسود', price:400, old:null, stock:true, img:'assets/p-tank-black.jpg' },
  { id:11, cat:'knit', en:'Two-Tone Knitted Polo', ar:'بولو نيت تو-تون', price:750, old:null, stock:true, img:'assets/p-polo-duo.jpg' },
  { id:12, cat:'tailored', en:'Tailored Pants — Beige', ar:'بنطلون كلاسيك — بيج', price:850, old:null, stock:true, img:'assets/p-pants-beige.jpg' },
];

// ---- Store overrides (controlled from admin.html, stored in this browser) ----
const STORE_KEY='varnoto_store_v1';
function getStore(){ try{ return JSON.parse(localStorage.getItem(STORE_KEY))||{}; }catch(e){ return {}; } }
(function(){
  applyStoreProducts(getStore());
})();
function applyStoreProducts(s){
  s=s||getStore();
  if(Array.isArray(s.products)&&s.products.length){
    const byId={}; s.products.forEach(o=>{ if(o&&o.id!=null) byId[String(o.id)]=o; });
    PRODUCTS.forEach(p=>{
      const o=byId[String(p.id)]; if(!o) return;
      if(o.en) p.en=o.en; if(o.ar) p.ar=o.ar; if(o.cat) p.cat=o.cat;
      if(o.price!==undefined&&o.price!==''&&o.price!==null) p.price=Number(o.price);
      p.old=(o.old===undefined||o.old===''||o.old===null)?null:Number(o.old);
      if(o.stock!==undefined) p.stock=!!o.stock;
      if(o.qty!==undefined&&o.qty!==''&&o.qty!==null) p.qty=Number(o.qty);
      if(o.weight!==undefined) p.weight=o.weight;
      if(o.desc_en!==undefined) p.desc_en=o.desc_en;
      if(o.desc_ar!==undefined) p.desc_ar=o.desc_ar;
      if(o.seo_title!==undefined) p.seo_title=o.seo_title;
      if(o.seo_desc!==undefined) p.seo_desc=o.seo_desc;
      if(o.img) p.img=o.img;
      if(Array.isArray(o.imgs)&&o.imgs.length) p.imgs=o.imgs.filter(Boolean);
    });
    const known=new Set(PRODUCTS.map(p=>String(p.id)));
    s.products.forEach(o=>{
      if(!o||o.id==null||known.has(String(o.id))) return;
      const np=Object.assign({cat:'tshirt',en:'New product',ar:'منتج جديد',price:100,old:null,stock:true,qty:10,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',img:'',imgs:[]},o);
      np.imgs=(Array.isArray(np.imgs)&&np.imgs.length?np.imgs:(np.img?[np.img]:[])).filter(Boolean);
      if(!np.img&&np.imgs.length) np.img=np.imgs[0];
      PRODUCTS.push(np);
    });
  }
  PRODUCTS.forEach(p=>{
    if(p.qty==null||p.qty==='') p.qty=(p.stock===false)?0:20;
    if(p.weight==null) p.weight='';
    if(!p.desc_en) p.desc_en=''; if(!p.desc_ar) p.desc_ar='';
    if(!p.seo_title) p.seo_title=''; if(!p.seo_desc) p.seo_desc='';
    if(!Array.isArray(p.imgs)||!p.imgs.length) p.imgs=p.img?[p.img]:[];
    if(!p.img&&p.imgs.length) p.img=p.imgs[0];
  });
}

let cart = JSON.parse(localStorage.getItem('varnoto_cart') || '[]');
let filter = 'all', query = '';

function t(en, ar){ return LANG === 'ar' ? ar : en; }

function getSections(){
  const s=getStore();
  if(Array.isArray(s.sections)&&s.sections.length)
    return s.sections.filter(x=>x&&x.visible!==false).map(x=>({id:String(x.id),en:x.en||x.id,ar:x.ar||x.en||x.id,sub_en:x.sub_en||'',sub_ar:x.ar_sub||x.sub_ar||'',img:x.img||''}));
  return COLLECTIONS.map(x=>({id:String(x.id),en:x.en,ar:x.ar,sub_en:x.en_sub,sub_ar:x.ar_sub,img:x.img}));
}
function renderFilters(){
  const secs=getSections().filter(s=>PRODUCTS.some(p=>String(p.cat)===String(s.id)));
  const box=$('#filters'); if(!box) return;
  box.innerHTML=`<button class="chip${filter==='all'?' active':''}" data-f="all">${t('All','الكل')}</button>`+
    secs.map(s=>`<button class="chip${String(filter)===String(s.id)?' active':''}" data-f="${s.id}">${t(s.en,s.ar)}</button>`).join('');
  box.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{filter=c.dataset.f;renderFilters();renderProducts();});
}
function renderCollections(){
  const box=$('#collectionsGrid'); if(!box) return;
  box.innerHTML = getSections().map(x=>`
    <div class="card" onclick="setFilter('${x.id}')">
      <div class="thumb" onclick="setFilter('${x.id}')">
        ${x.img?`<img src="${x.img}" alt="${x.en}" loading="lazy">`:`<div style="height:230px;background:#ece7de"></div>`}
        <span class="thumb-label">${t(x.en,x.ar)}</span>
      </div>
      <div class="p-body"><b>${t(x.en,x.ar)}</b><span class="tiny">${t(x.sub_en,x.sub_ar)}</span></div>
    </div>`).join('');
}

function renderProducts(){
  const box=$('#productsGrid'); if(!box) return;
  const list = PRODUCTS.filter(p =>
    (filter==='all' || String(p.cat)===String(filter)) &&
    (!query || (p.en+p.ar).toLowerCase().includes(query.toLowerCase()))
  );
  box.innerHTML = list.length ? list.map(p=>`
    <div class="card">
      <div class="thumb" onclick="quick('${p.id}')">
        ${p.img?`<img src="${p.img}" alt="${(p.en||'').replace(/"/g,'')}" loading="lazy">`:''}
        ${!p.stock ? `<span class="badge out">${t('Sold out','نفد المخزون')}</span>` : (p.old?`<span class="badge">-${Math.round((1-p.price/p.old)*100)}%</span>`:(p.qty>0&&p.qty<=5?`<span class="badge">${t('Only '+p.qty+' left','باقي '+p.qty+' بس')}</span>`:''))}
      </div>
      <div class="p-body">
        <b onclick="quick('${p.id}')">${t(p.en,p.ar)}</b>
        <div class="price">${p.price} EGP ${p.old?`<span class="old">${p.old} EGP</span>`:''}</div>
        <div style="display:flex;gap:8px;margin-top:10px">
        <button class="add" style="margin-top:0;flex:1" ${!p.stock?'disabled':''} onclick="addToCart('${p.id}')">${!p.stock?t('Sold out','نفد'):t('Add to cart','ضيف للسلة')}</button>
        <a class="add" style="margin-top:0;text-align:center;text-decoration:none;background:#fff;color:#141414" href="product.html?id=${p.id}">${t('Details','التفاصيل')}</a>
        </div>
      </div>
    </div>`).join('') : `<p>${t('No products found.','مفيش منتجات مطابقة.')}</p>`;
}

function saveCart(){ const sc=$('#cartCount'); localStorage.setItem('varnoto_cart', JSON.stringify(cart)); renderCart(); }
function findP(id){ return PRODUCTS.find(x=>String(x.id)===String(id)); }
function addToCart(id){
  const p = findP(id); if(!p||!p.stock) return;
  const f = cart.find(x=>String(x.id)===String(id));
  if(f) f.q++; else cart.push({id:String(p.id),q:1});
  saveCart(); openCart();
}
function renderCart(){
  const cc=$('#cartCount'); if(cc) cc.textContent = cart.reduce((a,b)=>a+b.q,0);
  const box = $('#cartItems'); if(!box) return;
  if(!cart.length){ box.innerHTML = `<p class="tiny">${t('Your cart is empty.','سلتك فاضية.')}</p>`; $('#cartTotal').textContent='0 EGP'; return; }
  box.innerHTML = cart.map(r=>{
    const p = findP(r.id); if(!p) return '';
    return `<div class="cart-row"><img class="dot" src="${p.img||''}" alt="">
      <div style="flex:1"><b>${t(p.en,p.ar)}</b><span class="tiny">${p.price} EGP</span>
      <div class="qty"><button onclick="chQty('${p.id}',-1)">−</button><span>${r.q}</span><button onclick="chQty('${p.id}',1)">+</button></div></div>
      <button onclick="rmItem('${p.id}')" style="border:none;background:none;cursor:pointer">🗑</button></div>`;
  }).join('');
  const total = cart.reduce((a,r)=>{const p=findP(r.id);return a+(p?p.price*r.q:0);},0);
  $('#cartTotal').textContent = total + ' EGP';
}
function chQty(id,d){ const r=cart.find(x=>String(x.id)===String(id)); if(!r) return; r.q+=d; if(r.q<1) cart=cart.filter(x=>String(x.id)!==String(id)); saveCart(); }
function rmItem(id){ cart=cart.filter(x=>String(x.id)!==String(id)); saveCart(); }
window.chQty=chQty; window.rmItem=rmItem; window.addToCart=addToCart;

window.quick = (id)=>{
  const p = findP(id); if(!p) return;
  const imgs=(p.imgs&&p.imgs.length?p.imgs:(p.img?[p.img]:[]));
  $('#mImg').innerHTML = (imgs[0]?`<img id="mMain" src="${imgs[0]}" alt="">`:'')+(imgs.length>1?`<div class="mthumbs">${imgs.map((u,i)=>`<img src="${u}" data-i="${i}" class="${i===0?'on':''}" alt="">`).join('')}</div>`:'');
  document.querySelectorAll('.mthumbs img').forEach(th=>th.onclick=()=>{const m=$('#mMain');if(m)m.src=th.src;document.querySelectorAll('.mthumbs img').forEach(x=>x.classList.toggle('on',x===th));});
  $('#mName').textContent = t(p.en,p.ar);
  $('#mPrice').textContent = p.price+' EGP'+(p.old?' (was '+p.old+' EGP)':'');
  const dd=LANG==='ar'?(p.desc_ar||''):(p.desc_en||'');
  $('#mDesc').textContent = dd||t('Heavyweight fabric, Egyptian made. Sizes S–XXL. 14-day exchange, COD available.','خامة تقيلة صناعة مصرية. مقاسات S–XXL. استبدال 14 يوم ودفع عند الاستلام.');
  const meta=[];
  if(p.qty!=null&&p.stock) meta.push(t('In stock: '+p.qty,'متاح: '+p.qty+' قطعة'));
  if(p.weight) meta.push(t('Weight: '+p.weight,'الوزن: '+p.weight));
  const mm=$('#mMeta'); if(mm) mm.textContent=meta.join(' • ');
  $('#mAdd').onclick = ()=>{ addToCart(p.id); closeModal(); };
  $('#mAdd').disabled = !p.stock;
  $('#mAdd').textContent = !p.stock ? t('Sold out','نفد المخزون') : t('Add to cart','ضيف للسلة');
  $('#quickModal').classList.add('show');
};
function closeModal(){ $('#quickModal').classList.remove('show'); }

// ---- Cloud backend (Supabase) — filled after project creation ----
const SUPABASE_URL='https://xgokhpdhzafuluiqdtah.supabase.co', SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnb2tocGRoemFmdWx1aXFkdGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjU0NDMsImV4cCI6MjEwNDU0MTQ0M30.2B-0GPvxh5KoXVM4jhN06hCt75LakazSC36bh637zQA';
const supaOn=()=>SUPABASE_URL&&!SUPABASE_URL.startsWith('__')&&SUPABASE_KEY&&!SUPABASE_KEY.startsWith('__');
async function pullRemote(){
  if(!supaOn()) return null;
  try{
    const r=await fetch(SUPABASE_URL+'/rest/v1/store_config?id=eq.1&select=data',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
    if(!r.ok) return null;
    const j=await r.json();
    return (j&&j[0]&&j[0].data)||null;
  }catch(e){ return null; }
}
function subscribeRealtime(){
  try{
    if(!supaOn()||!window.supabase) return;
    window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY).channel('store')
      .on('postgres_changes',{event:'*',schema:'public',table:'store_config'},p=>{
        const d=p.new&&p.new.data;
        if(!d) return;
        try{localStorage.setItem(STORE_KEY,JSON.stringify(d));}catch(e){}
        applyStoreProducts(d); setLang(LANG);
      }).subscribe();
  }catch(e){}
}
async function boot(){
  try{
    const remote=await pullRemote();
    if(remote&&(remote.products||remote.announce||remote.hero||remote.contact)){
      try{localStorage.setItem(STORE_KEY,JSON.stringify(remote));}catch(e){}
      applyStoreProducts(remote);
    }
  }catch(e){}
boot();
  subscribeRealtime();
}

function openCart(){ $('#cartDrawer').classList.add('open'); $('#overlay').classList.add('show'); }
function closeCart(){ $('#cartDrawer').classList.remove('open'); $('#overlay').classList.remove('show'); }

window.setFilter = (f)=>{
  filter=String(f);
  renderFilters(); renderProducts();
  const b=document.querySelector('#best'); if(b) b.scrollIntoView({behavior:'smooth'});
};

function setLang(l){
  LANG=l;
  document.documentElement.lang=l;
  document.documentElement.dir = l==='ar'?'rtl':'ltr';
  $('#langBtn').textContent = l==='ar'?'EN':'عربي';
  $('#announce').textContent = l==='ar'?'شحن مجاني للطلبات فوق 1999 جنيه 🚚':'Free shipping on orders over 1999 EGP 🚚';
  document.querySelectorAll('[data-en]').forEach(el=>{ el.textContent = l==='ar'?el.dataset.ar:el.dataset.en; });
  document.querySelectorAll('[data-en-ph]').forEach(el=>{ el.placeholder = l==='ar'?el.dataset.arPh:el.dataset.enPh; });
  // dashboard-controlled texts & links
  try{
    const s=getStore();
    if(s.announce&&s.announce[l]) $('#announce').textContent=s.announce[l];
    if(s.hero){
      if(s.hero['title_'+l]&&$('#heroTitle')) $('#heroTitle').textContent=s.hero['title_'+l];
      if(s.hero['sub_'+l]&&$('#heroSub')) $('#heroSub').textContent=s.hero['sub_'+l];
    }
    const wa=((s.contact&&s.contact.whatsapp)||'201000000000').replace(/\D/g,'')||'201000000000';
    window.VARNOTO_WA='https://wa.me/'+wa;
    if($('#waBtn')) $('#waBtn').href=window.VARNOTO_WA;
    if(s.contact){
      if(s.contact.instagram&&$('#igBtn')) $('#igBtn').href=s.contact.instagram;
      if(s.contact.tiktok&&$('#ttBtn')) $('#ttBtn').href=s.contact.tiktok;
    }
  }catch(e){}
  renderFilters(); renderCollections(); renderProducts(); renderCart(); applyTheme();
}

// ---- Theme / header / footer / SEO (dashboard-controlled) ----
const DEFAULT_NAV=[
 {en:'Home',ar:'الرئيسية',href:'#home'},
 {en:'Collections',ar:'المجموعات',href:'#collections'},
 {en:'Best Selling',ar:'الأكثر مبيعاً',href:'#best'},
 {en:'About',ar:'عن البراند',href:'#about'},
 {en:'Contact',ar:'تواصل معنا',href:'#contact'}
];
function absUrl(rel){ try{ const u=new URL(rel,document.baseURI); return u.href; }catch(e){ return rel; } }
function applyTheme(){
  let s={}; try{ s=getStore(); }catch(e){}
  const th=s.theme||{};
  // colors
  try{
    const c=th.colors||{}, root=document.documentElement.style;
    if(c.bg) root.setProperty('--bg',c.bg);
    if(c.ink) root.setProperty('--ink',c.ink);
    if(c.acc) root.setProperty('--acc',c.acc);
  }catch(e){}
  // headings
  const hd=th.headings||{};
  const ct=$('#colTitle'); if(ct&&(hd['col_'+LANG]||hd.col_ar||hd.col_en)) ct.textContent=hd['col_'+LANG]||(LANG==='ar'?(hd.col_ar||hd.col_en):(hd.col_en||hd.col_ar));
  const bt=$('#bestTitle'); if(bt&&(hd['best_'+LANG]||hd.best_ar||hd.best_en)) bt.textContent=hd['best_'+LANG]||(LANG==='ar'?(hd.best_ar||hd.best_en):(hd.best_en||hd.best_ar));
  // hero image
  const hb=document.querySelector('.hero-bg');
  if(hb&&(th.hero_img||(th.hero&&th.hero.img))) hb.style.backgroundImage=`linear-gradient(rgba(12,12,14,.68),rgba(12,12,14,.42) 55%,rgba(12,12,14,.72)),url('${th.hero_img||th.hero.img}')`;
  // announce + hero texts (theme wins, legacy keys fallback)
  const an=th.announce||s.announce;
  if(an&&an[LANG]){const a=$('#announce'); if(a)a.textContent=an[LANG];}
  const hr=th.hero||s.hero||{};
  if(hr['title_'+LANG]){const e=$('#heroTitle'); if(e)e.textContent=hr['title_'+LANG];}
  if(hr['sub_'+LANG]){const e=$('#heroSub'); if(e)e.textContent=hr['sub_'+LANG];}
  // show/hide blocks
  const sh=th.show||{};
  [['#collections','collections'],['#about','about'],['#contact','contact']].forEach(([sel,k])=>{
    const sec=document.querySelector(sel); if(sec) sec.style.display=(sh[k]===false)?'none':'';
  });
  // nav
  const links=(s.header&&Array.isArray(s.header.links)&&s.header.links.length?s.header.links:DEFAULT_NAV);
  const nav=$('#nav');
  if(nav) nav.innerHTML=links.map(l=>`<a href="${(l.href||'#').replace(/"/g,'')}">${LANG==='ar'?(l.ar||l.en):(l.en||l.ar)}</a>`).join('');
  // footer
  const ft=s.footer||{};
  const fa=$('#footAbout'); if(fa&&(ft['about_'+LANG]||ft.about_ar||ft.about_en)) fa.textContent=ft['about_'+LANG]||(LANG==='ar'?(ft.about_ar||ft.about_en):(ft.about_en||ft.about_ar));
  const cp=document.querySelector('footer .copy'); if(cp&&ft.note) cp.textContent=ft.note;
  // site SEO
  const seo=s.seo||{};
  if(seo.site_title) document.title=seo.site_title;
  const md=document.querySelector('meta[name="description"]');
  if(md&&seo.site_desc) md.setAttribute('content',seo.site_desc);
  const og=document.querySelector('meta[property="og:title"]'); if(og&&seo.site_title) og.setAttribute('content',seo.site_title);
  const ogd=document.querySelector('meta[property="og:description"]'); if(ogd&&seo.site_desc) ogd.setAttribute('content',seo.site_desc);
  const ogi=document.querySelector('meta[property="og:image"]'); if(ogi&&seo.og_image) ogi.setAttribute('content',absUrl(seo.og_image));
  injectItemList();
}
function injectItemList(){
  try{
    const old=document.getElementById('ld-items'); if(old) old.remove();
    if(!PRODUCTS.length) return;
    const data={ '@context':'https://schema.org', '@type':'ItemList',
      itemListElement: PRODUCTS.map((p,i)=>({ '@type':'ListItem', position:i+1,
        item:{ '@type':'Product', name:p.seo_title||p.en, image:p.img?absUrl(p.img):undefined,
          description:p.seo_desc||p.desc_en||p.en,
          brand:{'@type':'Brand',name:'VARNOTO'},
          offers:{'@type':'Offer',priceCurrency:'EGP',price:p.price,availability:p.stock?'https://schema.org/InStock':'https://schema.org/OutOfStock'} } }))};
    const sc=document.createElement('script'); sc.type='application/ld+json'; sc.id='ld-items';
    sc.textContent=JSON.stringify(data); document.head.appendChild(sc);
  }catch(e){}
}

// events
$('#langBtn').onclick = ()=> setLang(LANG==='ar'?'en':'ar');
$('#cartBtn').onclick = openCart;
$('#closeCart').onclick = closeCart;
$('#continueBtn').onclick = closeCart;
$('#overlay').onclick = closeCart;
$('#closeModal').onclick = closeModal;
$('#burger').onclick = ()=> $('#nav').classList.toggle('open');
$('#searchBtn').onclick = ()=> $('#searchBar').classList.toggle('open');
$('#searchInput').oninput = (e)=>{ query=e.target.value; renderProducts(); };
$('#checkoutBtn').onclick = async ()=>{
  if(!cart.length) return alert(t('Cart is empty','السلة فاضية'));
  const total = cart.reduce((a,r)=>{const p=findP(r.id);return a+(p?p.price*r.q:0);},0);
  const items = cart.map(r=>{const p=findP(r.id);return {id:String(r.id),name:p?p.en:'',q:r.q,price:p?p.price:0};});
  const cname=($('#custName')&&$('#custName').value||'').trim();
  const cphone=($('#custPhone')&&$('#custPhone').value||'').trim();
  let orderId=null;
  if(supaOn()){
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/rpc/place_order',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({p_name:cname||null,p_phone:cphone||null,p_items:items,p_total:total})});
      if(r.ok){const j=await r.json(); orderId=(typeof j==='number')?j:(j&&j[0]);}
    }catch(e){}
  }
  let txt=(LANG==='ar'?'طلب جديد VARNOTO:':'New VARNOTO order:')+'\n'+items.map(i=>`${i.name} x${i.q}`).join('\n')+`\nTotal: ${total} EGP`;
  if(orderId) txt+='\nOrder #'+orderId;
  if(cname) txt+='\nName: '+cname;
  if(cphone) txt+='\nPhone: '+cphone;
  window.open((window.VARNOTO_WA||'https://wa.me/201000000000')+'?text='+encodeURIComponent(txt),'_blank');
  if(orderId){ cart=[]; saveCart(); closeCart(); alert(t('Order #'+orderId+' received! We will call you to confirm.','طلبك #'+orderId+' وصل! هنتصل بيك للتأكيد.')); }
};
$('#newsForm').onsubmit = (e)=>{ e.preventDefault(); $('#newsMsg').textContent = t('Thanks! Check your email for 10% off.','شكراً! تابع إيميلك لخصم 10%.'); e.target.reset(); };

setLang('ar');
