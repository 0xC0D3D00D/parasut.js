# Parasut.ProductsApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createProduct**](ProductsApi.md#createProduct) | **POST** /{company_id}/products | Create
[**deleteProduct**](ProductsApi.md#deleteProduct) | **DELETE** /{company_id}/products/{id} | Delete
[**listProducts**](ProductsApi.md#listProducts) | **GET** /{company_id}/products | Index
[**showProduct**](ProductsApi.md#showProduct) | **GET** /{company_id}/products/{id} | Show
[**updateProduct**](ProductsApi.md#updateProduct) | **PUT** /{company_id}/products/{id} | Edit


<a name="createProduct"></a>
# **createProduct**
> InlineResponse2018 createProduct(companyId, productForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ProductsApi();

var companyId = 56; // Number | Firma ID

var productForm = new Parasut.ProductForm(); // ProductForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createProduct(companyId, productForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **productForm** | [**ProductForm**](ProductForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category* | [optional] 

### Return type

[**InlineResponse2018**](InlineResponse2018.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteProduct"></a>
# **deleteProduct**
> Object deleteProduct(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ProductsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Ürün ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteProduct(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Ürün ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listProducts"></a>
# **listProducts**
> InlineResponse20010 listProducts(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ProductsApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterName': "filterName_example", // String | 
  'filterCode': "filterCode_example", // String | 
  'sort': "-id", // String | Sortable parameters - *Available: id, name*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listProducts(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterName** | **String**|  | [optional] 
 **filterCode** | **String**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, name* | [optional] [default to -id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category* | [optional] 

### Return type

[**InlineResponse20010**](InlineResponse20010.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showProduct"></a>
# **showProduct**
> InlineResponse2018 showProduct(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ProductsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Ürün ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showProduct(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Ürün ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category* | [optional] 

### Return type

[**InlineResponse2018**](InlineResponse2018.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateProduct"></a>
# **updateProduct**
> InlineResponse2018 updateProduct(companyId, idproductForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ProductsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | Ürün ID

var productForm = new Parasut.ProductForm1(); // ProductForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateProduct(companyId, idproductForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| Ürün ID | 
 **productForm** | [**ProductForm1**](ProductForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category* | [optional] 

### Return type

[**InlineResponse2018**](InlineResponse2018.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

