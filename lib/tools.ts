interface ToolData {
  name: string
  description: string
  faqs: { question: string; answer: string }[]
  exampleImage: string
  meta: {
    title: string
    description: string
  }
  command: string
}

const toolsData: Record<string, ToolData> = {
  mindmap: {
    name: "Mind Map Creator",
    description: "Visualize your ideas and concepts with our AI-powered Mind Map Creator.",
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
    exampleImage: "/chat-diagram-demo.png",
    meta: {
      title: "AI-Powered Mind Map Creator | Chat Diagram",
      description: "Create stunning mind maps effortlessly with our AI-powered Mind Map Creator. Visualize your ideas and concepts in seconds."
    },
    command: "Create a Mind Map"
  },
  flowchart: {
    name: "Flowchart Generator",
    description: "Create professional flowcharts effortlessly with our AI-powered tool.",
    faqs: [
      {
        question: "What is a flowchart?",
        answer: "A flowchart is a diagram that represents a workflow or process. It uses different shapes to represent different types of steps in the process, connected by arrows to show the flow of the process."
      },
      {
        question: "Can I customize the appearance of my flowchart?",
        answer: "Yes, once the AI generates the initial flowchart, you can customize colors, shapes, and layout using our intuitive interface."
      },
    ],
    exampleImage: "/chat-diagram-demo.png",
    meta: {
      title: "AI-Powered Flowchart Generator | Chat Diagram",
      description: "Create professional flowcharts instantly with our AI-powered Flowchart Generator. Streamline your processes with ease."
    },
    command: "Create a Flow Chart"
  },
  // Add more tools as needed
}

export function getToolData(slug: string): ToolData | Record<string, ToolData> {
  return slug ? toolsData[slug] : toolsData;
}
