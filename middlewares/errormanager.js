const ApiResponse = require("../utils/Apiresponse");

const errorManager = async (err, req, res, next) => {
  console.log(err)
  const message = err.message
    ? err.message
    : "Something went wrong internal server error";
  const status = err.statusCode ? err.statusCode : 500;
  res.status(status).json({
    success:false,
    message:message,
    status:status
  });
};

module.exports = { errorManager };
