var bg = {};
bg = {
  
  authPageCheck: function(tabId, changeInfo, tab){
     // set's icon and checks for auth page. made no sense to have two listeners
     // when they both run on every page.

    var temp = tab.url.toLowerCase();
    var siteUrl = 'https://ntg.missouristate.edu'
    
    if (tab.url.indexOf('ntg') > -1 && changeInfo.status == 'loading') {
        chrome.pageAction.show(tabId);
    }
    
    if (temp.indexOf('login/login.aspx') > -1 && changeInfo.status == 'loading') {
      var tabArgs = null;
      
      if ((tab.url).indexOf('URL=') > 0){
        //if (debug == 1) 
        console.log('Login.aspx: New Url='+decodeURIComponent((tab.url).split('URL=')[1]));
        tabArgs = {url:siteUrl+decodeURIComponent((tab.url).split('URL=')[1])};
      } 
      else if ((tab.url).indexOf('Url=') > 0){
        //if (debug == 1) 
        console.log('Login.aspx: New Url='+decodeURIComponent((tab.url).split('ReturnUrl=')[1]));
        tabArgs = {url:siteUrl+decodeURIComponent((tab.url).split('ReturnUrl=')[1])};
      }

      //if (autoLogin == 1) 
      nT.msu.initLogin(bg.pageRefresh(tabArgs));
    }

    if (temp.indexOf('accessdenied.aspx') > -1 ) {
      //if (debug == 1) 
      console.log('AccessDenied.aspx: New Url='+((tab.url).split('Referer=')[1]));
      bg.pageRefresh({url:siteUrl+((tab.url).split('Referer=')[1])});
    }
  },

  pageRefresh: function(tabArgs){
    console.log('pageRefresh');
    chrome.tabs.update(tabArgs);
  },

  onAlarm: function(alarm){
    if(debug ==1) {
      console.log('onAlarm:> '+JSON.stringify(alarm));
    }
    if (alarm.name == 'keepAliveTimed'){
      chrome.alarms.clearAll();
    }
    else if (alarm.name == 'keepAlive'){
      nT.msu.isLoggedIn(bg.onAlarmCallback);
    }
  },

  onAlarmCallback: function(value) {
    if (value == 1){
      nT.msu.refreshAuthCookies();
    } else if(value == 0){
      if (nT.storage.get('session','autoLogin') == 1){ 
        nT.msu.initLogin(nT.msu.refreshAuthCookies);
      }
      else {
        chrome.tabs.query({url:'https://ntg.missouristate.edu/Login/login.aspx*'},function(stuff){
          if (stuff[0] == null){ 
            if (3== 1){
              console.log('I need credentials to log you back in. Log in here:');
              alert('You\'re Logged Out! Imma open up the login page for you. ');
            }
            if (nT.storage.get('session','newTab') == 1){
              chrome.tabs.create({url:'https://ntg.missouristate.edu/Login/login.aspx'});
            }
          }
        });
      }
    }
  },

  loggedInCallBack: function(value){
    if(value == 0){ 
      nT.msu.initLogin();
    }
  },

  init: function(){
    //chrome.tabs.create({url:'background.html'});
    
    console.log('init:');
     
    localStorage.loginCount = 0;
    if (localStorage.settings == null){
      nT.storage.defaults();
    }
    if (nT.storage.get('session','keepAlive') == 1){
      if (nT.storage.get('session','keepAliveTimeout') > 0){
        chrome.alarms.create('keepAliveTimed',
          {when:(Date.now() + (nT.storage.get('session','keepAliveTimeout')*60000))});
      }
      chrome.alarms.create('keepAlive',{periodInMinutes: Number(nT.storage.get('session','keepAliveRate'))});
    }
    if (nT.storage.get('session','autoLogin') == 1) {
      nT.msu.isLoggedIn(bg.loggedInCallBack);
    }
    if(debug == 1) chrome.alarms.getAll(function(alarms){console.log(JSON.stringify(alarms));});
  }
}

function onInstalled(details){
  if (localStorage.settings == null) nT.storage.defaults();
   
  if (details.reason == "update"){
    chrome.alarms.clearAll();
    bg.init();

    //resets the ntgTool icon in the bar. (it gets set on page update so we have to force it here)
    chrome.tabs.query({active:true,windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tab){
      chrome.pageAction.show(tab[0].id);
    });
  } 
  else if (details.reason == "chrome_update"){
    chrome.alarms.clearAll();
    bg.init();
  }
  else if (details.reason == "install"){
    chrome.tabs.create({url:'options.html'});
    bg.init();
  }
  
  console.log('onInstalled: ' + details.reason);
}

function onStartup(){
  console.log('Starting NTG Tool');
  bg.init();
}

if (localStorage.settings != null){ 
  //var debug = nT.storage.get('other','debug');
  var debug = 1;
  //var autoLogin = 1;

  var autoLogin = nT.storage.get('session','autoLogin');
  //console.log(nT.storage.get('session','autoLogin'));
}

chrome.runtime.onStartup.addListener(onStartup);
chrome.runtime.onInstalled.addListener(onInstalled);
chrome.alarms.onAlarm.addListener(bg.onAlarm);
chrome.tabs.onUpdated.addListener(bg.authPageCheck);

chrome.extension.onMessage.addListener(function(msg,sender,sendResponse) {
  if (msg.data == "optionsSave"){
    chrome.alarms.clearAll();
    bg.init();
  }
  else if (msg.data = "reqLogout"){
    nT.msu.logOut();
    sendResponse({msg:'Loggin out'});
  }
  else if (msg.data = "reqFeatures"){
    sendResponse(nT.storage.settings());
  }
});
