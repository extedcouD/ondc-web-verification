import { useContext } from "react";
import { FormInput, FormTextInput } from "../ui/form-input";
import GenericForm from "../ui/generic-form";
import { AppContext } from "../../context/AppContext";
import { CreateHeader } from "../../utils/utils";

export default function CreateHeaderForm() {
  const appContext = useContext(AppContext);
  const onSubmit = async (data: {
    privateKey: string;
    subscriberId: string;
    subscriberUniqueKeyId: string;
    body: string;
  }) => {
    const res = await CreateHeader(
      data.body,
      data.privateKey,
      data.subscriberId,
      data.subscriberUniqueKeyId
    );
    console.log(res);
    appContext.pushResult(JSON.stringify(res));
  };
  return (
    <GenericForm onSubmit={onSubmit}>
      <FormInput name="privateKey" label="Private Key" required />
      <FormInput name="subscriberId" label="Subscriber ID" required />
      <FormInput
        name="subscriberUniqueKeyId"
        label="Subscriber Unique Key ID"
        required
      />
      <FormTextInput name="body" label="Body" required />
    </GenericForm>
  );
}
