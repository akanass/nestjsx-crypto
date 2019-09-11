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

# RsaService

After imported `CryptoModule` in your module, you can access to `RsaService` anywhere with **dependency injection**.

```typescript
import { CryptoModule, RsaService } from '@akanass/nestjsx-crypto';
import { Injectable, Module } from '@nestjs/common';

@Injectable()
class NestJSServiceWithCrypto {
    constructor(private readonly _rsaService: RsaService) {}
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
    * [.createKey([keyBits])](#createkeykeyBits)
    * [.loadKey(key[, format, options])](#loadkeykey-format-options)
    * [.importKey(key[, format])](#importkeykey-format)
    * [.generateKeyPair([bits, exponent])](#generatekeypairbits-exponent)
    * [.exportKey([format])](#exportkeyformat)
    * [.isPrivate()](#isprivate)
    * [.isPublic([strict])](#ispublicstrict)
    * [.isEmptyKey()](#isemptykey)
    * [.getKeySize()](#getkeysize)
    * [.getMaxMessageSize()](#getmaxmessagesize)
    * [.encryptPublic(data[, encoding, sourceEncoding])](#encryptpublicdata-encoding-sourceencoding)
    * [.encryptPrivate(data[, encoding, sourceEncoding])](#encryptprivatedata-encoding-sourceencoding)
    * [.decryptPublic(data[, encoding])](#decryptpublicdata-encoding)
    * [.decryptPrivate(data[, encoding])](#decryptprivatedata-encoding)
    * [.sign(data[, encoding, sourceEncoding])](#signdata-encoding-sourceencoding)
    * [.verify(data,signature[, sourceEncoding, signatureEncoding])](#verifydata-signature-sourceencoding-signatureencoding)
* [Parameters types in detail](#parameters-types-in-detail)
    * [Key](#key)
    * [KeyComponents](#keycomponents)
    * [Format](#format)
    * [Options](#options)
    * [EncryptionScheme](#encryptionscheme)
    * [AdvancedEncryptionScheme](#advancedencryptionscheme)
    * [AdvancedEncryptionSchemePKCS1](#advancedencryptionschemepkcs1)
    * [AdvancedEncryptionSchemePKCS1OAEP](#advancedencryptionschemepkcs10aep)
    * [HashingAlgorithm](#hashingalgorithm)
    * [Data](#data)
    * [Encoding](#encoding)
* [Change History](#change-history)

## API in Detail

### `.createKey([keyBits])`

Generate new `key` with `length` specified.

**Parameters:**
> - ***{KeyBits} keyBits*** *(optional): length of the new `RSA key` ({b: number}).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `RSA key` will be passed as a `NodeRSA` object.*

**Example:**
```javascript
this._rsaService.createKey()
    .subscribe(
        (nodeRSA: NodeRSA) => console.log(nodeRSA), // Show `NodeRSA` `empty` key in the console
        e => console.error(e.message) // Show error message in the console
    );

this._rsaService.createKey({b: 512})
    .subscribe(
        (nodeRSA: NodeRSA) => console.log(nodeRSA), // Show `NodeRSA` `512bit-length` key in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.loadKey(key[, format, options])`

Load `key` from `string`, `buffer` or `components`.

**Parameters:**
> - ***{Key} key*** *(required): parameters for generating key or the key in one of supported formats.*
> - ***{Format} format*** *(optional): format for importing key.*
> - ***{Options} options*** *(optional): additional settings.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully imported `RSA key` will be passed as a `NodeRSA` object.*

**Example:**
```javascript
this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
)
    .subscribe(
        (nodeRSA: NodeRSA) => console.log(nodeRSA), // Show `NodeRSA` `'pkcs1-private-pem'` key in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.importKey(key[, format])`

Import `key` from `PEM string`, `PEM/DER Buffer` or `components`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Key} key*** *(required): key from `PEM string`, `PEM/DER Buffer` or `components`.*
> - ***{Format} format*** *(optional): format for importing key.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully imported `RSA key` will be passed as a `NodeRSA` object.*

