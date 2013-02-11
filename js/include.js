var nT = {};

nT.storage = {
  defaults: function(){
    localStorage.settings = '{"interface":{"tinyHeader":"0","switchShortcuts":"0","objIdUrl":"0","pageFadeIn":"0","forceAutoCompleteLogin":"0","enDate":"0","enCss":"0","tabReturn":"0"},"bugs":{"autoDnsSelect":"0","newTabLink":"0","tabLinkClose":"0","checkFix":"0"},"session":{"keepAlive":"0","keepAliveTimeout":"0","lockScreen":"0","lockScreenTimeout":"0","logIn":"0"},"credentials":{"username":"","password":""}}';
  },
  get: function(set,key){
    var cellar = JSON.parse(localStorage.settings); 
    //console.log(cellar[set][key]);
    //console.log("set: "+set+" key: "+key);
    return cellar[set][key];
  },
  set: function (set,key,val) {
    var cellar = JSON.parse(localStorage.settings);
    //console.log("set:"+set+" key:"+key+" val:"+val);
    cellar[set][key] = val;
    localStorage.settings = JSON.stringify(cellar);
  },
  obj: function (){
    return JSON.parse(localStorage.settings);
  }
};

