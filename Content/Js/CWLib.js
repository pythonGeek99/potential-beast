function GetQueryString(Sname) {
    try {
        var urlquery = window.location.search.substring(1); var querya = urlquery.split("&"); var queryb; for (i = 0; i < querya.length; i++) { queryb = querya[i].split("="); if (queryb[0] == Sname) { return queryb[1]; } }
        return "";
    } catch (e) { return ""; }
}
function IsInQueryString(Sname) {
    try {
        var urlquery = window.location.search.substring(1); var querya = urlquery.split("&"); var queryb; for (i = 0; i < querya.length; i++) { queryb = querya[i].split("="); if (queryb[0] == Sname) { return true; } }
        return false;
    } catch (e) { return false; }
}
function EncodeVariables(encodevariables) { try { encodedHtml = CheckStringForSQL(encodevariables); while (encodedHtml.indexOf("¿") > -1) encodedHtml = encodedHtml.replace("¿", "&#191;"); while (encodedHtml.indexOf("ß") > -1) encodedHtml = encodedHtml.replace("ß", "&#223;"); while (encodedHtml.indexOf("'") > -1) encodedHtml = encodedHtml.replace("'", "&#39;"); while (encodedHtml.indexOf(",") > -1) encodedHtml = encodedHtml.replace(",", "&#44;"); return encodedHtml; } catch (e) { return ""; } }
function HtmlDecode(value) { $("#HtmlEncodeDecode").remove(); $("<div id='HtmlEncodeDecode'></div>").appendTo(document.body); return $("#HtmlEncodeDecode").html(value).text(); }
var jqTransformSelectWrapperIndex = 30;


