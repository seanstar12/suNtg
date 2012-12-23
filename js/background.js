var pollIntervalMin = 3;
var pollIntervalMax = 5;
var requestTimeout = 2000;


function checkForURL(tabId, changeInfo, tab) {
  if (tab.url.indexOf('ntg.missouristate') > -1) {
    chrome.pageAction.show(tabId);
  }
}

function msuRefresh(){
  $.ajax({
    type: 'GET',
    url: 'https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag=X3604',
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
  $.ajax({
    type: 'GET',
    url: 'https://ntg.missouristate.edu/Tools/Default.aspx',
    success: loggedInSuccess,
  });
}

function loggedInSuccess(data) {
    if ($('#ctl00_MainContent_UserID',data).length > 0 ) {
      localStorage['loggedIn'] = false;
      msuGet();
    } else  {
      localStorage['loggedIn'] = true;
      msuRefresh();
    }
}

function msuGet() {
  console.log('im getting');
  (localStorage.pass == null) ? localStorage.pass = prompt("Enter your password") : false;
  $.ajax({
    url: 'https://ntg.missouristate.edu/Login/Login.aspx?ForceLogin=true',
    success: function(req) { msuGetProcess(req); },
  });
}

function msuGetProcess(req) {
  console.log('im processing');

  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = req.replace(/<script(.|\s)*?\/script>/g, '');
  
  // tempDiv now has a DOM structure:
  tempDiv.childNodes;

  localStorage.eventval = tempDiv.querySelector('#__EVENTVALIDATION').value;
  localStorage.viewstate = tempDiv.querySelector('#__VIEWSTATE').value;
  
  // remove unneeded div
  delete tempDiv;

  msuPost();
}

function msuPost(){
  $.ajax({
    type: 'POST',
    url: 'https://ntg.missouristate.edu/Login/Login.aspx',
    data: {
      '__LASTFOCUS':'',
      '__VIEWSTATE':localStorage.viewstate,
      '__EVENTTARGET':'',
      '__EVENTARGUMENT':'',
      '__EVENTVALIDATION':localStorage.eventval,
      'ctl00$MainContent$UserID':'ss4599', //fix with pass from context script
      'ctl00$MainContent$Password':localStorage.pass, 
      'ctl00$MainContent$ImageButton1.x':'15',
      'ctl00$MainContent$ImageButton1.y':'23'
    },
    success :  function() { 
      localStorage.loginCount++;
      var hud = webkitNotifications.createNotification('images/icon48.png','Hey Bro!','No worries, we logged you back in...' + localStorage.loginCount);
      hud.show();
      setTimeout(function() {
        hud.cancel();
      }, 3000);
    }, 
  });
}  

function onInit() {
  //console.log('Initializing Plugin');
  localStorage.loggedIn = false;
  localStorage.loginCount = 0;
  startRequest({scheduleRequest:true});
  chrome.alarms.create('watchdog', {periodInMinutes:5}); // watchdog incase of crash
}

function scheduleRequest() {
  //console.log('scheduleRequest');
  var randomness = Math.random() * 2;
  var exponent = Math.pow(2, localStorage.requestFailureCount || 0);
  var multiplier = Math.max(randomness * exponent, 1);
  var delay = Math.min(multiplier * pollIntervalMin, pollIntervalMax);
  delay = Math.round(delay);
 // console.log('Scheduling for: ' + delay + ' minutes');
  chrome.alarms.create('refresh',{periodInMinutes: 2});
}

function startRequest(params) {
  if (params.scheduleRequest) scheduleRequest();
  loggedIn();
}

function onAlarm(alarm) {
  console.log('Logged In?', localStorage["loggedIn"]);
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
      if (localStorage.loggedIn)
      msuGet();
      
  
      chrome.tabs.sendMessage(tab.id, {data: "reload"}, function(response) {
        console.log(response.farewell);
      });
    }
  });
});
