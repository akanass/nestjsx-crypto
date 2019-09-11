import {
    CertificateCreationOptions,
    CertificateCreationResult,
    CertificateSubjectReadResult,
    CSRCreationOptions,
    CSRCreationResult,
    DhParamInfoResult,
    DhParamKeyCreationResult,
    EcParamKeyCreationResult,
    FingerprintResult,
    HashFunction,
    KeyPairCreationResult,
    ModuleConfiguration,
    ModulusResult,
    PEM,
    Pkcs12CreationOptions,
    PKCS12CreationResult,
    Pkcs12ReadOptions,
    PKCS12ReadResult,
    PrivateKeyCreationOptions,
    PrivateKeyCreationResult,
    PublicKeyCreationResult
} from '@akanass/rx-crypto';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CryptoConfig } from '..';
import { CRYPTO_CONFIG } from '../constantes';

@Injectable()
export class PemService {
    // private property to store PEM instance
    private _pem: PEM;

    /**
     * Constructor
     */
    constructor(@Optional() @Inject(CRYPTO_CONFIG) private readonly _config?: CryptoConfig) {
        if (this._config && this._config.pem as ModuleConfiguration) {
            this._pem = new PEM(this._config.pem);
        } else {
            this._pem = new PEM();
        }
    }

    /**
     * Creates a private key
     *
     * @param {Number} [keyBitsize=2048] Size of the key, defaults to 2048bit
     * @param {Object} [options] object of cipher and password {cipher:'aes128',password:'xxx'}, defaults empty object
     *
     * @return {Observable<PrivateKeyCreationResult>} { key }
     */
    createPrivateKey(keyBitsize?: number, options?: PrivateKeyCreationOptions): Observable<PrivateKeyCreationResult> {
        return this._pem.createPrivateKey(keyBitsize, options);
    }

    /**
     * Creates a dhparam key
     *
     * @param {Number} [keyBitsize=512] Size of the key, defaults to 512bit
     *
     * @return {Observable<DhParamKeyCreationResult>} { dhparam }
     */
    createDhparam(keyBitsize?: number): Observable<DhParamKeyCreationResult> {
        return this._pem.createDhparam(keyBitsize);
    }

    /**
     * Creates a ecparam key
     *
     * @param {String} [keyName=secp256k1] Name of the key, defaults to secp256k1
     * @param {String} [paramEnc=explicit] Encoding of the elliptic curve parameters, defaults to explicit
     * @param {Boolean} [noOut=false] This option inhibits the output of the encoded version of the parameters.
     *
     * @return {Observable<EcParamKeyCreationResult>} { ecparam }
     */
    createEcparam(keyName?: string, paramEnc?: string, noOut?: boolean): Observable<EcParamKeyCreationResult> {
        return this._pem.createEcparam(keyName, paramEnc, noOut);
    }

    /**
     * Creates a Certificate Signing Request
     *
     * If options.clientKey is undefined, a new key is created automatically. The used key is included
     * in the callback return as clientKey
     *
     * @param {CSRCreationOptions} [options] Optional options object
     *
     * @return {Observable<CSRCreationResult>} {csr, clientKey}
     */
    createCSR(options?: CSRCreationOptions): Observable<CSRCreationResult> {
        return this._pem.createCSR(options);
    }

    /**
     * Creates a certificate based on a CSR. If CSR is not defined, a new one
     * will be generated automatically. For CSR generation all the options values
     * can be used as with createCSR.
     *
     * @param {CertificateCreationOptions} [options] Optional options object
     *
     * @return {Observable<CertificateCreationResult>} {certificate, csr, clientKey, serviceKey}
     */
    createCertificate(options?: CertificateCreationOptions): Observable<CertificateCreationResult> {
        return this._pem.createCertificate(options);
    }

    /**
     * Reads subject data from a certificate or a CSR
     *
     * @param {String} certificate PEM encoded CSR or certificate
     *
     * @return {Observable<CertificateSubjectReadResult>}
     *  {country, state, locality, organization, organizationUnit, commonName, emailAddress}
     */
    readCertificateInfo(certificate: string): Observable<CertificateSubjectReadResult> {
        return this._pem.readCertificateInfo(certificate);
    }

    /**
     * Exports a public key from a private key, CSR or certificate
     *
     * @param {String} certificate PEM encoded private key, CSR or certificate
     *
     * @return {Observable<PublicKeyCreationResult>} {publicKey}
     */
    getPublicKey(certificate: string): Observable<PublicKeyCreationResult> {
        return this._pem.getPublicKey(certificate);
    }

