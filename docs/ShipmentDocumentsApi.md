# Parasut.ShipmentDocumentsApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createShipmentDocument**](ShipmentDocumentsApi.md#createShipmentDocument) | **POST** /{company_id}/shipment_documents | Create
[**deleteShipmentDocument**](ShipmentDocumentsApi.md#deleteShipmentDocument) | **DELETE** /{company_id}/shipment_documents/{id} | Delete
[**listShipmentDocuments**](ShipmentDocumentsApi.md#listShipmentDocuments) | **GET** /{company_id}/shipment_documents | Index
[**showShipmentDocument**](ShipmentDocumentsApi.md#showShipmentDocument) | **GET** /{company_id}/shipment_documents/{id} | Show
[**updateShipmentDocument**](ShipmentDocumentsApi.md#updateShipmentDocument) | **PUT** /{company_id}/shipment_documents/{id} | Edit


<a name="createShipmentDocument"></a>
# **createShipmentDocument**
> InlineResponse20112 createShipmentDocument(companyId, shipmentDocumentForm, opts)

Create



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ShipmentDocumentsApi();

var companyId = 56; // Number | Firma ID

var shipmentDocumentForm = new Parasut.ShipmentDocumentForm(); // ShipmentDocumentForm | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: contact, stock_movements, stock_movements.product, tags, invoices*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createShipmentDocument(companyId, shipmentDocumentForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **shipmentDocumentForm** | [**ShipmentDocumentForm**](ShipmentDocumentForm.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: contact, stock_movements, stock_movements.product, tags, invoices* | [optional] 

### Return type

[**InlineResponse20112**](InlineResponse20112.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="deleteShipmentDocument"></a>
# **deleteShipmentDocument**
> Object deleteShipmentDocument(companyId, id)

Delete



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ShipmentDocumentsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | İrsaliye ID


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteShipmentDocument(companyId, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| İrsaliye ID | 

### Return type

**Object**

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="listShipmentDocuments"></a>
# **listShipmentDocuments**
> InlineResponse20014 listShipmentDocuments(companyId, , opts)

Index



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ShipmentDocumentsApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'filterFlowType': "filterFlowType_example", // String | 
  'filterInvoiceStatus': "filterInvoiceStatus_example", // String | 
  'filterArchived': true, // Boolean | 
  'sort': "id", // String | Sortable parameters - *Available: id, issue_date, description, inflow*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: contact, stock_movements, stock_movements.product, tags, invoices*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listShipmentDocuments(companyId, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **filterFlowType** | **String**|  | [optional] 
 **filterInvoiceStatus** | **String**|  | [optional] 
 **filterArchived** | **Boolean**|  | [optional] 
 **sort** | **String**| Sortable parameters - *Available: id, issue_date, description, inflow* | [optional] [default to id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: contact, stock_movements, stock_movements.product, tags, invoices* | [optional] 

### Return type

[**InlineResponse20014**](InlineResponse20014.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="showShipmentDocument"></a>
# **showShipmentDocument**
> InlineResponse20112 showShipmentDocument(companyId, id, opts)

Show



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ShipmentDocumentsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | İrsaliye ID

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: contact, stock_movements, stock_movements.product, tags, invoices*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.showShipmentDocument(companyId, id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| İrsaliye ID | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: contact, stock_movements, stock_movements.product, tags, invoices* | [optional] 

### Return type

[**InlineResponse20112**](InlineResponse20112.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

<a name="updateShipmentDocument"></a>
# **updateShipmentDocument**
> InlineResponse20112 updateShipmentDocument(companyId, idshipmentDocumentForm, opts)

Edit



### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.ShipmentDocumentsApi();

var companyId = 56; // Number | Firma ID

var id = 56; // Number | İrsaliye ID

var shipmentDocumentForm = new Parasut.ShipmentDocumentForm1(); // ShipmentDocumentForm1 | 

var opts = { 
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: contact, stock_movements, stock_movements.product, tags, invoices*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateShipmentDocument(companyId, idshipmentDocumentForm, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **id** | **Number**| İrsaliye ID | 
 **shipmentDocumentForm** | [**ShipmentDocumentForm1**](ShipmentDocumentForm1.md)|  | 
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: contact, stock_movements, stock_movements.product, tags, invoices* | [optional] 

### Return type

[**InlineResponse20112**](InlineResponse20112.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

