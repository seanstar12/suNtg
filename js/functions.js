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

var siteUrl = window.location.origin;


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

function dbInit() {  
  fetch.data('building');  
  fetch.data('equipment');  
  fetch.data('objIds');  
}

function constructHeader(){
  var head = document.getElementsByClassName('header')[0];
  
  head.innerHTML = "";
  $('body').prepend(Handlebars.templates.nav(menuObject));
  
  $.each(menuObject, function(el, i){
    if (typeof(this.func) == "function") this.func();
    if (this.parent){
      $.each(this.sub, function(ell, ii){
        if (typeof(this.func) == "function") this.func();
      });
    }
  });
}

function constructFav(links){
  var el = $('.NavHeading.favHead');
  $.each(links, function(){
    if (!(this.className == 'EditBtn')){
      el.after( $('<li/>').html(this));
    }
  });
}

//For use with custBuildingDisplay
function parseBldgSwitches(context){
  var switches = [], uniqueIds = [];
  $('tr:not(".NetHeading")', context).each(function(i, el){
    
    if (this.innerHTML.indexOf(' Switch') < 0) {
      $(this).remove();
      return;
    }

    var tmpObj = {}, tmpSwitch = $('a',this);
    
    tmpObj['name'] = tmpSwitch[1].innerHTML.split(' /')[0];
    tmpObj['objId'] = tmpSwitch[1].href.split('=')[1];
    tmpObj['tag'] = tmpSwitch[0].innerHTML;


    // Remove Duplicates From Array 
    if ($.inArray(tmpObj.objId, uniqueIds) === -1) {
      switches.push(tmpObj);
      uniqueIds.push (tmpObj.objId);
    }
  });
  
  //Add sorting later
  return switches;
}

function parseSwitchJacks(switchId){

    $.ajax({
      type: 'GET',
      url: '/NetInfo/PortList.asp?ObjId='+switchId,
      error: function(){
        console.log('Error:> ' + this);
      }
    }).done(function(data, str){
      var stage = document.createElement('div');
      stage.innerHTML = data.replace(/<img(.|\s)*?\/>/g,'');
      stage.childNodes;
      
      var switchForms = $('form:not("#srchBox")', stage);
      
      $.each($('table', stage), function(){$('tr',this)[0].remove()});
      $('select, :checkbox', switchForms).parent().remove();  
      $('#lA').html(switchForms);
    });
}