    /**
     * Creates a private key and related public key
     *
     * @param {Number} [keyBitsize=2048] Size of the key, defaults to 2048bit
     * @param {Object} [options] object of cipher and password {cipher:'aes128',password:'xxx'}, defaults empty object
     *
     * @return {Observable<KeyPairCreationResult>} {key, publicKey}
     */
    createKeyPair(keyBitsize?: number, options?: PrivateKeyCreationOptions): Observable<KeyPairCreationResult> {
        return this._pem.createKeyPair(keyBitsize, options);
    }

    /**
     * Gets the fingerprint for a certificate
     *
     * @param {String} certificate PEM encoded certificate
     * @param {HashFunction} [hash] Optional Hash function to use (either md5 sha1 or sha256, defaults to sha1)
     *
     * @return {Observable<FingerprintResult>} {fingerprint}
     */
    getFingerprint(certificate: string, hash?: HashFunction): Observable<FingerprintResult> {
        return this._pem.getFingerprint(certificate, hash);
    }

    /**
     * Gets the modulus from a certificate, a CSR or a private key
     *
     * @param {String} certificate PEM encoded, CSR PEM encoded, or private key
     * @param {String} [password] Optional password for the certificate
     *
     * @return {Observable<ModulusResult>} {modulus}
     */
    getModulus(certificate: string, password?: string): Observable<ModulusResult> {
        return this._pem.getModulus(certificate, password);
    }

    /**
     * Gets the size and prime of DH parameters
     *
     * @param {String} dh DH parameters PEM encoded
     *
     * @return {Observable<DhParamInfoResult>} {size, prime}
     */
    getDhparamInfo(dh: string): Observable<DhParamInfoResult> {
        return this._pem.getDhparamInfo(dh);
    }

    /**
     * Exports private key and certificate to a PKCS12 keystore
     *
     * @param {String} key PEM encoded private key
     * @param {String} certificate PEM encoded certificate
     * @param {String} password Password of the result PKCS12 file
     * @param {Pkcs12CreationOptions} [options] Optional object of cipher and optional client key password
     *  {cipher:'aes128', clientKeyPassword: 'xxx'}
     *
     * @return {Observable<PKCS12CreationResult>} {pkcs12}
     */
    createPkcs12(key: string, certificate: string, password: string, options?: Pkcs12CreationOptions): Observable<PKCS12CreationResult> {
        return this._pem.createPkcs12(key, certificate, password, options);
    }

    /**
     * Reads private key and certificate from a PKCS12 keystore
     *
     * @param {String} bufferOrPath Buffer representation or path to PKCS12 keystore
     * @param {Pkcs12ReadOptions} [options] Optional object of optional keystore and client key passwords
     *
     * @return {Observable<PKCS12ReadResult>} {key,cert,ca}
     */
    readPkcs12(bufferOrPath: string, options?: Pkcs12ReadOptions): Observable<PKCS12ReadResult> {
        return this._pem.readPkcs12(bufferOrPath, options);
    }

    /**
     * Verifies a PKCS12 keystore.
     *
     * @param {string} bufferOrPath is a PKCS12 keystore as a Buffer or the path to a file
     * @param {string} [passphrase] is an optional passphrase which will be used to open the keystore
     *
     * @return {Observable<boolean>}
     */
    checkPkcs12(bufferOrPath: string, passphrase?: string): Observable<boolean> {
        return this._pem.checkPkcs12(bufferOrPath, passphrase);
    }

    /**
     * Verifies the signing chain of the passed certificate
     *
     * @param {String} certificate PEM encoded certificate
     * @param {string[]} ca List of CA certificates
     *
     * @return {Observable<boolean>}
     */
    verifySigningChain(certificate: string, ca: string[]): Observable<boolean> {
        return this._pem.verifySigningChain(certificate, ca);
    }

    /**
     * Check / verify consistency of a certificate.
     *
     * @param {string} certificate is a PEM encoded certificate string
     * @param {string} [passphrase] is an optional passphrase which will be used to open the certificate
     *
     * @return {Observable<boolean>}
     */
    checkCertificate(certificate: string, passphrase?: string): Observable<boolean> {
        return this._pem.checkCertificate(certificate, passphrase);
    }
}

export {
    CertificateCreationOptions,
    CertificateCreationResult,
    CertificateSubjectReadResult,
    CSRCreationOptions,
    HashFunction,
    Pkcs12CreationOptions,
    Pkcs12ReadOptions,
    PrivateKeyCreationOptions,
    ModuleConfiguration,
    PrivateKeyCreationResult,
    PublicKeyCreationResult,
    KeyPairCreationResult,
    DhParamKeyCreationResult,
    EcParamKeyCreationResult,
    CSRCreationResult,
    FingerprintResult,
    ModulusResult,
    DhParamInfoResult,
    PKCS12CreationResult,
    PKCS12ReadResult
};
