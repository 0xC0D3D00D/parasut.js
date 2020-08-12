# Parasut.EInvoiceInboxesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listEInvoiceInboxes**](EInvoiceInboxesApi.md#listEInvoiceInboxes) | **GET** /{company_id}/e_invoice_inboxes | Index


<a name="listEInvoiceInboxes"></a>
# **listEInvoiceInboxes**
> InlineResponse2006 listEInvoiceInboxes(companyId, opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EInvoiceInboxesApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterVkn': 56, // Number | 
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15 // Number | Page Size
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listEInvoiceInboxes(companyId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterVkn** | **Number**|  | [optional] 
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]

### Return type

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

