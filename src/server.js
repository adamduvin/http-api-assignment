const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

/*const handleGet = (request, response, parsedUrl) => {
  if(parsedUrl.pathname ==='/style.css'){
    htmlHandler.getCSS(request, response);
  }
  else if(parsedUrl.pathname === '/getData'){
    // json handler getData
  }
  else{
    htmlHandler.getIndex(request, response);
  }
};*/

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if(urlStruct[parsedUrl.pathname]){
    urlStruct[parsedUrl.pathname](request, response, params);
  }
  else{
    urlStruct.notFound(request, response, params);
  }

  //handleGet(request, response, parsedUrl);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);