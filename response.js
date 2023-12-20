const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    hasil: {
      status: statusCode,
      datas: data,
      message: message,
    },
    pagination: {
      prev: "",
      next: "",
      max: "",
    },
  });
};
module.exports = response;
