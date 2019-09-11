import { RandomStringService } from '../../src';

let randomStringService: RandomStringService;

describe('- Integration random-string.service.test.ts file', () => {
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
     * Test if `RandomStringService.generate()` Observable returns 'string'
     */
    test('- `RandomStringService.generate()` Observable function must return a string', (done) => {
        randomStringService.generate().subscribe(_ => {
            expect(typeof _).toBe('string');
            done();
        });
    });

    /**
     * Test if `RandomStringService.generate()` Observable returns 'string' with 32 chars
     */
    test('- `RandomStringService.generate()` Observable function must return a string with 32 chars', (done) => {
        randomStringService.generate(32).subscribe(_ => {
            expect(_).toHaveLength(32);
            done();
        });
    });
});
