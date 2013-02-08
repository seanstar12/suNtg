var pollIntervalMin = 3;
var pollIntervalMax = 5;
var requestTimeout = 2000;


function checkForURL(tabId, changeInfo, tab) {
  if (tab.url.indexOf('ntg.missouristate') > -1) {
    chrome.pageAction.show(tabId);
  }
}

function msuRefresh(){
  var ts = Math.round(new Date().getTime() / 1000);
  $.ajax({
    type: 'GET',
    cache: false,
    url: 'https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag=X3604&'+ts,
    success: function () {
      var date = new Date();
      console.log('Page GET with success: '+ date.toTimeString());
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
      console.log('Logging In');
      msuGet();
      console.log('Ran msuGet()');
    } else  {
      localStorage.loggedIn = true;
      console.log('Logged In');
      msuRefresh();
    }
}

function msuGet() {
  //console.log('Getting Session Vars');
  if (nT.storage.get('credentials','username').length > 1 && nT.storage.get('credentials','password').length > 1) {
    
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
 //       var hud = webkitNotifications.createNotification('images/icon48.png','Hey Bro!','No worries, you\'re logged in. Count: ' 
 //               + localStorage.loginCount);
 //       hud.show();

 //     setTimeout(function() {
 //       hud.cancel();
 //     }, 3000);
    }, 
  });
}  

function onInit() {
  //console.log('Initializing Plugin');
  localStorage.loggedIn = false;
  localStorage.loginCount = 0;
  startRequest({scheduleRequest:true});
  
  chrome.alarms.create('watchdog', {periodInMinutes: 6}); // watchdog incase of crash
}

function scheduleRequest() {
  //console.log('scheduleRequest');
  var randomness = Math.random() * 2;
  var exponent = Math.pow(2, localStorage.requestFailureCount || 0);
  var multiplier = Math.max(randomness * exponent, 1);
  var delay = Math.min(multiplier * pollIntervalMin, pollIntervalMax);
  delay = Math.round(delay);
 // console.log('Scheduling for: ' + delay + ' minutes');
  chrome.alarms.create('refresh',{periodInMinutes: 5});
}

function startRequest(params) {
  if (params.scheduleRequest) scheduleRequest();
  if (localStorage.settings) loggedIn();
}

function onAlarm(alarm) {
  if (alarm) console.log('Alarm', alarm);
  if (alarm.name == 'watchdog') {
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

//Chrome Processes Running 
chrome.tabs.onUpdated.addListener(checkForURL); // icon set
chrome.runtime.onInstalled.addListener(onInit); // set watchdog and failure count
chrome.alarms.onAlarm.addListener(onAlarm); // starting chrome alarm for reload

chrome.extension.onMessage.addListener(function(msg,_,sendResponse) {
  console.log('Got message' + JSON.stringify(msg));
  chrome.tabs.getSelected(null, function(tab) {
    if (msg.data == "loginPage"){
      
      loggedIn();
      
      if(localStorage.loggedIn) chrome.tabs.sendMessage(tab.id, {data: "reload"}, function(response) {
          //console.log(response.msg);
      });
    }
    else if (msg.data == "appIdReq"){
      var app_id = chrome.i18n.getMessage('@@extension_id');
         //console.log('sent '+ app_id); 
      chrome.tabs.sendMessage(tab.id, {id:app_id}, function(response) {
      });
    }
    else if (msg.data == "optionsSave"){
      onInit();
         //console.log('sent '+ app_id); 
    }
  });
});
