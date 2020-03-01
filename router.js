exports.Log = (req, res, next) => {
  console.log('Logging...')
  next();
}

exports.Authenticate = (req, res, next) => {
  console.log('Authenticating...')
  next();
}