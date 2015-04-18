var data = require("./data.js");

/*
 * Actions
 */
var proposals = data.proposals;

var searchResultPage = tabris.create("Page", {
    title: "Search Result"
})

var textView = tabris.create("TextView", {
    layoutData: {centerX: 0, centerY: 0}
}).appendTo(searchResultPage);

var searchAction = tabris.create("SearchAction", {
    // title: "Search",
    visible: false,
    image: "img/search.png"
}).on("modify", function(event) {
    this.set("proposals", proposals.filter(function(proposal) {
        return proposal.indexOf(event.query) !== -1;
    }));
}).on("submit", function(event) {
    textView.set("text", "Selected '" + event.query + "'");
});


var cartAction = tabris.create("Action", {
    title: "Cart",
    image: "img/cart.png"
}).on("selection", function() {
    console.log("Action selected.");
});

exports.search = searchAction;
exports.cart = cartAction;