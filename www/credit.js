var dataModule = require("./data.js");
var actionModule = require("./action.js");
var util = require("./util.js");

var serviceman = dataModule.serviceman;

tabris.create("Page", {
    id: "page-account",
    title: "My Account",
    style: ["FULLSCREEN"],
    topLevel: true,
    image: "img/account_small.png"
});

var creditPage = tabris.create("Page", {
    id: "page-credit",
    title: "My Credit Details",
    style: ["FULLSCREEN"],
    topLevel: true,
    image: "img/bullet_small.png"
});
actionModule.createActionBar(creditPage);

tabris.create("Page", {
    id: "page-measurement",
    title: "My Measurements",
    style: ["FULLSCREEN"],
    topLevel: true,
    font: "8px",
    image: "img/bullet_small.png"
});

tabris.create("Page", {
    id: "page-orders",
    title: "My Orders",
    style: ["FULLSCREEN"],
    topLevel: true,
    image: "img/bullet_small.png"
});


var createField = function(page, label, value) {
    var composite = tabris.create("Composite", {
        layoutData: {left: 20, top: [page.children().last(), 10], right: 20, height: 45}
    }).appendTo(page);
    
    var label = tabris.create("TextView", {
        // font: "24px",
        font: "18px",
        layoutData: {left: 0, right: '60%', top: 0},
        text: label
    }).appendTo(composite);

    var value = tabris.create("TextView", {
        // font: "24px",
        font: "18px",
        layoutData: {left: label, right: 0, top: 0},
        text: value
    }).appendTo(composite);
}

createField(creditPage, "Name", serviceman.name);
// createField(creditPage, "NRIC No.", serviceman.nricNo);
createField(creditPage, "Service", serviceman.service + " " + serviceman.tos);
createField(creditPage, "Status", serviceman.status);
createField(creditPage, "Credit Balance", serviceman.creditBalance);
createField(creditPage, "Last Top-up", util.formatDate(serviceman.lastTopupDate));
createField(creditPage, "Next Top-up", serviceman.creditLimit + " on " + util.formatDate(serviceman.nextTopupDate));
createField(creditPage, "Expiring", serviceman.creditExpiring);

/*
var button = tabris.create("Button", {
    text: "Native Widgets",
    layoutData: {centerX: 0, top: 100}
}).on("selection", function() {
    label.set("text", "Totally Rock!");
}).appendTo(page);

var items = ["North", "East", "South", "West"];

var picker = tabris.create("Picker", {
    layoutData: {left: 20, top: 20, right: 20},
    items: items,
    selectionIndex: 1
}).on("change:selection", function() {
    var selectionIndex = this.get("selectionIndex");
    console.log("Heading " + items[selectionIndex]);
}).appendTo(page);

var progressBar = tabris.create("ProgressBar", {
    layoutData: {left: 0, right: 0, top: -6},
    maximum: 300,
    selection: 100
}).appendTo(page);

setInterval(function() {
    var selection = progressBar.get("selection") + 1;
    progressBar.set("selection", selection > 300 ? 0 : selection);
}, 20);
*/

exports.page = creditPage;