function tempBldgUpdate(bldg){
  Handlebars.registerHelper("foreach",function(arr,options) {
    if(options.inverse && !arr.length)
      return options.inverse(this);
  
      return arr.map(function(item,index) {
        item.$index = index;
        item.$first = index === 0;
        item.$last  = index === arr.length-1;
        return options.fn(item);
      }).join('');
  });
  
  $.ajax({
    type: 'GET',
    url: '/NetInfo/EquipmentList.asp?dbsCurBldg=hill',
    error: function(){
      console.log('Error:> ' + this);
    }
  }).done(function(data, str){
    var something = parseBldgSwitches(data);
    $('.Content.ntgTool').html(Handlebars.templates.bldgUpdatePartial(something));
    $.each(something, function(){
      $('#'+this.objId).on('click', function(e){
        setLoader($('#lA'));
        e.preventDefault();
        $('#switchList li').each(function(){$(this).attr('class','')});
        
        $('#'+this.objId).parent().attr('class','active');
        parseSwitchJacks(this.objId);
      }.bind(this));
    });
  });
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


function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function getId(id) {
  return document.getElementById(id);
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

/**
 * Intended for ntgdev.mostate. It gets rid of the disgusting page layout
 * and makes fun of them in the process.
 * Takes no args and is only run on index
 */
function __doPostBack(eventTarget, eventArgument) {
        document.forms['aspnetForm'].__EVENTTARGET.value = eventTarget;
        document.forms['aspnetForm'].__EVENTARGUMENT.value = eventArgument;
        document.forms['aspnetForm'].submit();
}

function ntgCleanup(bool) {
  urlCheck('', function(){
    var rightCol = $('.right-col');
    $('.ContentMaxMin')
      .html(
        $('<h2/>')
          .html('Web Design on Meth: Not Even Once')
      ).append(
        $('<div/>')
        .addClass('minHeight')
        .html('Contact your local web administrator today and help stop the madness.')
      )
      .prepend(rightCol);
    if (bool){
      $('.brand')
        .html('Ntg.Dev')
        .attr('href','https://ntgdev.missouristate.edu/');    
    } else { 
      $('.brand')
        .html('Networking')
        .attr('href','https://ntg.missouristate.edu/');    
    }
  });
}

function test(){
  console.log('i work');
}

/**
 * rename to createModal
 * See also 
 */

var tempModal = {
  id: 'ntgModal',
  title: 'Ima Modal',
  subTitle: 'Because I can',
  body: 'stuf stuff stufff stuf stuff stuff',
  footer: '<input type="button" id="modalCancel"class="btn" value="Cancel">'+
          '<input id="modalSubmit" type="button" class="btn btn-primary" value="Submit">',
  close: function(){
    console.log('I\'m Doin something');
  },
  submit: function(){
    console.log('I\'m Doin something else');
  }
}

var custDateModalData = {
  id: 'ntgModal',
  title: 'Set Custom Date',
  subTitle: '',
  body: '<input type="date" name="dateField" id="datePicker">',
  footer: '<input type="button" id="modalCancel"class="btn" value="Cancel">'+
          '<input id="modalSubmit" type="button" class="btn btn-primary" value="Submit">',
  close: function(){
    console.log('I\'m Doin something');
  },
  submit: function(){
    console.log('I\'m Doin something else');
    localStorage.custDateVal = dateFormatter($('#datePicker').val(),'toSite');
    localStorage.custDate = '1';
    autoDate();
    form.submitForms();
    
    $('#ntgModal').modal('hide');
  }
}

function makeModal(){
  $('body').append(Handlebars.templates.modal(tempModal));
}

function oModal(modalData){
  this.data = modalData;
  this.htm = Handlebars.templates.modal(modalData);
  
  $('body').append(this.htm);
  $('#modalCancel').attr('data-dismiss','modal');
  $('#modalSubmit').on('click',function(modalData){this.data.submit()}.bind(this));
  return $('#ntgModal');
}

function nModal(data){
  this.data = data;
  this.id = data.id;
  this.title = data.title;
  this.subTitle = data.subTitle;
  this.body = data.body;
  this.footer = data.footer;
 
  this.Modal = Handlebars.templates.modal(this); 
  
  $('body').append(this.Modal);
  $('#datePicker').val(dateFormatter(localStorage.custDateVal,'toPicker'));
  
  $('#modalCancel').attr('data-dismiss','modal');
  $('#modalSubmit').on('click',function(data){
    this.data.submit();
    $('#ntgModal').remove();
  }.bind(this));
}

function dateFormatter(str, format){
  var a,b,c,comp;
  switch(format){
    case 'toSite':
      
      a = str.split('-')[0];
      b = str.split('-')[1];
      c = str.split('-')[2];

      if (a < 10) a = a.split('0')[1];
      if (b < 10) b = b.split('0')[1];
      return b+'/'+c+'/'+a;
    
    case 'toPicker':
      
      a = str.split('/')[0];
      b = str.split('/')[1];
      c = str.split('/')[2];
      
      if (b < 10) b = '0'+b;
      if (a < 10) a = '0'+a;

      return c+'-'+a+'-'+b;
  }

}

function custDateModal(){
  nModal(custDateModalData);
}

function launchSettings(){
  var box = new Modal();
  box.update({'title':'Settings','subTitle':'sure','content':'Oh, I am the content','footer':'stuff goes here'});
  box.show();
}

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
          (this.disabled) ? $(this).removeAttr('disabled') : this.disabled = true;
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

var form = {};

form = {
  temp: 0,

  allDates: function() {
    autoDate();   
    form.submitForms();
  },

  custDate: function(){
    //var newDate = prompt('Custom Date',
    // (  localStorage.custDateVal == '' 
    //    || localStorage.custDateVal == null
    // ) ? returnDate() : localStorage.custDateVal);
  
    //if (newDate != null) {
    //  localStorage.custDate = 1;
    //  localStorage.custDateVal = newDate; 
    //  autoDate();
    //  form.submitForms();
    //}
  },
  
  submitForms: function() {
    var formData = $('form').not('#srchBox');
    var formTotal = formData.length;

    $('input,select',$('form')).each(function(){this.setAttribute('disabled','true')});
    
    $('.Content').prepend(Handlebars.templates.progress({title:'Updating Switches: ',msg:'Generating Request'}));
   
    $('#updateProgressAlert').fadeIn(300); 

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
      url: siteUrl+'/NetInfo/PortList.asp',
      //url: siteUrl+'/NetInfo/SPortList.asp',
      data: portData
      }).always(function(){
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
      }.bind(this));
    }
}

