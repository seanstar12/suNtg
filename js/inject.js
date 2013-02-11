//////////////////////////////////////////////////////////////////////
//                            inject.js                             //
//////////////////////////////////////////////////////////////////////
//  This file runs code for the run_at:doccument_start              //
//  It needs to be super slim. So leave it alone.                   //
//////////////////////////////////////////////////////////////////////

if (localStorage.enCss == 1) addCss('css/cssinject.css');

chrome.extension.onMessage.addListener(
  function(req, sender, sendResponse) {
    
    if (req.data == "reqFunc"){
      var ui = req.interface;
      var bug = req.bugs;
      
      if (ui.enCss == 1){
        localStorage.enCss = 1;
      } else if (ui.enCss == 0) {
        localStorage.enCss = 0;
      }
      document.body.setAttribute('onload','');
      if (ui.tinyHeader == 1) urlCheck(['LinkSelect.asp','login.aspx'],tinyHeader,true);
      $('.header').show();
      if (ui.tabReturn == 1) urlCheck('LinkSelect.asp',tabReturn);
      if (ui.switchShortcuts == 1) urlCheck('PortList.asp',addLinks);
      if (ui.objIdUrl == 1) urlCheck('PortList.asp',setObjId);
      //if (!localStorage.autoDate) urlCheck('PortList.asp',autoDate);
      //if (!localStorage.fillDate) urlCheck('EquipmentDetail.asp',fillDate);
      //if (bug.checkFix == 1) checkFix();
      if (ui.forceAutoCompleteLogin == 1) urlCheck('Login',forceForm);
    }
    
    else if (req.data == "reload") {
      sendResponse({msg: "Received Reload message. Reloading page."});
      var newUrl = decodeURIComponent(window.location.search)
                    .replace('?ForceLogin=true&ReturnURL=','')
                    .replace('?ReturnUrl=','');
        
      setTimeout(function(){ 
        window.location = newUrl;
      },300);
    }
});