**Example:**
```javascript
import { importKey } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.createKey()
    .pipe(
        importKey(
            '-----BEGIN RSA PRIVATE KEY-----\n'+
            '...\n' +
            '-----END RSA PRIVATE KEY-----'
        )
    )
    .subscribe(
        (nodeRSA: NodeRSA) => console.log(nodeRSA), // Show `NodeRSA` `'pkcs1-private-pem'` key in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.generateKeyPair([bits, exponent])`

Generate new `RSA Key Pair` in pure `Javascript`. We advise to use `PEM.createKeyPair()` instead of. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{number} bits*** *(optional): Key size in bits. (default `2048`).*
> - ***{number} exponent*** *(optional): public exponent. (default `65537`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generate `RSA Key Pair` will be passed as a `NodeRSA` object.*

**Example:**
```javascript
import { generateKeyPair } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.createKey()
    .pipe(
        generateKeyPair()
    )
    .subscribe(
        (nodeRSA: NodeRSA) => console.log(nodeRSA), // Show `NodeRSA` `key pair` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.exportKey([format])`

Export `key` to `PEM string`, `PEM/DER Buffer` or `components`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Format} format*** *(optional): format for exporting key.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully exported `RSA key` will be passed as a `Key` object.*

**Example:**
```javascript
import { exportKey } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        exportKey()
    )
    .subscribe(
        (key: Key) => console.log(key), // Show `loaded` key in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.isPrivate()`

Check if `key` is `private`. This method is an `Observable's` `operator`.

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully verification will be passed as a `boolean`.*

**Example - Lettable operator:**
```javascript
import { isPrivate } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        isPrivate()
    )
    .subscribe(
        (isPrivate: boolean) => console.log(isPrivate), // Show `true` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.isPublic([strict])`

Check if `key` is `public`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{boolean} strict*** *(optional): if `true` method will return `false` if `key pair` have `private` exponent. (default: `false`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully verification will be passed as a `boolean`.*

**Example:**
```javascript
import { isPublic } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        isPublic(true)
    )
    .subscribe(
        (isPublic: boolean) => console.log(isPublic), // Show `false` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.isEmptyKey()`

Check if `key` is `empty`. This method is an `Observable's` `operator`.

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully verification will be passed as a `boolean`.*

**Example:**
```javascript
import { isEmptyKey } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        isEmptyKey()
    )
    .subscribe(
        (isEmptyKey: boolean) => console.log(isEmptyKey), // Show `false` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.getKeySize()`

Return `key` size in `bits`. This method is an `Observable's` `operator`.

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `key` size will be passed as `bits` value.*

**Example:**
```javascript
import { getKeySize } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
    'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
    'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
    'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
    'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
    'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
    'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        getKeySize()
    )
    .subscribe(
        (keySize: number) => console.log(keySize), // Show `511` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.getMaxMessageSize()`

Return max `data` size for `encrypt` in `bytes`. This method is an `Observable's` `operator`.

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully max `data` size for `encrypt` will be passed as `bytes` value.*

**Example:**
```javascript
import { getMaxMessageSize } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
    'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
    'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
    'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
    'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
    'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
    'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        getMaxMessageSize()
    )
    .subscribe(
        (maxMessageSize: number) => console.log(maxMessageSize), // Show `22` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.encryptPublic(data[, encoding, sourceEncoding])`

Encrypting data method with `public key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Data | Buffer} data*** *(required): data for encrypting. `Object` and `array` will convert to `JSON` string.*
> - ***{'buffer' | Encoding} encoding*** *(optional): Encoding for output result. (default: `'buffer'`).*
> - ***{Encoding} sourceEncoding*** *(optional): Encoding for given string. (default: `'utf8'`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `encrypted` data will be passed as a `Buffer` or `Encoding`.*

**Example:**
```javascript
import { encryptPublic } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PUBLIC KEY-----\n'+
    '...\n' +
    '-----END RSA PUBLIC KEY-----'
)
    .pipe(
        encryptPublic('data')
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer), // Show encrypted `Buffer` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.encryptPrivate(data[, encoding, sourceEncoding])`

