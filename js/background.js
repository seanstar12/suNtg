var bg = {};
bg = {
  
  setIcon: function(tabId, changeInfo, tab){
    if (tab.url.indexOf('ntg.missouristate') > -1) {
      if (changeInfo.status === 'loading'){
        chrome.pageAction.show(tabId);
        chrome.tabs.sendMessage(tab.id,nT.storage.config(), function(re){});
      }
    }
  },
  
  authPageCheck: function(tabId, changeInfo, tab){
    var temp = tab.url.toLowerCase();
    var siteUrl = 'https://ntg.missouristate.edu'
    if (temp.indexOf('login/login.aspx') > -1 ) {
      var tabArgs = null;
      
      if ((tab.url).indexOf('URL=') > 0){
        if (debug == 1) console.log('Login.aspx: New Url='+decodeURIComponent((tab.url).split('URL=')[1]));
        tabArgs = {url:siteUrl+decodeURIComponent((tab.url).split('URL=')[1])};
      } 
      else if ((tab.url).indexOf('Url=') > 0){
        if (debug == 1) console.log('Login.aspx: New Url='+decodeURIComponent((tab.url).split('ReturnUrl=')[1]));
        tabArgs = {url:siteUrl+decodeURIComponent((tab.url).split('ReturnUrl=')[1])};
      }

      if (autoLogin == 1) nT.msu.logIn(bg.pageRefresh(tabArgs));
    }
    if (temp.indexOf('accessdenied.aspx') > -1 ) {
      if (debug == 1) console.log('AccessDenied.aspx: New Url='+((tab.url).split('Referer=')[1]));
      bg.pageRefresh({url:siteUrl+((tab.url).split('Referer=')[1])});
    }
  },

  pageRefresh: function(tabArgs){
    console.log('pageRefresh');
    //console.log(tabArgs);
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
      nT.msu.loggedIn(bg.onAlarmCallback);
    }
  },

  onAlarmCallback: function(value) {
    if (value == 1){
      nT.msu.refresh();
    } else if(value == 0){
      if (nT.storage.get('session','autoLogin') == 1){ 
        nT.msu.logIn();
      }
      else {
        chrome.tabs.query({url:'https://ntg.missouristate.edu/Login/login.aspx*'},function(stuff){
          if (stuff[0] == null){ 
            if (nT.storage.get('other','nag') == 1){
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
    if(value == 0) nT.msu.logIn();
  },

  init: function(){
    //chrome.tabs.create({url:'background.html'});
    if (nT.storage.get('other','idle') == 1) {
      clearInterval(1);
      clearInterval(2);

      var t = Number(nT.storage.get('other','idleCheckRate'));
      document.addEventListener('DOMContentLoaded', setInterval(checkState, t), false);
      chrome.idle.onStateChanged.addListener(function(state) {
        if (debug == 1) console.log('idle.onStateChangedstate: '+state);
      });
    }
    localStorage.loginCount = 0;
    if (localStorage.settings == null){
      nT.storage.defaults();
    }
    if (nT.storage.get('session','keepAlive') == 1){
      if (nT.storage.get('session','keepAliveTimeout') > 0){
        chrome.alarms.create('keepAliveTimed',
          {when:(Date.now() + (nT.storage.get('session','keepAliveTimeout')*60000))} 
        );
      }
      chrome.alarms.create('keepAlive',{periodInMinutes: Number(nT.storage.get('session','keepAliveRate'))});
    }
    if (autoLogin == 1) {
      nT.msu.loggedIn(bg.loggedInCallBack);
    }
    if(debug == 1) chrome.alarms.getAll(function(alarms){console.log(alarms);});
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
  }
  
  if (nT.storage.get('other','debug') == 1) console.log('onInstalled: ' + details.reason);
}

function onStartup(){
  if (debug == 1) console.log('Starting NTG Tool');
  bg.init();
}

function suspend(){
  if (localStorage.loggedIn == 1){
    chrome.alarms.clearAll();
    if (nT.storage.get('other','idle') == 1) {
      clearInterval(1);   //Used for 'DOMContentLoaded' setInterval(checkState) 
    }
    nT.msu.logOut(); 
     
    chrome.tabs.update({url:'https://ntg.missouristate.edu'});
    localStorage.loggedIn = 0;
    
    console.log('Alarms are gone and you\'re logged out!');
  }
  else if (localStorage.loggedIn == 0){
    bg.init();
    setTimeout(function(){
    console.log('loggin in');
      chrome.tabs.update({url:'https://ntg.missouristate.edu/Tools/Default.aspx'});
    }, 1500);
  }
}

function checkState(){
  chrome.idle.queryState(Number(nT.storage.get('other','idleTimeout')), function(e){
    if (nT.storage.get('other','debug') == 1) {
      console.log('Chrome State: '+e);
    }
  });
}

if (localStorage.settings != null){ 
  var debug = nT.storage.get('other','debug');
  var autoLogin = nT.storage.get('session','autoLogin');
}

chrome.tabs.onUpdated.addListener(bg.setIcon);
chrome.tabs.onUpdated.addListener(bg.authPageCheck);
chrome.pageAction.onClicked.addListener(suspend);
chrome.runtime.onStartup.addListener(onStartup);
chrome.runtime.onInstalled.addListener(onInstalled);
chrome.alarms.onAlarm.addListener(bg.onAlarm);
//chrome.runtime.onSuspend.addListener(suspend);

chrome.extension.onMessage.addListener(function(msg,sender,sendResponse) {
  if (msg.data == "optionsSave"){
    chrome.alarms.clearAll();
    bg.init();
  }
  else if (msg.data = "reqFeatures"){
    sendResponse(nT.storage.config());
  }
});


