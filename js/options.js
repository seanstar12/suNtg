function restoreVars() {
  if (storage.local.get({css:true} function(data) {
    document.getElementById('css').checked = data.css;
  }
}

chrome.storage.local.set({'css':true}, function() { alert(chrome.storage.local.get('css'))});

function storeVars() {
  
  localStorage.css = document.getElementById('css').checked;
  localStorage.dateVar = document.getElementById('date').checked;

  var info = document.getElementById('status');
  info.innerHTML = "Saved Stuffs";
  setTimeout(function() {
    info.innerHTML = "";
  }, 400);
}

restoreVars();
//document.addEventListener('DOMContentReady', restoreVars);
document.querySelector('#save').addEventListener('click', storeVars);
