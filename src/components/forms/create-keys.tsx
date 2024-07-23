import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { generateKeyPairs } from "../../utils/create-keys";
import { buttonClass } from "../ui/loading-button";

export default function CreateKeys() {
  const appContext = useContext(AppContext);
  const onSubmit = async () => {
    const res = await generateKeyPairs();
    appContext.pushResult(JSON.stringify(res));
  };
  return (
    <div>
      <button onClick={onSubmit} className={buttonClass}>
        Create Keys
      </button>
    </div>
  );
}
