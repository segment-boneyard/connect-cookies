
/**
 * Module dependencies.
 */

var Cookies = require('cookies');
var Keygrip = require('keygrip');

/**
 * Create cookies middleware.
 *
 * @param {Array|Keygrip=} keys
 * @return {Function}
 * @api public
 */

module.exports = function(keys){
  if (Array.isArray(keys)) keys = new Keygrip(keys);
  
  return function(req, res, next){
    req.cookies = res.cookies = Cookies(req, res, keys);
    next();
  };
};
