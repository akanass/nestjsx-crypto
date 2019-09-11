import { Observable } from 'rxjs';
import { RandomStringService } from '../../src';

let randomStringService: RandomStringService;

describe('- Unit random-string.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        randomStringService = new RandomStringService();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        randomStringService = undefined;
    });

    /**
     * Test if `RandomStringService.generate()` function returns an Observable
     */
    test('- `RandomStringService.generate()` function must return an Observable', (done) => {
        expect(randomStringService.generate()).toBeInstanceOf(Observable);
        done();
    });
});
