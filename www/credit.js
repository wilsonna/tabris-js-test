tabris.create("Page", {
    id: "page-account",
    title: "My Account",
    topLevel: true,
    image: "img/account_small.png"
});

var page = tabris.create("Page", {
    id: "page-credit",
    title: "My Credit Details",
    topLevel: true,
    image: "img/bullet_small.png"
});

tabris.create("Page", {
    id: "page-measurement",
    title: "My Measurements",
    topLevel: true,
    font: "8px",
    image: "img/bullet_small.png"
});

tabris.create("Page", {
    id: "page-orders",
    title: "My Orders",
    topLevel: true,
    image: "img/bullet_small.png"
});

var label = tabris.create("TextView", {
    font: "24px",
    layoutData: {centerX: 0, top: [button, 50]}
}).appendTo(page);

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