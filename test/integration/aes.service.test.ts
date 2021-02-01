import { Buffer } from 'buffer';
import { of } from 'rxjs';
import { AESKeyCreationResult, AesService } from '../../src';
import { decryptWithAesKey, encryptWithAesKey } from '../../src/operators/aes';

let aesService: AesService;
let password: string;
let salt: string;

describe('- Integration aes.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        aesService = new AesService();
        password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
        salt = 'Kt9V3wgxrhpf8GN3';
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        aesService = undefined;
        password = undefined;
        salt = undefined;
    });

    /**
     * Test if `AesService.createKey()` function returns an Observable with error if AesService key parameters are wrong
     */
    test('- `AesService.createKey()` function must return an Observable with error if AesService key parameters are wrong', (done) => {
        aesService.createKey(null, null).subscribe(() => null, err => {
            expect(err.message).toBe('The "password" argument must be of type string or an instance of ArrayBuffer, Buffer, TypedArray, or DataView. Received null');
            done();
        });
    });

    /**
     * Test if `AesService.createKey()` Observable returns AesServiceKeyCreationResult object
     */
    test('- `AesService.createKey()` Observable function must return an AesServiceKeyCreationResult object `{key, iv}`', (done) => {
        aesService.createKey(password, salt).subscribe((aesKeyCreationResult: AESKeyCreationResult) => {
            expect(aesKeyCreationResult).toHaveProperty('key');
            expect(aesKeyCreationResult).toHaveProperty('iv');
            expect(aesKeyCreationResult).toStrictEqual({
                key: '61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f4419',
                iv: '31cef43b785870e993cbc94aee0354cf'
            });
            done();
        });
    });

    /**
     * Test if `AesService.createKey().pipe(encryptWithAesKey())` returns Buffer
     */
    test('- `AesService.createKey().pipe(encryptWithAesKey())` must return a Buffer', (done) => {
        aesService.createKey(password, salt)
            .pipe(
                encryptWithAesKey(Buffer.from('data'))
            )
            .subscribe(buffer => {
                expect(buffer).toBeInstanceOf(Buffer);
                done();
            });
    });

    /**
     * Test if `AesService.createKey().pipe(encryptWithAesKey())` returns Buffer and
     *  his string representation is `a3d4bb8fcb8ec0e24a86cef07a28e3af`
     */
    test('- `AesService.createKey().pipe(encryptWithAesKey())` must return a Buffer and his string representation is ' +
        '`a3d4bb8fcb8ec0e24a86cef07a28e3af`', (done) => {
        aesService.createKey(password, salt)
            .pipe(
                encryptWithAesKey(Buffer.from('data'))
            )
            .subscribe(buffer => {
                expect(buffer.toString('hex')).toBe('a3d4bb8fcb8ec0e24a86cef07a28e3af');
                done();
            });
    });

    /**
     * Test if `AesService.createKey().pipe(decryptWithAesKey())` returns Buffer
     */
    test('- `AesService.createKey().pipe(decryptWithAesKey())` must return a Buffer', (done) => {
        aesService.createKey(password, salt)
            .pipe(
                decryptWithAesKey(Buffer.from('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            )
            .subscribe(buffer => {
                expect(buffer).toBeInstanceOf(Buffer);
                done();
            });
    });

    /**
     * Test if `AesService.createKey().pipe(decryptWithAesKey())` returns Buffer and
     *  his string representation is `data`
     */
    test('- `AesService.createKey().pipe(decryptWithAesKey())` must return a Buffer and his string representation is ' +
        '`data`', (done) => {
        aesService.createKey(password, salt)
            .pipe(
                decryptWithAesKey(Buffer.from('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            )
            .subscribe(buffer => {
                expect(buffer.toString()).toBe('data');
                done();
            });
    });

    /**
     * Test if `AesService.createKey().pipe(encryptWithAesKey())` lettable operator returns an Observable with error
     * if AesService key is wrong
     */
    test('- `AesService.createKey().pipe(encryptWithAesKey())` must return an Observable with error if AesService key is wrong', (done) => {
        of({ key: null, iv: null })
            .pipe(
                encryptWithAesKey(Buffer.from('data'))
            )
            .subscribe(() => null, err => {
                expect(err.message).toBe('The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received null');
                done();
            });
    });

    /**
     * Test if `AesService.createKey().pipe(decryptWithAesKey())` lettable operator returns an Observable with error if
     * AesService key is wrong
     */
    test('- `AesService.createKey().pipe(decryptWithAesKey())` must return an Observable with error if AesService key is wrong', (done) => {
        of({ key: null, iv: null })
            .pipe(
                decryptWithAesKey(Buffer.from('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            )
            .subscribe(() => null, err => {
                expect(err.message).toBe('The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received null');
                done();
            });
    });
});
