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


  $('#keepLogin').click(function() {
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

document.addEventListener('DOMContentLoaded', init);
//document.querySelector('#save').addEventListener('click', save_options);
