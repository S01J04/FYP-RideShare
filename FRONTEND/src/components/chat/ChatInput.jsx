import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChatInput({ onSendMessage }) {
  return (
    <div className="flex gap-2 p-4 border-t bg-background">
      <Input 
        placeholder="Type a message..." 
        className="flex-1"
      />
      <Button size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}