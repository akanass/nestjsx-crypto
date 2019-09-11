import { Data, Encoding, Format, Key, KeyBits, NodeRSA, Options, RSA } from '@akanass/rx-crypto';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RsaService {
    // private property to store RSA instance
    private _rsa: RSA;

    /**
     * Constructor
     */
    constructor() {
        this._rsa = new RSA();
    }

    /**
     * Generate new key with length specified.
     *
     * @param keyBits
     *
     * @return {any}
     */
    createKey(keyBits?: KeyBits): Observable<NodeRSA> {
        return this._rsa.createKey(keyBits);
    }

    /**
     * Load key from string/buffer/components.
     *
     * @param key
     * @param format
     * @param options
     *
     * @return {any}
     */
    loadKey(key: Key, format?: Format, options?: Options): Observable<NodeRSA> {
        return this._rsa.loadKey(key, format, options);
    }
}

export { NodeRSA, KeyBits, Key, Format, Options, Encoding, Data };
