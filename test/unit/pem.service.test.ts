import { Observable } from 'rxjs';
import { PemService } from '../../src';

let pemService: PemService;

describe('- Unit pem.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        pemService = new PemService();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        pemService = undefined;
    });

    /**
     * Test if `PemService.createPrivateKey()` function returns an Observable
     */
    test('- `PemService.createPrivateKey()` function must return an Observable', (done) => {
        expect(pemService.createPrivateKey()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.createDhparam()` function returns an Observable
     */
    test('- `PemService.createDhparam()` function must return an Observable', (done) => {
        expect(pemService.createDhparam()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.createCSR()` function returns an Observable
     */
    test('- `PemService.createCSR()` function must return an Observable', (done) => {
        expect(pemService.createCSR()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.createCertificate()` function returns an Observable
     */
    test('- `PemService.createCertificate()` function must return an Observable', (done) => {
        expect(pemService.createCertificate()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.readCertificateInfo()` function returns an Observable
     */
    test('- `PemService.readCertificateInfo()` function must return an Observable', (done) => {
        expect(pemService.readCertificateInfo(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.getPublicKey()` function returns an Observable
     */
    test('- `PemService.getPublicKey()` function must return an Observable', (done) => {
        expect(pemService.getPublicKey(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.createKeyPair()` function returns an Observable
     */
    test('- `PemService.createKeyPair()` function must return an Observable', (done) => {
        expect(pemService.createKeyPair()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.getFingerprint()` function returns an Observable
     */
    test('- `PemService.getFingerprint()` function must return an Observable', (done) => {
        expect(pemService.getFingerprint(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.getModulus()` function returns an Observable
     */
    test('- `PemService.getModulus()` function must return an Observable', (done) => {
        expect(pemService.getModulus(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.getDhparamInfo()` function returns an Observable
     */
    test('- `PemService.getDhparamInfo()` function must return an Observable', (done) => {
        expect(pemService.getDhparamInfo(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.createPkcs12()` function returns an Observable
     */
    test('- `PemService.createPkcs12()` function must return an Observable', (done) => {
        expect(pemService.createPkcs12(null, null, null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.readPkcs12()` function returns an Observable
     */
    test('- `PemService.readPkcs12()` function must return an Observable', (done) => {
        expect(pemService.readPkcs12(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.checkPkcs12()` function returns an Observable
     */
    test('- `PemService.checkPkcs12()` function must return an Observable', (done) => {
        expect(pemService.checkPkcs12(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.verifySigningChain()` function returns an Observable
     */
    test('- `PemService.verifySigningChain()` function must return an Observable', (done) => {
        expect(pemService.verifySigningChain(null, null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.checkCertificate()` function returns an Observable
     */
    test('- `PemService.checkCertificate()` function must return an Observable', (done) => {
        expect(pemService.checkCertificate(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PemService.createEcparam()` function returns an Observable
     */
    test('- `PemService.createEcparam()` function must return an Observable', (done) => {
        expect(pemService.createEcparam()).toBeInstanceOf(Observable);
        done();
    });
});
