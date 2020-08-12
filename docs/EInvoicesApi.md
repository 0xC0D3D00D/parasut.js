# Parasut.EInvoicesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createEInvoice**](EInvoicesApi.md#createEInvoice) | **POST** /{company_id}/e_invoices | Create
[**showEInvoice**](EInvoicesApi.md#showEInvoice) | **GET** /{company_id}/e_invoices/{id} | Show
[**showEInvoicePdf**](EInvoicesApi.md#showEInvoicePdf) | **GET** /{company_id}/e_invoices/{id}/pdf | Show PDF


<a name="createEInvoice"></a>
# **createEInvoice**
> InlineResponse2015 createEInvoice(companyId, eInvoiceForm)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EInvoicesApi();

var companyId = 56; // Number | Firma ID

var eInvoiceForm = new Parasut.EInvoiceForm(); // EInvoiceForm | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createEInvoice(companyId, eInvoiceForm, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **eInvoiceForm** | [**EInvoiceForm**](EInvoiceForm.md)|  | 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showEInvoice"></a>
# **showEInvoice**
> InlineResponse2007 showEInvoice(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | EInvoice ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: invoice*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showEInvoice(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| EInvoice ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: invoice* | [optional] 

### Return type

[**InlineResponse2007**](InlineResponse2007.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showEInvoicePdf"></a>
# **showEInvoicePdf**
> InlineResponse2005 showEInvoicePdf(companyId, id)

Show PDF



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | EInvoice ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showEInvoicePdf(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| EInvoice ID | 

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

