# Parasut.SalariesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**archiveSalary**](SalariesApi.md#archiveSalary) | **PATCH** /{company_id}/salaries/{id}/archive | Archive
[**createSalary**](SalariesApi.md#createSalary) | **POST** /{company_id}/salaries | Create
[**deleteSalary**](SalariesApi.md#deleteSalary) | **DELETE** /{company_id}/salaries/{id} | Delete
[**listSalaries**](SalariesApi.md#listSalaries) | **GET** /{company_id}/salaries | Index
[**paySalary**](SalariesApi.md#paySalary) | **POST** /{company_id}/salaries/{id}/payments | Pay
[**showSalary**](SalariesApi.md#showSalary) | **GET** /{company_id}/salaries/{id} | Show
[**unarchiveSalary**](SalariesApi.md#unarchiveSalary) | **PATCH** /{company_id}/salaries/{id}/unarchive | Unarchive
[**updateSalary**](SalariesApi.md#updateSalary) | **PUT** /{company_id}/salaries/{id} | Edit


<a name="archiveSalary"></a>
# **archiveSalary**
> InlineResponse20110 archiveSalary(companyId, id, opts)

Archive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalariesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Maaş ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.archiveSalary(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Maaş ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags* | [optional] 

### Return type

[**InlineResponse20110**](InlineResponse20110.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createSalary"></a>
# **createSalary**
> InlineResponse20110 createSalary(companyId, salaryForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalariesApi();

var companyId = 56; // Number | Firma ID

var salaryForm = new Parasut.SalaryForm(); // SalaryForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createSalary(companyId, salaryForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **salaryForm** | [**SalaryForm**](SalaryForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags* | [optional] 

### Return type

[**InlineResponse20110**](InlineResponse20110.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteSalary"></a>
# **deleteSalary**
> Object deleteSalary(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalariesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Maaş ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteSalary(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Maaş ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listSalaries"></a>
# **listSalaries**
> InlineResponse20012 listSalaries(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalariesApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterDueDate': "filterDueDate_example", // String | 
  'filterIssueDate': "filterIssueDate_example", // String | 
  'filterCurrency': "filterCurrency_example", // String | 
  'filterRemaining': 8.14, // Number | 
  'sort': "id", // String | Sortable parameters - *Available: id, issue_date, due_date, remaining, description, net_total*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags, payments, activities, employee*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listSalaries(companyId, , opts, callback);
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
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags, payments, activities, employee* | [optional] 

### Return type

[**InlineResponse20012**](InlineResponse20012.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="paySalary"></a>
# **paySalary**
> InlineResponse2013 paySalary(companyId, id, paymentForm, opts)

Pay



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalariesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Maaş ID

var paymentForm = new Parasut.PaymentForm2(); // PaymentForm2 | 

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
apiInstance.paySalary(companyId, id, paymentForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Maaş ID | 
 **paymentForm** | [**PaymentForm2**](PaymentForm2.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: payable, transaction* | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showSalary"></a>
# **showSalary**
> InlineResponse20110 showSalary(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalariesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Maaş ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showSalary(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Maaş ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags* | [optional] 

### Return type

[**InlineResponse20110**](InlineResponse20110.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="unarchiveSalary"></a>
# **unarchiveSalary**
> InlineResponse20110 unarchiveSalary(companyId, id, opts)

Unarchive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalariesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Maaş ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.unarchiveSalary(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Maaş ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags* | [optional] 

### Return type

[**InlineResponse20110**](InlineResponse20110.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateSalary"></a>
# **updateSalary**
> InlineResponse20110 updateSalary(companyId, idsalaryForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.SalariesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Maaş ID

var salaryForm = new Parasut.SalaryForm1(); // SalaryForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateSalary(companyId, idsalaryForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Maaş ID | 
 **salaryForm** | [**SalaryForm1**](SalaryForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags* | [optional] 

### Return type

[**InlineResponse20110**](InlineResponse20110.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

