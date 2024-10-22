'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Send, ChevronRight, ChevronLeft, User, Bot, Image as ImageIcon, X, Paperclip, Plus, File, FileText, FileImage, FileAudio, FileVideo } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom'
import { useChat } from 'ai/react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  diagram?: {
    title: string
    content: string
    type: 'mermaid'
  } | null
  file?: File
}

interface Chat {
  id: number
  title: string
  messages: Message[]
}

const ChatInterfaceComponent: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, title: "Chat Diagram", messages: [] },
    { id: 2, title: "Concept Map", messages: [] },
    { id: 3, title: "User Journey Map", messages: [] },
  ])
  const [currentChat, setCurrentChat] = useState<Chat>(chats[0])
  const [showDiagram, setShowDiagram] = useState(false)
  const [currentDiagram, setCurrentDiagram] = useState<Message['diagram'] | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isInitialInput, setIsInitialInput] = useState(true)
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(currentChat.title)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onFinish: (message) => {
      const mermaidMatch = message.content.match(/<mermaid title="(.*?)">([\s\S]*?)<\/mermaid>/);
      const newMessage: Message = {
        id: Date.now(),
        text: message.content,
        sender: 'ai',
        diagram: null
      };

      if (mermaidMatch) {
        newMessage.diagram = {
          title: mermaidMatch[1],
          content: mermaidMatch[2].trim(),
          type: 'mermaid'
        };
        setCurrentDiagram(newMessage.diagram);
        setShowDiagram(true);
      }

      setCurrentChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage]
      }));
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    setEditedTitle(currentChat.title)
  }, [currentChat])

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontSize: 16,
      // Add these options
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true
      }
    });
  }, []);

  useEffect(() => {
    if (showDiagram && currentDiagram && currentDiagram.type === 'mermaid') {
      const element = document.getElementById('mermaid-diagram');
      if (element) {
        mermaid.render('mermaid-svg', currentDiagram.content).then(({ svg }) => {
          element.innerHTML = svg;
          const svgElement = element.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            svgElement.style.maxWidth = '100%';
            svgElement.style.maxHeight = '100%';

            // Initialize svg-pan-zoom with initial zoom level
            const panZoom = svgPanZoom(svgElement, {
              zoomEnabled: true,
              controlIconsEnabled: true,
              fit: false, // Changed to false
              center: true,
              minZoom: 0.1,
              maxZoom: 10,
              zoomScaleSensitivity: 0.5,
              // initialZoom: 0.7 // Set initial zoom level
            });

            // Apply initial zoom after a short delay
            setTimeout(() => {
              panZoom.zoom(0.7);
              panZoom.center();
            }, 100);

            // Resize the pan-zoom when the window is resized
            const resizeObserver = new ResizeObserver(() => {
              panZoom.resize();
              panZoom.center();
            });
            resizeObserver.observe(element);

            // Clean up function
            return () => {
              panZoom.destroy();
              resizeObserver.disconnect();
            };
          }
        });
      }
    }
  }, [showDiagram, currentDiagram]);

  const handleSend = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e) {
      e.preventDefault();
    }
    if ((input.trim() || uploadedFile) && !isLoading) {
      const newMessages: Message[] = []

      if (uploadedFile) {
        newMessages.push({
          id: Date.now(),
          text: '',
          sender: 'user',
          file: uploadedFile
        })
      }

      if (input.trim()) {
        newMessages.push({
          id: Date.now() + 1,
          text: input.trim(),
          sender: 'user'
        })
      }

      setCurrentChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, ...newMessages]
      }))
      setUploadedFile(null)
      setIsInitialInput(false)
      handleSubmit(e)
    }
  }

  const toggleDiagram = (diagram: Message['diagram'] | null) => {
    setShowDiagram(!showDiagram)
    setCurrentDiagram(diagram)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const addNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    }
    setChats(prevChats => [newChat, ...prevChats])
    setCurrentChat(newChat)
  }

  const selectChat = (chat: Chat) => {
    setCurrentChat(chat)
  }

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
    setIsEditingTitle(false)
    if (editedTitle.trim() !== '') {
      setCurrentChat(prevChat => ({
        ...prevChat,
        title: editedTitle
      }))
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === currentChat.id ? { ...chat, title: editedTitle } : chat
        )
      )
    } else {
      setEditedTitle(currentChat.title)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`border-r transition-all duration-300 ${showSidebar ? 'w-64' : 'w-0 overflow-hidden'}`}>
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
              <h3 className="font-medium">{chat.title}</h3>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-grow">
        <header className="p-4 border-b flex items-center justify-between h-[60px]">
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
                className="text-2xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                onClick={handleTitleEdit}
              >
                {currentChat.title}
              </h1>
            )}
          </div>
        </header>
        <div className="flex flex-grow overflow-hidden">
          <div className={`flex flex-col justify-between w-full max-w-3xl mx-auto transition-all duration-300 ${showDiagram ? 'mr-[50%]' : ''}`}>
            <ScrollArea className="flex-grow p-4">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-[70%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 mt-1 flex items-center justify-center">
                      {message.role === 'user' ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                    </div>
                    <div className={`mx-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className="flex flex-col">
                        <div className={`inline-block p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'text-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {message.content.replace(/<mermaid title="(.*?)">([\s\S]*?)<\/mermaid>/g, '')}
                        </div>
                        {message.role === 'assistant' && message.content.includes('<mermaid title="') && (
                          <Button 
                            variant="outline" 
                            className="mt-2 self-start" 
                            onClick={() => {
                              const mermaidMatch = message.content.match(/<mermaid title="(.*?)">([\s\S]*?)<\/mermaid>/);
                              if (mermaidMatch) {
                                toggleDiagram({
                                  title: mermaidMatch[1],
                                  content: mermaidMatch[2].trim(),
                                  type: 'mermaid'
                                });
                              }
                            }}
                          >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            View Diagram
                            {showDiagram ? <ChevronLeft className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <div className={`p-4 w-full max-w-3xl mx-auto ${isInitialInput ? 'fixed inset-x-0 bottom-4' : ''}`}>
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
                  onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend(e as React.FormEvent<HTMLFormElement>))}
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
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
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
            {showDiagram && currentDiagram && (
              <motion.div
                className="w-1/2 flex flex-col absolute right-0 top-[60px] bottom-0"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
              >
                <div id="diagram-container" className="flex-grow bg-muted p-4 rounded-lg relative m-4 shadow-lg flex flex-col overflow-hidden">
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-center p-2">
                    <h2 className="text-xl font-bold">{currentDiagram.title}</h2>
                    <Button variant="ghost" size="icon" onClick={() => toggleDiagram(null)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close diagram</span>
                    </Button>
                  </div>
                  <div className="mt-12 flex-grow flex items-center justify-center overflow-auto">
                    {currentDiagram.type === 'mermaid' && (
                      <div id="mermaid-diagram" className="w-full h-full flex items-center justify-center" />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ChatInterfaceComponent
