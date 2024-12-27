import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ConversationItem({ conversation, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-4 hover:bg-muted cursor-pointer",
        isActive && "bg-muted"
      )}
    >
      <Avatar className="h-10 w-10">
        <img src={conversation.avatar} alt={conversation.name} />
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium truncate">{conversation.name}</h4>
          <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {conversation.lastMessage}
        </p>
      </div>
      
      {conversation.unreadCount > 0 && (
        <Badge variant="default" className="rounded-full">
          {conversation.unreadCount}
        </Badge>
      )}
    </div>
  );
}