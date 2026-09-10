
const KEY='varnoto_store_v1', EMERGENCY_PIN='2026', ADMIN_BUILD='20260910c';
function selfTest(){
 try{
  const tabs=document.querySelectorAll('.tab').length;
  const panels=document.querySelectorAll('.panel').length;
  const rows=document.querySelectorAll('#prodRows tr').length;
  const tag=document.getElementById('buildTag');
  if(tag) tag.textContent='build '+ADMIN_BUILD+' • tabs:'+tabs+' • panels:'+panels+' • products:'+rows;
 }catch(e){}
}
try{
 if(/(?:\?|&)reset=1(?:&|$)/.test(location.search)){
  try{localStorage.removeItem(KEY);}catch(e){}
  location.replace(location.pathname);
 }
}catch(e){}
const DEFAULT_NAV=[{en:'Home',ar:'الرئيسية',href:'#home'},{en:'Collections',ar:'المجموعات',href:'#collections'},{en:'Best Selling',ar:'الأكثر مبيعاً',href:'#best'},{en:'About',ar:'عن البراند',href:'#about'},{en:'Contact',ar:'تواصل معنا',href:'#contact'}];
const DEFAULT_SECS=[
 {id:'tshirt',en:'T-shirts',ar:'تيشيرتات',sub_en:'heavyweight',sub_ar:'قطن تقيل',img:'assets/p-tee-white.jpg',visible:true},
 {id:'linen',en:'Linen Shirts',ar:'قمصان لينن',sub_en:'breathable',sub_ar:'خامة تتنفس',img:'assets/p-shirt-summer.jpg',visible:true},
 {id:'jeans',en:'Wide-Leg Jeans',ar:'جينز وايد ليج',sub_en:'denim',sub_ar:'دنيم',img:'assets/p-jeans-ice.jpg',visible:true},
 {id:'sweat',en:'Sweat & Lounge',ar:'سويت ولاونج',sub_en:'fleece',sub_ar:'ميلتون',img:'assets/p-lounge-cream.jpg',visible:true},
 {id:'tailored',en:'Tailored Pants',ar:'بناطيل كلاسيك',sub_en:'smart',sub_ar:'شيك',img:'assets/p-pants-beige.jpg',visible:true},
 {id:'knit',en:'Knitted Polos',ar:'بولو نيت',sub_en:'knit',sub_ar:'تريكو',img:'assets/p-polo-duo.jpg',visible:true},
 {id:'tank',en:'Tank Tops',ar:'تانك توب',sub_en:'gym',sub_ar:'جيم',img:'assets/p-tank-white.jpg',visible:true},
 {id:'regular',en:'Essential Tees',ar:'أساسيات',sub_en:'daily',sub_ar:'يومي',img:'assets/p-tee-black.jpg',visible:true}
];
const DEFAULTS=[
 {id:1,cat:'tshirt',en:'Essential White Tee',ar:'تيشيرت أبيض أساسي',price:350,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-tee-white.jpg']},
 {id:2,cat:'tshirt',en:'Essential Black Tee',ar:'تيشيرت أسود أساسي',price:350,old:450,stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-tee-black.jpg']},
 {id:3,cat:'sweat',en:'Oversized Grey Sweatshirt',ar:'سويت شيرت رمادي أوفرسايز',price:600,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-sweatshirt-grey.jpg']},
 {id:4,cat:'sweat',en:'Lounge Set — Cream',ar:'طقم لاونج — كريمي',price:700,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-lounge-cream.jpg']},
 {id:5,cat:'linen',en:'Summer Striped Shirt',ar:'قميص صيفي مخطط',price:750,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-shirt-summer.jpg']},
 {id:6,cat:'linen',en:'Black Evening Shirt',ar:'قميص أسود أنيق',price:750,old:850,stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-shirt-black.jpg']},
 {id:7,cat:'jeans',en:'Wide-Leg Jeans — Ice Blue',ar:'جينز وايد ليج — أزرق ثلجي',price:900,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-jeans-ice.jpg']},
 {id:8,cat:'jeans',en:'Wide-Leg Jeans — Raw',ar:'جينز وايد ليج — خام',price:900,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-jeans-raw.jpg']},
 {id:9,cat:'tank',en:'Heavyweight Tank — White',ar:'تانك توب تقيل — أبيض',price:400,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-tank-white.jpg']},
 {id:10,cat:'tank',en:'Heavyweight Tank — Black',ar:'تانك توب تقيل — أسود',price:400,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-tank-black.jpg']},
 {id:11,cat:'knit',en:'Two-Tone Knitted Polo',ar:'بولو نيت تو-تون',price:750,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-polo-duo.jpg']},
 {id:12,cat:'tailored',en:'Tailored Pants — Beige',ar:'بنطلون كلاسيك — بيج',price:850,old:'',stock:true,qty:20,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:['assets/p-pants-beige.jpg']}
];
const ASSETS=['assets/hero.jpg','assets/p-tee-white.jpg','assets/p-tee-black.jpg','assets/p-sweatshirt-grey.jpg','assets/p-lounge-cream.jpg','assets/p-shirt-summer.jpg','assets/p-shirt-black.jpg','assets/p-jeans-ice.jpg','assets/p-jeans-raw.jpg','assets/p-tank-white.jpg','assets/p-tank-black.jpg','assets/p-polo-duo.jpg','assets/p-pants-beige.jpg'];
const $=s=>document.querySelector(s);
const SUPA_URL='https://xgokhpdhzafuluiqdtah.supabase.co', SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnb2tocGRoemFmdWx1aXFkdGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjU0NDMsImV4cCI6MjEwNDU0MTQ0M30.2B-0GPvxh5KoXVM4jhN06hCt75LakazSC36bh637zQA';
const supaOn=()=>SUPA_URL&&!SUPA_URL.startsWith('__');
let SB=null, LOCAL_MODE=false, EDIT_ID=null;
function sb(){ if(!SB&&window.supabase&&supaOn()) SB=window.supabase.createClient(SUPA_URL,SUPA_KEY); return SB; }
async function H(){ try{ const c=sb(); if(c){ const r=await c.auth.getSession(); const t=r.data&&r.data.session&&r.data.session.access_token; if(t) return {apikey:SUPA_KEY,Authorization:'Bearer '+t}; } }catch(e){} return {apikey:SUPA_KEY,Authorization:'Bearer '+SUPA_KEY}; }
function setSync(t){const e=$('#syncState');if(e)e.textContent=t;}
function showErr(t){try{const b=$('#errbox');if(b){b.style.display='block';const x=$('#errtxt');if(x)x.textContent+=('\n• '+t);}}catch(e){}}
function load(){
 try{
  const s=JSON.parse(localStorage.getItem(KEY))||{};
  // self-repair: drop malformed sections, keep a backup
  let fixed=false;
  ['products','sections'].forEach(k=>{ if(s[k]!==undefined&&!Array.isArray(s[k])){ s[k]=undefined; fixed=true; } });
  if(fixed){ try{localStorage.setItem(KEY+'.bak',localStorage.getItem(KEY)||'');localStorage.setItem(KEY,JSON.stringify(s));}catch(e){} }
  return s;
 }catch(e){return{};}
}
function save(s){localStorage.setItem(KEY,JSON.stringify(s));pushRemote(s);}
async function pushRemote(s){
 if(LOCAL_MODE){setSync('💾 حفظ محلي (وضع الطوارئ)');return;}
 if(!supaOn()){setSync('💾 حفظ محلي فقط');return;}
 setSync('☁ جاري المزامنة مع كل الزوار...');
 try{
  const h=await H();h['Content-Type']='application/json';h.Prefer='return=minimal';
  const r=await fetch(SUPA_URL+'/rest/v1/store_config?id=eq.1',{method:'PATCH',headers:h,body:JSON.stringify({data:s,updated_at:new Date().toISOString()})});
  setSync(r.ok?'☁ متزامن — التعديلات ظاهرة لكل الزوار ✅':'⚠ تعذر المزامنة — محفوظ محلياً فقط');
 }catch(e){setSync('⚠ تعذر المزامنة — محفوظ محلياً فقط');}
}
async function syncFromCloud(){
 if(LOCAL_MODE){setSync('💾 وضع الطوارئ المحلي');return;}
 if(!supaOn()){setSync('💾 وضع محلي');return;}
 setSync('☁ جاري التحميل من السحابة...');
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/store_config?id=eq.1&select=data',{headers:h});
  const j=await r.json();const d=j&&j[0]&&j[0].data;
  if(d){localStorage.setItem(KEY,JSON.stringify(d));fillAll();setSync('☁ متصل — التعديلات تظهر لكل الزوار ✅');}
  else setSync('☁ متصل — لا بيانات سحابية بعد');
 }catch(e){setSync('⚠ تعذر الاتصال بالسحابة — شغال محلي');}
}
async function logAction(action,details){
 if(LOCAL_MODE||!supaOn())return;
 try{
  const c=sb();const s=c?await c.auth.getSession():null;const em=s&&s.data&&s.data.session&&s.data.session.user&&s.data.session.user.email;
  const h=await H();h['Content-Type']='application/json';h.Prefer='return=minimal';
  await fetch(SUPA_URL+'/rest/v1/change_log',{method:'POST',headers:h,body:JSON.stringify({actor_email:em||'admin',action,details:details||{}})});
 }catch(e){}
 if($('#pLog').classList.contains('active'))loadLog();
}
function merged(){const s=load();const byId={};(s.products||[]).forEach(o=>{if(o&&o.id!=null)byId[String(o.id)]=o;});return DEFAULTS.map(d=>Object.assign({},d,byId[String(d.id)]||{}));}
function allProducts(){const base=merged();const s=load();const known=new Set(base.map(p=>String(p.id)));(s.products||[]).forEach(o=>{if(o&&o.id!=null&&!known.has(String(o.id)))base.push(Object.assign({cat:'tshirt',en:'',ar:'',price:0,old:'',stock:true,qty:0,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:[]},o));});return base;}
function getSecs(){const s=load();if(Array.isArray(s.sections)&&s.sections.length)return s.sections;return DEFAULT_SECS.map(x=>Object.assign({},x));}


// gate
async function enterDash(email){
 $('#gate').style.display='none';$('#dash').style.display='block';$('#logoutBtn').style.display='inline-block';
 $('#acctEmail').textContent=email||'وضع الطوارئ المحلي';
 try{
  const c=sb();
  if(c&&email){const r=await c.auth.getSession();const u=r.data&&r.data.session&&r.data.session.user;
   ROLE=(u&&u.user_metadata&&u.user_metadata.role)||'admin';
   if(ROLE!=='admin'){
    document.querySelectorAll('.tab').forEach(b=>{if(b.dataset.t!=='pHome'&&b.dataset.t!=='pOrders')b.style.display='none';});
    setSync('👤 وضع طاقم — عرض الطلبات وتغيير حالتها فقط');
   }}
 }catch(e){}
 syncFromCloud();loadHome();loadOrders();loadLog();subscribeOrders();loadZonesAdmin();ntFill();loadSubs();loadArts();loadCarts();loadBosta();loadAnalytics();
 if('Notification' in window&&Notification.permission==='default'){try{Notification.requestPermission();}catch(e){}}
}
let ROLE='admin';
(function initGate(){
 if(location.hash==='#local'){
  $('#gateUser').textContent='وضع الطوارئ — حفظ محلي فقط';
  $('#em').style.display='none';$('#pw').placeholder='رمز الطوارئ';
  $('#loginBtn').onclick=()=>{ if($('#pw').value===EMERGENCY_PIN){LOCAL_MODE=true;enterDash('');} else $('#pinMsg').textContent='رمز غلط.'; };
  return;
 }
 $('#loginBtn').onclick=doLogin;
 $('#pw').onkeydown=e=>{if(e.key==='Enter')doLogin();};
 (async()=>{try{const c=sb();if(c){const r=await c.auth.getSession();const u=r.data&&r.data.session&&r.data.session.user;if(u){enterDash(u.email);return;}}}catch(e){}})();
})();
async function doLogin(){
 const em=$('#em').value.trim(),pw=$('#pw').value;
 if(!em||!pw){$('#pinMsg').textContent='اكتب الإيميل وكلمة السر.';return;}
 $('#pinMsg').textContent='جاري الدخول...';
 try{
  const c=sb();if(!c){$('#pinMsg').textContent='تعذر الاتصال.';return;}
  const r=await c.auth.signInWithPassword({email:em,password:pw});
  if(r.error){$('#pinMsg').textContent='بيانات غلط، حاول تاني.';return;}
  enterDash(r.data.user.email);
 }catch(e){$('#pinMsg').textContent='تعذر الاتصال بالسحابة.';}
}
$('#logoutBtn').onclick=async()=>{try{const c=sb();if(c)await c.auth.signOut();}catch(e){}location.reload();};
$('#chPwBtn').onclick=async()=>{
 const v=$('#npw').value;if(!v||v.length<6){alert('كلمة السر 6 حروف على الأقل');return;}
 try{const c=sb();const r=await c.auth.updateUser({password:v});
  if(r.error){alert('فشل التغيير');}else{$('#npw').value='';alert('✅ اتغيرت كلمة السر');}
 }catch(e){alert('تعذر الاتصال');}
};
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id===b.dataset.t));if(b.dataset.t==='pLog')loadLog();if(b.dataset.t==='pOrders')loadOrders();if(b.dataset.t==='pCoupons')loadCoupons();if(b.dataset.t==='pReviews')loadReviews();if(b.dataset.t==='pHome')loadHome();if(b.dataset.t==='pShip'){loadZonesAdmin();fillPayExtra();loadBosta();}if(b.dataset.t==='pStaff')return;if(b.dataset.t==='pCust'){loadSubs();}if(b.dataset.t==='pArts')loadArts();if(b.dataset.t==='pCarts')loadCarts();if(b.dataset.t==='pAnalytics')loadAnalytics();});

// products
function renderRows(){
 const rows=allProducts();
 $('#prodRows').innerHTML=rows.map(p=>{
  const im=(p.imgs&&p.imgs[0])||p.img||'';
  return `<tr class="prow" data-id="${p.id}">
  <td>${im?`<img src="${im}" alt="" onerror="this.style.opacity=.2">`:''}</td>
  <td><b>${p.en||''}</b><br><span class="tiny">${p.ar||''}</span></td>
  <td>${p.cat||''}</td><td><b>${p.price} EGP</b></td><td>${p.qty!=null?p.qty:'—'}</td>
  <td>${p.stock?'✅':'❌'}</td>
  <td style="white-space:nowrap"><button class="ghostb" style="padding:6px 12px" onclick="openEditor('${p.id}')">✏️</button>
  <button class="del" onclick="delProduct('${p.id}')">🗑</button></td></tr>`;}).join('');
 const inStock=rows.filter(p=>p.stock).length;
 $('#stCount').textContent=rows.length;$('#stStock').textContent=inStock;
 $('#stAvg').textContent=rows.length?Math.round(rows.reduce((a,p)=>a+Number(p.price||0),0)/rows.length):0;
}
window.openEditor=function(id){
 const p=allProducts().find(x=>String(x.id)===String(id))||{id:'c'+Date.now().toString(36),cat:'tshirt',en:'',ar:'',price:100,old:'',stock:true,qty:10,cost:0,weight:'',desc_en:'',desc_ar:'',seo_title:'',seo_desc:'',imgs:[]};
 EDIT_ID=String(p.id);
 $('#edTitle').textContent=(allProducts().some(x=>String(x.id)===String(id))?'تحرير: ':'منتج جديد: ')+(p.ar||p.en||'');
 $('#e_en').value=p.en||'';$('#e_ar').value=p.ar||'';$('#e_cat').value=p.cat||'tshirt';
 $('#e_price').value=p.price!=null?p.price:'';$('#e_old').value=(p.old==null||p.old==='')?'':p.old;
 $('#e_qty').value=p.qty!=null?p.qty:'';$('#e_cost').value=p.cost!=null?p.cost:'';$('#e_weight').value=p.weight||'';$('#e_stock').value=p.stock?'1':'0';
 $('#e_den').value=p.desc_en||'';$('#e_dar').value=p.desc_ar||'';
 $('#e_imgs').value=((p.imgs&&p.imgs.length?p.imgs:(p.img?[p.img]:[]))||[]).join('\n');
 $('#e_st').value=p.seo_title||'';$('#e_sd').value=p.seo_desc||'';
 try{$('#e_imgs').oninput();}catch(e){}
 $('#e_sf').value=(p.sale_from||'').slice(0,10);$('#e_sto').value=(p.sale_to||'').slice(0,10);
 $('#edMsg').textContent='';$('#editor').classList.add('show');
};
window.delProduct=function(id){
 const p=allProducts().find(x=>String(x.id)===String(id));
 if(!confirm('تحذف "'+(p?(p.ar||p.en):id)+'" نهائياً؟'))return;
 const s=load();
 const cur=Array.isArray(s.products)?s.products.slice():DEFAULTS.map(d=>({id:d.id,cat:d.cat,en:d.en,ar:d.ar,price:d.price,old:d.old,stock:d.stock,qty:d.qty,cost:0,weight:d.weight,desc_en:d.desc_en,desc_ar:d.desc_ar,seo_title:d.seo_title,seo_desc:d.seo_desc,imgs:d.imgs}));
 s.products=cur.filter(o=>String(o.id)!==String(id));
 save(s);renderRows();logAction('حذف منتج',{id:String(id)});
};
$('#addProdBtn').onclick=()=>openEditor('c'+Date.now().toString(36));
$('#e_imgs').oninput=()=>{
 const arr=$('#e_imgs').value.split('\n').map(x=>x.trim()).filter(Boolean);
 $('#e_prev').innerHTML=arr.map(u=>`<img src="${u}" style="width:56px;height:68px;object-fit:cover;border-radius:8px" onerror="this.style.opacity=.2">`).join('');
};
$('#e_files').onchange=async e=>{
 const files=[...e.target.files]; if(!files.length)return;
 $('#e_upmsg').textContent='جاري الرفع... ('+files.length+')';
 const urls=await uploadFiles(files);
 if(urls.length){
  const cur=$('#e_imgs').value.split('\n').map(x=>x.trim()).filter(Boolean);
  $('#e_imgs').value=cur.concat(urls).join('\n');
  $('#e_imgs').oninput();
  $('#e_upmsg').textContent='✅ اترفع '+urls.length;
 } else $('#e_upmsg').textContent='';
 e.target.value=''; setTimeout(()=>$('#e_upmsg').textContent='',3000);
};
$('#edClose').onclick=()=>$('#editor').classList.remove('show');
$('#edCopy').onclick=()=>{
 const u='https://mmetwily1-sudo.github.io/varnoto/product.html?id='+EDIT_ID;
 try{navigator.clipboard.writeText(u);$('#edMsg').textContent='✅ اتنسخ الرابط';}catch(e){prompt('انسخ الرابط:',u);}
};
$('#edSave').onclick=()=>{
 const imgs=$('#e_imgs').value.split('\n').map(x=>x.trim()).filter(Boolean);
 const o={id:isNaN(Number(EDIT_ID))?EDIT_ID:Number($('#e_price').value===''?'':EDIT_ID)||EDIT_ID,
  cat:$('#e_cat').value.trim()||'tshirt',en:$('#e_en').value.trim(),ar:$('#e_ar').value.trim(),
  price:Number($('#e_price').value||0),old:$('#e_old').value===''?'':Number($('#e_old').value),
  stock:$('#e_stock').value==='1',qty:$('#e_qty').value===''?'':Number($('#e_qty').value),cost:$('#e_cost').value===''?'':Number($('#e_cost').value),
  weight:$('#e_weight').value.trim(),desc_en:$('#e_den').value.trim(),desc_ar:$('#e_dar').value.trim(),
  sale_from:$('#e_sf').value||'',sale_to:$('#e_sto').value||'',
  seo_title:$('#e_st').value.trim(),seo_desc:$('#e_sd').value.trim(),imgs};
 o.img=imgs[0]||'';
 if(!/^\d+$/.test(String(EDIT_ID))) o.id=EDIT_ID;
 const s=load();
 const cur=Array.isArray(s.products)&&s.products.length?s.products.slice():DEFAULTS.map(d=>({id:d.id,cat:d.cat,en:d.en,ar:d.ar,price:d.price,old:d.old,stock:d.stock,qty:d.qty,cost:0,weight:d.weight,desc_en:d.desc_en,desc_ar:d.desc_ar,seo_title:d.seo_title,seo_desc:d.seo_desc,imgs:d.imgs,img:(d.imgs||[])[0]||''}));
 const ix=cur.findIndex(x=>String(x.id)===String(o.id));
 if(ix>=0)cur[ix]=o;else cur.push(o);
 s.products=cur;save(s);renderRows();logAction(ix>=0?'تعديل منتج':'إضافة منتج',{id:String(o.id)});
 $('#edMsg').textContent='✅ اتحفظ';setTimeout(()=>{if(!$('#edMsg').textContent)return;},1);
 setTimeout(()=>$('#editor').classList.remove('show'),700);
};

// sections
function renderSecs(){
 const secs=getSecs();
 $('#secRows').innerHTML=secs.map((x,i)=>`<tr data-i="${i}">
  <td><input type="text" data-k="id" value="${x.id||''}" dir="ltr"></td>
  <td><input type="text" data-k="en" value="${(x.en||'').replace(/"/g,'&quot;')}"></td>
  <td><input type="text" data-k="ar" value="${(x.ar||'').replace(/"/g,'&quot;')}"></td>
  <td><input type="text" data-k="sub_en" value="${(x.sub_en||'').replace(/"/g,'&quot;')}"></td>
  <td><input type="text" data-k="sub_ar" value="${(x.sub_ar||x.ar_sub||'').replace(/"/g,'&quot;')}"></td>
  <td><input type="text" data-k="img" value="${x.img||''}" dir="ltr" style="font-size:11px"></td>
  <td style="white-space:nowrap"><label class="ghostb" style="padding:6px 10px;cursor:pointer">📤<input type="file" accept="image/*" data-upfile hidden></label></td>
  <td style="text-align:center"><input type="checkbox" data-k="visible" ${x.visible!==false?'checked':''} style="width:20px;height:20px"></td>
  <td><button class="del" data-del="${i}">🗑</button></td></tr>`).join('');
 document.querySelectorAll('#secRows [data-upfile]').forEach(inp=>inp.onchange=async()=>{
  if(!inp.files.length)return;
  inp.disabled=true;
  const urls=await uploadFiles([inp.files[0]]);
  if(urls[0]){const tx=inp.closest('tr').querySelector('[data-k="img"]');if(tx)tx.value=urls[0];}
  inp.disabled=false;inp.value='';
 });
 document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{
  const s=load();const cur=(Array.isArray(s.sections)&&s.sections.length?s.sections.slice():getSecs());
  cur.splice(Number(b.dataset.del),1);s.sections=cur;save(s);renderSecs();logAction('حذف قسم',{});
 });
}
$('#addSecBtn').onclick=()=>{
 const s=load();const cur=(Array.isArray(s.sections)&&s.sections.length?s.sections.slice():getSecs());
 cur.push({id:'sec'+Date.now().toString(36),en:'New',ar:'جديد',sub_en:'',sub_ar:'',img:'',visible:true});
 s.sections=cur;save(s);renderSecs();
};
$('#saveSecs').onclick=()=>{
 const arr=[...document.querySelectorAll('#secRows tr')].map(tr=>{
  const o={};tr.querySelectorAll('[data-k]').forEach(inp=>{const k=inp.dataset.k;
   o[k]=inp.type==='checkbox'?inp.checked:inp.value.trim();});return o;});
 const s=load();s.sections=arr;save(s);logAction('تعديل الأقسام',{count:arr.length});
 $('#msgS').textContent='✅ اتحفظ';setTimeout(()=>$('#msgS').textContent='',2500);
};

// theme
function fillTheme(){
 const s=load(),th=s.theme||{};
 const c=th.colors||{};
 $('#th_bg').value=c.bg||'#faf9f7';$('#th_ink').value=c.ink||'#141414';$('#th_acc').value=c.acc||'#c9a24b';
 const an=th.announce||s.announce||{};
 $('#ann_ar').value=an.ar||'شحن مجاني للطلبات فوق 1999 جنيه 🚚';$('#ann_en').value=an.en||'Free shipping on orders over 1999 EGP 🚚';
 const hr=th.hero||s.hero||{};
 $('#ht_ar').value=hr.title_ar||'أساسيات تقيلة، معمولة لمصر.';$('#ht_en').value=hr.title_en||'Heavyweight essentials, made for Egypt.';
 $('#hs_ar').value=hr.sub_ar||'تيشيرتات، قمصان لينن، جينز وايد ليج وسويت بانتس. قصّات نضيفة وأسعار واضحة بالجنيه.';$('#hs_en').value=hr.sub_en||'T-shirts, linen shirts, wide-leg jeans & sweatpants. Clean cuts, honest prices in EGP.';
 $('#th_hero_pick').innerHTML='<option value="">— اختار من صور الموقع —</option>'+ASSETS.map(a=>`<option value="${a}">${a}</option>`).join('');
 $('#th_hero').value=th.hero_img||hr.img||'';
 const hd=th.headings||{};
 $('#hc_ar').value=hd.col_ar||'تصفّح المجموعة';$('#hc_en').value=hd.col_en||'Browse the Collection';
 $('#hb_ar').value=hd.best_ar||'الأكثر مبيعاً';$('#hb_en').value=hd.best_en||'Best Selling';
 const pr=th.promo||{};
 $('#pr_show').checked=!!pr.show;$('#pr_ar').value=pr.text_ar||'';$('#pr_en').value=pr.text_en||'';
 $('#pr_end').value=pr.ends_at?(String(pr.ends_at).slice(0,16).replace(' ','T')):'';
 const sh=th.show||{};
 $('#sh_col').checked=sh.collections!==false;$('#sh_about').checked=sh.about!==false;$('#sh_contact').checked=sh.contact!==false;
}
$('#th_hero_pick').onchange=e=>{if(e.target.value)$('#th_hero').value=e.target.value;};
$('#th_file').onchange=async e=>{
 if(!e.target.files.length)return;
 $('#th_upmsg').textContent='جاري الرفع...';
 const urls=await uploadFiles([e.target.files[0]]);
 if(urls[0]){$('#th_hero').value=urls[0];$('#th_upmsg').textContent='✅ اترفع';}
 else $('#th_upmsg').textContent='';
 e.target.value='';setTimeout(()=>$('#th_upmsg').textContent='',3000);
};
$('#a_file').onchange=async e=>{
 if(!e.target.files.length)return;
 $('#a_upmsg').textContent='جاري الرفع...';
 const urls=await uploadFiles([e.target.files[0]]);
 if(urls[0]){$('#a_cover').value=urls[0];$('#a_upmsg').textContent='✅ اترفع';}
 else $('#a_upmsg').textContent='';
 e.target.value='';setTimeout(()=>$('#a_upmsg').textContent='',3000);
};
$('#saveTheme').onclick=()=>{
 const s=load();
 s.theme={colors:{bg:$('#th_bg').value,ink:$('#th_ink').value,acc:$('#th_acc').value},
  announce:{ar:$('#ann_ar').value,en:$('#ann_en').value},
  hero:{title_ar:$('#ht_ar').value,title_en:$('#ht_en').value,sub_ar:$('#hs_ar').value,sub_en:$('#hs_en').value,img:$('#th_hero').value.trim()},
  hero_img:$('#th_hero').value.trim(),
  headings:{col_ar:$('#hc_ar').value,col_en:$('#hc_en').value,best_ar:$('#hb_ar').value,best_en:$('#hb_en').value},
  promo:{show:$('#pr_show').checked,text_ar:$('#pr_ar').value,text_en:$('#pr_en').value,ends_at:$('#pr_end').value||null},
  show:{collections:$('#sh_col').checked,about:$('#sh_about').checked,contact:$('#sh_contact').checked}};
 save(s);logAction('تعديل الثيم',{});
 $('#msgTh').textContent='✅ اتحفظ';setTimeout(()=>$('#msgTh').textContent='',2500);
};

// header/footer
function fillHF(){
 const s=load();
 const links=(s.header&&s.header.links)||DEFAULT_NAV;
 $('#navRows').innerHTML=links.map((l,i)=>`<tr data-i="${i}"><td><input type="text" data-k="en" value="${(l.en||'').replace(/"/g,'&quot;')}"></td><td><input type="text" data-k="ar" value="${(l.ar||'').replace(/"/g,'&quot;')}"></td><td><input type="text" data-k="href" value="${(l.href||'').replace(/"/g,'&quot;')}" dir="ltr"></td><td><button class="del" data-navdel="${i}">🗑</button></td></tr>`).join('');
 document.querySelectorAll('[data-navdel]').forEach(b=>b.onclick=()=>{b.closest('tr').remove();});
 const ft=s.footer||{};
 $('#ft_ar').value=ft.about_ar||'براند مصري للأساسيات. القاهرة، مصر.';$('#ft_en').value=ft.about_en||'Egyptian essentials brand. Cairo, Egypt.';
 $('#ft_note').value=ft.note||'© 2026 VARNOTO — varnoto.com';
}
$('#addNavBtn').onclick=()=>{$('#navRows').insertAdjacentHTML('beforeend','<tr><td><input type="text" data-k="en" value="New"></td><td><input type="text" data-k="ar" value="جديد"></td><td><input type="text" data-k="href" value="#home" dir="ltr"></td><td><button class="del" onclick="this.closest(\'tr\').remove()">🗑</button></td></tr>');};
$('#saveHF').onclick=()=>{
 const links=[...document.querySelectorAll('#navRows tr')].map(tr=>{const o={};tr.querySelectorAll('[data-k]').forEach(i=>o[i.dataset.k]=i.value.trim());return o;}).filter(l=>l.en||l.ar);
 const s=load();s.header={links};
 s.footer={about_ar:$('#ft_ar').value,about_en:$('#ft_en').value,note:$('#ft_note').value};
 save(s);logAction('تعديل الهيدر والفوتر',{});
 $('#msgHF').textContent='✅ اتحفظ';setTimeout(()=>$('#msgHF').textContent='',2500);
};

// pages
function fillPg(){
 const s=load(),pg=(s.pages||{})[$('#pg_sel').value]||{};
 $('#pg_tar').value=pg.title_ar||'';$('#pg_ten').value=pg.title_en||'';
 $('#pg_bar').value=pg.body_ar||'';$('#pg_ben').value=pg.body_en||'';
}
$('#pg_sel').onchange=fillPg;
$('#savePg').onclick=()=>{
 const s=load();s.pages=s.pages||{};
 s.pages[$('#pg_sel').value]={title_ar:$('#pg_tar').value,title_en:$('#pg_ten').value,body_ar:$('#pg_bar').value,body_en:$('#pg_ben').value};
 save(s);logAction('تعديل صفحة تعريفية',{page:$('#pg_sel').value});
 $('#msgPg').textContent='✅ اتحفظ';setTimeout(()=>$('#msgPg').textContent='',2500);
};

// seo site
function fillSEO(){
 const s=load(),seo=s.seo||{};
 $('#seo_t').value=seo.site_title||'VARNOTO | ملابس مصرية عصرية';
 $('#seo_d').value=seo.site_desc||'VARNOTO — براند ملابس مصري: تيشيرتات، قمصان لينن، جينز، سويت بانتس. خامات تقيلة وشحن سريع.';
 $('#seo_og').value=seo.og_image||'assets/hero.jpg';
 const ig=s.integrations||{};
 $('#seo_meta').value=ig.meta||'';$('#seo_tt').value=ig.tiktok||'';$('#seo_ga').value=ig.ga4||'';
 $('#seo_gtm').value=ig.gtm||'';$('#seo_gv').value=(s.seo&&s.seo.google_verification)||'';
}
$('#saveSEO').onclick=()=>{
 const s=load();s.seo={site_title:$('#seo_t').value.trim(),site_desc:$('#seo_d').value.trim(),og_image:$('#seo_og').value.trim(),google_verification:$('#seo_gv').value.trim()};
 s.integrations={meta:$('#seo_meta').value.trim(),tiktok:$('#seo_tt').value.trim(),ga4:$('#seo_ga').value.trim(),gtm:$('#seo_gtm').value.trim()};
 save(s);logAction('تعديل SEO والتكاملات',{});
 $('#msgSEO').textContent='✅ اتحفظ';setTimeout(()=>$('#msgSEO').textContent='',2500);
};

// contact
function fillC(){const s=load();$('#c_wa').value=(s.contact&&s.contact.whatsapp)||'201000000000';$('#c_ig').value=(s.contact&&s.contact.instagram)||'';$('#c_tt').value=(s.contact&&s.contact.tiktok)||'';}
fillC();
$('#saveContact').onclick=()=>{const s=load();s.contact={whatsapp:$('#c_wa').value.trim(),instagram:$('#c_ig').value.trim(),tiktok:$('#c_tt').value.trim()};save(s);logAction('تعديل التواصل',{});$('#msgC').textContent='✅ اتحفظ';setTimeout(()=>$('#msgC').textContent='',2500);};

// home overview
let CHART=null, HOME_DAYS=14;
document.querySelectorAll('.per').forEach(b=>b.onclick=()=>{HOME_DAYS=Number(b.dataset.days);loadHome();});
async function loadHome(){
 if(LOCAL_MODE){$('#homeMsg').textContent='غير متاح في وضع الطوارئ';return;}
 $('#homeMsg').textContent='جاري التحميل...';
 try{
  const h=await H();
  const costs={}; allProducts().forEach(p=>{const c=Number(p.cost||0); if(c>0){costs[String(p.id)]=c; if(p.en)costs[p.en]=c;}});
  const r=await fetch(SUPA_URL+'/rest/v1/rpc/dashboard_stats',{method:'POST',headers:Object.assign(h,{'Content-Type':'application/json'}),body:JSON.stringify({ndays:HOME_DAYS,costs})});
  if(!r.ok){$('#homeMsg').textContent='سجل دخول المدير لعرض البيانات';return;}
  const d=await r.json();
  $('#homeMsg').textContent='آخر '+HOME_DAYS+' يوم';
  $('#hVisits').textContent=(d.visits_total||0).toLocaleString('ar-EG');
  $('#hRevenue').textContent=(d.revenue_total||0).toLocaleString('ar-EG');
  $('#hOrders').textContent=(d.orders_count||0).toLocaleString('ar-EG');
  $('#hBuyers').textContent=(d.buyers_count||0).toLocaleString('ar-EG');
  $('#hAvg').textContent=(d.avg_basket||0).toLocaleString('ar-EG');
  $('#hProfit').textContent=(d.profit_total||0).toLocaleString('ar-EG');
  $('#hMargin').textContent='(هامش '+(d.margin_pct||0)+'%)';
  const days=(d.daily||[]), labels=days.map(x=>x.d.slice(5)), vv=days.map(x=>x.visits), oo=days.map(x=>x.orders), rr=days.map(x=>x.revenue);
  try{
   if(CHART)CHART.destroy();
   CHART=new Chart($('#salesChart'),{data:{labels,datasets:[
    {type:'bar',label:'الزيارات',data:vv,backgroundColor:'#141414',yAxisID:'y'},
    {type:'line',label:'الإيراد (جنيه)',data:rr,borderColor:'#c9a24b',backgroundColor:'#c9a24b',tension:.3,yAxisID:'y1'},
    {type:'line',label:'الطلبات',data:oo,borderColor:'#1a5fb4',backgroundColor:'#1a5fb4',tension:.3,yAxisID:'y',hidden:true}]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
     plugins:{legend:{rtl:true,labels:{font:{family:'Cairo'}}},tooltip:{rtl:true}},
     scales:{y:{beginAtZero:true},y1:{beginAtZero:true,position:'right',grid:{drawOnChartArea:false}}}}});
  }catch(e){}
  $('#topRows').innerHTML=(d.top_products||[]).length?(d.top_products||[]).map(p=>`<tr><td>${p.nm||''}</td><td><b>${p.qty}</b></td><td><b>${p.revenue} EGP</b></td></tr>`).join(''):'<tr><td colspan="3" class="tiny">لا مبيعات بعد</td></tr>';
  renderStockAlerts();
  $('#buyRows').innerHTML=(d.buyers||[]).length?(d.buyers||[]).map(b=>`<tr><td>${b.nm||''}</td><td dir="ltr" style="font-size:12px">${b.ph||''}</td><td>${b.ords}</td><td><b>${b.spent} EGP</b></td></tr>`).join(''):'<tr><td colspan="4" class="tiny">لا مشترين بعد</td></tr>';
 }catch(e){$('#homeMsg').textContent='تعذر التحميل';}
}

// stock alerts
function renderStockAlerts(){
 const low=allProducts().filter(p=>(p.qty||0)<=5);
 const box=$('#stockAlerts'); if(!box)return;
 if(!low.length){box.innerHTML='';return;}
 box.innerHTML=`<div style="background:#fff8e6;border:1px solid #e0a100;border-radius:12px;padding:12px 16px">
 <b>⚠ مخزون منخفض (${low.length}):</b> `+low.map(p=>`${p.ar||p.en} (<b>${p.qty||0}</b>) <button class="ghostb" style="padding:4px 10px;margin:2px" onclick="restock('${p.id}')">+20</button>`).join(' • ')+'</div>';
}
window.restock=function(id){
 const s=load();
 const cur=Array.isArray(s.products)&&s.products.length?s.products.slice():DEFAULTS.map(d=>({id:d.id,qty:d.qty}));
 let f=cur.find(x=>String(x.id)===String(id));
 if(!f){const p=allProducts().find(x=>String(x.id)===String(id));f={id:typeof p.id==='number'?p.id:String(p.id),qty:p.qty||0};cur.push(f);}
 f.qty=Number(f.qty||0)+20; f.stock=true;
 s.products=cur;save(s);logAction('تزويد مخزون',{id:String(id),qty:f.qty});
 renderRows();renderStockAlerts();loadHome();
};

// analytics hub
let HOURCH=null, GACH=null;
function anGet(){try{return JSON.parse(localStorage.getItem('varnoto_analytics'))||{};}catch(e){return{};}}
async function loadAnalytics(){
 if(LOCAL_MODE)return;
 // first-party (last 30 days, cap 5000 rows)
 try{
  const h=await H();
  const since=new Date(Date.now()-30*864e5).toISOString();
  const r=await fetch(SUPA_URL+'/rest/v1/events?select=page,created_at,meta,type&created_at=gte.'+encodeURIComponent(since)+'&order=created_at.desc&limit=5000',{headers:h});
  if(!r.ok)return;
  const rows=await r.json();
  const views=rows.filter(x=>x.type==='view');
  const byPage={},byRef={},byHour=new Array(24).fill(0);
  views.forEach(v=>{
   const p=(v.page||'/').replace('/varnoto/','/')||'/';byPage[p]=(byPage[p]||0)+1;
   let ref='مباشر';try{const u=((v.meta||{}).ref)||'';if(u)ref=new URL(u).hostname.replace(/^www\./,'');}catch(e){}
   byRef[ref]=(byRef[ref]||0)+1;
   try{byHour[new Date(v.created_at).getUTCHours()]++;}catch(e){}
  });
  $('#anPages').innerHTML=Object.entries(byPage).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([p,n])=>`<tr><td dir="ltr" style="font-size:12px">${p}</td><td><b>${n}</b></td></tr>`).join('')||'<tr><td colspan="2" class="tiny">لا بيانات بعد</td></tr>';
  $('#anRefs').innerHTML=Object.entries(byRef).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([p,n])=>`<tr><td style="font-size:12px">${p}</td><td><b>${n}</b></td></tr>`).join('');
  try{
   if(HOURCH)HOURCH.destroy();
   HOURCH=new Chart($('#hourChart'),{type:'bar',data:{labels:[...Array(24).keys()].map(x=>x+':00'),datasets:[{label:'الزيارات',data:byHour,backgroundColor:'#141414'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}});
  }catch(e){}
 }catch(e){}
 // google session restore
 try{
  const m=(location.hash||'').match(/access_token=([^&]+)/);
  if(m){sessionStorage.setItem('vnt_gtok',decodeURIComponent(m[1]));history.replaceState(null,'',location.pathname+location.search);fillGoogle();loadGoogle();}
 }catch(e){}
 const a=anGet();
 $('#g_client').value=a.g_client||'';$('#g_prop').value=a.ga4_prop||'';$('#g_site').value=a.gsc_site||'https://mmetwily1-sudo.github.io/varnoto/';
 if(sessionStorage.getItem('vnt_gtok')){fillGoogle();loadGoogle();}
 const m2=anGet();
 $('#m_tok').value=m2.meta_token||'';$('#m_page').value=m2.meta_page||'';
}
function fillGoogle(){const on=!!sessionStorage.getItem('vnt_gtok');$('#gMsg').textContent=on?'✅ مربوط بحساب جوجل':'';}
$('#gSave').onclick=()=>{localStorage.setItem('varnoto_analytics',JSON.stringify(Object.assign(anGet(),{g_client:$('#g_client').value.trim(),ga4_prop:$('#g_prop').value.trim(),gsc_site:$('#g_site').value.trim(),meta_token:$('#m_tok').value.trim(),meta_page:$('#m_page').value.trim()})));$('#gMsg').textContent='✅ اتحفظ';setTimeout(()=>{if($('#gMsg').textContent==='✅ اتحفظ')$('#gMsg').textContent='';},2500);};
$('#gConnect').onclick=()=>{
 const a=anGet();
 if(!a.g_client){alert('الصق OAuth Client ID الأول واحفظ');return;}
 const u='https://accounts.google.com/o/oauth2/v2/auth?client_id='+encodeURIComponent(a.g_client)+'&redirect_uri='+encodeURIComponent('https://mmetwily1-sudo.github.io/varnoto/admin.html')+'&response_type=token&scope='+encodeURIComponent('https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly')+'&prompt=consent&include_granted_scopes=true';
 location.href=u;
};
$('#gOut').onclick=()=>{sessionStorage.removeItem('vnt_gtok');$('#gaSec').style.display='none';fillGoogle();};
async function loadGoogle(){
 const a=anGet(),tok=sessionStorage.getItem('vnt_gtok');
 if(!tok)return;
 $('#gaSec').style.display='';
 // GA4
 try{
  if(a.ga4_prop){
   const r=await fetch('https://analyticsdata.googleapis.com/v1beta/properties/'+encodeURIComponent(a.ga4_prop)+':runReport',{method:'POST',headers:{Authorization:'Bearer '+tok,'Content-Type':'application/json'},body:JSON.stringify({dateRanges:[{startDate:'28daysAgo',endDate:'today'}],dimensions:[{name:'date'}],metrics:[{name:'sessions'},{name:'totalUsers'}],orderBys:[{dimension:{dimensionName:'date'}}]})});
   const j=await r.json();
   const rows=(j.rows||[]),labels=rows.map(x=>x.dimensionValues[0].value.slice(4)),ss=rows.map(x=>Number(x.metricValues[0].value)),uu=rows.map(x=>Number(x.metricValues[1].value));
   try{
    if(GACH)GACH.destroy();
    GACH=new Chart($('#gaChart'),{data:{labels,datasets:[{type:'line',label:'الجلسات',data:ss,borderColor:'#141414',tension:.3},{type:'line',label:'الزوار',data:uu,borderColor:'#c9a24b',tension:.3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{rtl:true}}}});
   }catch(e){}
  }
 }catch(e){}
 // GSC
 try{
  if(a.gsc_site){
   const end=new Date(),start=new Date(Date.now()-28*864e5);
   const f=d=>d.toISOString().slice(0,10);
   const r=await fetch('https://www.googleapis.com/webmasters/v3/sites/'+encodeURIComponent(a.gsc_site)+'/searchAnalytics',{method:'POST',headers:{Authorization:'Bearer '+tok,'Content-Type':'application/json'},body:JSON.stringify({startDate:f(start),endDate:f(end),dimensions:['query'],rowLimit:25})});
   const j=await r.json();
   $('#gscRows').innerHTML=(j.rows||[]).length?(j.rows||[]).map(x=>`<tr><td>${x.keys[0]}</td><td>${x.clicks}</td><td>${x.impressions}</td><td>${(x.ctr*100).toFixed(1)}%</td><td>${x.position.toFixed(1)}</td></tr>`).join(''):'<tr><td colspan="5" class="tiny">لا بيانات — تأكد من إضافة الموقع في Search Console</td></tr>';
  }
 }catch(e){}
}
$('#mLoad').onclick=async()=>{
 const tok=$('#m_tok').value.trim(),pg=$('#m_page').value.trim();
 if(!tok||!pg){$('#mMsg').textContent='اكتب التوكن والـ Page ID';return;}
 localStorage.setItem('varnoto_analytics',JSON.stringify(Object.assign(anGet(),{meta_token:tok,meta_page:pg})));
 $('#mMsg').textContent='جاري التحميل...';
 try{
  const p=await (await fetch('https://graph.facebook.com/v19.0/'+encodeURIComponent(pg)+'?fields=name,followers_count&access_token='+encodeURIComponent(tok))).json();
  if(p.error){$('#mMsg').textContent='خطأ: '+p.error.message;return;}
  const ins=await (await fetch('https://graph.facebook.com/v19.0/'+encodeURIComponent(pg)+'/insights?metric=page_impressions_unique,page_post_engagements&period=days_28&access_token='+encodeURIComponent(tok))).json();
  const val=n=>{try{const d=(ins.data||[]).find(x=>x.name===n);const v=d&&d.values&&d.values[d.values.length-1];return v?v.value:'—';}catch(e){return '—';}};
  $('#metaStats').style.display='flex';
  $('#mtFol').textContent=p.followers_count!=null?p.followers_count:'—';
  $('#mtReach').textContent=val('page_impressions_unique');
  $('#mtEng').textContent=val('page_post_engagements');
  $('#mMsg').textContent='✅ '+ (p.name||'');
 }catch(e){$('#mMsg').textContent='تعذر الاتصال';}
};

// orders
const ST_AR={new:'جديد',preparing:'يتجهز',shipped:'اتشحن',done:'تم ✅'};
function fmtDate(iso){try{const d=new Date(iso);return d.toLocaleString('ar-EG',{dateStyle:'short',timeStyle:'short'});}catch(e){return iso||'';}}
function itemsTxt(items){try{return (items||[]).map(i=>(i.name||'')+' ×'+(i.q||1)).join('، ');}catch(e){return '';}}
async function loadOrders(){
 if(LOCAL_MODE){$('#ordRows').innerHTML='<tr><td colspan="6" class="tiny">غير متاح في وضع الطوارئ</td></tr>';return;}
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/orders?select=*&order=created_at.desc&limit=100',{headers:h});
  if(r.status===401||r.status===403){$('#ordRows').innerHTML='<tr><td colspan="6" class="tiny">سجل دخول المدير لعرض الطلبات</td></tr>';return;}
  const rows=await r.json();renderOrders(rows||[]);
 }catch(e){$('#ordRows').innerHTML='<tr><td colspan="6" class="tiny">تعذر التحميل</td></tr>';}
}
function renderOrders(rows){
 rows=rows||[]; ORDERS=rows;
 const news=rows.filter(o=>o.status==='new').length;
 $('#stOrders').textContent=news;
 const b=$('#ordBdg');b.style.display=news?'inline-block':'none';b.textContent=news;
 $('#ordRows').innerHTML=rows.length?rows.map(o=>`<tr>
  <td><b>#${o.id}</b></td><td style="font-size:12px">${fmtDate(o.created_at)}</td>
  <td>${(o.customer_name||'—')}<br><span class="tiny" dir="ltr">${(o.customer_phone||'')}</span></td>
  <td style="font-size:12px">${itemsTxt(o.items)}</td><td><b>${o.total} EGP</b>${o.discount?`<br><span class="tiny" style="color:#1c7a3d">خصم ${o.discount}</span>`:''}</td>
  <td><span class="st-${o.status||'new'}">${ST_AR[o.status]||o.status}</span><br>
  <select data-st="${o.id}" style="margin-top:6px"><option value="">تغيير ←</option><option value="preparing">يتجهز</option><option value="shipped">اتشحن</option><option value="done">تم ✅</option></select><br>
  <button class="ghostb" style="padding:4px 10px;margin-top:6px" onclick="printOrder(${o.id})">🖨 فاتورة</button>
  <button class="ghostb" style="padding:4px 10px;margin-top:6px" onclick="printThermal(${o.id})">🧾 حرارية</button>
  <button class="ghostb" style="padding:4px 10px;margin-top:6px" onclick="bostaShip(${o.id})">📦 بوسطة</button>${o.tracking?`<br><a class="tiny" target="_blank" href="https://bosta.co/tracking-shipments?track_num=${o.tracking}">تتبع: ${o.tracking}</a>`:''}</td></tr>`).join('')
  :'<tr><td colspan="6" class="tiny">لا طلبات بعد — أول طلب هيظهر هنا لحظياً مع تنبيه صوتي.</td></tr>';
 document.querySelectorAll('[data-st]').forEach(sel=>sel.onchange=()=>{if(sel.value)setStatus(Number(sel.dataset.st),sel.value);});
}
let ORDERS=[];
window.printOrder=function(id){
 const o=(ORDERS||[]).find(x=>Number(x.id)===Number(id)); if(!o)return;
 const items=o.items||[]; const sub=items.reduce((a,i)=>a+Number(i.price||0)*Number(i.q||0),0);
 const w=window.open('','_blank','width=680,height=850');
 w.document.write('<html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>فاتورة #'+o.id+'</title><style>body{font-family:Arial,Tahoma;padding:28px;color:#111}table{width:100%;border-collapse:collapse;margin:14px 0}td,th{border:1px solid #999;padding:8px;text-align:right;font-size:14px}h1{font-size:24px;margin:0}.hd{display:flex;justify-content:space-between;align-items:center}.tot{font-size:18px;font-weight:bold}button{padding:10px 26px;font-size:15px;cursor:pointer}@media print{button{display:none}}</style></head><body>'
 +'<div class="hd"><div><h1>VARNOTO</h1><div>القاهرة، مصر — varnoto.com</div></div><div><b>فاتورة طلب #'+o.id+'</b><div>'+fmtDate(o.created_at)+'</div><div>الحالة: '+o.status+'</div></div></div><hr>'
 +'<p><b>العميل:</b> '+(o.customer_name||'—')+' — <span dir="ltr">'+(o.customer_phone||'')+'</span></p>'
 +'<table><tr><th>الصنف</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr>'
 +items.map(i=>'<tr><td>'+i.name+'</td><td>'+i.q+'</td><td>'+i.price+' EGP</td><td>'+(i.q*i.price)+' EGP</td></tr>').join('')
 +'</table><p>المجموع الفرعي: '+sub+' EGP</p>'
 +(o.discount?'<p>الخصم'+(o.coupon_code?' ('+o.coupon_code+')':'')+': -'+o.discount+' EGP</p>':'')
 +'<p class="tot">الإجمالي: '+o.total+' EGP (عند الاستلام)</p>'
 +'<p><button onclick="window.print()">🖨 طباعة</button></p></body></html>');
 w.document.close();
};
window.printThermal=function(id){
 const o=(ORDERS||[]).find(x=>Number(x.id)===Number(id)); if(!o)return;
 const items=o.items||[];
 const w=window.open('','_blank','width=320,height=700');
 w.document.write('<html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>#'+o.id+'</title><style>body{font-family:Arial,Tahoma;width:72mm;margin:0 auto;padding:6px;color:#111;font-size:12px}h2{text-align:center;margin:4px 0;font-size:16px}.c{text-align:center}.it{display:flex;justify-content:space-between;border-bottom:1px dashed #999;padding:3px 0}.tot{font-weight:bold;font-size:14px}button{width:100%;padding:8px;margin-top:8px}@media print{button{display:none}}</style></head><body>'
 +'<h2>VARNOTO</h2><div class="c">varnoto.com<br>طلب #'+o.id+' — '+fmtDate(o.created_at)+'</div><hr>'
 +'<div>'+(o.customer_name||'')+' — <span dir="ltr">'+(o.customer_phone||'')+'</span></div><hr>'
 +items.map(i=>'<div class="it"><span>'+i.name+' ×'+i.q+'</span><span>'+(i.q*i.price)+'</span></div>').join('')
 +'<hr><div class="it"><span>المجموع</span><span>'+items.reduce((a,i)=>a+i.q*i.price,0)+'</span></div>'
 +(o.discount?'<div class="it"><span>خصم</span><span>-'+o.discount+'</span></div>':'')
 +'<div class="it"><span>شحن</span><span>'+(o.ship_fee||0)+'</span></div>'
 +'<div class="it tot"><span>الإجمالي</span><span>'+o.total+'</span></div>'
 +'<div class="c">شكراً لتسوقكم معنا 🌟</div>'
 +'<p><button onclick="window.print()">طباعة</button></p></body></html>');
 w.document.close();
};
async function setStatus(id,st){
 try{
  const h=await H();h['Content-Type']='application/json';
  const r=await fetch(SUPA_URL+'/rest/v1/rpc/set_order_status',{method:'POST',headers:h,body:JSON.stringify({p_id:id,p_status:st})});
  if(!r.ok){alert('تعذر التحديث');return;}
  logAction('تغيير حالة طلب',{id,status:st});loadOrders();
 }catch(e){alert('تعذر التحديث');}
}
let knownIds=new Set(), firstLoad=true;
function beep(){try{const A=new (window.AudioContext||window.webkitAudioContext)();const o=A.createOscillator(),g=A.createGain();o.connect(g);g.connect(A.destination);o.frequency.value=880;g.gain.value=.12;o.start();[0,.18,.36].forEach((tt,i)=>{o.frequency.setValueAtTime([880,660,990][i],A.currentTime+tt);});o.stop(A.currentTime+.6);}catch(e){}}
function subscribeOrders(){
 try{
  const c=sb();if(!c)return;
  c.channel('orders-live').on('postgres_changes',{event:'INSERT',schema:'public',table:'orders'},p=>{
   const o=p.new;if(!o||knownIds.has(o.id))return;knownIds.add(o.id);
   beep();notifyOrder(o);
   if('Notification' in window&&Notification.permission==='granted'){try{new Notification('🧾 طلب جديد #'+o.id,{body:(o.total||'')+' EGP'});}catch(e){}}
   loadOrders();
  }).subscribe();
 }catch(e){}
 setInterval(async()=>{
  try{
   const h=await H();
   const r=await fetch(SUPA_URL+'/rest/v1/orders?select=id&order=created_at.desc&limit=20',{headers:h});
   const rows=await r.json();let fresh=false;
   (rows||[]).forEach(o=>{if(!knownIds.has(o.id)){knownIds.add(o.id);fresh=true;}});
   if(fresh&&!firstLoad){beep();loadOrders();}
   firstLoad=false;
   if(cartAutoGet()){
    const rc=await fetch(SUPA_URL+'/rest/v1/carts?select=session_id,phone,total,updated_at,reminded&order=updated_at.desc&limit=20',{headers:h});
    const carts=await rc.json();let cFresh=false;
    for(const c of (carts||[])){
     if(c.phone&&!c.reminded&&!knownCartIds.has(c.session_id)){
      knownCartIds.add(c.session_id);
      const ageMin=(Date.now()-new Date(c.updated_at).getTime())/60000;
      if(ageMin>30){autoRemind(c);markRemindedSilent(c.session_id);cFresh=true;}
     }
    }
    if(cFresh)loadCarts();
   }
  }catch(e){}
 },30000);
async function markRemindedSilent(sid){
 try{const h=await H();h['Content-Type']='application/json';h.Prefer='return=minimal';
  await fetch(SUPA_URL+'/rest/v1/carts?session_id=eq.'+encodeURIComponent(sid),{method:'PATCH',headers:h,body:JSON.stringify({reminded:true})});}catch(e){}
}
let knownCartIds=new Set();
}

// change log
async function loadLog(){
 if(LOCAL_MODE){$('#logRows').innerHTML='<tr><td colspan="4" class="tiny">غير متاح في وضع الطوارئ</td></tr>';return;}
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/change_log?select=*&order=created_at.desc&limit=50',{headers:h});
  if(!r.ok){$('#logRows').innerHTML='<tr><td colspan="4" class="tiny">سجل دخول المدير لعرض السجل</td></tr>';return;}
  const rows=await r.json();
  $('#logRows').innerHTML=rows.length?rows.map(l=>`<tr class="logrow"><td style="font-size:12px">${fmtDate(l.created_at)}</td><td dir="ltr" style="font-size:12px">${l.actor_email||''}</td><td><b>${l.action||''}</b></td><td style="font-size:12px">${JSON.stringify(l.details||{})}</td></tr>`).join('')
   :'<tr><td colspan="4" class="tiny">لا تغييرات مسجلة بعد.</td></tr>';
 }catch(e){$('#logRows').innerHTML='<tr><td colspan="4" class="tiny">تعذر التحميل</td></tr>';}
}

// coupons
async function loadCoupons(){
 if(LOCAL_MODE)return;
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/coupons?select=*&order=code',{headers:h});
  if(!r.ok)return;
  const rows=await r.json();
  $('#cpRows').innerHTML=rows.length?rows.map(c=>`<tr><td dir="ltr"><b>${c.code}</b></td>
   <td>${c.type==='percent'?c.value+'%':c.value+' EGP'}</td>
   <td class="tiny">أدنى ${c.min_total||0} • ${c.max_uses||'∞'} • ${c.expires_at?String(c.expires_at).slice(0,10):'دائم'}</td>
   <td><b>${c.used_count||0}</b></td>
   <td>${c.active?'✅':'❌'}</td>
   <td style="white-space:nowrap"><button class="ghostb" style="padding:6px 12px" onclick="toggleCoupon('${c.code}',${!c.active})">${c.active?'إيقاف':'تفعيل'}</button>
   <button class="del" onclick="delCoupon('${c.code}')">🗑</button></td></tr>`).join('')
   :'<tr><td colspan="6" class="tiny">لا كوبونات — ضيف أول كود خصم.</td></tr>';
 }catch(e){}
}
window.toggleCoupon=async(code,on)=>{
 try{const h=await H();h['Content-Type']='application/json';h.Prefer='return=minimal';
  await fetch(SUPA_URL+'/rest/v1/coupons?code=eq.'+encodeURIComponent(code),{method:'PATCH',headers:h,body:JSON.stringify({active:on})});
  logAction(on?'تفعيل كوبون':'إيقاف كوبون',{code});loadCoupons();}catch(e){alert('تعذر التحديث');}
};
window.delCoupon=async code=>{
 if(!confirm('تحذف كوبون '+code+'؟'))return;
 try{const h=await H();await fetch(SUPA_URL+'/rest/v1/coupons?code=eq.'+encodeURIComponent(code),{method:'DELETE',headers:h});
  logAction('حذف كوبون',{code});loadCoupons();}catch(e){alert('تعذر الحذف');}
};
$('#cpAdd').onclick=async()=>{
 const code=$('#cp_code').value.trim().toUpperCase().replace(/\s+/g,'');
 if(!code){alert('اكتب الكود');return;}
 try{
  const h=await H();h['Content-Type']='application/json';h.Prefer='return=minimal';
  const body={code,type:$('#cp_type').value,value:Number($('#cp_val').value||0),min_total:Number($('#cp_min').value||0),
   max_uses:$('#cp_max').value==='' ? null:Number($('#cp_max').value),expires_at:$('#cp_exp').value||null,active:true};
  const r=await fetch(SUPA_URL+'/rest/v1/coupons',{method:'POST',headers:h,body:JSON.stringify(body)});
  if(!r.ok){$('#msgCp').textContent='الكود موجود قبل كده';return;}
  $('#cp_code').value='';logAction('إضافة كوبون',{code});loadCoupons();
  $('#msgCp').textContent='✅ اتضاف';setTimeout(()=>$('#msgCp').textContent='',2500);
 }catch(e){alert('تعذر الإضافة');}
};

// reviews moderation
function pname(id){const p=allProducts().find(x=>String(x.id)===String(id));return p?(p.ar||p.en):id;}
async function loadReviews(){
 if(LOCAL_MODE)return;
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/reviews?select=*&order=created_at.desc&limit=200',{headers:h});
  if(!r.ok)return;
  const rows=await r.json();
  const pend=rows.filter(x=>!x.approved), okd=rows.filter(x=>x.approved);
  const b=$('#revBdg');b.style.display=pend.length?'inline-block':'none';b.textContent=pend.length;
  const row=x=>`<tr><td>${pname(x.product_id)}</td><td>${x.name||'—'}</td><td>${'★'.repeat(Number(x.rating)||0)}</td><td style="font-size:12px">${x.comment||''}</td>`;
  $('#revPend').innerHTML=pend.length?pend.map(x=>row(x)+`<td style="white-space:nowrap"><button class="ghostb" style="padding:6px 12px" onclick="approveReview(${x.id})">✅ اعتماد</button> <button class="del" onclick="delReview(${x.id})">🗑</button></td></tr>`).join(''):'<tr><td colspan="5" class="tiny">مفيش حاجة مستنية.</td></tr>';
  $('#revOk').innerHTML=okd.length?okd.map(x=>row(x)+`<td><button class="del" onclick="delReview(${x.id})">🗑</button></td></tr>`).join(''):'<tr><td colspan="5" class="tiny">لا تقييمات معتمدة.</td></tr>';
 }catch(e){}
}
window.approveReview=async id=>{
 try{const h=await H();h['Content-Type']='application/json';h.Prefer='return=minimal';
  await fetch(SUPA_URL+'/rest/v1/reviews?id=eq.'+id,{method:'PATCH',headers:h,body:JSON.stringify({approved:true})});
  logAction('اعتماد تقييم',{id});loadReviews();}catch(e){alert('تعذر الاعتماد');}
};
window.delReview=async id=>{
 if(!confirm('تحذف التقييم؟'))return;
 try{const h=await H();await fetch(SUPA_URL+'/rest/v1/reviews?id=eq.'+id,{method:'DELETE',headers:h});
  logAction('حذف تقييم',{id});loadReviews();}catch(e){alert('تعذر الحذف');}
};

// shipping zones + payment
let ORIG_ZONES=[];
async function loadZonesAdmin(){
 if(LOCAL_MODE)return;
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/shipping_zones?select=*&order=id',{headers:h});
  if(!r.ok)return;
  const rows=await r.json();ORIG_ZONES=rows.map(z=>z.id);
  $('#zoneRows').innerHTML=rows.map(z=>`<tr data-id="${z.id}">
   <td><input type="text" data-k="id" value="${z.id}" dir="ltr"></td>
   <td><input type="text" data-k="name_ar" value="${(z.name_ar||'').replace(/"/g,'&quot;')}"></td>
   <td><input type="text" data-k="name_en" value="${(z.name_en||'').replace(/"/g,'&quot;')}"></td>
   <td><input type="number" data-k="fee" value="${z.fee||0}" min="0"></td>
   <td><input type="text" data-k="days" value="${(z.days||'').replace(/"/g,'&quot;')}"></td>
   <td><input type="number" data-k="free_over" value="${z.free_over!=null?z.free_over:1999}" min="0"></td>
   <td style="text-align:center"><input type="checkbox" data-k="active" ${z.active!==false?'checked':''} style="width:20px;height:20px"></td>
   <td><button class="del" data-zdel="${z.id}">🗑</button></td></tr>`).join('');
  document.querySelectorAll('[data-zdel]').forEach(b=>b.onclick=()=>{b.closest('tr').remove();});
 }catch(e){}
 const s=load(),pay=s.payment||{};
 $('#pay_cod').checked=!pay.cod||pay.cod.on!==false;
 $('#pay_ins').checked=!!(pay.instapay&&pay.instapay.on);$('#pay_ins_n').value=(pay.instapay&&pay.instapay.number)||'';
 $('#pay_vod').checked=!!(pay.vodafone&&pay.vodafone.on);$('#pay_vod_n').value=(pay.vodafone&&pay.vodafone.number)||'';
}
$('#addZoneBtn').onclick=()=>{$('#zoneRows').insertAdjacentHTML('beforeend','<tr><td><input type="text" data-k="id" value="zone'+Date.now().toString(36)+'" dir="ltr"></td><td><input type="text" data-k="ar" value="" placeholder="AR"></td><td><input type="text" data-k="name_en" value="" placeholder="EN"></td><td><input type="number" data-k="fee" value="60" min="0"></td><td><input type="text" data-k="days" value="2-4"></td><td><input type="number" data-k="free_over" value="1999" min="0"></td><td style="text-align:center"><input type="checkbox" data-k="active" checked style="width:20px;height:20px"></td><td><button class="del" onclick="this.closest(\'tr\').remove()">🗑</button></td></tr>');};
$('#saveZones').onclick=async()=>{
 const arr=[...document.querySelectorAll('#zoneRows tr')].map(tr=>{const o={};tr.querySelectorAll('[data-k]').forEach(i=>{const k=i.dataset.k;o[k]=i.type==='checkbox'?i.checked:(k==='fee'||k==='free_over'?Number(i.value||0):i.value.trim());});return o;}).filter(z=>z.id);
 try{
  const h=await H();h['Content-Type']='application/json';
  for(const z of arr){await fetch(SUPA_URL+'/rest/v1/shipping_zones?on_conflict=id',{method:'POST',headers:Object.assign(h,{Prefer:'resolution=merge-duplicates,return=minimal'}),body:JSON.stringify(z)});}
  for(const old of ORIG_ZONES){if(!arr.some(z=>String(z.id)===String(old)))await fetch(SUPA_URL+'/rest/v1/shipping_zones?id=eq.'+encodeURIComponent(old),{method:'DELETE',headers:h});}
  logAction('تعديل مناطق الشحن',{count:arr.length});loadZonesAdmin();
  $('#msgZ').textContent='✅ اتحفظ';setTimeout(()=>$('#msgZ').textContent='',2500);
 }catch(e){alert('تعذر الحفظ');}
};
$('#savePay').onclick=()=>{
 const s=load();
 s.payment={cod:{on:$('#pay_cod').checked},instapay:{on:$('#pay_ins').checked,number:$('#pay_ins_n').value.trim()},vodafone:{on:$('#pay_vod').checked,number:$('#pay_vod_n').value.trim()},paymob:{on:$('#pay_pm').checked}};
 save(s);logAction('تعديل طرق الدفع',{});
 $('#msgPay').textContent='✅ اتحفظ';setTimeout(()=>$('#msgPay').textContent='',2500);
};
function fillPayExtra(){
 const s=load(),pay=s.payment||{};
 $('#pay_pm').checked=!!(pay.paymob&&pay.paymob.on);
 const ly=s.loyalty||{};
 $('#ly_on').checked=!!ly.on;$('#ly_per').value=ly.earn_per!=null?ly.earn_per:100;
 $('#ly_val').value=ly.value!=null?ly.value:1;$('#ly_min').value=ly.min!=null?ly.min:50;
 const tx=s.tax||{};
 $('#tx_on').checked=!!tx.on;$('#tx_rate').value=tx.rate!=null?tx.rate:14;$('#tx_vat').value=tx.vat||'';
}
$('#saveExtra').onclick=()=>{
 const s=load();
 s.loyalty={on:$('#ly_on').checked,earn_per:Number($('#ly_per').value||100),value:Number($('#ly_val').value||1),min:Number($('#ly_min').value||50)};
 s.tax={on:$('#tx_on').checked,rate:Number($('#tx_rate').value||14),vat:$('#tx_vat').value.trim()};
 save(s);logAction('تعديل الولاء والضريبة',{});
 $('#msgEx').textContent='✅ اتحفظ';setTimeout(()=>$('#msgEx').textContent='',2500);
};

// customers + subscribers
$('#cuBtn').onclick=async()=>{
 const q=$('#cu_q').value.replace(/\D/g,'');
 if(q.length<8){$('#cuRes').innerHTML='<p class="tiny">اكتب رقم صحيح</p>';return;}
 $('#cuRes').innerHTML='<p class="tiny">جاري البحث...</p>';
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/orders?select=id,created_at,items,total,status&order=created_at.desc&limit=50',{headers:h});
  const rows=await r.json();
  const mine=(rows||[]).filter(o=>String(o.customer_phone||'').replace(/\D/g,'')===q);
  let pts=0;try{const pr=await fetch(SUPA_URL+'/rest/v1/loyalty?phone=eq.'+q+'&select=points',{headers:h});const pj=await pr.json();pts=(pj&&pj[0]&&pj[0].points)||0;}catch(e){}
  $('#cuRes').innerHTML=mine.length?`<p><b>${mine.length}</b> طلبات • ⭐ <b>${pts}</b> نقطة • <a class="link" target="_blank" href="https://wa.me/2${q}">واتساب 💬</a></p>`+mine.map(o=>`<div style="border:1px solid var(--line);border-radius:10px;padding:8px 12px;margin-top:8px;font-size:13px"><b>#${o.id}</b> — ${o.total} EGP — ${o.status} <span class="tiny">${fmtDate(o.created_at)}</span><br>${itemsTxt(o.items)}</div>`).join(''):'<p class="tiny">مفيش طلبات بالرقم ده</p>';
 }catch(e){$('#cuRes').innerHTML='<p class="tiny">تعذر البحث</p>';}
};
async function loadSubs(){
 if(LOCAL_MODE)return;
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/subscribers?select=*&order=created_at.desc&limit=200',{headers:h});
  if(!r.ok)return;
  const rows=await r.json();
  $('#subCount').textContent='('+rows.length+')';
  window._subs=rows;
  $('#subRows').innerHTML=rows.length?rows.map(s=>`<tr><td dir="ltr">${s.email}</td><td class="tiny">${fmtDate(s.created_at)}</td><td><button class="del" onclick="delSub(${s.id})">🗑</button></td></tr>`).join(''):'<tr><td colspan="3" class="tiny">لا مشتركين بعد</td></tr>';
 }catch(e){}
}
window.delSub=async id=>{if(!confirm('تحذف المشترك؟'))return;try{const h=await H();await fetch(SUPA_URL+'/rest/v1/subscribers?id=eq.'+id,{method:'DELETE',headers:h});loadSubs();}catch(e){}};
$('#subCsv').onclick=()=>{const rows=window._subs||[];const csv='email,created_at\n'+rows.map(s=>'"'+(s.email||'')+'","'+(s.created_at||'')+'"').join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='subscribers.csv';a.click();};

