/**
 * Gets list of devices with useful information. Returns object
 * Ran 'var temp = getDevices();' on  https://ntg.missouristate.edu/NetInfo/EquipmentList.asp?dbsSMSUTag=* 
 * dumped that to js/db.json. getDevices uses parse list and parse click to return an array with device objects inside.
 * 
 */
function getDevices(){ 
  ob = [];
  $('.NetHeading').remove();
  
  var list = $('tr');
 
  return parseList(list);
}


/**
 * Used for parsing an array of the <tr> on EquipmentList.asp. Returns object
 *
 * @param {array} arg - attr(onclick) --  ('xtag', 'bldg', 'closet', 'objId')
 */
function parseList(tRow){ 
  for(var i=0; i< tRow.length; i++){
    var temp = {};
    temp = parseClick((tRow[i].getAttribute('onclick').slice('10','-1')).split(', ')); 
    //console.log($('td',tRow));
    temp.ipAddr = ($('td',tRow[i])[5].innerText); 
    temp.dns = ($('td',tRow[i])[7].innerText); 
    temp.device = ($('td',tRow[i])[9].innerText);
    ob.push(temp);
  }
  return ob;
}

/**
 * Used for parsing 'onclick()' data on EquipmentList.asp. Returns object
 *
 * @param {array} arg - attr(onclick) --  ('xtag', 'bldg', 'closet', 'objId')
 */
function parseClick(arg){
  arg.shift();
  for (var i = 0; i < arg.length; i++){
    if (i < 3){
      arg[i] = arg[i].slice('1','-1');
    }
  }
  return  {'xtag':arg[0],'bldg':arg[1],'closet':arg[2],'objId':arg[3]};
}

var ntg = {};
ntg.db = {};

ntg.db.open = null;

ntg.db.open = function() {
  var version = 1;
  var request = ntg.open('devices',version);

  request.onupgradeneeded = function(e){
    var db = e.target.result;
    e.target.transaction.onerror = ntg.onerror;

    if (db.objectStoreNames.contains('devices')){
      db.deleteObjectStore('devices');
    }

    var store = db.createObjectStore('devices', {keyPath: 'timeStamp'});
  };

  request.onsuccess = function(e) {
    ntg.db = e.target.result;
  };

  request.onerror = ntg.onerror;
};

ntg.addDevice = function(string) {
  var db = ntg.db;
  var trans = db.transaction (['devices'], 'readwrite');
  var store = trans.objectStore('devices');
  var request = store.put({
    'text': string,
    'timeStamp': newDate().getTime() 
  });

  request.onsuccess = function(e) {
    ntg.getAllDevices();
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};

ntg.getAllDevices = function() {
    //var devices = document.get
}

//function btnBar(b){
//  var barItems = [];
//  var bar = document.createElement('div');
//  bar.className = 'btnBar';
//  bar.id = 'buttonBar';
//  
//  for (var btn in b){
//    //barItems.push(btnBuild(btn,b[btn]._class,b[btn].size,b[btn].value,b[btn].func));
//    console.log(b[btn].func.value);
//    bar.innerHTML += (btnBuild(btn,b[btn]._class,b[btn].size,b[btn].value,b[btn].func)).outerHTML;
//  }
//
//  document.body.appendChild(bar); 
//}
//
//var abuttons = { 
//  'updateDates': {
//    '_class':'btn-info',
//    'size':'btn-small',
//    'value':'Update Dates',
//    'func':'test'
//  },
//  'otherBtn': {
//    '_class':'btn-info',
//    'size':'btn-small',
//    'value':'Something',
//    'func':test
//  }
//};


//var btnBar = document.createElement('div');
//btnBar.id = 'btnBar';
//btnBar.innerHTML = '<button class="btn btn-info btn-small" id= "updateAllDate"type="button">Update Dates To ' + returnDate() +'</button>';
//$('.Navigation').prepend(btnBar);


function btnBar(){
  //var b = btnBuild('updateAll','btn-info', '<i class="icon-calendar icon-white"></i>  to ' + 
  //  ((localStorage.custDate == 1) ? localStorage.custDateVal : returnDate()), updateAllDates);
  var el = btnBuildGrp('btnBar','btn-info',returnDate(),updateAllDates);
  var btn = btnBuild('massUpdate','btn-info', 'Mass Input', massInput);
  var d = document.createElement('div');
  d.className = 'btnPad';

  d.appendChild(el);
  d.appendChild(btn);

  $('.Navigation').prepend(d);

}
