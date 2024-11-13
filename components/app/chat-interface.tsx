'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Send, ChevronRight, ChevronLeft, User, Bot, Image as ImageIcon, X, Paperclip, Plus, File, FileText, FileImage, FileAudio, FileVideo, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useChat } from 'ai/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { getChat, getChatIds, getAllChats, saveMessage, getLastOpenedChatId, setLastOpenedChatId, createNewChat, updateChatTitle, getSidebarState, setSidebarState, getTemplateArtifact } from '@/lib/chat';
import ChatSidebar from '@/components/app/chat-sidebar'
import ArtifactPanel from '../artifact/artifact-panel';
import ReactMarkdown from 'react-markdown'

export interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  artifact?: {
    title: string
    content: string
    type: 'diagram' | 'doc' | 'reveal-slides'
  } | null
  file?: File
}

interface Chat {
  id: string
  title: string
  messages: Message[]
}

const ChatInterfaceComponent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get('cid');
  const userPrompt = searchParams.get('user_prompt');
  const taskPrompt = searchParams.get('task_prompt');

  // Initialize chats from localStorage
  const [chats, setChats] = useState<Chat[]>(() => {
    if (typeof window !== 'undefined') {
      return getAllChats();
    }
    return [];
  });

  // Initialize current chat based on URL parameter, last opened chat, or create new chat
  const [currentChat, setCurrentChat] = useState<Chat>(() => {
    if (typeof window !== 'undefined') {
      if (chatId === 'new') {
        console.log("Creating new chat from parameter")
        return createNewChat(); // Create a new chat if cid is 'new'
      }

      if (chatId) {
        const existingChat = getChat(chatId);
        if (existingChat) {
          setLastOpenedChatId(existingChat.id);
          return existingChat;
        }
      }
      
      const lastOpenedId = getLastOpenedChatId();
      if (lastOpenedId) {
        const lastOpenedChat = getChat(lastOpenedId);
        if (lastOpenedChat) {
          router.replace(`/chat?cid=${lastOpenedId}`);
          return lastOpenedChat;
        }
      }
      
      const chatIds = getChatIds();
      if (chatIds.length > 0) {
        const mostRecentChat = getChat(chatIds[0]);
        if (mostRecentChat) {
          router.replace(`/chat?cid=${mostRecentChat.id}`);
          setLastOpenedChatId(mostRecentChat.id);
          return mostRecentChat;
        }
      }
      
      const newChat = createNewChat();
      const savedChat = getChat(newChat.id);
      if (savedChat) {
        setLastOpenedChatId(savedChat.id);
        if (!chatId) {
          router.replace(`/chat?cid=${savedChat.id}`);
        }
        return savedChat;
      }
      return newChat;
    }
    return createNewChat();
  });

  // Update last opened chat ID when current chat changes
  useEffect(() => {
    if (currentChat.id) {
      setLastOpenedChatId(currentChat.id);
    }
  }, [currentChat.id]);

  // Update chats state when currentChat changes
  useEffect(() => {
    if (!chatId) {
      setChats(prevChats => {
        if (!prevChats.find(chat => chat.id === currentChat.id)) {
          const savedChat = getChat(currentChat.id);
          return savedChat ? [savedChat, ...prevChats] : [currentChat, ...prevChats];
        }
        return prevChats;
      });
    }
  }, [currentChat.id, chatId]);

  const [showArtifact, setShowArtifact] = useState(false)
  const [currentArtifact, setCurrentArtifact] = useState<Message['artifact'] | null>(null)
  const [showSidebar, setShowSidebar] = useState(() => {
    if (typeof window !== 'undefined') {
      return getSidebarState();
    }
    return true;
  });
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(currentChat.title)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const { messages, append, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    id: chatId || currentChat.id,
    initialMessages: currentChat.messages.map(msg => ({
      id: msg.id.toString(),
      content: msg.text,
      role: msg.sender === 'user' ? 'user' : 'assistant',
      artifact: msg.artifact ? {
        title: msg.artifact.title,
        content: msg.artifact.content,
        type: 'diagram'
      } : null
    })),
    onFinish: (message) => {
      const artifactMatch = message.content.match(/<artifact title="([^"]*)" type="([^"]*)">([\s\S]*?)<\/artifact>/);
      
      const newMessage: Message = {
        id: Date.now(),
        text: message.content,
        sender: 'ai',
        artifact: artifactMatch ? {
          title: artifactMatch[1],
          content: artifactMatch[3].trim(),
          type: artifactMatch[2] as 'diagram' | 'doc' | 'reveal-slides'
        } : null
      };

      if (artifactMatch) {
        newMessage.artifact = {
          title: artifactMatch[1],
          content: artifactMatch[3].trim(),
          type: artifactMatch[2] as 'diagram' | 'doc' | 'reveal-slides'
        };
        setCurrentArtifact(newMessage.artifact);
        setShowArtifact(true);

        if (currentChat.title === "New Chat") {
          const newTitle = artifactMatch[1];
          setEditedTitle(newTitle);
          updateChatTitle(currentChat.id, newTitle);
          setCurrentChat(prevChat => ({
            ...prevChat,
            title: newTitle
          }));
          setChats(prevChats =>
            prevChats.map(chat =>
              chat.id === currentChat.id ? { ...chat, title: newTitle } : chat
            )
          );
        }
      }

      // Get the current cid from URL
      const currentChatId = new URLSearchParams(window.location.search).get('cid');
      console.log("Saving message with chat ID from URL:", currentChatId);
      
      if (currentChatId) {
        saveMessage(currentChatId, newMessage);
        setCurrentChat(prevChat => ({
          ...prevChat,
          messages: [...prevChat.messages, newMessage]
        }));
      } else {
        console.error("No chat ID found in URL");
      }
    },
    body: { model: selectedModel },
  });

  // Modify the scroll effect
  useEffect(() => {
    // Only scroll if there are messages
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const isNewMessage = lastMessage.id !== previousMessageIdRef.current;
      
      if (isNewMessage) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        previousMessageIdRef.current = lastMessage.id;
      }
    }
  }, [messages]);

  // Add this ref to track the last message
  const previousMessageIdRef = useRef<string>('');

  useEffect(() => {
    setEditedTitle(currentChat.title)
  }, [currentChat])

  const handleSend = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e) {
      e.preventDefault();
    }
    if ((input.trim() || uploadedFile) && !isLoading) {
      // Close artifact panel if open
      setShowArtifact(false);
      setCurrentArtifact(null);

      // Create and save message whether it's a file or text
      const newMessage = {
        id: Date.now(),
        content: input.trim(),
        role: 'user' as const,
        ...(uploadedFile && { file: uploadedFile })
      };
      
      // Save as your local Message type
      saveMessage(currentChat.id, {
        id: newMessage.id,
        text: newMessage.content,
        sender: 'user',
        ...(uploadedFile && { file: uploadedFile })
      });

      setUploadedFile(null);
      handleSubmit(e);
    }
  }

  const toggleArtifact = (artifact: Message['artifact'] | null) => {
    if (!artifact) {
      // If no artifact is provided, just close the panel
      setShowArtifact(false);
      setCurrentArtifact(null);
      return;
    }

    // If an artifact is provided
    if (!showArtifact || currentArtifact?.content !== artifact.content) {
      // If panel is closed OR different artifact is clicked, show the new artifact
      setShowArtifact(true);
      setCurrentArtifact(artifact);
    } else {
      // If same artifact is clicked while shown, close the panel
      setShowArtifact(false);
      setCurrentArtifact(null);
    }
  }

  const toggleSidebar = () => {
    const newState = !showSidebar;
    setShowSidebar(newState);
    setSidebarState(newState);
  };

  const addNewChat = async () => {
    // Close artifact panel first
    setShowArtifact(false);
    setCurrentArtifact(null);

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }

    const newChat = createNewChat();
    const savedChat = getChat(newChat.id);
    if (savedChat) {
      messages.splice(0, messages.length);
      setChats(prevChats => [savedChat, ...prevChats]);
      setCurrentChat(savedChat);
      setLastOpenedChatId(savedChat.id);
      router.push(`/chat?cid=${savedChat.id}`);
    }
  };

  const selectChat = (chat: Chat) => {
    // Close artifact panel first
    setShowArtifact(false);
    setCurrentArtifact(null);

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }

    // Get fresh chat data from localStorage
    const savedChat = getChat(chat.id);
    if (savedChat) {
      messages.splice(0, messages.length);
      setCurrentChat(savedChat);
      setLastOpenedChatId(savedChat.id);
      router.push(`/chat?cid=${savedChat.id}`);
    } else {
      messages.splice(0, messages.length);
      setCurrentChat(chat);
      setLastOpenedChatId(chat.id);
      router.push(`/chat?cid=${chat.id}`);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // You can add additional logic here to handle the file, such as sending it to a server
      console.log("File uploaded:", file.name)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <FileImage className="h-6 w-6" />
    if (fileType.startsWith('audio/')) return <FileAudio className="h-6 w-6" />
    if (fileType.startsWith('video/')) return <FileVideo className="h-6 w-6" />
    if (fileType === 'application/pdf') return <FileText className="h-6 w-6" />
    return <File className="h-6 w-6" />
  }

  const handleTitleEdit = () => {
    setIsEditingTitle(true)
    setTimeout(() => titleInputRef.current?.focus(), 0)
  }

  const handleTitleSave = () => {
    setIsEditingTitle(false);
    if (editedTitle.trim() !== '') {
      setCurrentChat(prevChat => ({
        ...prevChat,
        title: editedTitle
      }));
      
      // Update title in localStorage
      updateChatTitle(currentChat.id, editedTitle);
      
      // Update chats list in state
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChat.id ? { ...chat, title: editedTitle } : chat
        )
      );
    } else {
      setEditedTitle(currentChat.title);
    }
  };

  // Add an effect to handle URL changes and ensure chat data is loaded from localStorage
  useEffect(() => {
    if (chatId) {
      const savedChat = getChat(chatId);
      if (savedChat && savedChat.id !== currentChat.id) {
        setCurrentChat(savedChat);
        setLastOpenedChatId(savedChat.id);
      }
    }
  }, [chatId]);

  // Add an effect to reset UI when chat changes
  useEffect(() => {
    if (currentChat) {
      // Only reset file upload state
      setUploadedFile(null);
    }
  }, [currentChat.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarState(showSidebar);
    }
  }, [showSidebar]);

  const isSubmitting = useRef(false);

  const handleAutoSubmit = async () => {
    if (isSubmitting.current) {
      console.log('🚫 Submission already in progress, skipping...');
      return;
    }

    if (userPrompt && taskPrompt) {
      console.log('🚀 Starting handleAutoSubmit with:', { userPrompt, taskPrompt });
      
      try {
        isSubmitting.current = true;

        // Use the current chat instead of creating a new one
        const currentChatId = currentChat.id; // Assuming currentChat is already defined in your component
        const savedChat = getChat(currentChatId);
        
        if (savedChat) {
          // Update URL first, before any state changes
          await router.replace(`/chat?cid=${savedChat.id}`);

          const formattedPrompt = `${taskPrompt}: ${userPrompt}`;
          
          const userMessage = {
            id: Math.random().toString(36).substr(2, 7),
            content: formattedPrompt,
            role: 'user' as const,
            createdAt: new Date()
          };

          // Update states
          setChats(prevChats => [savedChat, ...prevChats]);
          setCurrentChat(savedChat);
          setLastOpenedChatId(savedChat.id);

          // Save message
          saveMessage(savedChat.id, {
            id: parseInt(userMessage.id, 36),
            text: userMessage.content,
            sender: 'user'
          });

          await append(userMessage);
        }
      } catch (error) {
        console.error('❌ Error sending message:', error);
      } finally {
        isSubmitting.current = false;
      }
    }

    // Check for template artifact when chatId is 'new'
    if (chatId === 'new' && getTemplateArtifact() !== null) {
      const templateArtifact = getTemplateArtifact();
      
      if (templateArtifact) { // Ensure templateArtifact is not null
        const artifactMessage = {
          id: Math.random().toString(36).substr(2, 7),
          content: `<artifact title="${templateArtifact.title}" type="${templateArtifact.type}">${templateArtifact.content}</artifact> \n use this as template for my following input`,
          role: 'user' as const,
          createdAt: new Date(),
          artifact: {
            title: templateArtifact.title,
            content: templateArtifact.content,
            type: templateArtifact.type
          }
        };

        try {
          isSubmitting.current = true;

          const currentChatId = currentChat.id; // Use the current chat instead of creating a new one
          const savedChat = getChat(currentChatId);
          
          if (savedChat) {
            // Update URL first, before any state changes
            await router.replace(`/chat?cid=${savedChat.id}`);

            // Update states
            setChats(prevChats => [savedChat, ...prevChats]);
            setCurrentChat(savedChat);
            setLastOpenedChatId(savedChat.id);

            // Save message
            saveMessage(savedChat.id, {
              id: parseInt(artifactMessage.id, 36),
              text: artifactMessage.content,
              sender: 'user',
              artifact: {
                title: templateArtifact.title,
                content: templateArtifact.content,
                type: templateArtifact.type
              }
            });

            await append(artifactMessage);
          }
        } catch (error) {
          console.error('❌ Error sending template artifact message:', error);
        } finally {
          isSubmitting.current = false;
        }
      }
    }
  };

  // Add this effect to verify state updates
  useEffect(() => {
    if (currentChat) {
      console.log('Current chat ID updated to:', currentChat.id);
    }
  }, [currentChat.id]);

  useEffect(() => {
    let mounted = true;

    // Check if userPrompt or taskPrompt is present and chatId is not set
    if ((userPrompt || taskPrompt) && chatId === 'new' && mounted) {
      handleAutoSubmit();
    }

    // Check if chatId is 'new' and there is a template artifact
    if (chatId === 'new' && getTemplateArtifact() !== null) {
      handleAutoSubmit();
    }

    return () => {
      mounted = false;
    };
  }, [userPrompt, taskPrompt, chatId]);

  const findLastArtifact = (messages: Message[]) => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      if ( message.artifact) {
        return message.artifact;
      }
    }
    return null;
  };

  const [isInitialLoaded, setIsInitialLoaded] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (messages.length > 0) {
      timeoutId = setTimeout(() => {
        // Map the AI SDK messages to our Message interface
        const mappedMessages: Message[] = messages.map(msg => {
          const artifactMatch = msg.content.match(/<artifact title="([^"]*)" type="([^"]*)">([\s\S]*?)<\/artifact>/);
          
          let artifact: { title: string; content: string; type: "diagram" | "doc" | "reveal-slides" } | null = null;

          if (artifactMatch) {
            artifact = {
              title: artifactMatch[1],
              content: artifactMatch[3].trim(),
              type: artifactMatch[2] as 'diagram' | 'doc' | 'reveal-slides'
            };
          }

          return {
            id: parseInt(msg.id),
            text: msg.content,
            sender: msg.role === 'user' ? 'user' : 'ai',
            artifact: artifact
          };
        });

        console.log('conditions:', isInitialLoaded);
        console.log('message update conditions:', !isInitialLoaded && messages.length > 1);
        
        if (!isInitialLoaded && messages.length > 1) {
          // Find and show the last complete artifact when loading a chat
          const lastArtifact = findLastArtifact(mappedMessages);
          if (lastArtifact) {
            setCurrentArtifact(lastArtifact);
            setShowArtifact(true);
          }
          setIsInitialLoaded(true);
        } 
      }, 300);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [messages, isInitialLoaded]);

  // Reset isInitialLoaded when changing chats
  useEffect(() => {
    setIsInitialLoaded(false);
  }, [currentChat.id]);

  return (
    <div id="app-wrapper" className="flex h-screen bg-background w-full h-full">
      <ChatSidebar
        showSidebar={showSidebar}
        currentChat={currentChat}
        chats={chats}
        toggleSidebar={toggleSidebar}
        addNewChat={addNewChat}
        selectChat={selectChat}
      />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-grow">
        <header className="p-4 border-b flex items-center justify-between h-[3.75rem]">
          <div className="flex items-center">
            {!showSidebar && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleSidebar} 
                  className="mr-2 hover:bg-secondary-foreground/10"
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={addNewChat} 
                  className="mr-2 hover:bg-gray-100"
                >
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">New chat</span>
                </Button>
              </>
            )}
            {isEditingTitle ? (
              <Input
                ref={titleInputRef}
                value={editedTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleTitleSave()}
                className="text-2xl font-bold w-64"
              />
            ) : (
              <h1 
                className="text-2xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded truncate max-w-[70vw] overflow-hidden text-ellipsis whitespace-nowrap"
                onClick={handleTitleEdit}
              >
                {currentChat.title}
              </h1>
            )}
          </div>
        </header>
        <div id="app-container" className="flex h-[calc(100vh-3.75rem)]">
          <div id="chat-container" className={`flex flex-col transition-all duration-300 h-full ${
            showArtifact 
              ? 'w-1/2 md:block hidden'
              : 'w-full'
          }`}>
            <ScrollArea id='chat-msgs-scroll-area' className="flex-grow p-4 w-full h-[calc(100%-160px)]" style={{ 
              paddingLeft: 'max(1rem, calc((100% - 48rem) / 2))',
              paddingRight: 'max(1rem, calc((100% - 48rem) / 2))'
            }}>
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''} max-w-full md:max-w-[70%]`}>
                    <div className="w-8 h-8 mt-1 flex items-center justify-center">
                      {message.role === 'user' ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                    </div>
                    <div className={`mx-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className="flex flex-col">
                        <div className={`inline-block p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-secondary text-foreground'
                            : 'text-secondary-foreground'
                        }`}>
                          {(() => {
                            const artifactTagIndex = message.content.indexOf('<artifact');
                            const closingTagIndex = message.content.indexOf('</artifact>');
                            let content = message.content;

                            if (closingTagIndex !== -1) {
                              content = content.replace(/<artifact title="([^"]*)" type="([^"]*)">([\s\S]*?)<\/artifact>/g, '');
                            } else if (artifactTagIndex !== -1) {
                              content = content.substring(0, artifactTagIndex);
                            }

                            return (
                              <ReactMarkdown
                                components={{
                                  // Customize the styling of different elements if needed
                                  p: ({children}) => <p className="mb-1">{children}</p>,
                                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                                  em: ({children}) => <em className="italic">{children}</em>,
                                  code: ({children}) => <code className="bg-muted px-1 py-0.5 rounded">{children}</code>,
                                  ul: ({children}) => <ul className="list-disc ml-4 mb-1">{children}</ul>,
                                  ol: ({children}) => <ol className="list-decimal ml-4 mb-1">{children}</ol>,
                                }}
                              >
                                {content}
                              </ReactMarkdown>
                            );
                          })()}
                        </div>
                        {(message.role === 'user' || message.role === 'assistant') && (() => {
                          const startTagMatch = message.content.match(/<artifact title="([^"]*)" type="([^"]*)">/);
                          const hasClosingTag = message.content.includes('</artifact>');
                          
                          if (startTagMatch) {
                            if (!hasClosingTag) {
                              // Show loading state when artifact is being generated
                              return (
                                <Button 
                                  variant="outline" 
                                  className="mt-2 self-start"
                                  disabled
                                >
                                  <span className="animate-spin mr-2">⚪</span>
                                  Generating {startTagMatch[1]}...
                                </Button>
                              );
                            }
                            
                            // Show complete artifact button only when closing tag is present
                            const artifactMatch = message.content.match(/<artifact title="([^"]*)" type="([^"]*)">([\s\S]*?)<\/artifact>/);
                            const artifact = artifactMatch ? {
                              title: artifactMatch[1],
                              content: artifactMatch[3].trim(),
                              type: artifactMatch[2] as 'diagram' | 'doc' | 'reveal-slides'
                            } : null;
                            
                            return artifact && (
                              <Button 
                                variant="outline" 
                                className="mt-2 self-start" 
                                onClick={() => toggleArtifact(artifact)}
                              >
                                {artifact.type === 'doc' ? (
                                  <FileText className="mr-2 h-4 w-4" />
                                ) : artifact.type === 'reveal-slides' ? (
                                  <Layers className="mr-2 h-4 w-4" />
                                ) : (
                                  <ImageIcon className="mr-2 h-4 w-4" />
                                )}
                                {artifact.title || 'View Artifact'}
                                {showArtifact ? <ChevronLeft className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                              </Button>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <div id='chat-input-container' className="flex-shrink-0 p-4 w-full bg-background h-[160px]" style={{ 
              paddingLeft: 'max(1rem, calc((100% - 48rem) / 2))',
              paddingRight: 'max(1rem, calc((100% - 48rem) / 2))'
            }}>
              <div className="relative w-full">
                {uploadedFile && (
                  <div className="mb-2 p-2 rounded-lg flex items-center">
                    {getFileIcon(uploadedFile.type)}
                    <span className="ml-2 text-sm">{uploadedFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="ml-auto"
                    >
                      <X className="h-4  w-4" />
                    </Button>
                  </div>
                )}
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  className="w-full min-h-[120px] pr-12 pl-6 py-4 resize-none rounded-lg"
                  rows={3}
                />
                <div className="absolute left-2 bottom-2 flex items-center space-x-2 z-10">
                  <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-[140px] border-none focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-v1">Claude v1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSend(e as unknown as React.FormEvent<HTMLFormElement>)} 
                  disabled={isLoading}
                  className="absolute right-2 bottom-2 z-10"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {showArtifact && currentArtifact && (
              <motion.div
                className="flex flex-col w-full md:w-1/2 h-full"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArtifactPanel
                  title={currentArtifact.title}
                  onClose={() => toggleArtifact(null)}
                  showBackButton={true}
                  artifactContent={currentArtifact.content}
                  type={currentArtifact.type}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ChatInterfaceComponent
