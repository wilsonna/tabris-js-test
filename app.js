//require("./animation.js");
//require("./people.js");
//require("./tray.js");

tabris.ui.set("image", "img/icon_big.png");
tabris.ui.set("background", "#A31919");
// tabris.ui.set("foreground", "white");

var screenWidth = tabris.device.get("screenWidth");
var screenHeight = tabris.device.get("screenHeight");

console.log(tabris.ui._shell.get("mode"));
console.log(tabris.device.get("model") + ", " + tabris.device.get("platform") + " ver. " + tabris.device.get("version") + ", " + tabris.device.get("language"));
console.log(tabris.device.get("orientation") + ", " + screenWidth + " x " + screenHeight);


var drawer = tabris.create("Drawer");
tabris.create("PageSelector", {
    layoutData: {left: 0, top: 0, right: 0, bottom: 0}
}).appendTo(drawer);



/*
 * Actions
 */
var proposals = ["baseball", "batman", "battleship", "bangkok", "bangladesh", "banana"];

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



var cataloguePage = tabris.create("Page", {
    title: "Catalogue",
    topLevel: true,
    image: "img/catalogue_small.png"
}).on("appear", function() {
    searchAction.set("visible", true);
}).on("disappear", function() {
    searchAction.set("visible", false);
})
tabris.device.on("change:orientation", function() {
//    console.log("change");
    if (cataloguePage.get("visible")) {
        cataloguePage.children().dispose();
        showCategories();
    }
});

var categories = [
    ["clothing", "Clothing", "img/placeholder.png"],
    ["headerwear", "Headwear", "img/placeholder.png"],
    ["footwear", "Footwear", "img/placeholder.png"],
    ["ranks", "Ranks", "img/placeholder.png"],
    ["badges", "Badges", "img/placeholder.png"],
    ["expendables", "Expendables", "img/placeholder.png"]
].map(function(element) {
    return {id: element[0], categoryName: element[1], image: element[2]};
});

var products = [
    ["Combat Boots", 68.50, 76.11, "img/placeholder.png"],
    ["No. 3 Shoes", 38.25, 42.50, "img/placeholder.png"],
    ["Sports Shoes 1", 22.35, 24.83, "img/placeholder.png"],
    ["Sports Shoes 2", 25.31, 27.48, "img/placeholder.png"],
    ["Misc Footwear 1", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 2", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 3", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 4", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 5", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 6", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 7", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 8", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 9", 10.00, 11.00, "img/placeholder.png"],
    ["Misc Footwear 10", 10.00, 11.00, "img/placeholder.png"]
].map(function(element) {
    return {productName: element[0], onlinePrice: element[1], outletPrice: element[2], image: element[3]};
});

/*
 * Products Page
 */
var productsPage = tabris.create("Page", {
    //title: category.categoryName
});//.appendTo(cataloguePage);

