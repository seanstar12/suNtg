var nT = {};

nT.portal = {
  launchSettings: function () {
    window.open('options.html','_blank');
  }
};

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
    //localStorage.settings = '{"session":{"keepAlive":"1","keepAliveTimeout":"0","keepAliveRate":"7","autoLogin":"0","newTab":"0"},"credentials":{"username":"","password":""}, "other":{"cleanTheme":"0","nag":"0","formAuto":"0","idle":"0","idleTimeout":"15","idleCheckRate":"60","shortKeys":"1","debug":"1"}}';
    localStorage.settings = '{"session":{"keepAlive":"0","keepAliveTimeout":"0","keepAliveRate":"7","autoLogin":"0"},"credentials":{"username":"","password":""},"other":{"debug":"1"}}';
  }
};

nT.msu = {

  logIn: function (callback){
    this.logInCallback = callback;
    if (localStorage.loginCount > 15){
      nT.msu.logOut(nT.msu.runLogIn);
      localStorage.loginCount = 0;
    } else {
      nT.msu.runLogIn();
    }
  },


  runLogIn: function(){
    console.log('runLogIn '+ localStorage.loginCount);
    if (nT.storage.get('credentials','username') != null && nT.storage.get('credentials','password') != null){
      console.log('New Login Running');
      nT.msu.getValidation();
    } else console.log('Credentials not set');
  },

  getValidation: function() {
    $.ajax({
      url: 'https://ntg.missouristate.edu/Login/Login.aspx?ForceLogin=true',
      context: this,
      success: function(data){
        this.postLogin(data);
      }
    });
  },

  postLogin: function(data){
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.replace(/<img(.|\s)*?\/>/g,'');
    tempDiv.childNodes;
    
    $.ajax({
      type: 'POST',
      xhrFields: {withCredentials: true},
      url: 'https://ntg.missouristate.edu/Login/Login.aspx',
      context: this,
      global: false,
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
        } 
    }).done(function(){
        this.postLoginSuccess();
    });
    
  },

  postLoginSuccess: function() {
    delete tempDiv;
    if (nT.storage.get('other','debug') == 1) {
      console.log('Login: Logged In successfully');
    }
    localStorage.loggedIn = 1;
    localStorage.loginCount ++;
    
    this.refresh();
     
    if (typeof(this.logInCallback) == "function") {
      this.logInCallback();
      delete this.logInCallback;
    }
  },

  refresh: function (){
    //var searchVars = ['/EquipmentDetail.asp?Tag=X3403&',
    var searchVars = ['/EquipmentList.asp?dbsSMSUTag=X3604&',
                      '/EquipmentDetail.asp?Tag=X3403&'];

    $.each(searchVars, function(){
      $.ajax({
        type: 'GET',
        cache: false,
        url: 'https://ntg.missouristate.edu/NetInfo/' + this + Date.now(),
        error: function(){
          localStorage.requestFailureCount ++;
        }
      }).done(function(){
          var date = new Date();
          if (nT.storage.get('other','debug') == 1) {
            console.log('Refresh with success: '+ date.toTimeString());
          }
      });
    });
  },

  loggedIn: function (callback){
    this.loggedInFinished = callback;
    $.ajax({
      type: 'GET',
      url: 'https://ntg.missouristate.edu/Tools/Default.aspx',
      context: this,
      success: this.loggedInProcess
    });
  },

  loggedInProcess: function(data) {
    var cbVar = '';
    var tmp = document.createElement('div');
    tmp.innerHTML = data.replace(/<img(.|\s)*?\/>/g, '');
    tmp.childNodes;

    if ($('#ctl00_MainContent_ImageButton1',tmp).length > 0 ) {
      localStorage.loggedIn = 0;
      cbVar = 0;
      if (nT.storage.get('other','debug') == 1) console.log('LoggedIn: User is logged out');
    } else  {
      localStorage.loggedIn = 1;
      cbVar = 1;
      if (nT.storage.get('other','debug') == 1) console.log('LoggedIn: User is logged in');
    }
    delete tmp;

    if (typeof(this.loggedInFinished) == "function") {
      this.loggedInFinished(cbVar);
      this.refresh();
      delete this.loggedInFinished;
    }
  },

  logOut: function(callback){
    //removes auth cookies
    if (nT.storage.get('other','debug') == 1) console.log("logOut:> Logged Out");
    chrome.cookies.getAll({domain: 'ntg.missouristate.edu'}, function(e) {
      e.forEach(function(el){
        chrome.cookies.remove({url: 'https://' + el.domain, name: el.name }, callback);
      });
    });
  }
};

