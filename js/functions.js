//////////////////////////////////////////////////////////////////////
//                           functions.js                           //
//////////////////////////////////////////////////////////////////////
//  These functions get loaded to the page via loader.js            //
//  You have access to these functions on the site for debugging.   //
//  This file is broken up into 3 sections:                         //
//    Section 1: Init WAS here.                                     //
//    Section 2: Bug fixes on site                                  //
//    Section 3: General helper functions                           //
//    Section 4: Feature additions                                  //
//    Section 5: Grave Yard                                         //
//////////////////////////////////////////////////////////////////////

////////////////////////////////
//Section 1: Main Init Script://
////////////////////////////////



/////////////////
//End Section 1//
/////////////////

/////////////////////////
//Section 2: Bug Fixes://
/////////////////////////

//Required for checkFix, addInNewTab, and General Page functions.
function rmPageScript(){
  document.scripts[1].parentNode.removeChild(document.scripts[1]);
}

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

/////////////////
//End Section 2//
/////////////////

////////////////////////////////
//Section 3: Helper Functions://
////////////////////////////////

function addCss(css){
  //alert('add css');
  var link = document.createElement('link');
  link.href = chrome.extension.getURL(css);
  link.rel = 'stylesheet';
  document.documentElement.insertBefore(link);
}

function addScript(scrpt) {
  var inject = document.createElement('script');
  //inject.setAttribute('src',chrome-extension://);
  inject.src = chrome.extension.getURL(scrpt);
  document.head.appendChild(inject);
}

function checkChanged(fName, num){
  num = num.replace(' ','')
  eval("document.forms['"+ fName + "'].Update_" + num + ".checked = true");
}

function returnDate(){
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() +1;
  var year = currentDate.getFullYear();
  var date = month + "/" + day + "/" + year;
  return date;
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
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

//This function is because I am dumb. SwitchList Parenth Add.
function txt(evn, num){
  var text  = document.createElement('text');
  text.innerText = evn? (num? ')':'') : (num? '-':'(');
  return text;
}
/////////////////
//End Section 3//
/////////////////

////////////////////////////////
//Section 4: Feture Additions://
////////////////////////////////

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
  //http.open("GET","https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag="+xtag);
  //http.send(); 
}

function addLinks(){
  var name = (document.getElementsByClassName('Content')[0].children[0].innerHTML);
  name = name.split(' ');

  var item = document.getElementsByClassName('NetHeading');
  var cl = ['gE','xE','sL'];
  var k = 0;
  
  var ul = document.createElement('ul');
  ul.className = "selectList";    
  
  if (item.length < 3 ){ 
    return false;
  }

  else {      
    for ( var j=1;j < item.length; j+=2){     
      for ( var q=0; q < 2; q++){         
        var li = document.createElement('li');
        var a = document.createElement('a');
        var sp = document.createElement('span');
        
        sp.className = cl[q];
        sp.innerText = k + '/' + (q);
        a.href = '#switch_' + (k);
        
        a.appendChild(txt(q,0));
        a.appendChild(sp);
        a.appendChild(txt(q,1));

        li.appendChild(a);
        ul.appendChild(li);
      }
      k++;
    }  
    for (i=1; i<item.length;i++){  
      var sp = document.createElement('span');
      sp.id = 'switch_' + (i-1);
      sp.className = cl[2];
      sp.innerHTML = name[2];
      sp.appendChild(ul.cloneNode(true));
      item[i].appendChild(sp);
    }
  }
}

function autoDate() {
  var dateArray = document.getElementsByName('dbdVerifyDt');
  var check = document.getElementsByName('Update');

  var cDate = new Date();
  var day = cDate.getDate();
  var month = cDate.getMonth() +1;
  var year = cDate.getFullYear() -1;
  var date = month + "/" + day + "/" + year;

  for (var i = 0; i < dateArray.length; i++) {
    dateArray[i].value= date;
  }
  for (var k = 0; k < check.length; k++){
    check[k].checked= true;
  }
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

function fillDate(){
  var date = document.getElementById('dbInventory_d_VerifyDt').value;

  if (document.getElementsByClassName('NetWarning') && date.length == 0){
    document.getElementById('dbInventory_d_VerifyDt').value = returnDate();
    document.forms.detailform.cmdSubmit.click();
  }
}

function setObjId() { 
  id = document.forms[0].children[0].value;
  url = (document.URL).toLowerCase();
  if (url.indexOf('objid') < 0) {
    //document.body.style.display = "none";
    window.location += "?ObjId=" + id;// + "&f=1";
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

function tinyHeader(){
  var replace = '<a style="float:left;" href="/Tools/Default.aspx">Networking</a>';
  var el = document.getElementsByClassName('header')[0];
  el.innerHTML = replace;
  el.appendChild(document.getElementsByClassName('Breadcrumb')[0]);
  el.setAttribute("style","height: 15px; background: none; border: none; color: #000");
}

function forceForm(){
  document.forms.aspnetForm.setAttribute('autocomplete','on'); 
}

/////////////////
//End Section 4//
/////////////////






/////////////
//Graveyard//
/////////////

//Replaced this one with a pragmatic approach. Took hours, was not worth it.
/*function addLinks() {
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

//Not sure if I'll ever need this again. Don't think so, and I could pull it from git... but you know...
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
 *//*
}
*/
