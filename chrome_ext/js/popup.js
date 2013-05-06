$(document).ready(function(){

  $('#connectButton').click(function(){
  
    $('#connectButton').hide();
    $('.progress').show();

    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendMessage(tab.id, {action: "connect"}, function(response) {
        $('.progress').hide();
        console.log(response.farewell);
      });// end sendMessage
    }); // end getSelected
  });// end click listener
}); 
  