Encrypting data method with `private key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Data | Buffer} data*** *(required): data for encrypting. `Object` and `array` will convert to `JSON` string.*
> - ***{'buffer' | Encoding} encoding*** *(optional): Encoding for output result. (default: `'buffer'`).*
> - ***{Encoding} sourceEncoding*** *(optional): Encoding for given string. (default: `'utf8'`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `encrypted` data will be passed as a `Buffer` or `Encoding`.*

**Example:**
```javascript
import { encryptPrivate } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        encryptPrivate('data')
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer), // Show encrypted `Buffer` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.decryptPublic(data[, encoding])`

Decrypting data method with `public key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Buffer | string} data*** *(required): `Buffer` for decrypting.*
> - ***{'buffer' | Encoding | 'json'} encoding*** *(optional): Encoding for result `string`, can also take `'json'` or `'buffer'` for the automatic conversion of this type. (default: `'buffer'`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `decrypted` data will be passed as a `Buffer`, `JSON` or `Encoding`.*

**Example:**
```javascript
import { decryptPublic } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PUBLIC KEY-----\n'+
    '...\n' +
    '-----END RSA PUBLIC KEY-----'
)
    .pipe(
        decryptPublic(Buffer.from('data'))
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer), // Show decrypted `Buffer` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.decryptPrivate(data[, encoding])`

Decrypting data method with `private key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Buffer | string} data*** *(required): `Buffer` for decrypting.*
> - ***{'buffer' | Encoding | 'json'} encoding*** *(optional): Encoding for result `string`, can also take `'json'` or `'buffer'` for the automatic conversion of this type. (default: `'buffer'`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `decrypted` data will be passed as a `Buffer`, `JSON` or `Encoding`.*

**Example:**
```javascript
import { decryptPrivate } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        decryptPrivate(Buffer.from('data'))
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer), // Show decrypted `Buffer` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.sign(data[, encoding, sourceEncoding])`

Signing data method with `private key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Data | Buffer} data*** *(required): data for signing. `Object` and `array` will convert to `JSON` string.*
> - ***{'buffer' | Encoding} encoding*** *(optional): Encoding for output result. (default: `'buffer'`).*
> - ***{Encoding} sourceEncoding*** *(optional): Encoding for given string. (default: `'utf8'`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `signed` data will be passed as a `Buffer` or `Encoding`.*

**Example:**
```javascript
import { sign } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PRIVATE KEY-----\n'+
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
)
    .pipe(
        sign('data')
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer), // Show signed `Buffer` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.verify(data, signature[, sourceEncoding, signatureEncoding])`

Verifying signed data method with `public key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Data | Buffer} data*** *(required): data for signing. `Object` and `array` will convert to `JSON` string.*
> - ***{string | Buffer} signature*** *(required): signature from sign method.*
> - ***{Encoding} sourceEncoding*** *(optional): Encoding for given string. (default: `'utf8'`).*
> - ***{Encoding} signatureEncoding*** *(optional): Encoding of given signature. (default: `'buffer'`).*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `verified` data will be passed as a `boolean`.*

**Example:**
```javascript
import { verify } from '@akanass/nestjsx-crypto/operators/rsa';

...

