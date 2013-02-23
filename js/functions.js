function addScript(file){
  var s = document.createElement('script');
  s.src = chrome.extension.getURL(file);
  document.documentElement.insertBefore(s);  
}

function addCss(file){
  var s = document.createElement('link');
  s.href = chrome.extension.getURL(file);
  s.rel = 'stylesheet';
  document.documentElement.insertBefore(s);  
}

function returnDate(){
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() +1;
  var year = currentDate.getFullYear();
  var date = month + "/" + day + "/" + year;
  return date;
}

function autoDate() {
  var dateArray = document.getElementsByName('dbdVerifyDt');
  var check = document.getElementsByName('Update');
  var date = returnDate();
  date = '1/17/2013';

  for (var i = 0; i < dateArray.length; i++) {
    dateArray[i].setAttribute('value',date);
  }
  for (var k = 0; k < check.length; k++){
    check[k].setAttribute('checked', 'true');
  }
}

function updateAllDates(){
  autoDate();  //Sets all date fields and checks all boxes
  var f = document.forms;  //stores forms into f (includes new box and date info)
  var time = 0;
  var screen = document.createElement('div');
  var load = document.createElement('div');
  var bar = document.createElement('div');
  screen.id = 'screen';
  
  load.id = 'load';
  load.className = 'progress progress-striped active';
  bar.className = 'bar';
  bar.style = 'width: 0%';
  bar.innerText = 'Updating ALL TEH THINGS';
  
  load.appendChild(bar);
  $('.Page').append(load);
  $('.Page').append(screen);
  
  for (var i =1; i< f.length; i++){ //creates iframe for each form, then posts form
      var frame = document.createElement('iframe');
      frame.id = i;
      frame.setAttribute('style','display:none; z-index:50;');
      document.body.appendChild(frame);
      document.getElementById(i).contentDocument.body.innerHTML = f[i].outerHTML; 
      document.getElementById(i).contentDocument.getElementsByName('cmdSubmit')[0].click();
      
      $('#screen').css({ "opacity": ".7",'width':$(document).width(), 'height':$(document).height()}).fadeIn('slow');
      $('#load').css({'width':($(document).width()*0.6)}).fadeIn('slow').center();
                             
  }
  var timeout = 0; 
  for (var j= 10; j<90; j++){
    setTimeout(function(){
      time += 1.25; 
      $('.bar').attr('style','width:'+ time +'%');
      console.log(timeout);
      timeout++;
      if (timeout == 80) {
        window.location.reload();
      }
    }, j*100);
  }
    
}

function urlCheck(link,f,invert) {
// invert {t,f} ; link {array of links} ; f {function to run}
// invert = true, f() will NOT run on ARRAY of pages 
  if (invert) {
    var count = 0;
    for (var i=0; i < link.length; i++) {      
      var item = (document.URL.indexOf(link[i]) >= 0);
      if (item) count++;
    }
    if (count == 0) f();
  } else (document.URL.indexOf(link) >=0) ? f(): false;
}

function btnBuildAsp(id){
  var b = document.createElement('input');
  b.type = 'submit';
  b.className = 'btn btn-primary subBtn';
  b.id = id;
  b.value = 'Update to: '+ returnDate();
  return b;
}

function btnBuild(id,_class,value,func){
  var b = document.createElement('button');
  b.className = 'btn btn-' +_class;
  b.id = id;
  b.innerHTML = value;
  b.type = 'button';

  $(b).bind('click', function(){
    func();
  });

  return b;
}

function test(){
  console.log('i work');
}

function btnDates(){
  var f = document.forms;
  //console.log(f);
  for (var i = 1; i < f.length; i++){
    var btn = btnBuildAsp(f[i].name);
    f[i].appendChild(btn);
  }
  $('.subBtn').each(function(){
    $(this).bind('click',function(){
      $(this)[0].value = "Updating";
      autoDate();
      ($('[name='+$(this)[0].id+']')[0]).querySelector('[value="Update"]').click();

      return false;
    });
  });
}

function btnBar(){
  var b = btnBuild('updateAll','info', 'Set All  <i class="icon-calendar icon-white"></i>  to '+ returnDate(), updateAllDates);
  $('.Navigation').prepend(b);
}

jQuery.fn.center = function () {
  this.css("position","absolute");
  this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
  this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
  return this;
}

//function btnBar(b){
//  var barItems = [];
//  var bar = document.createElement('div');
//  bar.className = 'btnBar';
//  bar.id = 'buttonBar';
//  
//  for (var btn in b){
//    //barItems.push(btnBuild(btn,b[btn]._class,b[btn].size,b[btn].value,b[btn].func));
//    console.log(b[btn].func.value);
//    bar.innerHTML += (btnBuild(btn,b[btn]._class,b[btn].size,b[btn].value,b[btn].func)).outerHTML;
//  }
//
//  document.body.appendChild(bar); 
//}
//
//var abuttons = { 
//  'updateDates': {
//    '_class':'btn-info',
//    'size':'btn-small',
//    'value':'Update Dates',
//    'func':'test'
//  },
//  'otherBtn': {
//    '_class':'btn-info',
//    'size':'btn-small',
//    'value':'Something',
//    'func':test
//  }
//};


//var btnBar = document.createElement('div');
//btnBar.id = 'btnBar';
//btnBar.innerHTML = '<button class="btn btn-info btn-small" id= "updateAllDate"type="button">Update Dates To ' + returnDate() +'</button>';
//$('.Navigation').prepend(btnBar);

