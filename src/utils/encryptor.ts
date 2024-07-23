import CryptoJS from "crypto-js";

export const aesEcbEncrypt = (data: string, key: string) => {
  try {
    // Ensure the key is 16 bytes for AES-128
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key.padEnd(16, " ")); // Pad key if necessary
    const dataUtf8 = CryptoJS.enc.Utf8.parse(data);

    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(dataUtf8, keyUtf8, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return { encrypted_data: encrypted.toString(), raw_data: data };
  } catch (err: any) {
    return { error: err.toString() };
  }
};

export const aesEcbDecrypt = (encryptedData: string, key: string) => {
  try {
    // Ensure the key is 16 bytes for AES-128
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key.padEnd(16, " ")); // Pad key if necessary

    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(encryptedData, keyUtf8, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return { orignal_data: CryptoJS.enc.Utf8.stringify(decrypted) };
  } catch (err: any) {
    return { error: err.toString() };
  }
};

const generateIv = () => {
  return crypto.getRandomValues(new Uint8Array(12)); // AES-GCM standard IV length is 12 bytes
};

export const aesGcmEncrypt = async (data: string, key: string) => {
  try {
    const encodedKey = new TextEncoder().encode(key);
    const encodedData = new TextEncoder().encode(data);
    const iv = generateIv();

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      encodedKey,
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );

    // Encrypt the data
    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      cryptoKey,
      encodedData
    );

    return {
      encrypted_data: new Uint8Array(encryptedData).toString(),
      initialization_vector: iv.toString(),
    };
  } catch (err: any) {
    return { error: err.toString() };
  }
};

// Function to convert a comma-separated string to a Uint8Array
const commaSeparatedToUint8Array = (commaSeparated: string): Uint8Array => {
  const byteArray = new Uint8Array(commaSeparated.split(",").map(Number));
  return byteArray;
};

// Function to pad or truncate the key to ensure it is 16 bytes long
const getValidKey = (key: string): Uint8Array => {
  const keyLength = 16; // 128 bits = 16 bytes
  const encodedKey = new TextEncoder().encode(key);

  if (encodedKey.length === keyLength) {
    return encodedKey;
  }

  const validKey = new Uint8Array(keyLength);
  validKey.set(encodedKey.slice(0, keyLength));
  return validKey;
};

// Function to decrypt data using AES-GCM
export const aesGcmDecrypt = async (
  encryptedDataCommaSeparated: string,
  key: string,
  ivCommaSeparated: string
) => {
  try {
    const encodedKey = getValidKey(key);
    const encryptedData = commaSeparatedToUint8Array(
      encryptedDataCommaSeparated
    );
    const iv = commaSeparatedToUint8Array(ivCommaSeparated);

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      encodedKey,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      cryptoKey,
      encryptedData
    );

    return {
      orignal_data: new TextDecoder().decode(decryptedData),
    };
  } catch (err: any) {
    return { error: err.toString() };
  }
};
