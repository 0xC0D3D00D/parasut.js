/*
 * Parasut
 * # GİRİŞ  ## API Hakkında  Paraşüt API'yi kullanmak veya görüşlerinizi bizimle paylaşmak isterseniz lütfen bizimle destek@parasut.com adresi üzerinden iletişime geçiniz.  API'yi kullanarak Paraşüt verilerine ulaşabilir ve kendi yazdığınız uygulamalar ile entegre edebilirsiniz. API vasıtasıyla Paraşüt Web arayüzü ile yapılan hemen her işlemi gerçekleştirebilirsiniz.   - API geliştirmesinde çoğunlukla JSONAPI (http://jsonapi.org/) standartlarına uymaya çalıştık.  - Dökümantasyon oluşturulmasında ise OpenAPI-Swagger 2.0 kullandık.  - API hizmetimizin `BASE_URL`i `https://api.parasut.com` şeklindedir.  - V4 endpointlerine ulaşmak için `https://api.parasut.com/v4` şeklinde kullanabilirsiniz.  ## Genel Bilgiler  - API metodlarına erişmek için baz URL olarak `https://api.parasut.com/v4/firma_no` adresi kullanılır.   - Bu yapıda kullanılan `firma_no` parametresi bilgisine erişilmek istenin firmanın Paraşüt veritabanındaki kayıt numarasıdır.   - Örneğin 115 numaralı firmanın müşteri/tedarikçi listesine erişmek için `https://api.parasut.com/v4/115/contacts` adresi kullanılır. - İstekleri gönderirken `Content-Type` header'ı olarak `application/json` veya `application/vnd.api+json` göndermelisiniz. - Yeni bir kayıt oluştururken **ilgili** kaydın `ID` parametresini boş göndermeli veya hiç göndermemelisiniz.   - Örnek: Satış faturası oluştururken `data->id` boş olmalı, ama `relationships->contact->data->id` dolu olmalı, çünkü gönderdiğiniz müşterinizin ID'si daha önceden elinizde bulunmalıdır. Aynı şekilde `relationships->details->data` içerisinde tanımladığınız ID'ler de boş olmalı, çünkü henüz fatura kalemi yaratmadınız. - API endpointlerine ulaşmak için, aldığınız `access_token`'ı sorgulara `Authorization` header'ı olarak `Bearer access_token` şeklinde göndermelisiniz. - Dakikada 60 adet istek gönderebilirsiniz.  # Authentication  <!-- ReDoc-Inject: <security-definitions> -->  Paraşüt API kimlik doğrulama için oAuth2 kullanmaktadır. Bu protokolü destekleyen istemci kütüphanelerini kullanarak oturum açabilir ve API'yi kullanabilirsiniz.  Gerekli CLIENT_ID, CLIENT_SECRET ve REDIRECT_URL bilgilerini almak için destek@parasut.com adresine mail atabilirsiniz.  Kimlik doğrulama işleminin başarılı olması durumunda bir adet kimlik jetonu (authentication token) ve bir adet de yenileme jetonu (refresh token) gönderilecektir. Kimlik jetonu 2 saat süreyle geçerlidir ve her istekte http başlık bilgilerinin içerisinde gönderilmelidir. Bu sürenin sonunda kimlik jetonu geçerliliğini yitirecektir ve yenileme jetonu kullanılarak tekrar üretilmesi gerekmektedir.  ## access_token almak:  access_token almanız için iki farklı seçenek bulunmaktadır.  Kullanım şeklinize bağlı olarak iki yöntemden birini tercih etmelisiniz.  ### 1. grant_type=authorization_code  Bu yöntemi kullanabilmek için öncelikle aşağıda belirtildiği gibi kullanıcıyı başarılı authentication işleminin ardından yönlendirmek istediğiniz `REDIRECT_URL`'i bize ulaşarak kayıt ettirmeniz gerekmektedir. `REDIRECT_URL` varsayılan olarak `urn:ietf:wg:oauth:2.0:oob` gelmektedir.  Size özel bir REDIRECT_URL tanımlamak isterseniz destek@parasut.com adresine mail atabilirsiniz.  1. Kullanıcıyı şu adrese yönlendirin:    ```   BASE_URL/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URL&response_type=code   ```  2. Oturum açmışsa ve uygulamayı kabul ederse, kullanıcı sizin tanımladığınız REDIRECT_URL'e şu şekilde gelmesi gerekiyor:   `REDIRECT_URL?code=xxxxxxx`  3. Burada size gelen \"code\" parametresi ile access token almalısınız.  ```bash curl -F grant_type=authorization_code \\ -F client_id=CLIENT_ID \\ -F client_secret=CLIENT_SECRET \\ -F code=RETURNED_CODE \\ -F redirect_uri=REDIRECT_URL \\ -X POST BASE_URL/oauth/token ```  ### 2. grant_type=password  E-posta ve şifre ile access_token almanız için aşağıdaki istekte size özel alanları doldurarak POST isteği atmanız gerekmektedir.  ```bash curl -F grant_type=password \\ -F client_id=CLIENT_ID \\ -F client_secret=CLIENT_SECRET \\ -F username=YOUREMAIL \\ -F password=YOURPASSWORD \\ -F redirect_uri=urn:ietf:wg:oauth:2.0:oob \\ -X POST BASE_URL/oauth/token ```  ### Sonuç  Her iki yöntem sonucunda size aşağıdaki gibi bir sonuç dönecektir:  ```json {  \"access_token\": \"XYZXYZXYZ\",  \"token_type\": \"bearer\",  \"expires_in\": 7200,  \"refresh_token\": \"ABCABCABC\" } ```  Burada dönen `access_token`'ı API endpointlerine ulaşmak için gönderdiğiniz sorgulara `Authorization` header'ı olarak `Bearer XYZXYZXYZ` şeklinde eklemeniz gerekiyor.   #### Refresh token ile yeni access_token alma örneği:  `access_token` geçerliliğini 2 saat içerisinde yitirdiği için `refresh_token` ile yeni token alabilirsiniz.  ```bash curl -F grant_type=refresh_token \\ -F client_id=CLIENT_ID \\ -F client_secret=CLIENT_SECRET \\ -F refresh_token=REFRESH_TOKEN \\ -X POST BASE_URL/oauth/token ```  `refresh_token` ile yeni bir `access_token` alırken aynı zamanda yeni bir `refresh_token` da almaktasınız. Dolayısıyla, daha sonra yeniden bir `access_token` alma isteğinizde size dönen yeni `refresh_token`ı kullanmalısınız.  # SIK KULLANILAN İŞLEMLER  ## Kullanıcı Bilgisi  `access_token` aldığınız kullanıcının genel bilgilerini görmek için [/me](/#operation/showMe) adresini kullanabilirsiniz.  ## Satış Faturası Oluşturma  Satış faturası oluşturmak için bir müşteri (`contact`) `id`'si ve bir veya birden fazla ürün (`product`) `id`'sine ihtiyacınız vardır.  ### Müşteri  ##### Yeni bir müşteri ile  Eğer ihtiyaç duyduğunuz müşteri bilgisi henüz yoksa, öncelikle müşteri oluşturmanız gereklidir. Bunun için [Müşteri oluşturma](/#operation/createContact) endpoint'ini kullanmalısınız. Başarılı bir şekilde müşteri oluşturulursa size dönecek olan yanıt ihtiyaç duyacağınız müşteri `id`'sini içerir.  ##### Mevcut bir müşteri ile  Eğer daha önceden zaten oluşturduğunuz bir müşteri ile ilişkili bir satış faturası oluşturacaksanız öncelikle o müşterinin `id`'sini öğrenmeniz gerekir. Bunun için [Müşteri listesi](/#operation/listContacts) endpoint'ini kullanabilirsiniz. Müşteri listesi endpoint'i isim, e-posta, vergi numarası gibi çeşitli filtreleri destekler. Bunları kullanarak aradığınız müşteriyi bulabilirsiniz.  ### Ürün  ##### Yeni bir ürün ile  Eğer ihtiyaç duyduğunuz ürün bilgisi henüz yoksa, öncelikle ürün oluşturmanız gereklidir. Bunun için [Ürün oluşturma](/#operation/createProduct) endpoint'ini kullanmalısınız. Başarılı bir şekilde ürün oluşturulursa size dönecek olan yanıt ihtiyaç duyacağınız ürün `id`'sini içerir.  ##### Mevcut bir ürün ile  Eğer daha önceden oluşturduğunuz bir ürünü kullanarak bir satış faturası oluşturacaksanız öncelikle o ürünün `id`'sini öğrenmeniz gerekir. Bunun için [Ürün listesi](/#operation/listProducts) endpoint'ini kullanabilirsiniz. Ürün listesi endpoint'i isim, kod gibi çeşitli filtreleri destekler. Bunları kullanarak aradığınız ürünü bulabilirsiniz.  ---  İhtiyaç duyduğunuz müşteri ve ürün `id`'lerini aldıktan sonra [Satış Faturası Oluşturma](/#operation/createSalesInvoice) endpoint'i ile satış faturası oluşturabilirsiniz. Endpoint'in tanımında sağ tarafta beklediğimiz veri şekli bulunmaktadır, aşağıdaki bilgileri verinin şekli ile kıyaslamak daha açıklayıcı olabilir.  Dikkat edilecek noktalar: * `relationships` altındaki `contact`'te bulunan `id` alanına müşteri `id`'sini girmeniz gereklidir. * `relationships` altındaki `details` kısmı bir listedir (`array`) ve fatura kalemlerini temsil eder. Bu listenin her elemanının ilişkili olduğu bir ürün vardır. Yani `details` altındaki her elemanın kendine ait bir `relationships` kısmı mevcuttur. Buradaki `product` `id` alanı üstteki ürün adımlarında elde ettiğiniz `id`'yi koymanız gereken yerdir.  ## Satış Faturasına Tahsilat Ekleme  [Tahsilat ekleme](/#operation/paySalesInvoice) kısmındaki ilgili alanları doldurarak satış faturasına tahsilat ekleyebilirsiniz.  ## Satış Faturasının Tahsilatını Silme  Bir satış faturasının tahsilatını silmek aslında o tahsilatı oluşturan para akış işlemini silmek demektir. Bir işlemi silmeden önce o işlemin `id`'sine ihtiyacınız vardır.  Bir satış faturasına ait tahsilatları almak için [Satış faturası bilgilerini alma (show)](/#operation/showSalesInvoice) endpoint'ine istek atarken `?include=payments` parametresini de eklemelisiniz. Bu size satış faturası bilgilerine ilave olarak tahsilatları da verir.  Tahsilatlar ile birlikte o tahsilatları oluşturan işlemleri de almak için yine aynı endpoint'e `?include=payments.transaction` parametresini ekleyerek istek yapmanız gerekir. Bu size hem satış faturası bilgilerini, hem tahsilat bilgilerini hem de tahsilatı oluşturan işlemlerin bilgilerini verir.  `?include=payments.transaction` parametresini kullanarak yaptığınız istek ile işlem (`transaction`) `id`'sini aldıktan sonra [işlem silme](/#operation/deleteTransaction) endpoint'inde bu `id`'yi kullanarak silme işlemini yapabilirsiniz.  ## Satış Faturası Resmileştirme  Oluşturduğunuz bir satış faturası varsa onu e-Arşiv veya e-Fatura olarak resmileştirmek için aşağıdakileri yapmanız gereklidir.  1. Öncelikle müşterinizin e-Fatura kullanıcısı olup olmadığını öğrenmelisiniz. Bunun için müşterinizin e-Fatura gelen kutusu olup olmadığına bakmak gereklidir. [e-Fatura gelen kutusu](/#operation/listEInvoiceInboxes) endpoint'ine müşterinin vkn'sini kullanarak bir istek yaptığınızda eğer bir gelen kutusu olduğuna dair yanıt alıyorsanız müşteri e-Fatura kullanıcısıdır. Müşteri e-Fatura kullanıcısı ise resmileştirme için e-Fatura oluşturmak, e-Fatura kullanıcısı değilse e-Arşiv oluşturmak gereklidir. Oluşturduğunuz e-Fatura, e-Arşiv ve e-Smm’nin düzenleme tarihi e-Fatura’ya geçiş sağladığınız aktivasyon tarihinden sonra olmalıdır. Aynı zamanda oluşturduğunuz e-Fatura’nın düzenleme tarihi alıcının etiketi kullanmaya başladığı tarihten de önce olamaz. Alıcının etiketi kullanmaya başladığı tarihi e-Fatura gelen kutusunu çekerek görüntüleyebilirsiniz. 2. e-Fatura veya e-Arşiv oluşturma:    * Önceki adımda müşterinin e-Fatura kullanıcısı olduğu öğrenildiyse,  [e-Fatura oluşturma endpoint'i](/#operation/createEInvoice) kullanılarak e-Fatura oluşturmak gereklidir.    * Önceki adımda müşterinin e-Arşiv kullanıcısı olduğu öğrenildiyse,  [e-Arşiv oluşturma endpoint'i](/#operation/createEArchive) kullanılarak e-Arşiv oluşturmak gereklidir.     e-Fatura ve e-Arşiv oluşturma işlemi synchronous değildir. Yani istek arka planda yerine getirilir. Bu yüzden e-Fatura veya e-Arşiv oluşturma endpoint'leri cevap olarak oluşturma işleminin durumunu takip edebileceğiniz bir işlem `id`'si döner. Bu işlem `id`'sini [sorgulama](/#tag/TrackableJobs) endpoint'inde belirli aralıklarla kullanıp oluşturma işleminin durumunu takip etmeniz gerekmektedir. İşlem durumu ile ilgili aşağıdaki yanıtları alabilirsiniz:    * `status: \"pending\"` işlemin sırada olduğunu, henüz başlamadığını gösterir.    * `status: \"running\"` işlemin yapılmakta olduğunu ancak henüz sonuçlanmadığını gösterir.    * `status: \"error\"` işlemde bir hata olduğu anlamına gelir. Dönen yanıtta hata mesajını inceleyebilirsiniz.    * `status: \"done\"` işlemin başarılı bir şekilde sonuçlandığını gösterir. 4. e-Fatura / e-Arşiv işleminin başarılı bir şekilde sonuçlandığını gördükten sonra e-Fatura / e-Arşiv bilgilerini almak için [Satış faturası bilgilerini alma (show)](/#operation/showSalesInvoice) endpoint'ine `?include=active_e_document` parametresi ile istek yapmanız gerekmektedir. Buradan sıradaki adımda ihtiyaç duyacağınız e-Fatura / e-Arşiv `id`'lerini ve başka bilgileri de alabilirsiniz. 5. e-Fatura / e-Arşiv başarılı bir resmileştirildikten sonra müşterilerinize PDF olarak göndermek isteyebilirsiniz. Bunun için:    * e-Arşiv için, 4. adımda elde edeceğiniz e-Arşiv `id`'sini kullanarak [e-Arşiv PDF](/#operation/showEArchivePdf) endpoint'ine istek atabilirsiniz. Bu endpoint PDF henüz yoksa boş bir yanıt ile birlikte 204 döner. Yani 204 almayana kadar belirli aralıklarla bu endpoint'e istek yapmanız gerekmektedir. Geçerli yanıt aldığınızda size dönecek olan PDF URL 1 saat için geçerlidir. Bu yüzden bu linki direk olarak müşterinizle **paylaşmamalısınız**. İndirip müşterinize kendiniz göndermelisiniz.    * e-Arşiv için anlatılan senaryonun aynısı e-Fatura için de geçerlidir. Tek farklı kısım isteği yapacağınız endpoint'dir: [e-Fatura PDF](/#operation/showEInvoicePdf)  ## İrsaliye Oluşturma  İrsaliye oluşturmak için bir müşteri/tedarikçi (`contact`) `id`'si ve bir veya birden fazla ürün (`product`) `id`'sine ihtiyacınız vardır.  ### Müşteri/Tedarikçi  ##### Yeni bir müşteri/tedarikçi ile  Eğer ihtiyaç duyduğunuz müşteri/tedarikçi bilgisi henüz yoksa, öncelikle müşteri/tedarikçi oluşturmanız gereklidir. Bunun için [Müşteri/Tedarikçi oluşturma](/#operation/createContact) endpoint'ini kullanmalısınız. Başarılı bir şekilde müşteri/tedarikçi oluşturulursa size dönecek olan yanıt ihtiyaç duyacağınız müşteri/tedarikçi `id`'sini içerir.  ##### Mevcut bir müşteri/tedarikçi ile  Eğer daha önceden zaten oluşturduğunuz bir müşteri/tedarikçi ile ilişkili bir irsaliye oluşturacaksanız öncelikle o müşteri/tedarikçinin `id`'sini öğrenmeniz gerekir. Bunun için [Müşteri/tedarikçi listesi](/#operation/listContacts) endpoint'ini kullanabilirsiniz. Müşteri/tedarikçi listesi endpoint'i isim, e-posta, vergi numarası gibi çeşitli filtreleri destekler. Bunları kullanarak aradığınız müşteri/tedarikçiyi bulabilirsiniz.  ### Ürün  ##### Yeni bir ürün ile  Eğer ihtiyaç duyduğunuz ürün bilgisi henüz yoksa, öncelikle ürün oluşturmanız gereklidir. Bunun için [Ürün oluşturma](/#operation/createProduct) endpoint'ini kullanmalısınız. Başarılı bir şekilde ürün oluşturulursa size dönecek olan yanıt ihtiyaç duyacağınız ürün `id`'sini içerir.  ##### Mevcut bir ürün ile  Eğer daha önceden oluşturduğunuz bir ürünü kullanarak bir irsaliye oluşturacaksanız öncelikle o ürünün `id`'sini öğrenmeniz gerekir. Bunun için [Ürün listesi](/#operation/listProducts) endpoint'ini kullanabilirsiniz. Ürün listesi endpoint'i isim, kod gibi çeşitli filtreleri destekler. Bunları kullanarak aradığınız ürünü bulabilirsiniz.  ---  İhtiyaç duyduğunuz müşteri/tedarikçi ve ürün `id`'lerini aldıktan sonra [İrsaliye Oluşturma](/#operation/createShipmentDocument) endpoint'i ile irsaliye oluşturabilirsiniz. Endpoint'in tanımında sağ tarafta beklediğimiz veri şekli bulunmaktadır, aşağıdaki bilgileri verinin şekli ile kıyaslamak daha açıklayıcı olabilir.  Dikkat edilecek noktalar: * `relationships` altındaki `contact`'te bulunan `id` alanına müşteri/tedarikçi `id`'sini girmeniz gereklidir. * `relationships` altındaki `stock_movements` kısmı bir listedir (`array`) ve irsaliye kalemlerini temsil eder. Bu listenin her elemanının ilişkili olduğu bir ürün vardır. Yani `stock_movements` altındaki her elemanın kendine ait bir `relationships` kısmı mevcuttur. Buradaki `product` `id` alanı üstteki ürün adımlarında elde ettiğiniz `id`'yi koymanız gereken yerdir. 
 *
 * OpenAPI spec version: 4.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.15
 *
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Account', 'model/AccountAttributes', 'model/AccountDebitCreditTransactionForm', 'model/AccountDebitCreditTransactionFormAttributes', 'model/AccountForm', 'model/AccountForm1', 'model/Address', 'model/AddressAttributes', 'model/AddressRelationships', 'model/AddressRelationshipsAddressable', 'model/AddressRelationshipsAddressableData', 'model/BankFee', 'model/BankFeeAttributes', 'model/BankFeeForm', 'model/BankFeeForm1', 'model/Company', 'model/CompanyAttributes', 'model/CompanyIdaccountsData', 'model/CompanyIdaccountsiddebitTransactionsData', 'model/CompanyIdbankFeesData', 'model/CompanyIdbankFeesDataRelationships', 'model/CompanyIdbankFeesDataRelationshipsCategory', 'model/CompanyIdbankFeesDataRelationshipsCategoryData', 'model/CompanyIdbankFeesDataRelationshipsTags', 'model/CompanyIdbankFeesDataRelationshipsTagsData', 'model/CompanyIdbankFeesidpaymentsData', 'model/CompanyIdcontactsData', 'model/CompanyIdcontactsDataRelationships', 'model/CompanyIdcontactsDataRelationshipsContactPeople', 'model/CompanyIdcontactsDataRelationshipsContactPeopleData', 'model/CompanyIdcontactsidcontactCreditTransactionsData', 'model/CompanyIdcontactsidcontactDebitTransactionsData', 'model/CompanyIdeArchivesData', 'model/CompanyIdeArchivesDataRelationships', 'model/CompanyIdeArchivesDataRelationshipsSalesInvoice', 'model/CompanyIdeArchivesDataRelationshipsSalesInvoiceData', 'model/CompanyIdeInvoicesData', 'model/CompanyIdeInvoicesDataRelationships', 'model/CompanyIdemployeesData', 'model/CompanyIdemployeesDataRelationships', 'model/CompanyIditemCategoriesData', 'model/CompanyIdproductsData', 'model/CompanyIdpurchaseBillsbasicData', 'model/CompanyIdpurchaseBillsbasicDataRelationships', 'model/CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee', 'model/CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData', 'model/CompanyIdpurchaseBillsbasicDataRelationshipsSupplier', 'model/CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData', 'model/CompanyIdpurchaseBillsdetailedData', 'model/CompanyIdpurchaseBillsdetailedDataRelationships', 'model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetails', 'model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData', 'model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships', 'model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct', 'model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData', 'model/CompanyIdsalariesData', 'model/CompanyIdsalariesDataRelationships', 'model/CompanyIdsalesInvoicesData', 'model/CompanyIdsalesInvoicesDataRelationships', 'model/CompanyIdsalesInvoicesDataRelationshipsDetails', 'model/CompanyIdsalesInvoicesDataRelationshipsDetailsData', 'model/CompanyIdsalesInvoicesDataRelationshipsSalesOffer', 'model/CompanyIdsalesInvoicesDataRelationshipsSalesOfferData', 'model/CompanyIdshipmentDocumentsData', 'model/CompanyIdshipmentDocumentsDataRelationships', 'model/CompanyIdshipmentDocumentsDataRelationshipsContact', 'model/CompanyIdshipmentDocumentsDataRelationshipsContactData', 'model/CompanyIdshipmentDocumentsDataRelationshipsStockMovements', 'model/CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData', 'model/CompanyIdtagsData', 'model/CompanyIdtaxesData', 'model/CompanyRelationships', 'model/CompanyRelationshipsAddress', 'model/CompanyRelationshipsAddressData', 'model/CompanyRelationshipsOwner', 'model/CompanyRelationshipsOwnerData', 'model/Contact', 'model/ContactAttributes', 'model/ContactCollectionForm', 'model/ContactCollectionFormAttributes', 'model/ContactForm', 'model/ContactForm1', 'model/ContactPaymentForm', 'model/ContactPaymentFormAttributes', 'model/ContactPerson', 'model/ContactPersonAttributes', 'model/ContactRelationships', 'model/ContactRelationshipsContactPeople', 'model/ContactRelationshipsContactPeopleData', 'model/ContactRelationshipsContactPortal', 'model/ContactRelationshipsContactPortalData', 'model/EArchive', 'model/EArchiveAttributes', 'model/EArchiveForm', 'model/EArchiveFormAttributes', 'model/EArchiveFormAttributesInternetSale', 'model/EArchiveFormAttributesShipment', 'model/EDocumentCommonForm', 'model/EDocumentCommonFormAttributes', 'model/EDocumentCommonFormAttributesExciseDutyCodes', 'model/EDocumentPdf', 'model/EDocumentPdfAttributes', 'model/EInvoice', 'model/EInvoiceAttributes', 'model/EInvoiceForm', 'model/EInvoiceFormAttributes', 'model/EInvoiceInbox', 'model/EInvoiceInboxAttributes', 'model/EInvoiceRelationships', 'model/EInvoiceRelationshipsInvoice', 'model/EInvoiceRelationshipsInvoiceData', 'model/Employee', 'model/EmployeeAttributes', 'model/EmployeeForm', 'model/EmployeeForm1', 'model/EmployeeRelationships', 'model/EmployeeRelationshipsManagedByUserRole', 'model/EmployeeRelationshipsManagedByUserRoleData', 'model/Error', 'model/InlineResponse200', 'model/InlineResponse2001', 'model/InlineResponse20010', 'model/InlineResponse20011', 'model/InlineResponse20011Included', 'model/InlineResponse20012', 'model/InlineResponse20012Included', 'model/InlineResponse20013', 'model/InlineResponse20013Included', 'model/InlineResponse20014', 'model/InlineResponse20014Included', 'model/InlineResponse20015', 'model/InlineResponse20015Included', 'model/InlineResponse20016', 'model/InlineResponse20017', 'model/InlineResponse2001Included', 'model/InlineResponse2002', 'model/InlineResponse2002Included', 'model/InlineResponse2003', 'model/InlineResponse2003Included', 'model/InlineResponse2004', 'model/InlineResponse2004Included', 'model/InlineResponse2005', 'model/InlineResponse2006', 'model/InlineResponse2007', 'model/InlineResponse2007Included', 'model/InlineResponse2008', 'model/InlineResponse2008Included', 'model/InlineResponse2009', 'model/InlineResponse2009Included', 'model/InlineResponse201', 'model/InlineResponse2011', 'model/InlineResponse20110', 'model/InlineResponse20111', 'model/InlineResponse20112', 'model/InlineResponse20113', 'model/InlineResponse20114', 'model/InlineResponse2012', 'model/InlineResponse2012Included', 'model/InlineResponse2013', 'model/InlineResponse2013Included', 'model/InlineResponse2014', 'model/InlineResponse2015', 'model/InlineResponse2016', 'model/InlineResponse2017', 'model/InlineResponse2018', 'model/InlineResponse2019', 'model/InlineResponse400', 'model/ItemCategory', 'model/ItemCategoryAttributes', 'model/ItemCategoryForm', 'model/ItemCategoryForm1', 'model/ItemCategoryRelationships', 'model/ItemCategoryRelationshipsSubcategories', 'model/ListMeta', 'model/Me', 'model/MeAttributes', 'model/MeRelationships', 'model/MeRelationshipsCompanies', 'model/MeRelationshipsProfile', 'model/MeRelationshipsProfileData', 'model/MeRelationshipsUserRoles', 'model/Payment', 'model/PaymentAttributes', 'model/PaymentForm', 'model/PaymentForm1', 'model/PaymentForm2', 'model/PaymentForm3', 'model/PaymentForm4', 'model/PaymentFormAttributes', 'model/PaymentRelationships', 'model/PaymentRelationshipsPayable', 'model/PaymentRelationshipsPayableData', 'model/PaymentRelationshipsTransaction', 'model/PaymentRelationshipsTransactionData', 'model/Product', 'model/ProductAttributes', 'model/ProductForm', 'model/ProductForm1', 'model/Profile', 'model/ProfileAttributes', 'model/ProfileRelationships', 'model/PurchaseBill', 'model/PurchaseBillAttributes', 'model/PurchaseBillBasicForm', 'model/PurchaseBillBasicFormAttributes', 'model/PurchaseBillDetail', 'model/PurchaseBillDetailAttributes', 'model/PurchaseBillDetailedForm', 'model/PurchaseBillDetailedFormAttributes', 'model/PurchaseBillForm', 'model/PurchaseBillForm1', 'model/PurchaseBillForm2', 'model/PurchaseBillForm3', 'model/PurchaseBillRelationships', 'model/PurchaseBillRelationshipsActiveEDocument', 'model/PurchaseBillRelationshipsActiveEDocumentData', 'model/PurchaseBillRelationshipsDetails', 'model/PurchaseBillRelationshipsDetailsData', 'model/PurchaseBillRelationshipsPayTo', 'model/PurchaseBillRelationshipsPayToData', 'model/PurchaseBillRelationshipsPayments', 'model/PurchaseBillRelationshipsPaymentsData', 'model/PurchaseBillRelationshipsRecurrencePlan', 'model/PurchaseBillRelationshipsRecurrencePlanData', 'model/Salary', 'model/SalaryAttributes', 'model/SalaryForm', 'model/SalaryForm1', 'model/SalesInvoice', 'model/SalesInvoiceAttributes', 'model/SalesInvoiceDetail', 'model/SalesInvoiceDetailAttributes', 'model/SalesInvoiceForm', 'model/SalesInvoiceForm1', 'model/SalesInvoiceForm2', 'model/SalesInvoiceRelationships', 'model/SalesInvoiceRelationshipsActiveEDocument', 'model/SalesInvoiceRelationshipsActiveEDocumentData', 'model/SalesInvoiceRelationshipsDetails', 'model/SalesInvoiceRelationshipsDetailsData', 'model/SalesInvoiceRelationshipsSharings', 'model/SalesInvoiceRelationshipsSharingsData', 'model/SalesOffer', 'model/SalesOfferAttributes', 'model/ShipmentDocument', 'model/ShipmentDocumentAttributes', 'model/ShipmentDocumentForm', 'model/ShipmentDocumentForm1', 'model/ShipmentDocumentRelationships', 'model/ShipmentDocumentRelationshipsInvoices', 'model/ShipmentDocumentRelationshipsStockMovements', 'model/ShipmentDocumentRelationshipsStockMovementsData', 'model/StockMovement', 'model/StockMovementAttributes', 'model/StockMovementRelationships', 'model/StockMovementRelationshipsSource', 'model/StockMovementRelationshipsSourceData', 'model/Tag', 'model/TagAttributes', 'model/TagForm', 'model/TagForm1', 'model/Tax', 'model/TaxAttributes', 'model/TaxForm', 'model/TaxForm1', 'model/TrackableJob', 'model/TrackableJobAttributes', 'model/Transaction', 'model/TransactionAttributes', 'model/TransactionForm', 'model/TransactionForm1', 'model/TransactionForm2', 'model/TransactionForm3', 'model/TransactionRelationships', 'model/TransactionRelationshipsDebitAccount', 'model/TransactionRelationshipsDebitAccountData', 'model/UserRole', 'model/UserRoleAttributes', 'model/UserRoleRelationships', 'parasut/AccountsApi', 'parasut/ApiHomeApi', 'parasut/BankFeesApi', 'parasut/ContactsApi', 'parasut/EArchivesApi', 'parasut/EInvoiceInboxesApi', 'parasut/EInvoicesApi', 'parasut/EmployeesApi', 'parasut/ItemCategoriesApi', 'parasut/ProductsApi', 'parasut/PurchaseBillsApi', 'parasut/SalariesApi', 'parasut/SalesInvoicesApi', 'parasut/ShipmentDocumentsApi', 'parasut/StockMovementsApi', 'parasut/TagsApi', 'parasut/TaxesApi', 'parasut/TrackableJobsApi', 'parasut/TransactionsApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/Account'), require('./model/AccountAttributes'), require('./model/AccountDebitCreditTransactionForm'), require('./model/AccountDebitCreditTransactionFormAttributes'), require('./model/AccountForm'), require('./model/AccountForm1'), require('./model/Address'), require('./model/AddressAttributes'), require('./model/AddressRelationships'), require('./model/AddressRelationshipsAddressable'), require('./model/AddressRelationshipsAddressableData'), require('./model/BankFee'), require('./model/BankFeeAttributes'), require('./model/BankFeeForm'), require('./model/BankFeeForm1'), require('./model/Company'), require('./model/CompanyAttributes'), require('./model/CompanyIdaccountsData'), require('./model/CompanyIdaccountsiddebitTransactionsData'), require('./model/CompanyIdbankFeesData'), require('./model/CompanyIdbankFeesDataRelationships'), require('./model/CompanyIdbankFeesDataRelationshipsCategory'), require('./model/CompanyIdbankFeesDataRelationshipsCategoryData'), require('./model/CompanyIdbankFeesDataRelationshipsTags'), require('./model/CompanyIdbankFeesDataRelationshipsTagsData'), require('./model/CompanyIdbankFeesidpaymentsData'), require('./model/CompanyIdcontactsData'), require('./model/CompanyIdcontactsDataRelationships'), require('./model/CompanyIdcontactsDataRelationshipsContactPeople'), require('./model/CompanyIdcontactsDataRelationshipsContactPeopleData'), require('./model/CompanyIdcontactsidcontactCreditTransactionsData'), require('./model/CompanyIdcontactsidcontactDebitTransactionsData'), require('./model/CompanyIdeArchivesData'), require('./model/CompanyIdeArchivesDataRelationships'), require('./model/CompanyIdeArchivesDataRelationshipsSalesInvoice'), require('./model/CompanyIdeArchivesDataRelationshipsSalesInvoiceData'), require('./model/CompanyIdeInvoicesData'), require('./model/CompanyIdeInvoicesDataRelationships'), require('./model/CompanyIdemployeesData'), require('./model/CompanyIdemployeesDataRelationships'), require('./model/CompanyIditemCategoriesData'), require('./model/CompanyIdproductsData'), require('./model/CompanyIdpurchaseBillsbasicData'), require('./model/CompanyIdpurchaseBillsbasicDataRelationships'), require('./model/CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee'), require('./model/CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData'), require('./model/CompanyIdpurchaseBillsbasicDataRelationshipsSupplier'), require('./model/CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData'), require('./model/CompanyIdpurchaseBillsdetailedData'), require('./model/CompanyIdpurchaseBillsdetailedDataRelationships'), require('./model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetails'), require('./model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData'), require('./model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships'), require('./model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct'), require('./model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData'), require('./model/CompanyIdsalariesData'), require('./model/CompanyIdsalariesDataRelationships'), require('./model/CompanyIdsalesInvoicesData'), require('./model/CompanyIdsalesInvoicesDataRelationships'), require('./model/CompanyIdsalesInvoicesDataRelationshipsDetails'), require('./model/CompanyIdsalesInvoicesDataRelationshipsDetailsData'), require('./model/CompanyIdsalesInvoicesDataRelationshipsSalesOffer'), require('./model/CompanyIdsalesInvoicesDataRelationshipsSalesOfferData'), require('./model/CompanyIdshipmentDocumentsData'), require('./model/CompanyIdshipmentDocumentsDataRelationships'), require('./model/CompanyIdshipmentDocumentsDataRelationshipsContact'), require('./model/CompanyIdshipmentDocumentsDataRelationshipsContactData'), require('./model/CompanyIdshipmentDocumentsDataRelationshipsStockMovements'), require('./model/CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData'), require('./model/CompanyIdtagsData'), require('./model/CompanyIdtaxesData'), require('./model/CompanyRelationships'), require('./model/CompanyRelationshipsAddress'), require('./model/CompanyRelationshipsAddressData'), require('./model/CompanyRelationshipsOwner'), require('./model/CompanyRelationshipsOwnerData'), require('./model/Contact'), require('./model/ContactAttributes'), require('./model/ContactCollectionForm'), require('./model/ContactCollectionFormAttributes'), require('./model/ContactForm'), require('./model/ContactForm1'), require('./model/ContactPaymentForm'), require('./model/ContactPaymentFormAttributes'), require('./model/ContactPerson'), require('./model/ContactPersonAttributes'), require('./model/ContactRelationships'), require('./model/ContactRelationshipsContactPeople'), require('./model/ContactRelationshipsContactPeopleData'), require('./model/ContactRelationshipsContactPortal'), require('./model/ContactRelationshipsContactPortalData'), require('./model/EArchive'), require('./model/EArchiveAttributes'), require('./model/EArchiveForm'), require('./model/EArchiveFormAttributes'), require('./model/EArchiveFormAttributesInternetSale'), require('./model/EArchiveFormAttributesShipment'), require('./model/EDocumentCommonForm'), require('./model/EDocumentCommonFormAttributes'), require('./model/EDocumentCommonFormAttributesExciseDutyCodes'), require('./model/EDocumentPdf'), require('./model/EDocumentPdfAttributes'), require('./model/EInvoice'), require('./model/EInvoiceAttributes'), require('./model/EInvoiceForm'), require('./model/EInvoiceFormAttributes'), require('./model/EInvoiceInbox'), require('./model/EInvoiceInboxAttributes'), require('./model/EInvoiceRelationships'), require('./model/EInvoiceRelationshipsInvoice'), require('./model/EInvoiceRelationshipsInvoiceData'), require('./model/Employee'), require('./model/EmployeeAttributes'), require('./model/EmployeeForm'), require('./model/EmployeeForm1'), require('./model/EmployeeRelationships'), require('./model/EmployeeRelationshipsManagedByUserRole'), require('./model/EmployeeRelationshipsManagedByUserRoleData'), require('./model/Error'), require('./model/InlineResponse200'), require('./model/InlineResponse2001'), require('./model/InlineResponse20010'), require('./model/InlineResponse20011'), require('./model/InlineResponse20011Included'), require('./model/InlineResponse20012'), require('./model/InlineResponse20012Included'), require('./model/InlineResponse20013'), require('./model/InlineResponse20013Included'), require('./model/InlineResponse20014'), require('./model/InlineResponse20014Included'), require('./model/InlineResponse20015'), require('./model/InlineResponse20015Included'), require('./model/InlineResponse20016'), require('./model/InlineResponse20017'), require('./model/InlineResponse2001Included'), require('./model/InlineResponse2002'), require('./model/InlineResponse2002Included'), require('./model/InlineResponse2003'), require('./model/InlineResponse2003Included'), require('./model/InlineResponse2004'), require('./model/InlineResponse2004Included'), require('./model/InlineResponse2005'), require('./model/InlineResponse2006'), require('./model/InlineResponse2007'), require('./model/InlineResponse2007Included'), require('./model/InlineResponse2008'), require('./model/InlineResponse2008Included'), require('./model/InlineResponse2009'), require('./model/InlineResponse2009Included'), require('./model/InlineResponse201'), require('./model/InlineResponse2011'), require('./model/InlineResponse20110'), require('./model/InlineResponse20111'), require('./model/InlineResponse20112'), require('./model/InlineResponse20113'), require('./model/InlineResponse20114'), require('./model/InlineResponse2012'), require('./model/InlineResponse2012Included'), require('./model/InlineResponse2013'), require('./model/InlineResponse2013Included'), require('./model/InlineResponse2014'), require('./model/InlineResponse2015'), require('./model/InlineResponse2016'), require('./model/InlineResponse2017'), require('./model/InlineResponse2018'), require('./model/InlineResponse2019'), require('./model/InlineResponse400'), require('./model/ItemCategory'), require('./model/ItemCategoryAttributes'), require('./model/ItemCategoryForm'), require('./model/ItemCategoryForm1'), require('./model/ItemCategoryRelationships'), require('./model/ItemCategoryRelationshipsSubcategories'), require('./model/ListMeta'), require('./model/Me'), require('./model/MeAttributes'), require('./model/MeRelationships'), require('./model/MeRelationshipsCompanies'), require('./model/MeRelationshipsProfile'), require('./model/MeRelationshipsProfileData'), require('./model/MeRelationshipsUserRoles'), require('./model/Payment'), require('./model/PaymentAttributes'), require('./model/PaymentForm'), require('./model/PaymentForm1'), require('./model/PaymentForm2'), require('./model/PaymentForm3'), require('./model/PaymentForm4'), require('./model/PaymentFormAttributes'), require('./model/PaymentRelationships'), require('./model/PaymentRelationshipsPayable'), require('./model/PaymentRelationshipsPayableData'), require('./model/PaymentRelationshipsTransaction'), require('./model/PaymentRelationshipsTransactionData'), require('./model/Product'), require('./model/ProductAttributes'), require('./model/ProductForm'), require('./model/ProductForm1'), require('./model/Profile'), require('./model/ProfileAttributes'), require('./model/ProfileRelationships'), require('./model/PurchaseBill'), require('./model/PurchaseBillAttributes'), require('./model/PurchaseBillBasicForm'), require('./model/PurchaseBillBasicFormAttributes'), require('./model/PurchaseBillDetail'), require('./model/PurchaseBillDetailAttributes'), require('./model/PurchaseBillDetailedForm'), require('./model/PurchaseBillDetailedFormAttributes'), require('./model/PurchaseBillForm'), require('./model/PurchaseBillForm1'), require('./model/PurchaseBillForm2'), require('./model/PurchaseBillForm3'), require('./model/PurchaseBillRelationships'), require('./model/PurchaseBillRelationshipsActiveEDocument'), require('./model/PurchaseBillRelationshipsActiveEDocumentData'), require('./model/PurchaseBillRelationshipsDetails'), require('./model/PurchaseBillRelationshipsDetailsData'), require('./model/PurchaseBillRelationshipsPayTo'), require('./model/PurchaseBillRelationshipsPayToData'), require('./model/PurchaseBillRelationshipsPayments'), require('./model/PurchaseBillRelationshipsPaymentsData'), require('./model/PurchaseBillRelationshipsRecurrencePlan'), require('./model/PurchaseBillRelationshipsRecurrencePlanData'), require('./model/Salary'), require('./model/SalaryAttributes'), require('./model/SalaryForm'), require('./model/SalaryForm1'), require('./model/SalesInvoice'), require('./model/SalesInvoiceAttributes'), require('./model/SalesInvoiceDetail'), require('./model/SalesInvoiceDetailAttributes'), require('./model/SalesInvoiceForm'), require('./model/SalesInvoiceForm1'), require('./model/SalesInvoiceForm2'), require('./model/SalesInvoiceRelationships'), require('./model/SalesInvoiceRelationshipsActiveEDocument'), require('./model/SalesInvoiceRelationshipsActiveEDocumentData'), require('./model/SalesInvoiceRelationshipsDetails'), require('./model/SalesInvoiceRelationshipsDetailsData'), require('./model/SalesInvoiceRelationshipsSharings'), require('./model/SalesInvoiceRelationshipsSharingsData'), require('./model/SalesOffer'), require('./model/SalesOfferAttributes'), require('./model/ShipmentDocument'), require('./model/ShipmentDocumentAttributes'), require('./model/ShipmentDocumentForm'), require('./model/ShipmentDocumentForm1'), require('./model/ShipmentDocumentRelationships'), require('./model/ShipmentDocumentRelationshipsInvoices'), require('./model/ShipmentDocumentRelationshipsStockMovements'), require('./model/ShipmentDocumentRelationshipsStockMovementsData'), require('./model/StockMovement'), require('./model/StockMovementAttributes'), require('./model/StockMovementRelationships'), require('./model/StockMovementRelationshipsSource'), require('./model/StockMovementRelationshipsSourceData'), require('./model/Tag'), require('./model/TagAttributes'), require('./model/TagForm'), require('./model/TagForm1'), require('./model/Tax'), require('./model/TaxAttributes'), require('./model/TaxForm'), require('./model/TaxForm1'), require('./model/TrackableJob'), require('./model/TrackableJobAttributes'), require('./model/Transaction'), require('./model/TransactionAttributes'), require('./model/TransactionForm'), require('./model/TransactionForm1'), require('./model/TransactionForm2'), require('./model/TransactionForm3'), require('./model/TransactionRelationships'), require('./model/TransactionRelationshipsDebitAccount'), require('./model/TransactionRelationshipsDebitAccountData'), require('./model/UserRole'), require('./model/UserRoleAttributes'), require('./model/UserRoleRelationships'), require('./parasut/AccountsApi'), require('./parasut/ApiHomeApi'), require('./parasut/BankFeesApi'), require('./parasut/ContactsApi'), require('./parasut/EArchivesApi'), require('./parasut/EInvoiceInboxesApi'), require('./parasut/EInvoicesApi'), require('./parasut/EmployeesApi'), require('./parasut/ItemCategoriesApi'), require('./parasut/ProductsApi'), require('./parasut/PurchaseBillsApi'), require('./parasut/SalariesApi'), require('./parasut/SalesInvoicesApi'), require('./parasut/ShipmentDocumentsApi'), require('./parasut/StockMovementsApi'), require('./parasut/TagsApi'), require('./parasut/TaxesApi'), require('./parasut/TrackableJobsApi'), require('./parasut/TransactionsApi'));
  }
}(function(ApiClient, Account, AccountAttributes, AccountDebitCreditTransactionForm, AccountDebitCreditTransactionFormAttributes, AccountForm, AccountForm1, Address, AddressAttributes, AddressRelationships, AddressRelationshipsAddressable, AddressRelationshipsAddressableData, BankFee, BankFeeAttributes, BankFeeForm, BankFeeForm1, Company, CompanyAttributes, CompanyIdaccountsData, CompanyIdaccountsiddebitTransactionsData, CompanyIdbankFeesData, CompanyIdbankFeesDataRelationships, CompanyIdbankFeesDataRelationshipsCategory, CompanyIdbankFeesDataRelationshipsCategoryData, CompanyIdbankFeesDataRelationshipsTags, CompanyIdbankFeesDataRelationshipsTagsData, CompanyIdbankFeesidpaymentsData, CompanyIdcontactsData, CompanyIdcontactsDataRelationships, CompanyIdcontactsDataRelationshipsContactPeople, CompanyIdcontactsDataRelationshipsContactPeopleData, CompanyIdcontactsidcontactCreditTransactionsData, CompanyIdcontactsidcontactDebitTransactionsData, CompanyIdeArchivesData, CompanyIdeArchivesDataRelationships, CompanyIdeArchivesDataRelationshipsSalesInvoice, CompanyIdeArchivesDataRelationshipsSalesInvoiceData, CompanyIdeInvoicesData, CompanyIdeInvoicesDataRelationships, CompanyIdemployeesData, CompanyIdemployeesDataRelationships, CompanyIditemCategoriesData, CompanyIdproductsData, CompanyIdpurchaseBillsbasicData, CompanyIdpurchaseBillsbasicDataRelationships, CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee, CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData, CompanyIdpurchaseBillsbasicDataRelationshipsSupplier, CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData, CompanyIdpurchaseBillsdetailedData, CompanyIdpurchaseBillsdetailedDataRelationships, CompanyIdpurchaseBillsdetailedDataRelationshipsDetails, CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData, CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships, CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct, CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData, CompanyIdsalariesData, CompanyIdsalariesDataRelationships, CompanyIdsalesInvoicesData, CompanyIdsalesInvoicesDataRelationships, CompanyIdsalesInvoicesDataRelationshipsDetails, CompanyIdsalesInvoicesDataRelationshipsDetailsData, CompanyIdsalesInvoicesDataRelationshipsSalesOffer, CompanyIdsalesInvoicesDataRelationshipsSalesOfferData, CompanyIdshipmentDocumentsData, CompanyIdshipmentDocumentsDataRelationships, CompanyIdshipmentDocumentsDataRelationshipsContact, CompanyIdshipmentDocumentsDataRelationshipsContactData, CompanyIdshipmentDocumentsDataRelationshipsStockMovements, CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData, CompanyIdtagsData, CompanyIdtaxesData, CompanyRelationships, CompanyRelationshipsAddress, CompanyRelationshipsAddressData, CompanyRelationshipsOwner, CompanyRelationshipsOwnerData, Contact, ContactAttributes, ContactCollectionForm, ContactCollectionFormAttributes, ContactForm, ContactForm1, ContactPaymentForm, ContactPaymentFormAttributes, ContactPerson, ContactPersonAttributes, ContactRelationships, ContactRelationshipsContactPeople, ContactRelationshipsContactPeopleData, ContactRelationshipsContactPortal, ContactRelationshipsContactPortalData, EArchive, EArchiveAttributes, EArchiveForm, EArchiveFormAttributes, EArchiveFormAttributesInternetSale, EArchiveFormAttributesShipment, EDocumentCommonForm, EDocumentCommonFormAttributes, EDocumentCommonFormAttributesExciseDutyCodes, EDocumentPdf, EDocumentPdfAttributes, EInvoice, EInvoiceAttributes, EInvoiceForm, EInvoiceFormAttributes, EInvoiceInbox, EInvoiceInboxAttributes, EInvoiceRelationships, EInvoiceRelationshipsInvoice, EInvoiceRelationshipsInvoiceData, Employee, EmployeeAttributes, EmployeeForm, EmployeeForm1, EmployeeRelationships, EmployeeRelationshipsManagedByUserRole, EmployeeRelationshipsManagedByUserRoleData, Error, InlineResponse200, InlineResponse2001, InlineResponse20010, InlineResponse20011, InlineResponse20011Included, InlineResponse20012, InlineResponse20012Included, InlineResponse20013, InlineResponse20013Included, InlineResponse20014, InlineResponse20014Included, InlineResponse20015, InlineResponse20015Included, InlineResponse20016, InlineResponse20017, InlineResponse2001Included, InlineResponse2002, InlineResponse2002Included, InlineResponse2003, InlineResponse2003Included, InlineResponse2004, InlineResponse2004Included, InlineResponse2005, InlineResponse2006, InlineResponse2007, InlineResponse2007Included, InlineResponse2008, InlineResponse2008Included, InlineResponse2009, InlineResponse2009Included, InlineResponse201, InlineResponse2011, InlineResponse20110, InlineResponse20111, InlineResponse20112, InlineResponse20113, InlineResponse20114, InlineResponse2012, InlineResponse2012Included, InlineResponse2013, InlineResponse2013Included, InlineResponse2014, InlineResponse2015, InlineResponse2016, InlineResponse2017, InlineResponse2018, InlineResponse2019, InlineResponse400, ItemCategory, ItemCategoryAttributes, ItemCategoryForm, ItemCategoryForm1, ItemCategoryRelationships, ItemCategoryRelationshipsSubcategories, ListMeta, Me, MeAttributes, MeRelationships, MeRelationshipsCompanies, MeRelationshipsProfile, MeRelationshipsProfileData, MeRelationshipsUserRoles, Payment, PaymentAttributes, PaymentForm, PaymentForm1, PaymentForm2, PaymentForm3, PaymentForm4, PaymentFormAttributes, PaymentRelationships, PaymentRelationshipsPayable, PaymentRelationshipsPayableData, PaymentRelationshipsTransaction, PaymentRelationshipsTransactionData, Product, ProductAttributes, ProductForm, ProductForm1, Profile, ProfileAttributes, ProfileRelationships, PurchaseBill, PurchaseBillAttributes, PurchaseBillBasicForm, PurchaseBillBasicFormAttributes, PurchaseBillDetail, PurchaseBillDetailAttributes, PurchaseBillDetailedForm, PurchaseBillDetailedFormAttributes, PurchaseBillForm, PurchaseBillForm1, PurchaseBillForm2, PurchaseBillForm3, PurchaseBillRelationships, PurchaseBillRelationshipsActiveEDocument, PurchaseBillRelationshipsActiveEDocumentData, PurchaseBillRelationshipsDetails, PurchaseBillRelationshipsDetailsData, PurchaseBillRelationshipsPayTo, PurchaseBillRelationshipsPayToData, PurchaseBillRelationshipsPayments, PurchaseBillRelationshipsPaymentsData, PurchaseBillRelationshipsRecurrencePlan, PurchaseBillRelationshipsRecurrencePlanData, Salary, SalaryAttributes, SalaryForm, SalaryForm1, SalesInvoice, SalesInvoiceAttributes, SalesInvoiceDetail, SalesInvoiceDetailAttributes, SalesInvoiceForm, SalesInvoiceForm1, SalesInvoiceForm2, SalesInvoiceRelationships, SalesInvoiceRelationshipsActiveEDocument, SalesInvoiceRelationshipsActiveEDocumentData, SalesInvoiceRelationshipsDetails, SalesInvoiceRelationshipsDetailsData, SalesInvoiceRelationshipsSharings, SalesInvoiceRelationshipsSharingsData, SalesOffer, SalesOfferAttributes, ShipmentDocument, ShipmentDocumentAttributes, ShipmentDocumentForm, ShipmentDocumentForm1, ShipmentDocumentRelationships, ShipmentDocumentRelationshipsInvoices, ShipmentDocumentRelationshipsStockMovements, ShipmentDocumentRelationshipsStockMovementsData, StockMovement, StockMovementAttributes, StockMovementRelationships, StockMovementRelationshipsSource, StockMovementRelationshipsSourceData, Tag, TagAttributes, TagForm, TagForm1, Tax, TaxAttributes, TaxForm, TaxForm1, TrackableJob, TrackableJobAttributes, Transaction, TransactionAttributes, TransactionForm, TransactionForm1, TransactionForm2, TransactionForm3, TransactionRelationships, TransactionRelationshipsDebitAccount, TransactionRelationshipsDebitAccountData, UserRole, UserRoleAttributes, UserRoleRelationships, AccountsApi, ApiHomeApi, BankFeesApi, ContactsApi, EArchivesApi, EInvoiceInboxesApi, EInvoicesApi, EmployeesApi, ItemCategoriesApi, ProductsApi, PurchaseBillsApi, SalariesApi, SalesInvoicesApi, ShipmentDocumentsApi, StockMovementsApi, TagsApi, TaxesApi, TrackableJobsApi, TransactionsApi) {
  'use strict';

  /**
   * _GR_API_HakkndaParat_APIyi_kullanmak_veya_grlerinizi_bizimle_paylamak_isterseniz_ltfen_bizimle_destekparasut_com_adresi_zerinden_iletiime_geiniz_APIyi_kullanarak_Parat_verilerine_ulaabilir_ve_kendi_yazdnz_uygulamalar_ile_entegre_edebilirsiniz__API_vastasyla_Parat_Web_arayz_ile_yaplan_hemen_her_ilemi_gerekletirebilirsiniz___API_gelitirmesinde_ounlukla_JSONAPI__httpjsonapi_org_standartlarna_uymaya_altk___Dkmantasyon_oluturulmasnda_ise_OpenAPI_Swagger_2_0_kullandk___API_hizmetimizin_BASE_URLi_httpsapi_parasut_com_eklindedir___V4_endpointlerine_ulamak_iin_httpsapi_parasut_comv4_eklinde_kullanabilirsiniz__Genel_Bilgiler__API_metodlarna_erimek_iin_baz_URL_olarak_httpsapi_parasut_comv4firma_no_adresi_kullanlr_____Bu_yapda_kullanlan_firma_no_parametresi_bilgisine_eriilmek_istenin_firmann_Parat_veritabanndaki_kayt_numarasdr_____rnein_115_numaral_firmann_mteritedariki_listesine_erimek_iin_httpsapi_parasut_comv4115contacts_adresi_kullanlr___stekleri_gnderirken_Content_Type_header_olarak_applicationjson_veya_applicationvnd_apijson_gndermelisiniz___Yeni_bir_kayt_olutururken_ilgili_kaydn_ID_parametresini_bo_gndermeli_veya_hi_gndermemelisiniz_____rnek_Sat_faturas_olutururken_data_id_bo_olmal_ama_relationships_contact_data_id_dolu_olmal_nk_gnderdiiniz_mterinizin_IDsi_daha_nceden_elinizde_bulunmaldr__Ayn_ekilde_relationships_details_data_ierisinde_tanmladnz_IDler_de_bo_olmal_nk_henz_fatura_kalemi_yaratmadnz___API_endpointlerine_ulamak_iin_aldnz_access_token_sorgulara_Authorization_header_olarak_Bearer_access_token_eklinde_gndermelisiniz___Dakikada_60_adet_istek_gnderebilirsiniz__Authentication___ReDoc_Inject_security_definitions___Parat_API_kimlik_dorulama_iin_oAuth2_kullanmaktadr__Bu_protokol_destekleyen_istemci_ktphanelerini_kullanarak_oturum_aabilir_ve_APIyi_kullanabilirsiniz_Gerekli_CLIENT_ID_CLIENT_SECRET_ve_REDIRECT_URL_bilgilerini_almak_iin_destekparasut_com_adresine_mail_atabilirsiniz_Kimlik_dorulama_ileminin_baarl_olmas_durumunda_bir_adet_kimlik_jetonu__authentication_token_ve_bir_adet_de_yenileme_jetonu__refresh_token_gnderilecektir__Kimlik_jetonu_2_saat_sreyle_geerlidir_ve_her_istekte_http_balk_bilgilerinin_ierisinde_gnderilmelidir__Bu_srenin_sonunda_kimlik_jetonu_geerliliini_yitirecektir_ve_yenileme_jetonu_kullanlarak_tekrar_retilmesi_gerekmektedir__access_token_almakaccess_token_almanz_iin_iki_farkl_seenek_bulunmaktadr_Kullanm_eklinize_bal_olarak_iki_yntemden_birini_tercih_etmelisiniz__1__grant_typeauthorization_codeBu_yntemi_kullanabilmek_iin_ncelikle_aada_belirtildii_gibi_kullancy_baarl_authentication_ileminin_ardndan_ynlendirmek_istediiniz_REDIRECT_URLi_bize_ulaarak_kayt_ettirmeniz_gerekmektedir__REDIRECT_URL_varsaylan_olarak_urnietfwgoauth2_0oob_gelmektedir_Size_zel_bir_REDIRECT_URL_tanmlamak_isterseniz_destekparasut_com_adresine_mail_atabilirsiniz_1__Kullancy_u_adrese_ynlendirin____BASE_URLoauthauthorizeclient_idCLIENT_IDredirect_uriREDIRECT_URLresponse_typecode__2__Oturum_amsa_ve_uygulamay_kabul_ederse_kullanc_sizin_tanmladnz_REDIRECT_URLe_u_ekilde_gelmesi_gerekiyor__REDIRECT_URLcodexxxxxxx3__Burada_size_gelen_code_parametresi_ile_access_token_almalsnz_bashcurl__F_grant_typeauthorization_code__F_client_idCLIENT_ID__F_client_secretCLIENT_SECRET__F_codeRETURNED_CODE__F_redirect_uriREDIRECT_URL__X_POST_BASE_URLoauthtoken_2__grant_typepasswordE_posta_ve_ifre_ile_access_token_almanz_iin_aadaki_istekte_size_zel_alanlar_doldurarak_POST_istei_atmanz_gerekmektedir_bashcurl__F_grant_typepassword__F_client_idCLIENT_ID__F_client_secretCLIENT_SECRET__F_usernameYOUREMAIL__F_passwordYOURPASSWORD__F_redirect_uriurnietfwgoauth2_0oob__X_POST_BASE_URLoauthtoken_SonuHer_iki_yntem_sonucunda_size_aadaki_gibi_bir_sonu_dnecektirjson_access_token_XYZXYZXYZ_token_type_bearer_expires_in_7200_refresh_token_ABCABCABCBurada_dnen_access_token_API_endpointlerine_ulamak_iin_gnderdiiniz_sorgulara_Authorization_header_olarak_Bearer_XYZXYZXYZ_eklinde_eklemeniz_gerekiyor__Refresh_token_ile_yeni_access_token_alma_rneiaccess_token_geerliliini_2_saat_ierisinde_yitirdii_iin_refresh_token_ile_yeni_token_alabilirsiniz_bashcurl__F_grant_typerefresh_token__F_client_idCLIENT_ID__F_client_secretCLIENT_SECRET__F_refresh_tokenREFRESH_TOKEN__X_POST_BASE_URLoauthtokenrefresh_token_ile_yeni_bir_access_token_alrken_ayn_zamanda_yeni_bir_refresh_token_da_almaktasnz__Dolaysyla_daha_sonra_yeniden_bir_access_token_alma_isteinizde_size_dnen_yeni_refresh_token_kullanmalsnz__SIK_KULLANILAN_LEMLER_Kullanc_Bilgisiaccess_token_aldnz_kullancnn_genel_bilgilerini_grmek_iin__me_operationshowMe_adresini_kullanabilirsiniz__Sat_Faturas_OluturmaSat_faturas_oluturmak_iin_bir_mteri__contact_idsi_ve_bir_veya_birden_fazla_rn__product_idsine_ihtiyacnz_vardr__Mteri_Yeni_bir_mteri_ileEer_ihtiya_duyduunuz_mteri_bilgisi_henz_yoksa_ncelikle_mteri_oluturmanz_gereklidir__Bunun_iin__Mteri_oluturma_operationcreateContact_endpointini_kullanmalsnz__Baarl_bir_ekilde_mteri_oluturulursa_size_dnecek_olan_yant_ihtiya_duyacanz_mteri_idsini_ierir__Mevcut_bir_mteri_ileEer_daha_nceden_zaten_oluturduunuz_bir_mteri_ile_ilikili_bir_sat_faturas_oluturacaksanz_ncelikle_o_mterinin_idsini_renmeniz_gerekir__Bunun_iin__Mteri_listesi_operationlistContacts_endpointini_kullanabilirsiniz__Mteri_listesi_endpointi_isim_e_posta_vergi_numaras_gibi_eitli_filtreleri_destekler__Bunlar_kullanarak_aradnz_mteriyi_bulabilirsiniz__rn_Yeni_bir_rn_ileEer_ihtiya_duyduunuz_rn_bilgisi_henz_yoksa_ncelikle_rn_oluturmanz_gereklidir__Bunun_iin__rn_oluturma_operationcreateProduct_endpointini_kullanmalsnz__Baarl_bir_ekilde_rn_oluturulursa_size_dnecek_olan_yant_ihtiya_duyacanz_rn_idsini_ierir__Mevcut_bir_rn_ileEer_daha_nceden_oluturduunuz_bir_rn_kullanarak_bir_sat_faturas_oluturacaksanz_ncelikle_o_rnn_idsini_renmeniz_gerekir__Bunun_iin__rn_listesi_operationlistProducts_endpointini_kullanabilirsiniz__rn_listesi_endpointi_isim_kod_gibi_eitli_filtreleri_destekler__Bunlar_kullanarak_aradnz_rn_bulabilirsiniz____htiya_duyduunuz_mteri_ve_rn_idlerini_aldktan_sonra__Sat_Faturas_Oluturma_operationcreateSalesInvoice_endpointi_ile_sat_faturas_oluturabilirsiniz__Endpointin_tanmnda_sa_tarafta_beklediimiz_veri_ekli_bulunmaktadr_aadaki_bilgileri_verinin_ekli_ile_kyaslamak_daha_aklayc_olabilir_Dikkat_edilecek_noktalar_relationships_altndaki_contactte_bulunan_id_alanna_mteri_idsini_girmeniz_gereklidir__relationships_altndaki_details_ksm_bir_listedir__array_ve_fatura_kalemlerini_temsil_eder__Bu_listenin_her_elemannn_ilikili_olduu_bir_rn_vardr__Yani_details_altndaki_her_elemann_kendine_ait_bir_relationships_ksm_mevcuttur__Buradaki_product_id_alan_stteki_rn_admlarnda_elde_ettiiniz_idyi_koymanz_gereken_yerdir__Sat_Faturasna_Tahsilat_Ekleme_Tahsilat_ekleme_operationpaySalesInvoice_ksmndaki_ilgili_alanlar_doldurarak_sat_faturasna_tahsilat_ekleyebilirsiniz__Sat_Faturasnn_Tahsilatn_SilmeBir_sat_faturasnn_tahsilatn_silmek_aslnda_o_tahsilat_oluturan_para_ak_ilemini_silmek_demektir__Bir_ilemi_silmeden_nce_o_ilemin_idsine_ihtiyacnz_vardr_Bir_sat_faturasna_ait_tahsilatlar_almak_iin__Sat_faturas_bilgilerini_alma__show_operationshowSalesInvoice_endpointine_istek_atarken_includepayments_parametresini_de_eklemelisiniz__Bu_size_sat_faturas_bilgilerine_ilave_olarak_tahsilatlar_da_verir_Tahsilatlar_ile_birlikte_o_tahsilatlar_oluturan_ilemleri_de_almak_iin_yine_ayn_endpointe_includepayments_transaction_parametresini_ekleyerek_istek_yapmanz_gerekir__Bu_size_hem_sat_faturas_bilgilerini_hem_tahsilat_bilgilerini_hem_de_tahsilat_oluturan_ilemlerin_bilgilerini_verir_includepayments_transaction_parametresini_kullanarak_yaptnz_istek_ile_ilem__transaction_idsini_aldktan_sonra__ilem_silme_operationdeleteTransaction_endpointinde_bu_idyi_kullanarak_silme_ilemini_yapabilirsiniz__Sat_Faturas_ResmiletirmeOluturduunuz_bir_sat_faturas_varsa_onu_e_Ariv_veya_e_Fatura_olarak_resmiletirmek_iin_aadakileri_yapmanz_gereklidir_1__ncelikle_mterinizin_e_Fatura_kullancs_olup_olmadn_renmelisiniz__Bunun_iin_mterinizin_e_Fatura_gelen_kutusu_olup_olmadna_bakmak_gereklidir___e_Fatura_gelen_kutusu_operationlistEInvoiceInboxes_endpointine_mterinin_vknsini_kullanarak_bir_istek_yaptnzda_eer_bir_gelen_kutusu_olduuna_dair_yant_alyorsanz_mteri_e_Fatura_kullancsdr__Mteri_e_Fatura_kullancs_ise_resmiletirme_iin_e_Fatura_oluturmak_e_Fatura_kullancs_deilse_e_Ariv_oluturmak_gereklidir_Oluturduunuz_e_Fatura_e_Ariv_ve_e_Smmnin_dzenleme_tarihi_e_Faturaya_gei_saladnz_aktivasyon_tarihinden_sonra_olmaldr__Ayn_zamanda_oluturduunuz_e_Faturann_dzenleme_tarihi_alcnn_etiketi_kullanmaya_balad_tarihten_de_nce_olamaz__Alcnn_etiketi_kullanmaya_balad_tarihi_e_Fatura_gelen_kutusunu_ekerek_grntleyebilirsiniz_2__e_Fatura_veya_e_Ariv_oluturma____nceki_admda_mterinin_e_Fatura_kullancs_olduu_renildiyse___e_Fatura_oluturma_endpointi_operationcreateEInvoice_kullanlarak_e_Fatura_oluturmak_gereklidir_____nceki_admda_mterinin_e_Ariv_kullancs_olduu_renildiyse___e_Ariv_oluturma_endpointi_operationcreateEArchive_kullanlarak_e_Ariv_oluturmak_gereklidir____e_Fatura_ve_e_Ariv_oluturma_ilemi_synchronous_deildir__Yani_istek_arka_planda_yerine_getirilir__Bu_yzden_e_Fatura_veya_e_Ariv_oluturma_endpointleri_cevap_olarak_oluturma_ileminin_durumunu_takip_edebileceiniz_bir_ilem_idsi_dner__Bu_ilem_idsini__sorgulama_tagTrackableJobs_endpointinde_belirli_aralklarla_kullanp_oluturma_ileminin_durumunu_takip_etmeniz_gerekmektedir__lem_durumu_ile_ilgili_aadaki_yantlar_alabilirsiniz____status_pending_ilemin_srada_olduunu_henz_balamadn_gsterir_____status_running_ilemin_yaplmakta_olduunu_ancak_henz_sonulanmadn_gsterir_____status_error_ilemde_bir_hata_olduu_anlamna_gelir__Dnen_yantta_hata_mesajn_inceleyebilirsiniz_____status_done_ilemin_baarl_bir_ekilde_sonulandn_gsterir_4__e_Fatura__e_Ariv_ileminin_baarl_bir_ekilde_sonulandn_grdkten_sonra_e_Fatura__e_Ariv_bilgilerini_almak_iin__Sat_faturas_bilgilerini_alma__show_operationshowSalesInvoice_endpointine_includeactive_e_document_parametresi_ile_istek_yapmanz_gerekmektedir__Buradan_sradaki_admda_ihtiya_duyacanz_e_Fatura__e_Ariv_idlerini_ve_baka_bilgileri_de_alabilirsiniz_5__e_Fatura__e_Ariv_baarl_bir_resmiletirildikten_sonra_mterilerinize_PDF_olarak_gndermek_isteyebilirsiniz__Bunun_iin____e_Ariv_iin_4__admda_elde_edeceiniz_e_Ariv_idsini_kullanarak__e_Ariv_PDF_operationshowEArchivePdf_endpointine_istek_atabilirsiniz__Bu_endpoint_PDF_henz_yoksa_bo_bir_yant_ile_birlikte_204_dner__Yani_204_almayana_kadar_belirli_aralklarla_bu_endpointe_istek_yapmanz_gerekmektedir__Geerli_yant_aldnzda_size_dnecek_olan_PDF_URL_1_saat_iin_geerlidir__Bu_yzden_bu_linki_direk_olarak_mterinizle_paylamamalsnz__ndirip_mterinize_kendiniz_gndermelisiniz_____e_Ariv_iin_anlatlan_senaryonun_ayns_e_Fatura_iin_de_geerlidir__Tek_farkl_ksm_istei_yapacanz_endpointdir__e_Fatura_PDF_operationshowEInvoicePdf_rsaliye_Oluturmarsaliye_oluturmak_iin_bir_mteritedariki__contact_idsi_ve_bir_veya_birden_fazla_rn__product_idsine_ihtiyacnz_vardr__MteriTedariki_Yeni_bir_mteritedariki_ileEer_ihtiya_duyduunuz_mteritedariki_bilgisi_henz_yoksa_ncelikle_mteritedariki_oluturmanz_gereklidir__Bunun_iin__MteriTedariki_oluturma_operationcreateContact_endpointini_kullanmalsnz__Baarl_bir_ekilde_mteritedariki_oluturulursa_size_dnecek_olan_yant_ihtiya_duyacanz_mteritedariki_idsini_ierir__Mevcut_bir_mteritedariki_ileEer_daha_nceden_zaten_oluturduunuz_bir_mteritedariki_ile_ilikili_bir_irsaliye_oluturacaksanz_ncelikle_o_mteritedarikinin_idsini_renmeniz_gerekir__Bunun_iin__Mteritedariki_listesi_operationlistContacts_endpointini_kullanabilirsiniz__Mteritedariki_listesi_endpointi_isim_e_posta_vergi_numaras_gibi_eitli_filtreleri_destekler__Bunlar_kullanarak_aradnz_mteritedarikiyi_bulabilirsiniz__rn_Yeni_bir_rn_ileEer_ihtiya_duyduunuz_rn_bilgisi_henz_yoksa_ncelikle_rn_oluturmanz_gereklidir__Bunun_iin__rn_oluturma_operationcreateProduct_endpointini_kullanmalsnz__Baarl_bir_ekilde_rn_oluturulursa_size_dnecek_olan_yant_ihtiya_duyacanz_rn_idsini_ierir__Mevcut_bir_rn_ileEer_daha_nceden_oluturduunuz_bir_rn_kullanarak_bir_irsaliye_oluturacaksanz_ncelikle_o_rnn_idsini_renmeniz_gerekir__Bunun_iin__rn_listesi_operationlistProducts_endpointini_kullanabilirsiniz__rn_listesi_endpointi_isim_kod_gibi_eitli_filtreleri_destekler__Bunlar_kullanarak_aradnz_rn_bulabilirsiniz____htiya_duyduunuz_mteritedariki_ve_rn_idlerini_aldktan_sonra__rsaliye_Oluturma_operationcreateShipmentDocument_endpointi_ile_irsaliye_oluturabilirsiniz__Endpointin_tanmnda_sa_tarafta_beklediimiz_veri_ekli_bulunmaktadr_aadaki_bilgileri_verinin_ekli_ile_kyaslamak_daha_aklayc_olabilir_Dikkat_edilecek_noktalar_relationships_altndaki_contactte_bulunan_id_alanna_mteritedariki_idsini_girmeniz_gereklidir__relationships_altndaki_stock_movements_ksm_bir_listedir__array_ve_irsaliye_kalemlerini_temsil_eder__Bu_listenin_her_elemannn_ilikili_olduu_bir_rn_vardr__Yani_stock_movements_altndaki_her_elemann_kendine_ait_bir_relationships_ksm_mevcuttur__Buradaki_product_id_alan_stteki_rn_admlarnda_elde_ettiiniz_idyi_koymanz_gereken_yerdir_.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var Parasut = require('index'); // See note below*.
   * var xxxSvc = new Parasut.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new Parasut.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new Parasut.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new Parasut.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 4.0.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The Account model constructor.
     * @property {module:model/Account}
     */
    Account: Account,
    /**
     * The AccountAttributes model constructor.
     * @property {module:model/AccountAttributes}
     */
    AccountAttributes: AccountAttributes,
    /**
     * The AccountDebitCreditTransactionForm model constructor.
     * @property {module:model/AccountDebitCreditTransactionForm}
     */
    AccountDebitCreditTransactionForm: AccountDebitCreditTransactionForm,
    /**
     * The AccountDebitCreditTransactionFormAttributes model constructor.
     * @property {module:model/AccountDebitCreditTransactionFormAttributes}
     */
    AccountDebitCreditTransactionFormAttributes: AccountDebitCreditTransactionFormAttributes,
    /**
     * The AccountForm model constructor.
     * @property {module:model/AccountForm}
     */
    AccountForm: AccountForm,
    /**
     * The AccountForm1 model constructor.
     * @property {module:model/AccountForm1}
     */
    AccountForm1: AccountForm1,
    /**
     * The Address model constructor.
     * @property {module:model/Address}
     */
    Address: Address,
    /**
     * The AddressAttributes model constructor.
     * @property {module:model/AddressAttributes}
     */
    AddressAttributes: AddressAttributes,
    /**
     * The AddressRelationships model constructor.
     * @property {module:model/AddressRelationships}
     */
    AddressRelationships: AddressRelationships,
    /**
     * The AddressRelationshipsAddressable model constructor.
     * @property {module:model/AddressRelationshipsAddressable}
     */
    AddressRelationshipsAddressable: AddressRelationshipsAddressable,
    /**
     * The AddressRelationshipsAddressableData model constructor.
     * @property {module:model/AddressRelationshipsAddressableData}
     */
    AddressRelationshipsAddressableData: AddressRelationshipsAddressableData,
    /**
     * The BankFee model constructor.
     * @property {module:model/BankFee}
     */
    BankFee: BankFee,
    /**
     * The BankFeeAttributes model constructor.
     * @property {module:model/BankFeeAttributes}
     */
    BankFeeAttributes: BankFeeAttributes,
    /**
     * The BankFeeForm model constructor.
     * @property {module:model/BankFeeForm}
     */
    BankFeeForm: BankFeeForm,
    /**
     * The BankFeeForm1 model constructor.
     * @property {module:model/BankFeeForm1}
     */
    BankFeeForm1: BankFeeForm1,
    /**
     * The Company model constructor.
     * @property {module:model/Company}
     */
    Company: Company,
    /**
     * The CompanyAttributes model constructor.
     * @property {module:model/CompanyAttributes}
     */
    CompanyAttributes: CompanyAttributes,
    /**
     * The CompanyIdaccountsData model constructor.
     * @property {module:model/CompanyIdaccountsData}
     */
    CompanyIdaccountsData: CompanyIdaccountsData,
    /**
     * The CompanyIdaccountsiddebitTransactionsData model constructor.
     * @property {module:model/CompanyIdaccountsiddebitTransactionsData}
     */
    CompanyIdaccountsiddebitTransactionsData: CompanyIdaccountsiddebitTransactionsData,
    /**
     * The CompanyIdbankFeesData model constructor.
     * @property {module:model/CompanyIdbankFeesData}
     */
    CompanyIdbankFeesData: CompanyIdbankFeesData,
    /**
     * The CompanyIdbankFeesDataRelationships model constructor.
     * @property {module:model/CompanyIdbankFeesDataRelationships}
     */
    CompanyIdbankFeesDataRelationships: CompanyIdbankFeesDataRelationships,
    /**
     * The CompanyIdbankFeesDataRelationshipsCategory model constructor.
     * @property {module:model/CompanyIdbankFeesDataRelationshipsCategory}
     */
    CompanyIdbankFeesDataRelationshipsCategory: CompanyIdbankFeesDataRelationshipsCategory,
    /**
     * The CompanyIdbankFeesDataRelationshipsCategoryData model constructor.
     * @property {module:model/CompanyIdbankFeesDataRelationshipsCategoryData}
     */
    CompanyIdbankFeesDataRelationshipsCategoryData: CompanyIdbankFeesDataRelationshipsCategoryData,
    /**
     * The CompanyIdbankFeesDataRelationshipsTags model constructor.
     * @property {module:model/CompanyIdbankFeesDataRelationshipsTags}
     */
    CompanyIdbankFeesDataRelationshipsTags: CompanyIdbankFeesDataRelationshipsTags,
    /**
     * The CompanyIdbankFeesDataRelationshipsTagsData model constructor.
     * @property {module:model/CompanyIdbankFeesDataRelationshipsTagsData}
     */
    CompanyIdbankFeesDataRelationshipsTagsData: CompanyIdbankFeesDataRelationshipsTagsData,
    /**
     * The CompanyIdbankFeesidpaymentsData model constructor.
     * @property {module:model/CompanyIdbankFeesidpaymentsData}
     */
    CompanyIdbankFeesidpaymentsData: CompanyIdbankFeesidpaymentsData,
    /**
     * The CompanyIdcontactsData model constructor.
     * @property {module:model/CompanyIdcontactsData}
     */
    CompanyIdcontactsData: CompanyIdcontactsData,
    /**
     * The CompanyIdcontactsDataRelationships model constructor.
     * @property {module:model/CompanyIdcontactsDataRelationships}
     */
    CompanyIdcontactsDataRelationships: CompanyIdcontactsDataRelationships,
    /**
     * The CompanyIdcontactsDataRelationshipsContactPeople model constructor.
     * @property {module:model/CompanyIdcontactsDataRelationshipsContactPeople}
     */
    CompanyIdcontactsDataRelationshipsContactPeople: CompanyIdcontactsDataRelationshipsContactPeople,
    /**
     * The CompanyIdcontactsDataRelationshipsContactPeopleData model constructor.
     * @property {module:model/CompanyIdcontactsDataRelationshipsContactPeopleData}
     */
    CompanyIdcontactsDataRelationshipsContactPeopleData: CompanyIdcontactsDataRelationshipsContactPeopleData,
    /**
     * The CompanyIdcontactsidcontactCreditTransactionsData model constructor.
     * @property {module:model/CompanyIdcontactsidcontactCreditTransactionsData}
     */
    CompanyIdcontactsidcontactCreditTransactionsData: CompanyIdcontactsidcontactCreditTransactionsData,
    /**
     * The CompanyIdcontactsidcontactDebitTransactionsData model constructor.
     * @property {module:model/CompanyIdcontactsidcontactDebitTransactionsData}
     */
    CompanyIdcontactsidcontactDebitTransactionsData: CompanyIdcontactsidcontactDebitTransactionsData,
    /**
     * The CompanyIdeArchivesData model constructor.
     * @property {module:model/CompanyIdeArchivesData}
     */
    CompanyIdeArchivesData: CompanyIdeArchivesData,
    /**
     * The CompanyIdeArchivesDataRelationships model constructor.
     * @property {module:model/CompanyIdeArchivesDataRelationships}
     */
    CompanyIdeArchivesDataRelationships: CompanyIdeArchivesDataRelationships,
    /**
     * The CompanyIdeArchivesDataRelationshipsSalesInvoice model constructor.
     * @property {module:model/CompanyIdeArchivesDataRelationshipsSalesInvoice}
     */
    CompanyIdeArchivesDataRelationshipsSalesInvoice: CompanyIdeArchivesDataRelationshipsSalesInvoice,
    /**
     * The CompanyIdeArchivesDataRelationshipsSalesInvoiceData model constructor.
     * @property {module:model/CompanyIdeArchivesDataRelationshipsSalesInvoiceData}
     */
    CompanyIdeArchivesDataRelationshipsSalesInvoiceData: CompanyIdeArchivesDataRelationshipsSalesInvoiceData,
    /**
     * The CompanyIdeInvoicesData model constructor.
     * @property {module:model/CompanyIdeInvoicesData}
     */
    CompanyIdeInvoicesData: CompanyIdeInvoicesData,
    /**
     * The CompanyIdeInvoicesDataRelationships model constructor.
     * @property {module:model/CompanyIdeInvoicesDataRelationships}
     */
    CompanyIdeInvoicesDataRelationships: CompanyIdeInvoicesDataRelationships,
    /**
     * The CompanyIdemployeesData model constructor.
     * @property {module:model/CompanyIdemployeesData}
     */
    CompanyIdemployeesData: CompanyIdemployeesData,
    /**
     * The CompanyIdemployeesDataRelationships model constructor.
     * @property {module:model/CompanyIdemployeesDataRelationships}
     */
    CompanyIdemployeesDataRelationships: CompanyIdemployeesDataRelationships,
    /**
     * The CompanyIditemCategoriesData model constructor.
     * @property {module:model/CompanyIditemCategoriesData}
     */
    CompanyIditemCategoriesData: CompanyIditemCategoriesData,
    /**
     * The CompanyIdproductsData model constructor.
     * @property {module:model/CompanyIdproductsData}
     */
    CompanyIdproductsData: CompanyIdproductsData,
    /**
     * The CompanyIdpurchaseBillsbasicData model constructor.
     * @property {module:model/CompanyIdpurchaseBillsbasicData}
     */
    CompanyIdpurchaseBillsbasicData: CompanyIdpurchaseBillsbasicData,
    /**
     * The CompanyIdpurchaseBillsbasicDataRelationships model constructor.
     * @property {module:model/CompanyIdpurchaseBillsbasicDataRelationships}
     */
    CompanyIdpurchaseBillsbasicDataRelationships: CompanyIdpurchaseBillsbasicDataRelationships,
    /**
     * The CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee model constructor.
     * @property {module:model/CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee}
     */
    CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee: CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee,
    /**
     * The CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData model constructor.
     * @property {module:model/CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData}
     */
    CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData: CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData,
    /**
     * The CompanyIdpurchaseBillsbasicDataRelationshipsSupplier model constructor.
     * @property {module:model/CompanyIdpurchaseBillsbasicDataRelationshipsSupplier}
     */
    CompanyIdpurchaseBillsbasicDataRelationshipsSupplier: CompanyIdpurchaseBillsbasicDataRelationshipsSupplier,
    /**
     * The CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData model constructor.
     * @property {module:model/CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData}
     */
    CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData: CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData,
    /**
     * The CompanyIdpurchaseBillsdetailedData model constructor.
     * @property {module:model/CompanyIdpurchaseBillsdetailedData}
     */
    CompanyIdpurchaseBillsdetailedData: CompanyIdpurchaseBillsdetailedData,
    /**
     * The CompanyIdpurchaseBillsdetailedDataRelationships model constructor.
     * @property {module:model/CompanyIdpurchaseBillsdetailedDataRelationships}
     */
    CompanyIdpurchaseBillsdetailedDataRelationships: CompanyIdpurchaseBillsdetailedDataRelationships,
    /**
     * The CompanyIdpurchaseBillsdetailedDataRelationshipsDetails model constructor.
     * @property {module:model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetails}
     */
    CompanyIdpurchaseBillsdetailedDataRelationshipsDetails: CompanyIdpurchaseBillsdetailedDataRelationshipsDetails,
    /**
     * The CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData model constructor.
     * @property {module:model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData}
     */
    CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData: CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData,
    /**
     * The CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships model constructor.
     * @property {module:model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships}
     */
    CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships: CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships,
    /**
     * The CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct model constructor.
     * @property {module:model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct}
     */
    CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct: CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct,
    /**
     * The CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData model constructor.
     * @property {module:model/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData}
     */
    CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData: CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData,
    /**
     * The CompanyIdsalariesData model constructor.
     * @property {module:model/CompanyIdsalariesData}
     */
    CompanyIdsalariesData: CompanyIdsalariesData,
    /**
     * The CompanyIdsalariesDataRelationships model constructor.
     * @property {module:model/CompanyIdsalariesDataRelationships}
     */
    CompanyIdsalariesDataRelationships: CompanyIdsalariesDataRelationships,
    /**
     * The CompanyIdsalesInvoicesData model constructor.
     * @property {module:model/CompanyIdsalesInvoicesData}
     */
    CompanyIdsalesInvoicesData: CompanyIdsalesInvoicesData,
    /**
     * The CompanyIdsalesInvoicesDataRelationships model constructor.
     * @property {module:model/CompanyIdsalesInvoicesDataRelationships}
     */
    CompanyIdsalesInvoicesDataRelationships: CompanyIdsalesInvoicesDataRelationships,
    /**
     * The CompanyIdsalesInvoicesDataRelationshipsDetails model constructor.
     * @property {module:model/CompanyIdsalesInvoicesDataRelationshipsDetails}
     */
    CompanyIdsalesInvoicesDataRelationshipsDetails: CompanyIdsalesInvoicesDataRelationshipsDetails,
    /**
     * The CompanyIdsalesInvoicesDataRelationshipsDetailsData model constructor.
     * @property {module:model/CompanyIdsalesInvoicesDataRelationshipsDetailsData}
     */
    CompanyIdsalesInvoicesDataRelationshipsDetailsData: CompanyIdsalesInvoicesDataRelationshipsDetailsData,
    /**
     * The CompanyIdsalesInvoicesDataRelationshipsSalesOffer model constructor.
     * @property {module:model/CompanyIdsalesInvoicesDataRelationshipsSalesOffer}
     */
    CompanyIdsalesInvoicesDataRelationshipsSalesOffer: CompanyIdsalesInvoicesDataRelationshipsSalesOffer,
    /**
     * The CompanyIdsalesInvoicesDataRelationshipsSalesOfferData model constructor.
     * @property {module:model/CompanyIdsalesInvoicesDataRelationshipsSalesOfferData}
     */
    CompanyIdsalesInvoicesDataRelationshipsSalesOfferData: CompanyIdsalesInvoicesDataRelationshipsSalesOfferData,
    /**
     * The CompanyIdshipmentDocumentsData model constructor.
     * @property {module:model/CompanyIdshipmentDocumentsData}
     */
    CompanyIdshipmentDocumentsData: CompanyIdshipmentDocumentsData,
    /**
     * The CompanyIdshipmentDocumentsDataRelationships model constructor.
     * @property {module:model/CompanyIdshipmentDocumentsDataRelationships}
     */
    CompanyIdshipmentDocumentsDataRelationships: CompanyIdshipmentDocumentsDataRelationships,
    /**
     * The CompanyIdshipmentDocumentsDataRelationshipsContact model constructor.
     * @property {module:model/CompanyIdshipmentDocumentsDataRelationshipsContact}
     */
    CompanyIdshipmentDocumentsDataRelationshipsContact: CompanyIdshipmentDocumentsDataRelationshipsContact,
    /**
     * The CompanyIdshipmentDocumentsDataRelationshipsContactData model constructor.
     * @property {module:model/CompanyIdshipmentDocumentsDataRelationshipsContactData}
     */
    CompanyIdshipmentDocumentsDataRelationshipsContactData: CompanyIdshipmentDocumentsDataRelationshipsContactData,
    /**
     * The CompanyIdshipmentDocumentsDataRelationshipsStockMovements model constructor.
     * @property {module:model/CompanyIdshipmentDocumentsDataRelationshipsStockMovements}
     */
    CompanyIdshipmentDocumentsDataRelationshipsStockMovements: CompanyIdshipmentDocumentsDataRelationshipsStockMovements,
    /**
     * The CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData model constructor.
     * @property {module:model/CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData}
     */
    CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData: CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData,
    /**
     * The CompanyIdtagsData model constructor.
     * @property {module:model/CompanyIdtagsData}
     */
    CompanyIdtagsData: CompanyIdtagsData,
    /**
     * The CompanyIdtaxesData model constructor.
     * @property {module:model/CompanyIdtaxesData}
     */
    CompanyIdtaxesData: CompanyIdtaxesData,
    /**
     * The CompanyRelationships model constructor.
     * @property {module:model/CompanyRelationships}
     */
    CompanyRelationships: CompanyRelationships,
    /**
     * The CompanyRelationshipsAddress model constructor.
     * @property {module:model/CompanyRelationshipsAddress}
     */
    CompanyRelationshipsAddress: CompanyRelationshipsAddress,
    /**
     * The CompanyRelationshipsAddressData model constructor.
     * @property {module:model/CompanyRelationshipsAddressData}
     */
    CompanyRelationshipsAddressData: CompanyRelationshipsAddressData,
    /**
     * The CompanyRelationshipsOwner model constructor.
     * @property {module:model/CompanyRelationshipsOwner}
     */
    CompanyRelationshipsOwner: CompanyRelationshipsOwner,
    /**
     * The CompanyRelationshipsOwnerData model constructor.
     * @property {module:model/CompanyRelationshipsOwnerData}
     */
    CompanyRelationshipsOwnerData: CompanyRelationshipsOwnerData,
    /**
     * The Contact model constructor.
     * @property {module:model/Contact}
     */
    Contact: Contact,
    /**
     * The ContactAttributes model constructor.
     * @property {module:model/ContactAttributes}
     */
    ContactAttributes: ContactAttributes,
    /**
     * The ContactCollectionForm model constructor.
     * @property {module:model/ContactCollectionForm}
     */
    ContactCollectionForm: ContactCollectionForm,
    /**
     * The ContactCollectionFormAttributes model constructor.
     * @property {module:model/ContactCollectionFormAttributes}
     */
    ContactCollectionFormAttributes: ContactCollectionFormAttributes,
    /**
     * The ContactForm model constructor.
     * @property {module:model/ContactForm}
     */
    ContactForm: ContactForm,
    /**
     * The ContactForm1 model constructor.
     * @property {module:model/ContactForm1}
     */
    ContactForm1: ContactForm1,
    /**
     * The ContactPaymentForm model constructor.
     * @property {module:model/ContactPaymentForm}
     */
    ContactPaymentForm: ContactPaymentForm,
    /**
     * The ContactPaymentFormAttributes model constructor.
     * @property {module:model/ContactPaymentFormAttributes}
     */
    ContactPaymentFormAttributes: ContactPaymentFormAttributes,
    /**
     * The ContactPerson model constructor.
     * @property {module:model/ContactPerson}
     */
    ContactPerson: ContactPerson,
    /**
     * The ContactPersonAttributes model constructor.
     * @property {module:model/ContactPersonAttributes}
     */
    ContactPersonAttributes: ContactPersonAttributes,
    /**
     * The ContactRelationships model constructor.
     * @property {module:model/ContactRelationships}
     */
    ContactRelationships: ContactRelationships,
    /**
     * The ContactRelationshipsContactPeople model constructor.
     * @property {module:model/ContactRelationshipsContactPeople}
     */
    ContactRelationshipsContactPeople: ContactRelationshipsContactPeople,
    /**
     * The ContactRelationshipsContactPeopleData model constructor.
     * @property {module:model/ContactRelationshipsContactPeopleData}
     */
    ContactRelationshipsContactPeopleData: ContactRelationshipsContactPeopleData,
    /**
     * The ContactRelationshipsContactPortal model constructor.
     * @property {module:model/ContactRelationshipsContactPortal}
     */
    ContactRelationshipsContactPortal: ContactRelationshipsContactPortal,
    /**
     * The ContactRelationshipsContactPortalData model constructor.
     * @property {module:model/ContactRelationshipsContactPortalData}
     */
    ContactRelationshipsContactPortalData: ContactRelationshipsContactPortalData,
    /**
     * The EArchive model constructor.
     * @property {module:model/EArchive}
     */
    EArchive: EArchive,
    /**
     * The EArchiveAttributes model constructor.
     * @property {module:model/EArchiveAttributes}
     */
    EArchiveAttributes: EArchiveAttributes,
    /**
     * The EArchiveForm model constructor.
     * @property {module:model/EArchiveForm}
     */
    EArchiveForm: EArchiveForm,
    /**
     * The EArchiveFormAttributes model constructor.
     * @property {module:model/EArchiveFormAttributes}
     */
    EArchiveFormAttributes: EArchiveFormAttributes,
    /**
     * The EArchiveFormAttributesInternetSale model constructor.
     * @property {module:model/EArchiveFormAttributesInternetSale}
     */
    EArchiveFormAttributesInternetSale: EArchiveFormAttributesInternetSale,
    /**
     * The EArchiveFormAttributesShipment model constructor.
     * @property {module:model/EArchiveFormAttributesShipment}
     */
    EArchiveFormAttributesShipment: EArchiveFormAttributesShipment,
    /**
     * The EDocumentCommonForm model constructor.
     * @property {module:model/EDocumentCommonForm}
     */
    EDocumentCommonForm: EDocumentCommonForm,
    /**
     * The EDocumentCommonFormAttributes model constructor.
     * @property {module:model/EDocumentCommonFormAttributes}
     */
    EDocumentCommonFormAttributes: EDocumentCommonFormAttributes,
    /**
     * The EDocumentCommonFormAttributesExciseDutyCodes model constructor.
     * @property {module:model/EDocumentCommonFormAttributesExciseDutyCodes}
     */
    EDocumentCommonFormAttributesExciseDutyCodes: EDocumentCommonFormAttributesExciseDutyCodes,
    /**
     * The EDocumentPdf model constructor.
     * @property {module:model/EDocumentPdf}
     */
    EDocumentPdf: EDocumentPdf,
    /**
     * The EDocumentPdfAttributes model constructor.
     * @property {module:model/EDocumentPdfAttributes}
     */
    EDocumentPdfAttributes: EDocumentPdfAttributes,
    /**
     * The EInvoice model constructor.
     * @property {module:model/EInvoice}
     */
    EInvoice: EInvoice,
    /**
     * The EInvoiceAttributes model constructor.
     * @property {module:model/EInvoiceAttributes}
     */
    EInvoiceAttributes: EInvoiceAttributes,
    /**
     * The EInvoiceForm model constructor.
     * @property {module:model/EInvoiceForm}
     */
    EInvoiceForm: EInvoiceForm,
    /**
     * The EInvoiceFormAttributes model constructor.
     * @property {module:model/EInvoiceFormAttributes}
     */
    EInvoiceFormAttributes: EInvoiceFormAttributes,
    /**
     * The EInvoiceInbox model constructor.
     * @property {module:model/EInvoiceInbox}
     */
    EInvoiceInbox: EInvoiceInbox,
    /**
     * The EInvoiceInboxAttributes model constructor.
     * @property {module:model/EInvoiceInboxAttributes}
     */
    EInvoiceInboxAttributes: EInvoiceInboxAttributes,
    /**
     * The EInvoiceRelationships model constructor.
     * @property {module:model/EInvoiceRelationships}
     */
    EInvoiceRelationships: EInvoiceRelationships,
    /**
     * The EInvoiceRelationshipsInvoice model constructor.
     * @property {module:model/EInvoiceRelationshipsInvoice}
     */
    EInvoiceRelationshipsInvoice: EInvoiceRelationshipsInvoice,
    /**
     * The EInvoiceRelationshipsInvoiceData model constructor.
     * @property {module:model/EInvoiceRelationshipsInvoiceData}
     */
    EInvoiceRelationshipsInvoiceData: EInvoiceRelationshipsInvoiceData,
    /**
     * The Employee model constructor.
     * @property {module:model/Employee}
     */
    Employee: Employee,
    /**
     * The EmployeeAttributes model constructor.
     * @property {module:model/EmployeeAttributes}
     */
    EmployeeAttributes: EmployeeAttributes,
    /**
     * The EmployeeForm model constructor.
     * @property {module:model/EmployeeForm}
     */
    EmployeeForm: EmployeeForm,
    /**
     * The EmployeeForm1 model constructor.
     * @property {module:model/EmployeeForm1}
     */
    EmployeeForm1: EmployeeForm1,
    /**
     * The EmployeeRelationships model constructor.
     * @property {module:model/EmployeeRelationships}
     */
    EmployeeRelationships: EmployeeRelationships,
    /**
     * The EmployeeRelationshipsManagedByUserRole model constructor.
     * @property {module:model/EmployeeRelationshipsManagedByUserRole}
     */
    EmployeeRelationshipsManagedByUserRole: EmployeeRelationshipsManagedByUserRole,
    /**
     * The EmployeeRelationshipsManagedByUserRoleData model constructor.
     * @property {module:model/EmployeeRelationshipsManagedByUserRoleData}
     */
    EmployeeRelationshipsManagedByUserRoleData: EmployeeRelationshipsManagedByUserRoleData,
    /**
     * The Error model constructor.
     * @property {module:model/Error}
     */
    Error: Error,
    /**
     * The InlineResponse200 model constructor.
     * @property {module:model/InlineResponse200}
     */
    InlineResponse200: InlineResponse200,
    /**
     * The InlineResponse2001 model constructor.
     * @property {module:model/InlineResponse2001}
     */
    InlineResponse2001: InlineResponse2001,
    /**
     * The InlineResponse20010 model constructor.
     * @property {module:model/InlineResponse20010}
     */
    InlineResponse20010: InlineResponse20010,
    /**
     * The InlineResponse20011 model constructor.
     * @property {module:model/InlineResponse20011}
     */
    InlineResponse20011: InlineResponse20011,
    /**
     * The InlineResponse20011Included model constructor.
     * @property {module:model/InlineResponse20011Included}
     */
    InlineResponse20011Included: InlineResponse20011Included,
    /**
     * The InlineResponse20012 model constructor.
     * @property {module:model/InlineResponse20012}
     */
    InlineResponse20012: InlineResponse20012,
    /**
     * The InlineResponse20012Included model constructor.
     * @property {module:model/InlineResponse20012Included}
     */
    InlineResponse20012Included: InlineResponse20012Included,
    /**
     * The InlineResponse20013 model constructor.
     * @property {module:model/InlineResponse20013}
     */
    InlineResponse20013: InlineResponse20013,
    /**
     * The InlineResponse20013Included model constructor.
     * @property {module:model/InlineResponse20013Included}
     */
    InlineResponse20013Included: InlineResponse20013Included,
    /**
     * The InlineResponse20014 model constructor.
     * @property {module:model/InlineResponse20014}
     */
    InlineResponse20014: InlineResponse20014,
    /**
     * The InlineResponse20014Included model constructor.
     * @property {module:model/InlineResponse20014Included}
     */
    InlineResponse20014Included: InlineResponse20014Included,
    /**
     * The InlineResponse20015 model constructor.
     * @property {module:model/InlineResponse20015}
     */
    InlineResponse20015: InlineResponse20015,
    /**
     * The InlineResponse20015Included model constructor.
     * @property {module:model/InlineResponse20015Included}
     */
    InlineResponse20015Included: InlineResponse20015Included,
    /**
     * The InlineResponse20016 model constructor.
     * @property {module:model/InlineResponse20016}
     */
    InlineResponse20016: InlineResponse20016,
    /**
     * The InlineResponse20017 model constructor.
     * @property {module:model/InlineResponse20017}
     */
    InlineResponse20017: InlineResponse20017,
    /**
     * The InlineResponse2001Included model constructor.
     * @property {module:model/InlineResponse2001Included}
     */
    InlineResponse2001Included: InlineResponse2001Included,
    /**
     * The InlineResponse2002 model constructor.
     * @property {module:model/InlineResponse2002}
     */
    InlineResponse2002: InlineResponse2002,
    /**
     * The InlineResponse2002Included model constructor.
     * @property {module:model/InlineResponse2002Included}
     */
    InlineResponse2002Included: InlineResponse2002Included,
    /**
     * The InlineResponse2003 model constructor.
     * @property {module:model/InlineResponse2003}
     */
    InlineResponse2003: InlineResponse2003,
    /**
     * The InlineResponse2003Included model constructor.
     * @property {module:model/InlineResponse2003Included}
     */
    InlineResponse2003Included: InlineResponse2003Included,
    /**
     * The InlineResponse2004 model constructor.
     * @property {module:model/InlineResponse2004}
     */
    InlineResponse2004: InlineResponse2004,
    /**
     * The InlineResponse2004Included model constructor.
     * @property {module:model/InlineResponse2004Included}
     */
    InlineResponse2004Included: InlineResponse2004Included,
    /**
     * The InlineResponse2005 model constructor.
     * @property {module:model/InlineResponse2005}
     */
    InlineResponse2005: InlineResponse2005,
    /**
     * The InlineResponse2006 model constructor.
     * @property {module:model/InlineResponse2006}
     */
    InlineResponse2006: InlineResponse2006,
    /**
     * The InlineResponse2007 model constructor.
     * @property {module:model/InlineResponse2007}
     */
    InlineResponse2007: InlineResponse2007,
    /**
     * The InlineResponse2007Included model constructor.
     * @property {module:model/InlineResponse2007Included}
     */
    InlineResponse2007Included: InlineResponse2007Included,
    /**
     * The InlineResponse2008 model constructor.
     * @property {module:model/InlineResponse2008}
     */
    InlineResponse2008: InlineResponse2008,
    /**
     * The InlineResponse2008Included model constructor.
     * @property {module:model/InlineResponse2008Included}
     */
    InlineResponse2008Included: InlineResponse2008Included,
    /**
     * The InlineResponse2009 model constructor.
     * @property {module:model/InlineResponse2009}
     */
    InlineResponse2009: InlineResponse2009,
    /**
     * The InlineResponse2009Included model constructor.
     * @property {module:model/InlineResponse2009Included}
     */
    InlineResponse2009Included: InlineResponse2009Included,
    /**
     * The InlineResponse201 model constructor.
     * @property {module:model/InlineResponse201}
     */
    InlineResponse201: InlineResponse201,
    /**
     * The InlineResponse2011 model constructor.
     * @property {module:model/InlineResponse2011}
     */
    InlineResponse2011: InlineResponse2011,
    /**
     * The InlineResponse20110 model constructor.
     * @property {module:model/InlineResponse20110}
     */
    InlineResponse20110: InlineResponse20110,
    /**
     * The InlineResponse20111 model constructor.
     * @property {module:model/InlineResponse20111}
     */
    InlineResponse20111: InlineResponse20111,
    /**
     * The InlineResponse20112 model constructor.
     * @property {module:model/InlineResponse20112}
     */
    InlineResponse20112: InlineResponse20112,
    /**
     * The InlineResponse20113 model constructor.
     * @property {module:model/InlineResponse20113}
     */
    InlineResponse20113: InlineResponse20113,
    /**
     * The InlineResponse20114 model constructor.
     * @property {module:model/InlineResponse20114}
     */
    InlineResponse20114: InlineResponse20114,
    /**
     * The InlineResponse2012 model constructor.
     * @property {module:model/InlineResponse2012}
     */
    InlineResponse2012: InlineResponse2012,
    /**
     * The InlineResponse2012Included model constructor.
     * @property {module:model/InlineResponse2012Included}
     */
    InlineResponse2012Included: InlineResponse2012Included,
    /**
     * The InlineResponse2013 model constructor.
     * @property {module:model/InlineResponse2013}
     */
    InlineResponse2013: InlineResponse2013,
    /**
     * The InlineResponse2013Included model constructor.
     * @property {module:model/InlineResponse2013Included}
     */
    InlineResponse2013Included: InlineResponse2013Included,
    /**
     * The InlineResponse2014 model constructor.
     * @property {module:model/InlineResponse2014}
     */
    InlineResponse2014: InlineResponse2014,
    /**
     * The InlineResponse2015 model constructor.
     * @property {module:model/InlineResponse2015}
     */
    InlineResponse2015: InlineResponse2015,
    /**
     * The InlineResponse2016 model constructor.
     * @property {module:model/InlineResponse2016}
     */
    InlineResponse2016: InlineResponse2016,
    /**
     * The InlineResponse2017 model constructor.
     * @property {module:model/InlineResponse2017}
     */
    InlineResponse2017: InlineResponse2017,
    /**
     * The InlineResponse2018 model constructor.
     * @property {module:model/InlineResponse2018}
     */
    InlineResponse2018: InlineResponse2018,
    /**
     * The InlineResponse2019 model constructor.
     * @property {module:model/InlineResponse2019}
     */
    InlineResponse2019: InlineResponse2019,
    /**
     * The InlineResponse400 model constructor.
     * @property {module:model/InlineResponse400}
     */
    InlineResponse400: InlineResponse400,
    /**
     * The ItemCategory model constructor.
     * @property {module:model/ItemCategory}
     */
    ItemCategory: ItemCategory,
    /**
     * The ItemCategoryAttributes model constructor.
     * @property {module:model/ItemCategoryAttributes}
     */
    ItemCategoryAttributes: ItemCategoryAttributes,
    /**
     * The ItemCategoryForm model constructor.
     * @property {module:model/ItemCategoryForm}
     */
    ItemCategoryForm: ItemCategoryForm,
    /**
     * The ItemCategoryForm1 model constructor.
     * @property {module:model/ItemCategoryForm1}
     */
    ItemCategoryForm1: ItemCategoryForm1,
    /**
     * The ItemCategoryRelationships model constructor.
     * @property {module:model/ItemCategoryRelationships}
     */
    ItemCategoryRelationships: ItemCategoryRelationships,
    /**
     * The ItemCategoryRelationshipsSubcategories model constructor.
     * @property {module:model/ItemCategoryRelationshipsSubcategories}
     */
    ItemCategoryRelationshipsSubcategories: ItemCategoryRelationshipsSubcategories,
    /**
     * The ListMeta model constructor.
     * @property {module:model/ListMeta}
     */
    ListMeta: ListMeta,
    /**
     * The Me model constructor.
     * @property {module:model/Me}
     */
    Me: Me,
    /**
     * The MeAttributes model constructor.
     * @property {module:model/MeAttributes}
     */
    MeAttributes: MeAttributes,
    /**
     * The MeRelationships model constructor.
     * @property {module:model/MeRelationships}
     */
    MeRelationships: MeRelationships,
    /**
     * The MeRelationshipsCompanies model constructor.
     * @property {module:model/MeRelationshipsCompanies}
     */
    MeRelationshipsCompanies: MeRelationshipsCompanies,
    /**
     * The MeRelationshipsProfile model constructor.
     * @property {module:model/MeRelationshipsProfile}
     */
    MeRelationshipsProfile: MeRelationshipsProfile,
    /**
     * The MeRelationshipsProfileData model constructor.
     * @property {module:model/MeRelationshipsProfileData}
     */
    MeRelationshipsProfileData: MeRelationshipsProfileData,
    /**
     * The MeRelationshipsUserRoles model constructor.
     * @property {module:model/MeRelationshipsUserRoles}
     */
    MeRelationshipsUserRoles: MeRelationshipsUserRoles,
    /**
     * The Payment model constructor.
     * @property {module:model/Payment}
     */
    Payment: Payment,
    /**
     * The PaymentAttributes model constructor.
     * @property {module:model/PaymentAttributes}
     */
    PaymentAttributes: PaymentAttributes,
    /**
     * The PaymentForm model constructor.
     * @property {module:model/PaymentForm}
     */
    PaymentForm: PaymentForm,
    /**
     * The PaymentForm1 model constructor.
     * @property {module:model/PaymentForm1}
     */
    PaymentForm1: PaymentForm1,
    /**
     * The PaymentForm2 model constructor.
     * @property {module:model/PaymentForm2}
     */
    PaymentForm2: PaymentForm2,
    /**
     * The PaymentForm3 model constructor.
     * @property {module:model/PaymentForm3}
     */
    PaymentForm3: PaymentForm3,
    /**
     * The PaymentForm4 model constructor.
     * @property {module:model/PaymentForm4}
     */
    PaymentForm4: PaymentForm4,
    /**
     * The PaymentFormAttributes model constructor.
     * @property {module:model/PaymentFormAttributes}
     */
    PaymentFormAttributes: PaymentFormAttributes,
    /**
     * The PaymentRelationships model constructor.
     * @property {module:model/PaymentRelationships}
     */
    PaymentRelationships: PaymentRelationships,
    /**
     * The PaymentRelationshipsPayable model constructor.
     * @property {module:model/PaymentRelationshipsPayable}
     */
    PaymentRelationshipsPayable: PaymentRelationshipsPayable,
    /**
     * The PaymentRelationshipsPayableData model constructor.
     * @property {module:model/PaymentRelationshipsPayableData}
     */
    PaymentRelationshipsPayableData: PaymentRelationshipsPayableData,
    /**
     * The PaymentRelationshipsTransaction model constructor.
     * @property {module:model/PaymentRelationshipsTransaction}
     */
    PaymentRelationshipsTransaction: PaymentRelationshipsTransaction,
    /**
     * The PaymentRelationshipsTransactionData model constructor.
     * @property {module:model/PaymentRelationshipsTransactionData}
     */
    PaymentRelationshipsTransactionData: PaymentRelationshipsTransactionData,
    /**
     * The Product model constructor.
     * @property {module:model/Product}
     */
    Product: Product,
    /**
     * The ProductAttributes model constructor.
     * @property {module:model/ProductAttributes}
     */
    ProductAttributes: ProductAttributes,
    /**
     * The ProductForm model constructor.
     * @property {module:model/ProductForm}
     */
    ProductForm: ProductForm,
    /**
     * The ProductForm1 model constructor.
     * @property {module:model/ProductForm1}
     */
    ProductForm1: ProductForm1,
    /**
     * The Profile model constructor.
     * @property {module:model/Profile}
     */
    Profile: Profile,
    /**
     * The ProfileAttributes model constructor.
     * @property {module:model/ProfileAttributes}
     */
    ProfileAttributes: ProfileAttributes,
    /**
     * The ProfileRelationships model constructor.
     * @property {module:model/ProfileRelationships}
     */
    ProfileRelationships: ProfileRelationships,
    /**
     * The PurchaseBill model constructor.
     * @property {module:model/PurchaseBill}
     */
    PurchaseBill: PurchaseBill,
    /**
     * The PurchaseBillAttributes model constructor.
     * @property {module:model/PurchaseBillAttributes}
     */
    PurchaseBillAttributes: PurchaseBillAttributes,
    /**
     * The PurchaseBillBasicForm model constructor.
     * @property {module:model/PurchaseBillBasicForm}
     */
    PurchaseBillBasicForm: PurchaseBillBasicForm,
    /**
     * The PurchaseBillBasicFormAttributes model constructor.
     * @property {module:model/PurchaseBillBasicFormAttributes}
     */
    PurchaseBillBasicFormAttributes: PurchaseBillBasicFormAttributes,
    /**
     * The PurchaseBillDetail model constructor.
     * @property {module:model/PurchaseBillDetail}
     */
    PurchaseBillDetail: PurchaseBillDetail,
    /**
     * The PurchaseBillDetailAttributes model constructor.
     * @property {module:model/PurchaseBillDetailAttributes}
     */
    PurchaseBillDetailAttributes: PurchaseBillDetailAttributes,
    /**
     * The PurchaseBillDetailedForm model constructor.
     * @property {module:model/PurchaseBillDetailedForm}
     */
    PurchaseBillDetailedForm: PurchaseBillDetailedForm,
    /**
     * The PurchaseBillDetailedFormAttributes model constructor.
     * @property {module:model/PurchaseBillDetailedFormAttributes}
     */
    PurchaseBillDetailedFormAttributes: PurchaseBillDetailedFormAttributes,
    /**
     * The PurchaseBillForm model constructor.
     * @property {module:model/PurchaseBillForm}
     */
    PurchaseBillForm: PurchaseBillForm,
    /**
     * The PurchaseBillForm1 model constructor.
     * @property {module:model/PurchaseBillForm1}
     */
    PurchaseBillForm1: PurchaseBillForm1,
    /**
     * The PurchaseBillForm2 model constructor.
     * @property {module:model/PurchaseBillForm2}
     */
    PurchaseBillForm2: PurchaseBillForm2,
    /**
     * The PurchaseBillForm3 model constructor.
     * @property {module:model/PurchaseBillForm3}
     */
    PurchaseBillForm3: PurchaseBillForm3,
    /**
     * The PurchaseBillRelationships model constructor.
     * @property {module:model/PurchaseBillRelationships}
     */
    PurchaseBillRelationships: PurchaseBillRelationships,
    /**
     * The PurchaseBillRelationshipsActiveEDocument model constructor.
     * @property {module:model/PurchaseBillRelationshipsActiveEDocument}
     */
    PurchaseBillRelationshipsActiveEDocument: PurchaseBillRelationshipsActiveEDocument,
    /**
     * The PurchaseBillRelationshipsActiveEDocumentData model constructor.
     * @property {module:model/PurchaseBillRelationshipsActiveEDocumentData}
     */
    PurchaseBillRelationshipsActiveEDocumentData: PurchaseBillRelationshipsActiveEDocumentData,
    /**
     * The PurchaseBillRelationshipsDetails model constructor.
     * @property {module:model/PurchaseBillRelationshipsDetails}
     */
    PurchaseBillRelationshipsDetails: PurchaseBillRelationshipsDetails,
    /**
     * The PurchaseBillRelationshipsDetailsData model constructor.
     * @property {module:model/PurchaseBillRelationshipsDetailsData}
     */
    PurchaseBillRelationshipsDetailsData: PurchaseBillRelationshipsDetailsData,
    /**
     * The PurchaseBillRelationshipsPayTo model constructor.
     * @property {module:model/PurchaseBillRelationshipsPayTo}
     */
    PurchaseBillRelationshipsPayTo: PurchaseBillRelationshipsPayTo,
    /**
     * The PurchaseBillRelationshipsPayToData model constructor.
     * @property {module:model/PurchaseBillRelationshipsPayToData}
     */
    PurchaseBillRelationshipsPayToData: PurchaseBillRelationshipsPayToData,
    /**
     * The PurchaseBillRelationshipsPayments model constructor.
     * @property {module:model/PurchaseBillRelationshipsPayments}
     */
    PurchaseBillRelationshipsPayments: PurchaseBillRelationshipsPayments,
    /**
     * The PurchaseBillRelationshipsPaymentsData model constructor.
     * @property {module:model/PurchaseBillRelationshipsPaymentsData}
     */
    PurchaseBillRelationshipsPaymentsData: PurchaseBillRelationshipsPaymentsData,
    /**
     * The PurchaseBillRelationshipsRecurrencePlan model constructor.
     * @property {module:model/PurchaseBillRelationshipsRecurrencePlan}
     */
    PurchaseBillRelationshipsRecurrencePlan: PurchaseBillRelationshipsRecurrencePlan,
    /**
     * The PurchaseBillRelationshipsRecurrencePlanData model constructor.
     * @property {module:model/PurchaseBillRelationshipsRecurrencePlanData}
     */
    PurchaseBillRelationshipsRecurrencePlanData: PurchaseBillRelationshipsRecurrencePlanData,
    /**
     * The Salary model constructor.
     * @property {module:model/Salary}
     */
    Salary: Salary,
    /**
     * The SalaryAttributes model constructor.
     * @property {module:model/SalaryAttributes}
     */
    SalaryAttributes: SalaryAttributes,
    /**
     * The SalaryForm model constructor.
     * @property {module:model/SalaryForm}
     */
    SalaryForm: SalaryForm,
    /**
     * The SalaryForm1 model constructor.
     * @property {module:model/SalaryForm1}
     */
    SalaryForm1: SalaryForm1,
    /**
     * The SalesInvoice model constructor.
     * @property {module:model/SalesInvoice}
     */
    SalesInvoice: SalesInvoice,
    /**
     * The SalesInvoiceAttributes model constructor.
     * @property {module:model/SalesInvoiceAttributes}
     */
    SalesInvoiceAttributes: SalesInvoiceAttributes,
    /**
     * The SalesInvoiceDetail model constructor.
     * @property {module:model/SalesInvoiceDetail}
     */
    SalesInvoiceDetail: SalesInvoiceDetail,
    /**
     * The SalesInvoiceDetailAttributes model constructor.
     * @property {module:model/SalesInvoiceDetailAttributes}
     */
    SalesInvoiceDetailAttributes: SalesInvoiceDetailAttributes,
    /**
     * The SalesInvoiceForm model constructor.
     * @property {module:model/SalesInvoiceForm}
     */
    SalesInvoiceForm: SalesInvoiceForm,
    /**
     * The SalesInvoiceForm1 model constructor.
     * @property {module:model/SalesInvoiceForm1}
     */
    SalesInvoiceForm1: SalesInvoiceForm1,
    /**
     * The SalesInvoiceForm2 model constructor.
     * @property {module:model/SalesInvoiceForm2}
     */
    SalesInvoiceForm2: SalesInvoiceForm2,
    /**
     * The SalesInvoiceRelationships model constructor.
     * @property {module:model/SalesInvoiceRelationships}
     */
    SalesInvoiceRelationships: SalesInvoiceRelationships,
    /**
     * The SalesInvoiceRelationshipsActiveEDocument model constructor.
     * @property {module:model/SalesInvoiceRelationshipsActiveEDocument}
     */
    SalesInvoiceRelationshipsActiveEDocument: SalesInvoiceRelationshipsActiveEDocument,
    /**
     * The SalesInvoiceRelationshipsActiveEDocumentData model constructor.
     * @property {module:model/SalesInvoiceRelationshipsActiveEDocumentData}
     */
    SalesInvoiceRelationshipsActiveEDocumentData: SalesInvoiceRelationshipsActiveEDocumentData,
    /**
     * The SalesInvoiceRelationshipsDetails model constructor.
     * @property {module:model/SalesInvoiceRelationshipsDetails}
     */
    SalesInvoiceRelationshipsDetails: SalesInvoiceRelationshipsDetails,
    /**
     * The SalesInvoiceRelationshipsDetailsData model constructor.
     * @property {module:model/SalesInvoiceRelationshipsDetailsData}
     */
    SalesInvoiceRelationshipsDetailsData: SalesInvoiceRelationshipsDetailsData,
    /**
     * The SalesInvoiceRelationshipsSharings model constructor.
     * @property {module:model/SalesInvoiceRelationshipsSharings}
     */
    SalesInvoiceRelationshipsSharings: SalesInvoiceRelationshipsSharings,
    /**
     * The SalesInvoiceRelationshipsSharingsData model constructor.
     * @property {module:model/SalesInvoiceRelationshipsSharingsData}
     */
    SalesInvoiceRelationshipsSharingsData: SalesInvoiceRelationshipsSharingsData,
    /**
     * The SalesOffer model constructor.
     * @property {module:model/SalesOffer}
     */
    SalesOffer: SalesOffer,
    /**
     * The SalesOfferAttributes model constructor.
     * @property {module:model/SalesOfferAttributes}
     */
    SalesOfferAttributes: SalesOfferAttributes,
    /**
     * The ShipmentDocument model constructor.
     * @property {module:model/ShipmentDocument}
     */
    ShipmentDocument: ShipmentDocument,
    /**
     * The ShipmentDocumentAttributes model constructor.
     * @property {module:model/ShipmentDocumentAttributes}
     */
    ShipmentDocumentAttributes: ShipmentDocumentAttributes,
    /**
     * The ShipmentDocumentForm model constructor.
     * @property {module:model/ShipmentDocumentForm}
     */
    ShipmentDocumentForm: ShipmentDocumentForm,
    /**
     * The ShipmentDocumentForm1 model constructor.
     * @property {module:model/ShipmentDocumentForm1}
     */
    ShipmentDocumentForm1: ShipmentDocumentForm1,
    /**
     * The ShipmentDocumentRelationships model constructor.
     * @property {module:model/ShipmentDocumentRelationships}
     */
    ShipmentDocumentRelationships: ShipmentDocumentRelationships,
    /**
     * The ShipmentDocumentRelationshipsInvoices model constructor.
     * @property {module:model/ShipmentDocumentRelationshipsInvoices}
     */
    ShipmentDocumentRelationshipsInvoices: ShipmentDocumentRelationshipsInvoices,
    /**
     * The ShipmentDocumentRelationshipsStockMovements model constructor.
     * @property {module:model/ShipmentDocumentRelationshipsStockMovements}
     */
    ShipmentDocumentRelationshipsStockMovements: ShipmentDocumentRelationshipsStockMovements,
    /**
     * The ShipmentDocumentRelationshipsStockMovementsData model constructor.
     * @property {module:model/ShipmentDocumentRelationshipsStockMovementsData}
     */
    ShipmentDocumentRelationshipsStockMovementsData: ShipmentDocumentRelationshipsStockMovementsData,
    /**
     * The StockMovement model constructor.
     * @property {module:model/StockMovement}
     */
    StockMovement: StockMovement,
    /**
     * The StockMovementAttributes model constructor.
     * @property {module:model/StockMovementAttributes}
     */
    StockMovementAttributes: StockMovementAttributes,
    /**
     * The StockMovementRelationships model constructor.
     * @property {module:model/StockMovementRelationships}
     */
    StockMovementRelationships: StockMovementRelationships,
    /**
     * The StockMovementRelationshipsSource model constructor.
     * @property {module:model/StockMovementRelationshipsSource}
     */
    StockMovementRelationshipsSource: StockMovementRelationshipsSource,
    /**
     * The StockMovementRelationshipsSourceData model constructor.
     * @property {module:model/StockMovementRelationshipsSourceData}
     */
    StockMovementRelationshipsSourceData: StockMovementRelationshipsSourceData,
    /**
     * The Tag model constructor.
     * @property {module:model/Tag}
     */
    Tag: Tag,
    /**
     * The TagAttributes model constructor.
     * @property {module:model/TagAttributes}
     */
    TagAttributes: TagAttributes,
    /**
     * The TagForm model constructor.
     * @property {module:model/TagForm}
     */
    TagForm: TagForm,
    /**
     * The TagForm1 model constructor.
     * @property {module:model/TagForm1}
     */
    TagForm1: TagForm1,
    /**
     * The Tax model constructor.
     * @property {module:model/Tax}
     */
    Tax: Tax,
    /**
     * The TaxAttributes model constructor.
     * @property {module:model/TaxAttributes}
     */
    TaxAttributes: TaxAttributes,
    /**
     * The TaxForm model constructor.
     * @property {module:model/TaxForm}
     */
    TaxForm: TaxForm,
    /**
     * The TaxForm1 model constructor.
     * @property {module:model/TaxForm1}
     */
    TaxForm1: TaxForm1,
    /**
     * The TrackableJob model constructor.
     * @property {module:model/TrackableJob}
     */
    TrackableJob: TrackableJob,
    /**
     * The TrackableJobAttributes model constructor.
     * @property {module:model/TrackableJobAttributes}
     */
    TrackableJobAttributes: TrackableJobAttributes,
    /**
     * The Transaction model constructor.
     * @property {module:model/Transaction}
     */
    Transaction: Transaction,
    /**
     * The TransactionAttributes model constructor.
     * @property {module:model/TransactionAttributes}
     */
    TransactionAttributes: TransactionAttributes,
    /**
     * The TransactionForm model constructor.
     * @property {module:model/TransactionForm}
     */
    TransactionForm: TransactionForm,
    /**
     * The TransactionForm1 model constructor.
     * @property {module:model/TransactionForm1}
     */
    TransactionForm1: TransactionForm1,
    /**
     * The TransactionForm2 model constructor.
     * @property {module:model/TransactionForm2}
     */
    TransactionForm2: TransactionForm2,
    /**
     * The TransactionForm3 model constructor.
     * @property {module:model/TransactionForm3}
     */
    TransactionForm3: TransactionForm3,
    /**
     * The TransactionRelationships model constructor.
     * @property {module:model/TransactionRelationships}
     */
    TransactionRelationships: TransactionRelationships,
    /**
     * The TransactionRelationshipsDebitAccount model constructor.
     * @property {module:model/TransactionRelationshipsDebitAccount}
     */
    TransactionRelationshipsDebitAccount: TransactionRelationshipsDebitAccount,
    /**
     * The TransactionRelationshipsDebitAccountData model constructor.
     * @property {module:model/TransactionRelationshipsDebitAccountData}
     */
    TransactionRelationshipsDebitAccountData: TransactionRelationshipsDebitAccountData,
    /**
     * The UserRole model constructor.
     * @property {module:model/UserRole}
     */
    UserRole: UserRole,
    /**
     * The UserRoleAttributes model constructor.
     * @property {module:model/UserRoleAttributes}
     */
    UserRoleAttributes: UserRoleAttributes,
    /**
     * The UserRoleRelationships model constructor.
     * @property {module:model/UserRoleRelationships}
     */
    UserRoleRelationships: UserRoleRelationships,
    /**
     * The AccountsApi service constructor.
     * @property {module:parasut/AccountsApi}
     */
    AccountsApi: AccountsApi,
    /**
     * The ApiHomeApi service constructor.
     * @property {module:parasut/ApiHomeApi}
     */
    ApiHomeApi: ApiHomeApi,
    /**
     * The BankFeesApi service constructor.
     * @property {module:parasut/BankFeesApi}
     */
    BankFeesApi: BankFeesApi,
    /**
     * The ContactsApi service constructor.
     * @property {module:parasut/ContactsApi}
     */
    ContactsApi: ContactsApi,
    /**
     * The EArchivesApi service constructor.
     * @property {module:parasut/EArchivesApi}
     */
    EArchivesApi: EArchivesApi,
    /**
     * The EInvoiceInboxesApi service constructor.
     * @property {module:parasut/EInvoiceInboxesApi}
     */
    EInvoiceInboxesApi: EInvoiceInboxesApi,
    /**
     * The EInvoicesApi service constructor.
     * @property {module:parasut/EInvoicesApi}
     */
    EInvoicesApi: EInvoicesApi,
    /**
     * The EmployeesApi service constructor.
     * @property {module:parasut/EmployeesApi}
     */
    EmployeesApi: EmployeesApi,
    /**
     * The ItemCategoriesApi service constructor.
     * @property {module:parasut/ItemCategoriesApi}
     */
    ItemCategoriesApi: ItemCategoriesApi,
    /**
     * The ProductsApi service constructor.
     * @property {module:parasut/ProductsApi}
     */
    ProductsApi: ProductsApi,
    /**
     * The PurchaseBillsApi service constructor.
     * @property {module:parasut/PurchaseBillsApi}
     */
    PurchaseBillsApi: PurchaseBillsApi,
    /**
     * The SalariesApi service constructor.
     * @property {module:parasut/SalariesApi}
     */
    SalariesApi: SalariesApi,
    /**
     * The SalesInvoicesApi service constructor.
     * @property {module:parasut/SalesInvoicesApi}
     */
    SalesInvoicesApi: SalesInvoicesApi,
    /**
     * The ShipmentDocumentsApi service constructor.
     * @property {module:parasut/ShipmentDocumentsApi}
     */
    ShipmentDocumentsApi: ShipmentDocumentsApi,
    /**
     * The StockMovementsApi service constructor.
     * @property {module:parasut/StockMovementsApi}
     */
    StockMovementsApi: StockMovementsApi,
    /**
     * The TagsApi service constructor.
     * @property {module:parasut/TagsApi}
     */
    TagsApi: TagsApi,
    /**
     * The TaxesApi service constructor.
     * @property {module:parasut/TaxesApi}
     */
    TaxesApi: TaxesApi,
    /**
     * The TrackableJobsApi service constructor.
     * @property {module:parasut/TrackableJobsApi}
     */
    TrackableJobsApi: TrackableJobsApi,
    /**
     * The TransactionsApi service constructor.
     * @property {module:parasut/TransactionsApi}
     */
    TransactionsApi: TransactionsApi
  };

  return exports;
}));
