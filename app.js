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

let cart = JSON.parse(localStorage.getItem('varnoto_cart') || '[]');
let filter = 'all', query = '';

function t(en, ar){ return LANG === 'ar' ? ar : en; }

function renderCollections(){
  $('#collectionsGrid').innerHTML = COLLECTIONS.map(x=>`
    <div class="card" onclick="setFilter('${x.id}')">
      <div class="thumb" onclick="setFilter('${x.id}')">
        <img src="${x.img}" alt="${x.en}" loading="lazy">
        <span class="thumb-label">${t(x.en,x.ar)}</span>
      </div>
      <div class="p-body"><b>${t(x.en,x.ar)}</b><span class="tiny">${t(x.en_sub,x.ar_sub)}</span></div>
    </div>`).join('');
}

function renderProducts(){
  const list = PRODUCTS.filter(p =>
    (filter==='all' || p.cat===filter) &&
    (!query || (p.en+p.ar).toLowerCase().includes(query.toLowerCase()))
  );
  $('#productsGrid').innerHTML = list.length ? list.map(p=>`
    <div class="card">
      <div class="thumb" onclick="quick(${p.id})">
        <img src="${p.img}" alt="${p.en}" loading="lazy">
        ${!p.stock ? `<span class="badge out">${t('Sold out','نفد المخزون')}</span>` : (p.old?`<span class="badge">-${Math.round((1-p.price/p.old)*100)}%</span>`:'')}
      </div>
      <div class="p-body">
        <b onclick="quick(${p.id})">${t(p.en,p.ar)}</b>
        <div class="price">${p.price} EGP ${p.old?`<span class="old">${p.old} EGP</span>`:''}</div>
        <button class="add" ${!p.stock?'disabled':''} onclick="addToCart(${p.id})">${!p.stock?t('Sold out','نفد'):t('Add to cart','ضيف للسلة')}</button>
      </div>
    </div>`).join('') : `<p>${t('No products found.','مفيش منتجات مطابقة.')}</p>`;
}

function saveCart(){ localStorage.setItem('varnoto_cart', JSON.stringify(cart)); renderCart(); }
function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id); if(!p||!p.stock) return;
  const f = cart.find(x=>x.id===id);
  if(f) f.q++; else cart.push({id,q:1});
  saveCart(); openCart();
}
function renderCart(){
  $('#cartCount').textContent = cart.reduce((a,b)=>a+b.q,0);
  const box = $('#cartItems');
  if(!cart.length){ box.innerHTML = `<p class="tiny">${t('Your cart is empty.','سلتك فاضية.')}</p>`; $('#cartTotal').textContent='0 EGP'; return; }
  box.innerHTML = cart.map(r=>{
    const p = PRODUCTS.find(x=>x.id===r.id);
    return `<div class="cart-row"><img class="dot" src="${p.img}" alt="">
      <div style="flex:1"><b>${t(p.en,p.ar)}</b><span class="tiny">${p.price} EGP</span>
      <div class="qty"><button onclick="chQty(${p.id},-1)">−</button><span>${r.q}</span><button onclick="chQty(${p.id},1)">+</button></div></div>
      <button onclick="rmItem(${p.id})" style="border:none;background:none;cursor:pointer">🗑</button></div>`;
  }).join('');
  const total = cart.reduce((a,r)=>a+PRODUCTS.find(x=>x.id===r.id).price*r.q,0);
  $('#cartTotal').textContent = total + ' EGP';
}
function chQty(id,d){ const r=cart.find(x=>x.id===id); if(!r) return; r.q+=d; if(r.q<1) cart=cart.filter(x=>x.id!==id); saveCart(); }
function rmItem(id){ cart=cart.filter(x=>x.id!==id); saveCart(); }
window.chQty=chQty; window.rmItem=rmItem; window.addToCart=addToCart;

window.quick = (id)=>{
  const p = PRODUCTS.find(x=>x.id===id);
  $('#mImg').innerHTML = `<img src="${p.img}" alt="${p.en}">`;
  $('#mName').textContent = t(p.en,p.ar);
  $('#mPrice').textContent = p.price+' EGP'+(p.old?' (was '+p.old+' EGP)':'');
  $('#mDesc').textContent = t('Heavyweight fabric, Egyptian made. Sizes S–XXL. 14-day exchange, COD available.','خامة تقيلة صناعة مصرية. مقاسات S–XXL. استبدال 14 يوم ودفع عند الاستلام.');
  $('#mAdd').onclick = ()=>{ addToCart(id); closeModal(); };
  $('#mAdd').disabled = !p.stock;
  $('#mAdd').textContent = !p.stock ? t('Sold out','نفد المخزون') : t('Add to cart','ضيف للسلة');
  $('#quickModal').classList.add('show');
};
function closeModal(){ $('#quickModal').classList.remove('show'); }

function openCart(){ $('#cartDrawer').classList.add('open'); $('#overlay').classList.add('show'); }
function closeCart(){ $('#cartDrawer').classList.remove('open'); $('#overlay').classList.remove('show'); }

window.setFilter = (f)=>{
  filter=f;
  document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active',c.dataset.f===f));
  renderProducts();
  document.querySelector('#best').scrollIntoView({behavior:'smooth'});
};

function setLang(l){
  LANG=l;
  document.documentElement.lang=l;
  document.documentElement.dir = l==='ar'?'rtl':'ltr';
  $('#langBtn').textContent = l==='ar'?'EN':'عربي';
  $('#announce').textContent = l==='ar'?'شحن مجاني للطلبات فوق 1999 جنيه 🚚':'Free shipping on orders over 1999 EGP 🚚';
  document.querySelectorAll('[data-en]').forEach(el=>{ el.textContent = l==='ar'?el.dataset.ar:el.dataset.en; });
  document.querySelectorAll('[data-en-ph]').forEach(el=>{ el.placeholder = l==='ar'?el.dataset.arPh:el.dataset.enPh; });
  renderCollections(); renderProducts(); renderCart();
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
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{filter=c.dataset.f;document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x===c));renderProducts();});
$('#checkoutBtn').onclick = ()=>{
  if(!cart.length) return alert(t('Cart is empty','السلة فاضية'));
  const total = cart.reduce((a,r)=>a+PRODUCTS.find(x=>x.id===r.id).price*r.q,0);
  const msg = encodeURIComponent((LANG==='ar'?'طلب جديد VARNOTO:%0A':'New VARNOTO order:%0A')+cart.map(r=>{const p=PRODUCTS.find(x=>x.id===r.id);return `${p.en} x${r.q}`}).join('%0A')+`%0ATotal: ${total} EGP`);
  window.open('https://wa.me/201000000000?text='+msg,'_blank');
};
$('#newsForm').onsubmit = (e)=>{ e.preventDefault(); $('#newsMsg').textContent = t('Thanks! Check your email for 10% off.','شكراً! تابع إيميلك لخصم 10%.'); e.target.reset(); };

setLang('ar');
