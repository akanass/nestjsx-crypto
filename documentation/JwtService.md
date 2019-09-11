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

# JwtService

After imported `CryptoModule` in your module, you can access to `JwtService` anywhere with **dependency injection**.

```typescript
import { CryptoModule, JwtService } from '@akanass/nestjsx-crypto';
import { Injectable, Module } from '@nestjs/common';

@Injectable()
class NestJSServiceWithCrypto {
    constructor(private readonly _jwtService: JwtService) {}
}

@Module({
    imports: [
        CryptoModule
    ],
    providers: [
        NestJSServiceWithCrypto
    ]
})
export class NestJSModuleNeedsCryptoModule {}
```

## Table of contents

* [API in Detail](#api-in-detail)
    * [.sign(payload, secretOrPrivateKey[, options])](#signpayload-secretorprivatekey-options)
    * [.verify(token, secretOrPublicKey[, options])](#verifytoken-secretorpublickey-options)
    * [.decode(token[, options])](#decodetoken-options)
* [Parameters types in detail](#parameters-types-in-detail)
    * [SignOptions](#signoptions)
    * [VerifyOptions](#verifyoptions)
    * [DecodeOptions](#decodeoptions)
* [Errors and Codes](#errors-and-codes)
    * [TokenExpiredError](#tokenexpirederror)
    * [NotBeforeError](#notbeforeerror)
    * [JsonWebTokenError](#jsonwebtokenerror)
    * [JsonWebTokenErrorMessage](#jsonwebtokenerrormessage)
* [Algorithms supported](#algorithms-supported)
* [Change History](#change-history)

## API in Detail

### `.sign(payload, secretOrPrivateKey[, options])`

Sign the given `payload` into a `JSON Web Token string`.

If `payload` is not a buffer or a string, it will be coerced into a string using `JSON.stringify`.

There are no default values for `expiresIn`, `notBefore`, `audience`, `subject`, `issuer`. These claims can also be provided in the payload directly with `exp`, `nbf`, `aud`, `sub` and `iss` respectively, but you can't include in both places.

Remember that `exp`, `nbf` and `iat` are **NumericDate**, see related [Token Expiration (exp claim)](#token-expiration-exp-claim)

The header can be customized via the `option.header` object.

Generated jwts will include an `iat` (issued at) claim by default unless `noTimestamp` is specified. If `iat` is inserted in the payload, it will be used instead of the real timestamp for calculating other things like `exp` given a timestamp in `options.expiresIn`.

**Parameters:**
> - ***{string | Buffer | Object} payload*** *(required): Payload to `sign`, could be an `literal`, `buffer` or `string`.*
> - ***{string | Buffer} secretOrPrivateKey*** *(required): Either the `secret` for `HMAC algorithms` or the `PEM encoded private key` for `RSA` and `ECDSA`. In case of a `private key` with `passphrase` an object `{ key, passphrase }` can be used, in this case be sure you pass the `algorithm` option.*
> - ***{SignOptions} options*** *(optional): Optional object for the signature.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `JWT` will be passed as a `string`.*

**Example:**
```javascript
this._jwtService.sign({data: 'data to sign'}, Buffer.from('secret to sign JWT'))
    .subscribe(
        (jwt: string) => console.log(jwt), // Show `jwt` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.verify(token, secretOrPublicKey[, options])`

Verify given `token` using a `secret` or a `public key` to get a `decoded token`.

**Parameters:**
> - ***{string} token*** *(required): `JWT string` to verify.*
> - ***{string | Buffer} secretOrPublicKey*** *(required): Either the secret for `HMAC algorithms`, or the `PEM encoded public key` for `RSA` and `ECDSA`.*
> - ***{VerifyOptions} options*** *(optional): Optional object for the verification.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `verified` and `decoded` `JWT` data will be passed as an `Object` or a `string`.*

**Example:**
```javascript
this._jwtService.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ.f0B-YNbl9qIbHgDRMcDBxZDrQN5UiLkX5_9McwNvHZI', Buffer.from('secret to sign JWT'))
    .subscribe(
        (decoded: object | string) => console.log(decoded), // Show `decoded` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.decode(token[, options])`

Returns the `decoded payload`.

__Warning:__ This will __not__ verify whether the signature is valid. You should __not__ use this for untrusted messages. You most likely want to use `verify` instead.

**Parameters:**
> - ***{string} token*** *(required): JWT string to decode.*
> - ***{DecodeOptions} options*** *(optional): Optional object for decoding.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `decoded` `JWT` data will be passed as an `Object` or a `string`.*

**Example:**
```javascript
this._jwtService.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ.f0B-YNbl9qIbHgDRMcDBxZDrQN5UiLkX5_9McwNvHZI')
    .subscribe(
        (decoded: object | string) => console.log(decoded), // Show `decoded` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

## Parameters types in detail

### *SignOptions:*
> - ***{string} algorithm*** *(optional): signature algorithm. (default: `'HS256'`).*
> - ***{string} keyid*** *(optional): unique identifier for the key.*
> - ***{string} expiresIn*** *(optional): expressed in `seconds` or a `string` describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d".*
> - ***{string} notBefore*** *(optional): expressed in `seconds` or a `string` describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d".*
> - ***{string} audience*** *(optional): `JWT` audience value.*
> - ***{string} subject*** *(optional): `JWT` subject value.*
> - ***{string} issuer*** *(optional): `JWT` issuer value.*
> - ***{string} jwtid*** *(optional): `JWT` unique identifier.*
> - ***{boolean} noTimestamp*** *(optional): flag to know if `iat` are included in generation.*
> - ***{object} header*** *(optional): object to customize `JWT` header.*

### *VerifyOptions:*
> - ***{string[]} algorithms*** *(optional): List of strings with the names of the allowed algorithms. For instance, [`'HS256'`, `'HS384'`].*
> - ***{string | string[]} audience*** *(optional): if you want to check audience (`aud`), provide a value here.*
> - ***{string | string[]} issuer*** *(optional): `string` or `array of strings` of valid values for the `iss` field.*
> - ***{boolean} ignoreExpiration*** *(optional): if `true` do not validate the expiration of the token.*
> - ***{boolean} ignoreNotBefore*** *(optional): if `true` do not validate the value of `not before` start of the token.*
> - ***{string} subject*** *(optional): if you want to check subject (`sub`), provide a value here.*
> - ***{string} jwtId*** *(optional): if you want to check `jwtId`, provide a value here.*
> - ***{number} clockTolerance*** *(optional): number of seconds to tolerate when checking the `nbf` and `exp` claims, to deal with small clock differences among different servers.*

### *DecodeOptions:*
> - ***{boolean} complete*** *(optional): return an `object` with the decoded `payload` and `header`.*
> - ***{boolean} json*** *(optional): force `JSON.parse` on the `payload` even if the `header` doesn't contain `'typ':'JWT'`.*

[Back to top](#table-of-contents)

## Errors and Codes

Possible thrown errors during verification.

### *TokenExpiredError:*
> - ***{string} name*** *(required): `'TokenExpiredError'`*
> - ***{string} message*** *(required): `'jwt expired'`*
> - ***{number} expiredAt*** *(required): `timestamp`*

### *NotBeforeError:*
> - ***{string} name*** *(required): `'NotBeforeError'`*
> - ***{string} message*** *(required): `'jwt not active'`*
> - ***{Date} date*** *(required): `Date`*

### *JsonWebTokenError:*
> - ***{string} name*** *(required): `'JsonWebTokenError'`*
> - ***{JsonWebTokenErrorMessage} message*** *(required): all errors messages.*

### *JsonWebTokenErrorMessage:*
> - ***`'jwt malformed'`***
> - ***`'jwt signature is required'`***
> - ***`'invalid signature'`***
> - ***`'jwt audience invalid'`. expected: `[OPTIONS AUDIENCE]`***
> - ***`'jwt issuer invalid'`. expected: `[OPTIONS ISSUER]`***
> - ***`'jwt id invalid'`. expected: `[OPTIONS JWT ID]`***
> - ***`'jwt subject invalid'`. expected: `[OPTIONS SUBJECT]`***

[Back to top](#table-of-contents)

## Algorithms supported
Array of supported algorithms. The following algorithms are currently supported.

alg Parameter Value | Digital Signature or MAC Algorithm
----------------|----------------------------
HS256 | HMAC using SHA-256 hash algorithm
HS384 | HMAC using SHA-384 hash algorithm
HS512 | HMAC using SHA-512 hash algorithm
RS256 | RSASSA using SHA-256 hash algorithm
RS384 | RSASSA using SHA-384 hash algorithm
RS512 | RSASSA using SHA-512 hash algorithm
ES256 | ECDSA using P-256 curve and SHA-256 hash algorithm
ES384 | ECDSA using P-384 curve and SHA-384 hash algorithm
ES512 | ECDSA using P-521 curve and SHA-512 hash algorithm
none | No digital signature or MAC value included

[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2019-09-12)
    * [.sign(payload, secretOrPrivateKey[, options])](#signpayload-secretorprivatekey-options)
    * [.verify(token, secretOrPublicKey[, options])](#verifytoken-secretorpublickey-options)
    * [.decode(token[, options])](#decodetoken-options)
    
[Back to top](#table-of-contents)
