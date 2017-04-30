var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", function () { alert("No tiene acceso a Internet..."); navigator.app.exitApp(); }, false);


    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        console.log('Received Event: ' + id);
    }
};
$(document).ready(function () {
    // Make your jQuery Mobile framework configuration changes here!
    $.support.cors = true;
    $.allowCrossDomainPages = true;


    $("#menuLogout").on("click", function (e) {
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("password");
        window.localStorage.removeItem("rememberme");
        window.location = "index.html"

    });

    $("#menuSalir").on("click", function (e) {
        navigator.app.exitApp();

    });
});