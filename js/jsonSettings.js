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
              "checkbox":	true,
              "class":"checkInput",
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
					{"title": "Debug Enable","type": "checkbox","checkbox":	true,"id": "debug","options": "","subFields": "" },
					{"title": "Enable Keyboard Shortcuts","type": "checkbox","checkbox":	true,"id": "shortKeys","options": "","subFields": "" } 
				]},
				{"title": "Credentials","subTitle": "","class":"checkInput","type": "section","id": "credentials","options": "su","subFields": [ 
				  {"title" : "Automatic Login","type":"checkbox","checkbox": true, "id":"autoLogin","options": "dependent","subFields": [ 
						{"title": "Username","subTitle":"","type":"text","id":"username","options":"","subFields":""},
						{"title": "Password","subTitle":"","type":"password","id":"password","options":"","subFields":"" } 
				]},
				{"title": "Username","subTitle":"","class":"textInput","type":"text","textBox":true,"id":"username","options":"","subFields":""},
				{"title": "Password","subTitle":"","class":"textInput","type":"password","textBox":true,"id":"password","options":"","subFields":"" } 
			]} 
		]
  },
		
  {
		"title":"Secret Stuffs",
    "subTitle": "You Found Me",
    "type": "page",
    "su":true,
    "menuTitle": "Secret",
    "id": "secretStuff",
    "default":"su",
    "subFields": [
      {
        "title":"Nifty Things",
        "subFields": [
          {
            "title":"Show Batman's True Identity",
            "type": "checkbox",
            "checkbox": true,
            "class":"checkInput",
            "id":"iambatman"
          }
        ]
      }
    ]
  },
  {
		"title":"About",
    "subTitle": "Oh Hai",
    "type": "page",
    "menuTitle": "About",
    "id": "about",
    "subFields": [
      {
        "title":"",
        "subFields": [
          {
            "title":"Idk how this is gonna work. But I'll try...",
            "type": "text",
            "id":"iambatman"
          }
        ]
      }
    ]
  }
]

document.onload = settingsOnLoad();

function settingsOnLoad(){
  console.log('load settings');
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
window.addEventListener("keydown", function(e){
k.push(e.keyCode);if (k.toString().indexOf(c) >= 0){$('.su').fadeToggle(500);};}, true);
}
var k =[],c="38,38,40,40,37,39,37,39,66,65";
