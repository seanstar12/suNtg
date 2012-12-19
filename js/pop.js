function addSet(setType){
  var set = document.getElementsByClassName('xTagSet');
  var count = set.length +1;
  
  var field = '<input type="text"id="xtagText_'+count+'"name="xtagText_'+count+'"size="5"placeholder="XTag">'+
    '<input type="text"id="dnsName_'+count+'"name="dnsName_'+count+'"size="15"placeholder="DNS Name">'+
    '<input type="text"id="ipAddr_'+count+'"name="ipAddr_'+count+'"size="14"placeholder="IP Address">';
  var item = document.createElement('div');
  item.setAttribute('class','xTagSet');
  item.innerHTML += field;
  document.getElementById('formXtags').appendChild(item);
  
}

function keydown(event) { //get key for autoadd of fields
  var code;
  var e;
  
  if (document.all) {
    if (!event) {
      var e = window.event;
      code = e.keyCode;
    }
  } 
  else if (event.which) {
    code = event.which;
    e = event;
  }
  if (code == 9 && !event.shiftKey) {
    var set = document.getElementsByClassName('xTagSet');
    if (set[set.length -1].childNodes[2] == document.activeElement) {
      addSet();
    }
  }
}

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  var dataArray = [];
  var data = [];
  var set = document.getElementsByClassName('xTagSet');
  for(var i =0; i < set.length; i++){
    for (var j = 0; j< set[i].childNodes.length; j++){
      dataArray.push(set[i].childNodes[j].value);
    }
    data.push({xTag:set[i].childNodes[0].value,
              dns:set[i].childNodes[1].value,
              ip:set[i].childNodes[2].value });
    if (data[i].xTag == "" || data[i].dns == "" || data[i].ip == ""){
      data.splice(i,1);
    }
  }

  //alert(bleh);
  chrome.extension.getBackgroundPage().keepAlive(data);
  console.log(data);
  return false;
}

function dateChange(){
  if (custDate.checked) {
    document.getElementById('customDateField').setAttribute('style','display:inline');
  } else {
    document.getElementById('customDateField').setAttribute('style','display:none');
  }
}
function radioChange(){
  var warning = document.getElementById('warning');
  if (this.value == 'dataXtag') {
    warning.innerHTML="DataXtag Selected";
    setTimeout(function(){
      warning.innerHTML="";
    }, 750);
  }
  else if (this.value == 'dataSerial'){
    warning.innerHTML="Serial Selected";
    setTimeout(function(){
      warning.innerHTML="";
    }, 750);
  }
  
  //if (this.value == 'dataXtag') {
  //  document.getElementById('massAllo').setAttribute('style','display:none');
  //} else if (this.value == 'dataSerial') {
  //  document.getElementById('customDateField').setAttribute('style','display:none');
  //}
}

document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('#custDate').addEventListener('change', dateChange);
});
document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('#massAllo input[type="radio"]')[0].addEventListener('change', radioChange);
        document.querySelectorAll('#massAllo input[type="radio"]')[1].addEventListener('change', radioChange);
});

document.getElementById('massAllo').addEventListener("submit", processForm);
document.onkeydown = keydown;
document.write('<style type="text/css">.tabber{display:none;}</style>');

//var request = new XMLHttpRequesti);
//request.open(
//  "GET",
//  "https://ntg.missouristate.edu/Login/Login.aspx?ForceLogin=true",
//true);
//request.send();

//request.onload = showPage;