// Tab
var tabFolder = tabris.create("TabFolder", {
    layoutData: {left: 0, top: 0, right: 0, bottom: 0},
    // foreground: "#A31919",
    paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(productsPage).on("change:selection", function(event) {
    productsPage.set("title", this.get("selection").get("title"));
    // populateTab(this.get("selection").get("id"));
});

var createTab = function(id, title, image) {
    var tab = tabris.create("Tab", {
        id: id,
        title: title, // converted to upper-case on Android
        // badge: "1", // a circle with a number inside. doesn't seem to be working
        image: {src: image, scale: 2} // image only used by iOS
    }).appendTo(tabFolder);
};

var itemsPerRow = Math.floor(screenWidth / minProductWidth);
var productWidth = screenWidth / itemsPerRow;
var productHeight = minProductHeight * productWidth / minProductWidth;

var populateTab = function(id) {
    var tab;
    // TODO: children selector doesn't seem to be working correctly. Try again next time
    tabFolder.children("Tab").filter(function(e) {
        if (id == e.get("id")) {
            tab = e;
        }
    });
    tab.children().dispose();

    var productsComposite = tabris.create("ScrollComposite", {
        layoutData: {left: 0, right: 0, top: [productsPage.children().last(), 0], bottom: 0},
        direction: "vertical"
    }).appendTo(tab);

    // list products
    products.forEach(function(product, i) {
        var imageView = tabris.create("ImageView", {
            layoutData: {top: 16, left: 30, right: 30},
            //            highlightOnTouch: true,
            image: product.image
        });
        var nameTextView = tabris.create("TextView", {
            layoutData: {left: 10, top: [imageView, 0], right: 10},
            //            highlightOnTouch: true,
            alignment: "center",
            font: "bold 15px",
            text: product.productName
        });
        var onlinePriceTextView = tabris.create("TextView", {
            layoutData: {left: 10, top: [nameTextView, 0], right: 10},
            //            highlightOnTouch: true,
            alignment: "center",
            markupEnabled: true,
            foreground: "#A31919",
            font: "16px",
            text: "Online <b>$" + Number(product.onlinePrice).toFixed(2) + "</b>"
        });
        var outletPriceTextView = tabris.create("TextView", {
            layoutData: {left: 10, top: [onlinePriceTextView, 0], right: 10},
            //            highlightOnTouch: true,
            alignment: "center",
            markupEnabled: true,
            font: "15px",
            text: "Outlet <b>$" + Number(product.outletPrice).toFixed(2) + "</b>"
        });

        // calculate whether to show in which row / column
        var x = i % itemsPerRow;
        var y = Math.floor(i / itemsPerRow);

        var composite = tabris.create("Composite", {
            layoutData: {left: x * productWidth, top: y * productHeight, width: productWidth, height: productHeight}
            //highlightOnTouch: true
        });
        composite.append(imageView, nameTextView, onlinePriceTextView, outletPriceTextView)
        composite.appendTo(productsComposite)
        //                    composite.on("touchend", function() {
        //                    });
    });
};

categories.forEach(function(category) {
    createTab(category.id, category.categoryName, category.image);
    populateTab(category.id);
});
//populateTab(category.id);

/*
 * Catalogue Page
 */
var minCategoryWidth = 180;
var minCategoryHeight = 175;
var minProductWidth = 180;
var minProductHeight = 200;
function showCategories() {
    var creditSummaryBar = tabris.create("Composite", {
        layoutData: {top: 0, left: 0, right: 0},
        background: "black"
    }).appendTo(cataloguePage);
    var creditSummaryText = tabris.create("TextView", {
        layoutData: {left: 5, top: 3, bottom: 3},
        markupEnabled: true,
        font: "18px",
        foreground: "white",
        text: "Balance: <b>119.00</b> &nbsp;&nbsp; Cart: <b>115.25</b> + <b>$68.50</b>"
    }).appendTo(creditSummaryBar);
    
    var itemsPerRow = Math.floor(screenWidth / minCategoryWidth);
    var categoryWidth = screenWidth / itemsPerRow;
    var categoryHeight = minCategoryHeight * categoryWidth / minCategoryWidth;
//    console.log("minCategoryWidth: " + minCategoryWidth);
//    console.log("screenWidth: " + screenWidth);
//    console.log("itemsPerRow: " + itemsPerRow);
//    console.log("categoryWidth: " + categoryWidth);
//    console.log("categoryHeight: " + categoryHeight);

    var categoriesComposite = tabris.create("ScrollComposite", {
        layoutData: {left: 0, right: 0, top: [cataloguePage.children().last(), 0], bottom: 0},
        direction: "vertical"
    }).appendTo(cataloguePage);
    
    categories.forEach(function(category, i) {
        var imageView = tabris.create("ImageView", {
            layoutData: {top: 16, left: 30, right: 30},
//            highlightOnTouch: true,
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
            layoutData: {left: x * categoryWidth, top: y * categoryHeight, width: categoryWidth, height: categoryHeight}//,
            // highlightOnTouch: true // this adds a slight delay
        });
        composite.append(imageView, nameTextView);
        composite.appendTo(categoriesComposite);
        composite.on("touchend", function() {
            //tabFolder.set("selection", category.id);
            productsPage.open();
        });
    });
}

showCategories();




//console.log(window.devicePixelRatio);

//tabris.create("CollectionView", {
//    layoutData: {left: 0, top: 0, right: 0, bottom: 0},
//    items: categories,
//    itemHeight: 256,
//    initializeCell: function(cell) {
//        var imageView = tabris.create("ImageView", {
//            layoutData: {top: 16, centerX: 0, width: 100, height: 200}
//        }).appendTo(cell);
//        var nameTextView = tabris.create("TextView", {
//            layoutData: {left: 30, top: [imageView, 16], right: 30},
//            alignment: "center"
//        }).appendTo(cell);
//        cell.on("itemchange", function(category) {
//            imageView.set("image", {src: category.image});
//            nameTextView.set("text", category.categoryName);
//        });
//    }
//}).on("selection", function(event) {
//    console.log("selected", event.item.firstName);
//}).appendTo(cataloguePage);






tabris.create("Page", {
    title: "My Account",
    topLevel: true,
    image: "img/account_small.png"
});

var page = tabris.create("Page", {
    title: "My Credit Details",
    topLevel: true,
    image: "img/bullet_small.png"
});
tabris.create("Page", {
    title: "My Measurements",
    topLevel: true,
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

cataloguePage.open();
