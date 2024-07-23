// import { createAuthorizationHeader } from "ondc-crypto-sdk-nodejs";
import sodium from "libsodium-wrappers";
import {
  createAuthorizationHeader,
  isHeaderValid,
} from "ondc-crypto-sdk-nodejs";

export async function SignatureVerfication(
  raw_data: string,
  public_key: string,
  signature: string
) {
  try {
    //return [2 /*return*/, sodium.crypto_sign_verify_detached(sodium.from_base64(signedString, _sodium.base64_variants.ORIGINAL), signingString, sodium.from_base64(publicKey, _sodium.base64_variants.ORIGINAL))];

    const verification = sodium.crypto_sign_verify_detached(
      sodium.from_base64(signature, sodium.base64_variants.ORIGINAL),
      raw_data,
      sodium.from_base64(public_key, sodium.base64_variants.ORIGINAL)
    );
    return {
      validation: verification ? "Signature is valid" : "Signature is invalid",
    };
  } catch (err: any) {
    console.log(
      sodium.from_base64(signature, sodium.base64_variants.ORIGINAL),
      raw_data,
      sodium.from_base64(public_key, sodium.base64_variants.ORIGINAL)
    );
    return {
      validation: "Signature is invalid",
      error: err.toString(),
    };
  }
}

export async function HeaderVerification(
  payload: string,
  header: string,
  public_key: string
) {
  try {
    const valid = await isHeaderValid({
      header: header,
      body: payload,
      publicKey: public_key,
    });
    return {
      validation: valid
        ? "SUCCESS : Header is Valid"
        : "FAIL : Header is INVALID",
    };
  } catch (err: any) {
    return {
      validation: "Header is invalid",
      error: err.toString(),
    };
  }
}

interface Signature {
  keyId: string;
  algorithm: string;
  created: string;
  expires: string;
  headers: string;
  signature: string;
}

function parseSignature(signatureString: string): Signature {
  const result: Partial<Signature> = {};

  // Split the string by commas to get individual key-value pairs
  const pairs = signatureString.split(",").map((pair) => pair.trim());

  pairs.forEach((pair) => {
    // Split each pair by the '=' sign
    const [key, value] = pair
      .split("=")
      .map((part) => part.trim().replace(/^"(.*)"$/, "$1")); // Remove surrounding quotes
    if (key && value) {
      //@ts-ignore
      result[key] = value;
    }
  });

  return result as Signature;
}

export async function CreateHeader(
  body: string,
  privateKey: string,
  subscriberId: string,
  subscriberUniqueKeyId: string
) {
  try {
    const sig = await createAuthorizationHeader({
      body: body,
      privateKey: privateKey,
      subscriberId: subscriberId,
      subscriberUniqueKeyId: subscriberUniqueKeyId,
    });
    return {
      raw_header: sig,
      parsed_header: parseSignature(sig),
    };
    // return parseSignature(sig);
  } catch (e: any) {
    return {
      error: e.toString(),
    };
  }
}
