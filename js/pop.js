function addSet(setType){
  var set = document.getElementsByClassName('xTagSet');
  var count = set.length +1;
  
  var field = '<input type="text"class="Tag"id="xtagText_'+count+'"name="xtagText_'+count+'"size="5"placeholder="XTag">'+
    '<input type="text"id="dnsName_'+count+'"name="dnsName_'+count+'"size="15"class="DNS"placeholder="DNS Name">'+
    '<input type="text"id="ipAddr_'+count+'"name="ipAddr_'+count+'"size="14"class="IP"placeholder="IP Address">';
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
  var set = document.getElementsByClassName('xTagSet');
  var container = [];
  var thing = [];
  //chrome.extension.getBackgroundPage().keepAlive(data);
 // console.log(data);
  
  $('#massAllo .xTagSet').each(function(i,val){
    var s = $('#massAllo').serializeObject();
    var temp = {'Class':'A','Building':s.bldPrefix,'Closet':s.closet};
    
    $.each(val.children, function(x, el){
      temp[el.className] = el.value;
    });
    container.push(temp);
  });
  //console.log(container);
  $.each(container, function(i,val){
    container[i] = new existAllocate(container[i]);
  });
  console.log(container);
  var msg = document.getElementById('warning');
  msg.innerHTML += container.Tag + " Being Allocated";
  setTimeout(function(){
      warning.innerHTML="";
  }, 15000);
  tag.allocate(container);
  return false;
}

//function dateChange(){
//  if (custDate.checked) {
//    document.getElementById('customDateField').setAttribute('style','display:inline');
//  } else {
//    document.getElementById('customDateField').setAttribute('style','display:none');
//  }
//}

$('#custDate').click(function() {
  $('#customDateField').toggle('fast', function() {
    // Animation complete
  });
});

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

//document.addEventListener('DOMContentLoaded', function () {
//        document.querySelector('#custDate').addEventListener('change', dateChange);
//});
document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('#massAllo input[type="radio"]')[0].addEventListener('change', radioChange);
        document.querySelectorAll('#massAllo input[type="radio"]')[1].addEventListener('change', radioChange);
});

document.getElementById('massAllo').addEventListener("submit", processForm);
document.onkeydown = keydown;
document.write('<style type="text/css">.tabber{display:none;}</style>');
