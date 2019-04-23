exports.average = function (list) {
    var diff = [];
    for (let index = 1; index < list.length; index++) {
        const oldelement = list[index - 1];
        const newelement = list[index];
        diff.push(newelement["date"] - oldelement["date"]);
    }
    var sum = diff.reduce((x, y) => x + y, 0);
    var result = Math.floor(sum / list.length);
    return result;
};

exports.next = function (list, average) {
    var dates = list.map((x) => x["date"]);
    var max = Math.max(...dates);
    console.log(dates, max);
    return max + average;
}