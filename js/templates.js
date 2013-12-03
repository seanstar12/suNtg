(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['basicSettings'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"settingsItem\">\n      "
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": <input type='text' name='"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' id='"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' value='"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "'>\n    </div>\n  ";
  return buffer;
  }

  buffer += "  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<button id=\"saveButton\">COMMIT ALL TEH THINGS</button>\n";
  return buffer;
  });
templates['bldgUpdatePartial'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li>\n          <a href=\"#";
  if (stack1 = helpers.objId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.objId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n        </li>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, depth0.$first, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n          <a href=\"#";
  if (stack1 = helpers.objId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.objId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n        </li>\n      ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "active";
  }

  buffer += "<div id=\"bldgUpdate\" class=\"bldgUpdate\">\n  <div class=\"tabbable tabs-left\">\n    <ul class=\"nav nav-tabs\" id=\"switchList\">\n      ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul> \n    <div class=\"tab-content\" id=\"bldgUpdateTab\">\n      <div class=\"tab-pane active\" id=\"lA\">\n        <span>Select A Switch To Edit</span>\n      </div>\n    </div>\n  </div>\n</div>\n<!--\n      ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.foreach || depth0.foreach),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "foreach", depth0, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n-->\n";
  return buffer;
  });
templates['loadStatus'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"updateProgressAlert\" class=\"alert alert-info\" style=\"display: none;\">\n  <h4>\n    ";
  if (stack1 = helpers.action) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.action; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":  \n    <span id=\"updateProgressMsg\"> ";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> \n  </h4>\n  <a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>\n  <div class=\"progress progress-striped active\" id=\"updateProgressCont\">\n    <div class=\"bar\" id=\"updateProgressBar\" style=\"width:1%;\"></div>\n  </div>\n  <div class=\"progress progress-success progress-striped active\" id=\"updateProgressCont\">\n    <div class=\"bar\" id=\"updateProgressBarTotal\" style=\"width:1%;\"></div>\n  </div>\n</div>\n";
  return buffer;
  });
templates['modal'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"modal hide fade\" data-backdrop=\"true\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"ntgModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\n    <h2 class=\"modal-title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n    <h4 class=\"modal-subTitle text-info\">";
  if (stack1 = helpers.subTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n  </div>\n  <div class=\"modal-body\">";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n  <div class=\"modal-footer\">";
  if (stack1 = helpers.footer) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.footer; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n</div>\n";
  return buffer;
  });
