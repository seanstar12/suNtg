var Settings = {

  load: function(){
    return JSON.parse(localStorage.newSettings);
  },

  set: function(){

  },

  setDefaults: function(){
    localStorage.newSettings = JSON.stringify(defaultSettings);
  }
}

function onLoad(){
  if (localStorage.newSettings){
    renderPage();
  } else {
    Settings.setDefaults();
    renderPage();
  }
}

function renderPage(){
  
  var settings = Settings.load();
  $('#imaBody').html(Handlebars.templates.settingsView(settings));
  $.each(settings, function(i,e){
    $.each(this.subFields, function(){
      $.each(this.subFields, function(){
        if (this.value == '1') {
          $('#'+this.id).prop('checked', true);
        };
      });
    });
  });
   
  $('.menu a').click(function(ev) {
    ev.preventDefault();
    var selected = 'selected';

    $('.mainview > *').removeClass(selected);
    $('.menu li').removeClass(selected);
    setTimeout(function() {
      $('.mainview > *:not(.selected)').css('display', 'none');
    }, 100);

    $(ev.currentTarget).parent().addClass(selected);
    var currentView = $($(ev.currentTarget).attr('href'));
    currentView.css('display', 'block');
    setTimeout(function() {
      currentView.addClass(selected);
    }, 0);

    setTimeout(function() {
      $('body')[0].scrollTop = 0;
    }, 200);
  });
  
  $('.mainview > *:not(.selected)').css('display', 'none');
  
  window.addEventListener("keydown", function(e){
    k.push(e.keyCode);
    if (k.toString().indexOf(c) >= 0){
      $('.su').removeAttr('style');
      $('.su a').trigger('click');
    }
  },false);
}

var k =[],c="38,38,40,40,37,39,37,39,66,65";
document.onload = onLoad();
