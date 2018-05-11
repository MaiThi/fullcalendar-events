var now = Date.now();
var fs = require('fs');
Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

var d = new Date,
    dformat = [ (d.getMonth()+1).padLeft(),
            d.getDate().padLeft(),
            d.getFullYear()].join(':')+ ' '+
        [ d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()].join(':');
var now = new Date();

console.log(now.toISOString());
fs.writeFile("tests/result/output.txt", dformat,function (err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});