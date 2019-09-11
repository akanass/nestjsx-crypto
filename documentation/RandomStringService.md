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

# RandomStringService

After imported `CryptoModule` in your module, you can access to `RandomStringService` anywhere with **dependency injection**.

```typescript
import { CryptoModule, RandomStringService } from '@akanass/nestjsx-crypto';
import { Injectable, Module } from '@nestjs/common';

@Injectable()
class NestJSServiceWithCrypto {
    constructor(private readonly _randomStringService: RandomStringService) {}
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
    * [.generate([options])](#generateoptions)
* [Parameters types in detail](#parameters-types-in-detail)
    * [GenerateOptions](#generateoptions)
* [Change History](#change-history)

## API in Detail

### `.generate([options])`

Creates `random` string for given `options`

**Parameters:**
> - ***{GenerateOptions | number} options*** *(optional): `object` or `number` to configure data of generation.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `string`.*

**Example:**
```javascript
this._randomStringService.generate()
    .subscribe(
        (s: string) => console.log(s), // Show `XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT` in the console
        e => console.error(e.message) // Show error message in the console
    );


this._randomStringService.generate(7)
    .subscribe(
        (s: string) => console.log(s), // Show `xqm5wXX` in the console
        e => console.error(e.message) // Show error message in the console
    );


this._randomStringService.generate(
    {
        length: 12,
        charset: 'alphabetic'
    }
).subscribe(
    (s: string) => console.log(s), // Show `AqoTIzKurxJi` in the console
    e => console.error(e.message) // Show error message in the console
);


this._randomStringService.generate(
    {
        charset: 'abc'
    }
).subscribe(
    (s: string) => console.log(s), // Show `accbaabbbbcccbccccaacacbbcbbcbbc` in the console
    e => console.error(e.message) // Show error message in the console
);
```
[Back to top](#table-of-contents)

## Parameters types in detail

### *GenerateOptions:*
> - ***{number} length*** *(optional): the length of the random string. (default: `32`)*
> - ***{boolean} readable*** *(optional): exclude poorly readable chars: 0OIl. (default: `false`)*
> - ***{string} charset*** *(optional): define the character set for the string. (default: `alphanumeric`) (`alphanumeric` - [0-9 a-z A-Z], `alphabetic` - [a-z A-Z], `numeric` - [0-9], `hex` - [0-9 a-f], `custom` - any given characters)*
> - ***{string} capitalization*** *(optional): define whether the output should be lowercase / uppercase only. (default: `null`) (`lowercase`, `uppercase`)*

[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2019-09-12)
    * [.generate([options])](#generateoptions)
    
[Back to top](#table-of-contents)
