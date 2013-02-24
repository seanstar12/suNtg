chrome.extension.sendMessage({data:'reqFeatures'}, function(rsp){
  if (rsp.cleanTheme == 1){
    addCss('css/clear.css');
  }
  // Login Page > Force autocomplte on 
  if ((document.location.pathname.toLowerCase()).indexOf('/login/login.aspx') > -1){
    if (rsp.formAuto == 1){
      document.forms.aspnetForm.setAttribute('autocomplete','on'); 
      if (rsp.debug == 1) console.log('Forcing autocomplete On.');
    }
  }
});

addScript('js/jquery-1.8.3.min.js');
addScript('js/bootstrap.js');
addScript('js/functions.js');
addScript('js/jquery.form.js');
addCss('css/bootstrap.css');
addCss('css/ntgTool.css');
