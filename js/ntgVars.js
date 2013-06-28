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
        form.custDate();
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
];


var menuObject =  [
  {'title':'Tools','id':'toolLink','value':'/Tools/Default.aspx'},
  {'title':'Search','id':'searchLink','value':'/NetInfo/EquipmentDetail.asp'}, 
  {'title':'Floor Plans','id':'floorPlanLink','value':'/NetInfo/FloorPlans.asp'}, 
  {'title':'Inventory','id':'inventoryLink','value':'/NetInfo/BuildingInventory.asp?InvCampus=Springfield&InvMonth=99'},
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
    }
  ]}
];


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
