
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


         ' <ul class="nav"><li><a href="/Tools/Default.aspx">Tools</a></li> ' +
         ' <li><a href="/NetInfo/EquipmentDetail.asp">Search</a></li> ' +
         ' <li><a href="/NetInfo/FloorPlans.asp">Floor Plans</a></li> ' +
         ' <li><a href="/NetInfo/BuildingInventory.asp">Inventory</a></li> ' +
         ' </ul></div></div></div></div> ';

var head = document.getElementsByClassName('header')[0];
head.setAttribute('class','Header');
head.innerHTML = b;

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


var nav = [
    new NavLink('addCurrentDate', 'Set Dates to ' + returnDate(), form.allDates).createLink(),
    new NavLink('addCustomDate', 'Set Custom Date', form.custDate).createLink(),
    $('<li/>').attr('class','divider'),
    new NavLink('massInput','Mass Input Mode',massInput).createLink(),
    new NavLink('updateAll','Update All Switches',form.submitForms).createLink()
          ];

urlCheck('PortList.asp', function(){new Navigation('mainNav','nav nav-link',nav).createMenu()});

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
//});
