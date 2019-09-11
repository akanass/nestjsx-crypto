import { JsonWebTokenError, JwtService } from '../../src';

let jwtService: JwtService;

describe('- Integration jwt.service.test.ts file', () => {
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
     * Test if `JwtService.sign()` Observable returns a string
     */
    test('- `JwtService.sign()` function must return an Observable', (done) => {
        jwtService.sign({ data: 'data to sign' }, Buffer.from('secret to sign JwtService'))
            .subscribe((jwt: string) => {
                expect(typeof jwt).toBe('string');
                done();
            });
    });

    /**
     * Test if `JwtService.sign()` Observable returns an error if RSA signature without PEM private key
     */
    test('- `JwtService.sign()` Observable must return an error if RSA signature without PEM private key', (done) => {
        jwtService.sign({ data: 'data to sign' }, Buffer.from('secret to sign JwtService'), { algorithm: 'RS512' })
            .subscribe(() => null, err => {
                expect(err).toHaveProperty('message', 'error:0909006C:PEM routines:get_name:no start line');
                done();
            });
    });

    /**
     * Test if `JwtService.verify()` Observable returns a payload object with signature verification
     */
    test('- `JwtService.verify()` Observable must return a payload object with signature verification', (done) => {
        jwtService.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ' +
            '.f0B-YNbl9qIbHgDRMcDBxZDrQN5UiLkX5_9McwNvHZI', Buffer.from('secret to sign JWT'))
            .subscribe((payload: object) => {
                expect(payload).toHaveProperty('data', 'data to sign');
                done();
            });
    });

    /**
     * Test if `JwtService.verify()` Observable returns an error if signature is missing in JwtService
     */
    test('- `JwtService.verify()` Observable must return an error if signature is missing in JwtService', (done) => {
        jwtService.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ',
            Buffer.from('secret to sign JwtService'))
            .subscribe(() => null, (err: JsonWebTokenError) => {
                expect(err).toHaveProperty('name', 'JsonWebTokenError');
                done();
            });
    });

    /**
     * Test if `JwtService.decode()` Observable returns a payload object without signature verification
     */
    test('- `JwtService.decode()` Observable must return a payload object without signature verification', (done) => {
        jwtService.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ' +
            '.f0B-YNbl9qIbHgDRMcDBxZDrQN5UiLkX5_9McwNvHZI')
            .subscribe((payload: object) => {
                expect(payload).toHaveProperty('data', 'data to sign');
                done();
            });
    });
});
