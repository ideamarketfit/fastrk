'use client'

import dynamic from 'next/dynamic'

const ChatInterfaceComponent = dynamic(() => import('@/components/app/chat-interface'), { ssr: false })

export default function ChatPage() {
  return <ChatInterfaceComponent />
}

