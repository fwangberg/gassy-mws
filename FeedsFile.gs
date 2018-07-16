/**
 * create the Feeds object with a parameter for authkeys
 * 
 * @param {Object} keys - Values for SellerId, MWSAuthToken, AWSAccessKeyId, SecretKey
 * @return {Feeds} instance of object.
 */
function Feeds( keys ) {
  if ( !( this instanceof Feeds ) )
    return new Feeds( keys );
  
  this.Handler = new Handler( keys );
  this.Version = '2009-01-01';
}




/*
 * Submit a feed to Amazon to update product information
 *
 * @param {String} FeedContent    - the XML formatted feed that will make changes
 * @param {Object} RequiredParams - FeedType
 * @param {Object} OptionalParams - FeedOptions, MarketPlaceList, PurgeAndReplace.
 * @return {HTTPResponse} The response from Amazon
 */
Feeds.prototype.SubmitFeed = function( FeedContent, RequiredParams, OptionalParams ) {
  var contentHash = this.Handler._hashMD5( FeedContent );
  
  var request = {
    Action: 'SubmitFeed',
    Version: this.Version,
    ContentMD5Value: contentHash
  }
  if ( !(RequiredParams === undefined) ) {
    if ( !(RequiredParams.FeedType === undefined) ) {
      request.FeedType = RequiredParams.FeedType;
      
      if( !(OptionalParams.FeedOptions === undefined) )
        request.FeedOptions = OptionalParams.FeedOptions;
      
      if( !(OptionalParams.MarketplaceIdList === undefined) ) {
        for (var id = 1; id <= OptionalParams.MarketplaceIdList.length; id++){
          request['MarketplaceIdList.Id.' + (id)] = OptionalParams.MarketplaceIdList[ id - 1 ];
        }
      }
      
      if( OptionalParams.PurgeAndReplace ) {
        request.PurgeAndReplace = 'true';
      } else {
        request.PurgeAndReplace = 'false';
      }
    } else {
      return -1;
    }
  } else {
    return ('-1');
  }
  
  return this.Handler._submit( request, FeedContent );
  
}





/*
 * Get the result of a feed submission.
 *
 * @param {Object} RequiredParams - FeedSubmissionId
 * @return {HTTPResponse} The response from Amazon
 */
Feeds.prototype.GetFeedSubmissionResult = function(Required){
  var request = {
    Action: 'GetFeedSubmissionResult',
    Version: this.Version,
  }
  
  if ( !(Required === undefined) ){
    if ( !(Required.FeedSubmissionId === undefined) ){
      request.FeedSubmissionId = Required.FeedSubmissionId;
    } else {
      return ('-1');
    }
  } else {
    return ('-1');
  }
  
  return this.Handler._submit( request );
}
