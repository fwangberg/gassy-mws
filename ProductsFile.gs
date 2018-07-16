/**
 * The constructor for the Products endpoint
 * 
 * @param {Object} keys - Values for SellerId, MWSAuthToken, AWSAccessKeyId, SecretKey
 * @return {Products} instance of object.
 */
function Products( keys ) {
  if ( !( this instanceof Products ) )
    return new Products( keys );
  
  this.Handler = new Handler( keys );
  this.name = 'Products';
  this.version = '2011-10-01';
}





/*
 * Get the status of the Products endpoint
 *
 * @return {HTTPResponse} the status of the products service
 */
Products.prototype.GetServiceStatus = function() {
  var request = {
    Action: 'GetServiceStatus',
    Endpoint : this.name,
    Version: this.version,
  };
  
  return this.Handler._submit( request );
}





/*
 * Get pricing information for a list of products
 *
 * @param {Object} RequiredParams - MarketplaceId, SellerSKUList
 * @param {Object} OptionalParams - ItemCondition
 * @return {HTTPResponse} the status of the products service
 */
Products.prototype.GetMyPriceForSKU = function( RequiredParams, OptionalParams) {
  var request = {
    Action   : 'GetMyPriceForSKU',
    Endpoint : this.name,
    Version  : this.version
  };
  
  if ( !(RequiredParams === undefined) ) {
    var isMarketplaceDefined = !(RequiredParams.MarketplaceId === undefined),
        isSellerSKUListDefined = !(RequiredParams.SellerSKUList === undefined) && Array.isArray(RequiredParams.SellerSKUList) && (RequiredParams.SellerSKUList.length > 0);
    
    if ( isMarketplaceDefined && isSellerSKUListDefined ){
      request.MarketplaceId = RequiredParams.MarketplaceId;
      
      for (var SellerSKU = 1; SellerSKU <= RequiredParams.SellerSKUList.length; SellerSKU++){
        request['SellerSKUList.SellerSKU.' + SellerSKU] = RequiredParams.SellerSKUList[SellerSKU - 1];
      } 
      
      if( !(OptionalParams === undefined) ) {
        if ( !(OptionalParams.ItemCondition === undefined) ){
          request.ItemCondtion = OptionalParams.ItemCondition;
        }
      }
    } else {
      return ('-1');
    }
  } else {
    return ('-1');
  }
  
  return this.Handler._submit( request );
}




/*
 * Get competitive pricing (buy box) information for a list of SKUs
 *
 * @param {Object} RequiredParams - MarketplaceId, SellerSKUList
 * @return {HTTPResponse} the status of the products service
 */
Products.prototype.GetCompetitivePricingForSKU = function( RequiredParams ) {
  var request = {
    Action   : 'GetCompetitivePricingForSKU',
    Endpoint : this.name,
    Version  : this.version
  };
  
  if ( !(RequiredParams === undefined) ) {
    var isMarketplaceDefined = !(RequiredParams.MarketplaceId === undefined),
        isSellerSKUListDefined = !(RequiredParams.SellerSKUList === undefined) && Array.isArray(RequiredParams.SellerSKUList) && (RequiredParams.SellerSKUList.length > 0);
    
    if ( isMarketplaceDefined && isSellerSKUListDefined ){
      request.MarketplaceId = RequiredParams.MarketplaceId;
      
      for (var SellerSKU = 1; SellerSKU <= RequiredParams.SellerSKUList.length; SellerSKU++){
        request['SellerSKUList.SellerSKU.' + SellerSKU] = RequiredParams.SellerSKUList[SellerSKU - 1];
      } 
    } else {
      return ('-1');
    }
  } else {
    return ('-1');
  }
  
  return this.Handler._submit( request );
}