var searchTool = {};

searchTool = {
  
  terms: {'Xtag':'dbsSMSUTag','DNS Name':'dbsName','Location':'dbsCurBldg'},
  
  search: function(query){
    this.query = query;

    setDisplay(searchObj);
    $('.Content')
      .html(Handlebars.templates.searchResults())
   //   .append( $('<div/>')
   //                 .attr('class','srchResults')
   //                 .attr('id','srchResults'));
    document.title = '"' + query.toUpperCase() + '"  {Query}';
    window.location.hash = "ntgQuery\\" + query.toUpperCase(); 
    $.each(this.terms, function(key,val){
      $.ajax({
        type: 'POST',
        url: siteUrl+'/NetInfo/EquipmentList.asp?'+val+'='+query+'*'
      }).done(function(data){
          var tags = [];
          var temp = $('table',data);
          if (temp.length > 0 ) {  //if has results
            $('a',temp).each(function(){
              var href = $(this).attr('href');
              $(this).attr('href','/NetInfo/' + href);
              if (href.indexOf("asp?Tag=") > 0 && key == "Location"){ 
                tags.push(href.split('=')[1]); //janky. don't care. working on for building auto update
              }
            });
            
            $('#srchResults')
                .append( $('<div/>')
                  .attr('class','searchItem')
                  .html($(temp).addClass('table table-condensed table-hover'))
                  .prepend('<h2>' + key + ' Results</h2>'));
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
      url: siteUrl+'/NetInfo/EquipmentDetail.asp?Tag='+this,
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
      url: siteUrl+'/NetInfo/EquipmentDetail.asp?Tag='+this,
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

function Tag() {
  this.alloProp = ['scrollHeight','scrollWidth','Tag','State', 'Class', 'Building','Closet','DNSName',
              'IP1','IP2','IP3','IP4','AllocatePorts','cmdSubmit']; 

  this.prop = ['dbInventory_s_SerialNumber','dbInventory_s_SMSUTag','dbInventory_s_Comments',
          'dbInventory_s_StatusReported','dbInventory_s_RMA','dbInventory_d_InstallDt','dbInventory_d_VerifyDt',
          'dbInventory_s_PO','dbInventory_s_ComCode','dbInventory_s_Department','dbInventory_b_SMSInv',
          'dbInventory_s_CurBldg','dbInventory_s_CurCloset','dbInventory_s_PreBldg','dbInventory_s_PreCloset'
  ];
}

Tag.prototype.getInfo = function(tag, func, passedVal){
  var tagProps = {};
  
  $.ajax({
    cache: false,
    url: siteUrl+'/NetInfo/EquipmentDetail.asp?Tag='+tag,
  })
  .fail(function(){
    console.log('Error:> ' + this);
  }.bind(this))
  .done(function(inData, str){
    // create pseudo dom
    var stage = document.createElement('div');
    stage.innerHTML = inData.replace(/<img(.|\s)*?\/>/g,'');
    stage.childNodes;
    
    // Because site is dumb, pull this differently than rest 
    tagProps['dbInventory_n_DescriptionID'] = $('[name="dbInventory_n_DescriptionID"][type="hidden"]', stage).val(); 
    tagProps['isAllocated'] = $('.NavSubItem [href*="deallocate"]', stage).length ? true : false;
    
    // pull tag properties
    $.each(this.prop, function(i,el){
      tagProps[el] = stage.querySelector('#' + el).value; 
    });
      
    func(tagProps, passedVal);
  }.bind(this));
}
  
  //has to be from getInfo callback. tag.getInfo(['tag'], tag.deallocate(['tag']))
Tag.prototype.deallocate = function(callback){
  var data = {};
  var self = this;

  // only deallocated allocated items
  if (this.isAllocated == 'false') {
    callback.apply(this);  
    return;
  }

  console.log('deallocate'); 

  data['data'] = 'X' + this.Tag;
  data['mode'] = 'update';
  data['command'] ='Deallocate' ;
  data['cmdSubmit'] = 'Update Equipment';

  $.ajax({
    type: 'POST',
    cache: false,
    data: data,
    url: siteUrl+'/NetInfo/EquipmentDetail.asp?Tag='+data['data'],
  }).fail(function(){
    console.log('Error:> ' + this);
  }).done(function(data, str){
    console.log('is deallocated'); 
    callback.apply(this);
  }.bind(this));  
}

Tag.prototype.allocate = function(){
  var data = {};

  delete this.isAllocated;
  delete this.prop;
  delete this.alloProp;

  for(var key in this) {
    switch (typeof this[key]) {
      case 'function':
      case 'object':
       continue;
    }
    data[key] = this[key];
  }

  $.ajax({
    type: 'POST',
    url: siteUrl+'/NetInfo/AllocateEquipment.asp',
    data: data,
  }).done(function(data){
    console.log('is allocated'); 
    updateVerify(this.Tag);
  }.bind(this));
}

Tag.prototype.setProperties = function(obj){
  //(Tag,Building,Closet,DNS,IP){
  this.isAllocated = obj.isAllocated;
  this.Tag = 'X' +obj.Tag;
  this.Class = "A"; //Access Point : Access Mode
  this.Building = obj.Building;
  this.Closet = obj.Closet;
  this.DNSName = obj.DNS;
  this.AllocatePorts = '';
  this.State = '9 NoChange';
  this.cmdSubmit = 'Finish';
  this.IP = obj.IP;
  if (this.IP.length) {
    this.IP = this.IP.split('.');

    this.IP1 = this.IP[0];
    this.IP2 = this.IP[1];
    this.IP3 = this.IP[2];
    this.IP4 = this.IP[3];
    delete this.IP;
  }
  else {
    this.IP1 = this.IP2 = this.IP3 = this.IP4 = '0';
  }
}

Tag.prototype.hasEmpty = function() {
  if (this.DNSName.length > 0
   || this.Tag.length > 0) {
    return false;
  }

  return true;
}

function updateVerify(xTag){

  if(!xTag) {
    console.log('no xtag for updateVerify');
    return;
  }

  $.ajax({
    type: 'POST',
    url: siteUrl+'/NetInfo/EquipmentDetail.asp?Tag=' + xTag
  }).done(function(data){
      var stage = document.createElement('div');
      stage.innerHTML = data.replace(/<img(.|\s)*?\/>/g,'');
      stage.childNodes;

      var tagData = $('#detailform', stage).serializeObject();
      tagData.dbInventory_d_VerifyDt = returnDate();
      tagData.cmdSubmit = 'Update Equipment';
      $.ajax({
        type: 'POST',
        url: siteUrl+'/NetInfo/EquipmentDetail.asp',
        data: tagData
      }).done(function(data){
        console.log("Verify Date Updated to " + returnDate());
        
      });
  });
}

function createRow(){
  var rowNum = $('.tagSet').length + 1;

  $('#resultTable').append(Handlebars.templates.tagCreateRow({num: rowNum}));
}

// For twitterbootstrap: prepends 'X' before the form
function addPreTag(el) {
  var hasPreTag = $(el).siblings().hasClass('add-on');

  if (hasPreTag) return;
  
  if(!$(el).parent().hasClass('input-prepend')) {
    $(el).wrap($('<div class="input-prepend" />'));
    $(el).focus();
  }

  $(el).parent().prepend($('<span class="add-on"/>').html('X'));
}

function removePreTag(el) {
  $('span',$(el).parent()).remove();
}


function batchOpsKeydown(e) { //get key for autoadd of fields e = e || window.event;

  // tab key
  if (e.keyCode != 9 || e.shiftKey)
    return;

  var activeElm = $(document.activeElement);
  var activeElmVal = activeElm.val();
  
  var itemsInSet = $('.tagSet').length -1;
  var indexOfActive = activeElm.parents('.tagSet').index();
  var isIP =  activeElm.parent().hasClass('IP');

  if (indexOfActive == itemsInSet && isIP) {
    createRow();
  }
  
  //Prepend DNS Name Stuff
  if ($('#preDNS').is(':checked')
   && activeElm.attr('name') == 'DNS' 
   && activeElmVal.indexOf($('#sList').val()) < 0 ){
    activeElm.val($('#sList').val() + activeElmVal.toUpperCase());
  }

  var standardXTag = /^[xX]?[0-9]{4,5}$/g;
  var SMSUTag = /^[0-9]{6,10}$/g;

  //Xtag Status // preTag set stuff
  if (activeElm.attr('name') == 'Tag') {
    var validTag = false;
    var row = activeElm.parents('.tagSet').attr('id');

    // check for standard xTag
    if (standardXTag.exec(activeElmVal)) {
      validTag = true;
      if (activeElmVal[0].toLowerCase() == 'x') {
        activeElm.val(activeElmVal.substr(1, activeElmVal.length));
      }
      else {
        activeElmVal = 'x' + activeElmVal;
      }

      addPreTag(activeElm);
    }   
    else if (SMSUTag.exec(activeElmVal)) {
      validTag = true;
      removePreTag(activeElm);
    }

    if (validTag) {
      var tag = new Tag;
      tag.getInfo(activeElmVal, setStatus, row);
      setLoader($('.status', activeElm.parents('.tagSet')));
    }
    else {
      setStatus({error: true}, row);
    }
  }
}

//Page for batch operations of Allocation and Deallocation
function batchOps(){

  document.title = "{NTG} Batch";
  
  document.onkeydown = batchOpsKeydown;
  
  $('.Content').html(Handlebars.templates.renderBatchOps(batchObj.context));

  $('#submitBulkOps').click(function() {
    processBatchOps();
  });

}  

function processBatchOps(){

  var c = $('#quickAllo').serializeObject();
  var xtags = [];
   
  if (typeof c.Tag == 'object') {
    $.each(c.Tag, function(i,el){
      if (c.Tag[i].length > 0 && c.DNS[i].length > 0 && c.IP[i].length >= 0) {
        xtags[i] = new Tag;
        xtags[i].setProperties({
          'Tag': c.Tag[i],
          'Building': c.selectList,
          'Closet': c.closet,
          'DNS': c.DNS[i],
          'IP': c.IP[i],
          'isAllocated': c.isAllocated[i]
        });
      }
    });
  } else {
    xtags[0] = new Tag;
    xtags[0].setProperties({
      'Tag': c.Tag,
      'Building': c.selectList,
      'Closet': c.closet,
      'DNS': c.DNS,
      'IP': c.IP,
      'isAllocated': c.isAllocated
    });
  }

  $.each(xtags, function (i, tag) {
    if(tag.hasEmpty()) {
      console.log('is empty');
      return;
    }
    console.log('processing');

    tag.deallocate(tag.allocate);
  });
}

function setLoader(el){
  var loader = $('<div/>').attr('class','windows8');

  for (var i =1; i < 6; i++){
    $('<div/>').attr('class','wBall').attr('id','wBall_'+i).html(
      $('<div/>').attr('class','wInnerBall')
    ).appendTo(loader);
  }
  $(el).html('').append(loader);
}

function setStatus(tag, row){
  var statusCell = $('.status', $('#'+row));
  var bank = JSON.parse(localStorage.equipment)[tag.dbInventory_n_DescriptionID]; 
  tag.bank = bank;
  
  if (tag.error || tag.dbInventory_s_SMSUTag == "") {
    $(statusCell).html('').append('Not Found Bro');
    $('#'+row).attr('class','tagSet error');
  } else { 
    
    $(statusCell).html(Handlebars.templates.tagSetStatus(tag));

    $('#'+row).attr('class','tagSet info');

    setTimeout(function(){
     $('#'+row).removeClass('info');
    }, 1000);
  }
}

var bldg = {
  closets: [],

  getClosets: function(building){
    
    $.ajax({
      type: 'POST',
      url: siteUrl+'/NetInfo/AllocateEquipment.asp',
      data: {
        'scrollHeight':'',
        'scrollWidth':'',
        'Tag':'X3222',
        'State':'1 Building',
        'Class': 'A',
        'Building' : building,
        'AllocatePorts':''
      }
    }).always(function(){
        localStorage[building] = bldg.closets;
    }).done(function(data){
      var stage = document.createElement('div');
      stage.innerHTML = data.replace(/<img(.|\s)*?\/>/g,'');
      stage.childNodes;

      $('#Closet', stage).children().each(function(i,l){
        if (l.value != '') bldg.closets.push(l.value);
      });
    });
  }
}

// Grabs equipment info from an ajax command using types
var fetch = {
  //Uses data function to fetch different the different data types from below
  type: {
    'equipment': {
      'url':siteUrl+'/NetInfo/EquipmentDetail.asp',
      'return': temp = {},
      'data':{},
      'func':function(stage){$("#dbInventory_n_DescriptionID option",stage).each(function(i,el){this.return[el.value] = el.label}.bind(this))}
    }, 
    'building': {
      'url':siteUrl+'/NetInfo/AllocateEquipment.asp',
      'return':temp=[],
      'data':{'Tag':'X3333'},
      'func': function(stage){$("#Building",stage).children().each(function(i,l){if(l.innerHTML!='') this.return.push(l.value)}.bind(this))}
    }, 
    'objIds': {
      'url':siteUrl+'/NetInfo/LinkSelect.asp?mode=Device+Select&LocalPort=4130_ge+_0_0_0&dbnIP3=&dbnIP4=&dbsName=*&dbsCurBldg=&dbsCurCloset=',
      'return':temp={},
      'data':{},
      'func': function(stage){$('[name="ObjID"]',stage).each(function(i,el){this.return[el.value]=$('label',$(el).parents('tr'))[0].outerText}.bind(this))}
    }, 
    'dnsObjs': {
      'url':siteUrl+'/NetInfo/LinkSelect.asp?mode=Device+Select&LocalPort=4130_ge+_0_0_0&dbnIP3=&dbnIP4=&dbsName=*&dbsCurBldg=&dbsCurCloset=',
      'return':temp={},
      'data':{},
      'func': function(stage){$('[name="ObjID"]',stage).each(function(i,el){this.return[$('label',$(el).parents('tr'))[0].outerText]=el.value}.bind(this))}
    } 
  }, 
  data: function(type) {
     
    $.ajax({
      type:'POST',
      url: this.type[type].url,
      data: this.type[type].data
    }).done(function(data){
     
      var stage = document.createElement('div');
      stage.innerHTML = data.replace(/<img[^>]*>/g,'');
      stage.childNodes;
      
      this.type[type].func(stage);
      localStorage[type] = JSON.stringify(this.type[type].return); //yeah, this shit works.
       
    }.bind(this));
  }
}


function LinkSet() {
  this.modes = {
    'Device Select': 
      {
        'mode':'Device Select',
        'LocalPort':'',
        'dbnIP3':'',
        'dbnIP4':'',
        'dbsName':'',
        'dbsCurBldg':'',
        'dbsCurCloset':''
    },
    'Unit Select': {
        'mode':'Unit Select',
        'LocalPort':'',
        'dbsName':'',
        'ObjID':''
    },
    'Port Select': {
        'mode':'Port Select',
        'LocalPort':'',
        'dbsName':'',
        'ObjID':'',
        'UnitID':''
    },
    'Confirmation':{
        'mode':'Confirmation',
        'LocalPort':'',
        'DNSName':'',
        'ObjID':'',
        'PortID':'',
        'If3Used':'',
        'If2Used':'',
        'R1':'V1'
    },
    'Finished': {
        'mode':'Finished',
        'LocalPort':'',
        'DNSName':'',
        'ObjID':'',
        'PortID':'',
        'If3Used':'',
        'If2Used':''
    }
  };
  
  this.properties = '';
}

var Case = {
  getOpen: function(){

  },

  getUserCases: function(user){

  },

  getCase: function(caseId){

  },
}

function tempCleanQuery(obj){
  var stage = document.createElement('div');
  stage.innerHTML = obj.data.replace(/<img[^>]*>/g,'');
  stage.childNodes;
    
  $.each($('tr, td, th', stage),function(){
    $(this).removeAttr('style');
    $(this).removeAttr('bgcolor');
  });
 
  $('table',stage)
    .attr('class','table table-bordered table-condensed table-striped')
    .removeAttr('style');
  
  if (obj.flag == 'queryBox'){
    $('table',stage).addClass('query');

    $('[type="submit"],[type="reset"]',stage).removeAttr('style').addClass('btn');
    $('[type="reset"]',stage).addClass('btn-warning');


    $('[type="submit"]', stage)
      .on('submit', function(e){
        e.preventDefault();
    }).on('click', function(e){
        e.preventDefault();
        (new caseSearch($('[name="IP Requests"]').serializeObject())).submitQuery();
        return false;
    })
  }else if (obj.flag == 'subQuery'){
    $('[type="submit"]', stage)
      .removeAttr('style')
      .addClass('btn')
      .on('submit', function(e){
        e.preventDefault();
      })
      .on('click', function(e){
        e.preventDefault();
        tempGetCase(this.value);
      });
  }
  $('p', stage).removeAttr('align');
  $('#PreCase', stage).remove(); //strip out unwanted text
  
  return stage;
}


function setDisplay(obj){
  document.title = obj.title;
  
  var page = Handlebars.templates.pageWithNav(obj.navLinks);  // handlebars in teh house

  $('.Page').html('').append(page);
  
  obj.func();
  
  delete page;
}

function caseSearch(obj){
  this.data = {};

  this.data['rdoStatus'] = obj.rdoStatus;
  this.data['txtUser'] = obj.txtUser;
  this.data['cboType'] = obj.cboType;
  this.data['cboBldg'] = obj.cboBldg;
  this.data['cboOwner'] = obj.cboOwner;
  this.data['txtJack'] = obj.txtJack;
  this.data['txtTech'] = obj.txtTech;
  this.data['txtCaseNm'] = obj.txtCaseNm;
  this.data['Last'] = obj.Last;
}

caseSearch.prototype.submitQuery = function() {
  setLoader($('.Content'));
  
  $.ajax({
    url: siteUrl+'/case/QuerySummary-body_update.asp',
    data: this.data
  }).done(function(Data){
    $('.Content').html($('form',tempCleanQuery({data:Data,flag:'subQuery'})));
    this.content = $('.Content').html();

    $('#backToQuery').on('click', function(e){
      e.preventDefault();
      $('.Content').html(this.content);
      $('[type="submit"]')
        .removeAttr('style')
        .addClass('btn')
        .on('submit', function(e){
          e.preventDefault();
        })
        .on('click', function(e){
          e.preventDefault();
          tempGetCase(this.value);
        });
    }.bind(this));
  }.bind(this));
}

function tempGetQueryBlock(){
  setLoader($('.Content'));
  
  $.ajax({
    type: 'POST',
    url: siteUrl+'/case/queryCase.asp'
  }).done(function(data){
    $('.Content').html($('form',tempCleanQuery({data:data,flag:'queryBox'})));
  });
}

function tempGetCase(id){
  setLoader($('.Content'));
  
  $.ajax({
    type: 'POST',
    url: siteUrl+'/case/Case_Detail.asp',
    data: {'cmdSubmit':id},
  }).done(function(data){
    $('.Content').html($('table',tempCleanQuery({data:data,flag:'getCase'}))[3]);
  });
}

//function History(){
//}
//
//History.prototype.addEntry = function(entry){
//  var currDate = Date.now();
//  var newEntry = {};
//  newEntry[currDate] = {};
//
//  $.each(entry, function(unit,el){
//    newEntry[currDate][unit] = this;
//  });
//  
//
//}

function getHistory(){
  var Forms = $('form',$('.Page'));
  var tempHistory = {};
  $.each(Forms, function(){tempHistory[this.name] = ($(this).serializeObject())});
  addEntry(tempHistory);
}

function addEntry(entry){
  var currDate = Date.now();
  var newEntry = {};
  
  $.each(entry, function(unit, el) {
    if (!newEntry[this.ObjId]) newEntry[this.ObjId] = {};
  });

  $.each(entry, function(unit,el){
    newEntry[this.ObjId][unit] = this;
  });

  
  if(localStorage.hist == null || localStorage.hist == "") localStorage.hist="{}";
  
  var history = JSON.parse(localStorage.hist);

  if (!history[returnDate()]){
    history[returnDate()] = {};
  }
  console.log(newEntry);

  history[returnDate()][currDate] = newEntry;
  localStorage.hist = JSON.stringify(history);

}

function getPast(obj){
  var history = JSON.parse(localStorage.hist);
  var list = [];

  $.each(history, function(entryDate){
    temp['date'] = entryDate;
    $.each(this, function(entryTime, el){
      if (el[obj]) {
        temp['date']['time'] = entryTime;
        list.push(temp);
      }
    });
  });

  console.log(list);
  return(list);
}

function renderList(obj){
  var list = getPast(obj);
  $('#valueList').append(Handlebars.templates.selectListPartial(list))
  $.each(list, function(el,i){
    console.log(this);
  });
}

//TODO : add history compression: http://stackoverflow.com/questions/1068834/object-comparison-in-javascript

