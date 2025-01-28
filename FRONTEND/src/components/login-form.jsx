import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt, faF, faG } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogin } from "@/redux/hooks/userHooks";

export function LoginForm({ className, ...props }) {
 
  const { loginUser, isLoading, error } = useLogin(); // Use the custom hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  
  // Validate inputs before submitting
  const validateInputs = () => {
    if (!email.trim()) return "Email is required.";
    if (!password.trim()) return "Password is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return null; // No error
  };
  


  const handleLogin = async (e) => {
   
    e.preventDefault();
    const validationMessage = validateInputs(); console.log("hey")
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }
   
    setValidationError(""); // Clear any previous errors
    try {
     
       await loginUser({ email, password });
       setPassword("")
    
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  useEffect(() => {
    setValidationError(""); // Reset local validation error when component mounts
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Login to your Rideshare account
                </p>
              </div>

              {/* Error Prompt */}
              {(validationError || error) && (
                <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200 dark:bg-red-900 dark:text-red-300">
                  {validationError || error === "Rejected"
                    ? "Too many tries, please wait."
                    : error}
                </div>
              )}

              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full">
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faAppleAlt} size="lg" />
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faG} size="lg" />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faF} size="lg" />
                  <span className="sr-only">Login with Facebook</span>
                </Button>
              </div>

              {/* Signup Link */}
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Signup
                </Link>
              </div>
            </div>
          </form>

          {/* Welcome Section */}
          <div className="relative hidden bg-neutral-100 md:block dark:bg-neutral-800">
            <div className="text-center text-2xl font-semibold my-5">
              Welcome to Ride Share
            </div>
            <img
              src="./src/assets/mainimg.png"
              alt="Welcome"
              className="aspect-[4/3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms and Privacy */}
      <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>.
      </div>
    </div>
  );
}
