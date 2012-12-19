var pollIntervalMin = 1;
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
        console.log("Returned Login Page");
        localStorage.requestFailureCount ++;
      } else {
          console.log('Page pull with success: '+ date.toTimeString());
      } 
    }

  }
  console.log('refreshPage');
  xmlhttp.open("GET","https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag=X3604",true);
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
  $.ajax({
    type: 'GET',
    url: 'https://ntg.missouristate.edu/Login/Login.aspx?ForceLogin=true',
    success: function(data) {
      console.log(data.responseText);
      //jquery gets hung up on relative links in the script tags on the page
      //and causes it to abort. cannot figure out how to either A) strip the script tags
      //because I don't care about them, or B) fix the relative urls so that I can grab the 
      //value of __EVENTValidation 
      localStorage['viewstate'] = $('#__VIEWSTATE',data).attr('value');
      localStorage['eventval'] = $('#__EVENTVALIDATION',data).attr('value');
    },
  });
}

function msuPost(){
  $.ajax({
    type: 'POST',
    url: 'https://ntg.missouristate.edu/Login/Login.aspx',
    data: {
      '__LASTFOCUS':'',
      '__VIEWSTATE':localStorage['viewstate'],
      '__EVENTTARGET':'',
      '__EVENTARGUMENT':'',
      '__EVENTVALIDATION':localStorage['eventval'],
      'ctl00$MainContent$UserID':localStorage['user'],
      'ctl00$MainContent$Password':localStorage['pass'],
      'ctl00$MainContent$ImageButton1.x':'15',
      'ctl00$MainContent$ImageButton1.y':'23'
    },
    success :  function() { console.log('login complete'); }, 
  });
}  

function onInit() {
  //console.log('Initializing Plugin');
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
   
  msuGet();
  //msuPost();
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
    if (alarm) {
//      console.log('Refresh alarm is there.');
    } else {
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
