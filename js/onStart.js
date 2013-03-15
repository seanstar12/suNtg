chrome.extension.onMessage.addListener( function(request,sender,response) {
  if (request.shortKeys == 1) {
    setOnKeys();
  }
  if (request.cleanTheme == 1){
    addCss('css/clear.css');
  }
  // Login Page > Force autocomplte on 
  if ((document.location.pathname.toLowerCase()).indexOf('/login/login.aspx') > -1){
      document.title = "OHai";
//      document.body.innerHTML = ""; 
    if (request.formAuto == 1){
      document.forms.aspnetForm.setAttribute('autocomplete','on'); 
      if (request.debug == 1) console.log('Forcing autocomplete On.');
    }
  }
  if ((document.location.pathname.toLowerCase()).indexOf('accessdenied.aspx') > -1){
    document.body.innerHTML= "";
  }
});


addScript('js/jquery-1.8.3.min.js');
addScript('js/bootbox.min.js');
addScript('js/bootstrap.js');
addScript('js/functions.js');
//addScript('js/jquery.form.js');
addCss('css/bootstrap.css');
addCss('css/ntgTool.css');
