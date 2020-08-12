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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/InlineResponse20012', 'model/InlineResponse20110', 'model/InlineResponse2013', 'model/InlineResponse400', 'model/PaymentForm2', 'model/SalaryForm', 'model/SalaryForm1'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/InlineResponse20012'), require('../model/InlineResponse20110'), require('../model/InlineResponse2013'), require('../model/InlineResponse400'), require('../model/PaymentForm2'), require('../model/SalaryForm'), require('../model/SalaryForm1'));
  } else {
    // Browser globals (root is window)
    if (!root.Parasut) {
      root.Parasut = {};
    }
    root.Parasut.SalariesApi = factory(root.Parasut.ApiClient, root.Parasut.InlineResponse20012, root.Parasut.InlineResponse20110, root.Parasut.InlineResponse2013, root.Parasut.InlineResponse400, root.Parasut.PaymentForm2, root.Parasut.SalaryForm, root.Parasut.SalaryForm1);
  }
}(this, function(ApiClient, InlineResponse20012, InlineResponse20110, InlineResponse2013, InlineResponse400, PaymentForm2, SalaryForm, SalaryForm1) {
  'use strict';

  /**
   * Salaries service.
   * @module parasut/SalariesApi
   * @version 4.0.0
   */

  /**
   * Constructs a new SalariesApi. 
   * @alias module:parasut/SalariesApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the archiveSalary operation.
     * @callback module:parasut/SalariesApi~archiveSalaryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20110} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Archive
     * 
     * @param {Number} companyId Firma ID
     * @param {Number} id Maaş ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.include Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
     * @param {module:parasut/SalariesApi~archiveSalaryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InlineResponse20110}
     */
    this.archiveSalary = function(companyId, id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'companyId' is set
      if (companyId === undefined || companyId === null) {
        throw new Error("Missing the required parameter 'companyId' when calling archiveSalary");
      }

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling archiveSalary");
      }


      var pathParams = {
        'company_id': companyId,
        'id': id
      };
      var queryParams = {
        'include': opts['include'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['parasut_auth'];
      var contentTypes = ['application/vnd.api+json'];
      var accepts = ['application/vnd.api+json'];
      var returnType = InlineResponse20110;

      return this.apiClient.callApi(
        '/{company_id}/salaries/{id}/archive', 'PATCH',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createSalary operation.
     * @callback module:parasut/SalariesApi~createSalaryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20110} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create
     * 
     * @param {Number} companyId Firma ID
     * @param {module:model/SalaryForm} salaryForm 
     * @param {Object} opts Optional parameters
     * @param {String} opts.include Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
     * @param {module:parasut/SalariesApi~createSalaryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InlineResponse20110}
     */
    this.createSalary = function(companyId, salaryForm, opts, callback) {
      opts = opts || {};
      var postBody = salaryForm;

      // verify the required parameter 'companyId' is set
      if (companyId === undefined || companyId === null) {
        throw new Error("Missing the required parameter 'companyId' when calling createSalary");
      }

      // verify the required parameter 'salaryForm' is set
      if (salaryForm === undefined || salaryForm === null) {
        throw new Error("Missing the required parameter 'salaryForm' when calling createSalary");
      }


      var pathParams = {
        'company_id': companyId
      };
      var queryParams = {
        'include': opts['include'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['parasut_auth'];
      var contentTypes = ['application/vnd.api+json'];
      var accepts = ['application/vnd.api+json'];
      var returnType = InlineResponse20110;

      return this.apiClient.callApi(
        '/{company_id}/salaries', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteSalary operation.
     * @callback module:parasut/SalariesApi~deleteSalaryCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete
     * 
     * @param {Number} companyId Firma ID
     * @param {Number} id Maaş ID
     * @param {module:parasut/SalariesApi~deleteSalaryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    this.deleteSalary = function(companyId, id, callback) {
      var postBody = null;

      // verify the required parameter 'companyId' is set
      if (companyId === undefined || companyId === null) {
        throw new Error("Missing the required parameter 'companyId' when calling deleteSalary");
      }

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteSalary");
      }


      var pathParams = {
        'company_id': companyId,
        'id': id
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['parasut_auth'];
      var contentTypes = ['application/vnd.api+json'];
      var accepts = ['application/vnd.api+json'];
      var returnType = Object;

      return this.apiClient.callApi(
        '/{company_id}/salaries/{id}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listSalaries operation.
     * @callback module:parasut/SalariesApi~listSalariesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20012} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Index
     * 
     * @param {Number} companyId Firma ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.filterDueDate 
     * @param {String} opts.filterIssueDate 
     * @param {String} opts.filterCurrency 
     * @param {Number} opts.filterRemaining 
     * @param {String} opts.sort Sortable parameters - *Available: id, issue_date, due_date, remaining, description, net_total* (default to id)
     * @param {Number} opts.pageNumber Page Number (default to 1)
     * @param {Number} opts.pageSize Page Size (default to 15)
     * @param {String} opts.include Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: category, tags, payments, activities, employee*
     * @param {module:parasut/SalariesApi~listSalariesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InlineResponse20012}
     */
    this.listSalaries = function(companyId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'companyId' is set
      if (companyId === undefined || companyId === null) {
        throw new Error("Missing the required parameter 'companyId' when calling listSalaries");
      }


      var pathParams = {
        'company_id': companyId
      };
      var queryParams = {
        'filter[due_date]': opts['filterDueDate'],
        'filter[issue_date]': opts['filterIssueDate'],
        'filter[currency]': opts['filterCurrency'],
        'filter[remaining]': opts['filterRemaining'],
        'sort': opts['sort'],
        'page[number]': opts['pageNumber'],
        'page[size]': opts['pageSize'],
        'include': opts['include'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['parasut_auth'];
      var contentTypes = ['application/vnd.api+json'];
      var accepts = ['application/vnd.api+json'];
      var returnType = InlineResponse20012;

      return this.apiClient.callApi(
        '/{company_id}/salaries', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the paySalary operation.
     * @callback module:parasut/SalariesApi~paySalaryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2013} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Pay
     * 
     * @param {Number} companyId Firma ID
     * @param {Number} id Maaş ID
     * @param {module:model/PaymentForm2} paymentForm 
     * @param {Object} opts Optional parameters
     * @param {String} opts.include Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: payable, transaction*
     * @param {module:parasut/SalariesApi~paySalaryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InlineResponse2013}
     */
    this.paySalary = function(companyId, id, paymentForm, opts, callback) {
      opts = opts || {};
      var postBody = paymentForm;

      // verify the required parameter 'companyId' is set
      if (companyId === undefined || companyId === null) {
        throw new Error("Missing the required parameter 'companyId' when calling paySalary");
      }

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling paySalary");
      }

      // verify the required parameter 'paymentForm' is set
      if (paymentForm === undefined || paymentForm === null) {
        throw new Error("Missing the required parameter 'paymentForm' when calling paySalary");
      }


      var pathParams = {
        'company_id': companyId,
        'id': id
      };
      var queryParams = {
        'include': opts['include'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['parasut_auth'];
      var contentTypes = ['application/vnd.api+json'];
      var accepts = ['application/vnd.api+json'];
      var returnType = InlineResponse2013;

      return this.apiClient.callApi(
        '/{company_id}/salaries/{id}/payments', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the showSalary operation.
     * @callback module:parasut/SalariesApi~showSalaryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20110} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Show
     * 
     * @param {Number} companyId Firma ID
     * @param {Number} id Maaş ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.include Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
     * @param {module:parasut/SalariesApi~showSalaryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InlineResponse20110}
     */
    this.showSalary = function(companyId, id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'companyId' is set
      if (companyId === undefined || companyId === null) {
        throw new Error("Missing the required parameter 'companyId' when calling showSalary");
      }

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling showSalary");
      }


      var pathParams = {
        'company_id': companyId,
        'id': id
      };
      var queryParams = {
        'include': opts['include'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['parasut_auth'];
      var contentTypes = ['application/vnd.api+json'];
      var accepts = ['application/vnd.api+json'];
      var returnType = InlineResponse20110;

      return this.apiClient.callApi(
        '/{company_id}/salaries/{id}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the unarchiveSalary operation.
     * @callback module:parasut/SalariesApi~unarchiveSalaryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20110} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Unarchive
     * 
     * @param {Number} companyId Firma ID
     * @param {Number} id Maaş ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.include Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
     * @param {module:parasut/SalariesApi~unarchiveSalaryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InlineResponse20110}
     */
    this.unarchiveSalary = function(companyId, id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'companyId' is set
      if (companyId === undefined || companyId === null) {
        throw new Error("Missing the required parameter 'companyId' when calling unarchiveSalary");
      }

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling unarchiveSalary");
      }


      var pathParams = {
        'company_id': companyId,
        'id': id
      };
      var queryParams = {
        'include': opts['include'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['parasut_auth'];
      var contentTypes = ['application/vnd.api+json'];
      var accepts = ['application/vnd.api+json'];
      var returnType = InlineResponse20110;

      return this.apiClient.callApi(
        '/{company_id}/salaries/{id}/unarchive', 'PATCH',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateSalary operation.
     * @callback module:parasut/SalariesApi~updateSalaryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20110} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Edit
     * 
     * @param {Number} companyId Firma ID
     * @param {Number} id Maaş ID
     * @param {module:model/SalaryForm1} salaryForm 
     * @param {Object} opts Optional parameters
     * @param {String} opts.include Response ile birlikte geri dönmesini istediğiniz ilişkiler - *Available: employee, category, tags*
     * @param {module:parasut/SalariesApi~updateSalaryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InlineResponse20110}
     */
    this.updateSalary = function(companyId, id, salaryForm, opts, callback) {
      opts = opts || {};
      var postBody = salaryForm;

      // verify the required parameter 'companyId' is set
      if (companyId === undefined || companyId === null) {
        throw new Error("Missing the required parameter 'companyId' when calling updateSalary");
      }

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateSalary");
      }

      // verify the required parameter 'salaryForm' is set
      if (salaryForm === undefined || salaryForm === null) {
        throw new Error("Missing the required parameter 'salaryForm' when calling updateSalary");
      }


      var pathParams = {
        'company_id': companyId,
        'id': id
      };
      var queryParams = {
        'include': opts['include'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['parasut_auth'];
      var contentTypes = ['application/vnd.api+json'];
      var accepts = ['application/vnd.api+json'];
      var returnType = InlineResponse20110;

      return this.apiClient.callApi(
        '/{company_id}/salaries/{id}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
