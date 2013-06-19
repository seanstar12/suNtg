(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
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
})();