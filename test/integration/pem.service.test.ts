import { flatMap } from 'rxjs/operators';
import {
    CertificateCreationResult,
    CertificateSubjectReadResult,
    CSRCreationResult,
    DhParamInfoResult,
    DhParamKeyCreationResult,
    EcParamKeyCreationResult,
    FingerprintResult,
    KeyPairCreationResult,
    ModulusResult,
    PemService,
    PKCS12CreationResult,
    PrivateKeyCreationResult,
    PublicKeyCreationResult
} from '../../src';

let pemService: PemService;

describe('- Integration pem.service.test.ts file', () => {
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
     * Test if `PemService.createPrivateKey()` Observable returns `PrivateKeyCreationResult` object `{key}`
     */
    test('- `PemService.createPrivateKey()` Observable must return a `PrivateKeyCreationResult` object `{key}`', (done) => {
        pemService.createPrivateKey()
            .subscribe((privateKeyCreationResult: PrivateKeyCreationResult) => {
                expect(privateKeyCreationResult).toHaveProperty('key');
                done();
            });
    });

    /**
     * Test if `PemService.createDhparam()` Observable returns `DhParamKeyCreationResult` object `{dhparam}`
     */
    test('- `PemService.createDhparam()` Observable must return a `DhParamKeyCreationResult` object `{dhparam}`', (done) => {
        pemService.createDhparam()
            .subscribe((dhParamKeyCreationResult: DhParamKeyCreationResult) => {
                expect(dhParamKeyCreationResult).toHaveProperty('dhparam');
                done();
            });
    });

    /**
     * Test if `PemService.createEcparam()` Observable returns `EcParamKeyCreationResult` object `{ecparam}`
     */
    test('- `PemService.createEcparam()` Observable must return a `EcParamKeyCreationResult` object `{ecparam}`', (done) => {
        pemService.createEcparam()
            .subscribe((ecParamKeyCreationResult: EcParamKeyCreationResult) => {
                expect(ecParamKeyCreationResult).toHaveProperty('ecparam');
                done();
            });
    });

    /**
     * Test if `PemService.createCSR()` Observable returns `CSRCreationResult` object `{csr, clientKey}`
     */
    test('- `PemService.createCSR()` Observable must return a `CSRCreationResult` object `{csr, clientKey}`', (done) => {
        pemService.createCSR()
            .subscribe((csrCreationResult: CSRCreationResult) => {
                expect(csrCreationResult).toHaveProperty('csr');
                expect(csrCreationResult).toHaveProperty('clientKey');
                done();
            });
    });

    /**
     * Test if `PemService.createCertificate()` Observable returns `CertificateCreationResult` object
     * `{certificate, csr, clientKey, serviceKey}`
     */
    test('- `PemService.createCertificate()` Observable must return a `CertificateCreationResult` object ' +
        '`{certificate, csr, clientKey, serviceKey}`', (done) => {
        pemService.createCertificate()
            .subscribe((certificateCreationResult: CertificateCreationResult) => {
                expect(certificateCreationResult).toHaveProperty('certificate');
                expect(certificateCreationResult).toHaveProperty('csr');
                expect(certificateCreationResult).toHaveProperty('clientKey');
                expect(certificateCreationResult).toHaveProperty('serviceKey');
                done();
            });
    });

    /**
     * Test if `PemService.readCertificateInfo()` Observable returns `CertificateSubjectReadResult` object
     * `{country, state, locality, organization, organizationUnit, commonName, emailAddress}`
     */
    test('- `PemService.readCertificateInfo()` Observable must return a `CertificateSubjectReadResult` object ' +
        '`{country, state, locality, organization, organizationUnit, commonName, emailAddress}`', (done) => {
        pemService.createCertificate()
            .pipe(
                flatMap((c: CertificateCreationResult) => pemService.readCertificateInfo(c.certificate))
            )
            .subscribe((certificateSubjectReadResult: CertificateSubjectReadResult) => {
                expect(certificateSubjectReadResult).toHaveProperty('country');
                expect(certificateSubjectReadResult).toHaveProperty('state');
                expect(certificateSubjectReadResult).toHaveProperty('locality');
                expect(certificateSubjectReadResult).toHaveProperty('organization');
                expect(certificateSubjectReadResult).toHaveProperty('organizationUnit');
                expect(certificateSubjectReadResult).toHaveProperty('commonName');
                expect(certificateSubjectReadResult).toHaveProperty('emailAddress');
                done();
            });
    });

    /**
     * Test if `PemService.getPublicKey()` Observable returns `PublicKeyCreationResult` object {publicKey}`
     */
    test('- `PemService.getPublicKey()` Observable must return a `PublicKeyCreationResult` object `{publicKey}`', (done) => {
        pemService.createPrivateKey()
            .pipe(
                flatMap((c: PrivateKeyCreationResult) => pemService.getPublicKey(c.key))
            )
            .subscribe((publicKeyCreationResult: PublicKeyCreationResult) => {
                expect(publicKeyCreationResult).toHaveProperty('publicKey');
                done();
            });
    });

    /**
     * Test if `PemService.createKeyPair()` Observable returns `KeyPairCreationResult` object `{key, publicKey}`
     */
    test('- `PemService.createKeyPair()` Observable must return a `KeyPairCreationResult` object `{key, publicKey}`', (done) => {
        pemService.createKeyPair()
            .subscribe((keyPairCreationResult: KeyPairCreationResult) => {
                expect(keyPairCreationResult).toHaveProperty('key');
                expect(keyPairCreationResult).toHaveProperty('publicKey');
                done();
            });
    });

    /**
     * Test if `PemService.getFingerprint()` Observable returns `FingerprintResult` object {fingerprint}`
     */
    test('- `PemService.getFingerprint()` Observable must return a `FingerprintResult` object `{fingerprint}`', (done) => {
        pemService.createCertificate()
            .pipe(
                flatMap((c: CertificateCreationResult) => pemService.getFingerprint(c.certificate))
            )
            .subscribe((fingerprintResult: FingerprintResult) => {
                expect(fingerprintResult).toHaveProperty('fingerprint');
                done();
            });
    });

    /**
     * Test if `PemService.getModulus()` Observable returns `ModulusResult` object {modulus}`
     */
    test('- `PemService.getModulus()` Observable must return a `ModulusResult` object `{modulus}`', (done) => {
        pemService.createCertificate()
            .pipe(
                flatMap((c: CertificateCreationResult) => pemService.getModulus(c.certificate))
            )
            .subscribe((modulusResult: ModulusResult) => {
                expect(modulusResult).toHaveProperty('modulus');
                done();
            });
    });

    /**
     * Test if `PemService.getDhparamInfo()` Observable returns `DhParamInfoResult` object {size, prime}`
     */
    test('- `PemService.getDhparamInfo()` Observable must return a `DhParamInfoResult` object `{size, prime}`', (done) => {
        pemService.createDhparam()
            .pipe(
                flatMap((dh: DhParamKeyCreationResult) => pemService.getDhparamInfo(dh.dhparam))
            )
            .subscribe((dhParamInfoResult: DhParamInfoResult) => {
                expect(dhParamInfoResult).toHaveProperty('size');
                expect(dhParamInfoResult).toHaveProperty('prime');
                done();
            });
    });

    /**
     * Test if `PemService.createPkcs12()` Observable returns `PKCS12CreationResult` object {pkcs12}`
     */
    test('- `PemService.createPkcs12()` Observable must return a `PKCS12CreationResult` object `{pkcs12}`', (done) => {
        pemService.createPrivateKey()
            .pipe(
                flatMap((pk: PrivateKeyCreationResult) =>
                    pemService.createCertificate({
                        clientKey: pk.key,
                        selfSigned: true
                    })
                ),
                flatMap((c: CertificateCreationResult) => pemService.createPkcs12(c.clientKey, c.certificate, 'password'))
            )
            .subscribe((pkcs12Result: PKCS12CreationResult) => {
                expect(pkcs12Result).toHaveProperty('pkcs12');
                done();
            });
    });

    /**
     * Test if `PemService.readPkcs12()` Observable returns an error if no pkcs12 is provided
     */
    test('- `PemService.readPkcs12()` Observable must return an error if no pkcs12 is provided', (done) => {
        pemService.readPkcs12('/i/do/not/exist.p12').subscribe(() => null, err => {
            expect(err.message).toBe('Cannot read property \'p12Password\' of undefined');
            done();
        });
    });

    /**
     * Test if `PemService.checkPkcs12()` Observable returns true
     */
    test('- `PemService.createPkcs12()` Observable must return true', (done) => {
        pemService.createPrivateKey()
            .pipe(
                flatMap((pk: PrivateKeyCreationResult) =>
                    pemService.createCertificate({
                        clientKey: pk.key,
                        selfSigned: true
                    })
                ),
                flatMap((c: CertificateCreationResult) => pemService.createPkcs12(c.clientKey, c.certificate, 'password')),
                flatMap((pkcs12Result: PKCS12CreationResult) => pemService.checkPkcs12(pkcs12Result.pkcs12, 'password'))
            )
            .subscribe((isValid: boolean) => {
                expect(isValid).toBeTruthy();
                done();
            });
    });

    /**
     * Test if `PemService.verifySigningChain()` Observable returns true
     */
    test('- `PemService.verifySigningChain()` Observable must return true', (done) => {
        pemService.createCertificate({ commonName: 'CA Certificate' })
            .pipe(
                flatMap((ca: CertificateCreationResult) =>
                    pemService.createCertificate({
                        serviceKey: ca.serviceKey, serviceCertificate: ca.certificate, serial: Date.now()
                    })
                        .pipe(
                            flatMap((cert: CertificateCreationResult) =>
                                pemService.verifySigningChain(cert.certificate, ca.certificate)
                            )
                        )
                )
            )
            .subscribe((isValid: boolean) => {
                expect(isValid).toBeTruthy();
                done();
            });
    });

    /**
     * Test if `PemService.checkCertificate()` Observable returns true
     */
    test('- `PemService.checkCertificate()` Observable must return true', (done) => {
        pemService.createCertificate()
            .pipe(
                flatMap((c: CertificateCreationResult) => pemService.checkCertificate(c.certificate))
            )
            .subscribe((isValid: boolean) => {
                expect(isValid).toBeTruthy();
                done();
            });
    });
});
