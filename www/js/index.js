/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        app.receivedEvent('deviceready')
        document.addEventListener("backbutton", function (e) {
            navigator.app.exitApp();
        }, false);
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
    if (window.localStorage.getItem("rememberme") == "true") {

        $("#txbEmail").val(window.localStorage.getItem("username"))
        $("#txbPassword").val(window.localStorage.getItem("password"))
        $('#remember-me').prop('checked', true);
    }
    else {
        $("#txbEmail").val('')
        $("#txbPassword").val('')
        $('#remember-me').prop('checked', false);
        window.localStorage.setItem("rememberme", 'false');
    }

    $("#btnLogin").on("click", function (e) {
        var remember
        if ($("#remember-me").is(':checked')) {
            window.localStorage.setItem("username", $("#txbEmail").val());
            window.localStorage.setItem("password", $("#txbPassword").val());
            window.localStorage.setItem("rememberme", 'true');
        }
        else
        {
            window.localStorage.setItem("username", $("#txbEmail").val());
            window.localStorage.setItem("rememberme", 'false');
        }
        makeLogin($("#txbEmail").val(), $("#txbPassword").val())

    });


});

function makeLogin(username, password) {
    var headers;
    headers = {
        "action": "LOGIN"
    }
    data = {
        "email": username,
        "password": password
    }
    $.ajax({
        type: 'POST',
        url: 'http://app.registroenlaweb.com/ActionsApp.aspx',
        data: data,
        headers: headers
    }).done(function (data) {
        if (data.estatus == 'OK') {

            window.localStorage.setItem("username", data.username);

            // localStorage is now empty
            window.location = "scanner.html"
        }
        else {
            mostrarAlerta('fa fa-times', data.mensaje, 'danger')
            window.localStorage.setItem("username", '');
            window.localStorage.setItem("password", '');
            window.localStorage.setItem("rememberme", 'false');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        mostrarAlerta('fa fa-times', 'Ha ocurrido un error: ' + textStatus, 'danger')
    });

}