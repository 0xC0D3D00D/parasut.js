# Parasut.SalesInvoicesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**archiveSalesInvoice**](SalesInvoicesApi.md#archiveSalesInvoice) | **PATCH** /{company_id}/sales_invoices/{id}/archive | Archive
[**cancelSalesInvoice**](SalesInvoicesApi.md#cancelSalesInvoice) | **DELETE** /{company_id}/sales_invoices/{id}/cancel | Cancel
[**convertEstimateToInvoice**](SalesInvoicesApi.md#convertEstimateToInvoice) | **PATCH** /{company_id}/sales_invoices/{id}/convert_to_invoice | Convert estimate to invoice
[**createSalesInvoice**](SalesInvoicesApi.md#createSalesInvoice) | **POST** /{company_id}/sales_invoices | Create
[**deleteSalesInvoice**](SalesInvoicesApi.md#deleteSalesInvoice) | **DELETE** /{company_id}/sales_invoices/{id} | Delete
[**listSalesInvoices**](SalesInvoicesApi.md#listSalesInvoices) | **GET** /{company_id}/sales_invoices | Index
[**paySalesInvoice**](SalesInvoicesApi.md#paySalesInvoice) | **POST** /{company_id}/sales_invoices/{id}/payments | Pay
[**recoverSalesInvoice**](SalesInvoicesApi.md#recoverSalesInvoice) | **PATCH** /{company_id}/sales_invoices/{id}/recover | Recover
[**showSalesInvoice**](SalesInvoicesApi.md#showSalesInvoice) | **GET** /{company_id}/sales_invoices/{id} | Show
[**unarchiveSalesInvoice**](SalesInvoicesApi.md#unarchiveSalesInvoice) | **PATCH** /{company_id}/sales_invoices/{id}/unarchive | Unarchive
[**updateSalesInvoice**](SalesInvoicesApi.md#updateSalesInvoice) | **PUT** /{company_id}/sales_invoices/{id} | Edit


<a name="archiveSalesInvoice"></a>
# **archiveSalesInvoice**
> InlineResponse20111 archiveSalesInvoice(companyId, id, opts)

Archive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.archiveSalesInvoice(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="cancelSalesInvoice"></a>
# **cancelSalesInvoice**
> InlineResponse20111 cancelSalesInvoice(companyId, id, opts)

Cancel



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.cancelSalesInvoice(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="convertEstimateToInvoice"></a>
# **convertEstimateToInvoice**
> InlineResponse20111 convertEstimateToInvoice(companyId, id, salesInvoiceForm, opts)

Convert estimate to invoice



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var salesInvoiceForm = new Parasut.SalesInvoiceForm2(); // SalesInvoiceForm2 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.convertEstimateToInvoice(companyId, id, salesInvoiceForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **salesInvoiceForm** | [**SalesInvoiceForm2**](SalesInvoiceForm2.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createSalesInvoice"></a>
# **createSalesInvoice**
> InlineResponse20111 createSalesInvoice(companyId, salesInvoiceForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var salesInvoiceForm = new Parasut.SalesInvoiceForm(); // SalesInvoiceForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createSalesInvoice(companyId, salesInvoiceForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **salesInvoiceForm** | [**SalesInvoiceForm**](SalesInvoiceForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteSalesInvoice"></a>
# **deleteSalesInvoice**
> Object deleteSalesInvoice(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteSalesInvoice(companyId, id, callback);
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

<a name="listSalesInvoices"></a>
# **listSalesInvoices**
> InlineResponse20013 listSalesInvoices(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterIssueDate': "filterIssueDate_example", // String | 
  'filterDueDate': "filterDueDate_example", // String | 
  'filterContactId': 56, // Number | 
  'filterInvoiceId': 56, // Number | 
  'filterInvoiceSeries': "filterInvoiceSeries_example", // String | 
  'sort': "id", // String | Sortable parameters - *Available: id, issue_date, due_date, remaining, remaining_in_trl, description, net_total*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listSalesInvoices(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterIssueDate** | **String**|  | [optional] 
 **filterDueDate** | **String**|  | [optional] 
 **filterContactId** | **Number**|  | [optional] 
 **filterInvoiceId** | **Number**|  | [optional] 
 **filterInvoiceSeries** | **String**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, issue_date, due_date, remaining, remaining_in_trl, description, net_total* | [optional] [default to id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20013**](InlineResponse20013.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="paySalesInvoice"></a>
# **paySalesInvoice**
> InlineResponse2013 paySalesInvoice(companyId, id, paymentForm, opts)

Pay



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var paymentForm = new Parasut.PaymentForm3(); // PaymentForm3 | 

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
apiInstance.paySalesInvoice(companyId, id, paymentForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **paymentForm** | [**PaymentForm3**](PaymentForm3.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: payable, transaction* | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="recoverSalesInvoice"></a>
# **recoverSalesInvoice**
> InlineResponse20111 recoverSalesInvoice(companyId, id, opts)

Recover



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.recoverSalesInvoice(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showSalesInvoice"></a>
# **showSalesInvoice**
> InlineResponse20111 showSalesInvoice(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showSalesInvoice(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="unarchiveSalesInvoice"></a>
# **unarchiveSalesInvoice**
> InlineResponse20111 unarchiveSalesInvoice(companyId, id, opts)

Unarchive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.unarchiveSalesInvoice(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateSalesInvoice"></a>
# **updateSalesInvoice**
> InlineResponse20111 updateSalesInvoice(companyId, idsalesInvoiceForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalesInvoicesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Fatura ID

var salesInvoiceForm = new Parasut.SalesInvoiceForm1(); // SalesInvoiceForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateSalesInvoice(companyId, idsalesInvoiceForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Fatura ID | 
 **salesInvoiceForm** | [**SalesInvoiceForm1**](SalesInvoiceForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact, details, details.product, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document* | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

