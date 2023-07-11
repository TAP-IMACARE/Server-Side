const buildFailureResponse = (message, statusCode) => {
  return {
    message,
    statusCode,
    status: "failure",
  };
};

const buildSuccessResponse = (message, statusCode, data) => {
  if (data) {
    return {
      message,
      statusCode,
      status: "success",
      data,
    };
  }
  return {
    message,
    statusCode,
  };
};

module.exports = {
  buildFailureResponse,
  buildSuccessResponse,
};
