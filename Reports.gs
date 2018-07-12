/**
 * Reports endpoint constructor
 *
 * @param {Object} keys - Values for SellerId, MWSAuthToken, AWSAccessKeyId, SecretKey
 * @return {Reports} instance of object.
 */
function Reports( keys ) {
  if ( !(this instanceof Reports) )
    return new Reports( keys );

  this.name = 'Reports';
  this.version = '2009-01-01';
  this.Handler = new Handler ( keys );

}




/*
 * Get a list of report requests
 *
 * @param {Object} OptionalParams - MaxCount, RequestedFromDate, RequestedToDate, ReportRequestIdList, ReportTypeList, ReportProcessingStatusList
 * @return {HTTPResponse} the response from Amazon.
 */
Reports.prototype.GetReportRequestList = function( OptionalParams ) {
  var request = {
    Action  : 'GetReportRequestList',
    Version : this.version
  };

  if ( !(OptionalParams === undefined) ) {
    if ( !(OptionalParams.MaxCount === undefined) )
      request.MaxCount = OptionalParams.MaxCount;

    if ( !(OptionalParams.RequestedFromDate === undefined) )
      request.RequestedFromDate = this.Handler._sanitize(OptionalParams.RequestedFromDate);

    if ( !(OptionalParams.RequestedToDate === undefined) )
      request.RequestedToDate = this.Handler._sanitize(OptionalParams.RequestedToDate);

    if ( !(OptionalParams.ReportRequestIdList === undefined) && Array.isArray(OptionalParams.ReportRequestIdList) ) {
      for (var i = 0; i < OptionalParams.ReportRequestIdList.length; i++) {
        request['ReportRequestIdList.Id.' + (i+1)] = OptionalParams.ReportRequestIdList(i);
      }
    }

    if ( !(OptionalParams.ReportTypeList === undefined) && Array.isArray(OptionalParams.ReportTypeList) ) {
      for (var i = 0; i < OptionalParams.ReportTypeList.length; i++) {
        request['ReportTypeList.Id.' + (i+1)] = OptionalParams.ReportTypeList(i);
      }
    }

    if ( !(OptionalParams.ReportProcessingStatusList === undefined) && Array.isArray(OptionalParams.ReportProcessingStatusList) ) {
      for (var i = 0; i < OptionalParams.ReportProcessingStatusList.length; i++) {
        request['ReportProcessingStatusList.Id.' + (i+1)] = OptionalParams.ReportProcessingStatusList(i);
      }
    }
  }

  return this.Handler._submit( request );
}





/*
 * Request a report
 *
 * @param {Object} RequiredParams - ReportType
 * @param {Object} OptionalParams - MarketplaceIdList, StartDate, EndDate, ReportOptions
 * @return {HTTPResponse} the response from Amazon.
 */
Reports.prototype.RequestReport = function( RequiredParams, OptionalParams ){
  var request = {
    Action: 'RequestReport',
    Version: this.version
  }

  var isRequiredParamsPresent = !(RequiredParams === undefined);
  var isReportTypePresent = isRequiredParamsPresent && !(RequiredParams.ReportType === undefined);
  if ( isReportTypePresent )
    request.ReportType = RequiredParams.ReportType;
  else
    return ('-1');

  if ( !(OptionalParams === undefined) ) {
    if ( !(OptionalParams.StartDate === undefined) )
      request.RequestedFromDate = this.Handler._sanitize(OptionalParams.RequestedFromDate);

    if ( !(OptionalParams.EndDate === undefined) )
      request.RequestedToDate = this.Handler._sanitize(OptionalParams.RequestedToDate);

    if ( !(OptionalParams.MarketplaceIdList === undefined) && Array.isArray(OptionalParams.MarketplaceIdList) ) {
      for (var i = 0; i < OptionalParams.MarketplaceIdList.length; i++) {
        request['MarketplaceIdList.Id.' + (i+1)] = OptionalParams.MarketplaceIdList(i);
      }
    }

    if ( !(OptionalParams.ReportOptions === undefined) )
      request.ReportOptions = OptionalParams.ReportOptions;
  }

  return this.Handler._submit( request );

}





/*
 * Get a specific report
 *
 * @param {Object} RequiredParams - ReportId
 * @return {HTTPResponse} the response from Amazon.
 */
Reports.prototype.GetReport = function ( RequiredParams ){
  var request = {
    Action: 'GetReport',
    Version: this.Version
  }

  var isRequiredParamsPresent = !(RequiredParams === undefined);
  var isReportIdPresent = isRequiredParamsPresent && !( RequiredParams.ReportId === undefined )

  if ( isReportIdPresent )
    request.ReportId = RequiredParams.ReportId;
  else
    return ('-1');

  return this.Handler._submit( request );
}
