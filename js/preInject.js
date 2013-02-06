var code = function(){
  document.body.style.display = 'none';
  console.log('display = none');
}

var script = document.createElement('script');
script.textContent = '(' + code + ')()';

setTimeout(function(){
  document.head.appendChild(script);
}, 1);
