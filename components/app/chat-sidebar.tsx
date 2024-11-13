import React from 'react';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Plus } from 'lucide-react'
import { Message } from '@/components/app/chat-interface'

interface Chat {
  id: string
  title: string
  messages: Message[]
}

interface ChatSidebarProps {
  showSidebar: boolean
  currentChat: Chat
  chats: Chat[]
  toggleSidebar: () => void
  addNewChat: () => void
  selectChat: (chat: Chat) => void
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  showSidebar,
  currentChat,
  chats,
  toggleSidebar,
  addNewChat,
  selectChat,
}) => {
  return (
    <div className={`border-r transition-all duration-300 ${showSidebar ? 'w-64 flex-shrink-0' : 'w-0 overflow-hidden'}`}>
      <div className="p-4 border-b flex justify-between items-center h-[60px]">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-secondary-foreground/10" 
            onClick={toggleSidebar}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h2 className="text-lg font-semibold flex items-center">
            Chats
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={addNewChat}
          className="hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">New Chat</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        {chats.map(chat => (
          <div 
            key={chat.id} 
            className={`p-3 hover:bg-gray-100 cursor-pointer ${chat.id === currentChat.id ? 'bg-gray-100' : ''}`} 
            onClick={() => selectChat(chat)}
          >
            <h3 className="font-medium chat-title">
              <div className="truncate">
                {chat.title}
              </div>
            </h3>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar; 