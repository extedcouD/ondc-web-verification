import JsonView, { Quote } from "@uiw/react-json-view";
import { lightTheme } from "@uiw/react-json-view/light";
import { darkTheme } from "@uiw/react-json-view/dark";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function ResultSection() {
  const appContext = useContext(AppContext);
  const results = appContext.result;
  const darkMode = document.documentElement.classList.contains("dark");
  return (
    <div className="flex-1 pl-4 border-l border-gray-200 dark:border-gray-700 text-black overflow-auto max-h-lvh">
      <h2
        className="text-2xl font-bold mb-4 dark:text-white"
        onClick={() => appContext.setResult([])}
      >
        Result
      </h2>
      <div className="h-full">
        {results
          .slice()
          .reverse()
          .map((result, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md mb-4"
            >
              <h3 className=" text-sm font-bold dark:text-white text-black mb-2">
                Result {result.index}
              </h3>
              <JsonView
                value={
                  results.length > 0
                    ? JSON.parse(result.value)
                    : { message: "No result to display" }
                }
                style={darkMode ? darkTheme : lightTheme}
                displayDataTypes={false}
                displayObjectSize={false}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

/**
 * Removes only the first double quote from a given string unless it matches the pattern dd:"test".
 *
 * @param input - The string from which to remove the first double quote.
 * @returns The string with the first double quote removed or unchanged if it matches the pattern dd:"test".
 */
function removeFirstDoubleQuote(input: string): string {
  const pattern = /^dd:"[^"]*"$/;
  if (pattern.test(input)) {
    return input;
  }
  return input.replace(/"/, "");
}
