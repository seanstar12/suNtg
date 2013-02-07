var code = function (){
  
  var extUrl = 'chrome-extension://ihagcjlipplnnkjdelbpnkdhoekoichp/js/';

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

  function setObjId() { //Sets URL to have objid. No More Post reuqests. :D
    id = document.forms[0].children[0].value;
    url = (document.URL).toLowerCase();
    if (url.indexOf('objid') < 0) {
      document.body.style.display = "none";
      window.location += "?ObjId=" + id + "&f=1";
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
  
  function addLinks() {
    var el = document.createElement('div');
    var ul = document.createElement('ul');
    el.className = "selectList";

    var name = (document.getElementsByClassName('Content')[0].children[0].innerHTML);
    name = name.split(' ');
    
    var k =0;
    var content = "";
    var item = document.getElementsByClassName('NetHeading');
    var length = item.length;
    if (length < 3 ) return false; 
    else {
      for (var j=1;j<length;j+=2){
        content += "<li><a href=\"#switch_"+(j-1)+"\">(<span class=\"gE\">"+k+"/0</span>-</a></li>";
        content += "<li><a href=\"#switch_"+(j)+"\"><span class=\"xE\">"+k+"/1</span>)</a></li>";
        k++;
      }
      for (var i=1; i< length; i++){
        item[i].innerHTML += "<span id=\"switch_"+(i-1)+"\" class=\"sL\">"+name[2]+ " " +content+"</div>"; 
      }
    }
  }
  
  function tabReturn(){

    var input = document.getElementById('dbsName');
    
    if (input != null) input.focus();
    
    document.onkeydown = keyHandler;
             
    function keyHandler(event) {
      var code;
      var e;
                      
      if (document.all) {
        if (!event) {
          var e = window.event;
          code = e.keyCode;
        }
      } 
      else if (event.which) {
        code = event.which;
        e = event;
      }
      if (e.keyCode == 9){
        if ((input.value).length > 1)  {
          document.forms[0].mode.value = "Device Select";
          document.forms.PageBody.submit();
          return false;
        }
      }
    }
  }

  function closeListen(){
    if (document.body.innerHTML == "") window.close();
  }


  //deallocateTag('X3675');
  function layoutChange(){
    var replace = '<a style="float:left;" href="/Tools/Default.aspx">Networking</a>';
    var el = document.getElementsByClassName('header')[0];
    el.innerHTML = replace;
    el.appendChild(document.getElementsByClassName('Breadcrumb')[0]);
    el.setAttribute("style","height: 15px; background: none; border: none; color: #000");
  }
  
  function addFunctions() {
    var inject = document.createElement('script');
    inject.setAttribute('src',extUrl +'functions.js');
    document.head.appendChild(inject);
  }
  
  function addjquery() {
    var inject = document.createElement('script');
    inject.setAttribute('src',extUrl+'jquery-1.8.3.min.js');
    document.head.appendChild(inject);
  }

  function logMeIn() {
    
    document.forms.aspnetForm.setAttribute('autocomplete','on'); 
    document.forms[0].addEventListener("submit", function(evt) {
      localStorage['user'] = $('#ctl00_MainContent_UserID').attr('value');
      localStorage['pass'] = $('#ctl00_MainContent_Password').attr('value');

      window.postMessage({ type: "FROM_PAGE", text: localStorage.pass},"*");

    }, false);
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
  
  function autoDate() {
    //alert("autodate"); 
    if (getUrlVars()["d"] == 1) {
    
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
  
  function injPop() {
    var script = document.createElement('script');
    var div = "<div id='fade'><div id='dialog'><h1>Oh Noes!</h1><p>Your screen has been locked. Please enter your password to continue.</p><input type='password' name='pass' id='pass' size='20'></div></div>";
    var code = '$(function() {var docHeight = $(document).height();$("body").append('+ div +')})';
    script.innerText = code;
    document.body.appendChild(script);
  }
  
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }

  function init() {
    addjquery();
    document.body.setAttribute('onload','');
    if (getUrlVars()['f'] == 1) document.body.style.display='none';    
  
    if (!localStorage.layoutChange) urlCheck(['LinkSelect.asp'],layoutChange,true);
    if (!localStorage.fillDate) urlCheck('EquipmentDetail.asp',fillDate);
    if (!localStorage.tabReturn) urlCheck('LinkSelect.asp',tabReturn);
    if (!localStorage.closeListen) urlCheck('LinkSelect.asp',closeListen);
    if (!localStorage.addLinks) urlCheck('PortList.asp',addLinks);
    if (!localStorage.fixurl) urlCheck('PortList.asp',setObjId);
    if (localStorage.autoDate) urlCheck('PortList.asp',autoDate);
    if (!localStorage.checkFix) checkFix();
    if (!localStorage.logIn) urlCheck('Login',logMeIn);
    
    addFunctions();
    setTimeout(function(){
      if (getUrlVars()["f"] == 1) $('body').fadeIn(250);
      //$('body').fadeIn(250);
    }, 150);
  }
  
  // Runs every page load
  init();
}



if (window.location.pathname.toLowerCase() == "/login/login.aspx" ) {
  document.body.innerHTML = "";
  document.title='Magic Smoke Goes Here';
  chrome.extension.sendMessage({data: "loginPage"}, function(response) {
    console.log(response);
  });
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
   
   setTimeout(function(){ 
      if (request.data == "reload") {
        sendResponse({msg: "Callback from background tab"});
        var newUrl = decodeURIComponent(window.location.search)
                            .replace('?ForceLogin=true&ReturnURL=','')
                            .replace('?ReturnUrl=','');
        if (newUrl.indexOf('?') < 0) newUrl +='?f=1';
        else if (newUrl.indexOf('?') > 0) newUrl +='&f=1';
        
        window.location = newUrl;
      }
    }, 1000);

  });

var script = document.createElement('script');
script.textContent = '(' + code + ')()';
document.head.appendChild(script);
//script.parentNode.removeChild(script); //I was never here...