// articles
async function loadArts(){
 if(LOCAL_MODE)return;
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/articles?select=slug,title_ar,published&order=created_at.desc',{headers:h});
  if(!r.ok)return;
  const rows=await r.json();
  $('#artRows').innerHTML=rows.length?rows.map(a=>`<tr><td dir="ltr">${a.slug}</td><td>${a.title_ar||''}</td><td>${a.published?'✅':'—'}</td><td style="white-space:nowrap"><button class="ghostb" style="padding:6px 12px" onclick="editArt('${a.slug}')">✏️</button> <button class="del" onclick="delArt('${a.slug}')">🗑</button> <a class="ghostb" style="padding:6px 12px;text-decoration:none" target="_blank" href="article.html?slug=${a.slug}">👁</a></td></tr>`).join(''):'<tr><td colspan="4" class="tiny">لا مقالات — ضيف أول مقال.</td></tr>';
 }catch(e){}
}
$('#addArtBtn').onclick=()=>{['a_slug','a_cover','a_tar','a_ten','a_bar','a_ben'].forEach(id=>$('#'+id).value='');$('#a_pub').checked=false;$('#artEd').style.display='block';window.scrollTo(0,document.body.scrollHeight);};
window.editArt=async slug=>{
 try{const h=await H();const r=await fetch(SUPA_URL+'/rest/v1/articles?slug=eq.'+encodeURIComponent(slug)+'&select=*',{headers:h});const j=await r.json();const a=j&&j[0];if(!a)return;
 $('#a_slug').value=a.slug;$('#a_cover').value=a.cover||'';$('#a_tar').value=a.title_ar||'';$('#a_ten').value=a.title_en||'';$('#a_bar').value=a.body_ar||'';$('#a_ben').value=a.body_en||'';$('#a_pub').checked=!!a.published;
 $('#artEd').style.display='block';}catch(e){}
};
window.delArt=async slug=>{if(!confirm('تحذف المقال؟'))return;try{const h=await H();await fetch(SUPA_URL+'/rest/v1/articles?slug=eq.'+encodeURIComponent(slug),{method:'DELETE',headers:h});logAction('حذف مقال',{slug});loadArts();}catch(e){}};
$('#artSave').onclick=async()=>{
 const slug=$('#a_slug').value.trim().toLowerCase().replace(/\s+/g,'-');
 if(!slug){alert('اكتب الـ slug');return;}
 const body={slug,cover:$('#a_cover').value.trim()||null,title_ar:$('#a_tar').value,title_en:$('#a_ten').value,body_ar:$('#a_bar').value,body_en:$('#a_ben').value,published:$('#a_pub').checked};
 try{
  const h=await H();h['Content-Type']='application/json';
  await fetch(SUPA_URL+'/rest/v1/articles?on_conflict=slug',{method:'POST',headers:Object.assign(h,{Prefer:'resolution=merge-duplicates,return=minimal'}),body:JSON.stringify(body)});
  logAction('حفظ مقال',{slug});loadArts();$('#msgArt').textContent='✅ اتحفظ';setTimeout(()=>$('#msgArt').textContent='',2500);
 }catch(e){alert('تعذر الحفظ');}
};

