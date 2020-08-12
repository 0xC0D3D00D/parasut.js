# Parasut.EDocumentCommonFormAttributes

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**vatWithholdingCode** | **String** | Tevkifat oranına ait vergi kodu. - *Bu dosyada ilgili kodları bulabilirsiniz: https://www.efatura.gov.tr/dosyalar/kilavuzlar/UBLTR_1.2_Kilavuzlar.zip* | [optional] 
**vatExemptionReasonCode** | **String** | KDV'si %0 olan hizmet ve ürünlerin KDV muafiyet sebebi kodu. - *Bu dosyada ilgili kodları bulabilirsiniz: https://www.efatura.gov.tr/dosyalar/kilavuzlar/UBLTR_1.2_Kilavuzlar.zip* | [optional] 
**vatExemptionReason** | **String** | Eğer KDV muafiyet sebebi kodu 250 veya 350 ise KDV muafiyet sebebi açıklaması. | [optional] 
**note** | **String** | Fatura notu | [optional] 
**exciseDutyCodes** | [**[EDocumentCommonFormAttributesExciseDutyCodes]**](EDocumentCommonFormAttributesExciseDutyCodes.md) | ÖTV kodları - *Özel tüketim vergisi faturadaki her kalem için ayrıdır. ÖTV uygulanan her ürün için ÖTV kodu göndermeniz gerekmektedir.* | [optional] 


