'use strict';

const fs = require("fs");
const path = require('path');
const mustache = require('mustache');

function formatedateDate(date, includesDatetime) {
    const dateStr = [
        date.getFullYear(),
        ("0" + (date.getMonth() + 1)).slice(-2),
        ("0" + date.getDate()).slice(-2)
    ].join("-");
    const datetimeStr = [
        ("0" + date.getHours()).slice(-2),
        ("0" + date.getMinutes()).slice(-2),
        ("0" + date.getSeconds()).slice(-2),
    ].join(":");

    return includesDatetime ? dateStr + " " + datetimeStr : dateStr;
}

function sanitizeTitle(title) {
    return title.replace(/[ ?!@;'\\.]/g, '-').toLowerCase().replace(/^[ -]+|[ -]+$/g, "");
}

/** Parameters */
const postDir = path.join("src", "_posts");
const templateEngine = {
    name: "Mustache",
    dir: "templates",
    extension: ".mustache",
};

/** Parse arguments */

const usage = "Usage: node new-post.js <template-name> <title> [<title-for-filename>]";
const args = process.argv.slice(2, process.argv.length);
if (args.length != 2 && args.length != 3) {
    console.error("Invalid arguments")
    console.error(usage);
    process.exit(1);
}

const templatePath = path.join(templateEngine.dir, args[0] + templateEngine.extension);
const title = args[1];
const filetitle = args[2] ? sanitizeTitle(args[2]) : sanitizeTitle(title);
const postFilename = formatedateDate(new Date(), false) + "-" + filetitle + ".md";
const postPath = path.join(postDir, postFilename);

/** Main */

fs.readFile(templatePath, 'utf8', function (err, templateData) {
    if (err) throw err;

    // render the template with mustache.
    const renderedData = mustache.render(templateData, {
        title: title,
        date: formatedateDate(new Date(), true),
        overview: title + "についての記事です。",
    });

    // write a markdown file out.
    fs.writeFile(postPath, renderedData, {
        flag: 'wx'
    }, function (err) {
        if (err) {
            throw err;
        }
        console.log("Created a new post at: " + postPath)
    });
});