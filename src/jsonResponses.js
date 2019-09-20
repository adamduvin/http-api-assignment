const respondJSON = (request, response, status, object, fileType) => {
  response.writeHead(status, { 'Content-Type': fileType });
  if (fileType === 'application/json') {
    response.write(JSON.stringify(object));
  } else if (fileType === 'text/xml') {
    response.write(object.message);
  }
  response.end();
};

const success = (request, response, fileType) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  if (fileType === 'application/json') {
    return respondJSON(request, response, 200, responseJSON, fileType);
  }
  if (fileType === 'text/xml') {
    responseJSON.message = `<message>${responseJSON.message}</message>`;
    return respondJSON(request, response, 200, responseJSON, fileType);
  }

  return respondJSON(request, response, 200, responseJSON, 'application/json');
};

const badRequest = (request, response, params, fileType) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    if (fileType === 'application/json') {
      return respondJSON(request, response, 400, responseJSON, fileType);
    }
    if (fileType === 'text/xml') {
      responseJSON.message = `<message>${responseJSON.message}</message><id>${responseJSON.id}</id>`;
      return respondJSON(request, response, 400, responseJSON, fileType);
    }

    return respondJSON(request, response, 400, responseJSON, 'application/json');
  }

  return respondJSON(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response, params, fileType) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    if (fileType === 'application/json') {
      return respondJSON(request, response, 401, responseJSON, fileType);
    }
    if (fileType === 'text/xml') {
      responseJSON.message = `<message>${responseJSON.message}</message><id>${responseJSON.id}</id>`;
      return respondJSON(request, response, 401, responseJSON, fileType);
    }

    return respondJSON(request, response, 401, responseJSON, 'application/json');
  }

  return respondJSON(request, response, 200, responseJSON, 'application/json');
};

const forbidden = (request, response, fileType) => {
  const responseJSON = {
    id: 'forbidden',
    message: 'You do not have access to this content',
  };

  if (fileType === 'application/json') {
    return respondJSON(request, response, 403, responseJSON, fileType);
  }
  if (fileType === 'text/xml') {
    responseJSON.message = `<message>${responseJSON.message}</message><id>${responseJSON.id}</id>`;
    return respondJSON(request, response, 403, responseJSON, fileType);
  }

  return respondJSON(request, response, 403, responseJSON, 'application/json');
};

const internal = (request, response, fileType) => {
  const responseJSON = {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong',
  };

  if (fileType === 'application/json') {
    return respondJSON(request, response, 500, responseJSON, fileType);
  }
  if (fileType === 'text/xml') {
    responseJSON.message = `<message>${responseJSON.message}</message><id>${responseJSON.id}</id>`;
    return respondJSON(request, response, 500, responseJSON, fileType);
  }

  return respondJSON(request, response, 500, responseJSON, 'application/json');
};

const notImplemented = (request, response, fileType) => {
  const responseJSON = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  if (fileType === 'application/json') {
    return respondJSON(request, response, 501, responseJSON, fileType);
  }
  if (fileType === 'text/xml') {
    responseJSON.message = `<message>${responseJSON.message}</message><id>${responseJSON.id}</id>`;
    return respondJSON(request, response, 501, responseJSON, fileType);
  }

  return respondJSON(request, response, 501, responseJSON, 'application/json');
};

const notFound = (request, response, fileType) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page you are looking for was not found',
  };

  if (fileType === 'application/json') {
    return respondJSON(request, response, 404, responseJSON, fileType);
  }
  if (fileType === 'text/xml') {
    responseJSON.message = `<message>${responseJSON.message}</message><id>${responseJSON.id}</id>`;
    return respondJSON(request, response, 404, responseJSON, fileType);
  }

  return respondJSON(request, response, 404, responseJSON, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
