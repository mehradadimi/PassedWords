import CryptoES from "crypto-es";

/**
 * Encrypts the given password using AES encryption.
 * @param password - The password to encrypt.
 * @param secretKey - The secret key used for encryption.
 * @returns string - The encrypted password (cipher).
 */
export const encryptPassword = (
  password: string,
  secretKey: string
): string => {
  try {
    const encrypted = CryptoES.AES.encrypt(password, secretKey).toString();
    return encrypted;
  } catch (error) {
    throw new Error("Encryption failed: " + error.message);
  }
};
