interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  diagram?: {
    title: string;
    content: string;
    type: 'mermaid';
  } | null;
  file?: File;
}

export const generateChatId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

export const saveChatsToLocalStorage = (chats: Chat[]) => {
  localStorage.setItem('chats', JSON.stringify(chats));
};

export const getChatsFromLocalStorage = (): Chat[] => {
  const chats = localStorage.getItem('chats');
  return chats ? JSON.parse(chats) : [];
};

export const saveChatToLocalStorage = (chat: Chat) => {
  const chats = getChatsFromLocalStorage();
  const existingChatIndex = chats.findIndex(c => c.id === chat.id);
  
  if (existingChatIndex >= 0) {
    chats[existingChatIndex] = chat;
  } else {
    chats.unshift(chat);
  }
  
  saveChatsToLocalStorage(chats);
};

// Add these new functions
export const getLastOpenedChatId = (): string | null => {
  return localStorage.getItem('lastOpenedChatId');
};

export const setLastOpenedChatId = (chatId: string): void => {
  localStorage.setItem('lastOpenedChatId', chatId);
};
