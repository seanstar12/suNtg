function addScripts(files){
  var s = "";
  for (var i =0; i< files.length; i++){

    if (files[i].indexOf('js/') > -1){
      s = document.createElement('script');
      s.src = chrome.extension.getURL(files[i]);
    } 
    else if (files[i].indexOf('css/') > -1) {
      s = document.createElement('link');
      s.href = chrome.extension.getURL(files[i]);
      s.rel = 'stylesheet';
    }
    document.documentElement.insertBefore(s);  
  }
  delete s;
}

addScripts([
  'js/handlebars.js',
  'js/jquery-2.0.2.min.js',
  'js/functions.js',
  'js/templates.js',
  'js/surplusTest.json',
  'lib/bootstrap-select/bootstrap-select.min.js',
  'lib/bootstrap-select/bootstrap-select.min.css',
  'css/bootstrap.css',
  'css/ntgTool.css'
]);

//Will be used for portal between front and back
chrome.extension.onMessage.addListener( function(request,sender,response) {
});

//Add chrome extension URL so that portal will work
var t = document.createElement('script');
t.innerHTML = "var url = \"" + chrome.extension.getURL('') + "\";";
document.documentElement.insertBefore(t);
