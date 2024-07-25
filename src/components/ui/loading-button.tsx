// import React, { useState } from "react";
// import {
//   AiOutlineLoading3Quarters,
//   AiOutlineCheck,
//   AiOutlineClose,
// } from "react-icons/ai";
// import "tailwindcss/tailwind.css";

// // Base button styles
const baseButtonClass = `
  flex items-center justify-center px-4 py-2 text-white font-semibold 
  transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50
`.trim();

// // Success, error, and default styles
// const successButtonClass = `
//   bg-green-500 hover:bg-green-600
//   dark:bg-green-400 dark:hover:bg-green-500
//   focus:ring-green-300 dark:focus:ring-green-200
// `.trim();

// const errorButtonClass = `
//   bg-red-500 hover:bg-red-600
//   dark:bg-red-400 dark:hover:bg-red-500
//   focus:ring-red-300 dark:focus:ring-red-200
// `.trim();

const defaultButtonClass = `
  bg-blue-500 hover:bg-blue-600
  dark:bg-blue-400 dark:hover:bg-blue-500
  focus:ring-blue-300 dark:focus:ring-blue-200
`.trim();

const LoadingButton = ({
  type = "submit",
  buttonText,
  disabled = false,
  isLoading = false,
}: // isSuccess = false,
// isError = false,
{
  type?: "submit" | "reset" | "button";
  buttonText: string;
  disabled?: boolean;
  isLoading?: boolean; // Optional prop
  isSuccess?: boolean; // Optional prop
  isError?: boolean; // Optional prop
}) => {
  // Combine class names based on state
  // const buttonClass = `${baseButtonClass} ${
  //   isSuccess
  //     ? successButtonClass
  //     : isError
  //     ? errorButtonClass
  //     : defaultButtonClass
  // }`;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={buttonClass}
    >
      {/* {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin mr-2" />
      ) : isSuccess ? (
        <AiOutlineCheck className="mr-2" />
      ) : isError ? (
        <AiOutlineClose className="mr-2" />
      ) : null} */}
      {buttonText}
    </button>
  );
};
export const buttonClass = `${baseButtonClass} ${defaultButtonClass}`;

export default LoadingButton;
