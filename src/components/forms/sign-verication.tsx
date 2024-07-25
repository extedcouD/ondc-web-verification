import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  HeaderVerification,
  HeaderVerificationLookup,
  SignatureVerfication,
} from "../../utils/utils";
import { FormInput, FormTextInput } from "../ui/form-input";
import GenericForm from "../ui/generic-form";
import FormSelect from "../ui/form-select";
import { get } from "react-hook-form";

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
  const [selectedType, setSelectedType] = useState("PUBLIC_KEY");
  const [selectedLookUp, setSelectedLookUp] = useState("staging");
  const lookUpOptions = ["staging", "pre-production", "production"];

  const lookUpUrl = getLookUpUrl(selectedLookUp);

  const onSubmit = async (data: {
    publicKey: string;
    header: string;
    payload: string;
  }) => {
    let res = {};
    if (selectedType === "LOOKUP") {
      res = await HeaderVerificationLookup(
        data.payload,
        data.header,
        lookUpUrl
      );
    } else {
      res = await HeaderVerification(data.payload, data.header, data.publicKey);
    }
    appContext.pushResult(JSON.stringify(res));
  };
  return (
    <GenericForm onSubmit={onSubmit}>
      <FormSelect
        name="type"
        label="Type"
        options={["PUBLIC_KEY", "LOOKUP"]}
        setSelectedValue={setSelectedType}
      />
      {
        // If selected type is LOOKUP, show the input field for the lookup key
        selectedType === "LOOKUP" ? (
          <FormSelect
            name="lookUp"
            label="Lookup envirment"
            options={lookUpOptions}
            setSelectedValue={setSelectedLookUp}
            required
          />
        ) : (
          <FormInput name="publicKey" label="Public Key" required />
        )
      }
      <FormTextInput name="header" label="Header" required />
      <FormTextInput name="payload" label="Payload" required />
    </GenericForm>
  );
}

function getLookUpUrl(env: string) {
  switch (env) {
    case "staging":
      return "staging";
    case "pre-production":
      return "preprod";
    case "production":
      return "prod";
    default:
      return "staging";
  }
}
