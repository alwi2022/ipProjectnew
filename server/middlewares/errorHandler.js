function errorHandler(err, req, res, next) {
    let status = 500
    
    let message = 'Internal Server Error'
  
    if(err.name === "EmailRequired") {
      status = 400
      message = "Email is required"
    } else if(err.name === "PasswordRequired") {
      status = 400
      message = "Password is required"
    } else if(err.name === "Unauthenticated") {
      status = 401
      message = "Email or password is wrong"
    } else if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
      status = 400
      message = err.errors[0].message
    } else if(err.name === "Forbidden") {
      status = 403
      message = "You're not authorized"
    } else if(err.name === 'NotFound') {
      status = 404
      message = "Product not found"
    } else if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") {
      status = 401
      message = "Invalid token"
    } else if(err.name === "GoogleFailed") {
      status = 401
      message = "Please login with your email and password"
    }
  
    res.status(status).json({
      message
    })
  }
  
  module.exports = errorHandler