function addScripts(files){
  for (var i =0; i< files.length; i++){
    var s = "";

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
}


addScripts(['js/jquery-1.8.3.min.js',
            'js/jquery-plugins.js',
            'js/bootstrap.js',
            'js/functions.js',
            'css/bootstrap.css',
            'css/ntgTool.css']);

// Needed to prevent errors (It's sending a message from somewhere... need to find it)
chrome.extension.onMessage.addListener( function(request,sender,response) {
  if ((document.location.pathname.toLowerCase()).indexOf('accessdenied.aspx') > -1){
    document.body.innerHTML= "<a href='https://ntg.missouristate.edu/Tools/Default.asp'>Home</a>";
  }
});

var t = document.createElement('script');
t.innerHTML = "var url = \"" + chrome.extension.getURL('') + "\";";
document.documentElement.insertBefore(t);

