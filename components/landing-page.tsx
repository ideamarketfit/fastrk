import Link from 'next/link'
import Image from 'next/image'
import { 
  MessageSquare, 
  Network, 
  GitBranch, 
  Database, 
  PieChart, 
  Map, 
  LayoutGrid, 
  Clock, 
  Workflow,
  ChevronDown
} from 'lucide-react'

export function LandingPageComponent() {
  const faqs = [
    {
      question: "How does Chat Diagram work?",
      answer: "Chat Diagram uses advanced AI to convert your text descriptions into professional diagrams. Simply describe what you want, and our AI will generate the diagram for you."
    },
    {
      question: "Can I collaborate with my team in real-time?",
      answer: "Yes! Chat Diagram supports real-time collaboration. Multiple team members can work on the same diagram simultaneously, discussing ideas and seeing changes instantly."
    },
    {
      question: "What types of diagrams can I create?",
      answer: "You can create a wide variety of diagrams including flowcharts, org charts, mind maps, network diagrams, and more. If you can describe it, Chat Diagram can create it."
    },
    {
      question: "How can I export my diagrams?",
      answer: "Chat Diagram allows you to export your diagrams in multiple formats including PNG, SVG, and PDF. You can also integrate with popular tools and workflows."
    }
  ]

  const diagrams = [
    {
      icon: Network,
      title: "Mind Map",
      description: "Visualize ideas and concepts with interconnected nodes."
    },
    {
      icon: GitBranch,
      title: "Flow Chart",
      description: "Illustrate processes, systems, or algorithms step by step."
    },
    {
      icon: Database,
      title: "Entity Relationship Chart",
      description: "Model the relationships between entities in a database."
    },
    {
      icon: PieChart,
      title: "Pie Chart",
      description: "Display data in circular graph divided into slices."
    },
    {
      icon: Map,
      title: "User Journey Map",
      description: "Map out the steps a user takes when interacting with a product."
    },
    {
      icon: LayoutGrid,
      title: "Quadrant Chart",
      description: "Plot data points in four sections for easy comparison."
    },
    {
      icon: Clock,
      title: "Timeline",
      description: "Visualize events or milestones in chronological order."
    },
    {
      icon: Workflow,
      title: "UML Diagram",
      description: "Model software systems using Unified Modeling Language."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">Chat Diagram</span>
          </div>
          <Link href="/chat" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
            Get Started Free
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20 relative py-16 md:py-24 lg:py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 lg:mb-12 text-gray-900">Easiest Way to Craft Diagrams</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 lg:mb-16 max-w-3xl mx-auto">Create professional diagrams effortlessly through AI-powered conversations. No manual drawing required.</p>
          <Link href="/chat" className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg hover:bg-purple-700 transition duration-300 mb-4 lg:mb-6">
            Start Diagramming
          </Link>
          <p className="text-sm text-gray-500 mb-16 lg:mb-24 mt-2">No signup needed, completely free</p>

          {/* Window Frame for Demo */}
          <div className="mt-16 lg:mt-24 bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl mx-auto relative">
            <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="flex-grow text-center text-sm text-gray-600">chatdiagram.com</div>
            </div>
            <div className="p-4">
              <Image 
                src="/placeholder.svg?height=400&width=600" 
                height={400} 
                width={600} 
                alt="Chat Diagram Demo" 
                className="w-full rounded-md shadow"
              />
            </div>
          </div>
        </section>

        {/* Supported Diagrams Section */}
        <section className="py-16 bg-gray-50 mb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Supported Diagram Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {diagrams.map((diagram, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <diagram.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{diagram.title}</h3>
                  <p className="text-gray-600">{diagram.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">AI-Powered Diagramming</h3>
              <p className="text-gray-600">Simply describe your diagram, and our AI will generate it for you. No need for manual drawing or complex tools.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Real-time Collaboration</h3>
              <p className="text-gray-600">Work together with your team in real-time. Discuss ideas and see changes instantly within the platform.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Extensive Template Library</h3>
              <p className="text-gray-600">Choose from a vast collection of pre-made templates for various diagram types and industries to kickstart your projects.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Export & Integration</h3>
              <p className="text-gray-600">Easily export your diagrams in multiple formats and integrate seamlessly with your favorite tools and workflows.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex justify-between items-center w-full p-4 text-left">
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </div>
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-100 py-20 rounded-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to start diagramming smarter?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of teams already using Chat Diagram to streamline their processes.</p>
            <Link href="/chat" className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg hover:bg-purple-700 transition duration-300">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Features</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Pricing</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Use Cases</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">About Us</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Careers</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Blog</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Documentation</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition duration-300">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-400">
            © {new Date().getFullYear()} Chat Diagram. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
