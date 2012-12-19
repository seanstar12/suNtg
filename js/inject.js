var code = function (){
  
  function deallocateTag(xtag){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
      if (http.readyState == 4 && http.status == 200) {
        var div = document.createElement("div");
        //div.setAttribute("style",'display: none;');
        div.innerHTML = http.responseText;
        document.getElementsByClassName('Main')[0].appendChild(div);
        //document.forms['detailform'].command.value = "Deallocate";
        //document.forms['detailform'].submit();
      }
      
    }
    http.open("GET","https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag="+xtag);
    http.send(); 
  }
  
  function setCookie(c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString())+"; path=/";
    document.cookie=c_name + "=" + c_value;
  }
  
  function hijackCookies() {
    var auth = document.cookie.indexOf('ASPXAUTH');
    var cookie = document.cookie.split(';');
    
    /*if (auth == -1) { //Cookie Hijack ... Do this later
      var goTo = (window.location = "https://ntg.missouristate.edu/Login/login.aspx?ForceLogin=true")();
      urlCheck(['Default'],
      if (window.location.pathname.split('/')[2].indexOf('Default.aspx') != -1) {
      }
      cookie.push("ASP.NET_SessionId="+ MasterPageSessionID);
    }
    
    cookie.forEach(function(item, i) {
      if(item.match('ASP')) {
        var current = item.split('=');
        setCookie(current[0],current[1],365);
      }
    });
  */
  }
  
  function fillDate(){
    var element = document.getElementsByClassName('NetWarning');
    var date = document.getElementById('dbInventory_d_VerifyDt').value;

    if (element.length > 0 && date.length == 0) {
      document.getElementById('dbInventory_d_VerifyDt').value = returnDate();
      document.forms.detailform.cmdSubmit.click();
    }
  }
   
  function returnDate(){
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() +1;
    var year = currentDate.getFullYear();
    var date = month + "/" + day + "/" + year;
    return date;
  }
  

  //deallocateTag('X3675');
  function layoutChange(){
    var replace = '<a style="float:left;" href="/Tools/Default.aspx">Networking</a>';
    var el = document.getElementsByClassName('header')[0];
    el.innerHTML = replace;
    el.appendChild(document.getElementsByClassName('Breadcrumb')[0]);
    el.setAttribute("style","height: 15px; background: none; border: none; color: #000");
  }
  
  function addJquery() {
    var inject = document.createElement('script');
    inject.setAttribute('src','//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');
    document.body.appendChild(inject);
  }
  


  function logMeIn() {
    
    document.forms.aspnetForm.setAttribute('autocomplete','on'); 
    document.forms[0].addEventListener("submit", function(evt) {
      localStorage['user'] = $('#ctl00_MainContent_UserID').attr('value');
      localStorage['pass'] = $('#ctl00_MainContent_Password').attr('value');
    });
  }

  function checkFix() {
    if ((document.URL).indexOf('PortList.asp') >= 0) {
      
      var el = document.getElementsByName('Update');
      for (i=0; i < el.length; i++) el[i].id = (el[i].id).replace(' ',''); 
   
      document.scripts[1].innerText = ""; 
      var script = document.createElement('script');
      var code = 'function openSelectLinkWindow(ObjID, LinkPortInfo){var a=window.open("LinkSelect.asp?LocalPort="+ObjID+"_"+LinkPortInfo,"_blank");a.focus();}function checkChanged(fName, num){num =num.replace(" ","");eval("document.forms[\'"+fName+"\'].Update_"+num+".checked=true");}';
      
      script.innerText = code;
      document.body.appendChild(script);
       
    }
    if ((document.URL).indexOf('LinkSelect.asp') >=0){
      document.forms[0].dbsName.focus();
    }
  }

  function urlCheck(link,f,invert) {
  // invert {t,f} ; link {array of links} ; f {function to run}
  // invert = true, f() will NOT run on ARRAY of pages 
    if (invert) {
      var count = 0;
      for (var i=0; i < link.length; i++) {      
        var item = (document.URL.indexOf(link[i]) >= 0);
        if (item) count++;
      }
      if (count == 0) f();
    } else (document.URL.indexOf(link) >=0) ? f(): false;
  }
  
  function init() {
    addJquery();  
    document.body.setAttribute('onload','');  
    //hijackCookies();
    urlCheck(['LinkSelect.asp'],layoutChange,true);
    checkFix();
    urlCheck('Login',logMeIn);
  }
  
  
  // Runs every page load
  init();
  
}

var script = document.createElement('script');
script.textContent = '(' + code + ')()';
document.body.appendChild(script);
//script.parentNode.removeChild(script); //I was never here...
