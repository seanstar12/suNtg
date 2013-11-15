var portListLinks = [
  {'title':'Special Stuff','class': 'nav-header'}, 
  {
    'title': 'Set Dates to Current',
    'id': 'addCurrentDate',
    'func': function(){
      $('#'+this.id).on('click', function(){
        form.allDates();
      }); 
    }
  },
  {
    'title': 'Set Custom Date',
    'class': '',
    'id': 'addCustomDate',
    'func': function(){
      $('#'+this.id).on('click', function(){
        custDateModal();
        $('#ntgModal').modal('show');
      }); 
    }
  },
  {'title':'','class': 'divider' },
  {
    'title': 'Mass Input Mode',
    'id': 'massInput',
    'func': function(){
      $('#'+this.id).on('click', function(){
        massInput();
      });
    }
  },
  {
    'title': 'Update All Switches',
    'id': 'updateAll',
    'func': function(){
      $('#'+this.id).on('click', function(){
        form.submitForms();
      });
    }
  },
  {'title':'','class': 'divider' },
  {'title': 'Revert To Previous','class': 'nav-header'},
  {'title': 'select','select':true}
];


var menuObject =  [
  {'title':'Tools','id':'toolLink','value':'/Tools/Default.aspx'},
  {'title':'Search','id':'searchLink','value':'/NetInfo/EquipmentDetail.asp'}, 
  {'title':'Floor Plans','id':'floorPlanLink','value':'/NetInfo/FloorPlans.asp'}, 
  {'parent': true, 'title':'Other', 'sub':[
    {'title':'Inventory','id':'inventoryLink','value':'/NetInfo/BuildingInventory.asp?InvCampus=Springfield&InvMonth=99'},
    {'title':'Phone Contacts','parent':'Other','id':'phoneLink', 'value':'/contacts/Personnel.aspx' },
    {'title':'Jack Lookup','parent':'Other','id':'jacLink','value':'/NetInfo/JackQuery.asp'},
    {'title':'Schedules','parent':'Other','id':'scheduleLink','value':'/Tools/schedules/Default.aspx'}]
  },
  {'parent': true, 'title':'Case System', 'sub':[
    {'title':'Ticket System','parent':'Case System','id':'ticketLink', 'value':'/case/queryCase.asp' },
    {'title':'TeleCom','parent':'Case System','id':'caseLink','value':'http://telsem.missouristate.edu/selfservice'}]},
  {'parent': true, 'title':'NTG Tools', 'sub':[
    {
      'title':'Batch Operations',
      'parent':'NTG Tool',
      'id':'batchOps', 
      'value':'#NtgTool/BatchOperations',
      'func': function(){
        $('#'+this.id).on('click', function(){
          setDisplay(batchObj);
          batchOps();
        });
      }
    },
    {
      'title':'Yearly Inventory',
      'parent':'NTG Tool',
      'id':'yearlyInventory', 
      'value':'#NtgTool/YearlyInventory'
    },
    {
      'title':'Case System 2.0',
      'parent':'NTG Tool',
      'id':'caseSystem', 
      'value':'#NtgTool/CaseSystem2.0', 
      'func': function(){
        $('#'+this.id).on('click', function(){
          setDisplay(caseObj);
          tempGetQueryBlock();
        });
      }
    },
    {
      'title':'Building Update 2.0',
      'parent':'NTG Tool',
      'id':'bldgUpdate', 
      'value':'#NtgTool/BldgUpdate2.0', 
      'func': function(){
        $('#'+this.id).on('click', function(){
          setDisplay(bldgUpdateObj);
          tempBldgUpdate('hill');
        });
      }
    }
  ]}
];


var  toolsObj = {
  title: 'Network Management',
  navLinks: [
    {
      'title': 'Network Management',
      'class': 'NavHeading favHead',
      'id': 'mgmtHeadid'
    },
    {
      'title': 'Extension Settings',
      'class': '',
      'id': 'suSettingsId',
    },
    {
      'title': 'Log Out',
      'class': '',
      'id': 'logOutId',
    }
  ],

  'func': function(){
    $('#logOutId').on('click', function(e){
      e.preventDefault();
      chrome.runtime.sendMessage(chrome.i18n.getMessage("@@extension_id"), {data:'reqLogout'},
        function(response){
          if (response) {
            console.log(response.msg);
            window.location.href = "https://ntg.missouristate.edu/";
          }
        });
    });
    $('#suSettingsId').on('click', function(e){
      e.preventDefault();
      window.open(chrome.extension.getURL('options.html'), '_blank');
    });
  }
}

