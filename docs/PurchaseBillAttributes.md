# Parasut.PurchaseBillAttributes

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**archived** | **Boolean** |  | [optional] 
**totalPaid** | **Number** |  | [optional] 
**grossTotal** | **Number** |  | [optional] 
**totalExciseDuty** | **Number** |  | [optional] 
**totalCommunicationsTax** | **Number** |  | [optional] 
**totalVat** | **Number** |  | 
**totalDiscount** | **Number** |  | [optional] 
**totalInvoiceDiscount** | **Number** |  | [optional] 
**remaining** | **Number** |  | [optional] 
**remainingInTrl** | **Number** |  | [optional] 
**paymentStatus** | **String** |  | [optional] 
**isDetailed** | **Boolean** |  | [optional] 
**sharingsCount** | **Number** |  | [optional] 
**eInvoicesCount** | **Number** |  | [optional] 
**remainingReimbursement** | **Number** |  | [optional] 
**remainingReimbursementInTrl** | **Number** |  | [optional] 
**createdAt** | **Date** |  | [optional] 
**updatedAt** | **Date** |  | [optional] 
**itemType** | **String** |  | 
**description** | **String** |  | [optional] 
**issueDate** | **Date** |  | 
**dueDate** | **Date** |  | 
**invoiceNo** | **String** |  | [optional] 
**currency** | **String** |  | 
**exchangeRate** | **Number** |  | [optional] 
**netTotal** | **Number** |  | 
**withholdingRate** | **Number** |  | [optional] 
**vatWithholdingRate** | **Number** |  | [optional] 
**invoiceDiscountType** | **String** |  | [optional] 
**invoiceDiscount** | **Number** |  | [optional] 


<a name="PaymentStatusEnum"></a>
## Enum: PaymentStatusEnum


* `paid` (value: `"paid"`)

* `overdue` (value: `"overdue"`)

* `unpaid` (value: `"unpaid"`)

* `partiallyPaid` (value: `"partially_paid"`)




<a name="ItemTypeEnum"></a>
## Enum: ItemTypeEnum


* `purchaseBill` (value: `"purchase_bill"`)

* `cancelled` (value: `"cancelled"`)

* `recurringPurchaseBill` (value: `"recurring_purchase_bill"`)

* `refund` (value: `"refund"`)




<a name="CurrencyEnum"></a>
## Enum: CurrencyEnum


* `TRL` (value: `"TRL"`)

* `USD` (value: `"USD"`)

* `EUR` (value: `"EUR"`)

* `GBP` (value: `"GBP"`)




<a name="InvoiceDiscountTypeEnum"></a>
## Enum: InvoiceDiscountTypeEnum


* `percentage` (value: `"percentage"`)

* `amount` (value: `"amount"`)




