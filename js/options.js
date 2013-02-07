//function storeVars() {
//  
//  localStorage.css = document.getElementById('css').checked;
//  localStorage.dateVar = document.getElementById('date').checked;

//  var info = document.getElementById('status');
//  info.innerHTML = "Saved Stuffs";
//  setTimeout(function() {
//    info.innerHTML = "";
//  }, 400);
//}

//restoreVars();
//document.addEventListener('DOMContentReady', restoreVars);
//document.querySelector('#save').addEventListener('click', storeVars);

function init() {
  if (!localStorage.settings) nT.storage.defaults();
  console.log(localStorage.settings);

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

  $('#launch_modal').click(function(ev) {
    ev.preventDefault();
    var modal = $('.overlay.default').clone();
    $(modal).removeAttr('style');
    $(modal).find('button').click(function() {
      $(modal).addClass('transparent');
      setTimeout(function() {
        $(modal).remove();
      }, 1000);
    });

    $(modal).click(function() {
      $(modal).find('.page').addClass('pulse');
      $(modal).find('.page').on('webkitAnimationEnd', function() {
        $(this).removeClass('pulse');
      });
    });
    $('body').append(modal);
  });

  var temp = nT.storage.obj();
  for (var property in temp){
    //console.log(property);
    for (var item in temp[property]){
      //console.log('--'+item);
      //console.log(t);
      //console.log($('#' + item)[0]);
      if ($('#'+item)[0].type == 'checkbox'){
        $('#'+item)[0].checked = (temp[property][item] == 1) ? true : false;
        if (temp[property][item] == 1){
          if (item == "keepAlive") $('#keepGroup').fadeIn(0); 
          else if (item == "lockScreen") $('#lockAfter').fadeIn(0); 
        }
      }
      else if ($('#'+item)[0].type == 'text' || $('#'+item)[0].type == 'password'){
        $('#'+item).val(temp[property][item]);
      }
      else if ($('#'+item)[0].type == 'select-one'){
        $('#'+item).val(temp[property][item]);
      }
    }
  };

  //$('#user').val(localStorage.user);
  $('#user').val(nT.storage.get('credentials','username'));
  $('#pass').val(nT.storage.get('credentials','password'));

   

  //$('#pass').val(localStorage.pass);

  if ($('#user').val() != '' && $('#pass').val() != ''){
    localStorage.hasSettings = true;
  }

  $('#keepAlive').click(function() {
    var box = $(this);
    if (box.is (':checked')) $('#keepGroup').fadeIn(250);
    else $('#keepGroup').fadeOut(250);
  });
  
  $('#lockScreen').click(function() {
    var box = $(this);
    if (box.is (':checked')) $('#lockAfter').fadeIn(250);
    else $('#lockAfter').fadeOut(250);
  });
  
  $('#saveModalButton').click(function(ev) {
    ev.preventDefault();

    //localStorage.user = $('#user').val();
    //nT.storage.set('credentials','username', $('#user').val());
    //nT.storage.set('credentials','password', $('#pass').val());
    //localStorage.pass = $('#pass').val();



    var temp = nT.storage.obj();
    for (var property in temp){
      //console.log(property);
      for (var item in temp[property]){
        //console.log('--'+item);
        //console.log(t);
        //console.log($('#' + item)[0]);
        if ($('#'+item)[0].type == 'checkbox'){
          //$('#'+item)[0].checked = (temp[property][item] == 1) ? true : false;
          nT.storage.set(property,item,($('#'+item)[0].checked ? '1' : '0'));
        }
        else if ($('#'+item)[0].type == 'text' || $('#'+item)[0].type == 'password'){
          $('#'+item).val(temp[property][item]);
        }
        else if ($('#'+item)[0].type == 'select-one'){
          $('#'+item).val(temp[property][item]);
        }
      }
    };



    chrome.extension.sendMessage({data: "optionsSave"}, function(response) {
          //console.log(response.msg);
    });

    var modal = $('.overlay.save').clone();
    $(modal).removeAttr('style');
    $(modal).find('button').click(function() {
      $(modal).addClass('transparent');
      setTimeout(function() {
        $(modal).remove();
      }, 1000);
    });

    $(modal).click(function() {
      $(modal).find('.page').addClass('pulse');
      $(modal).find('.page').on('webkitAnimationEnd', function() {
        $(this).removeClass('pulse');
      });
    });
    $('body').append(modal);
  });
  $('.mainview > *:not(.selected)').css('display', 'none');
}

//{"interface":{"tinyHeader":"0","switchShortcuts":"","objIdUrl":"","pageFadeIn":"","forceAutoCompleteLogin":"","enDate":"","enCss":""},"bugs":{"autoDnsSelect":"","newTabLink":"","tabLinkClose":"","checkFix":""},"user":{"session":{"keepAlive":"","keepAliveTimeout":"","lockScreen":"","lockScreenTimeout":""},"credentials":{"username":"","password":""}}}

document.addEventListener('DOMContentLoaded', init);
//document.querySelector('#save').addEventListener('click', save_options);
