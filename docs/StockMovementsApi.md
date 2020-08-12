# Parasut.StockMovementsApi

All URIs are relative to *https://api.parasut.com/v4*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listStockMovements**](StockMovementsApi.md#listStockMovements) | **GET** /{company_id}/stock_movements | Index


<a name="listStockMovements"></a>
# **listStockMovements**
> InlineResponse20015 listStockMovements(companyId, opts)

Index

Tüm stok hareketlerini listeler. Her irsaliye oluşturulurken stok hareketi de oluşturulur. Buna ilave olarak, irsaliyeli satış faturası veya irsaliyeli alış faturası oluşturulduğunda stok takibi yapılan bir ürün içeren her fatura kalemine karşılık otomatik olarak bir stok hareketi oluşur.

### Example
```javascript
var Parasut = require('parasut');
var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new Parasut.StockMovementsApi();

var companyId = 56; // Number | Firma ID

var opts = { 
  'sort': "id", // String | Sortable parameters - *Available: id, date*
  'pageNumber': 1, // Number | Page Number
  'pageSize': 15, // Number | Page Size
  'include': "include_example" // String | Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: product, source, contact*
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listStockMovements(companyId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | **Number**| Firma ID | 
 **sort** | **String**| Sortable parameters - *Available: id, date* | [optional] [default to id]
 **pageNumber** | **Number**| Page Number | [optional] [default to 1]
 **pageSize** | **Number**| Page Size | [optional] [default to 15]
 **include** | **String**| Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: product, source, contact* | [optional] 

### Return type

[**InlineResponse20015**](InlineResponse20015.md)

### Authorization

[parasut_auth](../README.md#parasut_auth)

### HTTP request headers

 - **Content-Type**: application/vnd.api+json
 - **Accept**: application/vnd.api+json

