import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { HeaderVerification, SignatureVerfication } from "../../utils/utils";
import { FormInput, FormTextInput } from "../ui/form-input";
import GenericForm from "../ui/generic-form";

export default function SigVerificationForm() {
  const appContext = useContext(AppContext);
  const onSubmit = async (data: {
    publicKey: string;
    signature: string;
    rawData: string;
  }) => {
    const res = await SignatureVerfication(
      data.rawData,
      data.publicKey,
      data.signature
    );
    appContext.pushResult(JSON.stringify(res));
  };
  return (
    <GenericForm onSubmit={onSubmit}>
      <FormInput name="publicKey" label="Public Key" required />
      <FormInput name="signature" label="Signature" required />
      <FormTextInput name="rawData" label="Raw Data" required />
    </GenericForm>
  );
}

export function VerifyHeaderForm() {
  const appContext = useContext(AppContext);
  const onSubmit = async (data: {
    publicKey: string;
    header: string;
    payload: string;
  }) => {
    const res = await HeaderVerification(
      data.payload,
      data.header,
      data.publicKey
    );
    appContext.pushResult(JSON.stringify(res));
  };
  return (
    <GenericForm onSubmit={onSubmit}>
      <FormInput name="publicKey" label="Public Key" required />
      <FormTextInput name="header" label="Header" required />
      <FormTextInput name="payload" label="Payload" required />
    </GenericForm>
  );
}
