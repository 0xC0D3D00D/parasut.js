# Parasut.EInvoiceAttributes

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**externalId** | **String** |  | [optional] 
**uuid** | **String** |  | [optional] 
**envUuid** | **String** |  | [optional] 
**fromAddress** | **String** |  | [optional] 
**fromVkn** | **String** |  | [optional] 
**toAddress** | **String** |  | [optional] 
**toVkn** | **String** |  | [optional] 
**direction** | **String** |  | [optional] 
**note** | **String** |  | [optional] 
**responseType** | **String** |  | [optional] 
**contactName** | **String** |  | [optional] 
**scenario** | **String** |  | [optional] 
**status** | **String** |  | [optional] 
**issueDate** | **Date** |  | [optional] 
**isExpired** | **Boolean** |  | [optional] 
**isAnswerable** | **Boolean** |  | [optional] 
**netTotal** | **Number** |  | [optional] 
**currency** | **String** |  | [optional] 
**itemType** | **String** |  | [optional] 
**createdAt** | **Date** |  | [optional] 
**updatedAt** | **Date** |  | [optional] 


<a name="DirectionEnum"></a>
## Enum: DirectionEnum


* `inbound` (value: `"inbound"`)

* `outbound` (value: `"outbound"`)




<a name="ResponseTypeEnum"></a>
## Enum: ResponseTypeEnum


* `accepted` (value: `"accepted"`)

* `rejected` (value: `"rejected"`)

* `refunded` (value: `"refunded"`)




<a name="ScenarioEnum"></a>
## Enum: ScenarioEnum


* `basic` (value: `"basic"`)

* `commercial` (value: `"commercial"`)




<a name="StatusEnum"></a>
## Enum: StatusEnum


* `waiting` (value: `"waiting"`)

* `failed` (value: `"failed"`)

* `successful` (value: `"successful"`)




<a name="CurrencyEnum"></a>
## Enum: CurrencyEnum


* `TRL` (value: `"TRL"`)

* `USD` (value: `"USD"`)

* `EUR` (value: `"EUR"`)

* `GBP` (value: `"GBP"`)




<a name="ItemTypeEnum"></a>
## Enum: ItemTypeEnum


* `refund` (value: `"refund"`)

* `invoice` (value: `"invoice"`)




