import { useEffect, useRef, useState } from "react";
import "./App.css";
import Helpers from "./components/helpers";
import {
  SigVerificationForm,
  GenerateKeyPairs,
  GenHeader,
  HeaderVerify,
  EncryptionSection,
} from "./components/sections";
import { ResultSection } from "./components/ResultSection";
import { AppContext } from "./context/AppContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { set } from "react-hook-form";

const tabs = [
  "SIGNATURE VALIDATION",
  "HEADER VALIDATION",
  // "ENCRYPTION",
  "CREATE HEADER",
  "GENERATE KEYS",
]; // Define your tabs here

function App() {
  const [activeTab, setActiveTab] = useState("verification");
  const [result, setResult] = useState<{ index: number; value: string }[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const numberRef = useRef(0);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // setResult([]);
  };
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      htmlElement.classList.add("dark");
      setDarkMode(true);
    }
  };
  const dropdownRef = useRef<any>(null);
  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function MakeTabs() {
    return (
      <>
        <div className="text-left flex ml-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border rounded-md w-64 flex items-center space-x-2"
            >
              <span>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </span>
              <svg
                className={`w-4 h-4 transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      handleTabClick(tab);
                      setIsDropdownOpen(false);
                    }}
                    className={`block px-4 py-2 text-left w-full ${
                      activeTab === tab
                        ? "bg-gray-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="p-2 text-gray-600 dark:text-gray-300"
            onClick={toggleDarkMode}
          >
            {darkMode ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
          </button>
        </div>
      </>
    );
  }

  function ContentSection() {
    return (
      <div className="flex-1 pr-4">
        {activeTab === "SIGNATURE VALIDATION" && <SigVerificationForm />}
        {activeTab === "HEADER VALIDATION" && <HeaderVerify />}
        {activeTab === "CREATE HEADER" && <GenHeader />}
        {activeTab === "GENERATE KEYS" && <GenerateKeyPairs />}
        {/* {activeTab === "ENCRYPTION" && <EncryptionSection />} */}
      </div>
    );
  }

  const pushResult = (item: string) => {
    numberRef.current += 1;
    setResult((prevItems) => {
      const updatedItems = [
        ...prevItems,
        { index: numberRef.current, value: item },
      ];
      return updatedItems.length > 7 ? updatedItems.slice(-7) : updatedItems;
    });
  };

  return (
    <AppContext.Provider value={{ result, setResult, darkMode, pushResult }}>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 w-full">
        <header className="bg-white dark:bg-gray-800 shadow-md relative">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold dark:text-white text-gray-800">
                ONDC Verification Utility
              </h1>
              <div className="flex justify-start space-x-4">
                <MakeTabs />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-6 py-8 flex">
          <ContentSection />
          <ResultSection />
        </main>
        <Helpers />
      </div>
    </AppContext.Provider>
  );
}

export default App;
