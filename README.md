# Paraşut Node.js kütüphanesi

    # GİRİŞ


    ## API Hakkında


    Paraşüt API'yi kullanmak veya görüşlerinizi
    bizimle paylaşmak isterseniz lütfen bizimle destek@parasut.com adresi
    üzerinden iletişime geçiniz.


    API'yi kullanarak Paraşüt verilerine ulaşabilir ve kendi yazdığınız
    uygulamalar ile entegre edebilirsiniz. API vasıtasıyla Paraşüt Web arayüzü
    ile yapılan hemen her işlemi gerçekleştirebilirsiniz.



    - API geliştirmesinde çoğunlukla JSONAPI (http://jsonapi.org/)
    standartlarına uymaya çalıştık.


    - Dökümantasyon oluşturulmasında ise OpenAPI-Swagger 2.0 kullandık.


    - API hizmetimizin `BASE_URL`i `https://api.parasut.com` şeklindedir.


    - V4 endpointlerine ulaşmak için `https://api.parasut.com/v4` şeklinde
    kullanabilirsiniz.


    ## Genel Bilgiler


    - API metodlarına erişmek için baz URL olarak
    `https://api.parasut.com/v4/firma_no` adresi kullanılır.
      - Bu yapıda kullanılan `firma_no` parametresi bilgisine erişilmek istenin firmanın Paraşüt veritabanındaki kayıt numarasıdır.
      - Örneğin 115 numaralı firmanın müşteri/tedarikçi listesine erişmek için `https://api.parasut.com/v4/115/contacts` adresi kullanılır.
    - İstekleri gönderirken `Content-Type` header'ı olarak `application/json`
    veya `application/vnd.api+json` göndermelisiniz.

    - Yeni bir kayıt oluştururken **ilgili** kaydın `ID` parametresini boş
    göndermeli veya hiç göndermemelisiniz.
      - Örnek: Satış faturası oluştururken `data->id` boş olmalı, ama `relationships->contact->data->id` dolu olmalı, çünkü gönderdiğiniz müşterinizin ID'si daha önceden elinizde bulunmalıdır. Aynı şekilde `relationships->details->data` içerisinde tanımladığınız ID'ler de boş olmalı, çünkü henüz fatura kalemi yaratmadınız.
    - API endpointlerine ulaşmak için, aldığınız `access_token`'ı sorgulara
    `Authorization` header'ı olarak `Bearer access_token` şeklinde
    göndermelisiniz.

    - Dakikada 60 adet istek gönderebilirsiniz.


    # Authentication


    <!-- ReDoc-Inject: <security-definitions> -->


    Paraşüt API kimlik doğrulama için oAuth2 kullanmaktadır. Bu protokolü
    destekleyen istemci kütüphanelerini kullanarak oturum açabilir ve API'yi
    kullanabilirsiniz.


    Gerekli CLIENT_ID, CLIENT_SECRET ve REDIRECT_URL bilgilerini almak için
    destek@parasut.com adresine mail atabilirsiniz.


    Kimlik doğrulama işleminin başarılı olması durumunda bir adet kimlik jetonu
    (authentication token) ve bir adet de yenileme jetonu (refresh token)
    gönderilecektir. Kimlik jetonu 2 saat süreyle geçerlidir ve her istekte http
    başlık bilgilerinin içerisinde gönderilmelidir. Bu sürenin sonunda kimlik
    jetonu geçerliliğini yitirecektir ve yenileme jetonu kullanılarak tekrar
    üretilmesi gerekmektedir.


    ## access_token almak:


    access_token almanız için iki farklı seçenek bulunmaktadır.


    Kullanım şeklinize bağlı olarak iki yöntemden birini tercih etmelisiniz.


    ### 1. grant_type=authorization_code


    Bu yöntemi kullanabilmek için öncelikle aşağıda belirtildiği gibi
    kullanıcıyı başarılı authentication işleminin ardından yönlendirmek
    istediğiniz `REDIRECT_URL`'i bize ulaşarak kayıt ettirmeniz gerekmektedir.
    `REDIRECT_URL` varsayılan olarak `urn:ietf:wg:oauth:2.0:oob` gelmektedir.


    Size özel bir REDIRECT_URL tanımlamak isterseniz destek@parasut.com adresine
    mail atabilirsiniz.


    1. Kullanıcıyı şu adrese yönlendirin:

      ```
      BASE_URL/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URL&response_type=code
      ```

    2. Oturum açmışsa ve uygulamayı kabul ederse, kullanıcı sizin tanımladığınız
    REDIRECT_URL'e şu şekilde gelmesi gerekiyor:
      `REDIRECT_URL?code=xxxxxxx`

    3. Burada size gelen "code" parametresi ile access token almalısınız.


    ```bash

    curl -F grant_type=authorization_code \

    -F client_id=CLIENT_ID \

    -F client_secret=CLIENT_SECRET \

    -F code=RETURNED_CODE \

    -F redirect_uri=REDIRECT_URL \

    -X POST BASE_URL/oauth/token

    ```


    ### 2. grant_type=password


    E-posta ve şifre ile access_token almanız için aşağıdaki istekte size özel
    alanları doldurarak POST isteği atmanız gerekmektedir.


    ```bash

    curl -F grant_type=password \

    -F client_id=CLIENT_ID \

    -F client_secret=CLIENT_SECRET \

    -F username=YOUREMAIL \

    -F password=YOURPASSWORD \

    -F redirect_uri=urn:ietf:wg:oauth:2.0:oob \

    -X POST BASE_URL/oauth/token

    ```


    ### Sonuç


    Her iki yöntem sonucunda size aşağıdaki gibi bir sonuç dönecektir:


    ```json

    {
     "access_token": "XYZXYZXYZ",
     "token_type": "bearer",
     "expires_in": 7200,
     "refresh_token": "ABCABCABC"
    }

    ```


    Burada dönen `access_token`'ı API endpointlerine ulaşmak için gönderdiğiniz
    sorgulara `Authorization` header'ı olarak `Bearer XYZXYZXYZ` şeklinde
    eklemeniz gerekiyor.



    #### Refresh token ile yeni access_token alma örneği:


    `access_token` geçerliliğini 2 saat içerisinde yitirdiği için
    `refresh_token` ile yeni token alabilirsiniz.


    ```bash

    curl -F grant_type=refresh_token \

    -F client_id=CLIENT_ID \

    -F client_secret=CLIENT_SECRET \

    -F refresh_token=REFRESH_TOKEN \

    -X POST BASE_URL/oauth/token

    ```


    `refresh_token` ile yeni bir `access_token` alırken aynı zamanda yeni bir
    `refresh_token` da almaktasınız. Dolayısıyla, daha sonra yeniden bir
    `access_token` alma isteğinizde size dönen yeni `refresh_token`ı
    kullanmalısınız.


    # SIK KULLANILAN İŞLEMLER


    ## Kullanıcı Bilgisi


    `access_token` aldığınız kullanıcının genel bilgilerini görmek için
    [/me](/#operation/showMe) adresini kullanabilirsiniz.


    ## Satış Faturası Oluşturma


    Satış faturası oluşturmak için bir müşteri (`contact`) `id`'si ve bir veya
    birden fazla ürün (`product`) `id`'sine ihtiyacınız vardır.


    ### Müşteri


    ##### Yeni bir müşteri ile


    Eğer ihtiyaç duyduğunuz müşteri bilgisi henüz yoksa, öncelikle müşteri
    oluşturmanız gereklidir. Bunun için [Müşteri
    oluşturma](/#operation/createContact) endpoint'ini kullanmalısınız. Başarılı
    bir şekilde müşteri oluşturulursa size dönecek olan yanıt ihtiyaç
    duyacağınız müşteri `id`'sini içerir.


    ##### Mevcut bir müşteri ile


    Eğer daha önceden zaten oluşturduğunuz bir müşteri ile ilişkili bir satış
    faturası oluşturacaksanız öncelikle o müşterinin `id`'sini öğrenmeniz
    gerekir. Bunun için [Müşteri listesi](/#operation/listContacts) endpoint'ini
    kullanabilirsiniz. Müşteri listesi endpoint'i isim, e-posta, vergi numarası
    gibi çeşitli filtreleri destekler. Bunları kullanarak aradığınız müşteriyi
    bulabilirsiniz.


    ### Ürün


    ##### Yeni bir ürün ile


    Eğer ihtiyaç duyduğunuz ürün bilgisi henüz yoksa, öncelikle ürün
    oluşturmanız gereklidir. Bunun için [Ürün
    oluşturma](/#operation/createProduct) endpoint'ini kullanmalısınız. Başarılı
    bir şekilde ürün oluşturulursa size dönecek olan yanıt ihtiyaç duyacağınız
    ürün `id`'sini içerir.


    ##### Mevcut bir ürün ile


    Eğer daha önceden oluşturduğunuz bir ürünü kullanarak bir satış faturası
    oluşturacaksanız öncelikle o ürünün `id`'sini öğrenmeniz gerekir. Bunun için
    [Ürün listesi](/#operation/listProducts) endpoint'ini kullanabilirsiniz.
    Ürün listesi endpoint'i isim, kod gibi çeşitli filtreleri destekler. Bunları
    kullanarak aradığınız ürünü bulabilirsiniz.


    ---


    İhtiyaç duyduğunuz müşteri ve ürün `id`'lerini aldıktan sonra [Satış
    Faturası Oluşturma](/#operation/createSalesInvoice) endpoint'i ile satış
    faturası oluşturabilirsiniz. Endpoint'in tanımında sağ tarafta beklediğimiz
    veri şekli bulunmaktadır, aşağıdaki bilgileri verinin şekli ile kıyaslamak
    daha açıklayıcı olabilir.


    Dikkat edilecek noktalar:

    * `relationships` altındaki `contact`'te bulunan `id` alanına müşteri
    `id`'sini girmeniz gereklidir.

    * `relationships` altındaki `details` kısmı bir listedir (`array`) ve fatura
    kalemlerini temsil eder. Bu listenin her elemanının ilişkili olduğu bir ürün
    vardır. Yani `details` altındaki her elemanın kendine ait bir
    `relationships` kısmı mevcuttur. Buradaki `product` `id` alanı üstteki ürün
    adımlarında elde ettiğiniz `id`'yi koymanız gereken yerdir.


    ## Satış Faturasına Tahsilat Ekleme


    [Tahsilat ekleme](/#operation/paySalesInvoice) kısmındaki ilgili alanları
    doldurarak satış faturasına tahsilat ekleyebilirsiniz.


    ## Satış Faturasının Tahsilatını Silme


    Bir satış faturasının tahsilatını silmek aslında o tahsilatı oluşturan para
    akış işlemini silmek demektir. Bir işlemi silmeden önce o işlemin `id`'sine
    ihtiyacınız vardır.


    Bir satış faturasına ait tahsilatları almak için [Satış faturası bilgilerini
    alma (show)](/#operation/showSalesInvoice) endpoint'ine istek atarken
    `?include=payments` parametresini de eklemelisiniz. Bu size satış faturası
    bilgilerine ilave olarak tahsilatları da verir.


    Tahsilatlar ile birlikte o tahsilatları oluşturan işlemleri de almak için
    yine aynı endpoint'e `?include=payments.transaction` parametresini ekleyerek
    istek yapmanız gerekir. Bu size hem satış faturası bilgilerini, hem tahsilat
    bilgilerini hem de tahsilatı oluşturan işlemlerin bilgilerini verir.


    `?include=payments.transaction` parametresini kullanarak yaptığınız istek
    ile işlem (`transaction`) `id`'sini aldıktan sonra [işlem
    silme](/#operation/deleteTransaction) endpoint'inde bu `id`'yi kullanarak
    silme işlemini yapabilirsiniz.


    ## Satış Faturası Resmileştirme


    Oluşturduğunuz bir satış faturası varsa onu e-Arşiv veya e-Fatura olarak
    resmileştirmek için aşağıdakileri yapmanız gereklidir.


    1. Öncelikle müşterinizin e-Fatura kullanıcısı olup olmadığını
    öğrenmelisiniz. Bunun için müşterinizin e-Fatura gelen kutusu olup
    olmadığına bakmak gereklidir. [e-Fatura gelen
    kutusu](/#operation/listEInvoiceInboxes) endpoint'ine müşterinin vkn'sini
    kullanarak bir istek yaptığınızda eğer bir gelen kutusu olduğuna dair yanıt
    alıyorsanız müşteri e-Fatura kullanıcısıdır. Müşteri e-Fatura kullanıcısı
    ise resmileştirme için e-Fatura oluşturmak, e-Fatura kullanıcısı değilse
    e-Arşiv oluşturmak gereklidir.
    
    Oluşturduğunuz e-Fatura, e-Arşiv ve e-Smm’nin
    düzenleme tarihi e-Fatura’ya geçiş sağladığınız aktivasyon tarihinden sonra
    olmalıdır. Aynı zamanda oluşturduğunuz e-Fatura’nın düzenleme tarihi alıcının
    etiketi kullanmaya başladığı tarihten de önce olamaz. Alıcının etiketi
    kullanmaya başladığı tarihi e-Fatura gelen kutusunu çekerek görüntüleyebilirsiniz.

    2. e-Fatura veya e-Arşiv oluşturma:
       * Önceki adımda müşterinin e-Fatura kullanıcısı olduğu öğrenildiyse,  [e-Fatura oluşturma endpoint'i](/#operation/createEInvoice) kullanılarak e-Fatura oluşturmak gereklidir.
       * Önceki adımda müşterinin e-Arşiv kullanıcısı olduğu öğrenildiyse,  [e-Arşiv oluşturma endpoint'i](/#operation/createEArchive) kullanılarak e-Arşiv oluşturmak gereklidir.

       e-Fatura ve e-Arşiv oluşturma işlemi synchronous değildir. Yani istek arka planda yerine getirilir. Bu yüzden e-Fatura veya e-Arşiv oluşturma endpoint'leri cevap olarak oluşturma işleminin durumunu takip edebileceğiniz bir işlem `id`'si döner. Bu işlem `id`'sini [sorgulama](/#tag/TrackableJobs) endpoint'inde belirli aralıklarla kullanıp oluşturma işleminin durumunu takip etmeniz gerekmektedir. İşlem durumu ile ilgili aşağıdaki yanıtları alabilirsiniz:
       * `status: "pending"` işlemin sırada olduğunu, henüz başlamadığını gösterir.
       * `status: "running"` işlemin yapılmakta olduğunu ancak henüz sonuçlanmadığını gösterir.
       * `status: "error"` işlemde bir hata olduğu anlamına gelir. Dönen yanıtta hata mesajını inceleyebilirsiniz.
       * `status: "done"` işlemin başarılı bir şekilde sonuçlandığını gösterir.
    4. e-Fatura / e-Arşiv işleminin başarılı bir şekilde sonuçlandığını
    gördükten sonra e-Fatura / e-Arşiv bilgilerini almak için [Satış faturası
    bilgilerini alma (show)](/#operation/showSalesInvoice) endpoint'ine
    `?include=active_e_document` parametresi ile istek yapmanız gerekmektedir.
    Buradan sıradaki adımda ihtiyaç duyacağınız e-Fatura / e-Arşiv `id`'lerini
    ve başka bilgileri de alabilirsiniz.

    5. e-Fatura / e-Arşiv başarılı bir resmileştirildikten sonra müşterilerinize
    PDF olarak göndermek isteyebilirsiniz. Bunun için:
       * e-Arşiv için, 4. adımda elde edeceğiniz e-Arşiv `id`'sini kullanarak [e-Arşiv PDF](/#operation/showEArchivePdf) endpoint'ine istek atabilirsiniz. Bu endpoint PDF henüz yoksa boş bir yanıt ile birlikte 204 döner. Yani 204 almayana kadar belirli aralıklarla bu endpoint'e istek yapmanız gerekmektedir. Geçerli yanıt aldığınızda size dönecek olan PDF URL 1 saat için geçerlidir. Bu yüzden bu linki direk olarak müşterinizle **paylaşmamalısınız**. İndirip müşterinize kendiniz göndermelisiniz.
       * e-Arşiv için anlatılan senaryonun aynısı e-Fatura için de geçerlidir. Tek farklı kısım isteği yapacağınız endpoint'dir: [e-Fatura PDF](/#operation/showEInvoicePdf)

    ## İrsaliye Oluşturma


    İrsaliye oluşturmak için bir müşteri/tedarikçi (`contact`) `id`'si ve bir
    veya birden fazla ürün (`product`) `id`'sine ihtiyacınız vardır.


    ### Müşteri/Tedarikçi


    ##### Yeni bir müşteri/tedarikçi ile


    Eğer ihtiyaç duyduğunuz müşteri/tedarikçi bilgisi henüz yoksa, öncelikle
    müşteri/tedarikçi oluşturmanız gereklidir. Bunun için [Müşteri/Tedarikçi
    oluşturma](/#operation/createContact) endpoint'ini kullanmalısınız. Başarılı
    bir şekilde müşteri/tedarikçi oluşturulursa size dönecek olan yanıt ihtiyaç
    duyacağınız müşteri/tedarikçi `id`'sini içerir.


    ##### Mevcut bir müşteri/tedarikçi ile


    Eğer daha önceden zaten oluşturduğunuz bir müşteri/tedarikçi ile ilişkili
    bir irsaliye oluşturacaksanız öncelikle o müşteri/tedarikçinin `id`'sini
    öğrenmeniz gerekir. Bunun için [Müşteri/tedarikçi
    listesi](/#operation/listContacts) endpoint'ini kullanabilirsiniz.
    Müşteri/tedarikçi listesi endpoint'i isim, e-posta, vergi numarası gibi
    çeşitli filtreleri destekler. Bunları kullanarak aradığınız
    müşteri/tedarikçiyi bulabilirsiniz.


    ### Ürün


    ##### Yeni bir ürün ile


    Eğer ihtiyaç duyduğunuz ürün bilgisi henüz yoksa, öncelikle ürün
    oluşturmanız gereklidir. Bunun için [Ürün
    oluşturma](/#operation/createProduct) endpoint'ini kullanmalısınız. Başarılı
    bir şekilde ürün oluşturulursa size dönecek olan yanıt ihtiyaç duyacağınız
    ürün `id`'sini içerir.


    ##### Mevcut bir ürün ile


    Eğer daha önceden oluşturduğunuz bir ürünü kullanarak bir irsaliye
    oluşturacaksanız öncelikle o ürünün `id`'sini öğrenmeniz gerekir. Bunun için
    [Ürün listesi](/#operation/listProducts) endpoint'ini kullanabilirsiniz.
    Ürün listesi endpoint'i isim, kod gibi çeşitli filtreleri destekler. Bunları
    kullanarak aradığınız ürünü bulabilirsiniz.


    ---


    İhtiyaç duyduğunuz müşteri/tedarikçi ve ürün `id`'lerini aldıktan sonra
    [İrsaliye Oluşturma](/#operation/createShipmentDocument) endpoint'i ile
    irsaliye oluşturabilirsiniz. Endpoint'in tanımında sağ tarafta beklediğimiz
    veri şekli bulunmaktadır, aşağıdaki bilgileri verinin şekli ile kıyaslamak
    daha açıklayıcı olabilir.


    Dikkat edilecek noktalar:

    * `relationships` altındaki `contact`'te bulunan `id` alanına
    müşteri/tedarikçi `id`'sini girmeniz gereklidir.

    * `relationships` altındaki `stock_movements` kısmı bir listedir (`array`)
    ve irsaliye kalemlerini temsil eder. Bu listenin her elemanının ilişkili
    olduğu bir ürün vardır. Yani `stock_movements` altındaki her elemanın
    kendine ait bir `relationships` kısmı mevcuttur. Buradaki `product` `id`
    alanı üstteki ürün adımlarında elde ettiğiniz `id`'yi koymanız gereken
    yerdir.
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 4.0.0
- Package version: 4.0.0
- Build package: io.swagger.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install parasut --save
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing 
into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

Finally, switch to the directory you want to use your parasut from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

You should now be able to `require('parasut')` in javascript files from the directory you ran the last 
command above from.

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/0xc0d3d00d/parasut.js
then install it via:

```shell
    npm install 0xc0d3d00d/parasut.js --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file, that's to say your javascript file where you actually 
use this library):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var Parasut = require('parasut');

var defaultClient = Parasut.ApiClient.instance;

// Configure OAuth2 access token for authorization: parasut_auth
var parasut_auth = defaultClient.authentications['parasut_auth'];
parasut_auth.accessToken = "YOUR ACCESS TOKEN"

var api = new Parasut.AccountsApi()

var companyId = 56; // {Number} Firma ID

var accountForm = new Parasut.AccountForm(); // {AccountForm} 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.createAccount(companyId, accountForm, callback);

```

## Documentation for API Endpoints

All URIs are relative to *https://api.parasut.com/v4*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*Parasut.AccountsApi* | [**createAccount**](docs/AccountsApi.md#createAccount) | **POST** /{company_id}/accounts | Create
*Parasut.AccountsApi* | [**createCreditTransaction**](docs/AccountsApi.md#createCreditTransaction) | **POST** /{company_id}/accounts/{id}/credit_transactions | Credit Transaction
*Parasut.AccountsApi* | [**createDebitTransaction**](docs/AccountsApi.md#createDebitTransaction) | **POST** /{company_id}/accounts/{id}/debit_transactions | Debit Transaction
*Parasut.AccountsApi* | [**deleteAccount**](docs/AccountsApi.md#deleteAccount) | **DELETE** /{company_id}/accounts/{id} | Delete
*Parasut.AccountsApi* | [**listAccountTransactions**](docs/AccountsApi.md#listAccountTransactions) | **GET** /{company_id}/accounts/{id}/transactions | Transactions
*Parasut.AccountsApi* | [**listAccounts**](docs/AccountsApi.md#listAccounts) | **GET** /{company_id}/accounts | Index
*Parasut.AccountsApi* | [**showAccount**](docs/AccountsApi.md#showAccount) | **GET** /{company_id}/accounts/{id} | Show
*Parasut.AccountsApi* | [**updateAccount**](docs/AccountsApi.md#updateAccount) | **PUT** /{company_id}/accounts/{id} | Edit
*Parasut.ApiHomeApi* | [**showMe**](docs/ApiHomeApi.md#showMe) | **GET** /me | Show
*Parasut.BankFeesApi* | [**archiveBankFee**](docs/BankFeesApi.md#archiveBankFee) | **PATCH** /{company_id}/bank_fees/{id}/archive | Archive
*Parasut.BankFeesApi* | [**createBankFee**](docs/BankFeesApi.md#createBankFee) | **POST** /{company_id}/bank_fees | Create
*Parasut.BankFeesApi* | [**deleteBankFee**](docs/BankFeesApi.md#deleteBankFee) | **DELETE** /{company_id}/bank_fees/{id} | Delete
*Parasut.BankFeesApi* | [**payBankFee**](docs/BankFeesApi.md#payBankFee) | **POST** /{company_id}/bank_fees/{id}/payments | Pay
*Parasut.BankFeesApi* | [**showBankFee**](docs/BankFeesApi.md#showBankFee) | **GET** /{company_id}/bank_fees/{id} | Show
*Parasut.BankFeesApi* | [**unarchiveBankFee**](docs/BankFeesApi.md#unarchiveBankFee) | **PATCH** /{company_id}/bank_fees/{id}/unarchive | Unarchive
*Parasut.BankFeesApi* | [**updateBankFee**](docs/BankFeesApi.md#updateBankFee) | **PUT** /{company_id}/bank_fees/{id} | Edit
*Parasut.ContactsApi* | [**collectFromContact**](docs/ContactsApi.md#collectFromContact) | **POST** /{company_id}/contacts/{id}/contact_debit_transactions | Tahsilat
*Parasut.ContactsApi* | [**createContact**](docs/ContactsApi.md#createContact) | **POST** /{company_id}/contacts | Create
*Parasut.ContactsApi* | [**deleteContact**](docs/ContactsApi.md#deleteContact) | **DELETE** /{company_id}/contacts/{id} | Delete
*Parasut.ContactsApi* | [**listContacts**](docs/ContactsApi.md#listContacts) | **GET** /{company_id}/contacts | Index
*Parasut.ContactsApi* | [**payToContact**](docs/ContactsApi.md#payToContact) | **POST** /{company_id}/contacts/{id}/contact_credit_transactions | Ödeme
*Parasut.ContactsApi* | [**showContact**](docs/ContactsApi.md#showContact) | **GET** /{company_id}/contacts/{id} | Show
*Parasut.ContactsApi* | [**updateContact**](docs/ContactsApi.md#updateContact) | **PUT** /{company_id}/contacts/{id} | Edit
*Parasut.EArchivesApi* | [**createEArchive**](docs/EArchivesApi.md#createEArchive) | **POST** /{company_id}/e_archives | Create
*Parasut.EArchivesApi* | [**showEArchive**](docs/EArchivesApi.md#showEArchive) | **GET** /{company_id}/e_archives/{id} | Show
*Parasut.EArchivesApi* | [**showEArchivePdf**](docs/EArchivesApi.md#showEArchivePdf) | **GET** /{company_id}/e_archives/{id}/pdf | Show PDF
*Parasut.EInvoiceInboxesApi* | [**listEInvoiceInboxes**](docs/EInvoiceInboxesApi.md#listEInvoiceInboxes) | **GET** /{company_id}/e_invoice_inboxes | Index
*Parasut.EInvoicesApi* | [**createEInvoice**](docs/EInvoicesApi.md#createEInvoice) | **POST** /{company_id}/e_invoices | Create
*Parasut.EInvoicesApi* | [**showEInvoice**](docs/EInvoicesApi.md#showEInvoice) | **GET** /{company_id}/e_invoices/{id} | Show
*Parasut.EInvoicesApi* | [**showEInvoicePdf**](docs/EInvoicesApi.md#showEInvoicePdf) | **GET** /{company_id}/e_invoices/{id}/pdf | Show PDF
*Parasut.EmployeesApi* | [**archiveEmployee**](docs/EmployeesApi.md#archiveEmployee) | **PATCH** /{company_id}/employees/{id}/archive | Archive
*Parasut.EmployeesApi* | [**createEmployee**](docs/EmployeesApi.md#createEmployee) | **POST** /{company_id}/employees | Create
*Parasut.EmployeesApi* | [**deleteEmployee**](docs/EmployeesApi.md#deleteEmployee) | **DELETE** /{company_id}/employees/{id} | Delete
*Parasut.EmployeesApi* | [**listEmployees**](docs/EmployeesApi.md#listEmployees) | **GET** /{company_id}/employees | Index
*Parasut.EmployeesApi* | [**showEmployee**](docs/EmployeesApi.md#showEmployee) | **GET** /{company_id}/employees/{id} | Show
*Parasut.EmployeesApi* | [**unarchiveEmployee**](docs/EmployeesApi.md#unarchiveEmployee) | **PATCH** /{company_id}/employees/{id}/unarchive | Unarchive
*Parasut.EmployeesApi* | [**updateEmployee**](docs/EmployeesApi.md#updateEmployee) | **PUT** /{company_id}/employees/{id} | Edit
*Parasut.ItemCategoriesApi* | [**createItemCategory**](docs/ItemCategoriesApi.md#createItemCategory) | **POST** /{company_id}/item_categories | Create
*Parasut.ItemCategoriesApi* | [**deleteItemCategory**](docs/ItemCategoriesApi.md#deleteItemCategory) | **DELETE** /{company_id}/item_categories/{id} | Delete
*Parasut.ItemCategoriesApi* | [**listItemCategories**](docs/ItemCategoriesApi.md#listItemCategories) | **GET** /{company_id}/item_categories | Index
*Parasut.ItemCategoriesApi* | [**showItemCategory**](docs/ItemCategoriesApi.md#showItemCategory) | **GET** /{company_id}/item_categories/{id} | Kategori bilgisini gösterir.
*Parasut.ItemCategoriesApi* | [**updateItemCategory**](docs/ItemCategoriesApi.md#updateItemCategory) | **PUT** /{company_id}/item_categories/{id} | Edit
*Parasut.ProductsApi* | [**createProduct**](docs/ProductsApi.md#createProduct) | **POST** /{company_id}/products | Create
*Parasut.ProductsApi* | [**deleteProduct**](docs/ProductsApi.md#deleteProduct) | **DELETE** /{company_id}/products/{id} | Delete
*Parasut.ProductsApi* | [**listProducts**](docs/ProductsApi.md#listProducts) | **GET** /{company_id}/products | Index
*Parasut.ProductsApi* | [**showProduct**](docs/ProductsApi.md#showProduct) | **GET** /{company_id}/products/{id} | Show
*Parasut.ProductsApi* | [**updateProduct**](docs/ProductsApi.md#updateProduct) | **PUT** /{company_id}/products/{id} | Edit
*Parasut.PurchaseBillsApi* | [**archivePurchaseBill**](docs/PurchaseBillsApi.md#archivePurchaseBill) | **PATCH** /{company_id}/purchase_bills/{id}/archive | Archive
*Parasut.PurchaseBillsApi* | [**cancelPurchaseBill**](docs/PurchaseBillsApi.md#cancelPurchaseBill) | **DELETE** /{company_id}/purchase_bills/{id}/cancel | Cancel
*Parasut.PurchaseBillsApi* | [**createPurchaseBillBasic**](docs/PurchaseBillsApi.md#createPurchaseBillBasic) | **POST** /{company_id}/purchase_bills#basic | Create Basic PurchaseBill
*Parasut.PurchaseBillsApi* | [**createPurchaseBillDetailed**](docs/PurchaseBillsApi.md#createPurchaseBillDetailed) | **POST** /{company_id}/purchase_bills#detailed | Create Detailed PurchaseBill
*Parasut.PurchaseBillsApi* | [**deletePurchaseBill**](docs/PurchaseBillsApi.md#deletePurchaseBill) | **DELETE** /{company_id}/purchase_bills/{id} | Delete
*Parasut.PurchaseBillsApi* | [**listPurchaseBills**](docs/PurchaseBillsApi.md#listPurchaseBills) | **GET** /{company_id}/purchase_bills | Index
*Parasut.PurchaseBillsApi* | [**payPurchaseBill**](docs/PurchaseBillsApi.md#payPurchaseBill) | **POST** /{company_id}/purchase_bills/{id}/payments | Pay
*Parasut.PurchaseBillsApi* | [**recoverPurchaseBill**](docs/PurchaseBillsApi.md#recoverPurchaseBill) | **PATCH** /{company_id}/purchase_bills/{id}/recover | Recover
*Parasut.PurchaseBillsApi* | [**showPurchaseBill**](docs/PurchaseBillsApi.md#showPurchaseBill) | **GET** /{company_id}/purchase_bills/{id} | Show
*Parasut.PurchaseBillsApi* | [**unarchivePurchaseBill**](docs/PurchaseBillsApi.md#unarchivePurchaseBill) | **PATCH** /{company_id}/purchase_bills/{id}/unarchive | Unarchive
*Parasut.PurchaseBillsApi* | [**updatePurchaseBillBasic**](docs/PurchaseBillsApi.md#updatePurchaseBillBasic) | **PUT** /{company_id}/purchase_bills/{id}#basic | Edit Basic PurchaseBill
*Parasut.PurchaseBillsApi* | [**updatePurchaseBillDetailed**](docs/PurchaseBillsApi.md#updatePurchaseBillDetailed) | **PUT** /{company_id}/purchase_bills/{id}#detailed | Edit Detailed PurchaseBill
*Parasut.SalariesApi* | [**archiveSalary**](docs/SalariesApi.md#archiveSalary) | **PATCH** /{company_id}/salaries/{id}/archive | Archive
*Parasut.SalariesApi* | [**createSalary**](docs/SalariesApi.md#createSalary) | **POST** /{company_id}/salaries | Create
*Parasut.SalariesApi* | [**deleteSalary**](docs/SalariesApi.md#deleteSalary) | **DELETE** /{company_id}/salaries/{id} | Delete
*Parasut.SalariesApi* | [**listSalaries**](docs/SalariesApi.md#listSalaries) | **GET** /{company_id}/salaries | Index
*Parasut.SalariesApi* | [**paySalary**](docs/SalariesApi.md#paySalary) | **POST** /{company_id}/salaries/{id}/payments | Pay
*Parasut.SalariesApi* | [**showSalary**](docs/SalariesApi.md#showSalary) | **GET** /{company_id}/salaries/{id} | Show
*Parasut.SalariesApi* | [**unarchiveSalary**](docs/SalariesApi.md#unarchiveSalary) | **PATCH** /{company_id}/salaries/{id}/unarchive | Unarchive
*Parasut.SalariesApi* | [**updateSalary**](docs/SalariesApi.md#updateSalary) | **PUT** /{company_id}/salaries/{id} | Edit
*Parasut.SalesInvoicesApi* | [**archiveSalesInvoice**](docs/SalesInvoicesApi.md#archiveSalesInvoice) | **PATCH** /{company_id}/sales_invoices/{id}/archive | Archive
*Parasut.SalesInvoicesApi* | [**cancelSalesInvoice**](docs/SalesInvoicesApi.md#cancelSalesInvoice) | **DELETE** /{company_id}/sales_invoices/{id}/cancel | Cancel
*Parasut.SalesInvoicesApi* | [**convertEstimateToInvoice**](docs/SalesInvoicesApi.md#convertEstimateToInvoice) | **PATCH** /{company_id}/sales_invoices/{id}/convert_to_invoice | Convert estimate to invoice
*Parasut.SalesInvoicesApi* | [**createSalesInvoice**](docs/SalesInvoicesApi.md#createSalesInvoice) | **POST** /{company_id}/sales_invoices | Create
*Parasut.SalesInvoicesApi* | [**deleteSalesInvoice**](docs/SalesInvoicesApi.md#deleteSalesInvoice) | **DELETE** /{company_id}/sales_invoices/{id} | Delete
*Parasut.SalesInvoicesApi* | [**listSalesInvoices**](docs/SalesInvoicesApi.md#listSalesInvoices) | **GET** /{company_id}/sales_invoices | Index
*Parasut.SalesInvoicesApi* | [**paySalesInvoice**](docs/SalesInvoicesApi.md#paySalesInvoice) | **POST** /{company_id}/sales_invoices/{id}/payments | Pay
*Parasut.SalesInvoicesApi* | [**recoverSalesInvoice**](docs/SalesInvoicesApi.md#recoverSalesInvoice) | **PATCH** /{company_id}/sales_invoices/{id}/recover | Recover
*Parasut.SalesInvoicesApi* | [**showSalesInvoice**](docs/SalesInvoicesApi.md#showSalesInvoice) | **GET** /{company_id}/sales_invoices/{id} | Show
*Parasut.SalesInvoicesApi* | [**unarchiveSalesInvoice**](docs/SalesInvoicesApi.md#unarchiveSalesInvoice) | **PATCH** /{company_id}/sales_invoices/{id}/unarchive | Unarchive
*Parasut.SalesInvoicesApi* | [**updateSalesInvoice**](docs/SalesInvoicesApi.md#updateSalesInvoice) | **PUT** /{company_id}/sales_invoices/{id} | Edit
*Parasut.ShipmentDocumentsApi* | [**createShipmentDocument**](docs/ShipmentDocumentsApi.md#createShipmentDocument) | **POST** /{company_id}/shipment_documents | Create
*Parasut.ShipmentDocumentsApi* | [**deleteShipmentDocument**](docs/ShipmentDocumentsApi.md#deleteShipmentDocument) | **DELETE** /{company_id}/shipment_documents/{id} | Delete
*Parasut.ShipmentDocumentsApi* | [**listShipmentDocuments**](docs/ShipmentDocumentsApi.md#listShipmentDocuments) | **GET** /{company_id}/shipment_documents | Index
*Parasut.ShipmentDocumentsApi* | [**showShipmentDocument**](docs/ShipmentDocumentsApi.md#showShipmentDocument) | **GET** /{company_id}/shipment_documents/{id} | Show
*Parasut.ShipmentDocumentsApi* | [**updateShipmentDocument**](docs/ShipmentDocumentsApi.md#updateShipmentDocument) | **PUT** /{company_id}/shipment_documents/{id} | Edit
*Parasut.StockMovementsApi* | [**listStockMovements**](docs/StockMovementsApi.md#listStockMovements) | **GET** /{company_id}/stock_movements | Index
*Parasut.TagsApi* | [**createTag**](docs/TagsApi.md#createTag) | **POST** /{company_id}/tags | Create
*Parasut.TagsApi* | [**deleteTag**](docs/TagsApi.md#deleteTag) | **DELETE** /{company_id}/tags/{id} | Delete
*Parasut.TagsApi* | [**listTags**](docs/TagsApi.md#listTags) | **GET** /{company_id}/tags | Index
*Parasut.TagsApi* | [**showTag**](docs/TagsApi.md#showTag) | **GET** /{company_id}/tags/{id} | Show
*Parasut.TagsApi* | [**updateTag**](docs/TagsApi.md#updateTag) | **PUT** /{company_id}/tags/{id} | Edit
*Parasut.TaxesApi* | [**archiveTax**](docs/TaxesApi.md#archiveTax) | **PATCH** /{company_id}/taxes/{id}/archive | Archive
*Parasut.TaxesApi* | [**createTax**](docs/TaxesApi.md#createTax) | **POST** /{company_id}/taxes | Create
*Parasut.TaxesApi* | [**deleteTax**](docs/TaxesApi.md#deleteTax) | **DELETE** /{company_id}/taxes/{id} | Delete
*Parasut.TaxesApi* | [**listTaxes**](docs/TaxesApi.md#listTaxes) | **GET** /{company_id}/taxes | Index
*Parasut.TaxesApi* | [**payTax**](docs/TaxesApi.md#payTax) | **POST** /{company_id}/taxes/{id}/payments | Pay
*Parasut.TaxesApi* | [**showTax**](docs/TaxesApi.md#showTax) | **GET** /{company_id}/taxes/{id} | Show
*Parasut.TaxesApi* | [**unarchiveTax**](docs/TaxesApi.md#unarchiveTax) | **PATCH** /{company_id}/taxes/{id}/unarchive | Unarchive
*Parasut.TaxesApi* | [**updateTax**](docs/TaxesApi.md#updateTax) | **PUT** /{company_id}/taxes/{id} | Edit
*Parasut.TrackableJobsApi* | [**showTrackableJob**](docs/TrackableJobsApi.md#showTrackableJob) | **GET** /{company_id}/trackable_jobs/{id} | Show
*Parasut.TransactionsApi* | [**deleteTransaction**](docs/TransactionsApi.md#deleteTransaction) | **DELETE** /{company_id}/transactions/{id} | Delete
*Parasut.TransactionsApi* | [**showTransaction**](docs/TransactionsApi.md#showTransaction) | **GET** /{company_id}/transactions/{id} | Show


## Documentation for Models

 - [Parasut.Account](docs/Account.md)
 - [Parasut.AccountAttributes](docs/AccountAttributes.md)
 - [Parasut.AccountDebitCreditTransactionForm](docs/AccountDebitCreditTransactionForm.md)
 - [Parasut.AccountDebitCreditTransactionFormAttributes](docs/AccountDebitCreditTransactionFormAttributes.md)
 - [Parasut.AccountForm](docs/AccountForm.md)
 - [Parasut.AccountForm1](docs/AccountForm1.md)
 - [Parasut.Address](docs/Address.md)
 - [Parasut.AddressAttributes](docs/AddressAttributes.md)
 - [Parasut.AddressRelationships](docs/AddressRelationships.md)
 - [Parasut.AddressRelationshipsAddressable](docs/AddressRelationshipsAddressable.md)
 - [Parasut.AddressRelationshipsAddressableData](docs/AddressRelationshipsAddressableData.md)
 - [Parasut.BankFee](docs/BankFee.md)
 - [Parasut.BankFeeAttributes](docs/BankFeeAttributes.md)
 - [Parasut.BankFeeForm](docs/BankFeeForm.md)
 - [Parasut.BankFeeForm1](docs/BankFeeForm1.md)
 - [Parasut.Company](docs/Company.md)
 - [Parasut.CompanyAttributes](docs/CompanyAttributes.md)
 - [Parasut.CompanyIdaccountsData](docs/CompanyIdaccountsData.md)
 - [Parasut.CompanyIdaccountsiddebitTransactionsData](docs/CompanyIdaccountsiddebitTransactionsData.md)
 - [Parasut.CompanyIdbankFeesData](docs/CompanyIdbankFeesData.md)
 - [Parasut.CompanyIdbankFeesDataRelationships](docs/CompanyIdbankFeesDataRelationships.md)
 - [Parasut.CompanyIdbankFeesDataRelationshipsCategory](docs/CompanyIdbankFeesDataRelationshipsCategory.md)
 - [Parasut.CompanyIdbankFeesDataRelationshipsCategoryData](docs/CompanyIdbankFeesDataRelationshipsCategoryData.md)
 - [Parasut.CompanyIdbankFeesDataRelationshipsTags](docs/CompanyIdbankFeesDataRelationshipsTags.md)
 - [Parasut.CompanyIdbankFeesDataRelationshipsTagsData](docs/CompanyIdbankFeesDataRelationshipsTagsData.md)
 - [Parasut.CompanyIdbankFeesidpaymentsData](docs/CompanyIdbankFeesidpaymentsData.md)
 - [Parasut.CompanyIdcontactsData](docs/CompanyIdcontactsData.md)
 - [Parasut.CompanyIdcontactsDataRelationships](docs/CompanyIdcontactsDataRelationships.md)
 - [Parasut.CompanyIdcontactsDataRelationshipsContactPeople](docs/CompanyIdcontactsDataRelationshipsContactPeople.md)
 - [Parasut.CompanyIdcontactsDataRelationshipsContactPeopleData](docs/CompanyIdcontactsDataRelationshipsContactPeopleData.md)
 - [Parasut.CompanyIdcontactsidcontactCreditTransactionsData](docs/CompanyIdcontactsidcontactCreditTransactionsData.md)
 - [Parasut.CompanyIdcontactsidcontactDebitTransactionsData](docs/CompanyIdcontactsidcontactDebitTransactionsData.md)
 - [Parasut.CompanyIdeArchivesData](docs/CompanyIdeArchivesData.md)
 - [Parasut.CompanyIdeArchivesDataRelationships](docs/CompanyIdeArchivesDataRelationships.md)
 - [Parasut.CompanyIdeArchivesDataRelationshipsSalesInvoice](docs/CompanyIdeArchivesDataRelationshipsSalesInvoice.md)
 - [Parasut.CompanyIdeArchivesDataRelationshipsSalesInvoiceData](docs/CompanyIdeArchivesDataRelationshipsSalesInvoiceData.md)
 - [Parasut.CompanyIdeInvoicesData](docs/CompanyIdeInvoicesData.md)
 - [Parasut.CompanyIdeInvoicesDataRelationships](docs/CompanyIdeInvoicesDataRelationships.md)
 - [Parasut.CompanyIdemployeesData](docs/CompanyIdemployeesData.md)
 - [Parasut.CompanyIdemployeesDataRelationships](docs/CompanyIdemployeesDataRelationships.md)
 - [Parasut.CompanyIditemCategoriesData](docs/CompanyIditemCategoriesData.md)
 - [Parasut.CompanyIdproductsData](docs/CompanyIdproductsData.md)
 - [Parasut.CompanyIdpurchaseBillsbasicData](docs/CompanyIdpurchaseBillsbasicData.md)
 - [Parasut.CompanyIdpurchaseBillsbasicDataRelationships](docs/CompanyIdpurchaseBillsbasicDataRelationships.md)
 - [Parasut.CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee](docs/CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployee.md)
 - [Parasut.CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData](docs/CompanyIdpurchaseBillsbasicDataRelationshipsPaidByEmployeeData.md)
 - [Parasut.CompanyIdpurchaseBillsbasicDataRelationshipsSupplier](docs/CompanyIdpurchaseBillsbasicDataRelationshipsSupplier.md)
 - [Parasut.CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData](docs/CompanyIdpurchaseBillsbasicDataRelationshipsSupplierData.md)
 - [Parasut.CompanyIdpurchaseBillsdetailedData](docs/CompanyIdpurchaseBillsdetailedData.md)
 - [Parasut.CompanyIdpurchaseBillsdetailedDataRelationships](docs/CompanyIdpurchaseBillsdetailedDataRelationships.md)
 - [Parasut.CompanyIdpurchaseBillsdetailedDataRelationshipsDetails](docs/CompanyIdpurchaseBillsdetailedDataRelationshipsDetails.md)
 - [Parasut.CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData](docs/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsData.md)
 - [Parasut.CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships](docs/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationships.md)
 - [Parasut.CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct](docs/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProduct.md)
 - [Parasut.CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData](docs/CompanyIdpurchaseBillsdetailedDataRelationshipsDetailsRelationshipsProductData.md)
 - [Parasut.CompanyIdsalariesData](docs/CompanyIdsalariesData.md)
 - [Parasut.CompanyIdsalariesDataRelationships](docs/CompanyIdsalariesDataRelationships.md)
 - [Parasut.CompanyIdsalesInvoicesData](docs/CompanyIdsalesInvoicesData.md)
 - [Parasut.CompanyIdsalesInvoicesDataRelationships](docs/CompanyIdsalesInvoicesDataRelationships.md)
 - [Parasut.CompanyIdsalesInvoicesDataRelationshipsDetails](docs/CompanyIdsalesInvoicesDataRelationshipsDetails.md)
 - [Parasut.CompanyIdsalesInvoicesDataRelationshipsDetailsData](docs/CompanyIdsalesInvoicesDataRelationshipsDetailsData.md)
 - [Parasut.CompanyIdsalesInvoicesDataRelationshipsSalesOffer](docs/CompanyIdsalesInvoicesDataRelationshipsSalesOffer.md)
 - [Parasut.CompanyIdsalesInvoicesDataRelationshipsSalesOfferData](docs/CompanyIdsalesInvoicesDataRelationshipsSalesOfferData.md)
 - [Parasut.CompanyIdshipmentDocumentsData](docs/CompanyIdshipmentDocumentsData.md)
 - [Parasut.CompanyIdshipmentDocumentsDataRelationships](docs/CompanyIdshipmentDocumentsDataRelationships.md)
 - [Parasut.CompanyIdshipmentDocumentsDataRelationshipsContact](docs/CompanyIdshipmentDocumentsDataRelationshipsContact.md)
 - [Parasut.CompanyIdshipmentDocumentsDataRelationshipsContactData](docs/CompanyIdshipmentDocumentsDataRelationshipsContactData.md)
 - [Parasut.CompanyIdshipmentDocumentsDataRelationshipsStockMovements](docs/CompanyIdshipmentDocumentsDataRelationshipsStockMovements.md)
 - [Parasut.CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData](docs/CompanyIdshipmentDocumentsDataRelationshipsStockMovementsData.md)
 - [Parasut.CompanyIdtagsData](docs/CompanyIdtagsData.md)
 - [Parasut.CompanyIdtaxesData](docs/CompanyIdtaxesData.md)
 - [Parasut.CompanyRelationships](docs/CompanyRelationships.md)
 - [Parasut.CompanyRelationshipsAddress](docs/CompanyRelationshipsAddress.md)
 - [Parasut.CompanyRelationshipsAddressData](docs/CompanyRelationshipsAddressData.md)
 - [Parasut.CompanyRelationshipsOwner](docs/CompanyRelationshipsOwner.md)
 - [Parasut.CompanyRelationshipsOwnerData](docs/CompanyRelationshipsOwnerData.md)
 - [Parasut.Contact](docs/Contact.md)
 - [Parasut.ContactAttributes](docs/ContactAttributes.md)
 - [Parasut.ContactCollectionForm](docs/ContactCollectionForm.md)
 - [Parasut.ContactCollectionFormAttributes](docs/ContactCollectionFormAttributes.md)
 - [Parasut.ContactForm](docs/ContactForm.md)
 - [Parasut.ContactForm1](docs/ContactForm1.md)
 - [Parasut.ContactPaymentForm](docs/ContactPaymentForm.md)
 - [Parasut.ContactPaymentFormAttributes](docs/ContactPaymentFormAttributes.md)
 - [Parasut.ContactPerson](docs/ContactPerson.md)
 - [Parasut.ContactPersonAttributes](docs/ContactPersonAttributes.md)
 - [Parasut.ContactRelationships](docs/ContactRelationships.md)
 - [Parasut.ContactRelationshipsContactPeople](docs/ContactRelationshipsContactPeople.md)
 - [Parasut.ContactRelationshipsContactPeopleData](docs/ContactRelationshipsContactPeopleData.md)
 - [Parasut.ContactRelationshipsContactPortal](docs/ContactRelationshipsContactPortal.md)
 - [Parasut.ContactRelationshipsContactPortalData](docs/ContactRelationshipsContactPortalData.md)
 - [Parasut.EArchive](docs/EArchive.md)
 - [Parasut.EArchiveAttributes](docs/EArchiveAttributes.md)
 - [Parasut.EArchiveForm](docs/EArchiveForm.md)
 - [Parasut.EArchiveFormAttributes](docs/EArchiveFormAttributes.md)
 - [Parasut.EArchiveFormAttributesInternetSale](docs/EArchiveFormAttributesInternetSale.md)
 - [Parasut.EArchiveFormAttributesShipment](docs/EArchiveFormAttributesShipment.md)
 - [Parasut.EDocumentCommonForm](docs/EDocumentCommonForm.md)
 - [Parasut.EDocumentCommonFormAttributes](docs/EDocumentCommonFormAttributes.md)
 - [Parasut.EDocumentCommonFormAttributesExciseDutyCodes](docs/EDocumentCommonFormAttributesExciseDutyCodes.md)
 - [Parasut.EDocumentPdf](docs/EDocumentPdf.md)
 - [Parasut.EDocumentPdfAttributes](docs/EDocumentPdfAttributes.md)
 - [Parasut.EInvoice](docs/EInvoice.md)
 - [Parasut.EInvoiceAttributes](docs/EInvoiceAttributes.md)
 - [Parasut.EInvoiceForm](docs/EInvoiceForm.md)
 - [Parasut.EInvoiceFormAttributes](docs/EInvoiceFormAttributes.md)
 - [Parasut.EInvoiceInbox](docs/EInvoiceInbox.md)
 - [Parasut.EInvoiceInboxAttributes](docs/EInvoiceInboxAttributes.md)
 - [Parasut.EInvoiceRelationships](docs/EInvoiceRelationships.md)
 - [Parasut.EInvoiceRelationshipsInvoice](docs/EInvoiceRelationshipsInvoice.md)
 - [Parasut.EInvoiceRelationshipsInvoiceData](docs/EInvoiceRelationshipsInvoiceData.md)
 - [Parasut.Employee](docs/Employee.md)
 - [Parasut.EmployeeAttributes](docs/EmployeeAttributes.md)
 - [Parasut.EmployeeForm](docs/EmployeeForm.md)
 - [Parasut.EmployeeForm1](docs/EmployeeForm1.md)
 - [Parasut.EmployeeRelationships](docs/EmployeeRelationships.md)
 - [Parasut.EmployeeRelationshipsManagedByUserRole](docs/EmployeeRelationshipsManagedByUserRole.md)
 - [Parasut.EmployeeRelationshipsManagedByUserRoleData](docs/EmployeeRelationshipsManagedByUserRoleData.md)
 - [Parasut.Error](docs/Error.md)
 - [Parasut.InlineResponse200](docs/InlineResponse200.md)
 - [Parasut.InlineResponse2001](docs/InlineResponse2001.md)
 - [Parasut.InlineResponse20010](docs/InlineResponse20010.md)
 - [Parasut.InlineResponse20011](docs/InlineResponse20011.md)
 - [Parasut.InlineResponse20011Included](docs/InlineResponse20011Included.md)
 - [Parasut.InlineResponse20012](docs/InlineResponse20012.md)
 - [Parasut.InlineResponse20012Included](docs/InlineResponse20012Included.md)
 - [Parasut.InlineResponse20013](docs/InlineResponse20013.md)
 - [Parasut.InlineResponse20013Included](docs/InlineResponse20013Included.md)
 - [Parasut.InlineResponse20014](docs/InlineResponse20014.md)
 - [Parasut.InlineResponse20014Included](docs/InlineResponse20014Included.md)
 - [Parasut.InlineResponse20015](docs/InlineResponse20015.md)
 - [Parasut.InlineResponse20015Included](docs/InlineResponse20015Included.md)
 - [Parasut.InlineResponse20016](docs/InlineResponse20016.md)
 - [Parasut.InlineResponse20017](docs/InlineResponse20017.md)
 - [Parasut.InlineResponse2001Included](docs/InlineResponse2001Included.md)
 - [Parasut.InlineResponse2002](docs/InlineResponse2002.md)
 - [Parasut.InlineResponse2002Included](docs/InlineResponse2002Included.md)
 - [Parasut.InlineResponse2003](docs/InlineResponse2003.md)
 - [Parasut.InlineResponse2003Included](docs/InlineResponse2003Included.md)
 - [Parasut.InlineResponse2004](docs/InlineResponse2004.md)
 - [Parasut.InlineResponse2004Included](docs/InlineResponse2004Included.md)
 - [Parasut.InlineResponse2005](docs/InlineResponse2005.md)
 - [Parasut.InlineResponse2006](docs/InlineResponse2006.md)
 - [Parasut.InlineResponse2007](docs/InlineResponse2007.md)
 - [Parasut.InlineResponse2007Included](docs/InlineResponse2007Included.md)
 - [Parasut.InlineResponse2008](docs/InlineResponse2008.md)
 - [Parasut.InlineResponse2008Included](docs/InlineResponse2008Included.md)
 - [Parasut.InlineResponse2009](docs/InlineResponse2009.md)
 - [Parasut.InlineResponse2009Included](docs/InlineResponse2009Included.md)
 - [Parasut.InlineResponse201](docs/InlineResponse201.md)
 - [Parasut.InlineResponse2011](docs/InlineResponse2011.md)
 - [Parasut.InlineResponse20110](docs/InlineResponse20110.md)
 - [Parasut.InlineResponse20111](docs/InlineResponse20111.md)
 - [Parasut.InlineResponse20112](docs/InlineResponse20112.md)
 - [Parasut.InlineResponse20113](docs/InlineResponse20113.md)
 - [Parasut.InlineResponse20114](docs/InlineResponse20114.md)
 - [Parasut.InlineResponse2012](docs/InlineResponse2012.md)
 - [Parasut.InlineResponse2012Included](docs/InlineResponse2012Included.md)
 - [Parasut.InlineResponse2013](docs/InlineResponse2013.md)
 - [Parasut.InlineResponse2013Included](docs/InlineResponse2013Included.md)
 - [Parasut.InlineResponse2014](docs/InlineResponse2014.md)
 - [Parasut.InlineResponse2015](docs/InlineResponse2015.md)
 - [Parasut.InlineResponse2016](docs/InlineResponse2016.md)
 - [Parasut.InlineResponse2017](docs/InlineResponse2017.md)
 - [Parasut.InlineResponse2018](docs/InlineResponse2018.md)
 - [Parasut.InlineResponse2019](docs/InlineResponse2019.md)
 - [Parasut.InlineResponse400](docs/InlineResponse400.md)
 - [Parasut.ItemCategory](docs/ItemCategory.md)
 - [Parasut.ItemCategoryAttributes](docs/ItemCategoryAttributes.md)
 - [Parasut.ItemCategoryForm](docs/ItemCategoryForm.md)
 - [Parasut.ItemCategoryForm1](docs/ItemCategoryForm1.md)
 - [Parasut.ItemCategoryRelationships](docs/ItemCategoryRelationships.md)
 - [Parasut.ItemCategoryRelationshipsSubcategories](docs/ItemCategoryRelationshipsSubcategories.md)
 - [Parasut.ListMeta](docs/ListMeta.md)
 - [Parasut.Me](docs/Me.md)
 - [Parasut.MeAttributes](docs/MeAttributes.md)
 - [Parasut.MeRelationships](docs/MeRelationships.md)
 - [Parasut.MeRelationshipsCompanies](docs/MeRelationshipsCompanies.md)
 - [Parasut.MeRelationshipsProfile](docs/MeRelationshipsProfile.md)
 - [Parasut.MeRelationshipsProfileData](docs/MeRelationshipsProfileData.md)
 - [Parasut.MeRelationshipsUserRoles](docs/MeRelationshipsUserRoles.md)
 - [Parasut.Payment](docs/Payment.md)
 - [Parasut.PaymentAttributes](docs/PaymentAttributes.md)
 - [Parasut.PaymentForm](docs/PaymentForm.md)
 - [Parasut.PaymentForm1](docs/PaymentForm1.md)
 - [Parasut.PaymentForm2](docs/PaymentForm2.md)
 - [Parasut.PaymentForm3](docs/PaymentForm3.md)
 - [Parasut.PaymentForm4](docs/PaymentForm4.md)
 - [Parasut.PaymentFormAttributes](docs/PaymentFormAttributes.md)
 - [Parasut.PaymentRelationships](docs/PaymentRelationships.md)
 - [Parasut.PaymentRelationshipsPayable](docs/PaymentRelationshipsPayable.md)
 - [Parasut.PaymentRelationshipsPayableData](docs/PaymentRelationshipsPayableData.md)
 - [Parasut.PaymentRelationshipsTransaction](docs/PaymentRelationshipsTransaction.md)
 - [Parasut.PaymentRelationshipsTransactionData](docs/PaymentRelationshipsTransactionData.md)
 - [Parasut.Product](docs/Product.md)
 - [Parasut.ProductAttributes](docs/ProductAttributes.md)
 - [Parasut.ProductForm](docs/ProductForm.md)
 - [Parasut.ProductForm1](docs/ProductForm1.md)
 - [Parasut.Profile](docs/Profile.md)
 - [Parasut.ProfileAttributes](docs/ProfileAttributes.md)
 - [Parasut.ProfileRelationships](docs/ProfileRelationships.md)
 - [Parasut.PurchaseBill](docs/PurchaseBill.md)
 - [Parasut.PurchaseBillAttributes](docs/PurchaseBillAttributes.md)
 - [Parasut.PurchaseBillBasicForm](docs/PurchaseBillBasicForm.md)
 - [Parasut.PurchaseBillBasicFormAttributes](docs/PurchaseBillBasicFormAttributes.md)
 - [Parasut.PurchaseBillDetail](docs/PurchaseBillDetail.md)
 - [Parasut.PurchaseBillDetailAttributes](docs/PurchaseBillDetailAttributes.md)
 - [Parasut.PurchaseBillDetailedForm](docs/PurchaseBillDetailedForm.md)
 - [Parasut.PurchaseBillDetailedFormAttributes](docs/PurchaseBillDetailedFormAttributes.md)
 - [Parasut.PurchaseBillForm](docs/PurchaseBillForm.md)
 - [Parasut.PurchaseBillForm1](docs/PurchaseBillForm1.md)
 - [Parasut.PurchaseBillForm2](docs/PurchaseBillForm2.md)
 - [Parasut.PurchaseBillForm3](docs/PurchaseBillForm3.md)
 - [Parasut.PurchaseBillRelationships](docs/PurchaseBillRelationships.md)
 - [Parasut.PurchaseBillRelationshipsActiveEDocument](docs/PurchaseBillRelationshipsActiveEDocument.md)
 - [Parasut.PurchaseBillRelationshipsActiveEDocumentData](docs/PurchaseBillRelationshipsActiveEDocumentData.md)
 - [Parasut.PurchaseBillRelationshipsDetails](docs/PurchaseBillRelationshipsDetails.md)
 - [Parasut.PurchaseBillRelationshipsDetailsData](docs/PurchaseBillRelationshipsDetailsData.md)
 - [Parasut.PurchaseBillRelationshipsPayTo](docs/PurchaseBillRelationshipsPayTo.md)
 - [Parasut.PurchaseBillRelationshipsPayToData](docs/PurchaseBillRelationshipsPayToData.md)
 - [Parasut.PurchaseBillRelationshipsPayments](docs/PurchaseBillRelationshipsPayments.md)
 - [Parasut.PurchaseBillRelationshipsPaymentsData](docs/PurchaseBillRelationshipsPaymentsData.md)
 - [Parasut.PurchaseBillRelationshipsRecurrencePlan](docs/PurchaseBillRelationshipsRecurrencePlan.md)
 - [Parasut.PurchaseBillRelationshipsRecurrencePlanData](docs/PurchaseBillRelationshipsRecurrencePlanData.md)
 - [Parasut.Salary](docs/Salary.md)
 - [Parasut.SalaryAttributes](docs/SalaryAttributes.md)
 - [Parasut.SalaryForm](docs/SalaryForm.md)
 - [Parasut.SalaryForm1](docs/SalaryForm1.md)
 - [Parasut.SalesInvoice](docs/SalesInvoice.md)
 - [Parasut.SalesInvoiceAttributes](docs/SalesInvoiceAttributes.md)
 - [Parasut.SalesInvoiceDetail](docs/SalesInvoiceDetail.md)
 - [Parasut.SalesInvoiceDetailAttributes](docs/SalesInvoiceDetailAttributes.md)
 - [Parasut.SalesInvoiceForm](docs/SalesInvoiceForm.md)
 - [Parasut.SalesInvoiceForm1](docs/SalesInvoiceForm1.md)
 - [Parasut.SalesInvoiceForm2](docs/SalesInvoiceForm2.md)
 - [Parasut.SalesInvoiceRelationships](docs/SalesInvoiceRelationships.md)
 - [Parasut.SalesInvoiceRelationshipsActiveEDocument](docs/SalesInvoiceRelationshipsActiveEDocument.md)
 - [Parasut.SalesInvoiceRelationshipsActiveEDocumentData](docs/SalesInvoiceRelationshipsActiveEDocumentData.md)
 - [Parasut.SalesInvoiceRelationshipsDetails](docs/SalesInvoiceRelationshipsDetails.md)
 - [Parasut.SalesInvoiceRelationshipsDetailsData](docs/SalesInvoiceRelationshipsDetailsData.md)
 - [Parasut.SalesInvoiceRelationshipsSharings](docs/SalesInvoiceRelationshipsSharings.md)
 - [Parasut.SalesInvoiceRelationshipsSharingsData](docs/SalesInvoiceRelationshipsSharingsData.md)
 - [Parasut.SalesOffer](docs/SalesOffer.md)
 - [Parasut.SalesOfferAttributes](docs/SalesOfferAttributes.md)
 - [Parasut.ShipmentDocument](docs/ShipmentDocument.md)
 - [Parasut.ShipmentDocumentAttributes](docs/ShipmentDocumentAttributes.md)
 - [Parasut.ShipmentDocumentForm](docs/ShipmentDocumentForm.md)
 - [Parasut.ShipmentDocumentForm1](docs/ShipmentDocumentForm1.md)
 - [Parasut.ShipmentDocumentRelationships](docs/ShipmentDocumentRelationships.md)
 - [Parasut.ShipmentDocumentRelationshipsInvoices](docs/ShipmentDocumentRelationshipsInvoices.md)
 - [Parasut.ShipmentDocumentRelationshipsStockMovements](docs/ShipmentDocumentRelationshipsStockMovements.md)
 - [Parasut.ShipmentDocumentRelationshipsStockMovementsData](docs/ShipmentDocumentRelationshipsStockMovementsData.md)
 - [Parasut.StockMovement](docs/StockMovement.md)
 - [Parasut.StockMovementAttributes](docs/StockMovementAttributes.md)
 - [Parasut.StockMovementRelationships](docs/StockMovementRelationships.md)
 - [Parasut.StockMovementRelationshipsSource](docs/StockMovementRelationshipsSource.md)
 - [Parasut.StockMovementRelationshipsSourceData](docs/StockMovementRelationshipsSourceData.md)
 - [Parasut.Tag](docs/Tag.md)
 - [Parasut.TagAttributes](docs/TagAttributes.md)
 - [Parasut.TagForm](docs/TagForm.md)
 - [Parasut.TagForm1](docs/TagForm1.md)
 - [Parasut.Tax](docs/Tax.md)
 - [Parasut.TaxAttributes](docs/TaxAttributes.md)
 - [Parasut.TaxForm](docs/TaxForm.md)
 - [Parasut.TaxForm1](docs/TaxForm1.md)
 - [Parasut.TrackableJob](docs/TrackableJob.md)
 - [Parasut.TrackableJobAttributes](docs/TrackableJobAttributes.md)
 - [Parasut.Transaction](docs/Transaction.md)
 - [Parasut.TransactionAttributes](docs/TransactionAttributes.md)
 - [Parasut.TransactionForm](docs/TransactionForm.md)
 - [Parasut.TransactionForm1](docs/TransactionForm1.md)
 - [Parasut.TransactionForm2](docs/TransactionForm2.md)
 - [Parasut.TransactionForm3](docs/TransactionForm3.md)
 - [Parasut.TransactionRelationships](docs/TransactionRelationships.md)
 - [Parasut.TransactionRelationshipsDebitAccount](docs/TransactionRelationshipsDebitAccount.md)
 - [Parasut.TransactionRelationshipsDebitAccountData](docs/TransactionRelationshipsDebitAccountData.md)
 - [Parasut.UserRole](docs/UserRole.md)
 - [Parasut.UserRoleAttributes](docs/UserRoleAttributes.md)
 - [Parasut.UserRoleRelationships](docs/UserRoleRelationships.md)