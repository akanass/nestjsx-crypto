import { DynamicModule, Module } from '@nestjs/common';
import { CRYPTO_CONFIG } from './constantes';
import { CryptoConfig } from './interfaces/crypto-config.interface';
import { AesService } from './services/aes.service';
import { HashService } from './services/hash.service';
import { JwtService } from './services/jwt.service';
import { PemService } from './services/pem.service';
import { RandomStringService } from './services/random-string.service';
import { RsaService } from './services/rsa.service';

@Module({
    providers: [ HashService, AesService, JwtService, PemService, RandomStringService, RsaService ],
    exports: [ HashService, AesService, JwtService, PemService, RandomStringService, RsaService ]
})
export class CryptoModule {
    static setConfig(config: CryptoConfig): DynamicModule {
        return {
            module: CryptoModule,
            providers: [ { provide: CRYPTO_CONFIG, useValue: config } ]
        }
    }
}
