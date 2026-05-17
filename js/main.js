// Mobile nav toggle
(function(){const subnav=document.querySelector('.site-subnav');const toggle=document.querySelector('.menu-toggle');if(subnav&&toggle){toggle.addEventListener('click',()=>{const e=subnav.getAttribute('aria-expanded')==='true';subnav.setAttribute('aria-expanded',String(!e));toggle.setAttribute('aria-expanded',String(!e));});}})();

// Gallery nav dropdown
(function(){
  var items=document.querySelectorAll('.nav-has-dropdown');
  items.forEach(function(item){
    var btn=item.querySelector('.nav-dropdown-toggle');
    if(!btn)return;
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var open=item.classList.toggle('open');
      btn.setAttribute('aria-expanded',String(open));
    });
  });
  document.addEventListener('click',function(){
    document.querySelectorAll('.nav-has-dropdown.open').forEach(function(item){
      item.classList.remove('open');
      var btn=item.querySelector('.nav-dropdown-toggle');
      if(btn)btn.setAttribute('aria-expanded','false');
    });
  });
})();