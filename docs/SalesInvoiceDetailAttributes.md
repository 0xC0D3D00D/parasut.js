# Parasut.SalesInvoiceDetailAttributes

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**netTotal** | **Number** | Ürün/hizmet net tutarı | [optional] 
**createdAt** | **Date** | Kayıt tarihi | [optional] 
**updatedAt** | **Date** | Son güncelleme tarihi | [optional] 
**quantity** | **Number** | Miktar | 
**unitPrice** | **Number** | Birim fiyatı | 
**vatRate** | **Number** | KDV oranı | 
**discountType** | **String** | İndirim türü | [optional] 
**discountValue** | **Number** |  | [optional] 
**exciseDutyType** | **String** | ÖTV tipi | [optional] 
**exciseDutyValue** | **Number** |  | [optional] 
**communicationsTaxRate** | **Number** | ÖİV oranı | [optional] 
**description** | **String** | Açıklama | [optional] 


<a name="DiscountTypeEnum"></a>
## Enum: DiscountTypeEnum


* `percentage` (value: `"percentage"`)

* `amount` (value: `"amount"`)




<a name="ExciseDutyTypeEnum"></a>
## Enum: ExciseDutyTypeEnum


* `percentage` (value: `"percentage"`)

* `amount` (value: `"amount"`)




