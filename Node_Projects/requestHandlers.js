var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");
    //    var exec = require("child_process").exec;
    //    exec("ls -lah", function (error, stdout, stderr) {
    //        response.writeHead(200, {
    //            "Content-Type": "text/plain"
    //        });
    //        response.write(stdout);
    //        response.end();
    //    });

    //    var body = '<html>' +
    //        '<head>' +
    //        '<meta http-equiv="Content-Type" content="text/html; ' + 'charset=UTF-8" />' +
    //        '</head>' +
    //        '<body>' +
    //        '<form action="/upload" method="post">' +
    //        '<textarea name="text" rows="20" cols="60"></textarea>' + '<input type="submit" value="Submit text" />' + '</form>' + '</body>' +
    //        '</html>';
    //    response.writeHead(200, {
    //        "Content-Type": "text/html"
    //    });
    //    response.write(body);
    //    response.end();

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' + 'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}


//function upload(response, postData) {
//    console.log("Request handler 'upload' was called.");
//    response.writeHead(200, {
//        "Content-Type": "text/plain"
//    });
//    response.write("You've sent: " + querystring.parse(postData).text);
//    response.end();
//
//}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        /* Possible error on Windows systems:
           tried to rename to an already existing file */
        fs.rename(files.upload.path, "/tmp/test.png", function (err) {
            if (err) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });

            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "image/png"
            });
            response.write(file, "binary");
            response.end();
        }
    });
}

//Not related Data
function login(response) {
    console.log("Request handler 'login' was called.");
    response.writeHead(200, {
        "Content-Type": "text/json"
    });
    response.write(JSON.stringify({
        "sessid": "umivN2xi2G4lWvvxdkK-m4j7awanpkd29ef0StVr2KA",
        "session_name": "SESSb5fd9eb26d1b7f0a5624906613b1f622",
        "token": "agKN9AXCAdb6IKSnvoDHZKWn8up33Fqu3ladIS1gMM8",
        "uid": "53"
    }));
    response.end();
}

function userInfo(response) {
    console.log("Request handler 'login' was called.");
    response.writeHead(200, {
        "Content-Type": "text/json"
    });
    response.write(JSON.stringify({
        "firstname": "Uday Kiran",
        "lastname": "Ailapaka",
        "dob": "23-03-1989",
        "address": "Hyderabad",
        "graph": "100"
    }));
    response.end();
}

function getGraph(response) {
    console.log("Request handler 'login' was called.");
    response.writeHead(200, {
        "Content-Type": "text/json"
    });
    response.write(JSON.stringify({
        "daystats": [
            {
                "date": "2016-01-19",
                "percent": 25
            },
            {
                "date": "2016-01-18",
                "percent": 64
            },
            {
                "date": "2016-01-17",
                "percent": 86
            },
            {
                "date": "2016-01-16",
                "percent": 32
            },
            {
                "date": "2016-01-15",
                "percent": 57
            },
            {
                "date": "2016-01-14",
                "percent": 98
            },
            
],
        "avgcompliance": 59
    }));
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.login = login;
exports.userInfo = userInfo;
exports.getGraph = getGraph;