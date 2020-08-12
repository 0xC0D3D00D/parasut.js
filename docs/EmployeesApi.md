# Parasut.EmployeesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**archiveEmployee**](EmployeesApi.md#archiveEmployee) | **PATCH** /{company_id}/employees/{id}/archive | Archive
[**createEmployee**](EmployeesApi.md#createEmployee) | **POST** /{company_id}/employees | Create
[**deleteEmployee**](EmployeesApi.md#deleteEmployee) | **DELETE** /{company_id}/employees/{id} | Delete
[**listEmployees**](EmployeesApi.md#listEmployees) | **GET** /{company_id}/employees | Index
[**showEmployee**](EmployeesApi.md#showEmployee) | **GET** /{company_id}/employees/{id} | Show
[**unarchiveEmployee**](EmployeesApi.md#unarchiveEmployee) | **PATCH** /{company_id}/employees/{id}/unarchive | Unarchive
[**updateEmployee**](EmployeesApi.md#updateEmployee) | **PUT** /{company_id}/employees/{id} | Edit


<a name="archiveEmployee"></a>
# **archiveEmployee**
> InlineResponse2016 archiveEmployee(companyId, id, opts)

Archive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EmployeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Çalışan ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.archiveEmployee(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Çalışan ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role* | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="createEmployee"></a>
# **createEmployee**
> InlineResponse2016 createEmployee(companyId, employeeForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EmployeesApi();

var companyId = 56; // Number | Firma ID

var employeeForm = new Parasut.EmployeeForm(); // EmployeeForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createEmployee(companyId, employeeForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **employeeForm** | [**EmployeeForm**](EmployeeForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role* | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteEmployee"></a>
# **deleteEmployee**
> Object deleteEmployee(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EmployeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Çalışan ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteEmployee(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Çalışan ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listEmployees"></a>
# **listEmployees**
> InlineResponse2008 listEmployees(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EmployeesApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterName': "filterName_example", // String | 
  'filterEmail': "filterEmail_example", // String | 
  'sort': "-balance", // String | Sortable parameters - *Available: id, balance, name, email*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listEmployees(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterName** | **String**|  | [optional] 
 **filterEmail** | **String**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, balance, name, email* | [optional] [default to -balance]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role* | [optional] 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showEmployee"></a>
# **showEmployee**
> InlineResponse2016 showEmployee(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EmployeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Çalışan ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showEmployee(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Çalışan ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role* | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="unarchiveEmployee"></a>
# **unarchiveEmployee**
> InlineResponse2016 unarchiveEmployee(companyId, id, opts)

Unarchive



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EmployeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Çalışan ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.unarchiveEmployee(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Çalışan ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role* | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateEmployee"></a>
# **updateEmployee**
> InlineResponse2016 updateEmployee(companyId, idemployeeForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.EmployeesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Çalışan ID

var employeeForm = new Parasut.EmployeeForm1(); // EmployeeForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateEmployee(companyId, idemployeeForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Çalışan ID | 
 **employeeForm** | [**EmployeeForm1**](EmployeeForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, managed_by_user, managed_by_user_role* | [optional] 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

