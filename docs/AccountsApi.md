# Parasut.AccountsApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAccount**](AccountsApi.md#createAccount) | **POST** /{company_id}/accounts | Create
[**createCreditTransaction**](AccountsApi.md#createCreditTransaction) | **POST** /{company_id}/accounts/{id}/credit_transactions | Credit Transaction
[**createDebitTransaction**](AccountsApi.md#createDebitTransaction) | **POST** /{company_id}/accounts/{id}/debit_transactions | Debit Transaction
[**deleteAccount**](AccountsApi.md#deleteAccount) | **DELETE** /{company_id}/accounts/{id} | Delete
[**listAccountTransactions**](AccountsApi.md#listAccountTransactions) | **GET** /{company_id}/accounts/{id}/transactions | Transactions
[**listAccounts**](AccountsApi.md#listAccounts) | **GET** /{company_id}/accounts | Index
[**showAccount**](AccountsApi.md#showAccount) | **GET** /{company_id}/accounts/{id} | Show
[**updateAccount**](AccountsApi.md#updateAccount) | **PUT** /{company_id}/accounts/{id} | Edit


<a name="createAccount"></a>
# **createAccount**
> InlineResponse201 createAccount(companyId, accountForm)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.AccountsApi();

var companyId = 56; // Number | Firma ID

var accountForm = new Parasut.AccountForm(); // AccountForm | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createAccount(companyId, accountForm, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **accountForm** | [**AccountForm**](AccountForm.md)|  | 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createCreditTransaction"></a>
# **createCreditTransaction**
> InlineResponse2011 createCreditTransaction(companyId, id, transactionForm, opts)

Credit Transaction



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.AccountsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Kasa/Banka Hesabı ID

var transactionForm = new Parasut.TransactionForm1(); // TransactionForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: debit_account, credit_account, payments*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createCreditTransaction(companyId, id, transactionForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Kasa/Banka Hesabı ID | 
 **transactionForm** | [**TransactionForm1**](TransactionForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: debit_account, credit_account, payments* | [optional] 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createDebitTransaction"></a>
# **createDebitTransaction**
> InlineResponse2011 createDebitTransaction(companyId, id, transactionForm, opts)

Debit Transaction



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.AccountsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Kasa/Banka Hesabı ID

var transactionForm = new Parasut.TransactionForm(); // TransactionForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: debit_account, credit_account, payments*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createDebitTransaction(companyId, id, transactionForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Kasa/Banka Hesabı ID | 
 **transactionForm** | [**TransactionForm**](TransactionForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: debit_account, credit_account, payments* | [optional] 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteAccount"></a>
# **deleteAccount**
> Object deleteAccount(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.AccountsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Hesap ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteAccount(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Hesap ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listAccountTransactions"></a>
# **listAccountTransactions**
> InlineResponse2001 listAccountTransactions(companyId, id, opts)

Transactions



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.AccountsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Hesap ID

var opts = { 
  'filterDate': "filterDate_example", // String | 
  'sort': "id", // String | Sortable parameters - *Available: id*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: debit_account, credit_account*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listAccountTransactions(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Hesap ID | 
 **filterDate** | **String**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id* | [optional] [default to id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: debit_account, credit_account* | [optional] 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listAccounts"></a>
# **listAccounts**
> InlineResponse200 listAccounts(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.AccountsApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterName': "filterName_example", // String | 
  'filterCurrency': "filterCurrency_example", // String | 
  'filterBankName': "filterBankName_example", // String | 
  'filterBankBranch': "filterBankBranch_example", // String | 
  'filterAccountType': "filterAccountType_example", // String | 
  'filterIban': "filterIban_example", // String | 
  'sort': "-id", // String | Sortable parameters - *Available: id, balance, balance_in_trl*
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
apiInstance.listAccounts(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterName** | **String**|  | [optional] 
 **filterCurrency** | **String**|  | [optional] 
 **filterBankName** | **String**|  | [optional] 
 **filterBankBranch** | **String**|  | [optional] 
 **filterAccountType** | **String**|  | [optional] 
 **filterIban** | **String**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, balance, balance_in_trl* | [optional] [default to -id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showAccount"></a>
# **showAccount**
> InlineResponse201 showAccount(companyId, id)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.AccountsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Hesap ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showAccount(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Hesap ID | 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateAccount"></a>
# **updateAccount**
> InlineResponse201 updateAccount(companyId, idaccountForm)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.AccountsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Hesap ID

var accountForm = new Parasut.AccountForm1(); // AccountForm1 | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateAccount(companyId, idaccountForm, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Hesap ID | 
 **accountForm** | [**AccountForm1**](AccountForm1.md)|  | 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

