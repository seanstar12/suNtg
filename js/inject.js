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
    var auth = document.cookie.indexOf('ASPXAUTH');                  //Look for auth token
    var cookie = document.cookie.split(';');                         //Get all teh cookies
    
    if (auth == -1) {                                                //If no auth token ...
      if (window.location.pathname.split('/')[2].indexOf('Default.aspx') != -1) {           // exploiting the login form so that if
                                                                                            //  AUTH != found && user is on privileged
        window.location = "https://ntg.missouristate.edu/Login/login.aspx?ForceLogin=true"; //  page, we make the login form kill it's own
      }                                                                                     //  so we can set it.
      cookie.push("ASP.NET_SessionId="+ MasterPageSessionID);                             // Add SessonId to stack
    }
    
    cookie.forEach(function(item, i) {                                                      // Check for cookies that have ASP
      if(item.match('ASP')) {                                                               // on the ntg domain and set experation to a year
        var current = item.split('=');
        setCookie(current[0],current[1],365);
      }
    });
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
  
  function init() {
    
    document.body.setAttribute('onload','');  
    hijackCookies();
    writeCode();  
  //Object.defineProperty(window, 'sessionTimeout', { value: 31536000 }); // set javascript timeout to a year
    var url = window.location.pathname.split('/');
    
    if (url.length >= 3) {
    
      if (url[2].indexOf('login.asp') > -1) {
        document.forms.aspnetForm.setAttribute('autocomplete','on');  //set autocomplete for login form
      } 
      if (url[2].indexOf('EquipmentDetail.asp') != -1) {              // run functions if on EquipmentDetail page
    
      }
    }
  }

  //deallocateTag('X3675');
  function layoutChange(){
    var replace = "";
    var replace = '<a style="float:left;" href="/Tools/Default.aspx">Networking</a>';
    document.getElementsByClassName('header')[0].innerHTML = replace;
    document.getElementsByClassName('header')[0].appendChild(document.getElementsByClassName('Breadcrumb')[0]);
    document.getElementsByClassName('header')[0].setAttribute("style","height: 15px; background: none; border: none; color: #000");
  }
  
  function writeCode() {
    var funInject = document.createElement('script');
    var codeInject = ['function getPage(){var base="https://ntg.missouristate.edu/";var urls =["Tools/Default.aspx","NetInfo/EquipmentDetail.asp","NetInfo/FloorPlans.asp", "NetInfo/EquipmentList.asp?dbsSMSUTag=X3604"];'+
    'var frame = document.createElement("iframe");frame.setAttribute("id","netHijack");var rand = urls[Math.floor((Math.random()*3))];frame.setAttribute("src",base+rand);console.log(rand);console.log(frame);'+
    'document.getElementsByClassName("Main")[0].appendChild(frame);}'];
    funInject.innerText = codeInject;
    document.body.appendChild(funInject);
  }

  layoutChange();
  init();
  
  
}

var script = document.createElement('script');
script.textContent = '(' + code + ')()';
document.body.appendChild(script);
//script.parentNode.removeChild(script);
