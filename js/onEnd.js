//Pretty Buttons
styleButtons();
$('[size="13"]').each(function(a){this.setAttribute('size','20');});
$('[name="dbdVerifyDt"]').each(function(a){this.setAttribute('size','10');});



//Add Link Redux
//  Add onclick to each button that launches
//  an AJAX modal.
$('[size="18"]').each(function(i, el){
  var port = (this.name).replace('Link_', '');
  

  this.setAttribute('style','');
  this.removeAttribute('readonly');
  //this.removeAttribute('onclick');
  this.setAttribute('type','button');
  this.setAttribute('class','btn btn-link');
  this.setAttribute('size','20');
  
  if (this.value == 'add') {
    this.setAttribute('class', 'btn');
  }

  el.removeAttribute('onclick');

  $(el).click(function(e) {
    if (el.value == 'add') {
      form = new LinkPort(1); 
      return;
    }
    form = new LinkPort();
  });
});

urlCheck('PortList.asp',btnDates);
urlCheck('PortList.asp',btnBar);
document.body.removeAttribute('onload');

var t = document.createElement('script');
var url = chrome.extension.getURL('reload.html');
t.innerHTML = "var url = \"" + url + "\";";
document.documentElement.insertBefore(t);
setReload();
