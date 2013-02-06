function injPop(msg) {
  var code =  function(){
                var div = document.createElement('div');
                div.innerHTML = "<div id='fade'>" +
                    "<div id='dialog'>" +
                    "<h1>Hey! Listen!</h1>" +
                    "<p>We need stuff to keep you logged in.</p>"+ 
                    "<input type='text' name='user' id='user' size='20' placeholder='User'>" +
                    "<input type='password' name='pass' id='pass' size='20' placeholder='Password'>" +
                    "</div></div>";
                
                document.body.appendChild(div);
              }
  //var code = '$(function() {var docHeight = $(document).height();$("body").append('+ div +')})';
  //var code =  div;
  var script = document.createElement('script');
  script.textContent = '(' + code + ')()';
  document.body.appendChild(script);
  
}


function jPop() {
  var div = document.createElement('div');
  div.innerHTML = "<div id='fade'>" +
                    "<div id='dialog'>" +
                    "<h1>Hey! Listen!</h1>" +
                    "<p>We need stuff to keep you logged in.</p>"+ 
                    "<input type='text' name='user' id='user' size='20' placeholder='User'>" +
                    "<input type='password' name='pass' id='pass' size='20' placeholder='Password'>" +
                    "<br/><button type='button' name'fButton' id='fButton'>Submit</button>" +
                    "<button type='button' name'fClear' id='fClear'>Nah</button>" +
                    "</div></div>";
                
  document.body.appendChild(div);
}

function fade(){
  //document.getElementById('fade').setAttribute('style',"display:inline;");
  var bleh = $('#fade');
  bleh.fadeIn(250);
}
