import dynamic from 'next/dynamic'

const ChatInterfaceComponent = dynamic(() => import('@/components/chat-interface'),{ ssr: false })

export default function Page() {
  return <ChatInterfaceComponent />
}
