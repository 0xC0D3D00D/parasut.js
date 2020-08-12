# Parasut.TrackableJobsApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**showTrackableJob**](TrackableJobsApi.md#showTrackableJob) | **GET** /{company_id}/trackable_jobs/{id} | Show


<a name="showTrackableJob"></a>
# **showTrackableJob**
> InlineResponse2015 showTrackableJob(companyId, id)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TrackableJobsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Trackable Job ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showTrackableJob(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Trackable Job ID | 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

