tabris.ui.set("background", "red");

var page = tabris.create("Page", {
  title: "Hello, World 1.1!",
  topLevel: true
});

var page2 = tabris.create("Page", {
  title: "Page2",
  topLevel: true
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
/*
var items = ["North", "East", "South", "West"];

var picker = tabris.create("Picker", {
  layoutData: {left: 20, top: 20, right: 20},
  items: items,
  selectionIndex: 1
}).on("change:selection", function() {
  var selectionIndex = this.get("selectionIndex");
  console.log("Heading " + items[selectionIndex]);
}).appendTo(page);
*/
page.open();