this._rsaService.loadKey(
    '-----BEGIN RSA PUBLIC KEY-----\n'+
    '...\n' +
    '-----END RSA PUBLIC KEY-----'
)
    .pipe(
        verify('data', [SIGNATURE])
    )
    .subscribe(
        (verify: boolean) => console.log(verify), // Show `verified` boolean in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

## Parameters types in detail

### *Key:*
> ***type*** => `string` | `Buffer` | `KeyComponents`

### *KeyComponents:*
> ***object*** => {`n`: Buffer, `e`: Buffer | number, `d`: Buffer, `p`: Buffer, `q`: Buffer, `dmp1`: Buffer, `dmq1`: Buffer, `coeff`: Buffer}

### *Format:*
Format string composed of several parts: `scheme-[key_type]-[output_type]`

**Scheme** — support of multiple format schemes for `import/export` keys:
> - `'pkcs1'` — `public` key starts from `'-----BEGIN RSA PUBLIC KEY-----'` header and `private` key starts from `'-----BEGIN RSA PRIVATE KEY-----'` header
> - `'pkcs8'` — `public` key starts from `'-----BEGIN PUBLIC KEY-----'` header and `private` key starts from `'-----BEGIN PRIVATE KEY-----'` header
> - `'components'` — use it for import/export key from/to raw components (see example below). For `private` key, importing data should contain all `private` key components, for `public` key: only `public` exponent (`e`) and modulus (`n`). All components (except `e`) should be `Buffer`, `e` could be `Buffer` or just normal `number`.

**Key type** — can be `'private'` or `'public'`. (default: `'private'`)

**Output type** — can be:
> - `'pem'` — `Base64` encoded string with header and footer. Used by default.
> - `'der'` — `Binary` encoded key data.

**Shortcuts**
> - `'private'` or `'pkcs1'` or `'pkcs1-private'` == `'pkcs1-private-pem'` — `private` key encoded in `pcks1` scheme as `pem` string.
> - `'public'` or `'pkcs8-public'` == `'pkcs8-public-pem'` — `public` key encoded in `pcks8` scheme as `pem` string.
> - `'pkcs8'` or `'pkcs8-private'` == `'pkcs8-private-pem'` — `private` key encoded in `pcks8` scheme as `pem` string.
> - `'pkcs1-der'` == `'pkcs1-private-der'` — `private` key encoded in `pcks1` scheme as binary `buffer`.
> - `'pkcs8-public-der'` — `public` key encoded in `pcks8` scheme as binary `buffer`.

### *Options:*
> - ***{EncryptionScheme | AdvancedEncryptionScheme } encryptionScheme*** *(optional): padding scheme for encrypt/decrypt. (default: `'pkcs1_oaep'`).*

### *EncryptionScheme:*
> ***string*** => `'pkcs1_oaep'` | `'pkcs1'`

### *AdvancedEncryptionScheme:*
> ***type*** => `AdvancedEncryptionSchemePKCS1` | `AdvancedEncryptionSchemePKCS1OAEP`

### *AdvancedEncryptionSchemePKCS1:*
> ***object*** => {`scheme`: 'pkcs1', `padding`: number}

### *AdvancedEncryptionSchemePKCS1OAEP:*
> ***object*** => {`scheme`: 'pkcs1_oaep', `hash`: HashingAlgorithm}

### *HashingAlgorithm:*
> ***string*** => `'ripemd160'` | `'md4'` | `'md5'` | `'sha'` | `'sha1'` | `'sha224'` | `'sha256'` | `'sha384'` | `'sha512'`

### *Data:*
> ***type*** => `string` | `object` | `any[]`

### *Encoding:*
> ***string*** => `'ascii'` | `'utf8'` | `'utf16le'` | `'ucs2'` | `'latin1'` | `'base64'` | `'hex'` | `'binary'`

[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2019-09-12)
    * [.createKey([keyBits])](#createkeykeyBits)
    * [.loadKey(key[, format, options])](#loadkeykey-format-options)
    * [.importKey(key[, format])](#importkeykey-format)
    * [.generateKeyPair([bits, exponent])](#generatekeypairbits-exponent)
    * [.exportKey([format])](#exportkeyformat)
    * [.isPrivate()](#isprivate)
    * [.isPublic([strict])](#ispublicstrict)
    * [.isEmptyKey()](#isemptykey)
    * [.getKeySize()](#getkeysize)
    * [.getMaxMessageSize()](#getmaxmessagesize)
    * [.encryptPublic(data[, encoding, sourceEncoding])](#encryptpublicdata-encoding-sourceencoding)
    * [.encryptPrivate(data[, encoding, sourceEncoding])](#encryptprivatedata-encoding-sourceencoding)
    * [.decryptPublic(data[, encoding])](#decryptpublicdata-encoding)
    * [.decryptPrivate(data[, encoding])](#decryptprivatedata-encoding)
    * [.sign(data[, encoding, sourceEncoding])](#signdata-encoding-sourceencoding)
    * [.verify(data, signature[, sourceEncoding, signatureEncoding])](#verifydata-signature-sourceencoding-signatureencoding)
    
[Back to top](#table-of-contents)
