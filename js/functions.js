Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
  if ( parentClassOrObject.constructor == Function ) 
  { 
    //Normal Inheritance 
    this.prototype = new parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
  } 
  else 
  { 
    //Pure Virtual Inheritance 
    this.prototype = parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject;
  } 
  return this;
}

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
  
  //Only gets used here... so why include it elsewhere
  jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
  }
  
  for (var i =1; i< f.length; i++){ //creates iframe for each form, then posts form
      var frame = document.createElement('iframe');
      frame.id = i;
      frame.setAttribute('style','display:none; z-index:50;');
      document.body.appendChild(frame);
      document.getElementById(i).contentDocument.body.innerHTML = f[i].outerHTML; 
      //document.getElementById(i).contentDocument.getElementsByName('cmdSubmit')[0].click();
      
      $('#screen').css({ "opacity": ".7",'width':$(document).width(), 'height':$(document).height()}).fadeIn('slow');
      $('#load').css({'width':($(document).width()*0.6)}).fadeIn('slow').center();
                             
  }
  var timeout = 0; 
  for (var j= 10; j<90; j++){
    setTimeout(function(){
      time += 1.25; 
      $('.bar').attr('style','width:'+ time +'%');
      timeout++;
      if (timeout == 80) {
        window.location.reload();
      }
    }, j*100);
  }
    
}

/**
 * Runs function based on URL, [Invert = True] the supplied function will NOT
 * run on an ARRAY of pages. If [Invert = null] the supplied function will run
 * on ONLY the supplied string page.
 *
 * @param {string|array} link - url/s of pages to run or not run on
 * @param {callback} f - Function runs on pages based on invert
 * @param {bool} invert - defaults to false, inverts the filter to apply to
 */
