const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.success,
    '/addUsers': jsonHandler.success,
    notFound: jsonHandler.notFound
};

const onRequest = (request, response) => {
    const parsedUrl = new URL(request.url);

    const acceptedTypes = request.headers.accept.split(',');

    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
    }
    else {
        urlStruct.index(request, response, acceptedTypes);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});
