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
    await sodium.ready;
    const encoder = new TextEncoder();
    const data = encoder.encode(raw_data);
    const sig = sodium.from_base64(signature, sodium.base64_variants.ORIGINAL);
    const key = sodium.from_base64(public_key, sodium.base64_variants.ORIGINAL);
    const verification = sodium.crypto_sign_verify_detached(sig, data, key);
    return {
      validation: verification ? "Signature is valid" : "Signature is invalid",
    };
  } catch (err: any) {
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
  // Extract the parts of the header string
  const regex =
    /Signature keyId="([^"]+)",algorithm="([^"]+)",created="(\d+)",expires="(\d+)",headers="([^"]+)",signature="([^"]+)"/;
  const match = signatureString.match(regex);

  if (!match) {
    throw new Error("Invalid header string format");
  }

  // Map the extracted values to the SignatureHeader object
  return {
    keyId: match[1],
    algorithm: match[2],
    created: parseInt(match[3], 10).toString(),
    expires: parseInt(match[4], 10).toString(),
    headers: match[5],
    signature: match[6],
  };
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
