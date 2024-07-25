import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AppContext } from "../context/AppContext"; // Ensure this is the correct import for your AppContext
import "./ResultSection.css"; // Import your custom CSS for transitions
import { darkTheme } from "@uiw/react-json-view/dark";
import { lightTheme } from "@uiw/react-json-view/light";
import JsonView from "@uiw/react-json-view";

export function ResultSection() {
  const appContext = useContext(AppContext);
  const darkMode = document.documentElement.classList.contains("dark");
  const results = appContext.result;

  return (
    <div className="flex-1 pl-4 border-l border-gray-200 dark:border-gray-700 text-black overflow-auto max-h-lvh">
      <h2
        className="text-2xl font-bold mb-4 dark:text-white"
        onClick={() => appContext.setResult([])}
      >
        Result
      </h2>
      <div className="h-full">
        <TransitionGroup className="result-container">
          {results.map((result, index) => (
            <CSSTransition key={index} timeout={500} classNames="result">
              <div className="bg-white max-w-xl dark:bg-json-view-bg border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-sm font-bold dark:text-white text-black mb-2">
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
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}
