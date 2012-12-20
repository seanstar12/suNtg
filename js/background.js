var pollIntervalMin = 3;
var pollIntervalMax = 5;
var requestTimeout = 2000;


function checkForURL(tabId, changeInfo, tab) {
  if (tab.url.indexOf('ntg.missouristate') > -1) {
    chrome.pageAction.show(tabId);
  }
}

function refreshPage(){
  var xmlhttp;
  var date = new Date();
  xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      if ((xmlhttp.responseText).indexOf("Credentials Required") > 0 ){
        console.log(xmlhttp);
        console.log("Returned Login Page -- We Have Failed.");
        localStorage.requestFailureCount ++;
      } else {
          console.log('Page POST with success: '+ date.toTimeString());
      } 
    }

  }
  console.log('(refreshPage)');
  xmlhttp.open("POST","https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag=X3604",true);
  xmlhttp.send(); //attempt to keep connection serverside
}

function loggedIn(){
  $.ajax({
    type: 'GET',
    url: 'https://ntg.missouristate.edu/Tools/Default.aspx',
    success: function(data) {
      if ($('#ctl00_MainContent_UserID',data).length > 0 ) {
        localStorage['loggedIn'] = false;
      } else localStorage['loggedIn'] = true;
    },
  });
}

function msuGet(){
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange=function() {
 
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var root = document.createElement("div");
      document.body.innerHTML = xmlhttp.responseText;
      localStorage.eventval = document.getElementById('__EVENTVALIDATION').value;
      localStorage.viewstate = document.getElementById('__VIEWSTATE').value;
    }
  }

  xmlhttp.open("GET","https://ntg.missouristate.edu/Login/Login.aspx?ForceLogin=true",true);
  xmlhttp.send();
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
      'ctl00$MainContent$Password':'PASSGOESHERE', 
      'ctl00$MainContent$ImageButton1.x':'15',
      'ctl00$MainContent$ImageButton1.y':'23'
    },
    success :  function() { 
      localStorage.loginCount++;
      console.log('login complete', localStorage.loginCount); 
    }, 
  });
}  

function onInit() {
  //console.log('Initializing Plugin');
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
  chrome.alarms.create('refresh',{periodInMinutes: delay});
}

function startRequest(params) {
  if (params.scheduleRequest) scheduleRequest();
   
  //msuGet();
  //msuPost();
  refreshPage();
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


//onInit();

//Chrome Processes Running 
chrome.tabs.onUpdated.addListener(checkForURL); // icon set
chrome.runtime.onInstalled.addListener(onInit); // set watchdog and failure count
chrome.alarms.onAlarm.addListener(onAlarm); // starting chrome alarm for reload
chrome.extension.onMessage.addListener(function(msg,_,sendResponse) {
  console.log('Got message' + JSON.stringify(msg));
});
