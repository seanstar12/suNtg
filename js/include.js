var nT = {};

nT.storage = {
        // Return an individual item from storage
  get: function (set,key){
    var cellar = JSON.parse(localStorage.settings); 
    return cellar[set][key];
  },
        // Set an individual item from storage eg. (interface, tinyHeader, 1)
  set: function (set,key,val) {
    var cellar = JSON.parse(localStorage.settings);
    cellar[set][key] = val;
    localStorage.settings = JSON.stringify(cellar);
  },
        // Return the entire storage as an object
  obj: function (){
    var cellar = JSON.parse(localStorage.settings);
    cellar.credentials.password = "";
    return cellar;
  },
  config: function (){
    var cellar = JSON.parse(localStorage.settings);
    return cellar.other;
  },
  settings: function (){
    return JSON.parse(localStorage.settings);
  },
        // Set default settings file. 
  defaults: function(){
    localStorage.settings = '{"session":{"keepAlive":"0","keepAliveTimeout":"0","lockScreen":"0","lockScreenTimeout":"0","autoLogin":"0","newTab":"1"},"credentials":{"username":"","password":""}, "other":{"nag":"1","debug":"0","debugTime":"3"}}';
  }
};

nT.msu = {
  logIn: function (){
    if (localStorage.loginCount < 10){
      if (nT.storage.get('credentials','username') != null && nT.storage.get('credentials','password') != null){
        $.ajax({
          url: 'https://ntg.missouristate.edu/Login/Login.aspx?ForceLogin=true',
          success: function(req) { 
            //msuGetProcess(req); 
            var tempDiv = document.createElement('div');
            //tempDiv.innerHTML = req.replace (/<img(.|\s)*?\/>/g, '');
            tempDiv.innerHTML = req;
            tempDiv.childNodes;
            // Got viewstate && got event validation. Log in time
            $.ajax({
              type: 'POST',
              xhrFields: { withCredentials: true },
              url: 'https://ntg.missouristate.edu/Login/Login.aspx',
              data: {
                '__LASTFOCUS':'',
                '__VIEWSTATE':tempDiv.querySelector('#__VIEWSTATE').value,
                '__EVENTTARGET':'',
                '__EVENTARGUMENT':'',
                '__EVENTVALIDATION':tempDiv.querySelector('#__EVENTVALIDATION').value,
                'ctl00$MainContent$UserID':nT.storage.get('credentials','username'),
                'ctl00$MainContent$Password':nT.storage.get('credentials','password'), 
                'ctl00$MainContent$ImageButton1.x':'15',
                'ctl00$MainContent$ImageButton1.y':'23'
              },
              success: function (){
                delete tempDiv;
                console.log('Logged In');
                localStorage.loggedIn = 1;
                localStorage.loginCount ++;
              }
            });
          }
        });
      }
      else {
        console.log('Credentials not set');
      }
    }
    else {
      console.log('Login Count TOO High.');
    }
  },

  refresh: function (){
    $.ajax({
      type: 'GET',
      cache: false,
      url: 'https://ntg.missouristate.edu/NetInfo/EquipmentDetail.asp?Tag=X3604&'+Date.now(),
      success: function () {
        var date = new Date();
        console.log('Refresh with success: '+ date.toTimeString());
      },
      error: function(){
        localStorage.requestFailureCount ++;
      }
    });
  },

  loggedIn: function (){
    $.ajax({
      type: 'GET',
      url: 'https://ntg.missouristate.edu/Tools/Default.aspx',
      success: function(data){
        var tmp = "";
        var temp = "";
        temp = data.replace(/<img(.|\s)*?\/>/g, '');
        tmp.innerHTML = temp;
        tmp.childNodes;
        //console.log($('#ctl00_MainContent_UserID',tmp));
        if ($('#ctl00_MainContent_UserID',data).length > 0 ) {
          localStorage.loggedIn = 0;
          console.log(localStorage.loggedIn);
          return false;
        } else  {
          localStorage.loggedIn = 1;
          console.log(localStorage.loggedIn);
          return true;
        }
      
      }
    });
  },
  logOut: function(){
    //removes auth cookies
    chrome.cookies.remove({url:'https://ntg.missouristate.edu',name:'.ASPXAUTH'});
    chrome.cookies.remove({url:'https://ntg.missouristate.edu',name:'ASP.NET_SessionId'});
  }
};

