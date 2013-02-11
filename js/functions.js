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
  //console.log(document.scripts[1]);
  document.scripts[1].parentNode.removeChild(document.scripts[1]);
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
  document.documentElement.insertBefore(inject);
}

function checkChanged(fName, num){
  num = num.replace(' ','');
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
  //this gets the dns name from the top listing
  var name = (document.getElementsByClassName('Content')[0].children[0].innerHTML);
  name = name.split(' ');
  //this gets all of the 'Port Information' sections
  var item = document.getElementsByClassName('NetHeading');
  var cl = ['gE','xE','sL']; //used for my classes (arrays are fun)
  var k = 0; //counting var
  
  var ul = document.createElement('ul'); //make a master list
  ul.className = "selectList";  //class it 
  
  if (item.length < 3 ){ 
    return false; //cisco switches need not apply (juniper always have 3+)
  }

  else {
    var x = 0;      //counting var
    for ( var j=1;j < item.length; j+=2){     
      for ( var q=0; q < 2; q++){              //because on gig and 10-gig ports, create 2 links
        var li = document.createElement('li'); // per section (0/0 and 0/1)
        var a = document.createElement('a');
        var sp = document.createElement('span');
        
        sp.className = cl[q];                 //giving span class name (q=0) -- gE; (q=1) -- xE
        sp.innerText = k + '/' + (q);         //giving span the text -- 0/0;0/1;1/0...etc                       
        a.href = '#switch_' + (x);            //a link for switch
        
        a.appendChild(txt(q,0));              //to do the grey parenth around the sections
        a.appendChild(sp);                    //the actual item -- 0/1
        a.appendChild(txt(q,1));              //closing parenth

        li.appendChild(a);                    //attach anchor to li
        ul.appendChild(li);                   //attach li to ul
        x++;                                  //individual count for switch id links
      }
      k++;                                    // switch set count see line 148
    }  
    for (i=1; i<item.length;i++){             //for each net heading
      var sp = document.createElement('span');//  create new span
      sp.id = 'switch_' + (i-1);              //  give it an id
      sp.className = cl[2];                   //  apply class sL
      sp.innerHTML = name[2];                 //  append dns name 
      sp.appendChild(ul.cloneNode(true));     //  clone the master ul we created and append it to span
      item[i].appendChild(sp);                //  append the span to the NetHeadings we got from 128
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
