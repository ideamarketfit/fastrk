interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  artifact?: {
    title: string;
    content: string;
    type: 'diagram' | 'doc';
  } | null;
  file?: File;
}

const CHAT_IDS_KEY = 'chat_ids';

export const generateChatId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

export const getChatKey = (chatId: string): string => {
  return `chat_${chatId}`;
};

export const saveChat = (chat: Chat): void => {
  const chatKey = getChatKey(chat.id);
  localStorage.setItem(chatKey, JSON.stringify(chat));
  
  // Update chat IDs list
  const chatIds = getChatIds();
  if (!chatIds.includes(chat.id)) {
    chatIds.unshift(chat.id);
    localStorage.setItem(CHAT_IDS_KEY, JSON.stringify(chatIds));
  }
};

export const getChat = (chatId: string): Chat | null => {
  const chatKey = getChatKey(chatId);
  const chatData = localStorage.getItem(chatKey);
  return chatData ? JSON.parse(chatData) : null;
};

export const getChatIds = (): string[] => {
  const chatIds = localStorage.getItem(CHAT_IDS_KEY);
  return chatIds ? JSON.parse(chatIds) : [];
};

export const getAllChats = (): Chat[] => {
  const chatIds = getChatIds();
  return chatIds
    .map(id => getChat(id))
    .filter((chat): chat is Chat => chat !== null);
};

export const saveMessage = (chatId: string, message: Message): void => {
  const chat = getChat(chatId);
  if (chat) {
    // Ensure the message follows the Message interface structure
    const messageToSave: Message = {
      id: message.id,
      text: message.text,
      sender: message.sender,
      artifact: message.artifact || null,
      ...(message.file && { file: message.file })
    };
    
    chat.messages.push(messageToSave);
    saveChat(chat);
  }
};

export const getLastOpenedChatId = (): string | null => {
  return localStorage.getItem('lastOpenedChatId');
};

export const setLastOpenedChatId = (chatId: string): void => {
  localStorage.setItem('lastOpenedChatId', chatId);
};

export const createNewChat = (title: string = "New Chat"): Chat => {
  const newChatId = generateChatId();
  const newChat: Chat = {
    id: newChatId,
    title,
    messages: []
  };
  
  // Save the new chat to localStorage
  const chatKey = getChatKey(newChatId);
  localStorage.setItem(chatKey, JSON.stringify(newChat));
  
  // Update the chat IDs list
  const chatIds = getChatIds();
  chatIds.unshift(newChatId);
  localStorage.setItem(CHAT_IDS_KEY, JSON.stringify(chatIds));
  
  return newChat;
};

export const updateChatTitle = (chatId: string, newTitle: string): void => {
  const chat = getChat(chatId);
  if (chat) {
    chat.title = newTitle;
    saveChat(chat);
  }
};

export const getSidebarState = (): boolean => {
  const state = localStorage.getItem('sidebarOpen');
  return state ? JSON.parse(state) : true; // Default to open
};

export const setSidebarState = (isOpen: boolean): void => {
  localStorage.setItem('sidebarOpen', JSON.stringify(isOpen));
};
