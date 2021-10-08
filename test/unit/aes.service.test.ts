import { Observable, of, throwError } from 'rxjs';
import { AesService } from '../../src';
import { decryptWithAesKey, encryptWithAesKey } from '../../src/operators/aes';

let aesService: AesService;
let password: string;
let salt: string;

describe('- Unit aes.service.test.ts file', () => {
  /**
   * Function executed before each test
   */
  beforeEach(() => {
    aesService = new AesService();
    password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
    salt = 'Kt9V3wgxrhpf8GN3';
  });

  /**
   * Function executed after each test
   */
  afterEach(() => {
    aesService = undefined;
    password = undefined;
    salt = undefined;
  });

  /**
   * Test if `AesService.createKey()` function returns an Observable
   */
  test('- `AesService.createKey()` function must return an Observable', (done) => {
    expect(aesService.createKey(null, null)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if `AesService.createKey()` function returns an Observable with error if AesService key parameters are wrong
   */
  test('- `AesService.createKey()` function must return an Observable with error if AesService key parameters are wrong', (done) => {
    const spy = jest.spyOn(aesService['_aes'], 'createKey');
    spy.mockImplementationOnce(() => throwError(() => new Error('Wrong AesService key')));

    aesService.createKey(null, null).subscribe({
      next: () => null, error: err => {
        expect(err.message).toBe('Wrong AesService key');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
        done();
      }
    });
  });

  /**
   * Test if `AesService.createKey().pipe(encryptWithAesKey())` function returns an Observable
   */
  test('- `AesService.createKey().pipe(encryptWithAesKey())` function must return an Observable', (done) => {
    const spy = jest.spyOn(aesService['_aes'], 'createKey');
    spy.mockImplementationOnce(() =>
      of({ key: 'aesKey', iv: 'aesIv' })
    );

    expect(
      aesService.createKey(password, salt)
        .pipe(
          encryptWithAesKey(null)
        )
    ).toBeInstanceOf(Observable);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    done();
  });

  /**
   * Test if `AesService.createKey().pipe(decryptWithAesKey())` function returns an Observable
   */
  test('- `AesService.createKey().pipe(decryptWithAesKey())` function must return an Observable', (done) => {
    const spy = jest.spyOn(aesService['_aes'], 'createKey');
    spy.mockImplementationOnce(() =>
      of({ key: 'aesKey', iv: 'aesIv' })
    );

    expect(
      aesService.createKey(password, salt)
        .pipe(
          decryptWithAesKey(null)
        )
    ).toBeInstanceOf(Observable);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    done();
  });
});
