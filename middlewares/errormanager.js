const ApiResponse= require('../utils/Apiresponse')


const errorManager = async (err, req, res,next)=>{
    const message = err.message ?  err.message:  "Something went wrong internal server error";
    const status = err.status ? err.status : 500;
    res.status(status).json(new ApiResponse(status, message));
}

module.exports = errorManager;