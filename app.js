var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

var dest_url = 'http://www.umei.cc';
request(dest_url, function(err, resp, body) {
    var $ = cheerio.load(body.toString(),{
        normalizeWhitespace: true,
        xmlMode: true
    });

    $('.img').each(function(i,el){
        var img_url = $(this).attr('src');
        var fileName = dealFileName(img_url);
        console.log(fileName);
        console.log(path.join(__dirname,'images',fileName));
        request(img_url).pipe(fs.createWriteStream(path.join(__dirname,'images',fileName)));
    });
    console.log(resp.statusCode);
});

function dealFileName(url){
    return url.substring(url.lastIndexOf('/')+1);
}