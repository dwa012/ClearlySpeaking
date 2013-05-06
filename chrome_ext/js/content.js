
// Test the text of the body element against our regular expression.
if ($('slide') != null && $('slide').length > 0 ) {
    // The regular expression produced a match, so notify the background page.
    chrome.runtime.sendMessage({action: "show_action"}, function(response) {});
} else {
    // No match was found.
}

function temp(response){
   //left blank
}


function response(request, sender, sendResponse) {


    //If the connect action is received, then forward the action to the event page
    if (request.action == "connect"){
        console.log("got connect message");

        // TODO this line is the crash point. I am not sure if it is due to a async issue
        chrome.runtime.sendMessage({action: "connect_action"}, temp);

        sendResponse({});

    }
    else if(request.action == "advance_slide"){
        // advance to the next slide
        $('#next-slide-area').click();
        sendResponse({});
    } else  {

        console.log("content: first");
        console.log("content: " + request.action);
        sendResponse({});
    }

    //sendResponse({});
    //return true;
}


chrome.runtime.onMessage.addListener(response);
