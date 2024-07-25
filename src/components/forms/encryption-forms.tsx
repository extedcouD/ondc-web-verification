import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import GenericForm from "../ui/generic-form";
import { FormInput, FormTextInput } from "../ui/form-input";
import {
  aesEcbDecrypt,
  aesEcbEncrypt,
  aesGcmDecrypt,
  aesGcmEncrypt,
} from "../../utils/encryptor";
import FormSelect from "../ui/form-select";

interface EncryptionData {
  data: string;
  publicKey: string;
  privateKey: string;
  algorithm: string;
  type: string;
  iv?: string;
}

export function EnryptionForm() {
  const appContext = useContext(AppContext);
  const onSubmit = async (data: EncryptionData) => {
    console.log(data.type);
    forEncryption(data);
    forDecryption(data);
  };
  const [type, setType] = useState("Encrypt");
  const [algorithm, setAlgorithm] = useState("AES-ECB");
  async function forEncryption(data: EncryptionData) {
    if (data.type === "Decrypt") return;
    let res;
    if (data.algorithm === "AES-GCM") {
      res = await aesGcmEncrypt(data.data, data.privateKey, data.publicKey);
    }
    if (data.algorithm === "AES-ECB") {
      res = await aesEcbEncrypt(data.data, data.privateKey, data.publicKey);
    }
    appContext.pushResult(JSON.stringify(res));
  }
  async function forDecryption(data: EncryptionData) {
    if (data.type === "Encrypt") return;
    let res;
    if (data.algorithm === "AES-GCM" && data.iv) {
      res = await aesGcmDecrypt(data.data, data.publicKey, data.iv);
    }
    if (data.algorithm === "AES-ECB") {
      res = await aesEcbDecrypt(data.data, data.privateKey, data.publicKey);
    }
    appContext.pushResult(JSON.stringify(res));
  }

  return (
    <GenericForm onSubmit={onSubmit}>
      <FormSelect
        name="type"
        label="Type"
        options={["Encrypt", "Decrypt"]}
        setSelectedValue={setType}
        required
      />
      <FormSelect
        setSelectedValue={setAlgorithm}
        name="algorithm"
        label="Algorithm"
        options={["AES-ECB", "AES-GCM"]}
        required
      />
      <FormTextInput name="data" label="Data" required />
      <FormInput name="privateKey" label="private Key" required />
      <FormInput name="publicKey" label="public Key" required />
      {type === "Decrypt" && algorithm === "AES-GCM" ? (
        <FormInput name="iv" label="initialization_vector" required />
      ) : (
        <></>
      )}
    </GenericForm>
  );
}
