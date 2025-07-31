function RegisterNewsletter(_emailid) {
    $(".iletisim_left_box_content .result").html("");
    try {
        var email = $("#" + _emailid).val();
        var errormessage = $("#" + _emailid).attr("ErrorMessage");
        if (!validateEmail(email)) {
            $(".iletisim_left_box_content .result").html(errormessage);
        }
        else {
            $.ajax({
                type: "POST",
                url: "/Content/WebService/ClientSiteWebService.asmx/RegisterNewsletter",
                data: "{Email:'" + email + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    $(".iletisim_left_box_content .result").html(msg.d);
                },
                error: function (msg) {
                    return false;
                }
            });
        }

    } catch (e) {

    }
    return false;
}