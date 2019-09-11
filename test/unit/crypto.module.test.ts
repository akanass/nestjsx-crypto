import { Test } from '@nestjs/testing';
import {
    AesService,
    CryptoModule,
    HashService,
    JwtService,
    PemService,
    RandomStringService,
    RsaService
} from '../../src';

describe('- Unit crypto.module.test.ts file', () => {
    let aesService: AesService;
    let hashService: HashService;
    let jwtService: JwtService;
    let pemService: PemService;
    let randomStringService: RandomStringService;
    let rsaService: RsaService;

    /**
     * Function executed before each test
     */
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [ CryptoModule ]
        }).compile();

        aesService = module.get<AesService>(AesService);
        hashService = module.get<HashService>(HashService);
        jwtService = module.get<JwtService>(JwtService);
        pemService = module.get<PemService>(PemService);
        randomStringService = module.get<RandomStringService>(RandomStringService);
        rsaService = module.get<RsaService>(RsaService);
    });

    /**
     * Test if injected `aesService` is an instance of `AESService`
     */
    test('- check if injected `aesService` is an instance of `AESService`', (done) => {
        expect(aesService).toBeInstanceOf(AesService);
        done();
    });

    /**
     * Test if injected `hashService` is an instance of `HashService`
     */
    test('- check if injected `hashService` is an instance of `HashService`', (done) => {
        expect(hashService).toBeInstanceOf(HashService);
        done();
    });

    /**
     * Test if injected `jwtService` is an instance of `JwtService`
     */
    test('- check if injected `jwtService` is an instance of `JwtService`', (done) => {
        expect(jwtService).toBeInstanceOf(JwtService);
        done();
    });

    /**
     * Test if injected `pemService` is an instance of `PemService`
     */
    test('- check if injected `pemService` is an instance of `PemService`', (done) => {
        expect(pemService).toBeInstanceOf(PemService);
        done();
    });

    /**
     * Test if injected `randomStringService` is an instance of `RandomStringService`
     */
    test('- check if injected `randomStringService` is an instance of `RandomStringService`', (done) => {
        expect(randomStringService).toBeInstanceOf(RandomStringService);
        done();
    });

    /**
     * Test if injected `rsaService` is an instance of `RsaService`
     */
    test('- check if injected `rsaService` is an instance of `RsaService`', (done) => {
        expect(rsaService).toBeInstanceOf(RsaService);
        done();
    });
});
