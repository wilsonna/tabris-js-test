// Hidden page to hold the tabFolder after the products page is disposed so that it can be quickly reinstated the next time the products page is created again.
var hiddenPage = tabris.create("Page");
exports.page = hiddenPage;