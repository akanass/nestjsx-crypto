import { Observable } from 'rxjs';
import { RsaService } from '../../src';
import {
    decryptPrivate,
    decryptPublic,
    encryptPrivate,
    encryptPublic,
    exportKey,
    generateKeyPair,
    getKeySize,
    getMaxMessageSize,
    importKey,
    isEmptyKey,
    isPrivate,
    isPublic,
    sign,
    verify
} from '../../src/operators/rsa';

let rsaService: RsaService;

describe('- Unit rsa.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        rsaService = new RsaService();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        rsaService = undefined;
    });

    /**
     * Test if `RsaService.createKey()` function returns an Observable
     */
    test('- `RsaService.createKey()` function must return an Observable', (done) => {
        expect(rsaService.createKey()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey()` function returns an Observable
     */
    test('- `RsaService.loadKey()` function must return an Observable', (done) => {
        expect(rsaService.loadKey(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.createKey().pipe(importKey())` function returns an Observable
     */
    test('- `RsaService.createKey().pipe(importKey())` function must return an Observable', (done) => {
        expect(
            rsaService.createKey()
                .pipe(
                    importKey(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.createKey().pipe(generateKeyPair())` function returns an Observable
     */
    test('- `RsaService.createKey().pipe(generateKeyPair())` function must return an Observable', (done) => {
        expect(
            rsaService.createKey()
                .pipe(
                    generateKeyPair()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(exportKey())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(exportKey())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    exportKey()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(isPrivate())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(isPrivate())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    isPrivate()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(isPublic())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(isPublic())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    isPublic()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(isEmptyKey())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(isEmptyKey())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    isEmptyKey()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(getKeySize())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(getKeySize())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    getKeySize()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(getMaxMessageSize())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(getMaxMessageSize())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    getMaxMessageSize()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(encryptPublic())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(encryptPublic())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    encryptPublic(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(encryptPrivate())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(encryptPrivate())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    encryptPrivate(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(decryptPrivate())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(decryptPrivate())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    decryptPrivate(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(decryptPublic())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(decryptPublic())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    decryptPublic(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(sign())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(sign())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    sign(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RsaService.loadKey().pipe(verify())` function returns an Observable
     */
    test('- `RsaService.loadKey().pipe(verify())` function must return an Observable', (done) => {
        expect(
            rsaService.loadKey(null)
                .pipe(
                    verify(null, null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });
});
