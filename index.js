var electron = require("electron");
var proc = require("child_process");

// var electronHtmlTo = require("electron-html-to");

var inquirer = require("inquirer");
var fs = require('fs');

    convertFactory = require("electron-html-to");

var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});

conversion({ html: '<h1>Text HTML Conversion</h1>' }, function(err, result) {
    if (err) {
        return console.error(err)
    }
    console.log(result.numberOfPages);
    console.log(result.logs);
    result.stream.pipe(fx.createWriteStream('/path/to/anywhere.pdf'));
})

// TEST CASES
// console.log(electron);
// var child = proc.spawn(electron);
// console.log(child);

// console.log(electronHtmlTo);

// console.log(inquirer);