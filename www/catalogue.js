// var device = require("./device.js");
var dataModule = require("./data.js");
var actionModule = require("./action.js");
var hiddenModule = require("./hidden.js");

var minCategoryWidth = 180;
var minCategoryHeight = 175;
var minProductWidth = 180;
var minProductHeight = 200;

var categories = dataModule.categories;
var products = dataModule.products;


// Credit Summary Bar
var createCreditSummaryBar = function(page) {
    var creditSummaryBar = tabris.create("Composite", {
        layoutData: {top: [page.children().last(), 0], left: 0, right: 0},
        background: "black"
    }).appendTo(page);

    var creditSummaryText = tabris.create("TextView", {
        layoutData: {left: 5, top: 3, height: 28},
        markupEnabled: true,
        font: "18px",
        textColor: "white",
        text: "Balance: <b>119.00</b> &nbsp;&nbsp; Cart: <b>115.25</b> + <b>$68.50</b>"
    }).appendTo(creditSummaryBar);
}

// Tab
var tabFolder = tabris.create("TabFolder", {
    layoutData: {left: 0, top: 75, right: 0, bottom: 0},
    textColor: "#EEEEEE", // even the text would be red -_-
    background: "#A31919",
    paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).on("change:selection", function(event) {
    var title = this.get("selection").get("title");
    tabris.ui.get("activePage").set("title", title);
    tabris.ui.get("activePage").find("#page-title").set("text", title);
    // populateTab(this.get("selection").get("id"));
}).appendTo(hiddenModule.page);

var createTab = function(id, title, image) {
    var tab = tabris.create("Tab", {
        id: id,
        title: title, // converted to upper-case on Android
        // badge: "1", // a circle with a number inside. doesn't seem to be working
        background: "white",
        image: {src: image, scale: 2} // image only used by iOS
    }).appendTo(tabFolder);
};

var populateTab = function(id) {
    var itemsPerRow = Math.floor(tabris.device.get("screenWidth") / minProductWidth);
    var productWidth = tabris.device.get("screenWidth") / itemsPerRow;
    var productHeight = minProductHeight * productWidth / minProductWidth;

    var tab = tabFolder.find("#" + id)[0];
    tab.children().dispose();

    var productsComposite = tabris.create("ScrollView", {
        layoutData: {left: 0, right: 0, top: 0, bottom: 0},
        direction: "vertical"
    }).appendTo(tab);

    // list products
    products.forEach(function(product, i) {
        var imageView = tabris.create("ImageView", {
            layoutData: {top: 16, left: 30, right: 30},
            image: product.image
        });
        var nameTextView = tabris.create("TextView", {
            layoutData: {left: 10, top: [imageView, 0], right: 10},
            alignment: "center",
            font: "bold 15px",
            text: product.productName
        });
        var onlinePriceTextView = tabris.create("TextView", {
            layoutData: {left: 10, top: [nameTextView, 0], right: 10},
            alignment: "center",
            markupEnabled: true,
            textColor: "#A31919",
            font: "16px",
            text: "Online <b>$" + Number(product.onlinePrice).toFixed(2) + "</b>"
        });
        var outletPriceTextView = tabris.create("TextView", {
            layoutData: {left: 10, top: [onlinePriceTextView, 0], right: 10},
            alignment: "center",
            markupEnabled: true,
            font: "15px",
            text: "Outlet <b>$" + Number(product.outletPrice).toFixed(2) + "</b>"
        });

        // calculate whether to show in which row / column
        var x = i % itemsPerRow;
        var y = Math.floor(i / itemsPerRow);

        var composite = tabris.create("Composite", {
            layoutData: {left: x * productWidth, top: y * productHeight, width: productWidth, height: productHeight},
            highlightOnTouch: true
        });
        composite.append(imageView, nameTextView, onlinePriceTextView, outletPriceTextView);
        composite.appendTo(productsComposite);
    });
};


/*
 * Catalogue Page
 */
var cataloguePage = tabris.create("Page", {
    id: "page-catalogue",
    title: "Catalogue",
    topLevel: true,
    style: ["FULLSCREEN"],
    image: "img/catalogue_small.png"
}).on("appear", function() {
    actionModule.search.set("visible", true);
}).on("disappear", function() {
    actionModule.search.set("visible", false);
});
actionModule.createActionBar(cataloguePage, {search:true});
createCreditSummaryBar(cataloguePage);

function populateCategories() {
    var itemsPerRow = Math.floor(tabris.device.get("screenWidth") / minCategoryWidth);
    var categoryWidth = tabris.device.get("screenWidth") / itemsPerRow;
    var categoryHeight = minCategoryHeight * categoryWidth / minCategoryWidth;
    
    var categoriesComposite = tabris.create("ScrollView", {
        layoutData: {left: 0, right: 0, top: [cataloguePage.children().last(), 0], bottom: 0},
        direction: "vertical"
    }).appendTo(cataloguePage);

    categories.forEach(function(category, i) {
        var imageView = tabris.create("ImageView", {
            layoutData: {top: 16, left: 30, right: 30},
            image: category.image
        });
        var nameTextView = tabris.create("TextView", {
            layoutData: {left: 10, top: [imageView, 0], right: 10},
            //            highlightOnTouch: true,
            alignment: "center",
            font: "bold 20px",
            text: category.categoryName
        });

        // calculate whether to show in which row / column
        var x = i % itemsPerRow;
        var y = Math.floor(i / itemsPerRow);

        var composite = tabris.create("Composite", {
            layoutData: {left: x * categoryWidth, top: y * categoryHeight, width: categoryWidth, height: categoryHeight},
            highlightOnTouch: true // this adds a slight delay
        });
        composite.append(imageView, nameTextView);
        composite.appendTo(categoriesComposite);
        composite.on("tap", function() {
            //tabFolder.set("selection", category.id);
            var productsPage = tabris.create("Page", {
                // id: "productsPage",
                style: ["FULLSCREEN"]
            }).on("appear", function() {
                tabFolder.set("selection", tabFolder.find("#" + category.id)[0]);
            }).on("dispose", function() { // park the tabFolder to the hiddenPage so that it would not get disposed with ProductsPage
                tabFolder.appendTo(hiddenModule.page);
            });
            actionModule.createActionBar(productsPage, {search:true});
            createCreditSummaryBar(productsPage);
            tabFolder.appendTo(productsPage);
            productsPage.open();
        });
    });
}

categories.forEach(function(category) {
    createTab(category.id, category.categoryName, category.image);
    populateTab(category.id);
});

populateCategories();

exports.page = cataloguePage;
exports.populate = populateCategories;
// exports.productsPage = productsPage;

