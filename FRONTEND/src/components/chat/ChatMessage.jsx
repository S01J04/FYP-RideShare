import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function ChatMessage({ message, isOwn }) {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isOwn ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8">
        <img src={message.avatar} alt={message.sender} />
      </Avatar>
      
      <div className={cn(
        "max-w-[70%] rounded-lg p-3",
        isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.time}
        </span>
      </div>
    </div>
  );
}