function checkForURL(tabId, changeInfo, tab) {
  if (tab.url.indexOf('ntg.missouristate') > -1) {
    chrome.pageAction.show(tabId);

      var data = nT.storage.obj();
      data.credentials = "";
      data.data = "reqFunc";
      setTimeout(function(){
        chrome.tabs.sendMessage(tab.id, data,function(response){});
      }, 200);
  }
}

function msuRefresh(){
  $.ajax({
    type: 'GET',
    cache: false,
    url: 'https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag=X3604&'+Date.now(),
    success: function () {
      var date = new Date();
      console.log('MSU Refresh with success: '+ date.toTimeString());
    },
    error: function(){
      console.log(xmlhttp);
      console.log("Returned Login Page -- We Have Failed.");
      localStorage.requestFailureCount ++;
    }
  });
}

function loggedIn(){
  if (localStorage.hasSettings){
    $.ajax({
      type: 'GET',
      url: 'https://ntg.missouristate.edu/Tools/Default.aspx',
      success: loggedInSuccess,
    });
  }
}

function loggedInSuccess(data) {
    
    data = data.replace(/<script(.|\s)*?\/script>/g, '');
    data = data.replace(/<a(.|\s)*?\/a>/g, '');
    //console.log(data);
    if ($('#ctl00_MainContent_UserID',data).length > 0 ) {
      localStorage.loggedIn = false;
      console.log('Attempting Log In');
      msuGet();
      //console.log('Ran msuGet()');
    } else  {
      localStorage.loggedIn = true;
      //console.log('You\'re logged in.');
      msuRefresh();
    }
}

function msuGet() {
  //console.log('Getting Session Vars');
  if (nT.storage.get('credentials','username').length > 3 && nT.storage.get('credentials','password').length > 3) {
    
    $.ajax({
      url: 'https://ntg.missouristate.edu/Login/Login.aspx?ForceLogin=true',
      success: function(req) { msuGetProcess(req); },
    });
  }
  else chrome.tabs.create({url: "options.html"});
}

function msuGetProcess(req) {
  console.log('msuGet -> msuGetProcess');
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = req.replace(/<img(.|\s)*?\/>/g, '');
  tempDiv.innerHTML = req.replace(/<a(.|\s)*?\/a>/g, '');
  tempDiv.innerHTML = req.replace(/<script(.|\s)*?\/script>/g, '');
  
  // tempDiv now has a DOM structure:
  tempDiv.childNodes;

  localStorage.eventval = tempDiv.querySelector('#__EVENTVALIDATION').value;
  localStorage.viewstate = tempDiv.querySelector('#__VIEWSTATE').value;
  
//  console.log(localStorage.eventval);
//  console.log(localStorage.viewstate);

  // remove unneeded div
  delete tempDiv;
  
  msuPost();
}

function msuPost(){
  console.log('msuGetProcess -> msuPost()');
  var req = $.ajax({
    type: 'POST',
    xhrFields: {
            withCredentials: true
    },
    url: 'https://ntg.missouristate.edu/Login/Login.aspx',
    data: {
      '__LASTFOCUS':'',
      '__VIEWSTATE':localStorage.viewstate,
      '__EVENTTARGET':'',
      '__EVENTARGUMENT':'',
      '__EVENTVALIDATION':localStorage.eventval,
      'ctl00$MainContent$UserID':nT.storage.get('credentials','username'),
      'ctl00$MainContent$Password':nT.storage.get('credentials','password'), 
      'ctl00$MainContent$ImageButton1.x':'15',
      'ctl00$MainContent$ImageButton1.y':'23'
    },
    success :  function(callback) { 
        console.log(req.getAllResponseHeaders());
        console.log('msuGetProcess:success');
        localStorage.loginCount++;
        localStorage.loggedIn = true;
    }, 
  });
}  

function onInit() {
  //console.log('Initializing Plugin');
  localStorage.loggedIn = false;
  localStorage.loginCount = 0;
  //localStorage.initTime = Number(Date.now());
  //localStorage.quitTime = Number(Number(Date.now()) + Number(nT.storage.get('session','keepAliveTimeout')*60));
  //console.log("Init: "+Number(localStorage.initTime) + " Quit: "+Number(localStorage.quitTime));
  //console.log("Quit - Init: " + (localStorage.quitTime - localStorage.initTime));
  startRequest({scheduleRequest:true});
  
  chrome.alarms.create('watchdog', {periodInMinutes: 6}); // watchdog incase of crash
}

function scheduleRequest() {
  console.log('Making Request');
  //console.log('init: '+localStorage.initTime+' quit: '+localStorage.quitTime+' now: '+Date.now());
  localStorage.currentTime = Number(Date.now());
        chrome.alarms.create('refresh',{periodInMinutes: 1});
      //chrome.alarms.create('refresh',{periodInMinutes: 1});
  chrome.alarms.get('refresh', function(alarm){console.log('Alarm: '+alarm.scheduledTime);});
}

function startRequest(params) {
  if (params.scheduleRequest){
    if (nT.storage.get('session','keepAlive')){
      if (nT.storage.get('session','keepAliveTimeout') > 0){
        console.log('startRequest:> keepAliveTimeout:> schedule');
        scheduleRequest();
      }
      else {
        console.log('keepAlive:> else schedule');
        scheduleRequest();
      }
    }
  }
  if (localStorage.hasSettings){
    if (nT.storage.get('session','logIn') == 1){
      loggedIn();
    }
  }
}

function onAlarm(alarm) {
  if (alarm) {
        startRequest({scheduleRequest:true});
        console.log('Alarm', alarm);
  }
  else if (alarm.name == 'watchdog') {
    onWatchdog();
  } else startRequest({scheduleRequest:true});
}

function onWatchdog(){
  chrome.alarms.get('refresh', function(alarm) {
    if (!alarm) {
      console.log('Refresh alarm is missing.');
      startRequest({scheduleRequest:true});
    }
  });
}

chrome.tabs.onUpdated.addListener(checkForURL); // icon set
chrome.runtime.onInstalled.addListener(onInit); // set watchdog and failure count
chrome.alarms.onAlarm.addListener(onAlarm); // starting chrome alarm for reload

chrome.extension.onMessage.addListener(function(msg,_,sendResponse) {
  console.log('Got message' + JSON.stringify(msg));
  chrome.tabs.getSelected(null, function(tab) {
    if (msg.data == "loginPage"){
      loggedIn();
      if(localStorage.loggedIn) chrome.tabs.sendMessage(tab.id, {data: "reload"}, function(response) {});
    }
    
    else if (msg.data == "optionsSave"){
      onInit();
    }
    
    else if (msg.data == "reqFunc"){
      var data = nT.storage.obj();
      data.credentials = "";
      data.data = "reqFunc";
      chrome.tabs.sendMessage(tab.id, data,function(response){

      });
    }
  });
});