// bosta
async function loadBosta(){
 if(LOCAL_MODE)return;
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/integrations?provider=eq.bosta&select=secret,extra',{headers:h});
  const j=await r.json();const c=j&&j[0];
  if(c){$('#bs_key').value='';const ex=c.extra||{};$('#bs_city').value=(ex.pickup&&ex.pickup.city)||'Cairo';$('#bs_addr').value=(ex.pickup&&ex.pickup.address)||'';$('#bs_ph').value=(ex.pickup&&ex.pickup.phone)||'';$('#bs_key').placeholder=c.secret?'تم الحفظ ✅ (اتركه فاضي للإبقاء)':'';}
 }catch(e){}
}
$('#saveBosta').onclick=async()=>{
 try{
  const h=await H();h['Content-Type']='application/json';
  const secret=$('#bs_key').value.trim();
  const extra={pickup:{city:$('#bs_city').value.trim()||'Cairo',address:$('#bs_addr').value.trim(),phone:$('#bs_ph').value.trim()}};
  const cur=await (await fetch(SUPA_URL+'/rest/v1/integrations?provider=eq.bosta&select=provider',{headers:h})).json();
  if(cur&&cur.length){
   const body={extra};if(secret)body.secret=secret;
   await fetch(SUPA_URL+'/rest/v1/integrations?provider=eq.bosta',{method:'PATCH',headers:Object.assign(h,{Prefer:'return=minimal'}),body:JSON.stringify(body)});
  }else{
   if(!secret){alert('اكتب مفتاح الـ API');return;}
   await fetch(SUPA_URL+'/rest/v1/integrations',{method:'POST',headers:Object.assign(h,{Prefer:'return=minimal'}),body:JSON.stringify({provider:'bosta',secret,extra})});
  }
  logAction('حفظ إعدادات بوسطة',{});
  $('#bs_key').value='';$('#msgBs').textContent='✅ اتحفظ';setTimeout(()=>$('#msgBs').textContent='',2500);
 }catch(e){alert('تعذر الحفظ');}
};
window.bostaShip=async id=>{
 const o=(ORDERS||[]).find(x=>Number(x.id)===Number(id));if(!o)return;
 if(!confirm('إنشاء شحنة بوسطة للطلب #'+id+'؟'))return;
 try{
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/integrations?provider=eq.bosta&select=secret,extra',{headers:h});
  const j=await r.json();const cfg=j&&j[0];
  if(!cfg||!cfg.secret){alert('حط مفتاح Bosta الأول في تبويب الشحن والدفع');return;}
  const ex=cfg.extra||{},pk=ex.pickup||{};
  const items=o.items||[];
  const body={type:10,
   specs:{packageDetails:{itemsCount:items.reduce((a,i)=>a+Number(i.q||0),0),description:'VARNOTO order #'+o.id},size:'Medium'},
   cod:o.pay_method==='cod'?Number(o.total||0):0,
   dropOffAddress:{cityId:pk.city||'Cairo',zoneId:'',address:{firstLine:pk.address||'',secondLine:'',floor:'',apartment:''},phone:pk.phone||''},
   receiver:{firstName:String(o.customer_name||'Customer').split(' ')[0]||'Customer',lastName:String(o.customer_name||'C').split(' ').slice(1).join(' ')||'-',phone:String(o.customer_phone||'').replace(/\D/g,''),city:o.zone==='alex'?'Alexandria':'Cairo',district:'',address:{firstLine:'',secondLine:'',floor:'',apartment:''}},
   notes:'VARNOTO #'+o.id};
  const dr=await fetch('https://app.bosta.co/api/v2/deliveries',{method:'POST',headers:{Authorization:cfg.secret,'Content-Type':'application/json'},body:JSON.stringify(body)});
  const dj=await dr.json();
  if(!dr.ok){alert('بوسطة رفضت: '+JSON.stringify(dj).slice(0,200));return;}
  const awb=dj.trackingNumber||dj.awb||dj._id||'';
  const h2=await H();h2['Content-Type']='application/json';h2.Prefer='return=minimal';
  await fetch(SUPA_URL+'/rest/v1/orders?id=eq.'+o.id,{method:'PATCH',headers:h2,body:JSON.stringify({tracking:String(awb)})});
  logAction('شحنة بوسطة',{id,awb:String(awb)});
  alert('✅ اتعملت الشحنة — التتبع: '+awb);loadOrders();
 }catch(e){alert('تعذر إنشاء الشحنة');}
};

