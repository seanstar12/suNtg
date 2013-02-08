
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }
  
  function autoDate() {
    //if (getUrlVars()["d"] == 1) {
    
      var dateArray = document.getElementsByName('dbdVerifyDt');
      var forms = document.forms;
      var check = document.getElementsByName('Update');

      var cDate = new Date();
      var day = cDate.getDate();
      var month = cDate.getMonth() +1;
      var year = cDate.getFullYear() -1;
      //if (getUrlVars()["dVal"] != "" ) var date = getUrlVars()["dVal"];
      var date = month + "/" + day + "/" + year;

      for (var i = 0; i < dateArray.length; i++) {
        dateArray[i].value= date;
      }
      for (var k = 0; k < check.length; k++){
        check[k].checked= true;
      }
    //}
  }
//<input type="submit" value="Update" name="cmdSubmit" title="Update selected records WITH date">
  function addButtons(){
    var forms = document.forms;
    for (var i=0; i<forms.length;i++){
      var button = document.createElement('input');
      button.setAttribute('type','submit');
      button.setAttribute('value',getDate());
      button.setAttribute('id','cmdSubmitDate');
      button.setAttribute('title','Update With date');
      forms[i].appendChild(button);
    }
  }
  
  function getDate() {
    var cDate = new Date();
    var day = cDate.getDate();
    var month = cDate.getMonth() +1;
    var year = cDate.getFullYear();
      //if (getUrlVars()["dVal"] != "" ) var date = getUrlVars()["dVal"];
    //return  month + "/" + day + "/" + year;
    return "2/1/2013";
  }

