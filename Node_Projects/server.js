var http = require("http");
var url = require("url");

function start(route, handle, db) {
    //    function onRequest(request, response) {
    //        var postData = "";
    //        var pathname = url.parse(request.url).pathname;
    //        console.log("Request for: " +pathname+" received");
    //        request.setEncoding("utf8");
    //        request.addListener("data", function(postDataChunk){
    //            postData += postDataChunk;
    //            console.log("Received POST data chunk '"+ postDataChunk + "'.");
    //        });
    //        request.addListener("end", function(){
    //            route(handle, pathname, response, postData);
    //        });
    ////        response.writeHead(200, {
    ////            "Content-Type": "text/plain"
    ////        });
    ////        route(handle, pathname, response);
    //    }
    
    var open = require('open');
    open('http://localhost:8888/start', function (err) {
        if (err) throw err;
        console.log('The user closed the browser');
    });

    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request, db);
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;