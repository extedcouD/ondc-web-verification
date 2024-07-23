// import { createAuthorizationHeader } from "ondc-crypto-sdk-nodejs";
import sodium from "libsodium-wrappers";
import { isHeaderValid } from "ondc-crypto-sdk-nodejs";

export async function SignatureVerfication(
  raw_data: string,
  public_key: Uint8Array,
  signature: Uint8Array
) {
  const verification = sodium.crypto_sign_verify_detached(
    signature,
    raw_data,
    public_key
  );
  return verification;
}

export async function HeaderVerification(
  payload: string,
  header: string,
  public_key: string
) {
  const valid = await isHeaderValid({
    header: header,
    body: payload,
    publicKey: public_key,
  });
  return valid;
}
