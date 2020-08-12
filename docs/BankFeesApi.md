# Parasut.BankFeesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**archiveBankFee**](BankFeesApi.md#archiveBankFee) | **PATCH** /{company_id}/bank_fees/{id}/archive | Archive
[**createBankFee**](BankFeesApi.md#createBankFee) | **POST** /{company_id}/bank_fees | Create
[**deleteBankFee**](BankFeesApi.md#deleteBankFee) | **DELETE** /{company_id}/bank_fees/{id} | Delete
[**payBankFee**](BankFeesApi.md#payBankFee) | **POST** /{company_id}/bank_fees/{id}/payments | Pay
[**showBankFee**](BankFeesApi.md#showBankFee) | **GET** /{company_id}/bank_fees/{id} | Show
[**unarchiveBankFee**](BankFeesApi.md#unarchiveBankFee) | **PATCH** /{company_id}/bank_fees/{id}/unarchive | Unarchive
[**updateBankFee**](BankFeesApi.md#updateBankFee) | **PUT** /{company_id}/bank_fees/{id} | Edit


<a name="archiveBankFee"></a>
# **archiveBankFee**
> InlineResponse2012 archiveBankFee(companyId, id, opts)

Archive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.BankFeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Banka Gideri ID

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
apiInstance.archiveBankFee(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Banka Gideri ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createBankFee"></a>
# **createBankFee**
> InlineResponse2012 createBankFee(companyId, bankFeeForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.BankFeesApi();

var companyId = 56; // Number | Firma ID

var bankFeeForm = new Parasut.BankFeeForm(); // BankFeeForm | 

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
apiInstance.createBankFee(companyId, bankFeeForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **bankFeeForm** | [**BankFeeForm**](BankFeeForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteBankFee"></a>
# **deleteBankFee**
> Object deleteBankFee(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.BankFeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Banka Gideri ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteBankFee(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Banka Gideri ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="payBankFee"></a>
# **payBankFee**
> InlineResponse2013 payBankFee(companyId, id, paymentForm, opts)

Pay



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.BankFeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Banka Gideri ID

var paymentForm = new Parasut.PaymentForm(); // PaymentForm | 

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
apiInstance.payBankFee(companyId, id, paymentForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Banka Gideri ID | 
 **paymentForm** | [**PaymentForm**](PaymentForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: payable, transaction* | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showBankFee"></a>
# **showBankFee**
> InlineResponse2012 showBankFee(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.BankFeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Banka Gideri ID

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
apiInstance.showBankFee(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Banka Gideri ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="unarchiveBankFee"></a>
# **unarchiveBankFee**
> InlineResponse2012 unarchiveBankFee(companyId, id, opts)

Unarchive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.BankFeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Banka Gideri ID

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
apiInstance.unarchiveBankFee(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Banka Gideri ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateBankFee"></a>
# **updateBankFee**
> InlineResponse2012 updateBankFee(companyId, idbankFeeForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.BankFeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Banka Gideri ID

var bankFeeForm = new Parasut.BankFeeForm1(); // BankFeeForm1 | 

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
apiInstance.updateBankFee(companyId, idbankFeeForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Banka Gideri ID | 
 **bankFeeForm** | [**BankFeeForm1**](BankFeeForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags* | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

