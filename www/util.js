var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

var shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

exports.formatDate = function(dateString) {
    var date = new Date(dateString);
    return date.getDate() + "-" + shortMonthNames[date.getMonth()] + "-" + date.getFullYear();
}