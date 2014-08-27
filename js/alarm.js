var Alarm = {
  set: function (a) {
    if (a.type == 'when') a.length = (a.length*60000) + Date.now();
    var obj = {};
    obj[(a.type == 'when' ? 'when':'periodInMinutes')] = Number(a.length);
    chrome.alarms.create(a.name,obj);

  },
  getAll: function () {
    chrome.alarms.getAll(function(alarms){
      
    });
  }
};
