import { Observable } from 'rxjs';
import { JwtService } from '../../src';

let jwtService: JwtService;

describe('- Unit jwt.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        jwtService = new JwtService();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        jwtService = undefined;
    });

    /**
     * Test if `JwtService.sign()` function returns an Observable
     */
    test('- `JwtService.sign()` function must return an Observable', (done) => {
        expect(jwtService.sign(null, null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `JwtService.verify()` function returns an Observable
     */
    test('- `JwtService.verify()` function must return an Observable', (done) => {
        expect(jwtService.verify(null, null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `JwtService.decode()` function returns an Observable
     */
    test('- `JwtService.decode()` function must return an Observable', (done) => {
        expect(jwtService.decode(null)).toBeInstanceOf(Observable);
        done();
    });
});
