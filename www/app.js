tabris.ui.set("image", "img/icon_big.png");
tabris.ui.set("background", "#A31919");
// tabris.ui.set("foreground", "white");





var drawerModule = require("./drawer.js");
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
    id: "page-about",
    title: "About",
    topLevel: true,
    image: "img/info_small.png"
});

tabris.create("Page", {
    id: "page-outlet",
    title: "Outlet Info",
    topLevel: true,
    image: "img/outlet_small.png"
});

tabris.create("Page", {
    id: "page-feedback",
    title: "Feedback",
    style: ["FULLSCREEN"],
    topLevel: true,
    image: "img/feedback_small.png"
});

tabris.create("Page", {
    id: "page-logout",
    title: "Logout",
    topLevel: true,
    image: "img/exit_small.png"
});




tabris.ui.children("Page").filter(function(page) {
    if (page.get("topLevel")) {
        drawerModule.createPageSelector(page);
    }
});


pages.catalogue.open();
