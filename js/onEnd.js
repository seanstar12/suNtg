
var b =  ' <div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"> ' +
         ' <div class="container-fluid"> ' +
         ' <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> ' +
         ' <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span> ' +
         ' </button><a class="brand" href="https://ntg.missouristate.edu">Networking</a> ' +
         ' <div class="nav-collapse collapse">' + 
         ' <div class ="btn-group pull-right"> '+ 
         ' <button class="btn dropdown-toggle btn-small btn-inverse"data-toggle="dropdown"><span class="caret">' + 
         ' </span></button><ul class="dropdown-menu"> ' +
         ' <li><a id="logOut" href="#">Log Out</a></li><li><a id="settings"href="#">Settings</a></li>' +
         ' <li><a id="reload" href="#">Reload</a></li></ul></div> ' +

         ' <form class="navbar-search pull-right" id="srchBox" action="">' +
         ' <input type="text" class="search-query span2" id="searchBox" placeholder="Search"></form>' +
          ' <ul class="nav" id="custNavBar"></ul> ' +
          ' </div></div></div></div> ';


var menuObject =  [
                    {'title':'Tools','pos':'0','parent':'0','id':'toolLink','value':'/Tools/Default.aspx'},
                    {'title':'Search','pos':'1','parent':'0','id':'searchLink','value':'/NetInfo/EquipmentDetail.asp'}, 
                    {'title':'Floor Plans','pos':'3','parent':'0','id':'floorPlanLink','value':'/NetInfo/FloorPlans.asp'}, 
                    {'title':'Inventory','pos':'4','parent':'0','id':'inventoryLink','value':'/NetInfo/BuildingInventory.asp?InvCampus=Springfield&InvMonth=99'},
                    {'title':'Batch Operations','pos':'0','parent':'1','id':'batchOps', 'value':'#NtgTool/BatchOperations' },
                    {'title':'Yearly Inventory','pos':'1','parent':'1','id':'yearlyInventory', 'value':'#NtgTool/YearlyInventory' },
                    {'title':'Delete All The Things','pos':'2','parent':'1','id':'rmAll', 'value':'#NtgTool/DeleteAllThings' },
                    {'title':'Ticket System','pos':'0','parent':'2','id':'ticketLink', 'value':'/case/default.asp' },
                    {'title':'TeleCom','pos':'1','parent':'2','id':'caseLink','value':'http://telsem.missouristate.edu/selfservice'} 
                  ];


urlCheck(['LinkSelect.asp','AllocateEquipment.asp'],function(){
    var head = document.getElementsByClassName('header')[0];
    head.setAttribute('class','Header');
    head.innerHTML = b;
    var toolsMenu = $('<li>', {class:'dropdown'}).html(
            '<a class="dropdown-toggle" data-toggle="dropdown">NTG Tools  <b class="caret"></b></a>' +
            '<ul class="dropdown-menu" id="dropDown"></ul>' 
    );
    
    var caseMenu = $('<li>', {class:'dropdown'}).html(
            '<a class="dropdown-toggle" data-toggle="dropdown">Cases  <b class="caret"></b></a>' +
            '<ul class="dropdown-menu" id="dropDown"></ul>' 
    );
      
      $.each(menuObject, function(x, elm){
        if (elm.parent == '0') {
          $('#custNavBar').append( $('<li>', {id:elm.id}).html('<a href='+ elm.value +'>' +elm.title+ '</a>'));
        }
        else if (elm.parent == '1') {
          $('#dropDown', toolsMenu).append( $('<li>', {id:elm.id}).html('<a href='+ elm.value +' class="subDrop">' +elm.title+ '</a>'));
        }
        else if (elm.parent == '2') {
          $('#dropDown', caseMenu).append( $('<li>', {id:elm.id}).html('<a href='+ elm.value +' class="subDrop">' +elm.title+ '</a>'));
        }
      });
      
      $('#custNavBar').append(caseMenu);
      $('#custNavBar').append(toolsMenu);

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
