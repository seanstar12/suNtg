var page = [
	{
			"title": "User Settings",
      "subTitle": "Because you're beautiful",
      "menuTitle": "User",
      "id":"userSettings",
      "default":"selected",
      "subFields": [ 
				{
          "title": "Session",
          "options": "",
          "subFields": [ 
					  {
              "title" : "Persistent Login",
              "type":	"checkbox",
              "id":	"keepAlive",
              "options": "",
              "subFields": [ 
						    {
                  "title": "Timeout Duration",
                  "type": "select",
                  "id": "keepAliveTimeout",
                  "options": "dependent",
                  "subFields": [ 
							      {
                      "title":"10 Min",
                      "type": "option",
                      "value": "10",
                      "options": "" 
                    },
               {"title":"15 Min","type": "option","value": "15","options": "" },
               {"title":"30 Min","type": "option","value": "30","options": "" },
               {"title":"60 Min","type": "option","value": "60","options": "" },
               {"title":"Never End","type": "option","value": "0","options": "su" } 
						]},
           	{"title": "Session refresh rate","type": "select","id": "keepAliveRate","options": "dependent","subFields": [ 
							{"title":".2 Min","type": "option","value": ".2","options": "su" },
							{"title":".5 Min","type": "option","value": ".5","options": "su" },
							{"title":"5 Min","type": "option","value": "5","options": "" },
							{"title":"7 Min","type": "option","value": "7","options": ""},
							{"title":"9 Min","type": "option","value": "9","options": "su" } 
						]} 
					]},
					{"title": "Debug Enable","type": "checkbox","id": "debug","options": "","subFields": "" },
					{"title": "Enable Keyboard Shortcuts","type": "checkbox","id": "shortKeys","options": "","subFields": "" } 
				]},
				{"title": "Credentials","subTitle": "","type": "section","id": "credentials","options": "su","subFields": [ 
				  {"title" : "Automatic Login","type":"checkbox","id":"autoLogin","options": "dependent","subFields": [ 
						{"title": "Username","subTitle":"","type":"text","id":"username","options":"","subFields":""},
						{"title": "Password","subTitle":"","type":"password","id":"password","options":"","subFields":"" } 
				]} 
			]} 
		]
  },
		
  {
		"title":"Secret Stuffs",
    "subTitle": "You Found Me",
    "type": "page",
    "menuTitle": "Secret",
    "id": "secretStuff",
    "options":"secondary",
    "subFields":""
  },
  {
		"title":"About",
    "subTitle": "Oh Hai",
    "type": "page",
    "menuTitle": "About",
    "id": "about",
    "options":"secondary",
    "subFields":""
  }
]

document.onload = settingsOnLoad();

function settingsOnLoad(){
  console.log('load settings');
  console.log(Handlebars.templates.settingsView(page));
  $('#imaBody').html(Handlebars.templates.settingsView(page));
  
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
}