// whatsapp notify (per-device settings, secrets never touch the cloud)
function ntGet(){try{return JSON.parse(localStorage.getItem('varnoto_notify'))||{};}catch(e){return{};}}
function ntFill(){const n=ntGet();$('#nt_on').value=n.on?'1':'0';$('#nt_tok').value=n.tok||'';$('#nt_ins').value=n.ins||'';$('#nt_to').value=n.to||'';}
$('#ntSave').onclick=()=>{localStorage.setItem('varnoto_notify',JSON.stringify({on:$('#nt_on').value==='1',tok:$('#nt_tok').value.trim(),ins:$('#nt_ins').value.trim(),to:$('#nt_to').value.trim()}));$('#ntMsg').textContent='✅ اتحفظ على هذا الجهاز';setTimeout(()=>$('#ntMsg').textContent='',2500);};
async function ntSend(text){
 const n=ntGet();if(!n.on||!n.tok||!n.ins||!n.to)return false;
 try{
  const r=await fetch('https://api.ultramsg.com/'+encodeURIComponent(n.ins)+'/messages/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:n.tok,to:n.to,body:text})});
  return r.ok;
 }catch(e){return false;}
}
$('#ntTest').onclick=async()=>{$('#ntMsg').textContent='جاري الإرسال...';const ok=await ntSend('✅ تجربة تنبيهات VARNOTO — الإعداد شغال');$('#ntMsg').textContent=ok?'✅ وصلت الرسالة':'❌ فشل — راجع البيانات';};
function notifyOrder(o){
 const n=ntGet();if(!n.on)return;
 ntSend('🧾 طلب جديد #'+o.id+' — '+(o.total||'')+' EGP\n'+(o.customer_name||'')+' — '+(o.customer_phone||''));
}

// uploads (device → Supabase Storage, auto-resized)
async function prepImage(file){
 try{
  const bmp=await createImageBitmap(file);
  const maxDim=1400, sc=Math.min(1,maxDim/Math.max(bmp.width,bmp.height));
  if(sc>=1&&file.size<600*1024) return file;
  const c=document.createElement('canvas');
  c.width=Math.round(bmp.width*sc);c.height=Math.round(bmp.height*sc);
  c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);
  const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',0.85));
  if(!blob) return file;
  return new File([blob],file.name.replace(/\.[^.]+$/,'')+'.jpg',{type:'image/jpeg'});
 }catch(e){return file;}
}
async function uploadFiles(files,onOne){
 const c=sb(); if(!c){alert('سجل دخول المدير أولاً');return [];}
 const urls=[];
 for(const f0 of files){
  try{
   const f=await prepImage(f0);
   const ext=(f.name.split('.').pop()||'jpg').toLowerCase().slice(0,4);
   const path='products/'+Date.now().toString(36)+'-'+Math.floor(Math.random()*1e6)+'.'+ext;
   const up=await c.storage.from('product-images').upload(path,f,{contentType:f.type||'image/jpeg'});
   if(up.error){alert('فشل الرفع: '+up.error.message);continue;}
   const pu=c.storage.from('product-images').getPublicUrl(path);
   urls.push(pu.data.publicUrl); if(onOne)onOne(pu.data.publicUrl);
  }catch(e){alert('فشل الرفع');}
 }
 return urls;
}