function LoadDropdown(sourceid, targetid, url, ids, values, tag, paramtype, callbackfnc) {
    var Drp_ListData = new Array(); var lids = ids.split('ß'); var lvalues = values.split('ß'); var lparamtypes = paramtype.split('ß'); var strparam = "";
    for (i = 0; i < lids.length; i++) {
        var paramprechar = ""; switch (lparamtypes[i]) { case "string": paramprechar = "'"; break; case "int": paramprechar = ""; break; }
        if (lvalues[i].length == 0) strparam += lids[i] + ":" + paramprechar + "0" + paramprechar; else strparam += lids[i] + ":" + paramprechar + lvalues[i] + paramprechar; if (i < lids.length - 1) strparam += ",";
    }
    $.ajax({ type: "POST", url: url, data: "{" + strparam + "}", contentType: "application/json; charset=utf-8", dataType: "json", success: function (msg) {
        Drp_ListData = msg.d; $("#" + targetid + " > " + tag).remove(); for (i = 0; i < Drp_ListData.length; i++) { var objvalue = new Array(); objvalue = Drp_ListData[i].split('ß'); $("#" + targetid).append("<" + tag + " id='" + tag + "-" + objvalue[0] + "' value='" + objvalue[0] + "'>" + objvalue[1] + "</" + tag + ">"); }
        var dropdownobj = $("#" + targetid); var objid = dropdownobj.attr("id"); var dropdownobjc = dropdownobj.clone().attr("id", objid + "clone"); dropdownobj.parent().parent().append(dropdownobjc); dropdownobj.parent().remove(); dropdownobjc.attr("id", objid); dropdownobjc.removeClass(); dropdownobjc.jqTransSelect(); $.each($('#wrapper .icerik_container .jqTransformSelectWrapper'), function (i) { $(this).css('z-index', parseInt(jqTransformSelectWrapperIndex - i)); });
        callbackfnc();
    }, error: function (msg) { callbackfnc(); }
    });
}
function CheckEmail(targetobj) { var rvalue = true; $.ajax({ type: "POST", url: "/Content/WebService/ClientSiteWebService.asmx/CheckDuplicateEmail", data: "{Email:'" + $(targetobj).val() + "'}", contentType: "application/json; charset=utf-8", dataType: "json", success: function (msg) { if (msg.d == true) rvalue = true; else rvalue = false; }, error: function (msg) { rvalue = false; } }); return rvalue; }
function validatePhone(elementValue) { var phone2 = /^(0)[2-9][0-9][0-9]([0-9]){7}$/; return phone2.test(elementValue); }
function validatePhone2(elementValue) { var phone2 = /0[2-9][0-9][0-9]([0-9]){7}$/; return phone2.test(elementValue); }
function validateEmail(elementValue) { var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; return emailPattern.test(elementValue); }
function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }
function OpenUri(uri, target) { window.open(uri, target == undefined ? '_self' : target, ''); }
function OpenPopup(page, location, status, scrollbars, width, height) { var pwindow = window.open(page, "mywindow", "location=" + location + ",status=" + status + ",scrollbars=" + scrollbars + ",width=" + width + ",height=" + height + ""); }
function CheckStringForSQL(str) {
    try {
        var BlackList = new Array("--", ";", "/*", "*/", "@@", "char", "nchar", "varchar", "nvarchar", "alter", "begin", "cast", "create", "cursor", "declare", "delete", "drop", "end", "exec", "execute", "fetch", "insert", "kill", "open", "select", "sys", "sysobjects", "syscolumns", "table", "update"); for (i = 0; i < BlackList.length; i++) { if (str.indexOf(BlackList[i]) > 0) { str = str.replace(BlackList[i], ""); } }
        return str;
    } catch (e) { return str; }
}
function EncodeUri(str) {
    //var str = str; var strreplace = ["%", ";", "?", "/", ":", "#", "&", "=", "+", "$", ",", " ", "<", ">", "~", "|", "ü"]; var strreplaced = ["%25", "%3B", "%3F", "%2F", "%3A", "%23", "%26", "%3D", "%2B", "%24", "%2C", "+", "%3C", "%3E", "%7E", "%7C", "%c3%bc"]; for (var i = 0; i < strreplace.length; i++) { var btindex = 0; while (str.indexOf(strreplace[i]) > -1) { if (btindex > 1 && strreplace[i] == "%") break; str = str.replace(strreplace[i], strreplaced[i]); btindex++; } }
    return encodeURIComponent(str);
}
function MainSearch(id) {
    var searchtext = $("#" + id).val(); if (searchtext.length >= 3) { document.location.href = "/Search/?SearchText=" + EncodeUri(searchtext); return false; }
    else return;
}
function MainSearchEvent(e, id) { if (e.keyCode == 13) { e.preventDefault(); $("#" + id).click(); } }
function ClickEnterEvent(e, id) { if (e.keyCode == 13) { e.preventDefault(); $("#" + id).click(); } }
String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ""); }
String.prototype.ltrim = function () { return this.replace(/^\s+/, ""); }
String.prototype.rtrim = function () { return this.replace(/\s+$/, ""); }

function WebServicePostWithFunction(_URI, _Data, scfunction, erfunction) { $.ajax({ type: "POST", url: _URI, data: "{" + _Data + "}", contentType: "application/json; charset=utf-8", dataType: "json", success: function (msg) { scfunction(msg.d); }, error: function (msg) { erfunction(msg.d); } }); }
function WebServicePost(_URI, _Data) { $.ajax({ type: "POST", url: _URI, data: "{" + _Data + "}", contentType: "application/json; charset=utf-8", dataType: "json", success: function (msg) { return msg.d; }, error: function (msg) { return null; } }); }

function FormVariables(Container) {
    var fields = $(Container + " input," + Container + " textarea," + Container + " select").serializeArray()
    var returnstring = new Array(); var aint = 0; $.each(fields, function (i, field) {
        if (field.name != "__EVENTTARGET" && field.name != "__EVENTARGUMENT" && field.name != "__VIEWSTATE" && field.name != "__EVENTVALIDATION") {
            if (field.name.indexOf("ctl") > -1 && field.name.indexOf("$") > -1)
                field.name = field.name.substring(field.name.lastIndexOf("$") + 1, field.name.length)
            returnstring[aint] = field.name + "¿" + EncodeVariables(field.value); aint++;
        }
    }); fields = $("iframe"); $.each(fields, function (i, field) {
        try {
            if (this.id != "") {
                var iframeid = this.id; try { var iframevalue = $("#" + this.id).contents().find('#xEditingArea').find('iframe').contents().find('body').html(); var preid = iframeid.substring(0, iframeid.indexOf("_") + 1); iframeid = iframeid.substring(iframeid.indexOf("_") + 1, iframeid.indexOf("___Frame")); iframevalue = FCKeditorAPI.GetInstance(preid + iframeid).GetHTML(); iframevalue = iframevalue.replace(/\n/g, ' '); iframevalue = iframevalue.replace(/\s/g, ' ').replace(/  ,/g, ','); returnstring[aint] = "IFrame" + iframeid + "¿" + EncodeVariables(iframevalue); aint++; }
                catch (err1) { }
            }
        }
        catch (err) { }
    }); return returnstring;
}

