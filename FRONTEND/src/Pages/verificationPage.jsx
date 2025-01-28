import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EmailVerificationPage() {
  const { token } = useParams();
  const [message, setMessage] = useState("Waiting for response...");
  const [countdown, setCountdown] = useState(3);  // countdown for redirecting
  const [error, setError] = useState(null);  // To handle error if verification fails
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle email verification
    const verifyEmail = async () => {
      console.log(token);
      try {
        const response = await axios.get(`http://localhost:3000/api/users/verify/${token}`);
        console.log(response);

        // Handle response based on status code
        if (response.status === 200) { // Verification success
          setMessage(response.data.message || "Verification completed! Redirecting in...");
          
          // Start countdown for redirection
          const interval = setInterval(() => {
            setCountdown((prev) => {
              if (prev === 1) {
                clearInterval(interval); // Stop countdown
                navigate("/");  // Redirect to home page after countdown
              }
              return prev - 1;
            });
          }, 1000);  // Decrease countdown every 1 second
        } else if (response.status === 400) { // Already verified
          setMessage(response.data.message || "Your email is already verified.");
        } else {
          throw new Error("Invalid verification token.");
        }
      } catch (error) {
        setMessage("Error occurred during verification.");
        setError(error.message || "Unknown error. Please try again.");
      }
    };

    verifyEmail();  // Call verify email when the component mounts
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Email Verification</h1>
        
        <div className="flex flex-col items-center justify-center space-y-6">
          {error ? (
            // Display error if verification fails
            <div className="text-red-500 text-lg text-center">
              <p>{message}</p>
              <p className="mt-2">{error}</p>
            </div>
          ) : (
            // Display success message and countdown
            <div className="text-green-600 text-lg text-center">
              <p>{message}</p>
              {countdown > 0 && (
                <p className="mt-4 text-xl font-bold">{countdown}</p>
              )}
              <p className="text-sm text-gray-600">You will be redirected shortly...</p>
            </div>
          )}
        </div>

        {/* Optionally show a spinner or loader while waiting */}
        {!error && !message.includes("Error") && (
          <div className="mt-6 flex justify-center">
            <div className="animate-pulse flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
