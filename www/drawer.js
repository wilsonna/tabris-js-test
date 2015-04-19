var drawer = tabris.create("Drawer");
var drawerComposite = tabris.create("ScrollView").appendTo(drawer);
tabris.create("ImageView", {
    layoutData: {top: 0, left: -5, right: -45},
    image: "img/banner-army.png"
}).appendTo(drawerComposite);
var divider = tabris.create("Composite", {
    layoutData: {top: [drawerComposite.children().last(), 0], left: -1, right: -1},
    background: "#A31919"
}).appendTo(drawerComposite);
var servicemanInfoComposite = tabris.create("Composite", {
    layoutData: {top: 5, left: 0, right: 0},
    background: "white"
}).appendTo(divider);
tabris.create("TextView", {
    layoutData: {top: 10, left: 10},
    font: "bold 15px",
    foreground: "gray",
    text: "Anderson Kang Lee Hon (S8146733E)" 
}).appendTo(servicemanInfoComposite);
tabris.create("TextView", {
    layoutData: {top: [servicemanInfoComposite.children().last(), 5], left: 10},
    font: "15px",
    foreground: "gray",
    markupEnabled: true,
    text: "Credit Balance <b>234.25</b> thru <b>01-AUG-2016</b>" 
}).appendTo(servicemanInfoComposite);
tabris.create("Composite", {
    layoutData: {top: [servicemanInfoComposite.children().last(), 10], left: 0, right: 0, height: 15},
    backgroundImage: "img/shadow.png"
}).appendTo(servicemanInfoComposite);




var createPageSelector = function(page) {
    var imageView = tabris.create("ImageView", {
        layoutData: {top: 10, left: 15},
        image: page.get("image")
    });
    var nameTextView = tabris.create("TextView", {
        layoutData: {top: 10, left: [imageView, 20]},
        font: "15px",
        text: page.get("title")
    });
    var composite = tabris.create("Composite", {
        id: page.get("id"),
        layoutData: {left: 0, top: [pageSelectorComposite.children().last(), 0], right: 0, height: 45},
        highlightOnTouch: true
    });
    composite.append(imageView, nameTextView);
    composite.on("tap", function() {
        page.open();
        drawer.close();
    });
    composite.appendTo(pageSelectorComposite);

    page.on("appear", function() {
        pageSelectorComposite.children("Composite").filter(function(e) {
            e.set("background", (e == composite) ? "#EEEEEE" : "white");
            e.children("TextView").set({
                foreground: (e == composite) ? "#A31919" : "black",
                font: (e == composite) ? "bold 15px" : "15px"
            });
        });
    });
}

var pageSelectorComposite = tabris.create("Composite", {
    layoutData: {top: [drawerComposite.children().last(), -5], left: 0}
}).appendTo(drawerComposite);

exports.drawer = drawer;
exports.createPageSelector = createPageSelector;