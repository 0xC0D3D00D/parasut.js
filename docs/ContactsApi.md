# Parasut.ContactsApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**collectFromContact**](ContactsApi.md#collectFromContact) | **POST** /{company_id}/contacts/{id}/contact_debit_transactions | Tahsilat
[**createContact**](ContactsApi.md#createContact) | **POST** /{company_id}/contacts | Create
[**deleteContact**](ContactsApi.md#deleteContact) | **DELETE** /{company_id}/contacts/{id} | Delete
[**listContacts**](ContactsApi.md#listContacts) | **GET** /{company_id}/contacts | Index
[**payToContact**](ContactsApi.md#payToContact) | **POST** /{company_id}/contacts/{id}/contact_credit_transactions | Ödeme
[**showContact**](ContactsApi.md#showContact) | **GET** /{company_id}/contacts/{id} | Show
[**updateContact**](ContactsApi.md#updateContact) | **PUT** /{company_id}/contacts/{id} | Edit


<a name="collectFromContact"></a>
# **collectFromContact**
> InlineResponse2011 collectFromContact(companyId, id, transactionForm, opts)

Tahsilat



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ContactsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Müşteri/Tedarikçi ID

var transactionForm = new Parasut.TransactionForm2(); // TransactionForm2 | 

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
apiInstance.collectFromContact(companyId, id, transactionForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Müşteri/Tedarikçi ID | 
 **transactionForm** | [**TransactionForm2**](TransactionForm2.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: debit_account, credit_account, payments* | [optional] 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createContact"></a>
# **createContact**
> InlineResponse2014 createContact(companyId, contactForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ContactsApi();

var companyId = 56; // Number | Firma ID

var contactForm = new Parasut.ContactForm(); // ContactForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact_portal, contact_people*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createContact(companyId, contactForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **contactForm** | [**ContactForm**](ContactForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact_portal, contact_people* | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteContact"></a>
# **deleteContact**
> Object deleteContact(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ContactsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Müşteri/Tedarikçi ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteContact(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Müşteri/Tedarikçi ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listContacts"></a>
# **listContacts**
> InlineResponse2003 listContacts(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ContactsApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterName': "filterName_example", // String | 
  'filterEmail': "filterEmail_example", // String | 
  'filterTaxNumber': "filterTaxNumber_example", // String | 
  'filterTaxOffice': "filterTaxOffice_example", // String | 
  'filterCity': "filterCity_example", // String | 
  'sort': "-balance", // String | Sortable parameters - *Available: id, balance, name, email*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact_portal, contact_people*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listContacts(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterName** | **String**|  | [optional] 
 **filterEmail** | **String**|  | [optional] 
 **filterTaxNumber** | **String**|  | [optional] 
 **filterTaxOffice** | **String**|  | [optional] 
 **filterCity** | **String**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, balance, name, email* | [optional] [default to -balance]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact_portal, contact_people* | [optional] 

### Return type

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="payToContact"></a>
# **payToContact**
> InlineResponse2011 payToContact(companyId, id, transactionForm, opts)

Ödeme



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ContactsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Müşteri/Tedarikçi ID

var transactionForm = new Parasut.TransactionForm3(); // TransactionForm3 | 

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
apiInstance.payToContact(companyId, id, transactionForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Müşteri/Tedarikçi ID | 
 **transactionForm** | [**TransactionForm3**](TransactionForm3.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: debit_account, credit_account, payments* | [optional] 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showContact"></a>
# **showContact**
> InlineResponse2014 showContact(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ContactsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Müşteri/Tedarikçi ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact_portal, contact_people*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showContact(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Müşteri/Tedarikçi ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact_portal, contact_people* | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateContact"></a>
# **updateContact**
> InlineResponse2014 updateContact(companyId, idcontactForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ContactsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Müşteri/Tedarikçi ID

var contactForm = new Parasut.ContactForm1(); // ContactForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact_portal, contact_people*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateContact(companyId, idcontactForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Müşteri/Tedarikçi ID | 
 **contactForm** | [**ContactForm1**](ContactForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, contact_portal, contact_people* | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

