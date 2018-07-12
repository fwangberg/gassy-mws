/**
 * An object inherited by each endpoint class that does the transactions between
 * user and Amazon MWS API.
 *
 * @param {Object} keys - Values for SellerId, MWSAuthToken, AWSAccessKeyId, SecretKey
 * @return {Handler} instance of object.
 */
function Handler( keys ) {
  if ( !( this instanceof Handler ) )
    return new Handler( keys );

  this._auth( keys );
  this.SignatureVersion = '2';
  this.SignatureMethod = 'HmacSHA256';
  this.UserAgent = 'gassy-mws/0.1 (Language=GoogleScript; Platform=Google/Apps Script)';
}






Handler.prototype._auth = function ( keys ) {
  this.SellerId = keys.SellerId;
  this.MWSAuthToken = keys.MWSAuthToken;
  this.AWSAccessKeyId = keys.AWSAccessKeyId;
  this.SecretKey = keys.SecretKey;
}





Handler.prototype._submit = function ( request, content ) {
  var endpoint_undefined = (request.Endpoint === undefined);
  var sign = this._sign(request);
  var url = 'https://mws.amazonservices.com/';
  url += (endpoint_undefined) ? '' : request.Endpoint + '/' + request.Version;
  url += '?' + sign.qString;
  url += '&Signature=' + sign.Signature;

  var options = {
    'method' : 'POST',
    'muteHttpExceptions' : true
  }

  if ( !( content === undefined) )
    options.payload = content;

  // This return needs to change to match the Beetstech format for returns.
  return UrlFetchApp.fetch( url, options );
}





Handler.prototype._sign = function ( request ){
  var canonicalizedString = this._canonicalize(request);
  var signature = Utilities.computeHmacSha256Signature(canonicalizedString.cString, this.SecretKey);
  var encodedSignature = this._sanitize(Utilities.base64Encode(signature));
  return {
    Signature: encodedSignature,
    qString: canonicalizedString.qString
  };
}




Handler.prototype._canonicalize = function ( request ){
  var endpoint_undefined = (request.Endpoint === undefined);
  request.Timestamp = this._sanitize(new Date().toISOString());
  request.SellerId = this.SellerId;
  request.MWSAuthToken = this.MWSAuthToken;
  request.AWSAccessKeyId = this.AWSAccessKeyId;
  request.SignatureMethod = this.SignatureMethod;
  request.SignatureVersion = this.SignatureVersion;

  var sortedKeys = Object.keys(request).sort();
  var idxEndpoint = sortedKeys.indexOf('Endpoint');
  sortedKeys.splice(idxEndpoint,1);
  var sortedValues = [];
  for (var i = 0 ; i < sortedKeys.length; i++)
    sortedValues.push(request[sortedKeys[i]]);

  var queryString = this._queryString(sortedKeys, sortedValues);

  var canonicalizedString = 'POST\n';
  canonicalizedString += 'mws.amazonservices.com\n';
  canonicalizedString += '/' ;
  canonicalizedString += (endpoint_undefined) ? '' : request.Endpoint + '/' + request.Version;
  canonicalizedString += '\n';
  canonicalizedString += queryString;

  return {
    cString: canonicalizedString,
    qString: queryString
  };
}





Handler.prototype._queryString = function( names, values ) {
  var queryString = '';

  // Gather the first entry, for this will not have the "&" character
  queryString += names[ 0 ] + '=' + values[ 0 ];

  // Gather the remaining entries.
  for ( var i = 1; i < names.length; i++ ) {
    queryString += '&' + names[ i ] + '=' + values[ i ];
  }
  return queryString;
}





Handler.prototype._sanitize = function ( str ){
  return (str.replace(/=/g,'%3D').replace(/\+/g,'%2B').replace(/\//g, '%2F').replace(/:/g, '%3A'));
}





Handler.prototype._hashMD5 = function( str ){
  var hash = Utilities.computeDigest( Utilities.DigestAlgorithm.MD5, str);
  var encode =  Utilities.base64Encode( hash );
  var cleaned = this._sanitize( encode );
  return cleaned;
}
