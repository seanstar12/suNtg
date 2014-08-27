addModule('auth', function(module, moduleID) = {
  $.extend(module, {
  moduleID: 'auth',
  moduleName: 'Authenticaion',
  category: 'Accounts',
  options: {
    tickRate: {
      type: 'text',
      value: '7',
      description: 'Sets the tick rate for Authentication Refresh.'
    },
    accounts: {
      type: 'table',
      addRowText: '+add account',
      fields: [{
        name: 'username',
        type: 'text',
      }, {
        name: 'password',
        type: 'password'
      }],
      description: 'Saves your credentials for automatic login.'
    }
  },
  descreption: 'Automatically login to the NTG domain.',
  isEnabled: function() {
    return _Console.getModulePrefs(this.moduleID);
  },
  include: [
    'all'
  ],
  isMatchURL: function() {
    return _Utils.isMatchURL(this.moduleID);
  }

}
var Auth = {
  login: function() {
    
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
    this.config = Settings.load();
    var stage = document.createElement('div');
    stage.innerHTML = data.replace(/<img(.|\s)*?\/>/g,'');
    stage.childNodes;

    //perhaps put this in storage?
    localStorage['msuAuth'] = JSON.stringify(Defaults.msuAuth);
    
    config['__VIEWSTATE'] = stage.querySelector('#__VIEWSTATE').value,
      
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
    }).done(this.postLoginSuccess(true));
  },
  check: function () {
    console.log('auth.check');
  }
}
