import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/ui/mode-toggle"
import { LogIn } from "lucide-react"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SignupPage/>
    </ThemeProvider>
  )
}

export default App
