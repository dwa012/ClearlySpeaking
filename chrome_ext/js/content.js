// check that the DOM contains a 'slide' tag
if ($('slide') != null && $('slide').length > 0) {
    // The regular expression produced a match, so notify the background page.
    chrome.runtime.sendMessage({action: "show_action"}, function (response) {
    });
} else {
    // No match was found.
}

var port = chrome.extension.connect();

// this is the listner handler for the one time messages
function response(request, sender, sendResponse) {

    //If the connect action is received, then forward the action to the event page
    if (request.action == "connect") {

        // got the message from the popup to connect to the app engine server
        port.postMessage({action: "connect_action"});

        sendResponse({});
    }
}

// this is the handler for the persistent connection to the background script
function tubeResponse(msg) {
    console.log("got from bkg page: " + msg);
    if (msg.action == "move_that_bus") {
        $('#next-slide-area').click();

    }
}

chrome.runtime.onMessage.addListener(response);


port.onMessage.addListener(tubeResponse);