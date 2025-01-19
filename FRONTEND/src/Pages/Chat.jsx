import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import ConversationList from "@/components/chat/ConversationList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const mockConversations = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    lastMessage: "See you tomorrow!",
    lastMessageTime: "10:30 AM",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    lastMessage: "Thanks for the ride!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
];

const mockMessages = [
  {
    id: 1,
    content: "Hi, I'm interested in your ride to Boston",
    sender: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    content: "Sure! I still have 2 seats available. When would you like to leave?",
    sender: "You",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face",
    time: "10:32 AM",
    isOwn: true,
  },
];

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState(null);
  const [showConversations, setShowConversations] = useState(true);

  // Check for passed data from the "Contact Driver" button
  const rideDetails = location.state?.ride;
  const driverConversation = rideDetails
    ? {
        id: conversations.length + 1,
        name: rideDetails.driver.name,
        avatar: rideDetails.driver.avatar,
        lastMessage: "",
        lastMessageTime: "",
        unreadCount: 0,
        isOnline: true,
      }
    : null;

  // Add driver conversation if not already added
  if (driverConversation && !conversations.some((c) => c.name === driverConversation.name)) {
    setConversations((prev) => [...prev, driverConversation]);
    setActiveConversation(driverConversation);
  }

  return (
    <div className="container  mx-auto py-4 h-screen">
      <div className="h-20"></div>
      <button
                  className="  rounded-full"
                  onClick={() => navigate(-1)} // Navigate back to the Ride Details Page
                >
                  <FontAwesomeIcon size="xl" icon={faArrowLeft} />
                </button>
      <div className=" border rounded-lg shadow-sm overflow-hidden h-[90%]">
        <div className=" shadow-lg md:grid-cols-[320px,1fr] h-full">
          {/* Sidebar */}
          {/* <div
            className={`${
              showConversations ? "block" : "hidden"
            } md:block   overflow-y-auto`}
          >
            <ConversationList
              conversations={conversations}
              onSelect={(conversation) => {
                setActiveConversation(conversation);
                setShowConversations(false); // Auto-hide on mobile
              }}
            />
          </div> */}

          {/* Chat Area */}
          <div className="relative flex flex-col h-full">
            {activeConversation ? (
              <>
                {/* Back Button for Mobile */}
              

                {/* Chat Header */}
                <ChatHeader
                  showConversations={showConversations}
                  setShowConversations={setShowConversations}
                  setActiveConversation={setActiveConversation}
                  conversation={activeConversation}
                  onBack={() => {
                    setShowConversations(true);
                    setActiveConversation(null); // Clear active conversation
                  }}
                />

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  {mockMessages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isOwn={message.isOwn}
                    />
                  ))}
                </div>

                {/* Chat Input */}
                <ChatInput />
              </>
            ) : (
              <div className=" md:flex items-center hidden  justify-center h-full text-muted-foreground">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