templates['nav'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n              ";
  stack1 = helpers['if'].call(depth0, depth0.parent, {hash:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <li class=\"dropdown\">\n                  <a class=\"dropdown-toggle\" data-toggle=\"dropdown\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "  <b class=\"caret\"></b></a>\n                  <ul class=\"dropdown-menu\">\n                  \n                    ";
  stack1 = helpers.each.call(depth0, depth0.sub, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  </ul>\n                </li>\n\n              ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                      <li id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <a href=\"";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"subDrop\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n                    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <li id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                  <a href=\"";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"subDrop\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n                </li>\n              ";
  return buffer;
  }

  buffer += "  <div class=\"navbar navbar-inverse navbar-fixed-top\">\n    <div class=\"navbar-inner\">\n      <div class=\"container-fluid\">\n        <button type=\"button\" class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        \n        <a class=\"brand\" href=\"https://ntg.missouristate.edu\">Networking</a>\n        \n        <div class=\"nav-collapse collapse\"> \n          <div class =\"btn-group pull-right\"> \n            <button class=\"btn dropdown-toggle btn-small btn-inverse\"data-toggle=\"dropdown\">\n              <span class=\"caret\"></span>\n            </button>\n            \n            <ul class=\"dropdown-menu\">\n              <li>\n                <a id=\"logOut\" href=\"#\">Log Out</a>\n              </li>\n              \n              <li>\n                <a id=\"settings\"href=\"#\">Settings</a>\n              </li>\n              <li>\n                <a id=\"reload\" href=\"#\">Reload</a>\n              </li>\n            </ul>\n          </div>\n\n          <form class=\"navbar-search pull-right\" id=\"srchBox\" action=\"\">\n            <input type=\"text\" class=\"search-query span2\" id=\"searchBox\" placeholder=\"Search\">\n          </form>\n          \n          <ul class=\"nav\" id=\"custNavBar\">\n            ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </ul>\n          \n        </div>\n      </div>\n    </div> \n  </div> \n";
  return buffer;
  });
templates['ntgSidebar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <li class=";
  if (stack1 = helpers['class']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['class']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ">\n    <a id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n  </li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
templates['ntgSideNav'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, depth0['class'], {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"";
  if (stack1 = helpers['class']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['class']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, depth0.select, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "\n        <li id=\"valueList\"></li>\n      ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li>\n          <a id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" href=\"#\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n        </li>\n      ";
  return buffer;
  }

  buffer += "<ul class=\"specialOp nav nav-list\">\n  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
templates['pageWithNav'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li class=\"";
  if (stack1 = helpers['class']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['class']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <a id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"";
  if (stack1 = helpers.style) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.style; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n              ";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            </a>\n          </li>\n        ";
  return buffer;
  }

  buffer += "<div class=\"Outer_Nav\">\n  <div class=\"Navigation\">\n    <div class=\"LocalNav FSmall\">\n      <ul>\n        ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n    </div>\n  </div>\n  \n  <div class=\"Main\">\n    <div class=\"Content ntgTool\"></div>\n  </div>\n</div>\n";
  return buffer;
  });
templates['progress'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"alert alert-info\" id=\"updateProgressAlert\" style=\"display:none\"\n  <h4>\n    ";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    <p>\n      <span id=\"updateProgressMsg\">";
  if (stack1 = helpers.msg) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.msg; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </p>\n  </h4>\n  <a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>\n  <div class=\"progress progress-striped active\" id=\"updateProgressCont\">\n    <div class=\"bar\" id=\"updateProgressBar\" style\"width:0%\"></div>\n  </div>\n</div>\n\n";
  return buffer;
  });
templates['renderBatchOps'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>\n          ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n          ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <td>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td>\n        ";
  return buffer;
  }

  buffer += "<form id=\"quickAllo\" name=\"quickAlloForm\" style=\"display: block;\">\n  <div id=\"bulkTop\">\n    <ul id=\"bulkTopUl\">\n      <li>\n        <select name=\"selectList\" class=\"selectList\" id=\"sList\">\n          ";
  stack1 = helpers.each.call(depth0, depth0.selectListValues, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n      </li>\n      <li>\n        <input id=\"closetCode\" name=\"closet\" placeholder=\"Closet\" size=\"5\">\n      </li>\n      <li>\n        <select name=\"selectMode\" class=\"selectList\" id=\"mList\">\n          ";
  stack1 = helpers.each.call(depth0, depth0.tableOptions, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n      </li>\n      <li>\n        <input type=\"checkbox\" name=\"prependDNS\" id=\"preDNS\" checked>\n        <label for=\"preDNS\">Prepend Building to DNS</label>\n      </li>\n    </ul>\n  </div>\n  <div id=\"bulkOps\">\n    <table class=\"table table-hover\" id=\"resultTable\">\n      <thead>\n        <tr>\n        ";
  stack1 = helpers.each.call(depth0, depth0.tableRows, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tr>\n      </thead>\n      <tbody>\n        <tr id=\"row_1\" class=\"tagSet\">\n          <td>\n            <a>1</a>\n          </td>\n          <td class=\"Tag\">\n            <input type=\"text\" name=\"Tag\" class=\"Tag\" value=\"\" placeholder=\"Tag\" size=\"8\" required>\n          </td>\n          <td class=\"DNS\">\n            <input type=\"text\" name=\"DNS\" class=\"DNS\" value=\"\" placeholder=\"DNS Name\" size=\"16\" required>\n          </td>\n          <td class=\"IP\">\n            <input type=\"text\" name=\"IP\" class=\"IP\" value=\"\" placeholder=\"IP Address\" size=\"16\" required>\n          </td>\n          <td class=\"status\">\n            <ul type=\"\" name=\"status\" class=\"status\" placeholder=\"\" size=\"8\"></ul>\n          </td>\n        </tr>\n      </tbody>\n    </table> \n    <div class\"formButtons\">\n      <button type=\"button\" class=\"btn btn-primary\" id=\"submitBulkOps\">I want to go to there</button>\n    </div>\n  </div>\n</form>\n";
  return buffer;
  });
templates['searchResults'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"srchResults\" id=\"srchResults\"></div>\n";
  });
templates['selectListPartial'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <optgroup label=\"";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></optgroup>\n  ";
  return buffer;
  }

  buffer += "<select class=\"selectpicker\">\n  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n";
  return buffer;
  });
templates['settingsView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, depth0.su, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"";
  if (stack1 = helpers['default']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['default']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"display:none\">\n          <a href=\"#";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.menuTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.menuTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n        </li>\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"";
  if (stack1 = helpers['default']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['default']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n          <a href=\"#";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.menuTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.menuTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n        </li>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n      <div id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"";
  if (stack1 = helpers['default']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['default']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <header>\n          <h1>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " <small>";
  if (stack1 = helpers.subTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small></h1>\n        </header>\n        <div class=\"content\">\n          ";
  stack1 = helpers.each.call(depth0, depth0.subFields, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, depth0.subFields, {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      </div>\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n          <section>\n            ";
  stack1 = helpers.each.call(depth0, depth0.subFields, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </section>\n          ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              ";
  stack1 = helpers['if'].call(depth0, depth0.checkbox, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n              ";
  stack1 = helpers['if'].call(depth0, depth0.textBox, {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                  <input type=\"";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                  <label for=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">&emsp;";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n                </div>\n              ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"";
  if (stack1 = helpers['class']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['class']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                  <label for=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">&emsp;";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n                  <input type=\"";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                </div>\n              ";
  return buffer;
  }

function program13(depth0,data) {
  
  
  return "\n          <div class=\"controls\">\n            <div class=\"spacer\"></div>\n            <button class=\"saveButton\">Save</button>\n          </div>\n          ";
  }

  buffer += "  <div class=\"navigation\">\n    <h1>\n      <span id=\"toolLabel\">su@Handle</span>\n    </h1>\n    <ul class=\"menu\">\n      ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n  <div class=\"mainview view\">\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      \n  </div>\n";
  return buffer;
  });
templates['tagCreateRow'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr id=\"row_";
  if (stack1 = helpers.num) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"tagSet\">\n  <td>\n    <a>";
  if (stack1 = helpers.num) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n  </td>\n  <td class=\"Tag\">\n    <input type=\"text\" name=\"Tag\" class=\"Tag\" placeholder=\"Tag\" size=\"8\" required>\n  </td>\n  <td class=\"DNS\">\n    <input type=\"text\" name=\"DNS\" class=\"DNS\" placeholder=\"DNS Name\" size=\"16\" required>\n  </td>\n  <td class=\"IP\">\n    <input type=\"text\" name=\"IP\" class=\"IP\" placeholder=\"IP Address\" size=\"16\" required>\n  </td>\n  <td class=\"status\">\n  </td>\n</tr>\n";
  return buffer;
  });
templates['tagSetStatus'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <input type=\"hidden\" name=\"isAllocated\" value=\"";
  if (stack1 = helpers.isAllocated) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.isAllocated; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n  <input type=\"hidden\" name=\"isAllocated\" value=\"false\" />\n";
  }

  buffer += "<ul>\n  <li>";
  if (stack1 = helpers.bank) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.bank; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n  <li>";
  if (stack1 = helpers.dbInventory_s_SerialNumber) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dbInventory_s_SerialNumber; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n  <li>";
  if (stack1 = helpers.dbInventory_s_CurBldg) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dbInventory_s_CurBldg; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ": ";
  if (stack1 = helpers.dbInventory_s_CurCloset) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dbInventory_s_CurCloset; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " - Date: ";
  if (stack1 = helpers.dbInventory_d_VerifyDt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dbInventory_d_VerifyDt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n</ul>\n";
  stack1 = helpers['if'].call(depth0, depth0.isAllocated, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
templates['xInfo'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n";
  }

function program3(depth0,data) {
  
  
  return "\n  <table class=\"table table-condensed\">\n    <thead>\n      <tr>\n        <th>xTag</th>\n        <th>Serial</th>\n        <th>Description</th>\n        <th>Box Id</th>\n      </tr>\n    </thead>\n";
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth1.multiTable, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers.each.call(depth0, depth0.hardware, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      \n  ";
  stack1 = helpers['if'].call(depth0, depth1.multiTable, {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <h2>\n    Box ID: ";
  if (stack1 = helpers.boxId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.boxId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (stack1 = helpers.acc) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.acc; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ": ";
  if (stack1 = helpers.accCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.accCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    </h2>\n    <table class=\"table table-condensed\">\n      <thead>\n        <tr>\n          <th>xTag</th>\n          <th>Serial</th>\n          <th>Description</th>\n          <th>Box Id</th>\n        </tr>\n      </thead>\n  ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <td>";
  if (stack1 = helpers.tag) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tag; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n          <td>";
  if (stack1 = helpers.serial) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.serial; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n          <td>";
  if (stack1 = helpers.desc) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.desc; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n          <td>";
  if (stack1 = helpers.box) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.box; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        </tr>\n      ";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "\n    </table>\n  ";
  }

  stack1 = helpers['if'].call(depth0, depth0.multiTable, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</table>\n";
  return buffer;
  });
templates['xInfoStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <tr>\n      <td>";
  if (stack1 = helpers.boxId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.boxId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.hardware),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>";
  if (stack2 = helpers.accCount) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.accCount; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      <td></td>\n    </tr>\n  ";
  return buffer;
  }

  buffer += "<table class=\"table table-condensed\">\n  <thead>\n    <tr>\n      <th>Box Id</th>\n      <th>Hardware Count</th>\n      <th>Accessory Count</th>\n      <th></th>\n    </tr>\n  </thead>\n  ";
  stack1 = helpers.each.call(depth0, depth0.box, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <thead>\n      <tr class=\"warning\">\n        <th>";
  if (stack1 = helpers.boxes) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.boxes; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</th>\n        <th>";
  if (stack1 = helpers.hw) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hw; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</th>\n        <th>";
  if (stack1 = helpers.accCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.accCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</th>\n        <th>Totals</th>\n      </tr>\n    </thead>\n</table>\n";
  return buffer;
  });
})();