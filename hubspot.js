(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//js.hs-scripts.com/47247834.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "hs-script-loader");

window.hsLoadedCallback = function () {
  if (window.HubSpotConversations) {
    console.log("HubSpot Chat Widget API loaded");

    // Customize the widget
    window.HubSpotConversations.widget.load({
      expanded: false,
      position: "right",
      chatLinks: {
        open: {
          color: "#FFD700", // Yellow color
          backgroundColor: "transparent",
        },
      },
    });

    // Set up event listeners
    window.HubSpotConversations.on("conversationStarted", function (payload) {
      console.log("Conversation started:", payload);
    });

    window.HubSpotConversations.on(
      "unreadConversationCountChanged",
      function (payload) {
        console.log("Unread count changed:", payload);
      }
    );
  } else {
    console.error("HubSpot Chat Widget API not available");
  }
};
