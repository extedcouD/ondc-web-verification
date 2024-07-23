import { useState } from "react";
import "./App.css";
import Helpers from "./components/helpers";
import SigVerificationForm from "./components/sig-verfication";

function App() {
  const [activeTab, setActiveTab] = useState("verification");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
    } else {
      htmlElement.classList.add("dark");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 w-full">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-3xl font-bold dark:text-white text-gray-800">
            ONDC Verification Utility
          </h1>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "verification"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => handleTabClick("verification")}
            >
              Verification
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "tab2"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => handleTabClick("tab2")}
            >
              Tab 2
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "tab3"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => handleTabClick("tab3")}
            >
              Tab 3
            </button>
            <button
              className="px-4 py-2 text-gray-600 dark:text-gray-300"
              onClick={toggleDarkMode}
            >
              Toggle Dark Mode
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">
        {activeTab === "verification" && <SigVerificationForm />}
        {activeTab === "tab2" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Tab 2 Content
            </h2>
            <p className="dark:text-gray-300">
              Content for the second tab goes here.
            </p>
          </div>
        )}
        {activeTab === "tab3" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Tab 3 Content
            </h2>
            <p className="dark:text-gray-300">
              Content for the third tab goes here.
            </p>
          </div>
        )}
      </main>
      <Helpers />
    </div>
  );
}

export default App;
