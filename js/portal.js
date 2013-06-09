function init(v) {
  switch(v.id) {
    case 'reload':
      chrome.runtime.reload();
      break;
    case 'logout':
      nT.msu.logOut();
      break;
    case 'settings':
      nT.portal.launchSettings();
      break;
  }

}

function getUrlVar() {
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(x,y,val){
    console.log(x);
    console.log(y);
    console.log(val);
    return val;
  });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


document.addEventListener('DOMContentLoaded', init(getUrlVars()));
