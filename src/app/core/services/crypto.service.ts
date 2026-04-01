import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  // 🔑 Clave pública RSA (backend)
  private publicKey = `-----BEGIN PUBLIC KEY-----
TU_PUBLIC_KEY_AQUI
-----END PUBLIC KEY-----`;

  constructor() {}

  /**
   * Genera una clave AES aleatoria
   */
  generateAESKey(): string {
    return CryptoJS.lib.WordArray.random(16).toString();
  }

  /**
   * Cifrar con AES
   */
  encryptAES(data: any, key: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }

  /**
   * Cifrar clave AES con RSA
   */
  encryptRSA(aesKey: string): string {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.publicKey);
    return encrypt.encrypt(aesKey) || '';
  }

  /**
   * Método principal (el que usarás en el proxy)
   */
  encryptRequest(payload: any) {
    const aesKey = this.generateAESKey();

    const encryptedBody = this.encryptAES(payload, aesKey);
    const encryptedKey = this.encryptRSA(aesKey);

    return {
      key: encryptedKey,
      data: encryptedBody
    };
  }
}