function FormPost(PostURI, Container, ResultID) {
    var postdata = {}; if (Container.length > 0) {
        var Grd_PostVariables = new Array()
        Grd_PostVariables = FormVariables(Container);
        postdata = "{Params: '" + Grd_PostVariables.join("ß") + "'}";
    }
    $.ajax({
        type: "POST", url: PostURI, data: postdata, contentType: "application/json; charset=utf-8", dataType: "json", success: function (msg) {
            try { if (ResultID.length > 0) $(ResultID).html(msg.d); }
            catch (err) { }
        }, error: function (msg) { }
    }); return false;
}

function AddFlash(flashid, movie, width, height, quality, wmode, swfversion, expressinstall, params, Img, ishyperlink) {
    var obj = ''; var sparam = params.split(','); if (flashid == "") flashid = "ArbFlash"; if (movie == "") return false; if (width == "") width = 0; if (height == "") height = 0; if (quality == "") quality = "hight"; if (wmode == "") wmode = "transparent"; if (swfversion == "") swfversion = "6.0.65.0"; if (expressinstall == "") expressinstall = "/Content/Swf/expressInstall.swf"; if (Img == "") Img = "/Content/Img/FlashInstall.jpg"; obj += '<object id="' + flashid + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + width + '" height="' + height + '">'; obj += '<param name="movie" value="' + movie + '" />'; obj += '<param name="quality" value="' + quality + '" />'; obj += '<param name="wmode" value="' + wmode + '"/>'; obj += '<param name="swfversion" value="' + swfversion + '" />'; obj += '<param name="expressinstall" value="' + expressinstall + '" />'; for (var i = 0; i < sparam.lenght; i++) { obj += '<param name="' + sparam[0] + '" value="' + sparam[1] + '" />'; }
    obj += '<!--[if !IE]>-->'; obj += '<object type="application/x-shockwave-flash" data="' + movie + '" width="' + width + '" height="' + height + '">'; obj += '<!--<![endif]-->'; obj += '<param name="quality" value="' + quality + '" />'; obj += '<param name="wmode" value="' + wmode + '"/>'; obj += '<param name="swfversion" value="' + swfversion + '" />'; obj += '<param name="expressinstall" value="' + expressinstall + '" />'; for (var i = 0; i < sparam.lenght; i++) { obj += '<param name="' + sparam[0] + '" value="' + sparam[1] + '" />'; }
    obj += '<div>'; if (ishyperlink) obj += '<a href="http://get.adobe.com/flashplayer" target="_blank">'; obj += '<img src="' + Img + '" border="0" />'; if (ishyperlink) obj += " </a>"; obj += '<!--[if !IE]>-->'; obj += '</object>'; obj += '<!--<![endif]-->'; obj += '</object>'; document.write(obj); swfobject.registerObject(flashid); return true;
}
function AddFlash2(containerid, flashid, movie, width, height, quality, wmode, swfversion, expressinstall, params, Img, ishyperlink, bgcolor) { var obj = ''; var sparam = params.split(','); if (flashid == "") flashid = "ArbFlash"; if (movie == "") return false; if (width == "") width = 0; if (height == "") height = 0; if (quality == "") quality = "hight"; if (wmode == "") wmode = "transparent"; if (swfversion == "") swfversion = "6.0.65.0"; if (expressinstall == "") expressinstall = "/Content/Swf/expressInstall.swf"; if (Img == "") Img = "/Content/Img/FlashInstall.jpg"; if (bgcolor == "") bgcolor = "#fff"; var flashvars = {}; params.quality = quality; params.bgcolor = bgcolor; params.allowscriptaccess = "sameDomain"; params.allowfullscreen = "true"; var attributes = {}; attributes.id = flashid; attributes.name = flashid; attributes.align = "middle"; obj += "<object data='" + movie + "' name='" + flashid + "' id='" + flashid + "' type='application/x-shockwave-flash' width='" + width; obj += "' align='middle' height='" + height + "'>"; obj += "<param value='" + wmode + "' name='wmode'>"; obj += "<param value='" + quality + "' name='quality'>"; obj += "<param value='" + bgcolor + "' name='bgcolor'><param value='sameDomain' name='allowscriptaccess'><param value='true' name='allowfullscreen'></object>"; obj += "<noscript>"; obj += "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='" + width + "' height='" + height + "' id='" + flashid + "'>"; obj += "<param name='movie' value='" + movie + "' />"; obj += "<param name='quality' value='" + quality + "' />"; obj += "<param name='bgcolor' value='#" + bgcolor + "' />"; obj += "<param name='allowScriptAccess' value='sameDomain' />"; obj += "<param name='allowFullScreen' value='true' />"; obj += "<!--[if !IE]>-->"; obj += "<object type='application/x-shockwave-flash' data='" + movie + "' width='" + width + "' height='" + height + "'>"; obj += "<param name='quality' value='" + quality + "' />"; obj += "<param name='bgcolor' value='#" + bgcolor + "' />"; obj += "<param name='allowScriptAccess' value='sameDomain' />"; obj += "<param name='allowFullScreen' value='true' />"; obj += "<param value='" + wmode + "' name='wmode'>"; obj += "<!--<![endif]-->"; obj += "<!--[if gte IE 6]>-->"; obj += "<p>"; obj += "Either scripts and active content are not permitted to run or Adobe Flash Player version 10.0.0 or greater is not installed."; obj += "</p>"; obj += "<!--<![endif]-->"; if (ishyperlink) obj += '<a href="http://get.adobe.com/flashplayer" target="_blank">'; obj += '<img src="' + Img + '" border="0" />'; if (ishyperlink) obj += " </a>"; obj += "<!--[if !IE]>-->"; obj += "</object>"; obj += "<!--<![endif]-->"; obj += "</object>"; obj += "</noscript>"; $("#" + containerid).html(obj); }
function AddFlashPlayer(flashid, src, width, height, version, params, _image, ishyperlink) { $(document).ready(function () { if (_image.length > 0) $("#" + flashid).html("<a href='http://www.adobe.com/go/getflashplayer'><img src='" + _image + "' alt='Get Adobe Flash player' /></a>"); else if (ishyperlink) $("#" + flashid).html("<a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>"); }); swfobject.embedSWF(src, flashid, width, height, version, "/Content/Swf/expressinstall.swf", {}, params, { id: flashid }); }
function ChangeURLFromQueryString(qsnames, cvalues) {
    try {
        var curi = document.location.href; qsnames = qsnames.split(','); cvalues = cvalues.split(','); for (var i = 0; i < qsnames.length; i++) {
            if (IsInQueryString(qsnames[i]))
                curi = curi.replace(qsnames[i] + "=" + GetQueryString(qsnames[i]), qsnames[i] + "=" + cvalues[i]); else
                curi += (curi.indexOf("?") > -1 ? "&" : "?") + qsnames[i] + "=" + cvalues[i];
        }
        document.location.href = curi;
    } catch (e) { }
}
function SetFBConnectFnc(UID, signedRequest, AccessToken, scfunction, erfunction) {
    WebServicePostWithFunction('/Content/WebService/ClientSiteWebService.asmx/SetFBConnect', "UID:" + UID + ",signedRequest:'" + signedRequest + "',AccessToken:'" + AccessToken + "'", scfunction, erfunction);
}
function ClearForm(Container) {
    $(Container + " input[type=text]," + Container + " input[type=hidden]," + Container + " input[type=password]").val("");
    $(Container + " input[type=checkbox]," + Container + " input[type=radio]").removeAttr("checked");
}
