//Fix juniper switch pages for automatic checkbox selection on edit
function checkFix(){
  var el = document.getElementsByName('Update');
  for (i=0; i < el.length; i++) el[i].id = (el[i].id).replace(' ',''); 
}

//Open 'add link' in new tab.
function openSelectLinkWindow(ObjID, LinkPortInfo){ 
  (window.open("LinkSelect.asp?LocalPort=" + ObjID + "_" + LinkPortInfo,"_blank")).focus();
}

//Fix for after switch port allocation. Window never closes.
function closeListen(){
  if (document.body.innerHTML == "") window.close();
}
