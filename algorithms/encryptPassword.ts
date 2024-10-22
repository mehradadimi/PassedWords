import CryptoES from "crypto-es";

/**
 * Generates a random secret key for encryption.
 * @returns string - A secure random secret key.
 */
export const generateSecretKey = (): string => {
  const randomKey = CryptoES.lib.WordArray.random(256 / 8);
  return randomKey.toString();
};

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
