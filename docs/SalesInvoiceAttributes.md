# Parasut.SalesInvoiceAttributes

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**archived** | **Boolean** |  | [optional] 
**invoiceNo** | **String** | Fatura no | [optional] 
**netTotal** | **Number** | Genel Toplam | [optional] 
**grossTotal** | **Number** | Ara toplam | [optional] 
**withholding** | **Number** | Stopaj | [optional] 
**totalExciseDuty** | **Number** |  | [optional] 
**totalCommunicationsTax** | **Number** |  | [optional] 
**totalVat** | **Number** | Toplam KDV | [optional] 
**vatWithholding** | **Number** | Tevkifat | [optional] 
**totalDiscount** | **Number** | Toplam indirim | [optional] 
**totalInvoiceDiscount** | **Number** |  | [optional] 
**beforeTaxesTotal** | **Number** | Vergiler Hariç Toplam | [optional] 
**remaining** | **Number** | Ödenmemiş tutar | [optional] 
**remainingInTrl** | **Number** |  | [optional] 
**paymentStatus** | **String** | Tahsilat durumu | [optional] 
**createdAt** | **Date** | Kayıt tarihi | [optional] 
**updatedAt** | **Date** | Son güncelleme tarihi | [optional] 
**itemType** | **String** | Fatura türü | 
**description** | **String** | Fatura açıklaması | [optional] 
**issueDate** | **Date** | Düzenleme tarihi | 
**dueDate** | **Date** | Son tahsilat tarihi | [optional] 
**invoiceSeries** | **String** | Fatura seri | [optional] 
**invoiceId** | **Number** | Fatura sıra | [optional] 
**currency** | **String** | Döviz tipi | [optional] 
**exchangeRate** | **Number** | Döviz kuru | [optional] 
**withholdingRate** | **Number** | Stopaj oranı | [optional] 
**vatWithholdingRate** | **Number** | Tevkifat oranı | [optional] 
**invoiceDiscountType** | **String** |  | [optional] 
**invoiceDiscount** | **Number** |  | [optional] 
**billingAddress** | **String** | Gönderim adresi | [optional] 
**billingPhone** | **String** | Gönderim adresi telefonu | [optional] 
**billingFax** | **String** | Gönderim adresi faksı | [optional] 
**taxOffice** | **String** | Müşteri vergi dairesi | [optional] 
**taxNumber** | **String** | Müşteri vergi numarası | [optional] 
**city** | **String** |  | [optional] 
**district** | **String** |  | [optional] 
**isAbroad** | **String** |  | [optional] 
**orderNo** | **String** |  | [optional] 
**orderDate** | **Date** |  | [optional] 
**shipmentAddres** | **String** |  | [optional] 
**shipmentIncluded** | **Boolean** | İrsaliyeli fatura | [optional] 


<a name="PaymentStatusEnum"></a>
## Enum: PaymentStatusEnum


* `paid` (value: `"paid"`)

* `overdue` (value: `"overdue"`)

* `unpaid` (value: `"unpaid"`)

* `partiallyPaid` (value: `"partially_paid"`)




<a name="ItemTypeEnum"></a>
## Enum: ItemTypeEnum


* `invoice` (value: `"invoice"`)

* `estimate` (value: `"estimate"`)

* `cancelled` (value: `"cancelled"`)

* `recurringInvoice` (value: `"recurring_invoice"`)

* `recurringEstimate` (value: `"recurring_estimate"`)

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




