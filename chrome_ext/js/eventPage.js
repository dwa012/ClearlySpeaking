var tokenURL = "https://clearly-speaking.appspot.com/token"
var channel;
var channelPorts = [];

var handler = {
    onopen: function () {
        console.log("opened");
    },
    onerror: function (error) {
        console.log("error: " + error.description);
    },
    onclose: function () {
        console.log("opened");
    },
    onmessage: onMessage
};

// this is the response method for the one time connections
function response(request, sender, sendResponse) {

    // if the content script says that it is ok to show the action.
    if (request.action == "show_action") {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        });

        sendResponse({});
    }
}


// this is the on message handler for the channel to the app engine server
function onMessage(event) {
    // Move to the next slide when we get a message from the app engine server
    var notification = {action: "move_that_bus"};
    for (var i = 0, len = channelPorts.length; i < len; i++) {
        channelPorts[i].postMessage(notification);
    }
}


function getToken() {
    console.log("fetching the token")
    $.getJSON(tokenURL,function (data) {
        channel = new goog.appengine.Channel(data["token"]);
        channel.open(handler);

    }).error(function (error) {
            console.log("error: " + error)
        });
}


chrome.runtime.onMessage.addListener(response);


// a tab requests connection to the background script
chrome.extension.onConnect.addListener(function (port) {
    var tabId = port.sender.tab.id;
    console.log('Received request from content script', port);

    port.onMessage.addListener(function (msg) {
        // setup the channel to the app engine server
        if (msg.action == "connect_action") {
            getToken();
        }
    });

    // add the connected port to the list of open ports
    if (channelPorts.indexOf(port) == -1) {
        channelPorts.push(port);
    }

    // when a port disconnects, remove it from the list
    port.onDisconnect.addListener(function () {
        channelPorts.splice(channelPorts.indexOf(tabId), 1);
    }); // end of onDisconnect Listener

}); // end of onConnect Listener