//////////////////////////////////////////////////////////////////////
//                             main.js                              //
//////////////////////////////////////////////////////////////////////
//  This houses the stuff that I don't know what to do with yet.    //
//  We don't really need a 'main', so perhaps this should be a      //
//  'listeners.js' instead?                                         //
//////////////////////////////////////////////////////////////////////

//var ui = data.interface;

//if (nT.storage.get('interface','enBgUrl') && nT.storage.get('interface','bgUrl') != ''){
//  document.body.setAttribute('style','background:none;');
//}

//addScript('js/include.js');


//var obj = nT.storage.obj();
//var ui = obj.interface;
//var cred = obj.credentials;

document.body.setAttribute('onload','');
if (!localStorage.layoutChange) urlCheck(['LinkSelect.asp','login.aspx'],tinyHeader,true);
//if (!localStorage.fillDate) urlCheck('EquipmentDetail.asp',fillDate);
if (!localStorage.tabReturn) urlCheck('LinkSelect.asp',tabReturn);
if (!localStorage.closeListen) urlCheck('LinkSelect.asp',closeListen);
if (localStorage.addLinks) urlCheck('PortList.asp',addLinks);
if (!localStorage.fixurl) urlCheck('PortList.asp',setObjId);
//if (!localStorage.autoDate) urlCheck('PortList.asp',autoDate);
if (!localStorage.checkFix) checkFix();
if (!localStorage.logIn) urlCheck('Login',forceForm);

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if (request.data == "reload") {
      sendResponse({msg: "Callback from background tab"});
      var newUrl = decodeURIComponent(window.location.search)
                    .replace('?ForceLogin=true&ReturnURL=','')
                    .replace('?ReturnUrl=','');
        
      setTimeout(function(){ 
        window.location = newUrl;
      },500);
    }
});

if (window.location.pathname.toLowerCase() == "/login/login.aspx" ) {
  document.body.innerHTML = "";
  document.title='Magic Smoke Goes Here';
  chrome.extension.sendMessage({data: "loginPage"}, function(response) {
    console.log(response);
  });
}
