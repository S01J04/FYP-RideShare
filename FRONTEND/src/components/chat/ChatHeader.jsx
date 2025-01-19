import { Phone, Video, MoreVertical } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ChatHeader({ conversation,showConversations,setActiveConversation,setShowConversations }) {
  return (
    <div className="flex items-center justify-between p-4 shadow-sm bg-background">
      <div className="flex items-center gap-3">
      {!showConversations && (
                  <button
                    className=" md:hidden  px-4 py-2 rounded-full shadow-sm z-10"
                    onClick={() => {
                      setShowConversations(true);
                      setActiveConversation(null); // Clear active conversation
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft}/>
                  </button>
                )}
        <Avatar className="h-10 w-10">
          <img src={conversation.avatar} alt={conversation.name} />
        </Avatar>
        <div>
          <h3 className="font-medium">{conversation.name}</h3>
          <span className="text-sm text-muted-foreground">
            {conversation.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}