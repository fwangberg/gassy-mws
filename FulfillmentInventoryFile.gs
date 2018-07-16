/**
 * The constructor for the FulfillmentInventory endpoint.
 * 
 * @param {Object} keys - Values for SellerId, MWSAuthToken, AWSAccessKeyId, SecretKey
 * @return {FulfillmentInventory} instance of object.
 */
function FulfillmentInventory( keys ) {
  if ( !(this instanceof FulfillmentInventory) )
    return new FulfillmentInventory( keys );
  
  this.name = 'FulfillmentInventory';
  this.version = '2010-10-01';
  this.Handler = new Handler ( keys );
}





/*
 * Get a list of supplys. Requires either SellerSkus or QueryStartDateTime, BUT NOT BOTH
 *
 * @param {Object} OptionalParams - SellerSkus, QueryStartDateTime, ResponseGroup, MarketPlaceId
 * @return {HTTPResponse} the response from Amazon.
 */
FulfillmentInventory.prototype.ListInventorySupply = function ( Params ) {
  var request = {
    Action: 'ListInventorySupply',
    Version: this.version,
    Endpoint: this.name
  };
  
  var isParamsDefined = !(Params === undefined),
      isSellerSkusDefined,
      isQueryStartDateTimeDefined,
      isResponseGroupDefined,
      isMarketplaceIdDefined,
      SkuDateMutualExclusion;
  
  if ( isParamsDefined ){
    isSellerSkusDefined = ( !(Params.SellerSkus === undefined) && Array.isArray(Params.SellerSkus) );
    isQueryStartDateTimeDefined = ( !( Params.QueryStartDateTime === undefined ));
    isResponseGroupDefined = ( !(Params.ResponseGroup === undefined) );
    isMarketplaceIdDefined = ( !(Params.MarketplaceId === undefined) );
    SkuDateMutualExclusion = ((isSellerSkusDefined && !isQueryStartDateTimeDefined) || (!isSellerSkusDefined && isQueryStartDateTimeDefined));
    
    if ( SkuDateMutualExclusion ) {
      if ( isSellerSkusDefined ){
        for( var i = 0; i < Params.SellerSkus.length; i++ ){
          request['SellerSkus.member.' + (i+1)] = Params.SellerSkus[i];
        }
      }
      
      if ( isQueryStartDateTimeDefined )
        request.QueryStartDateTime = this.Handler._sanitize(Params.QueryStartDateTime);
      
      if ( isResponseGroupDefined )
        request.ResponseGroup = Params.ResponseGroup;
      
      if ( isMarketplaceIdDefined )
        request.MarketplaceId = Params.MarketplaceId;
      
    } else {
      return ('-1');
    }
  }
  
  return this.Handler._submit( request );
}





/*
 * Get a list of supplys from a previous list.
 *
 * @param {Object} OptionalParams - NextToken
 * @return {HTTPResponse} the response from Amazon.
 */
FulfillmentInventory.prototype.ListInventorySupplyByNextToken = function ( RequiredParams ) {
  var request = {
    Action: 'ListInventorySupplyByNextToken',
    Version: this.version,
    Endpoint: this.name
  }
  
  if ( !(RequiredParams === undefined) && !(RequiredParams.NextToken === undefined) ) {
    request.NextToken = this.Handler._sanitize(RequiredParams.NextToken);
  } else {
    return ('-1');
  }
  
  return this.Handler._submit( request );
}
