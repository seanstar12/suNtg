var menuObject =  [
                    {'title':'Tools','id':'toolLink','value':'/Tools/Default.aspx'},
                    {'title':'Search','id':'searchLink','value':'/NetInfo/EquipmentDetail.asp'}, 
                    {'title':'Floor Plans','id':'floorPlanLink','value':'/NetInfo/FloorPlans.asp'}, 
                    {'title':'Inventory','id':'inventoryLink','value':'/NetInfo/BuildingInventory.asp?InvCampus=Springfield&InvMonth=99'},
                    {'parent': true, 'title':'Case System', 'sub':[
                      {'title':'Ticket System','parent':'Case System','id':'ticketLink', 'value':'/case/queryCase.asp' },
                      {'title':'TeleCom','parent':'Case System','id':'caseLink','value':'http://telsem.missouristate.edu/selfservice'}]},
                    {'parent': true, 'title':'NTG Tools', 'sub':[
                      {'title':'Batch Operations','parent':'NTG Tool','id':'batchOps', 'value':'#NtgTool/BatchOperations' },
                      {'title':'Yearly Inventory','parent':'NTG Tool','id':'yearlyInventory', 'value':'#NtgTool/YearlyInventory' },
                      {'title':'Delete All The Things','parent':'NTG Tool','id':'rmAll', 'value':'#NtgTool/DeleteAllThings' }]}
                  ];
//console.log(JSON.stringify(menuObject));
urlCheck(['LinkSelect.asp','AllocateEquipment.asp'],function(){
    var head = document.getElementsByClassName('header')[0];
    head.setAttribute('class','Header');
    head.innerHTML = Handlebars.templates.nav(menuObject);
 
    $('#batchOps').on('click',function(){
        batchOps();
    });
  
  }, true);

urlCheck('PortList.asp', function(){
  $('table').addClass('table table-condensed portTable');
  
  var nav = [
    new NavLink('addCurrentDate', 'Set Dates to ' + returnDate(), form.allDates).createLink(),
    new NavLink('addCustomDate', 'Set Custom Date', form.custDate).createLink(),
    $('<li/>').attr('class','divider'),
    new NavLink('massInput','Mass Input Mode',massInput).createLink(),
    new NavLink('updateAll','Update All Switches',form.submitForms).createLink()
  ];
  
  new Navigation('mainNav','nav nav-link',nav).createMenu()

});

urlCheck('LinkSelect.asp', function() {
  var values = document.getElementsByTagName('input');

  for (var i =0; i < values.length; i++){
    if (values[i].type == 'radio') {
      console.log(document.getElementsByName('mode')[0].value);
      if (document.getElementsByClassName('NetHeading')[0].innerHTML.indexOf('Select Port') > 0 ) {
        values[i].checked = true;
        document.forms[0].PortID.value = (values[i].id.split('Port_'))[1];
        break;
      }
    }
  }
  document.scripts[5].remove()
  if (document.body == "") window.close();
});

urlCheck('EquipmentDetail.asp', function() {
  if (document.getElementsByClassName('NetWarning')[0] != null) {
    document.getElementById('dbInventory_d_VerifyDt').value = returnDate();
    document.getElementsByName('cmdSubmit')[0].click();
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
