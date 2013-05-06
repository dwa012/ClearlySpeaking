var tokenURL = "https://clearly-speaking.appspot.com/token"

function response(request, sender, sendResponse) {

    console.log(request.action);

    if (request.action == "connect_action"){
        console.log("got connect action message");
        getToken();
        sendResponse({});
    } else if (request.action == "show_action"){

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });

        sendResponse({});
    } else {
        console.log("event: " + request.action);
        console.log("event: first");
        sendResponse({});
    }

}

var handler =
{
    onopen: function () {
       console.log("opened");
    },
    onerror: function (error) {
        console.log("error: " + error.description);
    },
    onclose: function () {
        console.log("opened");
    },
    onmessage: function (evt) {

        console.log("got a message: " + evt.data);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "advance_slide"}, function(response) {});
        });
    }
};

function getToken() {
    console.log("fetching the token")
    $.getJSON(tokenURL, function(data) {

        var token = data["token"];
        console.log(data);

        channel = new goog.appengine.Channel(token);
        socket = channel.open(handler);

    }).error(function(error) { console.log("error: " + error) });
}

chrome.runtime.onMessage.addListener(response);