var searchObj = {
  title: '{NTG} Search',
  navLinks: [
    {
      'title': 'Search Operations',
      'class': 'NavHeading',
      'id': 'batchHead',
    },
    {
      'title': 'Annie Are You Okay?',
      'class': '',
      'id': 'filla',
    }
  ],

  'func': function(){
    $('#filla').on('click', function(e){
      e.preventDefault();
      alert('yeah, I\'m okay.');
    })
  }
}

var surplusObj = {
  title: 'Surplus Stuffs',
  navLinks: [
    {
      'title': 'Surplus Stuffs',
      'class': 'NavHeading',
      'id': 'batchHead',
    },
    {
      'title': 'Annie Are You Okay?',
      'class': '',
      'id': 'filla',
    }
  ],

  'func': function(){
    $('#filla').on('click', function(e){
      e.preventDefault();
      alert('yeah, I\'m okay.');
    })
  }
}

var bldgUpdateObj = {
  title: '{NTG} Update',
  navLinks: [
    {
      'title': 'Building Operations',
      'class': 'NavHeading',
      'id': 'bldgOps',
    },
    {
      'title': 'Annie Are You Okay?',
      'class': '',
      'id': 'filla',
    }
  ],

  'func': function(){
    $('#filla').on('click', function(e){
      e.preventDefault();
      alert('yeah, I\'m okay.');
    })
  }
}

var ntgSideLinks = [
  {
    'title': 'su@Ntg Links',
    'class': 'NavHeading',
    'id': 'suLinksHead',
  },
  {
    'title':'Batch Operations',
    'parent':'NTG Tool',
    'id':'batchOpsSide', 
    'value':'#NtgTool/BatchOperations',
    'func': function(){
      $('#'+this.id).on('click', function(){
        setDisplay(batchObj);
        batchOps();
      });
    }
  },
  {
    'title':'Yearly Inventory',
    'parent':'NTG Tool',
    'id':'yearlyInventorySide', 
    'value':'#NtgTool/YearlyInventory'
  },
  {
    'title':'Case System 2.0',
    'parent':'NTG Tool',
    'id':'caseSystemSide', 
    'value':'#NtgTool/CaseSystem2.0', 
    'func': function(){
      $('#'+this.id).on('click', function(){
        setDisplay(caseObj);
        tempGetQueryBlock();
      });
    }
  },
  {
    'title':'Building Update 2.0',
    'parent':'NTG Tool',
    'id':'bldgUpdateSide', 
    'value':'#NtgTool/BldgUpdate2.0', 
    'func': function(){
      $('#'+this.id).on('click', function(){
        setDisplay(bldgUpdateObj);
        tempBldgUpdate('hill');
      });
    }
  }
]
var batchObj = {
  title: '{NTG} Batch',
  navLinks: [
    {
      'title': 'Batch Operations',
      'class': 'NavHeading',
      'id': 'batchHead',
    },
    {
      'title': 'Annie Are You Okay?',
      'class': '',
      'id': 'filla',
    }
  ],

  'func': function(){
    $('#filla').on('click', function(e){
      e.preventDefault();
      alert('yeah, I\'m okay.');
    })
  },
  context : {
    selectListValues: JSON.parse(localStorage.building),
    tableRows: ['#','XTag','AP Name', 'IP Address', 'Status', ''],
    tableOptions: {
        'Allocate':'allo',
        'Deallocate Only':'deallo'
    }
  }
}

var caseObj = {
  title : '{NTG} Case', 
  navLinks: [
    {
      'title': 'Case Navigation',
      'class': 'NavHeading',
      'id': 'allClosedCases'
    },
    {
      'title': 'Return to Search',
      'class': '',
      'id': 'returnToSearch'
    },
    {
      'title': 'Back To Query',
      'class': '',
      'id': 'backToQuery'
    },
    {
      'title': 'Your Cases',
      'class': 'NavHeading',
      'id': 'yourCasesHead'
    },
    {
      'title': 'Open Cases',
      'class': '',
      'id': 'yourOpenCases'
    },
    {
      'title': 'Closed Cases',
      'class': '',
      'id': 'yourClosedCases',
      'style': 'disabled'
    },
    {
      'title': 'All Cases',
      'class': 'NavHeading',
      'id': 'allCasesHead',
      'style': 'disabled'
    },
    {
      'title': 'Open Cases',
      'class': '',
      'id': 'allOpenCases',
      'style': 'disabled'
    },
    {
      'title': 'Closed Cases',
      'class': '',
      'id': 'allClosedCases',
      'style': 'disabled'
    }
  ],

  'func': function(){
    $('#returnToSearch').on('click', function(e){
      e.preventDefault();
      tempGetQueryBlock();
    })
  }
}

