import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormattedResponse } from "@/components/ui/FormattedResponse";
import { 
  Loader2, 
  ArrowLeft, 
  MessageCircle, 
  ExternalLink, 
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check
} from "lucide-react";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;

type Tool = {
  id: string | number;
  name: string;
  description: string;
  website?: string;
  github?: string;
  docs?: string;
  category?: string;
  type?: string;
  tags?: string[];
};

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const ToolAI: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch tool data
  useEffect(() => {
    const fetchTool = async () => {
      setLoading(true);
      setError(null);
      
      // Mock tool data for demo purposes
      const mockTool = {
        id: id || "1",
        name: "Example Security Tool",
        description: "A comprehensive security analysis tool for cybersecurity professionals",
        website: "https://example.com",
        github: "https://github.com/example/tool",
        docs: "https://docs.example.com",
        category: "Security Analysis",
        type: "CLI Tool",
        tags: ["security", "analysis", "penetration-testing", "vulnerability-scanning"]
      };
      
      setTool(mockTool);
      setLoading(false);
    };
    fetchTool();
  }, [id]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, aiLoading]);

  // Focus input on mount
  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  // Compose context string for Groq
  const getToolContext = (tool: Tool) => {
    let context = `Tool Name: ${tool.name}\nDescription: ${tool.description}`;
    if (tool.category) context += `\nCategory: ${tool.category}`;
    if (tool.type) context += `\nType: ${tool.type}`;
    if (tool.website) context += `\nWebsite: ${tool.website}`;
    if (tool.github) context += `\nGitHub: ${tool.github}`;
    if (tool.docs) context += `\nDocumentation: ${tool.docs}`;
    if (tool.tags && tool.tags.length > 0) {
      context += `\nTags: ${tool.tags.join(", ")}`;
    }
    return context;
  };

  // Copy message to clipboard
  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessage(content);
      setTimeout(() => setCopiedMessage(null), 2000);
    } catch (err) {
      console.error('Failed to copy message');
    }
  };

  // Call Groq API with fetch
  const askAI = async (question: string) => {
    if (!tool) return;
    setAiLoading(true);
    setError(null);
    try {
      const context = getToolContext(tool);
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: `You are Claude, an AI assistant specialized in cybersecurity tools and technologies. Use the following tool information as context to provide detailed, helpful, and accurate answers. Format your responses using proper markdown formatting including:

- Use ## for main sections and ### for subsections
- Use **bold** for emphasis
- Use \`inline code\` for technical terms, commands, and file names
- Use \`\`\`language for code blocks (specify the language like bash, python, etc.)
- Use bullet points (-) or numbered lists (1.) for organized information
- Use > for important quotes or callouts

Be conversational but professional. Always provide actionable insights and practical information about the tool.

Tool Context:
${context}`,
            },
            ...chat.map(m => ({ role: m.role, content: m.content })),
            {
              role: "user",
              content: question,
            },
          ],
          max_tokens: 1500,
          temperature: 0.3,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "I apologize, but I couldn't generate a response at this time.";
      
      setChat(prev => [
        ...prev,
        { role: "user", content: question, timestamp: new Date() },
        { role: "assistant", content: aiReply, timestamp: new Date() },
      ]);
    } catch (err) {
      console.error('AI Error:', err);
      setError("Failed to get AI response. Please check your API key and try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || aiLoading) return;
    askAI(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-gray-400">Loading tool information...</p>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 mb-4 text-lg">⚠️</div>
          <p className="text-red-400 mb-6">{error || "Tool not found."}</p>
          <Button asChild className="bg-white hover:bg-gray-200 text-black">
            <Link to="/tools">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Link to={`/tools/${tool.id}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  <Sparkles className="inline h-5 w-5 mr-2 text-white" />
                  Ask Cyber directory AI about {tool.name}
                </h1>
                <p className="text-sm text-gray-400">{tool.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {tool.website && (
                <Button asChild size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <a href={tool.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {tool.github && (
                <Button asChild size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <a href={tool.github} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6 pb-24">
            {/* Welcome Message */}
            {chat.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl mx-auto border border-gray-800">
                  <Bot className="h-12 w-12 text-white mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Ask me anything about {tool.name}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    I have detailed information about this tool and can help you understand its features, 
                    use cases, and implementation details.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                    <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                         onClick={() => setInput("What are the main features?")}>
                      <p className="text-sm text-gray-300">"What are the main features?"</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                         onClick={() => setInput("How do I get started?")}>
                      <p className="text-sm text-gray-300">"How do I get started?"</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                         onClick={() => setInput("What are the use cases?")}>
                      <p className="text-sm text-gray-300">"What are the use cases?"</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                         onClick={() => setInput("Compare with alternatives")}>
                      <p className="text-sm text-gray-300">"Compare with alternatives"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {chat.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-black" />
                  </div>
                )}
                <div className={`max-w-3xl ${msg.role === "user" ? "order-2" : "order-1"}`}>
                  <div className={`rounded-2xl ${
                    msg.role === "user" 
                      ? "bg-white text-black px-6 py-4" 
                      : "bg-gray-900 border border-gray-800"
                  }`}>
                    {msg.role === "assistant" ? (
                      <div className="p-6">
                        <FormattedResponse content={msg.content} />
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-800">
                          <span className="text-xs text-gray-500">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(msg.content)}
                            className="text-gray-500 hover:text-white h-6 px-2"
                          >
                            {copiedMessage === msg.content ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span>{msg.content}</span>
                        <span className="text-xs opacity-70 ml-4">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {msg.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center order-1">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Loading */}
            {aiLoading && (
              <div className="flex gap-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-black" />
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span className="text-gray-400">Cyber directory AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask Cyber directory AI about ${tool.name}...`}
                  disabled={aiLoading}
                  className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 rounded-2xl px-4 py-3 pr-12 focus:border-white focus:ring-white"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || aiLoading}
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 text-black rounded-xl h-8 w-8 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {error && (
              <div className="mt-2 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolAI; 