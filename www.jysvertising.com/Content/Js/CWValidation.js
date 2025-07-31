function alignValidation() { }

function CheckFormFocus(Targetobj) {
    if ($(Targetobj).attr("type") == "radio")
        $("#CWValidate" + $(Targetobj).attr("name")).remove(); else
        $("#CWValidate" + $(Targetobj).attr("ID")).remove();
}
function CheckFormChange(Targetobj) { CheckFormFocus(Targetobj); CheckFormAction(Targetobj); }
function ShowCheckFormMessage(Targetobj) { var errortext = $(Targetobj).attr("ErrorMessage") != undefined ? $(Targetobj).attr("ErrorMessage") : "*"; if ($("#CWValidate" + $(Targetobj).attr("id")).html() == undefined) { $(Targetobj).after("<div id='CWValidate" + $(Targetobj).attr("id") + "' class='CWValidate' >" + errortext + "</div>"); $(Targetobj).unbind("focus").unbind("change").unbind("keyup"); $(Targetobj).focus(function () { CheckFormFocus(Targetobj) }); $(Targetobj).change(function () { CheckFormChange(Targetobj) }).keyup(function () { CheckFormChange(Targetobj); }); } alignValidation(); }
function CheckFormAction(Targetobj) {
    var returnvalidation = true; if ($(Targetobj).attr("type") == "text" || $(Targetobj).attr("type") == "password") {
        var textvalue = $(Targetobj).val(); switch ($(Targetobj).attr("validationtype")) {
            case undefined: if (textvalue.length == 0) { ShowCheckFormMessage(Targetobj); returnvalidation = false; }
                break; case "SecureCode": if (textvalue.length < 6) { ShowCheckFormMessage(Targetobj); returnvalidation = false; }
                break; case "EMail": if (!validateEmail(textvalue)) { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                break; case "Phone": if (!validatePhone(textvalue)) { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                break; case "Phone2": if (!validatePhone2(textvalue)) { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                break; case "Number": if (!isNumber(textvalue)) { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                break; case "Password": if (textvalue.length < 6) { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                break; case "PasswordRety": var toobj = $("#" + $(Targetobj).attr("validationto")); if (textvalue.length < 6 || textvalue != toobj.val()) { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                break; case "TCNo": if (textvalue.length < 11) { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                else if (textvalue.length == 11) {
                    try {
                        toplam = Number(textvalue.substring(0, 1)) + Number(textvalue.substring(1, 2)) + Number(textvalue.substring(2, 3)) + Number(textvalue.substring(3, 4)) + Number(textvalue.substring(4, 5)) + Number(textvalue.substring(5, 6)) + Number(textvalue.substring(6, 7)) + Number(textvalue.substring(7, 8)) + Number(textvalue.substring(8, 9)) + Number(textvalue.substring(9, 10)); if (Number(textvalue.substring(10, 11)) == (toplam % 10)) { }
                        else { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                    } catch (e) { returnvalidation = false; ShowCheckFormMessage(Targetobj); }
                }
                break;
        }
    }
    else if ($(Targetobj).attr("type") == "select-one" || $(Targetobj).is("select")) { var selectedvalue = $(Targetobj).val().trim(); if (selectedvalue.length == 0) { returnvalidation = false; ShowCheckFormMessage(Targetobj); return false; } }
    else if ($(Targetobj).attr("type") == "checkbox") { if (!$(Targetobj).is(":checked")) { returnvalidation = false; ShowCheckFormMessage(Targetobj); return false; } }
    else if ($(Targetobj).attr("type") == "radio") {
        var selectedvalue = $("input[name='" + Targetobj.attr("name") + "']:checked").val(); if (selectedvalue == undefined || selectedvalue.length == 0) { returnvalidation = false; ShowCheckFormMessage(Targetobj); return false; }
    }
    else if ($(Targetobj).is('textarea')) { var textvalue = $(Targetobj).val(); if (textvalue.length == 0) { ShowCheckFormMessage(Targetobj); returnvalidation = false; } }
    return returnvalidation;
}
function CheckForm(ContainerID) { var returnvalidation = true; $(ContainerID + " .CWValidate").remove(); $(ContainerID + " input," + ContainerID + " select," + ContainerID + " textarea").each(function () { if ($(this).attr("formvalidation") == "true") { $(this).each(function (i) { if (returnvalidation) { returnvalidation = CheckFormAction($(this)); } }); } }); return returnvalidation; }