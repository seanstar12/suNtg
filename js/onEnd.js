//Render Navbar and special options
urlCheck(['LinkSelect.asp','AllocateEquipment.asp'],function(){
  constructHeader();
  if ((window.location.origin).indexOf('dev')>0) ntgDevCleanup();

},true);

// Portlist page functions :: Display Extra side nav :: Remove stupid size (updated size in css)
urlCheck('PortList.asp', function(){
  $('table').addClass('table table-condensed portTable');
  $('.Navigation').prepend(Handlebars.templates.ntgSideNav(portListLinks));
  
  $.each(portListLinks, function(el, i){
    if (typeof(this.func) == "function") this.func();
  });

  $('[name="dbsDescription"]').removeAttr('size');
});

//Automatically update date verified after allocation of entity
urlCheck('EquipmentDetail.asp', function() {
  if (document.getElementsByClassName('NetWarning')[0] != null) {
    updateVerify(getId('dbInventory_s_SMSUTag').value);
    getId('dbInventory_d_VerifyDt').value = returnDate();
    $(document.getElementsByClassName('NetWarning')).remove()
  }
});

searchTool.bindSearch();
document.body.removeAttribute('onload');

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

