<div style="margin-bottom:20px;">
<div style="line-height:60px">
    <a href="https://travis-ci.org/akanass/rx-crypto.svg?branch=next">
        <img src="https://travis-ci.org/akanass/rx-crypto.svg?branch=next" alt="build" />
    </a>
    <a href="https://coveralls.io/github/akanass/rx-crypto?branch=next">
        <img src="https://coveralls.io/repos/github/akanass/rx-crypto/badge.svg?branch=next" alt="coveralls" />
    </a>
    <a href="https://david-dm.org/akanass/rx-crypto">
        <img src="https://david-dm.org/akanass/rx-crypto.svg" alt="dependencies" />
    </a>
    <a href="https://david-dm.org/akanass/rx-crypto?type=dev">
        <img src="https://david-dm.org/akanass/rx-crypto/dev-status.svg" alt="devDependencies" />
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
</div>
</div>

# Rx-Crypto

`Crypto` library provides some functions for security features like `AES key`, `Key pair`, `PKCS12`, `RSA key`, `Certificate`, `JWT` and more.

We use existing node modules to provide these functions: [NodeRSA](https://github.com/rzcoder/node-rsa), [PEM](https://github.com/Dexus/pem), [JWT](https://github.com/auth0/node-jsonwebtoken) and [RandomString](https://github.com/klughammer/node-randomstring) but we add `Observable` feature for asynchronous and stream processes.

**All most important crypto features in only one library.**

## Table of contents

* [Using rx-crypto library](#using-rx-crypto-library)
    * [Yarn or NPM it in your package.json](#yarn-or-npm-it-in-your-packagejson)
    * [Use it anywhere](#use-it-anywhere)
* [API in Detail](#api-in-detail)
* [Contributing](#contributing)
* [Change History](#change-history)
* [Maintainers](#maintainers)
* [License](#license)

## Using rx-crypto library

### `yarn` or `npm` it in your `package.json`

```bash
$ npm install --save @akanass/rx-crypto rxjs

or

$ yarn add @akanass/rx-crypto rxjs
```

```javascript
"dependencies": {
    "@akanass/rx-crypto": "^1.0.0",
    "rxjs": "^6.5.2",
    //...
}
//...
```

### use it anywhere

You can use `AES`, `Hash`, `PEM`, `RandomString`, `JWT` and `RSA` anywhere in your own library or script.

```javascript
import { RSA, NodeRSA } from '@akanass/rx-crypto';

const rsa: RSA = new RSA();
rsa.createKey().subscribe(
    (k: NodeRSA) => console.log(k), // Show NodeRSA instance in console
    e => console.error(e) // Show error in console
);
```

[Back to top](#table-of-contents)

## API in Detail

We implemented some services and to see their details go to documentation folder:

* [./documentation/AES.md](https://github.com/akanass/rx-crypto/blob/master/documentation/AES.md)
* [./documentation/Hash.md](https://github.com/akanass/rx-crypto/blob/master/documentation/Hash.md)
* [./documentation/JWT.md](https://github.com/akanass/rx-crypto/blob/master/documentation/JWT.md)
* [./documentation/PEM.md](https://github.com/akanass/rx-crypto/blob/master/documentation/PEM.md)
* [./documentation/RandomString.md](https://github.com/akanass/rx-crypto/blob/master/documentation/RandomString.md)
* [./documentation/RSA.md](https://github.com/akanass/rx-crypto/blob/master/documentation/RSA.md)

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

* v1.0.0 (2019-08-27)
    * Implementation of `library` with `AES`, `Hash`, `PEM`, `RandomString` and `RSA`
    * Implementation of `Observable's` operators for `AES` and `RSA` features.
    * Related tests.
    * Documentation.

## License

Copyright (c) 2019 **Nicolas Jessel** Licensed under the [MIT license](https://github.com/akanass/rx-crypto/blob/next/LICENSE.md).

[Back to top](#table-of-contents)
