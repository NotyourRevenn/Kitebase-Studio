var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,b=document.body,tg=document.getElementById('tg');
function menu(o){b.classList.toggle('open',o);tg.setAttribute('aria-expanded',o)}
tg.onclick=function(){menu(!b.classList.contains('open'))};
document.querySelectorAll('#menu a').forEach(function(a){a.onclick=function(){menu(false)}});
addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
var rv=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});rv.forEach(function(e){io.observe(e)});
  var ls=document.querySelectorAll('.links a'),so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)ls.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-40% 0px -50% 0px'});
  document.querySelectorAll('#about,#services,#work,#faq').forEach(function(s){so.observe(s)});
}else{rv.forEach(function(e){e.classList.add('in')})}
var tl=document.getElementById('tl');tl.innerHTML=tl.textContent.trim().split(/\s+/).map(function(w){return '<span class="w">'+w+'</span>'}).join(' ');
var ws=tl.querySelectorAll('.w');
if(reduce||!('IntersectionObserver' in window)){tl.classList.add('done')}else{
  var wo=new IntersectionObserver(function(es){var k=0;es.forEach(function(e){if(e.isIntersecting){e.target.style.transitionDelay=(k++*60)+'ms';e.target.classList.add('on');wo.unobserve(e.target)}})},{rootMargin:'0px 0px -35% 0px'});ws.forEach(function(w){wo.observe(w)});
}
var f=document.getElementById('f');
function chk(id,eid,ok,msg){var i=f.elements[id],er=document.getElementById(eid);er.textContent=ok(i.value)?'':msg;i.setAttribute('aria-invalid',ok(i.value)?'false':'true');return ok(i.value)}
if(f){
  f.addEventListener('submit',function(ev){ev.preventDefault();
    var a=chk('n','en',function(v){return v.trim().length>1},'Please enter your name.'),
    c=chk('e','ee',function(v){return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim())},'Please enter a valid work email.'),
    d=chk('m','em',function(v){return v.trim().length>9},'Please share a brief note on what you would like to build.');
    if(!(a&&c&&d))return;
    var sb=document.getElementById('sb');sb.disabled=true;sb.textContent='Transmitting audit request...';
    var x=new FormData(f);
    var nameVal = x.get('n') ? x.get('n').trim() : 'there';
    var emailVal = x.get('e') ? x.get('e').trim() : 'your email';
    setTimeout(function(){
      f.style.display='none';
      var ok=document.getElementById('ok');
      if(ok){
        var cName = document.getElementById('client-name');
        var cEmail = document.getElementById('client-email');
        if(cName) cName.textContent = nameVal;
        if(cEmail) cEmail.textContent = emailVal;
        ok.hidden=false;
      }
    },600);
  });
}
(function(){
  if(reduce||!matchMedia('(pointer:fine)').matches)return;
  var cur=scrollY,target=scrollY,raf=0;
  function mx(){return document.documentElement.scrollHeight-innerHeight}
  function tick(){cur+=(target-cur)*.12;if(Math.abs(target-cur)<.5){cur=target;scrollTo({top:cur,behavior:'instant'});raf=0;return}scrollTo({top:cur,behavior:'instant'});raf=requestAnimationFrame(tick)}
  addEventListener('wheel',function(e){if(e.ctrlKey||e.deltaX||Math.abs(e.deltaY)<40||document.body.classList.contains('open')||(e.target.closest&&e.target.closest('textarea')))return;e.preventDefault();var d=e.deltaMode===1?e.deltaY*32:e.deltaY;target=Math.max(0,Math.min(mx(),target+d));if(!raf)raf=requestAnimationFrame(tick)},{passive:false});
  addEventListener('scroll',function(){if(!raf){cur=target=scrollY}},{passive:true});
})();