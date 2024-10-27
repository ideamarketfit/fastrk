export interface LocalizedToolData {
  name: string
  description: string
  exampleImage: string  // Added
  command: string      // Added
  faqs: { question: string; answer: string }[]
  meta: {
    title: string
    description: string
  }
}

export interface ToolData {
  translations: {
    en: LocalizedToolData
    ja: LocalizedToolData
    ko: LocalizedToolData
    'zh-Hant': LocalizedToolData
  }
}

const toolsData: Record<string, ToolData> = {
  mindmap: {
    translations: {
      en: {
        name: "Mind Map Creator",
        description: "Visualize your ideas and concepts with our AI-powered Mind Map Creator.",
        exampleImage: "/chat-diagram-demo.png",
        command: "Create a Mind Map",
        faqs: [
          {
            question: "What is a mind map?",
            answer: "A mind map is a diagram used to visually organize information. The main concept is placed in the center, with related ideas branching out from it."
          },
          {
            question: "How does the AI create mind maps?",
            answer: "Our AI analyzes your input and identifies key concepts and their relationships. It then arranges these concepts into a hierarchical structure, creating a mind map."
          },
        ],
        meta: {
          title: "AI-Powered Mind Map Creator | Chat Diagram",
          description: "Create stunning mind maps effortlessly with our AI-powered Mind Map Creator. Visualize your ideas and concepts in seconds."
        }
      },
      ja: {
        name: "マインドマップ作成ツール",
        description: "AI駆動のマインドマップ作成ツールで、アイデアと概念を視覚化します。",
        exampleImage: "/chat-diagram-demo-ja.png",
        command: "マインドマップを作成する",
        faqs: [
          {
            question: "マインドマップとは何ですか？",
            answer: "マインドマップは情報を視覚的に整理するための図表です。中心に主要な概念を配置し、そこから関連するアイデアが枝分かれしていきます。"
          },
          {
            question: "AIはどのようにマインドマップを作成しますか？",
            answer: "AIが入力内容を分析し、主要な概念とその関係性を特定します。その後、これらの概念を階層構造に配置し、マインドマップを作成します。"
          }
        ],
        meta: {
          title: "AI駆動のマインドマップ作成ツール | チャットダイアグラム",
          description: "AI駆動のマインドマップ作成ツールで、簡単に美しいマインドマップを作成。アイデアと概念を瞬時に視覚化。"
        }
      },
      ko: {
        name: "마인드맵 제작 도구",
        description: "AI 기반 마인드맵 제작 도구로 아이디어와 개념을 시각화하세요.",
        exampleImage: "/chat-diagram-demo-ko.png",
        command: "마인드맵 만들기",
        faqs: [
          {
            question: "마인드맵이란 무엇인가요?",
            answer: "마인드맵은 정보를 시각적으로 정리하는 다이어그램입니다. 중심에 주요 개념을 배치하고, 관련 아이디어가 가지처럼 뻗어나가는 형태입니다."
          },
          {
            question: "AI는 어떻게 마인드맵을 만드나요?",
            answer: "AI가 입력된 내용을 분석하여 주요 개념과 그 관계를 파악합니다. 그런 다음 이러한 개념들을 계층 구조로 배치하여 마인드맵을 생성합니다."
          }
        ],
        meta: {
          title: "AI 기반 마인드맵 제작 도구 | 채팅 다이어그램",
          description: "AI 기반 마인드맵 제작 도구로 손쉽게 멋진 마인드맵을 만드세요. 순식간에 아이디어 개념을 시각화합니다."
        }
      },
      "zh-Hant": {
        name: "思維導圖製作工具",
        description: "使用AI驅動的思維導圖製作工具，將您的想法和概念視覺化。",
        exampleImage: "/chat-diagram-demo-zh-hant.png",
        command: "創建思維導圖",
        faqs: [
          {
            question: "什麼是思維導圖？",
            answer: "思維導圖是一種用於視覺化組織信息的圖表。主要概念放置在中心，相關想法從中心分支延伸出去。"
          },
          {
            question: "AI如何創建思維導圖？",
            answer: "AI分析您的輸入並識別關鍵概念及其關係。然後將這些概念安排成層次結構，創建思維導圖。"
          }
        ],
        meta: {
          title: "AI驅動的思維導圖製作工具 | 對話圖表",
          description: "使用AI驅動的思維導圖製作工具輕鬆創建精美的思維導圖。瞬間將想法和概念視覺化。"
        }
      }
    }
  },
  // Add other tools with translations...
}

export function getToolData(slug?: string, locale?: string): LocalizedToolData | ToolData | Record<string, ToolData> | null {
  if (!slug) {
    return toolsData;
  }
  
  const tool = toolsData[slug];
  if (!tool) return null;

  if (locale) {
    return tool.translations[locale as keyof typeof tool.translations] || null;
  }
  
  return tool;
}
