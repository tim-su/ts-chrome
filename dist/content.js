/**
 * Content scripts have some limitations. They cannot use chrome.* APIs, with the exception of extension, i18n, runtime, and storage.
 */

'use strict';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'ACTION_CLICK') {
        $("p").css('color', 'red');
        $("#outer-wrapper").before("<div id='extension-div'><p>Hello extension</p></div>");
        setInterval(updateInvoiceSummary, 5000);
    }
});

var updateInvoiceSummary = function updateInvoiceSummary() {
    var token = getCookie('AuthToken');
    console.log('token: ' + token);
    getInvoiceSummary(token, function (data) {
        $("#extension-div").html("<div class='stats-container'>" + "<p>" + "<h4>" + data.count + "</h4>" + " Invoices issued." + "</p>" + "</div>");
    });
};

var getInvoiceSummary = function getInvoiceSummary(authToken, handler) {
    $.get("https://loki.dev.essentials.myob.com/LA/api/businesses/1461289/home/openInvoicesSummary", { 'Authtoken': authToken }, handler);
};

var getCookie = function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};