var setConf = {
	pages: {
		settings: {
			"title": "User Settings","subTitle": "Because you're beautiful","type": "page","menuTitle": "User","id":"userSettings","options":"default","subFields": [ 
				{"title": "Session","subTitle": "Handles the session","type": "section","id": "sessionSettings","options": "","subFields": [ 
					{"title" : "Persistent Login","type":	"checkbox","id":	"keepAlive","options": "","subFields": [ 
						{"title": "Timeout Duration","type": "select","id": "keepAliveTimeout","options": "dependent","subFields": [ 
							{"title":"10 Min","type": "option","value": "10","options": "" },
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
		]},
		
		about: {
			"title":"About","subTitle": "Oh Hai","type": "page","menuTitle": "About","id": "about","options":"secondary","subFields":""}
	},
			
	templates: {
		menu: {
			"title": "NTG Tool",
			"subTitle":"",
			"type":"<ul/>",
			"tags": {
				"class":"menu",
				"id":"navigation"
			},
			"id":"sideMenu",
			"parent":".navigation",
			"options":"",
			"subFields": [ 
				{"type":"<li/>",
				"id":"",
				"class":"",
				"options":"",
				"subFields": [ 
					{"type":"<a/>"
					,"href": "id"
					,"html":"title"
				 } 
				]} 
		]},
  	body: {
			"title":"Body",
			"subTitle":"",
				"defaultClass":"selected",
				"defaultStyle":"",
				"secondaryClass":"",
				"secondaryStyle":"",
				"type":"<div/>",
				"tags": {
					"style":"",
					"id":"hai"
				},
				"id":"dsf",
				"class": "dsf",
				"parent":".content",
				"options":"",
				"subFields": [ 
					{"type":"<li/>",
					"id":"",
					"class":"",
					"options":"",
					"subFields": [ 
						{"type":"<a/>"
						,"href": "id"
						,"html":"title"
					 } 
					]} 
			]
			}

	},
		
	loadTemplates: function(){

			var Pages = this.pages;
			console.log(this.templates);
			$.each(this.templates, function(){
				//console.log(this);
				//console.log(Nav);
				$.each(Pages, function(i,el){
					//console.log(this);
					//console.log();
					$(this.type, this.tags).html(el.menuTitle).appendTo(this.parent);
					console.log(el);
				}.bind(this));
			});

	 	}
	}
var d = setConf.loadTemplates();
//d;
//console.log(d);
	
		/*		
				//this.Menu = this.templates.menu;
			  //this.Pages = this.pages;

		/*		$.each(this.Pages, function(){
					$('.menu').append(
						$('<li>').append($('<a/>',{text:this.menuTitle, href:'#'+ this.id}))
					);
				});

				$.each(this.pages, function(){


					var div =	$('<div/>', {id:this.id}).append(
											$('<header/>').append(
												$('<h1>').html(this.title + '<small>' + this.subTitle + '</small>')
											)
										);

					if (this.options === 'default'){
						$(div).addClass('selected');
					}
					else {	
						$(div).attr('style','display:none;');
					}
					$('.mainview').append(div);


				});
		      //console.log(this.templates.menu.parent);
		      //return $(this.templates.menu.parent);
		     // $('<ul><li></li></ul>', {id:this.Menu.id, class:this.Menu.class}).html('TestContent').appendTo('.'+this.Menu.parent);
		        //console.log(this.templates);
		        //$('<div/>', {id:'hia'}).appendTo('.content');
		 */
