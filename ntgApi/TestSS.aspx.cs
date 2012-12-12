// Takes a JSON object from url '?data=' and Sets to class DataSet.
// e.g. {'dns':'BRIK1W-103','dataType':'xtag','ipAddr':'10.0.1.200','tag':'X2312'}
// Order of Items doesn't matter due to JSON being cool like that.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Web.Script.Serialization;
using System.Net;
using System.IO;
using System.Text;
using System.Threading;

public partial class TestSS : System.Web.UI.Page {
  
  bool hideError = true;
  string superSecret= "iCanApi";
  string[] modes = {"query","set"};
  string[] dataTypes ={"xtag","serial","dns","mac"};
   
  JavaScriptSerializer js = new JavaScriptSerializer();
  
  protected void Page_Load(object sender, EventArgs e) {
        
    try {
      if (Request.QueryString["apiKey"].IndexOf(superSecret) >= -1) {
        DataSet inData = js.Deserialize<DataSet>(Request.QueryString["data"]);
        processRequest(inData);                                     //Returns JSON data for javascript processing.
        //renderPage(inData);                                       //test for originally obtaining variables.
      }
    } catch (Exception ex) {
        if (hideError) Response.End();
        else errHandle(ex);
    }
  }
 
  public class DataSet {
    public string mode, dataType, tag, dns, ipAddr, mac;   
  }

  private void processRequest(DataSet inData) {
    string json, result, message;

    if (inData.mode == modes[0]) {                                //query database for match
      //blah blah query ...
      //return SUCCESS!
      result = "success";
      message = "";
      
      renderJson(inData, message, result);  
    }
    
  }
  
  private void renderJson (DataSet inData, string result, string message){
      Response.Clear();                                           // clear browser window
      Response.ContentType = "application/json; charset=utf-8";   // set type to json
      Response.Write(returnJson(inData, message, result));        // write to screen
      Response.End();                                             // end response
  }
 
  string returnJson(DataSet data, string message, string result){
    string returnString = "{\"data\":\""+data+"\",\"message\":\""+message+"\",\"result\":\""+result+"\"}";
    return returnString;
  }
  
  private void renderPage(DataSet inData) {

    Window.Controls.Clear();

    HtmlGenericControl h3 = new HtmlGenericControl();
    h3.TagName = "h2";
    h3.Attributes["class"] = "NetHeading";
    h3.InnerText = "JSON Test";

    Window.Controls.Add(h3);

    HtmlGenericControl ul = new HtmlGenericControl("ul");
    ul.Attributes["style"] = "list-style: none;";
    HtmlGenericControl item1 = new HtmlGenericControl("li");
    HtmlGenericControl item2 = new HtmlGenericControl("li");
    HtmlGenericControl item3 = new HtmlGenericControl("li");
    HtmlGenericControl item4 = new HtmlGenericControl("li");

    item1.InnerText = inData.dataType;
    item2.InnerText += inData.tag;
    item3.InnerText += inData.dns;
    item4.InnerText += inData.ipAddr;
    ul.Controls.Add(item1);
    ul.Controls.Add(item2);
    ul.Controls.Add(item3);
    ul.Controls.Add(item4);

    Window.Controls.Add(ul);
  }

  void errHandle(Exception ex)  {
    errMessage.Visible = true;
    errMessage.Text = ex.Message; 
  }
}
