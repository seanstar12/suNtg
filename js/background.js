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

function writeCode() {
  var funInject = document.createElement('script');
  var codeInject = ['var base="https://ntg.missouristate.edu/";var urls =["Tools/Default.aspx","NetInfo/EquipmentDetail.asp","NetInfo/FloorPlans.asp", "NetInfo/EquipmentList.asp?dbsSMSUTag=X3604"];'+
  'var frame = document.createElement("iframe");frame.setAttribute("id","netHijack");var rand = urls[Math.floor((Math.random()*3))];frame.setAttribute("src",base+rand);console.log(rand);console.log(frame);'];
  funInject.innerText = codeInject;
  document.getElementsByClassName('Main')[0].appendChild(funInject);
}

function keepAlive(item){
  var base = "https://ntg.missouristate.edu/";
  var urls = ["Tools/Default.aspx","NetInfo/EquipmentDetail.asp","NetInfo/FloorPlans.asp", "NetInfo/EquipmentList.asp?dbsSMSUTag=X3604"];
  var frame = document.createElement('iframe');
  //frame.setAttribute('style','display: none;');
  frame.setAttribute('id','netHijack');
  var rand = urls[Math.floor((Math.random()*3))];
  frame.setAttribute('src',base+rand);
  //document.getElementsByClassName('Main')[0].appendChild(frame);
  console.log('keepAlive');
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
  //keepAlive();                                           // Enable these later. because that is the reason for this file
  //refreshPage();
}

function onAlarm(alarm) {
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
