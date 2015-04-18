tabris.ui.set("image", "img/icon_big.png");
tabris.ui.set("background", "#A31919");
// tabris.ui.set("foreground", "white");


var createPageSelector = function(page) {
    var imageView = tabris.create("ImageView", {
        layoutData: {top: 0, left: 0},
        image: page.get("image")
    });
    var nameTextView = tabris.create("TextView", {
        layoutData: {left: [imageView, 5], top: 0},
        font: "17px",
        text: page.get("title")
    });
    var composite = tabris.create("Composite", {
        layoutData: {left: 5, top: [drawerComposite.children().last(), 8], right: 0},
        highlightOnTouch: true
    });
    composite.append(imageView, nameTextView);
    composite.on("tap", function() {
        page.open();
        drawer.close();
    });
    composite.appendTo(drawerComposite);
}





//tabris.create("PageSelector", {
//    layoutData: {left: 0, top: 0, right: 0, bottom: 0}
//}).appendTo(drawer);


var catalogueModule = require("./catalogue.js");
var creditModule = require("./credit.js");

var pages = {
    catalogue: catalogueModule.page//,
    //products: catalogue.productsPage
};


tabris.device.on("change:orientation", function() {
    if (pages.catalogueModule.get("visible")) {
        pages.catalogueModule.children().dispose();
        catalogueModule.populate();
    }
});


tabris.create("Page", {
    title: "My Measurements",
    topLevel: true,
    font: "8px",
    image: "img/bullet_small.png"
});
tabris.create("Page", {
    title: "My Orders",
    topLevel: true,
    image: "img/bullet_small.png"
});

tabris.create("Page", {
    title: "About",
    topLevel: true,
    image: "img/info_small.png"
});

tabris.create("Page", {
    title: "Outlet Info",
    topLevel: true,
    image: "img/outlet_small.png"
});

tabris.create("Page", {
    title: "Feedback",
    style: ["FULLSCREEN"],
    topLevel: true,
    image: "img/feedback_small.png"
});

tabris.create("Page", {
    title: "Logout",
    topLevel: true,
    image: "img/exit_small.png"
});


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
    font: "bold 17px",
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
tabris.ui.children("Page").filter(function(page) {
    if (page.get("topLevel")) {
        createPageSelector(page);
    }
});

//createPageSelector("Test", "img/bullet_small.png");
//createPageSelector("Test1", "img/bullet_small.png");
//createPageSelector("Test2", "img/bullet_small.png");
//createPageSelector("Test3", "img/bullet_small.png");


pages.catalogue.open();
