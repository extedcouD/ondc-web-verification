import CreateHeaderForm from "./forms/create-header";
import CreateKeys from "./forms/create-keys";
import SigVerificationFormComponent, {
  VerifyHeaderForm,
} from "./forms/sign-verication";
export function SigVerificationForm() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        SIGNATURE VALIDATION
      </h2>
      <SigVerificationFormComponent />
    </div>
  );
}

export function HeaderVerify() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        HEADER VALIDATION
      </h2>
      <VerifyHeaderForm />
    </div>
  );
}

export function GenerateKeyPairs() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">GENERATE KEYS</h2>
      <CreateKeys />
    </div>
  );
}

export function GenHeader() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        GENERATE HEADER
      </h2>
      <CreateHeaderForm />
    </div>
  );
}
