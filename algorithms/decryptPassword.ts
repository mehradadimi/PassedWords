import CryptoES from "crypto-es";

/**
 * Decrypts the given cipher using AES decryption.
 * @param cipher - The encrypted password (cipher).
 * @param secretKey - The secret key used for decryption.
 * @returns string - The decrypted password.
 */
export const decryptPassword = (cipher: string, secretKey: string): string => {
  try {
    const decryptedBytes = CryptoES.AES.decrypt(cipher, secretKey);
    const decryptedText = decryptedBytes.toString(CryptoES.enc.Utf8);
    return decryptedText;
  } catch (error) {
    throw new Error("Decryption failed: " + error.message);
  }
};
