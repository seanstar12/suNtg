function updateDate () { 
  
  function prevent(e) { 
    e.preventDefault();
    return false;
  }
                  
  var dateArray = document.getElementsByName('dbdVerifyDt');
  var forms = document.forms;  
  var check = document.getElementsByName('Update');
                          
  console.log(forms.length);
                            
  var cDate = new Date();
  var day = cDate.getDate();
  var month = cDate.getMonth() +1;
  var year = cDate.getFullYear() -1;
  //var date = month + "/" + day + "/" + year;
  var date = "1/17/2013";
                                      
  for (var i = 0; i < dateArray.length; i++) {
    dateArray[i].value= date;
  }
                          
  for (var k = 0; k < check.length; k++){
    check[k].checked= true;
  }

  //for (var j = 0; j < forms.length; j++){
  //  forms[j].addEventListener('submit', prevent, false);
  //  document.forms[j].elements['cmdSubmit'].click();
  //}
}
