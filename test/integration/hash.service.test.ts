import { Buffer } from 'buffer';
import { HashService } from '../../src';

let hashService: HashService;
let password: string;
let salt: string;
let iterations: number;
let keylen: number;
let digest: string;

describe('- Integration hash.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        hashService = new HashService();
        password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
        salt = 'Kt9V3wgxrhpf8GN3';
        iterations = 4096;
        keylen = 24;
        digest = 'sha256';
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        hashService = undefined;
        password = undefined;
        salt = undefined;
        iterations = undefined;
        keylen = undefined;
        digest = undefined;
    });

    /**
     * Test if `HashService.generate()` function returns an Observable with error if parameters are wrong
     */
    test('- `HashService.generate()` function must return an Observable with error if parameters are wrong', (done) => {
        hashService.generate(undefined, undefined, undefined, undefined, undefined)
            .subscribe(() => null, err => {
                    expect(err.message).toBe('The "digest" argument must be one of type string or null. Received type undefined');
                    done();
                }
            );
    });

    /**
     * Test if `HashService.generate()` Observable returns Buffer
     */
    test('- `HashService.generate()` Observable function must return a Buffer', (done) => {
        hashService.generate(password, salt, iterations, keylen, digest).subscribe(buffer => {
            expect(buffer).toBeInstanceOf(Buffer);
            done();
        });
    });

    /**
     * Test if `HashService.generate()` Observable returns Buffer and
     *  his string representation is `61cac683ff27580e4c68778df5208c745b0e473172778658`
     */
    test('- `HashService.generate()` Observable function must return a Buffer and his string representation is ' +
        '`61cac683ff27580e4c68778df5208c745b0e473172778658`', (done) => {
        hashService.generate(password, salt, iterations, keylen, digest).subscribe(buffer => {
            expect(buffer.toString('hex')).toBe('61cac683ff27580e4c68778df5208c745b0e473172778658');
            done();
        });
    });
});
