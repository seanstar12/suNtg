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
  if (!localStorage.settings) {
    showModal();
    nT.storage.defaults();
  }
  if (nT.storage.get('other','debug') == 1) console.log(JSON.stringify(nT.storage.obj()));
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

  var temp = nT.storage.settings();
  for (var property in temp){
    for (var item in temp[property]){
      if ($('#'+item)[0].type == 'checkbox'){
        $('#'+item)[0].checked = (temp[property][item] == 1) ? true : false;
        if (temp[property][item] == 1){
          if (item == "keepAlive") $('#keepGroup').fadeIn(0); 
          else if (item == "lockScreen") $('#lockAfter').fadeIn(0); 
          else if (item == "enBgUrl") $('#bgUrlCont').fadeIn(0);
        }
      }
      else {
        $('#'+item).val(temp[property][item]);
      }
    }
  };

  if ($('#username').val() != '' && $('#password').val() != ''){
    localStorage.hasSettings = 1;
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
  
  $('#enBgUrl').click(function() {
    var box = $(this);
    if (box.is (':checked')) $('#bgUrlCont').fadeIn(250);
    else $('#bgUrlCont').fadeOut(250);
  });
  
  $('.saveButton').click(function(ev) {
    ev.preventDefault();
    var temp = document.getElementById('userSettings').children[0].innerHTML;
    document.getElementById('toolLabel').innerHTML = "Saved";
    setTimeout(function(){
      document.getElementById('toolLabel').innerHTML = "NTG Tool";
    },2000);
    var temp = nT.storage.settings();
    for (var property in temp){
      for (var item in temp[property]){
        if ($('#'+item)[0].type == 'checkbox'){
          nT.storage.set(property,item,($('#'+item)[0].checked ? '1' : '0'));
        }
        else if ($('#'+item)[0].type == 'text' || $('#'+item)[0].type == 'password'){
          nT.storage.set(property,item,$('#'+item).val());
        } 
        else if ($('#'+item)[0].type == 'select-one'){
          nT.storage.set(property,item,$('#'+item).val());
          //$('#'+item).val(temp[property][item]);
        }
      }
    };



    chrome.extension.sendMessage({data: "optionsSave"}, function(response) {
          //console.log(response.msg);
    });
    
  });
  
  function showModal() {
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
  }
   
  $('.mainview > *:not(.selected)').css('display', 'none');
}

//{"interface":{"tinyHeader":"0","switchShortcuts":"","objIdUrl":"","pageFadeIn":"","forceAutoCompleteLogin":"","enDate":"","enCss":""},"bugs":{"autoDnsSelect":"","newTabLink":"","tabLinkClose":"","checkFix":""},"user":{"session":{"keepAlive":"","keepAliveTimeout":"","lockScreen":"","lockScreenTimeout":""},"credentials":{"username":"","password":""}}}

document.addEventListener('DOMContentLoaded', init);
//document.querySelector('#save').addEventListener('click', save_options);
