import {
    DecodeOptions,
    JsonWebTokenError,
    JWT,
    NotBeforeError,
    SignOptions,
    TokenExpiredError,
    VerifyOptions
} from '@akanass/rx-crypto';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtService {
    // private property to store JWT instance
    private _jwt: JWT;

    /**
     * Constructor
     */
    constructor() {
        this._jwt = new JWT();
    }

    /**
     * Sign the given payload into a JSON Web Token string.
     *
     * If payload is not a buffer or a string, it will be coerced into a string using JSON.stringify.
     *
     * There are no default values for `expiresIn`, `notBefore`, `audience`, `subject`, `issuer`.
     * These claims can also be provided in the payload directly with `exp`, `nbf`, `aud`, `sub` and `iss` respectively,
     *  but you can't include in both places.
     *
     * Remember that `exp`, `nbf` and `iat` are NumericDate, see related Token Expiration (exp claim)
     *
     * The header can be customized via the option.header object.
     *
     * Generated jwts will include an `iat` (issued at) claim by default unless `noTimestamp` is specified.
     * If `iat` is inserted in the payload, it will be used instead of the real timestamp for calculating other things like `exp`
     *  given a timestamp in `options.expiresIn`.
     *
     * @param {string | Buffer | Object} payload - Payload to sign, could be an literal, buffer or string.
     *  Please note that `exp` is only set if the payload is an object literal.
     * @param {string | Buffer} secretOrPrivateKey - Either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA.
     *  In case of a private key with passphrase an object { key, passphrase } can be used (based on crypto documentation),
     *  in this case be sure you pass the algorithm option.
     * @param {SignOptions} [options] - Optional object for the signature
     *
     * @return {Observable<string>} payload into a JSON Web Token string.
     */
    sign(payload: string | Buffer | object, secretOrPrivateKey: string | Buffer, options?: SignOptions): Observable<string> {
        return this._jwt.sign(payload, secretOrPrivateKey, options);
    }

    /**
     * Verify given token using a secret or a public key to get a decoded token.
     *
     * @param {string} token - JWT string to verify.
     * @param {string | Buffer} secretOrPublicKey - Either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA.
     * @param {VerifyOptions} [options] - Optional object for the verification
     *
     * @return {Observable<Object | string>} verified and decoded payload from JSON Web Token string.
     */
    verify(token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions): Observable<object | string> {
        return this._jwt.verify(token, secretOrPublicKey, options);
    }

    /**
     * Returns the decoded payload without verifying if the signature is valid.
     *
     * @param {string} token - JWT string to decode.
     * @param {DecodeOptions} [options] - Optional object for decoding.
     *
     * @return {Observable<Object | string>} The decoded Token or null if no payload in JWT.
     */
    decode(token: string, options?: DecodeOptions): Observable<null | object | string> {
        return this._jwt.decode(token, options);
    }
}

export { DecodeOptions, SignOptions, VerifyOptions, JsonWebTokenError, TokenExpiredError, NotBeforeError };
