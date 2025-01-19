import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ConversationItem from './ConversationItem';

export default function ConversationList({ conversations, onSelect }) {
  return (
    <div className="w-full h-full flex bg-background flex-col shadow-md">
      <div className="p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-9" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onClick={() => onSelect(conversation)}
          />
        ))}
      </div>
    </div>
  );
}