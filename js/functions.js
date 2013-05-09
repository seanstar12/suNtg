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

function addScripts(files){
  for (var i =0; i< files.length; i++){
    var s = "";

    if (files[i].indexOf('js/') > -1){
      s = document.createElement('script');
      s.src = chrome.extension.getURL(files[i]);
    } 
    else if (files[i].indexOf('css/') > -1) {
      s = document.createElement('link');
      s.href = chrome.extension.getURL(files[i]);
      s.rel = 'stylesheet';
    }
    document.documentElement.insertBefore(s);  
  }
}

function portalFrame(crUrl, urlVar) {
  var f = document.createElement('frame');
  f.src = crUrl + 'portal.html?id=' + urlVar;
  console.log(f.src);
  //f.style.display = 'none';
  document.body.appendChild(f);
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
  var newDate = returnDate();
  if (localStorage.custDate == 1) { 
    newDate = localStorage.custDateVal;
    localStorage.custDate = 0;
  }
  $('[name="dbdVerifyDt"]').each(function(){this.value = newDate;});
  $('[name="Update"]').each(function(){this.checked = true;});
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


function getUrlVars() {
  //var first = getUrlVars()["id"];
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
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
  b.value = 'Update to: '+ ((localStorage.custDate == 1) ? localStorage.custDateVal : returnDate());
  return b;
}

function btnBuild(id,_class,value,func){
  var b = document.createElement('button');
  b.className = 'btn ' +_class;
  b.id = id;
  b.innerHTML = value;
  b.type = 'button';
  
  $(b).bind('click', function(){
    func();
  });

  return b;
}

function btnBuildGrp(id,_class,value,func){
  var d = document.createElement('div');
  
  d.className = "btn-group";
  d.appendChild(btnBuild(id,_class,value,func));
  d.appendChild(btnBuild(id+'split','btn-info','<span class="icon-calendar icon-white"></span>',btnCustDate));
  
  return d;
}

function linkCustDate(){
 var newDate = prompt('Custom Date',
     (localStorage.custDateVal == '' || localStorage.custDateVal == null) ? returnDate() : localStorage.custDateVal);
  
  if (newDate != null) {
    localStorage.custDate = 1;
    localStorage.custDateVal = newDate; 
    autoDate();
    //updateAllDates();
 }

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


function Navigation(id, cssClass, links){
  this.id = id;
  this.cssClass = cssClass;
  this.links = links;
}

Navigation.prototype.createMenu = function(){
  var nav = $('<ul/>')
    .addClass('specialOp nav nav-list')
    .html('<li class="nav-header">Special Stuff</li>')
    .prependTo('.Navigation');

  $.each(this.links, function(i, el) {
    el.appendTo(nav);
  });
}

function NavLink(id, title, func){
  this.id = id;
  this.title = title;
  this.func = func;
  this.ref = '#';
}

NavLink.prototype.createLink = function(){
  var that = this;
  var li = $('<li><a></a></li>');

  $('a',li).attr('id',this.id)
            .text(this.title)
            .attr('href',this.ref)
            .bind('click', function(){
              that.func();
            });
  return li;
}


function massInput() {
       
  $('input, select',document.forms)
      .filter(':visible')
      .not('[name="dbsDescription"]')
      .not('[type="submit"]')
      .each(function(){
          (this.disabled) ? this.disabled = false: this.disabled = true;
      });
  $('input', document.forms).filter(':visible').not(':disabled').first().select();
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

function verboseCheck(){
  if (getUrlVars()['verbose'] == 'true') {
    $('<div/>').addClass('alert alert-error')
                .attr('id','updateProgressAlert')
                .css('display','none')
                .prependTo('.Content')
                .html('<h4>Eek!</h4><a class="close" data-dismiss="alert" href="#">&times;</a>' +
                '<p> You\'re headed into unknow territory. I haven\'t tested this feature in this mode. ' +
                'I\'ll do what I can, but you\'re on your own bro.</p>')
                .toggle(500);
  } else {
    return 1;
  }
}
var form = {};

form = {
  temp: 0,

  allDates: function() {
    autoDate();   
    if (verboseCheck()) form.submitForms();
  },

  custDate: function(){
    var newDate = prompt('Custom Date',
     (localStorage.custDateVal == '' || localStorage.custDateVal == null) ? returnDate() : localStorage.custDateVal);
  
    if (newDate != null) {
      localStorage.custDate = 1;
      localStorage.custDateVal = newDate; 
      autoDate();
      if (verboseCheck()) form.submitForms();
    }
  },
  
  submitForms: function() {
    var formData = $('form').not('#srchBox');
    var formTotal = formData.length;

    $('input,select',$('form')).each(function(){this.setAttribute('disabled','true')});
    
    $('<div/>').addClass('alert alert-info')
                .attr('id','updateProgressAlert')
                .css('display','none')
                .prependTo('.Content')
                .html('<h4>Updating Switches:  <p><span id="updateProgressMsg"> Generating Request</span></p></h4>'+
                '<a class="close" data-dismiss="alert" href="#">&times;</a>')
                .toggle(500)
                .append( $('<div/>')
                  .addClass('progress progress-striped active')
                  .attr('id','updateProgressCont')
                  .append($('<div/>')
                    .addClass('bar')
                    .attr('id','updateProgressBar')
                    .css('width','5%')
                  )
                );
    
    $('form').not('#srchBox').each(
      function(j, jel){
        var pData = "";
        $('input, select', this).each(
          function(i, el) {
            if (i < jel.length -1) {
              pData += encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value); 
            }
            if (i < jel.length -2){
              pData += '&';
            }
          }
        );
        form.submitPortList(pData, formTotal, j);
      }
    );
  },

  submitPortList: function(portData, formTotal, currForm) {
    this.formTotal = formTotal;

    $.ajax({
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      url: 'https://ntg.missouristate.edu/NetInfo/PortList.asp',
      data: portData,
      success: function(data){
      }.bind(this),
      complete:  function(){
        this.temp++;
        //Adds no real value, just shows the switch that's being updated
        var swName = $('h2')[0].innerHTML.split(': ')[1];
        var swNum = $('form').not('#srchBox')[currForm].name.split('_');
        var swFull = swName +' '+((swNum[3] == 0) ? "ge":"xe")+' '+ swNum[2]+'/'+swNum[3]+''; 

        if (this.temp/formTotal <= 1){
          $('#updateProgressMsg').html(" "+ swFull +"");
          $('#updateProgressBar').css('width', (((this.temp) / formTotal)*100)+'%');
        }
        if (this.temp/formTotal == 1){
          this.temp = 0;

          $('#updateProgressAlert').toggleClass('alert-info').toggleClass('alert-success');
          $('h4',$('#updateProgressAlert')).html('Updated Successfully');
          $('#updateProgressCont').attr('class','progress progress-success');
          
          setTimeout(function(){
            $('input,select',$('form')).each(function(){this.removeAttribute('disabled')});
            $('[name="Update"]').each(function(){this.checked = false});
            $('#updateProgressAlert').fadeOut(500);
          }, 1200);
        }
      }.bind(this)
    });
  }
}

var searchTool = {};

searchTool = {
  
  terms: {'Xtag':'dbsSMSUTag','DNS Name':'dbsName','Location':'dbsCurBldg'},
  
  search: function(query){
    this.query = query;
    $('.Content').html('').append( $('<div/>')
                            .attr('class','srchResults')
                            .attr('id','srchResults'));

    $.each(this.terms, function(key,val){
      $.ajax({
        type: 'POST',
        url: 'https://ntg.missouristate.edu/NetInfo/EquipmentList.asp?'+val+'='+query+'*',
        success: function(data){
          var temp = $('table',data);
          if (temp.length > 0 ) {  //if has results
            $('a',temp).each(function(){
              var href = $(this).attr('href');
              $(this).attr('href','/NetInfo/' + href);
            });

            $('#srchResults')
                .append( $('<div/>')
                  .attr('class','searchItem')
                  .html($(temp).addClass('table table-condensed table-hover'))
                  .prepend('<h2>' + key + ' Results</h2>'));
          }
        }
      });
    });
  },

  bindSearch: function(){
    $('#srchBox').submit(function(e){
        e.preventDefault();
        searchTool.search($('#searchBox').val());
      });
    $('body').keydown(function(e){
      if (e.keyCode == 32 && e.altKey){
        e.preventDefault();
        $('#searchBox').select();
      }
    });
  },
}

function getYearlyData() {
  var xTagsL = ['119189','118655','122222222','118655'];
  $('.Outer_Nav').toggle(400);
  $('.Page').append('<div id="dumpster"></div>');
  
  $('<div/>').addClass('alert alert-info')
              .attr('id','updateProgressAlert')
              .css('display','none')
              .prependTo('#dumpster')
              .html('<h4>Searching XTAGS:  <p><span id="updateProgressMsg"> Generating Request</span></p></h4>'+
              '<a class="close" data-dismiss="alert" href="#">&times;</a>')
              .toggle(10)
              .append( $('<div/>')
                .addClass('progress progress-striped active')
                .attr('id','updateProgressCont')
                .append($('<div/>')
                  .addClass('bar')
                  .attr('id','updateProgressBar')
                  .css('width','5%')
                )
              );

  $('<table/>').attr('class','table table-hover')
              .attr('id','resultTable')
              .appendTo('#dumpster')
              .append( $('<thead><tr></tr></thead><tbody id="success"></tbody><tbody id="error"></tbody>')
              );
  $.each(['#','Serial','Description', 'Building','Closet','Date'], function(i, v){
    $('#dumpster thead tr').append($('<td/>').html(v));
  });
 
  //var totalCache = compServTags.length; 
  var totalCache = xTags.xTags.length;
  var tags = xTags.xTags;
  var progress = 0;
  var errorCount = 0;
  var validCount = 0;

  //compServTags  //xTags
   
  $.each(tags, function(i,l){
    $.ajax({
      type: 'GET',
      cache: false,
      url: 'https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag='+this,
      error: function(){
        console.log('Error:> ' + this);
        
      }
    }).done(function(data, str){
      var bank = $('table',data);
      
      if ($('#dbInventory_s_SMSUTag',bank).val() != ''){
        var el = [];
        el.push( $('#dbInventory_s_SMSUTag',bank).val());
        el.push( $('#dbInventory_s_SerialNumber',bank).val());
        el.push( $('#dbInventory_n_DescriptionID',bank).val());
        el.push( $('#dbInventory_s_CurBldg',bank).val());
        el.push( $('#dbInventory_s_CurCloset',bank).val());
        el.push( $('#dbInventory_d_VerifyDt',bank).val());
        
        validCount++;
        var tBody = $('#success');
        var tr = $('<tr/>').addClass('success');                                    
        setTimeout(function(){
          $(tr).toggleClass('success');
        },200);
        $.each(el, function(key,val){
          tr.append($('<td/>').html(val)); 
        });

        $(tBody).prepend(tr);

        //console.log(this + '  ' + el[0] + ' ' + el[1] + ' ' + el[2] + ' ' + el[3] + ' ' + el[4] );
        
      } 
      else {
        errorCount++;
      if (str == 'success'){  
        $('#error').prepend(
          $('<tr><td>'+this+'</td><td> </td><td> </td><td> </td><td> </td><td> </td></tr>').addClass('error')
        );                                  
        //$.each(el, function(key,val){
        //  tr.append($('<td/>').html(val)); 
        //});
            
        $(tBody).prepend(tr);
        
        console.log('%c' + this + ' Oh noes! Not Found','color: #f91483');
      }
     } 
      progress++;
      //console.log(progress + '  ' + totalCache);
      
      if (progress/totalCache <= 1){
        $('#updateProgressMsg').html(" "+ this +"");
        $('#updateProgressBar').css('width', (((progress) / totalCache)*100)+'%');
      }
      if (progress/totalCache == 1){
        progress = 0;

        $('#updateProgressAlert').toggleClass('alert-info').toggleClass('alert-success');
        $('h4',$('#updateProgressAlert')).html('Found ' + validCount + ', but couldn\'t find ' + errorCount);
        $('#updateProgressCont').attr('class','progress progress-success');
        
        //setTimeout(function(){
        //  $('#updateProgressAlert').fadeOut(500);
        //}, 3000);
      } 
      }.bind(this));
  
  });
}
var yearlyInventory = {
  tableRows: ['#','Serial','Description', 'Building','Closet','Date'],

  addAlert: function() {
    $('.Outer_Nav').toggle(400);
    $('.Page').append('<div id="dumpster"></div>');
    
    $('#container').append('<div id="dumpster"></div>');
  
    $('<div/>').addClass('alert alert-info')
                .attr('id','updateProgressAlert')
                .css('display','none')
                .toggle(10)
                .prependTo('#dumpster')
                .html('<h4>Searching XTAGS:  <p><span id="updateProgressMsg"> Generating Request</span></p></h4>'+
                  '<a class="close" data-dismiss="alert" href="#">&times;</a>')
                .append( $('<div/>')
                  .addClass('progress progress-striped active')
                  .attr('id','updateProgressCont')
                  .append($('<div/>')
                    .addClass('bar')
                    .attr('id','updateProgressBar')
                    .css('width','1%')
                  )
                );
  },

  addTable: function() {    
    $('<table/>').attr('class','table table-hover')
                   .attr('id','resultTable')
                   .appendTo('#dumpster')
                   .append( $('<thead><tr></tr></thead><tbody id="success"></tbody><tbody id="error"></tbody>')
                  );
    $.each(this.tableRows, function(i, v){
      $('#dumpster thead tr').append($('<td/>').html(v));
    });
  },
  
  getData: function(tags) {
    var errorCount =0, validCount = 0, progress =0, totalCache = tags.length;
    $.each(xTags, function(i,l){
    $.ajax({
      type: 'GET',
      cache: false,
      url: 'https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag='+this,
      error: function(){
        console.log('Error:> ' + this);
      }
    }).done(function(data, str){
      var bank = $('table',data);
      //console.log(data);
      if ($('#dbInventory_s_SMSUTag',bank).val() != ''){
        var el = [];
        el.push( $('#dbInventory_s_SMSUTag',bank).val());
        el.push( $('#dbInventory_s_SerialNumber',bank).val());
        el.push( $('#dbInventory_n_DescriptionID',bank).val());
        el.push( $('#dbInventory_s_CurBldg',bank).val());
        el.push( $('#dbInventory_s_CurCloset',bank).val());
        el.push( $('#dbInventory_d_VerifyDt',bank).val());
        console.log(el);
        validCount++;
        var tBody = $('#success');
        var tr = $('<tr/>').addClass('success');                                    
        setTimeout(function(){
          $(tr).toggleClass('success');
        },200);

        $.each(el, function(key,val){
          tr.append($('<td/>').html(val)); 
        });

        $(tBody).prepend(tr);
        
      } 
      else {
        errorCount++;
      if (str == 'success'){  
        $('#error').prepend(
          $('<tr><td>'+this+'</td><td> </td><td> </td><td> </td><td> </td><td> </td></tr>').addClass('error')
        );                                  

        $(tBody).prepend(tr);
        
        console.log('%c' + this + ' Oh noes! Not Found','color: #f91483');
      }
     } 
      progress++;
      
      if (progress/totalCache <= 1){
        $('#updateProgressMsg').html(" "+ this +"");
        $('#updateProgressBar').css('width', (((progress) / totalCache)*100)+'%');
      }
      if (progress/totalCache == 1){
        progress = 0;

        $('#updateProgressAlert').toggleClass('alert-info').toggleClass('alert-success');
        $('h4',$('#updateProgressAlert')).html('Found ' + validCount + ', but couldn\'t find ' + errorCount);
        $('#updateProgressCont').attr('class','progress progress-success');
        
        //setTimeout(function(){
        //  $('#updateProgressAlert').fadeOut(500);
        //}, 3000);
      } 
      }.bind(this));
  
  });
  },

  init: function(tags){
    this.addAlert();
    this.addTable();
    this.getData(tags);
  }
}

