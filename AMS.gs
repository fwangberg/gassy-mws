/**
* Top level object. It creates child objects that are endpoints/sections within MWS API
*
* @param {Object} keys - Values for SellerId, MWSAuthToken, AWSAccessKeyId, SecretKey
* @return {AmazonMS} instance of object.
*/
function AmazonMS( keys ) {
  if ( !( this instanceof AmazonMS ) )
    return new AmazonMS( keys );

  this._endpoints( keys );
  this._spareHandler = new Handler( keys );
}




/*
 * Create the endpoints.
 *
 * @param {Object} keys - Values for SellerId, MWSAuthToken, AWSAccessKeyId, SecretKey
 * @return {void}
 */
AmazonMS.prototype._endpoints = function( keys ){
  this.Feeds = new Feeds( keys )
  this.Products = new Products( keys );
  this.Reports = new Reports( keys );
  this.FulfillmentInventory = new FulfillmentInventory( keys );
}





/*
 * Generic request with no saftey catches. Use this if you know what you are doing.
 *
 * @param {String} endpoint - The API section that you are accessing.
 * @param {String} version  - The API version for the section you are accessing.
 * @param {String} action   - The request you are making to Amazon
 * @param {String} content  - The payload being sent to Amazon
 * @param {Object} required - Required parameters for the particular request
 * @param {Object} optional - Optional parameters for the particular request
 * @return {HTTPResponse} The response from Amazon
 */
AmazonMS.prototype.request = function( endpoint, version, action, content, required, optional ){
  var request = {
    Version: version,
    Action: action
  };

  if ( !(endpoint === undefined) )
    request.Endpoint = endpoint;

  if ( !(required === undefined) ) {
    for (var keys in required) {
      request[keys] = required[keys];
    }
  }

  if ( !(optional === undefined) )
    for (var keys in optional) {
      request[keys] = optional[keys];
    }

  return this._spareHandler._submit(request, content);
}
