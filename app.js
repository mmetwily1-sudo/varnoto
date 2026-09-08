// VELMORA — original demo store inspired by galvanoegy.com (no copied assets/text)
let LANG = 'ar';
const $ = (s) => document.querySelector(s);

const COLLECTIONS = [
  { id:'tshirt', en:'T-shirts', ar:'تيشيرتات', c:'linear-gradient(135deg,#222,#555)', en_sub:'heavyweight', ar_sub:'قطن تقيل' },
  { id:'linen', en:'Linen Shirts', ar:'قمصان لينن', c:'linear-gradient(135deg,#b99c5e,#e8d9b0)', en_sub:'breathable', ar_sub:'خامة تتنفس' },
  { id:'jeans', en:'Wide-Leg Jeans', ar:'جينز وايد ليج', c:'linear-gradient(135deg,#1e3a5f,#4a7ab5)', en_sub:'denim', ar_sub:'دنيم' },
  { id:'sweat', en:'Sweatpants', ar:'سويت بانتس', c:'linear-gradient(135deg,#3a3a3a,#8a8a8a)', en_sub:'fleece', ar_sub:'ميلتون' },
  { id:'tailored', en:'Tailored Pants', ar:'بناطيل كلاسيك', c:'linear-gradient(135deg,#111,#444)', en_sub:'smart', ar_sub:'شيك' },
  { id:'knit', en:'Knitted Polos', ar:'بولو نيت', c:'linear-gradient(135deg,#5b3a29,#b98a5e)', en_sub:'knit', ar_sub:'تريكو' },
  { id:'tank', en:'Tank Tops', ar:'تانك توب', c:'linear-gradient(135deg,#0f0f0f,#5a5a5a)', en_sub:'gym', ar_sub:'جيم' },
  { id:'regular', en:'Regular Fit', ar:'ريجولر فيت', c:'linear-gradient(135deg,#274156,#7fb5a8)', en_sub:'daily', ar_sub:'يومي' },
];

const PRODUCTS = [
  { id:1, cat:'tshirt', en:'Essential White Tee', ar:'تيشيرت أبيض أساسي', price:350, old:null, stock:true, c:'linear-gradient(135deg,#eee,#bbb)' },
  { id:2, cat:'tshirt', en:'Essential Black Tee', ar:'تيشيرت أسود أساسي', price:350, old:450, stock:true, c:'linear-gradient(135deg,#222,#000)' },
  { id:3, cat:'sweat', en:'Wide-Leg Black Sweatpants', ar:'سويت بانتس أسود وايد ليج', price:700, old:null, stock:false, c:'linear-gradient(135deg,#333,#111)' },
  { id:4, cat:'sweat', en:'Wide-Leg Grey Sweatpants', ar:'سويت بانتس رمادي وايد ليج', price:700, old:null, stock:true, c:'linear-gradient(135deg,#999,#555)' },
  { id:5, cat:'linen', en:'Relaxed Linen Shirt — White', ar:'قميص لينن أوفرسايز — أبيض', price:750, old:null, stock:true, c:'linear-gradient(135deg,#f5efe0,#cbb98a)' },
  { id:6, cat:'linen', en:'Relaxed Linen Shirt — Black', ar:'قميص لينن أوفرسايز — أسود', price:750, old:850, stock:true, c:'linear-gradient(135deg,#444,#111)' },
  { id:7, cat:'jeans', en:'Wide-Leg Jeans — Ice Blue', ar:'جينز وايد ليج — أزرق ثلجي', price:900, old:null, stock:true, c:'linear-gradient(135deg,#9fc3e8,#3d6a99)' },
  { id:8, cat:'jeans', en:'Wide-Leg Jeans — Raw', ar:'جينز وايد ليج — خام', price:900, old:null, stock:false, c:'linear-gradient(135deg,#2c3e50,#5d6d7e)' },
  { id:9, cat:'tank', en:'Heavyweight Tank — White', ar:'تانك توب تقيل — أبيض', price:400, old:null, stock:true, c:'linear-gradient(135deg,#fff,#ccc)' },
  { id:10, cat:'tank', en:'Heavyweight Tank — Black', ar:'تانك توب تقيل — أسود', price:400, old:null, stock:true, c:'linear-gradient(135deg,#222,#555)' },
  { id:11, cat:'knit', en:'Knitted Polo — Beige', ar:'بولو نيت — بيج', price:750, old:null, stock:true, c:'linear-gradient(135deg,#d9c7a7,#8a6d3f)' },
  { id:12, cat:'tailored', en:'Tailored Linen Pants', ar:'بنطلون لينن كلاسيك', price:850, old:null, stock:true, c:'linear-gradient(135deg,#4a4a4a,#999)' },
];

let cart = JSON.parse(localStorage.getItem('velmora_cart') || '[]');
let filter = 'all', query = '';

function t(en, ar){ return LANG === 'ar' ? ar : en; }

function renderCollections(){
  $('#collectionsGrid').innerHTML = COLLECTIONS.map(x=>`
    <div class="card" onclick="setFilter('${x.id}')">
      <div class="thumb" style="background:${x.c}">${t(x.en,x.ar)}</div>
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
      <div class="thumb" style="background:${p.c}" onclick="quick(${p.id})">
        ${!p.stock ? `<span class="badge out">${t('Sold out','نفد المخزون')}</span>` : (p.old?`<span class="badge">-${Math.round((1-p.price/p.old)*100)}%</span>`:'')}
      </div>
      <div class="p-body">
        <b onclick="quick(${p.id})">${t(p.en,p.ar)}</b>
        <div class="price">${p.price} EGP ${p.old?`<span class="old">${p.old} EGP</span>`:''}</div>
        <button class="add" ${!p.stock?'disabled':''} onclick="addToCart(${p.id})">${!p.stock?t('Sold out','نفد'):t('Add to cart','ضيف للسلة')}</button>
      </div>
    </div>`).join('') : `<p>${t('No products found.','مفيش منتجات مطابقة.')}</p>`;
}

function saveCart(){ localStorage.setItem('velmora_cart', JSON.stringify(cart)); renderCart(); }
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
    return `<div class="cart-row"><div class="dot" style="background:${p.c}"></div>
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
  $('#mImg').style.background = p.c;
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
  const msg = encodeURIComponent((LANG==='ar'?'طلب جديد VELMORA:%0A':'New VELMORA order:%0A')+cart.map(r=>{const p=PRODUCTS.find(x=>x.id===r.id);return `${p.en} x${r.q}`}).join('%0A')+`%0ATotal: ${total} EGP`);
  window.open('https://wa.me/201000000000?text='+msg,'_blank');
};
$('#newsForm').onsubmit = (e)=>{ e.preventDefault(); $('#newsMsg').textContent = t('Thanks! Check your email for 10% off.','شكراً! تابع إيميلك لخصم 10%.'); e.target.reset(); };

setLang('ar');
