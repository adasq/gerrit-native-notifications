var ignore = require('../config/ignore');

function isIgnored(event){
  return ignore.some(fn => fn(event));
}

module.exports = {
    isIgnored
};