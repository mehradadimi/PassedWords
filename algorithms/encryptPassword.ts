import * as Crypto from "expo-crypto";

/**
 * Encrypts the given password using SHA-256 algorithm
 * @param password
 * @returns Promise<string> - The encrypted (hashed) password
 */
export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const encryptedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return encryptedPassword;
  } catch (error) {
    throw new Error("Encryption failed: " + error.message);
  }
};
