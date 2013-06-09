function updateDate () { 
 
  function addMenu() {
    var nav = document.getElementsByClassName('LocalNav')[0].children[0];
    var massDate = document.createElement('li');

    massDate.setAttribute('class','NavHeading');
    massDate.innerText = 'Mass Update Date';

    nav.insertBefore(massDate, nav.firstChild);
  }
  
  function prevent(e) { 
    e.preventDefault();
    return false;
  }
  addMenu();                
  var dateArray = document.getElementsByName('dbdVerifyDt');
  var forms = document.forms;  
  var check = document.getElementsByName('Update');
                          
  console.log(forms.length);
                            
  var cDate = new Date();
  var day = cDate.getDate();
  var month = cDate.getMonth() +1;
  var year = cDate.getFullYear();
  //var date = "1/17/2013";
  var year = cDate.getFullYear();
  var date = month + "/" + day + "/" + year;
                                      
  for (var i = 0; i < dateArray.length; i++) {
    dateArray[i].value= date;
  }
                          
  for (var k = 0; k < check.length; k++){
    check[k].checked= true;
  }

  for (var j = 0; j < forms.length; j++){
//    forms[j].addEventListener('submit', prevent, false);
//    document.forms[j].elements['cmdSubmit'].click();
  }
}
