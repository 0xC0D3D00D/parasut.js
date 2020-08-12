# Parasut.ItemCategoriesApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createItemCategory**](ItemCategoriesApi.md#createItemCategory) | **POST** /{company_id}/item_categories | Create
[**deleteItemCategory**](ItemCategoriesApi.md#deleteItemCategory) | **DELETE** /{company_id}/item_categories/{id} | Delete
[**listItemCategories**](ItemCategoriesApi.md#listItemCategories) | **GET** /{company_id}/item_categories | Index
[**showItemCategory**](ItemCategoriesApi.md#showItemCategory) | **GET** /{company_id}/item_categories/{id} | Kategori bilgisini gösterir.
[**updateItemCategory**](ItemCategoriesApi.md#updateItemCategory) | **PUT** /{company_id}/item_categories/{id} | Edit


<a name="createItemCategory"></a>
# **createItemCategory**
> InlineResponse2017 createItemCategory(companyId, itemCategoryForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ItemCategoriesApi();

var companyId = 56; // Number | Firma ID

var itemCategoryForm = new Parasut.ItemCategoryForm(); // ItemCategoryForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: parent_category, subcategories*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createItemCategory(companyId, itemCategoryForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **itemCategoryForm** | [**ItemCategoryForm**](ItemCategoryForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: parent_category, subcategories* | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteItemCategory"></a>
# **deleteItemCategory**
> Object deleteItemCategory(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ItemCategoriesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Kategori ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteItemCategory(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Kategori ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listItemCategories"></a>
# **listItemCategories**
> InlineResponse2009 listItemCategories(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ItemCategoriesApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterName': "filterName_example", // String | 
  'filterCategoryType': "filterCategoryType_example", // String | 
  'sort': "id", // String | Sortable parameters - *Available: id, name, category_type*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: parent_category, subcategories*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listItemCategories(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterName** | **String**|  | [optional] 
 **filterCategoryType** | **String**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, name, category_type* | [optional] [default to id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: parent_category, subcategories* | [optional] 

### Return type

[**InlineResponse2009**](InlineResponse2009.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showItemCategory"></a>
# **showItemCategory**
> InlineResponse2017 showItemCategory(companyId, id, opts)

Kategori bilgisini gösterir.

Ayrıntısını görmek istediğiniz kategorinin id'sini göndererek gerekli bilgilere ulaşabilirsiniz.

### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ItemCategoriesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Kategori ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: parent_category, subcategories*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showItemCategory(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Kategori ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: parent_category, subcategories* | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateItemCategory"></a>
# **updateItemCategory**
> InlineResponse2017 updateItemCategory(companyId, iditemCategoryForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ItemCategoriesApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Kategori ID

var itemCategoryForm = new Parasut.ItemCategoryForm1(); // ItemCategoryForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: parent_category, subcategories*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateItemCategory(companyId, iditemCategoryForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Kategori ID | 
 **itemCategoryForm** | [**ItemCategoryForm1**](ItemCategoryForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: parent_category, subcategories* | [optional] 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

