//Pretty Buttons
$('[type="reset"]').each(function(a){this.setAttribute('class','btn btn-warning');});
$('[type="submit"]').each(function(a){this.setAttribute('class','btn');});
$('[type="button"]').each(function(a){this.setAttribute('class','btn');});
$('[value="Back"]').each(function(a){this.setAttribute('class','btn btn-inverse');});
$('[value="Remove Link"]').each(function(a){this.setAttribute('class','btn btn-danger');});
$('[value="Select"]').each(function(a){this.setAttribute('class','btn btn-primary');});
$('[value="Finish"]').each(function(a){this.setAttribute('class','btn btn-success');});
$('[size="13"]').each(function(a){this.setAttribute('size','20');});
$('[name="dbdVerifyDt"]').each(function(a){this.setAttribute('size','10');});

//Pretty link add
$('[size="18"]').each(function(a){
  this.setAttribute('style','');
  this.removeAttribute('readonly');
  this.removeAttribute('type');
  this.setAttribute('class','btn btn-link');
  this.setAttribute('size','20');
  
  if (this.value == 'add'){
    this.setAttribute('class', 'btn');
  }
});


urlCheck('PortList.asp',btnDates);
urlCheck('PortList.asp',btnBar);