// abandoned carts
function cartAutoGet(){try{return localStorage.getItem('varnoto_cartauto')==='1';}catch(e){return false;}}
async function loadCarts(){
 if(LOCAL_MODE)return;
 try{
  $('#cartAuto').checked=cartAutoGet();
  const h=await H();
  const r=await fetch(SUPA_URL+'/rest/v1/carts?select=*&order=updated_at.desc&limit=100',{headers:h});
  if(!r.ok)return;
  const rows=await r.json();
  const live=(rows||[]).filter(c=>(c.items||[]).length);
  const withPhone=live.filter(c=>c.phone);
  const b=$('#cartBdg');b.style.display=withPhone.length?'inline-block':'none';b.textContent=withPhone.length;
  $('#cartRows').innerHTML=live.length?live.map(c=>`<tr>
   <td class="tiny">${fmtDate(c.updated_at)}</td>
   <td dir="ltr">${c.phone||'<span class="tiny">بدون رقم</span>'}</td>
   <td style="font-size:12px">${itemsTxt(c.items)}</td><td><b>${c.total} EGP</b></td>
   <td>${c.reminded?'✅':'—'}</td>
   <td style="white-space:nowrap">${c.phone?`<a class="ghostb" style="padding:6px 12px;text-decoration:none" target="_blank" href="https://wa.me/2${String(c.phone).replace(/\D/g,'')}?text=${encodeURIComponent('فاكر السلة بتاعتك في VARNOTO؟ 🛒 لسه محفوظة — كمل طلبك قبل ما تخلص: https://mmetwily1-sudo.github.io/varnoto/')}">💬 تذكير</a> <button class="ghostb" style="padding:6px 12px" onclick="markReminded('${c.session_id}')">✓</button>`:''}</td></tr>`).join('')
   :'<tr><td colspan="6" class="tiny">مفيش سلال متروكة — كله تمام 👌</td></tr>';
 }catch(e){}
}
window.markReminded=async sid=>{
 try{const h=await H();h['Content-Type']='application/json';h.Prefer='return=minimal';
  await fetch(SUPA_URL+'/rest/v1/carts?session_id=eq.'+encodeURIComponent(sid),{method:'PATCH',headers:h,body:JSON.stringify({reminded:true})});
  loadCarts();}catch(e){}
};
$('#cartAuto').onchange=e=>{try{localStorage.setItem('varnoto_cartauto',e.target.checked?'1':'0');}catch(err){}};
async function autoRemind(o){
 if(!cartAutoGet())return;
 const n=ntGet();if(!n.on||!n.tok||!n.ins||!n.to)return;
 // notify the MANAGER that a cart was abandoned (customer number may be unknown yet)
 ntSend('🛒 سلة متروكة: '+(o.total||'')+' EGP — راجع تبويب السلال');
}

