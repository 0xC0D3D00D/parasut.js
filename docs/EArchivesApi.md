# Parasut.EArchivesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createEArchive**](EArchivesApi.md#createEArchive) | **POST** /{company_id}/e_archives | Create
[**showEArchive**](EArchivesApi.md#showEArchive) | **GET** /{company_id}/e_archives/{id} | Show
[**showEArchivePdf**](EArchivesApi.md#showEArchivePdf) | **GET** /{company_id}/e_archives/{id}/pdf | Show PDF


<a name="createEArchive"></a>
# **createEArchive**
> InlineResponse2015 createEArchive(companyId, eArchiveForm)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EArchivesApi();

var companyId = 56; // Number | Firma ID

var eArchiveForm = new Parasut.EArchiveForm(); // EArchiveForm | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createEArchive(companyId, eArchiveForm, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **eArchiveForm** | [**EArchiveForm**](EArchiveForm.md)|  | 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showEArchive"></a>
# **showEArchive**
> InlineResponse2004 showEArchive(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EArchivesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | EArchive ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: sales_invoice*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showEArchive(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| EArchive ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: sales_invoice* | [optional] 

### Return type

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showEArchivePdf"></a>
# **showEArchivePdf**
> InlineResponse2005 showEArchivePdf(companyId, id)

Show PDF



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EArchivesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | EArchive ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showEArchivePdf(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| EArchive ID | 

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

