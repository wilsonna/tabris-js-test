var screenWidth = tabris.device.get("screenWidth");
var screenHeight = tabris.device.get("screenHeight");

console.log(tabris.ui._shell.get("mode"));
console.log(tabris.device.get("model") + ", " + tabris.device.get("platform") + " ver. " + tabris.device.get("version") + ", " + tabris.device.get("language"));
console.log(tabris.device.get("orientation") + ", " + screenWidth + " x " + screenHeight);

exports.screenWidth = screenWidth;
exports.screenHeight = screenHeight;