var cookie, signature, debug;

cookie = require('cookie');

signature = require('cookie-signature');

debug = require('debug')('connect:redis');

module.exports = function(options) {
  var cookieName, cookieOptions, secret, sidName;
  sidName = options.sidName;
  secret = options.secret;
  cookieName = options.cookieName;
  cookieOptions = options.cookie;
  return function(req, res, next) {
    var cookies, original, signed;
    original = req.headers.cookie;
    debug('original-header: %s', original);
    cookies = cookie.parse(original);
    signed = 's:' + signature.sign(cookies[sidName], secret);
    req.headers.cookie = original + "; " + cookie.serialize(cookieName, signed, cookieOptions);
    debug('modified-header: %s', req.headers.cookie);
    return next();
  };
};
