addScripts(['js/jquery-1.8.3.min.js',
            'js/xTags.js',
            'js/functions.js',
            'js/bootstrap.js',
            'css/bootstrap.css',
            'css/ntgTool.css']);


chrome.extension.onMessage.addListener( function(request,sender,response) {
  if ((document.location.pathname.toLowerCase()).indexOf('accessdenied.aspx') > -1){
    document.body.innerHTML= "<a href='https://ntg.missouristate.edu/Tools/Default.asp'>Home</a>";
  }
});

  var t = document.createElement('script');
  t.innerHTML = "var url = \"" + chrome.extension.getURL('') + "\";";
  document.documentElement.insertBefore(t);


