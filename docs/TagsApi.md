# Parasut.TagsApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createTag**](TagsApi.md#createTag) | **POST** /{company_id}/tags | Create
[**deleteTag**](TagsApi.md#deleteTag) | **DELETE** /{company_id}/tags/{id} | Delete
[**listTags**](TagsApi.md#listTags) | **GET** /{company_id}/tags | Index
[**showTag**](TagsApi.md#showTag) | **GET** /{company_id}/tags/{id} | Show
[**updateTag**](TagsApi.md#updateTag) | **PUT** /{company_id}/tags/{id} | Edit


<a name="createTag"></a>
# **createTag**
> InlineResponse20113 createTag(companyId, tagForm)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TagsApi();

var companyId = 56; // Number | Firma ID

var tagForm = new Parasut.TagForm(); // TagForm | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createTag(companyId, tagForm, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **tagForm** | [**TagForm**](TagForm.md)|  | 

### Return type

[**InlineResponse20113**](InlineResponse20113.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteTag"></a>
# **deleteTag**
> Object deleteTag(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TagsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Etiket ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteTag(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Etiket ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listTags"></a>
# **listTags**
> InlineResponse20016 listTags(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TagsApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'sort': "id", // String | Sortable parameters - *Available: id, name*
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
apiInstance.listTags(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **sort** | **String**| Sortable parameters - *Available: id, name* | [optional] [default to id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]

### Return type

[**InlineResponse20016**](InlineResponse20016.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showTag"></a>
# **showTag**
> InlineResponse20113 showTag(companyId, id)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TagsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Etiket ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showTag(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Etiket ID | 

### Return type

[**InlineResponse20113**](InlineResponse20113.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateTag"></a>
# **updateTag**
> InlineResponse20113 updateTag(companyId, idtagForm)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.TagsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Etiket ID

var tagForm = new Parasut.TagForm1(); // TagForm1 | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateTag(companyId, idtagForm, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Etiket ID | 
 **tagForm** | [**TagForm1**](TagForm1.md)|  | 

### Return type

[**InlineResponse20113**](InlineResponse20113.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

