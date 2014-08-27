Storage = {};

function initStorage(response) {
  Storage = response;

  Storage.getItem = function(key) {
    if (typeof Storage[key] !== 'undefined') {
      return Storage[key];
    }
    return null;
  };

  Storage.setItem = function(key, value, fromBG) {
    if (Storage[key] !== value) {
      Storage[key] = value;
      var thisJSON = {
        requestType: 'localStorage',
        operation: 'setItem',
        itemName: key,
        itemValue: value
      };

      if (!fromBG) {
        Utils.sendMessage({
          requestType: 'localStorage',
          operation: 'setItem',
          itemName: key,
          itemValue: value
        });
      }
    }
  };

  Storage.removeItem = function(key) {
    delete Storage[key];
   
    Utils.sendMessage({
      requestType: 'localStorage',
      operation: 'removeItem',
      itemName: key
    });
  };

  Storage.isReady = true;

  window.localStorage = Storage;
  //RESInit();

  RESdoBeforeLoad();
}

var RESLoadResourceAsText;
(function(u) {
  // Don't fire the script on the iframe. This annoyingly fires this whole thing twice. Yuck.
  // Also don't fire it on static.reddit or thumbs.reddit, as those are just images.
  // Also omit blog and code.reddit
  if ((typeof RESRunOnce !== 'undefined') ||
      (/\/toolbar\/toolbar\?id/i.test(location.href)) ||
      (/comscore-iframe/i.test(location.href)) ||
      (/(?:static|thumbs|blog|code)\.reddit\.com/i.test(location.hostname)) ||
      (/^[www\.]?(?:i|m)\.reddit\.com/i.test(location.href)) ||
      (/\.(?:compact|mobile)$/i.test(location.pathname)) ||
      (/metareddit\.com/i.test(location.href))) {
    // do nothing.
    return false;
  }

  // call preInit function - work in this function should be kept minimal.  It's for
  // doing stuff as early as possible prior to pageload, and even prior to the localStorage copy
  // from the background.
  // Specifically, this is used to add a class to the document for .res-nightmode, etc, as early
  // as possible to avoid the flash of unstyled content.
  RESUtils.preInit();

  RESRunOnce = true;
  var thisJSON = {
    requestType: 'getLocalStorage'
  };

  BrowserStrategy.storageSetup(thisJSON);
})();

function RESInitReadyCheck() {
  if (
    (!RESStorage.isReady) ||
    (typeof document.body === 'undefined') ||
    (!document.html) ||
    (typeof document.html.classList === 'undefined')
  ) {
    setTimeout(RESInitReadyCheck, 50);
  } else {
    BrowserStrategy.RESInitReadyCheck(RESInit);
  }
}

window.addEventListener('DOMContentLoaded', RESInitReadyCheck, false);
