exports.proposals = ["baseball", "batman", "battleship", "bangkok", "bangladesh", "banana"];

exports.categories = [
    ["clothing", "Clothing", "img/placeholder.png"],
    ["headerwear", "Headwear", "img/placeholder.png"],
    ["footwear", "Footwear", "img/placeholder.png"],
    ["ranks", "Ranks", "img/placeholder.png"],
    ["badges", "Badges", "img/placeholder.png"],
    ["expendables", "Expendables", "img/placeholder.png"]
].map(function(element) {
    return {id: element[0], categoryName: element[1], image: element[2]};
});

exports.products = [
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

exports.serviceman = {
    name: "Anderson Kang Lee Hon",
    rank: "CPL",
    nricNo: "S8146733E",
    service: "Army",
    tos: "Regular",
    status: "Active",
    creditBalance: 234.25,
    creditLimit: 260,
    lastTopupDate: '2014-08-01T00:00:00.000Z',
    nextTopupDate: '2016-08-01T00:00:00.000Z',
    creditExpiring: 0
};

