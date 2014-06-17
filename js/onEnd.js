//Render Navbar and special options
urlCheck(['LinkSelect.asp','AllocateEquipment.asp'],function(){
  constructHeader();
  ntgCleanup((window.location.origin).indexOf('dev')>0);
},true);

// Portlist page functions :: Display Extra side nav :: Remove stupid size (updated size in css)
urlCheck('PortList.asp', function(){
  $('table').addClass('table table-condensed portTable');
  $('.Navigation').prepend(Handlebars.templates.ntgSideNav(portListLinks));
  
  $.each(portListLinks, function(el, i){
    if (typeof(this.func) == "function") this.func();
  });

  $('[name="dbsDescription"]').removeAttr('size');

  var swtchCfg;

  $('.LocalNav ul li a').each(function() { 
    if (this.innerHTML == "Configure Switch") {
      $(this).on( "click" , function(e) {
        e.preventDefault();
        window.open(this.href,'_blank');
        chrome.runtime.sendMessage(chrome.i18n.getMessage("@@extension_id"), {data:'reqLogIn'},
          function(response) {
            console.log(response.msg);
          }
        );
      });
    }
  });

});

//Automatically update date verified after allocation of entity
urlCheck('EquipmentDetail.asp', function() {
  if (1 == 0){
    if (document.getElementsByClassName('NetWarning')[0] != null) {
      updateVerify(getId('dbInventory_s_SMSUTag').value);
      getId('dbInventory_d_VerifyDt').value = returnDate();
      $(document.getElementsByClassName('NetWarning')).remove()
    }
  }
});


urlCheck('UpdateSwitch.asp', function(){
  var button = $("input[name='cmdSubmit']");
  button.on('click', function(e){
    chrome.runtime.sendMessage(chrome.i18n.getMessage("@@extension_id"), {data:'reqLogIn'},
      function(response) {
        console.log(response.msg);
      }
    );
  });
});

urlCheck('Default.aspx', function(){

  removeFavCol($('.FavCol')); // Also removes title
  var content = $('.Content');
  setDisplay(toolsObj);
  $('.Content').html(content);
   
  $('.Navigation ul').append(Handlebars.templates.ntgSidebar(ntgSideLinks));
  
  $.each(ntgSideLinks, function(el, i){
    if (typeof(this.func) == "function") this.func();
  });
});

searchTool.bindSearch();
document.body.removeAttribute('onload');


clickDate();
//setOnKeys();
//$('#logOut').bind('click', function(e) {
//  //e.preventDefault();
//  portalFrame(chrome.extension.getURL(''),'logout');
//});
//
//$('#settings').bind('click', function(e) {
//  //e.preventDefault();
//  portalFrame(chrome.extension.getURL(''),'settings');


//Add Link Redux
//  Add onclick to each button that launches
//  an AJAX modal.
//$('[size="18"]').each(function(i, el){
//  var port = (this.name).replace('Link_', '');
//  
//
//  this.setAttribute('style','');
//  this.removeAttribute('readonly');
//  //this.removeAttribute('onclick');
//  this.setAttribute('type','button');
//  this.setAttribute('class','btn btn-link');
//  this.setAttribute('size','20');
//  
//  if (this.value == 'add') {
//    this.setAttribute('class', 'btn btnLink');
//  }
//
//  el.removeAttribute('onclick');
//
//  $(el).click(function(e) {
//    if (el.value == 'add') {
//      form = new LinkPort(1); 
//      return;
//    }
//    form = new LinkPort();
//  });
//});

