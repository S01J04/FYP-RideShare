import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header for Mobile */}
      <div className=" h-20 md:h-14"></div>
      <div className="h-0 flex items-center justify-between px-4 md:hidden">
        <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </Button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed z-20 top-16 md:top-5 left-0 rounded-lg h-[calc(100vh-4.8rem)] w-[65%] dark:border border-white  p-4 shadow-lg  transition-transform transform ${
            sidebarOpen ? "translate-x-0 " : "-translate-x-full"
          } md:relative md:translate-x-0 md:block md:w-64`}
        >
        <div className="w-full flex justify-end">
        {sidebarOpen && (
            <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)}>
            X
          </Button>
        )}
        </div>
          <nav className="flex justify-start items-start  md:items-center flex-col gap-4">
            <Button
              variant="link"
              onClick={() => {
                setActiveTab("profile");
                handleCloseSidebar();
              }}
            >
              Profile
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setActiveTab("account");
                handleCloseSidebar();
              }}
            >
              Account
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setActiveTab("rides");
                handleCloseSidebar();
              }}
            >
              Rides
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setActiveTab("notifications");
                handleCloseSidebar();
              }}
            >
              Notifications
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setActiveTab("privacy");
                handleCloseSidebar();
              }}
            >
              Privacy
            </Button>
          </nav>
        </aside>

        {/* Overlay to close sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-85 md:hidden"
            onClick={handleCloseSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 ">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Profile</h2>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" placeholder="Your username" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" type="text" placeholder="Tell us about yourself" />
                </div>
                <div>
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <Input id="avatar" type="file" />
                </div>
                <div>
                  <Label htmlFor="car">Car Details</Label>
                  <Input id="car" type="text" placeholder="Your car details" />
                </div>
                <div>
                  <Label htmlFor="preferences">Preferences</Label>
                  <Input id="preferences" type="text" placeholder="Your preferences" />
                </div>
                <div className="flex items-center">
                  <Label htmlFor="profile-public">Public Profile</Label>
                  <Switch id="profile-public" />
                </div>
                <Button>Update Profile</Button>
              </div>
            </div>
          )}
          {activeTab === "account" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Account</h2>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Your phone number" />
                </div>
                <Button>Change Password</Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          )}
          {activeTab === "rides" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Completed Rides</h2>
              <div className="grid gap-4">
                <div className="border p-4 rounded-md">
                  <p><strong>Ride to:</strong> City A</p>
                  <p><strong>Date:</strong> 2023-01-10</p>
                  <Button variant="link">View Details</Button>
                </div>
                <div className="border p-4 rounded-md">
                  <p><strong>Ride to:</strong> City B</p>
                  <p><strong>Date:</strong> 2023-01-15</p>
                  <Button variant="link">View Details</Button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
              <div>
                <Label>Email Notifications</Label>
                <Switch />
              </div>
              <div>
                <Label>SMS Notifications</Label>
                <Switch />
              </div>
              <div>
                <Label>Push Notifications</Label>
                <Switch />
              </div>
            </div>
          )}
          {activeTab === "privacy" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
              <div>
                <Label>Location Access</Label>
                <Switch />
              </div>
              <div>
                <Label>Contact Sync</Label>
                <Switch />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
