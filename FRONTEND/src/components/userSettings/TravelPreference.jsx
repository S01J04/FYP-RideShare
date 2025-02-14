import React, { useState, useEffect, useRef } from "react";
import { FaAngleRight, FaComments, FaMusic, FaPaw, FaSmokingBan } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios"; // Import axios for DB updates
import { useProfile } from "@/redux/hooks/userHooks";
import { updateProfile } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

// Preferences Data
const preferencesData = [
  {
    category: "Chattiness",
    icon: <FaComments />,
    options: [
      { text: "I enjoy chatting a lot", icon: <FaComments /> },
      { text: "I talk sometimes", icon: <FaComments /> },
      { text: "I prefer a quiet ride", icon: <FaComments /> },
    ],
  },
  {
    category: "Music",
    icon: <FaMusic />,
    options: [
      { text: "I love listening to pop music", icon: <FaMusic /> },
      { text: "Rock music is my favorite", icon: <FaMusic /> },
      { text: "I prefer classical tunes", icon: <FaMusic /> },
    ],
  },
  {
    category: "Smoking",
    icon: <FaSmokingBan />,
    options: [
      { text: "I do not smoke at all", icon: <FaSmokingBan /> },
      { text: "I smoke occasionally", icon: <FaSmokingBan /> },
      { text: "I smoke frequently", icon: <FaSmokingBan /> },
    ],
  },
  {
    category: "Pets",
    icon: <FaPaw />,
    options: [
      { text: "I have no pets", icon: <FaPaw /> },
      { text: "I have pets", icon: <FaPaw /> },
      { text: "I have a pet", icon: <FaPaw /> },
    ],
  },
];

const TravelPreference = ({ goBack, setUserPreferences, userpreferences }) => {
  // State for preferences
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
  console.log(userpreferences)
  const [preferences, setPreferences] = useState([]);
  const {updateProfilePreferences,isLoading,error}=useProfile()
  const dispatch = useDispatch()

  // Modal state
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const modalRef = useRef();

  // Load user preferences and merge with default preferences
  useEffect(() => {
    // Merge existing user preferences from Redux with default ones
    const mergedPreferences = preferencesData.map((pref) => {
      const userPref = userpreferences?.find((up) => up.category === pref.category);
      return {
        ...pref,
        selectedOption: userPref ? userPref.selectedOption : "No preference selected",
      };
    });
  
    setPreferences(mergedPreferences);
  }, [userpreferences]);
  

  // Handle preference click
  const handlePreferenceClick = (preference) => {
    setSelectedPreference(preference);
    setSelectedOption(preference.selectedOption === "No preference selected" ? "" : preference.selectedOption);
  };

  // Save preference changes and update DB
  const handleSave = async () => {
    if (!selectedPreference) return;
  
    // Merge new preference selection with existing ones
    const updatedPreferences = preferences.map((pref) =>
      pref.category === selectedPreference.category
        ? { ...pref, selectedOption: selectedOption || pref.selectedOption }
        : pref
    );
  
    setPreferences(updatedPreferences);
  
    // Prepare data for Redux and DB
    const formattedPreferences = updatedPreferences.map((pref) => ({
      category: pref.category,
      selectedOption: pref.selectedOption,
    }));
  
    // Send update to the backend
    const response = await updateProfilePreferences(formattedPreferences);
    if (!isLoading && response) {
      // Merge preferences instead of replacing them
      setUserPreferences((prev) => [...prev, ...formattedPreferences]);
  
      console.log(formattedPreferences);
  
      dispatch(updateProfile({ field: "preferences", value: formattedPreferences }));
      setSelectedPreference(null);
    }
  };
  

  return (
    <div className="relative mx-auto min-h-[60dvh] max-w-2xl flex flex-col">
      {/* Close Button */}
      <button onClick={goBack}>
        <IoClose size={"2rem"} />
      </button>

      {/* Title */}
      <div className="text-center w-full text-4xl text-heading font-semibold my-5">
        Travel Preferences
      </div>

      {/* Preferences List */}
      {preferences.map((pref, index) => (
        <div
          key={index}
          className="p-4 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-800 rounded-2xl cursor-pointer"
          onClick={() => handlePreferenceClick(pref)}
        >
          <div className="flex items-center gap-3">
            {pref.icon}
            <div>
              <span className="block text-lg text-subtext">{pref.category}</span>
              <span className="block text-md text-primary font-semibold">
                {pref.selectedOption || "No preference selected"}
              </span>
            </div>
          </div>
          <FaAngleRight className="text-subtext" size={"1.5rem"} />
        </div>
      ))}

      {/* Modal for Selecting an Option */}
      {selectedPreference && (
        <div className="absolute inset-0 flex justify-center items-start">
          <div ref={modalRef} className="bg-background p-5 w-[100%] h-full">
            {/* Close Button */}
            <button className="text-gray-600 hover:text-gray-800" onClick={() => setSelectedPreference(null)}>
              <IoClose size={"1.5rem"} />
            </button>

            {/* Modal Title */}
            <h3 className="text-3xl font-semibold text-center text-heading my-5">
              Select {selectedPreference.category}
            </h3>

            {/* Options */}
            <div className="flex flex-col space-y-2">
              {selectedPreference.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    selectedOption === option.text ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedOption(option.text)}
                >
                  <span className="text-primary">{option.icon}</span>
                  <span className="text-lg text-heading font-semibold">{option.text}</span>
                  <input
                    type="radio"
                    name="preferenceOption"
                    value={option.text}
                    checked={selectedOption === option.text}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="ml-auto form-radio text-primary"
                  />
                </label>
              ))}
            </div>

            {/* Save Button */}
            <div className="mt-5 flex justify-center">
              <button
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPreference;
