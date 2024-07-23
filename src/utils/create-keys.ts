import nacl from "tweetnacl";

function randomBytes(length: number) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
}

function base64Encode(array: Uint8Array) {
  let binary = "";
  const bytes = new Uint8Array(array);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const randomString = generateRandomString(10);
console.log(randomString);

export function generateKeyPairs() {
  // Generate signing key pair
  const signingKeyPair = nacl.sign.keyPair();

  // Generate X25519 key pair for encryption
  const encryptionKeyPair = nacl.box.keyPair.fromSecretKey(
    randomBytes(nacl.box.secretKeyLength)
  );

  return {
    Signing_private_key: base64Encode(signingKeyPair.secretKey),
    Signing_public_key: base64Encode(signingKeyPair.publicKey),
    Encryption_Privatekey: base64Encode(encryptionKeyPair.secretKey),
    Encryption_Publickey: base64Encode(encryptionKeyPair.publicKey),
    key_128: generateRandomString(16),
  };
}
