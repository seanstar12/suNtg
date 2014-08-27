var Settings = {
  
  load: function() {
    if (!localStorage.config) this.setDefault();

    var config = JSON.parse(localStorage.config);
    config.cred.pass = rot13(config.cred.pass);
    return config;
  },

  set: function(config) {
    config.cred.pass = rot13(config.cred.pass);
    localStorage.config = JSON.stringify(config);
  },

  setDefault: function(){
    var config = {
      "cred": {
        "user":"",
        "pass":""
      },
      "session": {
        "login" : 0,
        "tickRate" : 7,
        "lock" : 0,
        "lockRate" : 10
      },
      "other":{
        "debug": 0,
        "su": 0
      }
    }

    this.set(config);
  },

  verify: function(config) {
    var safeConfig = {"cred":"","session":"","other":""};

    if (!config.cred.user && !config.cred.pass) {
      config.session.login = 0;
      config.session.lock = 0;
    } else {
      if (typeof config.session.login != 'number') config.session.login = 0;
      if (typeof config.session.lock != 'number') config.session.lock = 0;
    }
  }
}

function rot13(s) {
  if (!s || s == 'null') return '';

  return (s ? s : this).split('').map( function(_) {
    if (!_.match(/[A-za-z]/)) return _;
    c = Math.floor(_.charCodeAt(0) / 97);
    k = (_.toLowerCase().charCodeAt(0) - 83) % 26 || 26;
    return String.fromCharCode(k + ((c == 0) ? 64 : 96));
  }).join('');
}
