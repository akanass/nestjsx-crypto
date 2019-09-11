import { AES, AESKeyCreationResult } from '@akanass/rx-crypto';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AesService {
    // private property to store AES instance
    private _aes: AES;

    /**
     * Constructor
     */
    constructor() {
        this._aes = new AES();
    }

    /**
     * Creates RSA-SHA256 AES key for given password and salt
     *
     * @param {string | Buffer} password for AES key
     * @param {string | Buffer} salt for AES key
     *
     * @return {Observable<AESKeyCreationResult>} {key, iv} used to encrypt and decrypt data
     */
    createKey(password: string | Buffer, salt: string | Buffer): Observable<AESKeyCreationResult> {
        return this._aes.createKey(password, salt);
    }
}

export { AESKeyCreationResult };
