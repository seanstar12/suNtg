//////////////////////////////////////////////////////////////////////
//                             main.js                              //
//////////////////////////////////////////////////////////////////////
//  This houses the stuff that I don't know what to do with yet.    //
//  We don't really need a 'main', so perhaps this should be a      //
//  'listeners.js' instead?                                         //
//////////////////////////////////////////////////////////////////////


//if (nT.storage.get('interface','enBgUrl') && nT.storage.get('interface','bgUrl') != ''){
//  document.body.setAttribute('style','background:none;');
//}
//console.log(document.scripts[1]);
urlCheck('PortList.asp',rmPageScript);
addScript('js/jquery-1.8.3.min.js');
addScript('js/functions.js');
addScript('js/bugFix.js');

chrome.extension.onMessage.addListener(
  function(req, sender, sendResponse) {
//    
//    //if (req.data == "reqFunc"){
//    //  var ui = req.interface;
//    //  var bug = req.bugs;
//    //  
//    //  if (ui.enCss == 1){
//    //    localStorage.enCss = 1;
//    //  } else if (ui.enCss == 0) {
//    //    localStorage.enCss = 0;
//    //  }
//    //  document.body.setAttribute('onload','');
//    //  if (ui.tinyHeader == 1) urlCheck(['LinkSelect.asp','login.aspx'],tinyHeader,true);
//    //  $('.header').show();
//    //  if (ui.tabReturn == 1) urlCheck('LinkSelect.asp',tabReturn);
//    //  if (ui.switchShortcuts == 1) urlCheck('PortList.asp',addLinks);
//    //  if (ui.objIdUrl == 1) urlCheck('PortList.asp',setObjId);
//    //  //if (!localStorage.autoDate) urlCheck('PortList.asp',autoDate);
//    //  //if (!localStorage.fillDate) urlCheck('EquipmentDetail.asp',fillDate);
//    //  //if (bug.checkFix == 1) checkFix();
//    //  if (ui.forceAutoCompleteLogin == 1) urlCheck('Login',forceForm);
//    //}
//    
    if (req.data == "reload") {
      sendResponse({msg: "Received Reload message. Reloading page."});
      var newUrl = decodeURIComponent(window.location.search)
                    .replace('?ForceLogin=true&ReturnURL=','')
                    .replace('?ReturnUrl=','');
        
      setTimeout(function(){ 
        window.location = newUrl;
      },300);
    }
});

if (window.location.pathname.toLowerCase() == "/login/login.aspx" ) {
  document.body.innerHTML = "";
  document.title='Magic Smoke Goes Here';
  chrome.extension.sendMessage({data: "loginPage"}, function(response) {
    console.log(response);
  });
}
