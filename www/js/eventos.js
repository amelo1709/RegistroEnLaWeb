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

    getEventos()

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

function getEventos() {

    var headers;
    headers = {
        "action": "READEVENTOS"
    }
    data = {
        "username": window.localStorage.getItem("username")
    }
    $.ajax({
        type: 'POST',
        url: 'http://app.registroenlaweb.com/ActionsApp.aspx',
        data: data,
        headers: headers
    }).done(function (data) {


        $("#containerEventos").empty();

        $.each(data, function (i, item) {
            $('#containerEventos').append('<div class="col-xs-4"><a href="datos.html?idEvento=' + item.idevento + '" class="thumbnail"><img src="http://app.registroenlaweb.com/img/eventos/' + item.idevento + '.png" alt="' + item.titulo + '"></a></div>');
        });


    }).fail(function (jqXHR, textStatus, errorThrown) {
        mostrarAlerta('fa fa-times', 'Ha ocurrido un error: ' + textStatus, 'danger')

    });

}