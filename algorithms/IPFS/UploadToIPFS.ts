import Constants from "expo-constants";
import axios from "axios";

const PINATA_API_KEY = Constants.expoConfig.extra.pinataApiKey;
const PINATA_SECRET_API_KEY = Constants.expoConfig.extra.pinataApiSecret;

export async function uploadToIPFS(encryptedData: string) {
  try {
    // Initialize FormData and add encrypted data as a Blob
    const formData = new FormData();
    const blob = new Blob([encryptedData], { type: "text/plain" }); // Convert the string to a Blob
    formData.append("file", blob);

    // Send the request to Pinata's API
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );

    // Return the IPFS CID (hash) if successful
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS: ", error);
    throw error;
  }
}
