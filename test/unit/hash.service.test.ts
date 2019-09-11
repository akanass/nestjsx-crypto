import { Observable } from 'rxjs';
import { HashService } from '../../src';

let hashService: HashService;

describe('- Unit hash.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        hashService = new HashService();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        hashService = undefined;
    });

    /**
     * Test if `HashService.generate()` function returns an Observable
     */
    test('- `HashService.generate()` function must return an Observable', (done) => {
        expect(hashService.generate(null, null, null, null, null)).toBeInstanceOf(Observable);
        done();
    });
});
