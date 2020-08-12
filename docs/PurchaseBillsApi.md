# Parasut.PurchaseBillsApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**archivePurchaseBill**](PurchaseBillsApi.md#archivePurchaseBill) | **PATCH** /{company_id}/purchase_bills/{id}/archive | Archive
[**cancelPurchaseBill**](PurchaseBillsApi.md#cancelPurchaseBill) | **DELETE** /{company_id}/purchase_bills/{id}/cancel | Cancel
[**createPurchaseBillBasic**](PurchaseBillsApi.md#createPurchaseBillBasic) | **POST** /{company_id}/purchase_bills#basic | Create Basic PurchaseBill
[**createPurchaseBillDetailed**](PurchaseBillsApi.md#createPurchaseBillDetailed) | **POST** /{company_id}/purchase_bills#detailed | Create Detailed PurchaseBill
[**deletePurchaseBill**](PurchaseBillsApi.md#deletePurchaseBill) | **DELETE** /{company_id}/purchase_bills/{id} | Delete
[**listPurchaseBills**](PurchaseBillsApi.md#listPurchaseBills) | **GET** /{company_id}/purchase_bills | Index
[**payPurchaseBill**](PurchaseBillsApi.md#payPurchaseBill) | **POST** /{company_id}/purchase_bills/{id}/payments | Pay
[**recoverPurchaseBill**](PurchaseBillsApi.md#recoverPurchaseBill) | **PATCH** /{company_id}/purchase_bills/{id}/recover | Recover
[**showPurchaseBill**](PurchaseBillsApi.md#showPurchaseBill) | **GET** /{company_id}/purchase_bills/{id} | Show
[**unarchivePurchaseBill**](PurchaseBillsApi.md#unarchivePurchaseBill) | **PATCH** /{company_id}/purchase_bills/{id}/unarchive | Unarchive
[**updatePurchaseBillBasic**](PurchaseBillsApi.md#updatePurchaseBillBasic) | **PUT** /{company_id}/purchase_bills/{id}#basic | Edit Basic PurchaseBill
[**updatePurchaseBillDetailed**](PurchaseBillsApi.md#updatePurchaseBillDetailed) | **PUT** /{company_id}/purchase_bills/{id}#detailed | Edit Detailed PurchaseBill


<a name="archivePurchaseBill"></a>
# **archivePurchaseBill**
> InlineResponse2019 archivePurchaseBill(companyId, id, opts)

Archive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.archivePurchaseBill(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="cancelPurchaseBill"></a>
# **cancelPurchaseBill**
> InlineResponse2019 cancelPurchaseBill(companyId, id, opts)

Cancel



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.cancelPurchaseBill(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createPurchaseBillBasic"></a>
# **createPurchaseBillBasic**
> InlineResponse2019 createPurchaseBillBasic(companyId, purchaseBillForm, opts)

Create Basic PurchaseBill



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var purchaseBillForm = new Parasut.PurchaseBillForm(); // PurchaseBillForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createPurchaseBillBasic(companyId, purchaseBillForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **purchaseBillForm** | [**PurchaseBillForm**](PurchaseBillForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createPurchaseBillDetailed"></a>
# **createPurchaseBillDetailed**
> InlineResponse2019 createPurchaseBillDetailed(companyId, purchaseBillForm, opts)

Create Detailed PurchaseBill



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var purchaseBillForm = new Parasut.PurchaseBillForm1(); // PurchaseBillForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createPurchaseBillDetailed(companyId, purchaseBillForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **purchaseBillForm** | [**PurchaseBillForm1**](PurchaseBillForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deletePurchaseBill"></a>
# **deletePurchaseBill**
> Object deletePurchaseBill(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deletePurchaseBill(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listPurchaseBills"></a>
# **listPurchaseBills**
> InlineResponse20011 listPurchaseBills(companyId, opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterIssueDate': "filterIssueDate_example", // String | 
  'filterDueDate': "filterDueDate_example", // String | 
  'filterSpenderId': 56, // Number | 
  'sort': "id", // String | Sortable parameters - *Available: id, issue_date, due_date, remaining, remaining_in_trl*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listPurchaseBills(companyId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterIssueDate** | **String**|  | [optional] 
 **filterDueDate** | **String**|  | [optional] 
 **filterSpenderId** | **Number**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, issue_date, due_date, remaining, remaining_in_trl* | [optional] [default to id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse20011**](InlineResponse20011.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="payPurchaseBill"></a>
# **payPurchaseBill**
> InlineResponse2013 payPurchaseBill(companyId, id, paymentForm, opts)

Pay



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var paymentForm = new Parasut.PaymentForm1(); // PaymentForm1 | 

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
apiInstance.payPurchaseBill(companyId, id, paymentForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **paymentForm** | [**PaymentForm1**](PaymentForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: payable, transaction* | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="recoverPurchaseBill"></a>
# **recoverPurchaseBill**
> InlineResponse2019 recoverPurchaseBill(companyId, id, opts)

Recover



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.recoverPurchaseBill(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showPurchaseBill"></a>
# **showPurchaseBill**
> InlineResponse2019 showPurchaseBill(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showPurchaseBill(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="unarchivePurchaseBill"></a>
# **unarchivePurchaseBill**
> InlineResponse2019 unarchivePurchaseBill(companyId, id, opts)

Unarchive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.unarchivePurchaseBill(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updatePurchaseBillBasic"></a>
# **updatePurchaseBillBasic**
> InlineResponse2019 updatePurchaseBillBasic(companyId, id, purchaseBillForm, opts)

Edit Basic PurchaseBill



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var purchaseBillForm = new Parasut.PurchaseBillForm2(); // PurchaseBillForm2 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updatePurchaseBillBasic(companyId, id, purchaseBillForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **purchaseBillForm** | [**PurchaseBillForm2**](PurchaseBillForm2.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updatePurchaseBillDetailed"></a>
# **updatePurchaseBillDetailed**
> InlineResponse2019 updatePurchaseBillDetailed(companyId, id, purchaseBillForm, opts)

Edit Detailed PurchaseBill



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.PurchaseBillsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var purchaseBillForm = new Parasut.PurchaseBillForm3(); // PurchaseBillForm3 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updatePurchaseBillDetailed(companyId, id, purchaseBillForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **purchaseBillForm** | [**PurchaseBillForm3**](PurchaseBillForm3.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, spender, details, details.product, payments, payments.transaction, tags, recurrence_plan, active_e_document, pay_to* | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

