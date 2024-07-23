import { useForm } from "react-hook-form";

export default function SigVerificationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Verification Utility
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="public_key"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Public Key:
          </label>
          <input
            id="public_key"
            type="text"
            {...register("publicKey", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.publicKey && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor="signature"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Signature:
          </label>
          <input
            id="signature"
            type="text"
            {...register("signature", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.signature && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor="raw_data"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Raw Data:
          </label>
          <textarea
            id="raw_data"
            {...register("rawData", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.rawData && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-400 text-white dark:text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Verify Signature
          </button>
        </div>
      </form>
    </div>
  );
}
