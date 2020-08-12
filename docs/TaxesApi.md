# Parasut.TaxesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**archiveTax**](TaxesApi.md#archiveTax) | **PATCH** /{company_id}/taxes/{id}/archive | Archive
[**createTax**](TaxesApi.md#createTax) | **POST** /{company_id}/taxes | Create
[**deleteTax**](TaxesApi.md#deleteTax) | **DELETE** /{company_id}/taxes/{id} | Delete
[**listTaxes**](TaxesApi.md#listTaxes) | **GET** /{company_id}/taxes | Index
[**payTax**](TaxesApi.md#payTax) | **POST** /{company_id}/taxes/{id}/payments | Pay
[**showTax**](TaxesApi.md#showTax) | **GET** /{company_id}/taxes/{id} | Show
[**unarchiveTax**](TaxesApi.md#unarchiveTax) | **PATCH** /{company_id}/taxes/{id}/unarchive | Unarchive
[**updateTax**](TaxesApi.md#updateTax) | **PUT** /{company_id}/taxes/{id} | Edit


<a name="archiveTax"></a>
# **archiveTax**
> InlineResponse20114 archiveTax(companyId, id, opts)

Archive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TaxesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Vergi ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.archiveTax(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Vergi ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createTax"></a>
# **createTax**
> InlineResponse20114 createTax(companyId, taxForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TaxesApi();

var companyId = 56; // Number | Firma ID

var taxForm = new Parasut.TaxForm(); // TaxForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createTax(companyId, taxForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **taxForm** | [**TaxForm**](TaxForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteTax"></a>
# **deleteTax**
> Object deleteTax(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TaxesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Vergi ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteTax(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Vergi ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listTaxes"></a>
# **listTaxes**
> InlineResponse20017 listTaxes(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TaxesApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterDueDate': "filterDueDate_example", // String | 
  'filterIssueDate': "filterIssueDate_example", // String | 
  'filterCurrency': "filterCurrency_example", // String | 
  'filterRemaining': 8.14, // Number | 
  'sort': "id", // String | Sortable parameters - *Available: id, issue_date, due_date, remaining, description, net_total*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags, payments*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listTaxes(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterDueDate** | **String**|  | [optional] 
 **filterIssueDate** | **String**|  | [optional] 
 **filterCurrency** | **String**|  | [optional] 
 **filterRemaining** | **Number**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, issue_date, due_date, remaining, description, net_total* | [optional] [default to id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags, payments* | [optional] 

### Return type

[**InlineResponse20017**](InlineResponse20017.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="payTax"></a>
# **payTax**
> InlineResponse2013 payTax(companyId, id, paymentForm, opts)

Pay



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TaxesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Vergi ID

var paymentForm = new Parasut.PaymentForm4(); // PaymentForm4 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: payable, transaction*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.payTax(companyId, id, paymentForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Vergi ID | 
 **paymentForm** | [**PaymentForm4**](PaymentForm4.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: payable, transaction* | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showTax"></a>
# **showTax**
> InlineResponse20114 showTax(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TaxesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Vergi ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showTax(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Vergi ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="unarchiveTax"></a>
# **unarchiveTax**
> InlineResponse20114 unarchiveTax(companyId, id, opts)

Unarchive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TaxesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Vergi ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.unarchiveTax(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Vergi ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateTax"></a>
# **updateTax**
> InlineResponse20114 updateTax(companyId, idtaxForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TaxesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Vergi ID

var taxForm = new Parasut.TaxForm1(); // TaxForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateTax(companyId, idtaxForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Vergi ID | 
 **taxForm** | [**TaxForm1**](TaxForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

