import { GenerateOptions, RandomString } from '@akanass/rx-crypto';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RandomStringService {
    // private property to store RandomString instance
    private _randomString: RandomString;

    /**
     * Constructor
     */
    constructor() {
        this._randomString = new RandomString();
    }

    /**
     * Function to generate a random string
     *
     * @param {GenerateOptions | number} [options] Optional object or number to configure data of generation
     *
     * @return {Observable<string>}
     */
    generate(options?: GenerateOptions | number): Observable<string> {
        return this._randomString.generate(options);
    }
}

export { GenerateOptions };
