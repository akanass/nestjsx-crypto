import { Test } from '@nestjs/testing';
import { CryptoModule, PemService } from '../../src';

describe('- Integration crypto.module.test.ts file', () => {
    let pemService: PemService;

    /**
     * Function executed before each test
     */
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [ CryptoModule.setConfig({ pem: { pathOpenSSL: '/' } }) ]
        }).compile();

        pemService = module.get<PemService>(PemService);
    });

    /**
     * Test if `PemService.createPrivateKey()` Observable returns an error if openSSL path is wrong
     */
    test('- check if `PemService.createPrivateKey()` Observable returns an error if openSSL path is wrong', (done) => {
        pemService.createPrivateKey().subscribe(() => null, err => {
            expect(err.message).toBe('Could not find openssl on your system on this path: /');
            done();
        });
    });
});
