<div style="margin-bottom:20px;">
<div style="line-height:60px">
    <a href="https://travis-ci.org/akanass/nestjsx-crypto.svg?branch=master">
        <img src="https://travis-ci.org/akanass/nestjsx-crypto.svg?branch=master" alt="build" />
    </a>
    <a href="https://coveralls.io/github/akanass/nestjsx-crypto?branch=master">
        <img src="https://coveralls.io/repos/github/akanass/nestjsx-crypto/badge.svg?branch=master" alt="coveralls" />
    </a>
</div>
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

# NestJSX-Crypto

`Crypto` module for [NestJS](https://nestjs.com/) framework provides some functions for security features like `AES key`, `Key pair`, `PKCS12`, `RSA key`, `Certificate`, `JWT` and more.

This module is a wrapper to use [@akanass-rx-crypto](https://github.com/akanass/rx-crypto) library inside [NestJS](https://nestjs.com/) `application` in an easy way.

**All most important crypto features in only one module.**

## Table of contents

* [Using crypto module inside NestJS application](#using-crypto-module-inside-nestjs-application)
    * [Yarn or NPM it in your package.json](#yarn-or-npm-it-in-your-packagejson)
    * [Import CryptoModule](#import-cryptomodule)
    * [Use it anywhere](#use-it-anywhere)
* [API in Detail](#api-in-detail)
* [Contributing](#contributing)
* [Change History](#change-history)
* [Maintainers](#maintainers)
* [License](#license)

## Using crypto module inside NestJS application

### `yarn` or `npm` it in your `package.json`

```bash
$ npm install --save @akanass/nestjsx-crypto @nestjs/common rxjs reflect-metadata

or

$ yarn add @akanass/nestjsx-crypto @nestjs/common rxjs reflect-metadata
```

```javascript
"dependencies": {
    "@akanass/nestjsx-crypto": "^3.0.0",
    "@nestjs/common": "^8.0.11",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.4.0"
    //...
}
//...
```

### import `CryptoModule`

```typescript
import { CryptoModule } from '@akanass/nestjsx-crypto';
import { Module } from '@nestjs/common';
import { NestJSServiceWithCrypto } from './crypto.service.ts';

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

### use it anywhere

You can use `AesService`, `HashService`, `PemService`, `RandomStringService`, `JwtService` and `RsaService` anywhere in your module with **dependency injection**.

```typescript
import { RsaService, NodeRSA } from '@akanass/nestjsx-crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestJSServiceWithCrypto {
    constructor(private readonly _rsaService: RsaService) {}
    
    createRsaKey(): void {
        this._rsaService.createKey().subscribe(
            (k: NodeRSA) => console.log(k), // Show NodeRSA instance in console
            e => console.error(e) // Show error in console
        );
    }
}
```

[Back to top](#table-of-contents)

## API in Detail

We implemented some services and to see their details go to documentation folder:

* [./documentation/AesService.md](https://github.com/akanass/nestjsx-crypto/blob/master/documentation/AesService.md)
* [./documentation/HashService.md](https://github.com/akanass/nestjsx-crypto/blob/master/documentation/HashService.md)
* [./documentation/JwtService.md](https://github.com/akanass/nestjsx-crypto/blob/master/documentation/JwtService.md)
* [./documentation/PemService.md](https://github.com/akanass/nestjsx-crypto/blob/master/documentation/PemService.md)
* [./documentation/RandomStringService.md](https://github.com/akanass/nestjsx-crypto/blob/master/documentation/RandomStringService.md)
* [./documentation/RsaService.md](https://github.com/akanass/nestjsx-crypto/blob/master/documentation/RsaService.md)

[Back to top](#table-of-contents)

## Contributing

To set up your development environment:

1. clone the repo to your workspace,
2. in the shell `cd` to the main folder,
3. hit `npm or yarn install`,
4. run `npm or yarn run test`.
    * It will lint the code and execute all tests. 
    * The test coverage report can be viewed from `./coverage/lcov-report/index.html`.

[Back to top](#table-of-contents)

## Change History
* v3.0.0 (2021-10-08)
    * Update packages' versions
    * Latest `@akanass/rx-crypto` version `2.2.0`
    * Latest `rxjs` version `7.4.0`
    * Latest `nestjs` version `8.0.11`
    * Update tests
* v2.0.0 (2021-06-07)
    * Update packages' versions
    * Latest `@akanass/rx-crypto` version `2.0.0`
    * Latest `rxjs` version `7.1.0`
* v1.1.0 (2021-01-31)
    * Update packages' versions
    * Fix tests
    * Fix `tslint`
* v1.0.0 (2019-09-12)
    * Implementation of `CryptoModule` with `AesService`, `HashService`, `JwtService`, `PemService`, `RandomStringService` and `RsaService`
    * Implementation of `Observable's` operators for `AesService` and `RsaService` features.
    * Related tests.
    * Documentation.

## License

Copyright (c) 2021 **Nicolas Jessel** Licensed under the [MIT license](https://github.com/akanass/nestjsx-crypto/blob/master/LICENSE.md).

[Back to top](#table-of-contents)