// backup
$('#expBtn').onclick=()=>{const blob=new Blob([localStorage.getItem(KEY)||'{}'],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='varnoto-store-backup.json';a.click();};
$('#expFull').onclick=async()=>{
 try{
  const h=await H();
  const get=async u=>{const r=await fetch(SUPA_URL+'/rest/v1/'+u,{headers:h});return r.ok?await r.json():[];};
  const dump={exported_at:new Date().toISOString(),
   store:JSON.parse(localStorage.getItem(KEY)||'{}'),
   orders:await get('orders?select=*&order=id'),
   coupons:await get('coupons?select=*'),
   reviews:await get('reviews?select=*&order=id&limit=500'),
   subscribers:await get('subscribers?select=*&order=id'),
   articles:await get('articles?select=*'),
   zones:await get('shipping_zones?select=*'),
   log:await get('change_log?select=*&order=id.desc&limit=200')};
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(dump)],{type:'application/json'}));a.download='varnoto-full-backup.json';a.click();
 }catch(e){alert('تعذر النسخ الشامل');}
};
$('#impFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);save(o);logAction('استرجاع نسخة',{});location.reload();}catch(err){alert('ملف غير صالح');}};r.readAsText(f);};
$('#resetBtn').onclick=()=>{if(confirm('متأكد؟ هيرجع كل حاجة للوضع الأصلي.')){localStorage.removeItem(KEY);location.reload();}};

function fillAll(){
 const steps=[['products',renderRows],['sections',renderSecs],['stock',renderStockAlerts],['theme',fillTheme],['header/footer',fillHF],['pages',fillPg],['seo',fillSEO],['contact',fillC],['pay-extra',fillPayExtra]];
 steps.forEach(([name,fn])=>{ try{fn();}catch(e){showErr(name+': '+(e&&e.message||e));} });
 selfTest();
}
}
fillAll();
