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
      if(o.cost!==undefined&&o.cost!==''&&o.cost!==null) p.cost=Number(o.cost);
      if(o.weight!==undefined) p.weight=o.weight;
      if(o.desc_en!==undefined) p.desc_en=o.desc_en;
      if(o.desc_ar!==undefined) p.desc_ar=o.desc_ar;
      if(o.seo_title!==undefined) p.seo_title=o.seo_title;
      if(o.seo_desc!==undefined) p.seo_desc=o.seo_desc;
      if(o.sale_from!==undefined) p.sale_from=o.sale_from;
      if(o.sale_to!==undefined) p.sale_to=o.sale_to;
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
  // scheduled sales: discount counts only inside its window
  try{
    const now=Date.now();
    PRODUCTS.forEach(p=>{
      if(!p.old) return;
      const f=p.sale_from?new Date(p.sale_from).getTime():null, e=p.sale_to?new Date(p.sale_to).getTime():null;
      if((f&&now<f)||(e&&now>e)) p.old=null;
    });
  }catch(e){}
}

let cart = JSON.parse(localStorage.getItem('varnoto_cart') || '[]');
let filter = 'all', query = '', SORT='new', SALEONLY=false, COUPON=null;
let ZONES=[{id:'cairo',name_ar:'القاهرة والجيزة',name_en:'Cairo & Giza',fee:60,days:'2-4',free_over:1999,active:true},{id:'alex',name_ar:'إسكندرية والدلتا',name_en:'Alexandria & Delta',fee:70,days:'3-5',free_over:1999,active:true},{id:'upper',name_ar:'الصعيد والسواحل وسيناء',name_en:'Upper Egypt & Coasts & Sinai',fee:80,days:'4-6',free_over:1999,active:true}];
let ZONE='cairo', PAY='cod';
let WISH=[]; try{WISH=JSON.parse(localStorage.getItem('varnoto_wish')||'[]');}catch(e){WISH=[];}
async function loadZones(){
  if(!supaOn()){renderZonePay();return;}
  try{
    const r=await fetch(SUPABASE_URL+'/rest/v1/shipping_zones?select=*&order=id',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
    const j=await r.json(); if(Array.isArray(j)&&j.length){ZONES=j; if(!ZONES.some(z=>z.id===ZONE)) ZONE=ZONES[0].id;}
  }catch(e){}
  renderZonePay();
}
function zoneOf(){ return ZONES.find(z=>String(z.id)===String(ZONE))||ZONES[0]||{fee:0,free_over:1999}; }
function effSubtotal(){ const s=cartSubtotal(); return s-((COUPON&&COUPON.discount)||0); }
function shipFee(){ const z=zoneOf(); const free=z.free_over!=null?z.free_over:1999; return effSubtotal()>=free?0:(z.fee||0); }
function renderZonePay(){
  const zs=$('#zoneSel');
  if(zs){
    const act=ZONES.filter(z=>z.active!==false);
    zs.innerHTML=act.map(z=>`<option value="${z.id}">${LANG==='ar'?(z.name_ar||z.name_en):(z.name_en||z.name_ar)} — ${z.fee} EGP${(z.days?' ('+(LANG==='ar'?z.days+' أيام عمل':z.days+' days')+')':'')}</option>`).join('');
    if(!act.some(z=>String(z.id)===String(ZONE))&&act.length) ZONE=act[0].id;
    zs.value=ZONE;
  }
  const pr=$('#payRow');
  if(pr){
    let pay={}; try{pay=getStore().payment||{};}catch(e){}
    const methods=[{id:'cod',ar:'الدفع عند الاستلام',en:'Cash on delivery'}];
    if(pay.instapay&&pay.instapay.on) methods.push({id:'instapay',ar:'انستاباي'+(pay.instapay.number?' ('+pay.instapay.number+')':''),en:'InstaPay'+(pay.instapay.number?' ('+pay.instapay.number+')':'')});
    if(pay.vodafone&&pay.vodafone.on) methods.push({id:'vodafone',ar:'فودافون كاش'+(pay.vodafone.number?' ('+pay.vodafone.number+')':''),en:'Vodafone Cash'+(pay.vodafone.number?' ('+pay.vodafone.number+')':'')});
    if(pay.paymob&&pay.paymob.on&&pay.paymob.iframe) methods.push({id:'paymob',ar:'💳 دفع أونلاين بالكارت',en:'💳 Pay online by card'});
    if(!methods.some(m=>m.id===PAY)) PAY='cod';
    pr.innerHTML=methods.map(m=>`<label style="display:block;margin:5px 0;font-size:14px"><input type="radio" name="paym" value="${m.id}" ${PAY===m.id?'checked':''}> ${LANG==='ar'?m.ar:m.en}</label>`).join('');
    pr.querySelectorAll('input[name=paym]').forEach(r=>r.onchange=()=>{PAY=r.value;renderCart();});
  }
}
window.toggleWish=function(id){
  id=String(id); const i=WISH.indexOf(id);
  if(i>=0)WISH.splice(i,1); else WISH.push(id);
  try{localStorage.setItem('varnoto_wish',JSON.stringify(WISH));}catch(e){}
  renderProducts();
};
window.openSize=function(){const m=$('#sizeModal');if(m)m.classList.add('show');};
window.closeSize=function(){const m=$('#sizeModal');if(m)m.classList.remove('show');};

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
    `<button class="chip${filter==='fav'?' active':''}" data-f="fav">♥ ${t('Wishlist','المفضلة')} (${WISH.length})</button>`+
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
  let list = PRODUCTS.filter(p =>
    (filter==='all' || (filter==='fav'&&WISH.includes(String(p.id))) || String(p.cat)===String(filter)) &&
    (!SALEONLY || p.old) &&
    (!query || (p.en+p.ar).toLowerCase().includes(query.toLowerCase()))
  );
  if(SORT==='price-asc') list=list.slice().sort((a,b)=>a.price-b.price);
  else if(SORT==='price-desc') list=list.slice().sort((a,b)=>b.price-a.price);
  else if(SORT==='new') list=list.slice().reverse();
  box.innerHTML = list.length ? list.map(p=>`
    <div class="card">
      <div class="thumb" onclick="quick('${p.id}')">
        <button class="wish${WISH.includes(String(p.id))?' on':''}" onclick="event.stopPropagation();toggleWish('${p.id}')" aria-label="wishlist">${WISH.includes(String(p.id))?'♥':'♡'}</button>
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

function saveCart(){ localStorage.setItem('varnoto_cart', JSON.stringify(cart)); renderCart(); persistCart(); }
let saveT=null;
function persistCart(){
  if(!supaOn()) return;
  try{clearTimeout(saveT);}catch(e){}
  saveT=setTimeout(()=>{
    let sid=''; try{sid=sessionStorage.getItem('vnt_sid')||'';}catch(e){}
    if(!sid||!cart.length){
      if(sid&&!cart.length){
        fetch(SUPABASE_URL+'/rest/v1/rpc/save_cart',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({p_session:sid,p_phone:null,p_items:[],p_total:0})}).catch(()=>{});
      }
      return;
    }
    const ph=($('#custPhone')&&$('#custPhone').value||'').replace(/\D/g,'');
    const items=cart.map(r=>{const p=findP(r.id);return {id:String(r.id),name:p?p.en:'',q:r.q,price:p?p.price:0};});
    fetch(SUPABASE_URL+'/rest/v1/rpc/save_cart',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({p_session:sid,p_phone:ph||null,p_items:items,p_total:cartSubtotal()})}).catch(()=>{});
  },1500);
}
function findP(id){ return PRODUCTS.find(x=>String(x.id)===String(id)); }
function addToCart(id){
  const p = findP(id); if(!p||!p.stock) return;
  const f = cart.find(x=>String(x.id)===String(id));
  if(f) f.q++; else cart.push({id:String(p.id),q:1});
  saveCart(); trackEv('cart_add');
  pxEvent('AddToCart',{content_ids:[String(p.id)],content_name:p.en,value:p.price,currency:'EGP'});
  openCart();
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
  const total = cartSubtotal();
  const disc=(COUPON&&COUPON.discount)||0;
  renderCartTotals(total,disc,shipFee(),taxOf(total-disc));
}
function taxOf(sub){
  let tx={}; try{tx=(getStore().tax)||{};}catch(e){}
  if(!tx.on) return 0;
  return Math.floor(sub*(tx.rate!=null?tx.rate:14)/100);
}
function renderCartTotals(total,disc,fee,tax){
  const sub=$('#cartSub'); if(sub) sub.textContent=total+' EGP';
  const dr=$('#discRow'); if(dr) dr.style.display=disc>0?'flex':'none';
  const cd=$('#cartDisc'); if(cd) cd.textContent='-'+disc+' EGP';
  const fr=$('#feeRow'); if(fr) fr.style.display=(cart.length&&fee>0)?'flex':'none';
  const cf=$('#cartFee'); if(cf) cf.textContent='+'+fee+' EGP';
  const fs=$('#freeShip'); if(fs) fs.style.display=(cart.length&&fee===0)?'block':'none';
  const tr=$('#taxRow'); if(tr) tr.style.display=(cart.length&&tax>0)?'flex':'none';
  const ct=$('#cartTax'); if(ct) ct.textContent='+'+tax+' EGP';
  $('#cartTotal').textContent = (total-disc+fee+tax) + ' EGP';
}
function cartSubtotal(){ return cart.reduce((a,r)=>{const p=findP(r.id);return a+(p?p.price*r.q:0);},0); }
async function applyCoupon(){
  const inp=$('#couponIn'), msg=$('#couponMsg');
  const code=(inp&&inp.value||'').trim();
  if(!code){ COUPON=null; renderCart(); if(msg)msg.textContent=''; return; }
  if(msg) msg.textContent=t('جاري التحقق...','Checking...');
  COUPON=null;
  if(!supaOn()){ if(msg)msg.textContent=t('الكوبونات غير مفعلة','Coupons unavailable'); renderCart(); return; }
  try{
    const r=await fetch(SUPABASE_URL+'/rest/v1/rpc/validate_coupon',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({p_code:code,p_total:cartSubtotal()})});
    const j=await r.json();
    if(j&&j.ok){ COUPON={code,discount:j.discount};
      if(msg){msg.style.color='#1c7a3d';msg.textContent=t('✅ خصم '+j.discount+' جنيه اتطبق','✅ '+j.discount+' EGP off applied');}
    }else{
      const why={not_found:t('الكود مش موجود','Code not found'),inactive:t('الكود موقوف','Code inactive'),expired:t('الكود انتهت صلاحيته','Code expired'),min_total:t('الطلب أقل من الحد الأدنى','Below minimum order'),maxed:t('الكود خلص','Code fully used')};
      if(msg){msg.style.color='#b3261e';msg.textContent='❌ '+(why[j&&j.reason]||t('كود غير صالح','Invalid code'));}
    }
  }catch(e){ if(msg)msg.textContent=t('تعذر التحقق، حاول تاني','Could not verify, try again'); }
  renderCart();
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
  pxEvent('ViewItem',{id:String(p.id),name:p.en,price:p.price});
  $('#mAdd').disabled = !p.stock;
  $('#mAdd').textContent = !p.stock ? t('Sold out','نفد المخزون') : t('Add to cart','ضيف للسلة');
  $('#quickModal').classList.add('show');
};
function closeModal(){ $('#quickModal').classList.remove('show'); }

// ---- Ad pixels (IDs from dashboard → Settings/SEO) ----
function initPixels(){
  let ig={}; try{ig=(getStore().integrations)||{};}catch(e){}
  try{
    if(ig.meta&&!window.fbq){
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init',ig.meta);fbq('track','PageView');
    }
    if(ig.tiktok&&!window.ttq){
      !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var n='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e].push('https://analytics.tiktok.com/i18n/pixel/events.js');var o=d.createElement('script');o.type='text/javascript';o.async=!0;o.src=n+'?sdkid='+e+'&lib='+t;var a=d.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a)};ttq.load(ig.tiktok);ttq.page();}(window,document,'ttq');
    }
    if(ig.ga4&&!window.gtag){
      const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ig.ga4);document.head.appendChild(s);
      window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',ig.ga4);
    }
  }catch(e){}
}
function pxEvent(name,params){
  params=params||{};
  try{if(window.fbq)fbq('track',name,params);}catch(e){}
  try{if(window.ttq)ttq.track(name,params);}catch(e){}
  try{if(window.gtag)gtag('event',name==='Purchase'?'purchase':(name==='AddToCart'?'add_to_cart':(name==='ViewItem'?'view_item':name)),params);}catch(e){}
  try{
    window.dataLayer=window.dataLayer||[];
    if(name==='AddToCart')dataLayer.push({event:'add_to_cart',ecommerce:{currency:'EGP',value:params.value||0,items:[{item_id:params.content_ids&&params.content_ids[0],item_name:params.content_name||'',price:params.value||0,quantity:1}]}});
    else if(name==='Purchase')dataLayer.push({event:'purchase',ecommerce:{currency:'EGP',value:params.value||0,transaction_id:String(params.order_id||Date.now()),items:params.items||[]}});
    else if(name==='ViewItem')dataLayer.push({event:'view_item',ecommerce:{currency:'EGP',value:params.price||0,items:[{item_id:params.id,item_name:params.name||'',price:params.price||0}]}});
    else if(name==='BeginCheckout')dataLayer.push({event:'begin_checkout',ecommerce:{currency:'EGP',value:params.value||0}});
  }catch(e){}
}
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
let promoTimer=null;
function renderPromo(){
  const el=$('#promoBar'); if(!el) return;
  let pr=null; try{ pr=(getStore().theme||{}).promo; }catch(e){}
  try{ if(promoTimer)clearInterval(promoTimer); }catch(e){}
  el.style.display='none'; el.innerHTML='';
  if(!pr||!pr.show||!pr.ends_at) return;
  const end=new Date(pr.ends_at).getTime();
  if(isNaN(end)||end<=Date.now()) return;
  el.style.display='';
  const tick=()=>{
    const ms=end-Date.now();
    if(ms<=0){el.style.display='none';try{clearInterval(promoTimer);}catch(e){}return;};
    const d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60,s=Math.floor(ms/1e3)%60;
    el.innerHTML=`<b>${pr['text_'+LANG]||pr.text_ar||pr.text_en||''}</b> <span dir="ltr">${d}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}</span>`;
  };
  tick(); promoTimer=setInterval(tick,1000);
}
function trackEv(type){
  try{
    if(!supaOn()) return;
    let sid=''; try{ sid=sessionStorage.getItem('vnt_sid')||('s'+Date.now().toString(36)+Math.floor(Math.random()*999)); sessionStorage.setItem('vnt_sid',sid); }catch(e){}
    fetch(SUPABASE_URL+'/rest/v1/events',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({type,page:location.pathname,session_id:sid})}).catch(()=>{});
  }catch(e){}
}
function pingView(){
  try{
    if(!supaOn()) return;
    if(sessionStorage.getItem('vnt_ping')) return;
    sessionStorage.setItem('vnt_ping','1');
    let sid=''; try{ sid=sessionStorage.getItem('vnt_sid')||('s'+Date.now().toString(36)+Math.floor(Math.random()*999)); sessionStorage.setItem('vnt_sid',sid); }catch(e){}
    fetch(SUPABASE_URL+'/rest/v1/events',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({type:'view',page:location.pathname,session_id:sid})}).catch(()=>{});
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
  pingView();
  loadZones();
  setLang('ar');
  initPixels();
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
  renderFilters(); renderCollections(); renderProducts(); renderCart(); renderZonePay(); applyTheme(); renderPromo();
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
  // Google Search Console verification (paste code from dashboard → SEO)
  try{
    let gv=document.querySelector('meta[name="google-site-verification"]');
    if(seo.google_verification){
      if(!gv){gv=document.createElement('meta');gv.name='google-site-verification';document.head.appendChild(gv);}
      gv.setAttribute('content',seo.google_verification);
    }
  }catch(e){}
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
if($('#couponBtn')) $('#couponBtn').onclick=applyCoupon;
if($('#sortSel')) $('#sortSel').onchange=(e)=>{ SORT=e.target.value; renderProducts(); };
if($('#saleOnly')) $('#saleOnly').onchange=(e)=>{ SALEONLY=e.target.checked; renderProducts(); };
$('#checkoutBtn').onclick = async ()=>{
  if(!cart.length) return alert(t('Cart is empty','السلة فاضية'));
  trackEv('begin_checkout');
  const total = cartSubtotal();
  const items = cart.map(r=>{const p=findP(r.id);return {id:String(r.id),name:p?p.en:'',q:r.q,price:p?p.price:0};});
  const cname=($('#custName')&&$('#custName').value||'').trim();
  const cphone=($('#custPhone')&&$('#custPhone').value||'').trim();
  const useLoy=$('#loyUse')&&$('#loyUse').checked;
  pxEvent('BeginCheckout',{value:total,currency:'EGP'});
  let orderId=null, finalTotal=total, disc=0, fee=0, tax=0, ld=0;
  if(supaOn()){
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/rpc/place_order',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({p_name:cname||null,p_phone:cphone||null,p_items:items,p_total:total,p_coupon:(COUPON&&COUPON.code)||null,p_zone:ZONE,p_pay:PAY,p_use_loyalty:!!useLoy})});
      if(r.ok){const j=await r.json(); orderId=(j&&(typeof j==='number'?j:j.order_id))||null; disc=(j&&j.discount)||0; fee=(j&&j.ship_fee!=null)?j.ship_fee:shipFee(); tax=(j&&j.tax)||0; ld=(j&&j.loy_disc)||0; finalTotal=(j&&j.total!=null)?j.total:(total-disc+fee+tax-ld);}
    }catch(e){ const f0=shipFee(); fee=f0; const t0=taxOf(total-disc); tax=t0; finalTotal=total-disc+f0+t0; }
  } else { fee=shipFee(); tax=taxOf(total-disc); finalTotal=total-disc+fee+tax; }
  const payName=PAY==='cod'?(LANG==='ar'?'الدفع عند الاستلام':'Cash on delivery'):(PAY==='instapay'?(LANG==='ar'?'انستاباي':'InstaPay'):(PAY==='vodafone'?(LANG==='ar'?'فودافون كاش':'Vodafone Cash'):(LANG==='ar'?'أونلاين':'Online')));
  let txt=(LANG==='ar'?'طلب جديد VARNOTO:':'New VARNOTO order:')+'\n'+items.map(i=>`${i.name} x${i.q}`).join('\n')+`\nSubtotal: ${total} EGP`;
  if(disc>0) txt+=`\nDiscount (${(COUPON&&COUPON.code)||''}): -${disc} EGP`;
  txt+=`\nShipping (${zoneOf().name_ar||zoneOf().name_en||''}): ${fee===0?(LANG==='ar'?'مجاني':'FREE'):fee+' EGP'}`;
  if(tax>0) txt+=`\nTax: +${tax} EGP`;
  if(ld>0) txt+=`\nLoyalty: -${ld} EGP`;
  txt+=`\nTotal: ${finalTotal} EGP`;txt+=`\nPay: ${payName}`;
  if(orderId) txt+='\nOrder #'+orderId;
  if(cname) txt+='\nName: '+cname;
  if(cphone) txt+='\nPhone: '+cphone;
  window.open((window.VARNOTO_WA||'https://wa.me/201000000000')+'?text='+encodeURIComponent(txt),'_blank');
  if(orderId){ cart=[]; COUPON=null; const ci=$('#couponIn'); if(ci)ci.value=''; saveCart(); closeCart(); refreshLoyalty(); pxEvent('Purchase',{value:finalTotal,currency:'EGP',order_id:orderId,items:items.map(i=>({item_id:i.id,item_name:i.name,price:i.price,quantity:i.q}))}); alert(t('Order #'+orderId+' received! We will call you to confirm.','طلبك #'+orderId+' وصل! هنتصل بيك للتأكيد.')); }
  if(orderId&&PAY==='paymob'){ payOnline(orderId,finalTotal); }
};
async function payOnline(orderId,amount){
  let pay={}; try{pay=(getStore().payment||{}).paymob||{};}catch(e){}
  if(!pay.on||!pay.iframe_id){alert(t('الدفع الأونلاين غير مفعل بعد','Online payment is not enabled yet'));return;}
  try{
    const r=await fetch(SUPABASE_URL+'/functions/v1/paymob-intent',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({order_id:orderId,amount_cents:Math.round(amount*100)})});
    const j=await r.json();
    if(j&&j.iframe_url){window.open(j.iframe_url,'_blank');}
    else alert(t('تعذر بدء الدفع','Could not start payment'));
  }catch(e){alert(t('تعذر بدء الدفع','Could not start payment'));}
}
async function refreshLoyalty(){
  const box=$('#loyBox'); if(!box) return; box.style.display='none';
  let on=false; try{on=!!((getStore().loyalty||{}).on);}catch(e){}
  if(!on||!supaOn()) return;
  const ph=($('#custPhone')&&$('#custPhone').value||'').replace(/\D/g,'');
  if(ph.length<8) return;
  try{
    const r=await fetch(SUPABASE_URL+'/rest/v1/rpc/loyalty_balance',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({p_phone:ph})});
    const pts=await r.json();
    if(pts>0){box.style.display='';$('#loyPts').textContent=pts;
      const cfg=(getStore().loyalty||{});const val=cfg.value!=null?cfg.value:1, min=cfg.min!=null?cfg.min:50;
      $('#loyHint').textContent=t('نقاطك = '+(pts*val)+' جنيه خصم (الأدنى '+min+')','Your points = '+(pts*val)+' EGP off (min '+min+')');}
  }catch(e){}
}
$('#newsForm').onsubmit = async (e)=>{
  e.preventDefault();
  const em=$('#newsEmail').value.trim();
  if(supaOn()&&em){
    try{await fetch(SUPABASE_URL+'/rest/v1/subscribers',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({email:em,source:'site'})});}catch(err){}
  }
  $('#newsMsg').textContent = t('Thanks! Check your email for 10% off.','شكراً! تابع إيميلك لخصم 10%.'); e.target.reset();
};

setLang('ar');
