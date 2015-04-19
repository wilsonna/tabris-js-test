var data = require("./data.js");
var drawerModule = require("./drawer.js");

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

// Fake Action Bar
var createActionBar = function(page) {
    var actionBar = new tabris.create("Composite", {
        layoutData: {left: 0, top: 0, right: 0, height: 45},
        background: "#A31919"
    }).appendTo(page);

    var menuImage = tabris.create("ImageView", {
        layoutData: {top: 8, left: 5, height: 30},
        image: "img/menu.png",
        highlightOnTouch: true
    }).on("tap", function() {
        drawerModule.drawer.open();
    }).appendTo(actionBar);
    /*
var pageImage = tabris.create("ImageView", {
    layoutData: {top: 8, left: [actionBar.children().last(), 5], height: 30},
    image: "img/icon_big.png",
    highlightOnTouch: true
}).on("tap", function() {
    drawerModule.drawer.open();
}).appendTo(actionBar);
*/
    var pageTitle = tabris.create("TextView", {
        layoutData: {top: 10, left: [actionBar.children().last(), 5], height: 30},
        foreground: "white",
        font: "18px",
        text: page.get("title"),
        highlightOnTouch: true
    }).on("tap", function() {
        drawerModule.drawer.open();
    }).appendTo(actionBar);
    var cartAction = tabris.create("ImageView", {
        // title: "Cart",
        layoutData: {top: 8, right: 5, height: 30},
        image: "img/cart.png",
        highlightOnTouch: true
    }).on("tap", function() {
        console.log("Cart selected.");
    }).appendTo(actionBar);
    /*
var textView = tabris.create("TextView", {
    layoutData: {centerX: 0, centerY: 0}
}).appendTo(searchResultPage);
*/
    var searchAction = tabris.create("ImageView", {
        // title: "Search",
        // visible: false,
        layoutData: {top: 8, right: [actionBar.children().last(), 5], height: 30},
        image: "img/search.png",
        highlightOnTouch: true
    }).on("tap", function() {
        console.log("Search selected.");
    }).appendTo(actionBar);
    /*
.on("modify", function(event) {
    this.set("proposals", proposals.filter(function(proposal) {
        return proposal.indexOf(event.query) !== -1;
    }));
}).on("submit", function(event) {
    textView.set("text", "Selected '" + event.query + "'");
});
*/
}


exports.search = searchAction;
exports.cart = cartAction;
exports.createActionBar = createActionBar;