# Parasut.PaymentFormAttributes

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **String** | Ödeme/Tahsilat Açıklaması | [optional] 
**accountId** | **Number** | Kasa veya Banka - *Bu parametre ayrıca ödemenin/tahsilatın hangi döviz kuru ile yapılacağını belirler.* | [optional] 
**_date** | **Date** | Ödeme/Tahsilat tarihi | [optional] 
**amount** | **Number** | Ödeme/Tahsilat tutarı | [optional] 
**exchangeRate** | **Number** | Döviz kuru - *Eğer ödeme/tahsilat, faturadan farklı bir döviz kuru ile yapılacaksa; döviz kurunun TL karşılığını belirtin. Eğer ödeme/tahsilat, fatura ile aynı döviz kuru ile yapılacaksa; \"1.0\" değerini girin veya boş bırakın.* | [optional] 


