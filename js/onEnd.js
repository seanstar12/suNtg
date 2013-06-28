//Render Navbar and special options
urlCheck(['LinkSelect.asp','AllocateEquipment.asp'],function(){
    var head = document.getElementsByClassName('header')[0];
    head.setAttribute('class','Header');
    head.innerHTML = Handlebars.templates.nav(menuObject);
 
    $('#batchOps').on('click',function(){
      setDisplay(batchObj);
      batchOps();
    });
    $('#caseSystem').on('click',function(){
      setDisplay(caseObj);
      tempGetQueryBlock();
    });
    
    if ((window.location.origin).indexOf('dev')>0) {
      ntgDevCleanup();
    }
},true);

urlCheck('PortList.asp', function(){
  $('table').addClass('table table-condensed portTable');
  $('.Navigation').prepend(Handlebars.templates.ntgSideNav(portListLinks));
  
  $.each(portListLinks, function(el, i){
    if (typeof(this.func) == "function") this.func();
  });

});


urlCheck('EquipmentDetail.asp', function() {
  if (document.getElementsByClassName('NetWarning')[0] != null) {
    updateVerify(getId('dbInventory_s_SMSUTag').value);
    getId('dbInventory_d_VerifyDt').value = returnDate();
    $(document.getElementsByClassName('NetWarning')).remove()
  }
});

searchTool.bindSearch();
document.body.removeAttribute('onload');

$('[name="dbsDescription"]').removeAttr('size');
// Start of on change for port list. changes the color of the row when changed
//$('[name="Update"]').live('change', function(){
//  if ($(this).checked = true){
//    $($(this).parent()).parent().toggleClass('warning');
//  } else {
//    $($(this).parent()).parent().toggleClass('warning');
//  }
//})

//setOnKeys();
//$('#logOut').bind('click', function(e) {
//  //e.preventDefault();
//  portalFrame(chrome.extension.getURL(''),'logout');
//});
//
//$('#settings').bind('click', function(e) {
//  //e.preventDefault();
//  portalFrame(chrome.extension.getURL(''),'settings');


//$('.header').html(b).attr('class','Header');

//Pretty Buttons
//styleButtons();
//$('[size="13"]').each(function(a){this.setAttribute('size','20');});
//$('[name="dbdVerifyDt"]').each(function(a){this.setAttribute('size','10');});



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

//urlCheck('PortList.asp',btnDates);


// only used as reference delete me

//var source   = "<p>{{lastName}}, {{firstName}}</p>";
//var template = Handlebars.compile(source);
//console.log('test');
//console.log(template({firstName: "Alan", lastName: "Johnson"}));

//batchOps();
