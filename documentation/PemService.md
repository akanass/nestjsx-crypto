<div style="margin-bottom:20px;">
<div>
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="https://nestjs.com/" target="blank">
        <img src="https://nestjs.com/img/logo_text.svg" height="50" alt="Nest Logo" align="right" style="border:none;" />
    </a>
</div>
</div>

# PemService

After imported `CryptoModule` in your module, you can access to `PemService` anywhere with **dependency injection**.

```typescript
import { CryptoModule, PemService } from '@akanass/nestjsx-crypto';
import { Injectable, Module } from '@nestjs/common';

@Injectable()
class NestJSServiceWithCrypto {
    constructor(private readonly _pemService: PemService) {}
}

@Module({
    imports: [
        CryptoModule // if you want to change openssl path you have to call `.setConfig({ pem: { pathOpenSSL: '/path/to/openssl' } })` when importing
    ],
    providers: [
        NestJSServiceWithCrypto
    ]
})
export class NestJSModuleNeedsCryptoModule {}
```

## Table of contents

* [API in Detail](#api-in-detail)
    * [.createPrivateKey([keyBitsize, options])](#createprivatekeykeybitsize-options)
    * [.createDhparam([keyBitsize])](#createdhparamkeybitsize)
    * [.createEcparam([keyName, paramEnc, noOut])](#createecparamkeyname-paramenc-noout)
    * [.createCSR([options])](#createcsroptions)
    * [.createCertificate([options])](#createcertificateoptions)
    * [.readCertificateInfo(certificate)](#readcertificateinfocertificate)
    * [.getPublicKey(certificate)](#getpublickeycertificate)
    * [.createKeyPair([keyBitsize, options])](#createkeypairkeybitsize-options)
    * [.getFingerprint(certificate[, hash])](#getfingerprintcertificate-hash)
    * [.getModulus(certificate[, password])](#getmoduluscertificate-password)
    * [.getDhparamInfo(dh)](#getdhparaminfodh)
    * [.createPkcs12(key,certificate,password[, options])](#createpkcs12key-certificate-password-options)
    * [.readPkcs12(bufferOrPath[, options])](#readpkcs12bufferorpath-options)
    * [.checkPkcs12(bufferOrPath[, passphrase])](#checkpkcs12bufferorpath-passphrase)
    * [.verifySigningChain(certificate, ca)](#verifysigningchaincertificate-ca)
    * [.checkCertificate(certificate[, passphrase])](#checkcertificate-passphrase)
* [Parameters types in detail](#parameters-types-in-detail)
    * [PrivateKeyCreationOptions](#privatekeycreationoptions)
    * [PrivateKeyCipher](#privatekeycipher)
    * [CSRCreationOptions](#csrcreationoptions)
    * [CertificateCreationOptions extends CSRCreationOptions](#certificatecreationoptions-extends-csrcreationoptions)
    * [Pkcs12CreationOptions](#pkcs12creationoptions)
    * [Pkcs12ReadOptions](#pkcs12readoptions)
* [Change History](#change-history)

## API in Detail

### `.createPrivateKey([keyBitsize, options])`

Creates `private` key.

**Parameters:**
> - ***{number} keyBitsize*** *(optional): Size of the key. (default: `2048bit`).*
> - ***{PrivateKeyCreationOptions} options*** *(optional): object of `cipher` and `password`. (default: `empty object`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `private key` will be passed as a `{key}` object.*

**Example:**
```javascript
this._pemService.createPrivateKey()
    .subscribe(
        (privateKeyCreationResult: PrivateKeyCreationResult) => console.log(privateKeyCreationResult), // Show `{key}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.createDhparam([keyBitsize])`

Creates `dhparam` key.

**Parameters:**
> - ***{number} keyBitsize*** *(optional): Size of the key. (default: `512bit`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `dhparam key` will be passed as a `{dhparam}` object.*

**Example:**
```javascript
this._pemService.createDhparam()
    .subscribe(
        (dhParamKeyCreationResult: DhParamKeyCreationResult) => console.log(dhParamKeyCreationResult), // Show `{dhparam}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.createEcparam([keyName, paramEnc, noOut])`

Creates `ecparam` key.

**Parameters:**
> - ***{string} keyName*** *(optional): Name of the key. (default: `secp256k1`).*
> - ***{string} paramEnc*** *(optional): Encoding of the elliptic curve parameters. (default: `explicit`).*
> - ***{boolean} noOut*** *(optional): his option inhibits the output of the encoded version of the parameters. (default: `false`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `dhparam key` will be passed as a `{dhparam}` object.*

**Example:**
```javascript
this._pemService.createEcparam()
    .subscribe(
        (ecParamKeyCreationResult: EcParamKeyCreationResult) => console.log(ecParamKeyCreationResult), // Show `{ecparam}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.createCSR([options])`

Creates a `Certificate Signing Request`.

If `options.clientKey` is `undefined`, a new `key` is created automatically. The used `key` is included in the response return as `clientKey`.

**Parameters:**
> - ***{CSRCreationOptions} options*** *(optional): Option object.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `CSR` will be passed as a `{csr, clientKey}` object.*

**Example:**
```javascript
this._pemService.createCSR()
    .subscribe(
        (csrCreationResult: CSRCreationResult) => console.log(csrCreationResult), // Show `{csr, clientKey}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.createCertificate([options])`

Creates a `certificate` based on a `CSR`. If `CSR` is not defined, a new one will be generated automatically.

For `CSR` generation all the options values can be used as with `createCSR()`.

**Parameters:**
> - ***{CertificateCreationOptions} options*** *(optional): Option object.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `Certificate` will be passed as a `{certificate, csr, clientKey, serviceKey}` object.*

**Example:**
```javascript
this._pemService.createCertificate()
    .subscribe(
        (certificateCreationResult: CertificateCreationResult) => console.log(certificateCreationResult), // Show `{certificate, csr, clientKey, serviceKey}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.readCertificateInfo(certificate)`

Reads subject data from a `certificate` or a `CSR`.

**Parameters:**
> - ***{string} certificate*** *(required): `certificate PEM encoded CSR` or `certificate`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully read `Certificate` will be passed as a `{country, state, locality, organization, organizationUnit, commonName, emailAddress}` object.*

**Example:**
```javascript
this._pemService.readCertificateInfo([CERTIFICATE])
    .subscribe(
        (certificateSubjectReadResult: CertificateSubjectReadResult) => console.log(certificateSubjectReadResult), // Show `{country, state, locality, organization, organizationUnit, commonName, emailAddress}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.getPublicKey(certificate)`

Exports a `public key` from a `private key`, `CSR` or `certificate`.

**Parameters:**
> - ***{string} certificate*** *(required): `certificate PEM encoded private key`, `CSR` or `certificate`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully exported `public key` will be passed as a `{publicKey}` object.*

**Example:**
```javascript
this._pemService.getPublicKey([CERTIFICATE])
    .subscribe(
        (publicKeyCreationResult: PublicKeyCreationResult) => console.log(publicKeyCreationResult), // Show `{publicKey}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.createKeyPair([keyBitsize, options])`

Creates a `private key` and related `public key`.

**Parameters:**
> - ***{number} keyBitsize*** *(optional): Size of the key. (default: `2048bit`).*
> - ***{PrivateKeyCreationOptions} options*** *(optional): object of `cipher` and `password`. (default: `empty object`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `key pair` will be passed as a `{key, publicKey}` object.*

**Example:**
```javascript
this._pemService.createKeyPair()
    .subscribe(
        (keyPairCreationResult: KeyPairCreationResult) => console.log(keyPairCreationResult), // Show `{key, publicKey}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.getFingerprint(certificate[, hash])`

Gets the `fingerprint` for a `certificate`.

**Parameters:**
> - ***{string} certificate*** *(required): `PEM encoded certificate`.*
> - ***{string} hash*** *(optional): Hash function to use (either `'md5'`, `'sha1'` or `'sha256'`). (default: `'sha1'`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully exported `fingerprint` will be passed as a `{fingerprint}` object.*

**Example:**
```javascript
this._pemService.getFingerprint([CERTIFICATE])
    .subscribe(
        (fingerprintResult: FingerprintResult) => console.log(fingerprintResult), // Show `{fingerprint}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.getModulus(certificate[, password])`

Gets the `modulus` from a `certificate`, a `CSR` or a `private key`.

**Parameters:**
> - ***{string} certificate*** *(required): `certificate PEM encoded`, `CSR PEM encoded`, or `private key`.*
> - ***{string} password*** *(optional): `password` for the `certificate`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully exported `modulus` will be passed as a `{modulus}` object.*

**Example:**
```javascript
this._pemService.getModulus([CERTIFICATE])
    .subscribe(
        (modulusResult: ModulusResult) => console.log(modulusResult), // Show `{modulus}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.getDhparamInfo(dh)`

Gets the `size` and `prime` of `DH parameters`.

**Parameters:**
> - ***{string} dh*** *(required): `DH parameters PEM encoded`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully exported `dh info` will be passed as a `{size, prime}` object.*

**Example:**
```javascript
this._pemService.getDhparamInfo([DH])
    .subscribe(
        (dhParamInfoResult: DhParamInfoResult) => console.log(dhParamInfoResult), // Show `{size, prime}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.createPkcs12(key, certificate, password[, options])`

Exports `private key` and `certificate` to a `PKCS12 keystore`.

**Parameters:**
> - ***{string} key*** *(required): `PEM encoded private key`.*
> - ***{string} certificate*** *(required): `PEM encoded certificate`.*
> - ***{string} password*** *(required): password of the result `PKCS12` file.*
> - ***{Pkcs12CreationOptions} options*** *(optional): Optional object of `cipher` and optional `client key password`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `PKCS12` will be passed as a `{pkcs12}` object.*

**Example:**
```javascript
this._pemService.createPkcs12([KEY], [CERTIFICATE], [PASSWORD])
    .subscribe(
        (pkcs12CreationResult: PKCS12CreationResult) => console.log(pkcs12CreationResult), // Show `{pkcs12}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.readPkcs12(bufferOrPath[, options])`

Reads `private key` and `certificate` from a `PKCS12 keystore`.

**Parameters:**
> - ***{string} bufferOrPath*** *(required): `Buffer` representation or `path` to `PKCS12 keystore`.*
> - ***{Pkcs12ReadOptions} options*** *(optional): Optional object of optional `keystore` and `client key passwords`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully read `PKCS12` will be passed as a `{key,cert,ca}` object.*

**Example:**
```javascript
this._pemService.readPkcs12([BUFFER])
    .subscribe(
        (pkcs12ReadResult: PKCS12ReadResult) => console.log(pkcs12ReadResult), // Show `{key,cert,ca}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.checkPkcs12(bufferOrPath[, passphrase])`

Verifies a `PKCS12 keystore`.

**Parameters:**
> - ***{string} bufferOrPath*** *(required): `Buffer` representation or `path` to `PKCS12 keystore`.*
> - ***{string} passphrase*** *(optional): `Passphrase` which will be used to open the `keystore`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `verified` will be passed as a `boolean`.*

**Example:**
```javascript
this._pemService.checkPkcs12([BUFFER])
    .subscribe(
        (verified: boolean) => console.log(verified), // Show `verified` boolean in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.verifySigningChain(certificate, ca)`

Verifies the `signing chain` of the passed `certificate` for given `ca`.

**Parameters:**
> - ***{string} certificate*** *(required): `PEM encoded certificate`.*
> - ***{string[]} ca*** *(required): list of `CA certificates`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `verified` will be passed as a `boolean`.*

**Example:**
```javascript
this._pemService.verifySigningChain([BUFFER], [CA])
    .subscribe(
        (verified: boolean) => console.log(verified), // Show `verified` boolean in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.checkCertificate(certificate[, passphrase])`

`Check` / `verify` consistency of a `certificate`.

**Parameters:**
> - ***{string} certificate*** *(required): `PEM encoded certificate`.*
> - ***{string} passphrase*** *(optional): `Passphrase` which will be used to open the `cretificate`.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `verified` will be passed as a `boolean`.*

**Example:**
```javascript
this._pemService.checkCertificate([BUFFER])
    .subscribe(
        (verified: boolean) => console.log(verified), // Show `verified` boolean in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

## Parameters types in detail

### *PrivateKeyCreationOptions:*
> - ***{PrivateKeyCipher} cipher*** *(required): `cipher` of the `private key`.*
> - ***{string} password*** *(required): `password` of the `private key`.*

### *PrivateKeyCipher:*
> ***string*** => `'aes128'` | `'aes192'` | `'aes256'` | `'camellia128'` | `'camellia192'` | `'camellia256'` | `'des'` | `'des3'` | `'idea'`

### *CSRCreationOptions:*
> - ***{string} clientKey*** *(optional): client `key` to use.*
> - ***{string} clientKeyPassword*** *(optional): password for `clientKey`.*
> - ***{number} keyBitsize*** *(optional): if `clientKey` is undefined, bit size to use for generating a new key. (default: `2048`).*
> - ***{string} hash*** *(optional): function to use (either `'md5'`, `'sha1'` or `'sha256'`). (default: `'sha256'`).*
> - ***{string} country*** *(optional): `CSR` country field.*
> - ***{string} state*** *(optional): `CSR` state field.*
> - ***{string} locality*** *(optional): `CSR` locality field.*
> - ***{string} organization*** *(optional): `CSR` organization field.*
> - ***{string} organizationUnit*** *(optional): `CSR` organizational unit field.*
> - ***{string} commonName*** *(optional): `CSR` common name field. (default: `localhost`).*
> - ***{string[]} altNames*** *(optional): list of subjectAltNames in the `CSR` subjectAltName field.*
> - ***{string} emailAddress*** *(optional): `CSR` email address field.*
> - ***{string} csrConfigFile*** *(optional): `CSR` config file.*

### *CertificateCreationOptions extends CSRCreationOptions:*
> - ***{string} serviceKey*** *(optional): `private key` for signing the `certificate`, if not defined a new one is generated.*
> - ***{string} serviceKeyPassword*** *(optional): `password` of the `serviceKey`.*
> - ***{any} serviceCertificate*** *(optional): `certificate` for the`serviceKey`.*
> - ***{any} serial*** *(optional): is the unique serial number for the signed certificate, `required` if `serviceCertificate` is defined.*
> - ***{boolean} selfSigned*** *(optional): if set to true and `serviceKey` is not defined, use `clientKey` for signing.*
> - ***{string} csr*** *(optional): is a `CSR` for the `certificate`, if not defined a new one is generated.*
> - ***{number} days*** *(optional): is the `certificate` expire time in days.*
> - ***{string} clientKeyPassword*** *(optional): `password` of the client key.*
> - ***{string} extFile*** *(optional): extension config file - **without** `'-extensions v3_req'`.*
> - ***{string} config*** *(optional): extension config file - **with** `'-extensions v3_req'`.*

### *Pkcs12CreationOptions:*
> - ***{PrivateKeyCipher} cipher*** *(optional): `cipher` for the `keystore`.*
> - ***{string} clientKeyPassword*** *(optional): `password` of the `clientKey`.*
> - ***{string[]} certFiles*** *(optional): array of additional certificates to include - e.g. CA certificates.*

### *Pkcs12ReadOptions:*
> - ***{string} p12Password*** *(optional): `password` for the `keystore`.*
> - ***{string} clientKeyPassword*** *(optional): `password` of the `clientKey`.*

[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2019-09-12)
    * [.createPrivateKey([keyBitsize, options])](#createprivatekeykeybitsize-options)
    * [.createDhparam([keyBitsize])](#createdhparamkeybitsize)
    * [.createCSR([options])](#createcsroptions)
    * [.createCertificate([options])](#createcertificateoptions)
    * [.readCertificateInfo(certificate)](#readcertificateinfocertificate)
    * [.getPublicKey(certificate)](#getpublickeycertificate)
    * [.createKeyPair([keyBitsize, options])](#createkeypairkeybitsize-options)
    * [.getFingerprint(certificate[, hash])](#getfingerprintcertificate-hash)
    * [.getModulus(certificate[, password])](#getmoduluscertificate-password)
    * [.getDhparamInfo(dh)](#getdhparaminfodh)
    * [.createPkcs12(key, certificate, password[, options])](#createpkcs12key-certificate-password-options)
    * [.readPkcs12(bufferOrPath[, options])](#readpkcs12bufferorpath-options)
    * [.verifySigningChain(certificate, ca)](#verifysigningchaincertificate-ca)
    * [.checkPkcs12(bufferOrPath[, passphrase])](#checkpkcs12bufferorpath-passphrase)
    * [.checkCertificate(certificate[, passphrase])](#checkcertificate-passphrase)
    
[Back to top](#table-of-contents)
