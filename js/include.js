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
    console.log(cellar); 
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
    //localStorage.settings = '{"session":{"keepAlive":"0","keepAliveTimeout":"0","keepAliveRate":"7","autoLogin":"0"},"credentials":{"username":"","password":""},"other":{"debug":"1"}}';
    localStorage.settings = '{"session":{"keepAlive":"0","keepAliveTimeout":"0","keepAliveRate":"7","autoLogin":"0","username":"","password":"","debug":"1"}}';
  }
};

nT.msu = {

  //Verifies credentials are set and then initiates the login process
  initLogin: function (){
    if (  
      nT.storage.get('session','username') != null 
      && nT.storage.get('session','password') != null 
    ){
      this.getValidation();
    } else {
      console.log('Credentials are not set. Log yourself in.');
    }
  },

  // Checks to see if the user is logged in. Calls back isLoggedInCallback
  isLoggedIn: function (callback){
    this.loggedInFinished = callback;

    $.ajax({
      url: 'https://ntg.missouristate.edu/Tools/Default.aspx',
      context: this
    }).done( function(data){
      this.isLoggedInCallback(data)
    });
  },

  // Callback for isLoggedIn. Returns 1||0 depending if user is logged in.
  isLoggedInCallback: function(data) {
    this.isloggedInVal = '';

    var stage = document.createElement('div');
    stage.innerHTML = data.replace(/<img(.|\s)*?\/>/g, '');
    stage.childNodes;

    if (stage.getElementsByClassName('LoginForm')[0]) {
      this.isLoggedInVal = localStorage.loggedIn = 0;
    } else  {
      this.isLoggedInVal = localStorage.loggedIn = 1;
    }

    if (typeof(this.loggedInFinished) == "function") {
      
      //passes 1//0 according if logged in or not.
      this.loggedInFinished(this.isLoggedInVal);
      delete this.loggedInFinished;
    }
  },
  
  isLoggedInDebug: function(){
    this.isLoggedIn( function(data){
      console.log('isLoggedIn: ' + data );
    });
  },
   
  getValidation: function() {
    $.ajax({
      url: 'https://ntg.missouristate.edu/Login/Login.aspx?ForceLogin=true',
      context: this,
    }).done(function (data) {
        this.postLogin(data);
    });
  },

  postLogin: function(data){
    var stage = document.createElement('div');
    stage.innerHTML = data.replace(/<img(.|\s)*?\/>/g,'');
    stage.childNodes;
    
    var postData =  { '__VIEWSTATE':stage.querySelector('#__VIEWSTATE').value,
                      '__EVENTVALIDATION':stage.querySelector('#__EVENTVALIDATION').value,
                      'ctl00$MainContent$UserID':nT.storage.get('session','username'),
                      'ctl00$MainContent$Password':nT.storage.get('session','password'), 
                      'ctl00$MainContent$ImageButton1.x':'15',
                      'ctl00$MainContent$ImageButton1.y':'23'
                    }; 

    $.ajax({
      type: 'POST',
      url: 'https://ntg.missouristate.edu/Login/Login.aspx',
      context: this,
      data: postData 
    }).done(this.postLoginSuccess());
  },

  postLoginSuccess: function() {
    console.log('Login: Logged In successfully');
    
    if (typeof(this.logInCallback) == "function") {
      this.logInCallback();
      delete this.logInCallback;
    }
  },

  refreshAuthCookies: function (){
    var searchVars = ['NetInfo/EquipmentDetail.asp?Tag=X3403&', 'Tools/Default.aspx'];

    $.each(searchVars, function(){
      $.ajax({
        url: 'https://ntg.missouristate.edu/' + this + Date.now(),
      }).done(function(){
          var date = new Date();
          console.log('Refresh with success: '+ date.toTimeString());
      });
    });
  },
  
  logOut: function(callback){
    //removes auth cookies
    chrome.cookies.getAll({domain: 'ntg.missouristate.edu'}, function(e) {
      e.forEach(function(el){
        chrome.cookies.remove({url: 'https://' + el.domain, name: el.name }, callback);
      });
    });
  }
};