function urlCheck(link,f,invert) {
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

/**
 * rename to createModal
 * See also 
 */

function Modal(closeCallback) {
  this.closeCallback = closeCallback;

  this.el = document.createElement('div');

  this.el.innerHTML = '<div id="ntgModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="ntgModalLabel" aria-hidden="true">' +
  '<div class="modal-header">' +
  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
  '<h2 class="modal-title">Add Link Port</h2>' +
  '<h4 class="modal-subTitle text-info">Add Link Port</h4>' +
  '</div><div class="modal-body">' +
  '</div><div class="modal-footer">' +
  //buttons go here
  '</div></div>';
  this.el.childNodes;

  $(document.body).append(this.el);

  this.title = this.el.querySelector('.modal-title');
  this.subTitle = this.el.querySelector('.modal-subTitle');
  this.content = this.el.querySelector('.modal-body');
  this.footer = this.el.querySelector('.modal-footer');

  $('#ntgModal').on('hidden',this.destroy);
}

Modal.prototype.show = function() {
  $('#ntgModal').modal('show');
}

Modal.prototype.update = function(values) {
  this.setTitle(values['title']);
  this.setSubTitle(values['subTitle']);
  this.setContent(values['content']);
  this.setFooter(values['footer']);
}

Modal.prototype.setTitle = function(title) {
  this.title.innerHTML = title;
}

Modal.prototype.setSubTitle = function(subTitle) {
  this.subTitle.innerHTML = subTitle;
}
  
Modal.prototype.setContent = function(content) {
  this.content.innerHTML = content;
}

Modal.prototype.setFooter = function(footer) {
  this.footer.innerHTML = footer;
  styleButtons('#ntgModal .modal-footer');
  this.setupDefaultButtons();
}

Modal.prototype.setupDefaultButtons = function() {
  $('[value="Cancel"]', this.footer).attr('data-dismiss','modal');
}

Modal.prototype.destroy = function() {
  $('#ntgModal').remove();
  delete this.el;
  delete this.title;
  delete this.subTitle;
  delete this.content;
  delete this.footer;
  //this.closeCallback();
}

/**
 * @class
 */
function NTGForm() {
  
}

NTGForm.prototype.setMode = function(mode) {
  this.form.mode.value = mode;
  this.form.submit();
}

NTGForm.prototype.pullValuesFromForm = function(form) {
  var values = new Array(4);

  // get values
  values['title'] = $('.TableHeading', form).html();
  values['subTitle'] = $('.NetHeading', form).html();
  values['footer'] = '';
  $($('[type="button"],[type="reset"]', form).get().reverse()).each(function(i, el) {
    values['footer'] += $(el)[0].outerHTML;
  });

  // remove relevant values
  form = form.replace($('.TableHeading', form).parent()[0].outerHTML, '');
  form = form.replace($('.NetHeading', form).parent()[0].outerHTML, '');
  $('[type="button"],[type="reset"]', form).each(function(i, el) {
    form = form.replace($(el).parent().html(), '');
  });

  values['content'] = form;

  return values;
}


/**
 * @class
 */
function ModalForm() {
};

ModalForm.inheritsFrom(NTGForm);

ModalForm.prototype.getData = function(url, successCallback) {
  $.ajax({
    url: url,
    success: successCallback
  });
}

ModalForm.prototype.postData = function(url, data, successCallback) {
  $.ajax({
    type: 'POST',
    url: url,
    success: successCallback
  });
}

ModalForm.prototype.destroy = function() {
  delete this.modal;
}


/**
 * @class
 */
function LinkPort(removeLink) {

  this.removeLink = removeLink;
  this.switchId = $('[name="ObjId"]')[0].value;
  this.getData(
     'LinkSelect.asp?LocalPort=' + this.switchId + '_ge%20_0_0_0',
     this.SearchDevices.bind(this)
  );
  this.modal = new Modal(this.destroy);
};

LinkPort.inheritsFrom(ModalForm);

LinkPort.prototype.SearchDevices = function(data) {
  // create empty dom
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = data;
  tempDiv.childNodes;

  var formValues = this.pullValuesFromForm(tempDiv.querySelector('.PageSmall').innerHTML); 

  this.modal.update(formValues);
  
  this.form = $('form', this.modal.content);
  var buttons = this.modal.footer;

  if (this.removeLink) {
    $('.btn-danger',buttons).first().remove();
  }

  this.modal.show();
}

LinkPort.prototype.SearchDevices_Submit = function() {
  
}

function styleButtons(query) {
  if (!query) query = '';

  $(query + ' [type="submit"],' + query + ' [type="button"]').addClass('btn');
  $(query + ' [type="reset"]').addClass('btn btn-warning');

  $(query + ' [value="Search"]').addClass('btn-primary')[0].setAttribute('type','submit');
  $(query + ' [value="Cancel"]').addClass('btn btn-link').removeAttr('onclick');
  $(query + ' [value="Remove Link"]').css('float','left').addClass('btn-danger');
}


function setOnKeys () {
  $('body').keydown(function(e){
    if (e.keyCode == 82 && e.altKey) {
      var f = document.createElement('frame');
      f.src = url + 'reload.html';
      document.body.appendChild(f);
    }
  });
  
  $('body').keydown(function(e){
    if (e.keyCode == 79 && e.altKey) {
      window.open(url+'options.html','_blank');
    }
  });
}

/**
 * Gets list of devices with useful information. Returns object
 * Ran 'var temp = getDevices();' on  https://ntg.missouristate.edu/NetInfo/EquipmentList.asp?dbsSMSUTag=* 
 * dumped that to js/db.json. getDevices uses parse list and parse click to return an array with device objects inside.
 * 
 */
function getDevices(){ 
  ob = [];
  $('.NetHeading').remove();
  
  var list = $('tr');
 
  return parseList(list);
}


/**
 * Used for parsing an array of the <tr> on EquipmentList.asp. Returns object
 *
 * @param {array} arg - attr(onclick) --  ('xtag', 'bldg', 'closet', 'objId')
 */
function parseList(tRow){ 
  for(var i=0; i< tRow.length; i++){
    var temp = {};
    temp = parseClick((tRow[i].getAttribute('onclick').slice('10','-1')).split(', ')); 
    //console.log($('td',tRow));
    temp.ipAddr = ($('td',tRow[i])[5].innerText); 
    temp.dns = ($('td',tRow[i])[7].innerText); 
    temp.device = ($('td',tRow[i])[9].innerText);
    ob.push(temp);
  }
  return ob;
}

/**
 * Used for parsing 'onclick()' data on EquipmentList.asp. Returns object
 *
 * @param {array} arg - attr(onclick) --  ('xtag', 'bldg', 'closet', 'objId')
 */
function parseClick(arg){
  arg.shift();
  for (var i = 0; i < arg.length; i++){
    if (i < 3){
      arg[i] = arg[i].slice('1','-1');
    }
  }
  return  {'xtag':arg[0],'bldg':arg[1],'closet':arg[2],'objId':arg[3]};
}

var ntg = {};
ntg.db = {};

ntg.db.open = null;

ntg.db.open = function() {
  var version = 1;
  var request = ntg.open('devices',version);

  request.onupgradeneeded = function(e){
    var db = e.target.result;
    e.target.transaction.onerror = ntg.onerror;

    if (db.objectStoreNames.contains('devices')){
      db.deleteObjectStore('devices');
    }

    var store = db.createObjectStore('devices', {keyPath: 'timeStamp'});
  };

  request.onsuccess = function(e) {
    ntg.db = e.target.result;
  };

  request.onerror = ntg.onerror;
};

ntg.addDevice = function(string) {
  var db = ntg.db;
  var trans = db.transaction (['devices'], 'readwrite');
  var store = trans.objectStore('devices');
  var request = store.put({
    'text': string,
    'timeStamp': newDate().getTime() 
  });

  request.onsuccess = function(e) {
    ntg.getAllDevices();
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};

ntg.getAllDevices = function() {
    //var devices = document.get
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

